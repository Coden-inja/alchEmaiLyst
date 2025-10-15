import { useRef, useState, useEffect } from "react";
import { navLinks } from "../../constants/index.ts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ArrowRight, Bot, Mail, PlayCircle, Shield } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle.tsx";

gsap.registerPlugin(SplitText);
const Hero = () => {
  const navRef = useRef<HTMLUListElement | null>(null);
  const heroRef = useRef(null);
  const bottomTextRef = useRef(null);
  const clipImgRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const images = ["/hero2.jpg"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (!heroRef.current || !navRef.current || !clipImgRef.current) return;

    const heroSplit = new SplitText(heroRef.current, { type: "chars" });
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      heroSplit.chars,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.6 }
    );
    tl.fromTo(
      clipImgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.3, ease: "power1.inOut" }
    );
    tl.fromTo(
      navRef.current.querySelectorAll("li"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
      "+=0.1"
    );
    tl.fromTo(
      bottomTextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      "<"
    );
    tl.from("#hero-heading", { opacity: 0, y: 50, duration: 1 });
    tl.from("#hero-buttons", { opacity: 0, y: 30, duration: 1 }, "<");
    tl.from(
      "#icon-mail",
      { rotate: -90, scale: 0, opacity: 0, duration: 0.6 },
      "<"
    );
    tl.from(
      "#icon-bot",
      { rotate: 90, scale: 0, opacity: 0, duration: 0.6 },
      "<"
    );
    tl.from(
      "#icon-shield",
      { rotate: -90, scale: 0, opacity: 0, duration: 0.6 },
      "<"
    );

    return () => heroSplit.revert();
  }, []);

  return (
    <div className="min-h-screen bg-universityBlue dark:bg-gray-900 font-sans relative overflow-hidden">
      {/* Navbar */}

      <div
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-3 transition-all duration-300 ${
          isScrolled
            ? "bg-universityBlue/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
            : ""
        }`}
      >
        <h1
          ref={heroRef}
          className="p-2 text-white relative group text-3xl xs:text-6xl lg:text-2xl font-extrabold rounded-sm cursor-pointer z-50"
        >
          <a href="/">alchEmaiLyst</a>
          <span className="absolute left-2 bottom-1.5 w-0 h-[5px] bg-blue-600 transition-all duration-300 group-hover:w-40"></span>
        </h1>

        <div className="flex items-center space-x-4">
          <ul
            ref={navRef}
            className="hidden lg:flex gap-12 text-lg text-foreground z-40"
          >
            {navLinks.map((link) => (
              <li key={link.id} className="relative group cursor-pointer">
                {link.url ? (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-all duration-300 group-hover:-translate-y-2"
                  >
                    {link.title}
                    <span className="absolute left-0 -bottom-1 h-[6px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ) : (
                  <button
                    className="inline-block transition-all duration-300 group-hover:-translate-y-2 bg-transparent border-none outline-none text-inherit cursor-pointer"
                    onClick={() => {
                      if (link.anchor) {
                        const el = document.getElementById(link.anchor);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {link.title}
                    <span className="absolute left-0 -bottom-1 h-[6px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          <button
            className="block lg:hidden p-2"
            aria-label="Open Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}

        {isMobileMenuOpen && (
          <div
            className="lg:hidden absolute top-16 left-4 right-4 
                  bg-background/90 backdrop-blur-md 
                  rounded-lg p-4 z-50 border border-border"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.url ? (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.title}
                  </a>
                ) : (
                  <button
                    key={link.id}
                    className="text-foreground hover:text-accent transition-colors 
                       bg-transparent border-none outline-none cursor-pointer text-left"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (link.anchor) {
                        const el = document.getElementById(link.anchor);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {link.title}
                  </button>
                )
              )}
              <div className="pt-2 border-t border-border">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-4 right-4 bg-black/90 backdrop-blur-md rounded-lg p-4 z-50">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.url ? (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white  hover:text-blue-300 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.title}
                  </a>
                ) : (
                  <button
                    key={link.id}
                    className="!text-white hover:!text-blue-300 transition-colors bg-transparent border-none outline-none text-inherit cursor-pointer text-left"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (link.anchor) {
                        const el = document.getElementById(link.anchor);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {link.title}
                  </button>
                )
              )}
              <div className="pt-2 border-t border-gray-600">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero Background */}
      <div
        ref={clipImgRef}
        className="w-full h-screen relative overflow-hidden rounded-lg"
      >
        <div className="absolute inset-0 bg-overlayBlack rounded-lg z-10" />
        {images.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              current === idx ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 -translate-y-12">
          {/* Icons */}
          <div className="grid grid-cols-3 gap-4 max-w-5xl px-4 mb-6">
            <div className="relative" id="icon-mail">
              <div className="bg-blue-100 rounded-xl w-14 h-14 flex items-center justify-center mx-auto rotate-12 shadow-md hover:-rotate-3 transition-transform">
                <Mail className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="relative" id="icon-bot">
              <div className="backdrop-blur-sm rounded-xl w-14 h-14 flex items-center justify-center mx-auto -rotate-12 shadow-md outline-dashed outline-blue-400/60 hover:rotate-3 transition-transform">
                <Bot className="text-blue-400 hover:text-white" size={24} />
              </div>
            </div>
            <div className="relative" id="icon-shield">
              <div className="bg-red-100 rounded-xl w-14 h-14 flex items-center justify-center mx-auto rotate-[18deg] shadow-md hover:-rotate-3 transition-transform">
                <Shield className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="uppercase text-blue-400 font-extrabold text-[clamp(2rem,4vw,5rem)] mb-4 z-40"
          >
            AI: Summarize, Compose, Send Emails.
          </h1>

          {/* Buttons */}
          <div
            id="hero-buttons"
            className="flex flex-col sm:flex-row gap-4 mb-6 z-40"
          >
            <button
              onClick={() => {
                const el = document.getElementById("getstarted");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all transform hover:scale-105 shadow-lg flex gap-2 items-center"
            >
              Get Started Free
              <ArrowRight className="transition-transform hover:rotate-45 duration-300" />
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://x.com/Yoges_ai/status/1941754822501466365",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="px-8 py-4 flex gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
            >
              <PlayCircle />
              Watch Demo
              <ArrowRight className="transition-transform hover:rotate-45 duration-300" />
              {/* added similar animation effect as get satrted for free button */}
            </button>
          </div>
        </div>

        {/* Combined Bottom Sections (Top Description + Bottom Banner) */}
        <div className="absolute bottom-8 left-0 w-full z-30 px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 justify-between">
            {/* Top Description Text */}
            <div
              className="order-1 md:order-2 w-full md:w-auto text-white bg-blue-400/30 p-3 rounded-lg max-w-xl text-center relative"
              style={{ bottom: "1rem" }}
            >
              <p className="text-sm leading-relaxed">
                A three-agent system to summarize, compose, and send emails.
                Stay away from spam with intelligent delivery optimization.
              </p>
            </div>

            {/* Bottom Banner */}
            <div
              ref={bottomTextRef}
              className="order-2 md:order-1 w-full md:w-[60%] flex flex-col items-center md:items-start text-center md:text-left break-words"
            >
              <h2 className="text-2xl md:text-3xl leading-tight font-bold uppercase w-full text-white">
                Your antispam AI
              </h2>

              <p className="text-sm md:text-base mt-3 text-justify text-white">
                A cutting-edge platform powered by a{" "}
                <span className="font-semibold">three-agent AI system</span>{" "}
                designed to intelligently{" "}
                <span className="font-semibold">
                  summarize, compose, and send emails
                </span>{" "}
                — while actively{" "}
                <span className="font-semibold">avoiding spam triggers</span> to
                ensure maximum delivery and clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
