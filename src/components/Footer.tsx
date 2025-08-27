const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="text-sm text-gray-500 py-6 text-center">
      <div className="mb-3 flex flex-col items-center space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-4">
        <div>
          <a href="/terms" className="hover:underline mx-2">
            Terms &amp; Conditions
          </a>
          |
          <a href="/privacy" className="hover:underline mx-2">
            Privacy Policy
          </a>
        </div>

        {/* Social icons group */}
        <div
          className="flex items-center space-x-3"
          aria-label="alchEmaiLyst social links"
        >
          <a
            href="https://x.com/Yoges_ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our X (opens in a new tab)"
            className="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 0 0 1.88-2.35 8.46 8.46 0 0 1-2.7 1.03 4.23 4.23 0 0 0-7.2 3.85A12 12 0 0 1 3.16 4.6a4.22 4.22 0 0 0 1.31 5.64c-.66-.02-1.28-.2-1.82-.5v.05c0 2.1 1.5 3.86 3.49 4.26-.36.1-.74.14-1.13.14-.28 0-.57-.03-.84-.08.57 1.77 2.21 3.06 4.16 3.1A8.49 8.49 0 0 1 2 19.54a12 12 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.18 8.18 0 0 0 22.46 6z" />
            </svg>
          </a>

          <a
            href="https://github.com/Coden-inja"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our GitHub (opens in a new tab)"
            className="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.8c1.02.01 2.05.14 3.01.41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.81 5.61-5.49 5.91.43.37.82 1.1.82 2.22 0 1.6-.02 2.89-.02 3.28 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          <a
            href="https://discord.com/users/1355463140879499384"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Discord (opens in a new tab)"
            className="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 71 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                  fill="#23272A"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="71" height="55" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </a>

          <a
            href="https://peerlist.io/yoges"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Peerlist (opens in a new tab)"
            className="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.9 6h-2.3a16 16 0 010 4h2.3A8.1 8.1 0 0016.9 8zM7.1 8A8.1 8.1 0 007.1 16h2.3a16 16 0 010-4H7.1zM12 4c2.9 0 5.6.9 7.8 2.4A8.1 8.1 0 0012 4z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/yogesh-kumar-299298260/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our LinkedIn (opens in a new tab)"
            className="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.48 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7 0h4.78v2.2h.07c.67-1.27 2.3-2.61 4.73-2.61C22.36 7.59 24 10.02 24 14.2V24h-5v-8.1c0-1.93-.03-4.41-2.69-4.41-2.69 0-3.1 2.1-3.1 4.27V24H7V8z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="text-xs text-gray-400 mt-1">
        © {year} alchEmaiLyst. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
