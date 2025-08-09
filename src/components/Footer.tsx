const Footer = () => {
  return (
    <footer className="text-sm text-gray-500 py-6 text-center">
      <div className="mb-2">
        <a href="/terms" className="hover:underline mx-2">
          Terms & Conditions
        </a>
        |
        <a href="/privacy" className="hover:underline mx-2">
          Privacy Policy
        </a>
      </div>
      <div className="text-xs text-gray-400 mt-1">
        © {new Date().getFullYear()} alchEmaiLyst. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;