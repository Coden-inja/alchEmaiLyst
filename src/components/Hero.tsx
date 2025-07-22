import  { useRef, useState, useEffect  } from "react";
import { navLinks } from "../../constants/index.ts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import heroImage from "../../public/hero2.jpg"
import { ArrowRight, Bot, Mail, PlayCircle, Shield } from "lucide-react";

const Hero = () => {
  const navRef = useRef(null);
  const heroRef = useRef(null);
  const bottomTextRef = useRef(null);
  const clipImgRef = useRef(null);
  const images = [
  heroImage,

];

const [current, setCurrent] = useState(0);

useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 4000ms = 4s

    return () => clearInterval(interval); // Cleanup on unmount
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
    tl.from("#hero-heading", {
    opacity: 0,
    y: 50,
    duration: 1,
    
  });

  // Buttons
  tl.from("#hero-buttons", {
    opacity: 0,
    y: 30,
    duration: 1,
  }, "<");

  // Icons
  tl.from("#icon-mail", {
    rotate: -90,
    scale: 0,
    opacity: 0,
    duration: 0.6,
  }, "<");

  tl.from("#icon-bot", {
    rotate: 90,
    scale: 0,
    opacity: 0,
    duration: 0.6,
  }, "<");

  tl.from("#icon-shield", {
    rotate: -90,
    scale: 0,
    opacity: 0,
    duration: 0.6,
  }, "<");


    return () => {
      heroSplit.revert();
    };
  }, []);

  return (
<>
    <div className="min-h-screen  bg-universityBlue font-sans relative overflow-hidden">
      <div className="absolute top-3 left-4 flex justify-end items-center space-x-8 z-1 ">
        <h1
          ref={heroRef}
          id="hero-text"
          className="p-2 text-white relative group xs:text-6xl lg:text-2xl  rounded-sm font-extrabold text-3xl cursor-pointer ml-2 z-50"
        >
          <a href="/">alchEmaiLyst</a>
          <span className="absolute left-2 bottom-1.5 w-0 h-[5px] bg-blue-600 transition-all duration-300 group-hover:w-40"></span>
        </h1>

        {/* Hamburger Menu - Visible on small screens only */}
        <button className="block lg:hidden p-2 ml-12" aria-label="Open Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
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

        <ul
          ref={navRef}
          className="hidden lg:flex ml-16 gap-12 justify-end text-lg font-sans text-white"
        >
          {navLinks.map((link) => (
            <li key={link.id} className="relative group cursor-pointer">
              <a
                href={`#${link.id}`}
                className="relative inline-block transition-all duration-300 group-hover:-translate-y-2"
              >
                {link.title}
                <span className="absolute left-0 -bottom-1 h-[6px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={clipImgRef}
        id="clip-img"
        className="h-screen group  relative w-[97%] bg-universityPink m-4 clipbg rounded-lg bg-cover bg-no-repeat"
      >
         <div className="absolute inset-0 bg-overlayBlack  rounded-lg z-10" />
{images.map((img, idx) => (
        <div
          key={img}
          className={`slideshow-image ${current === idx ? 'visible' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
<div
  id="hero-section"
  className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 -translate-y-12"
>
  <div className="grid grid-cols-3 gap-4 max-w-5xl px-4 mb-6">
    <div className="relative" id="icon-mail">
      <div className="bg-blue-100 rounded-xl w-14 h-14 flex items-center justify-center mx-auto rotate-12 shadow-md group-hover:bg-blue-200 hover:-rotate-3 ease-in-out duration-300 transition-all">
        <Mail className="text-blue-600" size={24} />
      </div>
    </div>

    <div className="relative" id="icon-bot">
      <div className="backdrop-blur-sm rounded-xl w-14 h-14 flex items-center justify-center mx-auto -rotate-12 shadow-md outline-dashed outline-blue-400/60 hover:rotate-3 ease-in-out duration-300 transition-all">
        <Bot className="text-blue-400 hover:text-white" size={24} />
      </div>
    </div>

    <div className="relative" id="icon-shield">
      <div className="bg-red-100 rounded-xl w-14 h-14 flex items-center justify-center mx-auto rotate-[18deg] shadow-md group-hover:bg-red-200 hover:-rotate-3 ease-in-out duration-300 transition-all">
        <Shield className="text-red-600" size={24} />
      </div>
    </div>
  </div>

  <h1 id="hero-heading" className="uppercase text-blue-400 font-extrabold text-[clamp(2rem,4vw,5rem)] mb-4">
    AI: Summarize, Compose, Send Emails.
  </h1>

  <div id="hero-buttons" className="flex flex-col sm:flex-row gap-4 mb-6">
    <button onClick={() => {
    const el = document.getElementById("getstarted");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }} className="px-8 py-4 bg-white/10 backdrop-blur-sm border flex gap-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all transform hover:scale-105 shadow-lg">
      Get Started Free
      <ArrowRight className="hover:-rotate-45 duration-300 ease-in-out transition-all" />
    </button>
    <button  onClick={() => window.open("https://x.com/Yoges_ai/status/1941754822501466365", "_blank", "noopener,noreferrer")}
     className="px-8 py-4 flex gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all">
      <PlayCircle />
      Watch Demo
    </button>
  </div>
</div>




     

        <div className="absolute bottom-12 right-2  w-full justify-end  flex  ">
          <h2 className="text-white bg-blue-400/20 text-sm font-mono p-2  rounded-lg  max-w-xl">
            A three agent system for leveraging AI to summarise, compose, send emails. Also stay away from spam{" "}
          </h2>
        </div>
      </div>

      <div
        ref={bottomTextRef}
        className="absolute bottom-4 left-2 w-[100vw]  h-[25vh] md:w-[37%] md:h-[30%] m-4 text-white   items-center justify-center"
      >
        <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] leading-tight text-center font-extrabold uppercase w-full">
          Your antispam AI
        </h2>
       <p className="ml-3 text-[10px]">
  A cutting-edge platform powered by a{" "}
  <span className="bottom-text-span">
    three-agent AI system
  </span>{" "}
  designed to intelligently{" "}
  <span className="bottom-text-span">
    summarize, compose, and send emails
  </span>{" "}
  — while actively{" "}
  <span className="bottom-text-span">
    avoiding spam triggers
  </span>{" "}
  to ensure maximum delivery and clarity.
</p>
      </div>
    </div>
     </>

  );
};

export default Hero;
