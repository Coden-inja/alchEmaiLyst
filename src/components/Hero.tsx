import { useRef, useState, useEffect } from "react";
import { navLinks } from "../../constants/index.ts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText"; // ✅ Make sure this path works for you
import { ArrowRight, Bot, Mail, PlayCircle, Shield } from "lucide-react";

gsap.registerPlugin(SplitText); // ✅ Important step

const Hero = () => {
  const navRef = useRef<HTMLUListElement | null>(null);
  const heroRef = useRef(null);
  const bottomTextRef = useRef(null);
  const clipImgRef = useRef(null);

  const images = ["/hero2.jpg"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!heroRef.current || !navRef.current || !clipImgRef.current) return;

    const heroSplit = new SplitText(heroRef.current, { type: "chars" });
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(heroSplit.chars, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.6 });
    tl.fromTo(clipImgRef.current, { opacity: 0 }, { opacity: 1, duration: 1.3, ease: "power1.inOut" });
    tl.fromTo(navRef.current.querySelectorAll("li"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "+=0.1");
    tl.fromTo(bottomTextRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "<");
    tl.from("#hero-heading", { opacity: 0, y: 50, duration: 1 });
    tl.from("#hero-buttons", { opacity: 0, y: 30, duration: 1 }, "<");
    tl.from("#icon-mail", { rotate: -90, scale: 0, opacity: 0, duration: 0.6 }, "<");
    tl.from("#icon-bot", { rotate: 90, scale: 0, opacity: 0, duration: 0.6 }, "<");
    tl.from("#icon-shield", { rotate: -90, scale: 0, opacity: 0, duration: 0.6 }, "<");

    return () => heroSplit.revert();
  }, []);

  return (
    <div className="min-h-screen bg-universityBlue font-sans relative overflow-hidden">
      {/* Navbar */}
      <div className="absolute top-3 left-4 flex justify-end items-center space-x-8 z-50">
        <h1 ref={heroRef} className="p-2 text-white relative group text-3xl xs:text-6xl lg:text-2xl font-extrabold rounded-sm cursor-pointer z-50">
          <a href="/">alchEmaiLyst</a>
          <span className="absolute left-2 bottom-1.5 w-0 h-[5px] bg-blue-600 transition-all duration-300 group-hover:w-40"></span>
        </h1>

        <button className="block lg:hidden p-2 ml-12" aria-label="Open Menu">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <ul ref={navRef} className="hidden lg:flex ml-16 gap-12 justify-end text-lg text-white z-40">
          {navLinks.map((link) => (
            <li key={link.id} className="relative group cursor-pointer">
              <a href={`#${link.id}`} className="inline-block transition-all duration-300 group-hover:-translate-y-2">
                {link.title}
                <span className="absolute left-0 -bottom-1 h-[6px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Hero Background */}
      <div
          ref={clipImgRef}
          className="w-full h-screen relative overflow-hidden rounded-lg"
          >

        <div className="absolute inset-0 bg-overlayBlack rounded-lg z-10" />
        {images.map((img, idx) => (
          <div key={img} className={`absolute inset-0 transition-opacity duration-1000 ${current === idx ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
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
          <h1 id="hero-heading" className="uppercase text-blue-400 font-extrabold text-[clamp(2rem,4vw,5rem)] mb-4 z-40">
            AI: Summarize, Compose, Send Emails.
          </h1>

          {/* Buttons */}
          <div id="hero-buttons" className="flex flex-col sm:flex-row gap-4 mb-6 z-40">
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
              onClick={() => window.open("https://x.com/Yoges_ai/status/1941754822501466365", "_blank", "noopener,noreferrer")}
              className="px-8 py-4 flex gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
            >
              <PlayCircle />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Top Description Text */}
        <div className="absolute bottom-12 right-2 w-full justify-end flex z-30">
          <h2 className="text-white bg-blue-400/20 text-sm font-mono p-2 rounded-lg max-w-xl">
            A three agent system for leveraging AI to summarise, compose, send emails. Also stay away from spam{" "}
          </h2>
        </div>
      </div>

      {/* Bottom Banner */}
      <div ref={bottomTextRef} className="absolute bottom-4 left-2 w-full md:w-[37%] h-[25vh] md:h-[30%] m-4 text-white flex flex-col items-center justify-center z-40">
        <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] leading-tight text-center font-extrabold uppercase w-full">
          Your antispam AI
        </h2>
        <p className="ml-3 text-[10px] text-center">
          A cutting-edge platform powered by a{" "}
          <span className="font-bold">three-agent AI system</span> designed to intelligently{" "}
          <span className="font-bold">summarize, compose, and send emails</span> — while actively{" "}
          <span className="font-bold">avoiding spam triggers</span> to ensure maximum delivery and clarity.
        </p>
      </div>
    </div>
  );
};

export default Hero;
