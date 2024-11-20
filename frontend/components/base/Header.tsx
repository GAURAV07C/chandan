"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backgroundStyle =
    scrollPosition === 0
      ? {
          backgroundImage: "linear-gradient(to bottom, #9333EA, #4C1D95)", // from-purple-600 to-indigo-900
        }
      : {
          backgroundColor: `rgba(108, 122, 137, ${Math.min(
            scrollPosition / 300,
            1
          )})`, // Gradual opacity when scrolling
        };

  return (
    <header
      className="container mx-auto px-4 py-3 flex justify-between items-center fixed w-full z-10 transition duration-300"
      style={{
        ...backgroundStyle,
        backdropFilter: scrollPosition > 0 ? "blur(10px)" : "none",
      }}
    >
      <div className="flex items-center space-x-2 text-wrap">
        <Image src={'/logo.png'} alt="logo" width={50} height={50} className="text-white" />
        <span className="text-2xl font-bold">V V E</span>
      </div>
      <nav>
        <ul className="flex space-x-4">
          {[
            { title: "Home", link: "/" },
            { title: "About", link: "/about" },
            { title: "Contact", link: "/contact" },
            { title: "Register", link: "/signup" },
            {title:"Hired",link:"/hire"}
          ].map((item, index) => (
            <li key={index}>
              <div className="px-1 py-1 hover:bg-black rounded-full hover:text-white font-bold text-white">
                <Link href={item.link}>{item.title}</Link>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
