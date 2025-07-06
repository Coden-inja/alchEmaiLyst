interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: {
    headers: Array<{ name: string; value: string }>;
    body?: { data?: string };
    parts?: Array<{
      mimeType: string;
      body: { data?: string };
    }>;
  };
  internalDate: string;
}

interface GmailThread {
  id: string;
  messages: GmailMessage[];
}

class GmailService {
  private baseUrl = 'https://gmail.googleapis.com/gmail/v1/users/me';

  private async makeRequest(endpoint: string, accessToken: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gmail API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async getMessages(accessToken: string, query: string = '', maxResults: number = 50): Promise<any> {
    const params = new URLSearchParams({
      q: query,
      maxResults: maxResults.toString(),
    });

    return this.makeRequest(`/messages?${params.toString()}`, accessToken);
  }

  async getMessage(accessToken: string, messageId: string): Promise<GmailMessage> {
    return this.makeRequest(`/messages/${messageId}`, accessToken);
  }

  async getThread(accessToken: string, threadId: string): Promise<GmailThread> {
    return this.makeRequest(`/threads/${threadId}`, accessToken);
  }

  async sendMessage(accessToken: string, message: {
    to: string;
    subject: string;
    body: string;
    from?: string;
  }): Promise<any> {
    const email = this.createEmailMessage(message);
    const encodedMessage = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    return this.makeRequest('/messages/send', accessToken, {
      method: 'POST',
      body: JSON.stringify({
        raw: encodedMessage
      })
    });
  }

  async markAsSpam(accessToken: string, messageIds: string[]): Promise<any> {
    return this.makeRequest('/messages/batchModify', accessToken, {
      method: 'POST',
      body: JSON.stringify({
        ids: messageIds,
        addLabelIds: ['SPAM'],
        removeLabelIds: ['INBOX']
      })
    });
  }

  async deleteMessages(accessToken: string, messageIds: string[]): Promise<any> {
    return this.makeRequest('/messages/batchDelete', accessToken, {
      method: 'POST',
      body: JSON.stringify({
        ids: messageIds
      })
    });
  }

  async getLabels(accessToken: string): Promise<any> {
    return this.makeRequest('/labels', accessToken);
  }

  private createEmailMessage(message: {
    to: string;
    subject: string;
    body: string;
    from?: string;
  }): string {
    const lines = [
      `To: ${message.to}`,
      `Subject: ${message.subject}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      message.body
    ];

    return lines.join('\r\n');
  }

  decodeBase64(data: string): string {
    try {
      // Gmail API returns base64url encoded data
      const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
      const padding = base64.length % 4;
      const paddedBase64 = padding ? base64 + '='.repeat(4 - padding) : base64;
      return atob(paddedBase64);
    } catch (error) {
      console.error('Failed to decode base64 data:', error);
      return '';
    }
  }

  extractEmailContent(message: GmailMessage): {
    subject: string;
    from: string;
    to: string;
    body: string;
    date: string;
  } {
    const headers = message.payload.headers;
    const subject = headers.find(h => h.name === 'Subject')?.value || '';
    const from = headers.find(h => h.name === 'From')?.value || '';
    const to = headers.find(h => h.name === 'To')?.value || '';
    const date = headers.find(h => h.name === 'Date')?.value || '';

    let body = '';
    
    // Extract body from payload
    if (message.payload.body?.data) {
      body = this.decodeBase64(message.payload.body.data);
    } else if (message.payload.parts) {
      // Look for text/html or text/plain parts
      const textPart = message.payload.parts.find(part => 
        part.mimeType === 'text/html' || part.mimeType === 'text/plain'
      );
      if (textPart?.body?.data) {
        body = this.decodeBase64(textPart.body.data);
      }
    }

    // Fallback to snippet if no body found
    if (!body) {
      body = message.snippet;
    }

    return { subject, from, to, body, date };
  }

  async searchSpamEmails(accessToken: string): Promise<any> {
    return this.getMessages(accessToken, 'in:spam', 20);
  }

  async getInboxEmails(accessToken: string, maxResults: number = 20): Promise<any> {
    return this.getMessages(accessToken, 'in:inbox', maxResults);
  }
}

export const gmailService = new GmailService();