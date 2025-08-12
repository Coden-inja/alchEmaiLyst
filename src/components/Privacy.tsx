export default function Privacy() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[200px] z-0" />
      <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[180px] z-0" />

      {/* Navbar */}
      <header className="relative z-10 flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wider">
          alch<span className="text-purple-400">Emailyst</span>
        </h1>
        <nav className="space-x-6 text-lg">
          <a href="/" className="hover:text-purple-300 transition">Home</a>
          <a href="/privacy" className="hover:text-purple-300 transition font-semibold">Privacy</a>
          <a href="/terms" className="hover:text-purple-300 transition">Terms</a>
        </nav>
      </header>

      {/* Content */}
      <main className="relative z-10 flex items-center justify-center px-6 py-24">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-10 max-w-4xl w-full text-gray-200 space-y-6">
          <h2 className="text-4xl font-bold text-white mb-2">🔐 Privacy Policy</h2>
          <p className="text-sm text-gray-400">Last updated: July 30, 2025</p>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">1. Introduction</h3>
            <p>
              At alchEmailyst, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">2. Data We Collect</h3>
            <p>
              We may collect personal information such as your name, email address, and usage data related to your interaction with our email tools.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">3. How We Use Your Data</h3>
            <p>
              We use your data to provide and improve services like Email Summarizer, Composer, and Spam Detector. Your data helps us personalize experiences and optimize performance.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h3>
            <p>
              We implement industry-standard security measures, including end-to-end encryption, to protect your information from unauthorized access.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">5. Third-Party Services</h3>
            <p>
              We may use trusted third-party tools (e.g., OpenAI APIs) to deliver services. These services are bound by their own privacy policies and data protection practices.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">6. Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your data. You can also opt out of data collection at any time.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h3>
            <p>
              If you have any questions or concerns about your data, please contact us at fbyogesh111@gmail.com
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-400 text-sm py-8 border-white/10 mt-10">
        © {new Date().getFullYear()} alchEmailyst. All rights reserved.
      </footer>
    </div>
  );
}
