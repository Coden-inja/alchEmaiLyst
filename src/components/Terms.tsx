export default function Terms() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[200px] z-0" />
      <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[180px] z-0" />

      {/* Navbar */}
      <header className="relative z-10 flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wider">alch<span className="text-purple-400">Emailyst</span></h1>
        <nav className="space-x-6 text-lg">
          <a href="/" className="hover:text-purple-300 transition">Home</a>
          <a href="/privacy" className="hover:text-purple-300 transition">Privacy</a>
          <a href="/terms" className="hover:text-purple-300 transition font-semibold">Terms</a>
        </nav>
      </header>

      {/* Terms Content */}
      <main className="relative z-10 flex items-center justify-center px-6 py-24">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-10 max-w-5xl w-full text-gray-200 space-y-6">
          <h2 className="text-4xl font-bold text-white mb-2">📜 Terms and Conditions</h2>
          <p className="text-sm text-gray-400">Last updated: August 2, 2025</p>

          <p>
            These Terms and Conditions ("Terms") govern your access and use of alchEmailyst ("we", "us", or "our"), a product-based service focused on email automation and productivity tools.
            By accessing our website or using our services, you agree to be bound by these Terms. If you do not agree, please refrain from using our services.
          </p>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">1️⃣ Eligibility</h3>
            <p>
              By using this service, you represent that you are at least 18 years of age or have legal guardian consent if under 18, as per the Indian Majority Act, 1875.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">2️⃣ Use of Service</h3>
            <p>
              You agree to use our services only for lawful purposes. You shall not use the service to violate any applicable laws, including but not limited to the Information Technology Act, 2000 and the Indian Penal Code, 1860.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">3️⃣ Data Collection & Protection</h3>
            <p>
              We collect user information in accordance with our Privacy Policy. Data is stored securely and handled as per guidelines under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">4️⃣ Intellectual Property</h3>
            <p>
              All trademarks, software, designs, and branding associated with alchEmailyst are the property of their respective owners. Unauthorized reproduction or use is strictly prohibited under Indian Copyright Act, 1957.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">5️⃣ Payment & Refund</h3>
            <p>
              If applicable, all payments are processed in Indian Rupees (INR). Refunds are governed by our Refund Policy. Please contact us within 7 days of purchase for refund requests.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">6️⃣ Limitation of Liability</h3>
            <p>
              We are not liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the service. This includes data loss, service interruptions, or damages under Indian Contract Act, 1872.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">7️⃣ Termination</h3>
            <p>
              We reserve the right to terminate or suspend your access at any time for violation of these Terms. You may also stop using the service at your discretion.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">8️⃣ Dispute Resolution</h3>
            <p>
              Any disputes shall be subject to the jurisdiction of courts located in Mumbai, India. Arbitration may be used in accordance with the Arbitration and Conciliation Act, 1996.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">9️⃣ Changes to Terms</h3>
            <p>
              We may update these Terms at any time. It is your responsibility to review them periodically. Continued use of our services implies acceptance of changes.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">🔟 Contact Us</h3>
            <p>
              If you have any questions or concerns regarding these Terms, feel free to reach out to us at <span className="underline">fbyogesh111@gmail.com</span>.
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
