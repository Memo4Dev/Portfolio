import React, { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

function getAbsoluteTop(el) {
  let top = 0;
  let current = el;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent;
  }
  return top;
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    
    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portfolio" },
        { href: "#Contact", label: "Contact" },
    ];

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 20);
        const sections = navItems
            .map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        top: getAbsoluteTop(section),
                    };
                }
                return null;
            })
            .filter(Boolean);

        const scrollPos = window.scrollY + 150;

        let current = sections[0];
        for (const section of sections) {
            if (scrollPos >= section.top) {
                current = section;
            }
        }
        if (current) {
            setActiveSection(current.id);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = getAbsoluteTop(section) - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                isOpen
                    ? "bg-surface opacity-100"
                    : scrolled
                    ? "bg-surface/80 backdrop-blur-[10px]"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="text-xl font-bold font-mono text-secondary"
                        >
                            &gt;_ Memo
                        </a>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-8 flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className="group relative px-1 py-2 text-sm font-medium"
                                >
                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${
                                            activeSection === item.href.substring(1)
                                                ? "text-secondary font-semibold"
                                                : "text-[#c7c5ce] group-hover:text-[#e0e2e6]"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    {activeSection === item.href.substring(1) ? (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-secondary transition-all duration-300" />
                                    ) : (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-[#c7c5ce] hover:text-secondary transition-transform duration-300 ease-in-out transform ${
                                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-[#46464d] transition-all duration-300 ease-in-out origin-top shadow-2xl ${
                    isOpen
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0 pointer-events-none"
                }`}
            >
                <div className="p-4 flex flex-col space-y-2">
                    {navItems.map((item, index) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 ease ${
                                activeSection === item.href.substring(1)
                                    ? "bg-secondary/10 text-secondary font-semibold"
                                    : "text-[#c7c5ce] hover:bg-white/5 hover:text-[#e0e2e6]"
                            }`}
                            style={{
                                transitionDelay: `${index * 75}ms`,
                                transform: isOpen ? "translateY(0)" : "translateY(-15px)",
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
