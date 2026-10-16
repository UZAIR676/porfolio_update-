"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

const items = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Toolkit", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const progressRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const navigationId = useId();

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;

      const total =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        total > 0
          ? Math.max(0, Math.min(1, window.scrollY / total))
          : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      setScrolled(window.scrollY > 20);

      let next = "";

      items.forEach((item) => {
        const section = document.getElementById(item.href.slice(1));

        if (
          section &&
          section.getBoundingClientRect().top <= 180
        ) {
          next = item.href;
        }
      });

      setActive(next);
    }

    function scheduleUpdate() {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    }

    update();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleUpdate)
        : null;

    observer?.observe(document.body);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 801px)");

    function closeOnDesktop() {
      if (desktop.matches) {
        setOpen(false);
      }
    }

    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    function onOutsidePointer(event: globalThis.PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function onFocusOutside(event: FocusEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onOutsidePointer);
    document.addEventListener("focusin", onFocusOutside);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onOutsidePointer);
      document.removeEventListener("focusin", onFocusOutside);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header
      ref={headerRef}
      className={`spatial-header ${
        scrolled ? "spatial-header--scrolled" : ""
      }`}
    >
      <a className="spatial-header__skip" href="#projects">
        Skip to projects
      </a>

      <div className="spatial-header__shell">
        <div className="spatial-header__bar">
          <a
            href="#home"
            className="spatial-header__logo"
            aria-label="Uzair — home"
            onClick={closeMenu}
          >
            <span className="spatial-header__logo-face">
              u<span>r.</span>
            </span>
          </a>

          <nav
            className="spatial-header__desktop"
            aria-label="Main navigation"
          >
            {items.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={
                  active === item.href
                    ? "spatial-header__nav-link spatial-header__nav-link--active"
                    : "spatial-header__nav-link"
                }
                aria-current={
                  active === item.href ? "location" : undefined
                }
              >
                <span className="spatial-header__number">
                  0{index + 1}
                </span>

                {item.name}

                <span
                  className="spatial-header__active-dot"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          <div className="spatial-header__actions">
            <a
              className="spatial-header__talk"
              href="#contact"
              onClick={closeMenu}
            >
              Let’s talk
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="spatial-header__toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={navigationId}
              onClick={() => setOpen((current) => !current)}
            >
              {open ? (
                <X size={21} aria-hidden="true" />
              ) : (
                <Menu size={21} aria-hidden="true" />
              )}
            </button>
          </div>

          <div
            className="spatial-header__progress-track"
            aria-hidden="true"
          >
            <div
              ref={progressRef}
              className="spatial-header__progress"
            />
          </div>
        </div>

        <nav
          id={navigationId}
          className="spatial-header__mobile"
          aria-label="Mobile navigation"
          hidden={!open}
        >
          <div className="spatial-header__mobile-caption">
            <span>EXPLORE THE PORTFOLIO</span>
            <span aria-hidden="true">✳</span>
          </div>

          <div className="spatial-header__mobile-links">
            {items.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={
                  active === item.href ? "location" : undefined
                }
                onClick={closeMenu}
              >
                <span className="spatial-header__mobile-number">
                  0{index + 1}
                </span>

                <span>{item.name}</span>

                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="spatial-header__mobile-bottom">
            <span>BUILT WITH CURIOSITY.</span>

            <a
              href="/uzair.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Resume
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>

      <style jsx>{`
        .spatial-header {
          position: fixed;
          z-index: 1000;
          top: 16px;
          right: 0;
          left: 0;
          padding: 0 24px;
          pointer-events: none;
        }

        .spatial-header,
        .spatial-header *,
        .spatial-header *::before,
        .spatial-header *::after {
          box-sizing: border-box;
        }

        .spatial-header__shell {
          position: relative;
          width: min(1180px, 100%);
          margin: 0 auto;
          perspective: 1000px;
          pointer-events: auto;
        }

        .spatial-header__bar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          min-height: 70px;
          padding: 10px 16px;
          background:
            radial-gradient(
              ellipse at 15% 0,
              rgba(174, 132, 229, 0.12),
              transparent 55%
            ),
            rgba(19, 16, 27, 0.94);
          border: 1px solid rgba(202, 171, 240, 0.2);
          border-radius: 19px;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.05),
            0 5px 0 #0b0910,
            0 6px 0 rgba(163, 125, 208, 0.17),
            0 15px 35px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition:
            background 220ms ease,
            border-color 220ms ease,
            box-shadow 220ms ease;
        }

        .spatial-header--scrolled .spatial-header__bar {
          background: rgba(16, 13, 23, 0.97);
          border-color: rgba(202, 171, 240, 0.28);
          box-shadow:
            0 5px 0 #0b0910,
            0 6px 0 rgba(163, 125, 208, 0.2),
            0 18px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .spatial-header__logo {
          display: block;
          flex-shrink: 0;
          color: #f5edff;
          text-decoration: none;
          perspective: 300px;
        }

        .spatial-header__logo-face {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 44px;
          background: linear-gradient(135deg, #3b2b4e, #1a1325);
          border: 1px solid rgba(218, 185, 255, 0.32);
          border-radius: 12px;
          box-shadow:
            0 4px 0 #0b0711,
            inset 0 1px 0 rgba(255, 255, 255, 0.13);
          font-size: 1.55rem;
          font-weight: 750;
          letter-spacing: -0.09em;
          transform: rotateY(-10deg) rotateX(7deg);
          transition: transform 220ms ease;
        }

        .spatial-header__logo-face > span {
          color: #c9a6f3;
        }

        .spatial-header__logo:hover .spatial-header__logo-face {
          transform: rotateY(8deg) rotateX(-4deg) translateY(-2px);
        }

        .spatial-header__desktop {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .spatial-header__nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          min-height: 44px;
          padding: 0.65rem 0.9rem;
          color: #bdb0cc;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          font-size: 0.8rem;
          text-decoration: none;
          transition:
            color 180ms ease,
            background 180ms ease,
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .spatial-header__number {
          align-self: flex-start;
          margin-top: 1px;
          color: #9581a8;
          font-family: ui-monospace, monospace;
          font-size: 0.48rem;
        }

        .spatial-header__nav-link:hover {
          color: #eee0ff;
          background: rgba(186, 144, 231, 0.07);
          transform: translateY(-2px);
        }

        .spatial-header__nav-link--active {
          color: #f0e2ff;
          background: linear-gradient(135deg, #30233f, #1d1628);
          border-color: rgba(195, 156, 236, 0.22);
          box-shadow:
            0 3px 0 #0b0810,
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .spatial-header__active-dot {
          position: absolute;
          bottom: 5px;
          left: calc(50% - 2px);
          width: 4px;
          height: 4px;
          background: #d0aff7;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(208, 175, 247, 0.7);
          opacity: 0;
          transition: opacity 180ms ease;
        }

        .spatial-header__nav-link--active
          .spatial-header__active-dot {
          opacity: 1;
        }

        .spatial-header__actions {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          flex-shrink: 0;
        }

        .spatial-header__talk {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          min-height: 44px;
          padding: 0.6rem 1rem;
          color: #291a37;
          background: linear-gradient(135deg, #ead9ff, #bca1e6);
          border: 1px solid rgba(238, 218, 255, 0.7);
          border-radius: 11px;
          box-shadow:
            0 4px 0 #674b84,
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          font-size: 0.78rem;
          font-weight: 650;
          text-decoration: none;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .spatial-header__talk:hover {
          transform: translateY(-2px);
          box-shadow:
            0 6px 0 #674b84,
            0 8px 20px rgba(165, 111, 221, 0.15);
        }

        .spatial-header__talk:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #674b84;
        }

        .spatial-header__toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          margin: 0;
          padding: 0;
          color: #e2cef8;
          background: linear-gradient(140deg, #2c2239, #17111f);
          border: 1px solid rgba(200, 164, 238, 0.25);
          border-radius: 11px;
          box-shadow:
            0 3px 0 #09070d,
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          cursor: pointer;
          touch-action: manipulation;
        }

        .spatial-header__toggle[aria-expanded="true"] {
          color: #f5eaff;
          background: #382848;
          border-color: rgba(210, 169, 255, 0.45);
        }

        .spatial-header__progress-track {
          position: absolute;
          right: 18px;
          bottom: -1px;
          left: 18px;
          height: 2px;
          overflow: hidden;
          border-radius: 999px;
          pointer-events: none;
        }

        .spatial-header__progress {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #b88cec, #ddc4ff, #9ed8dc);
          box-shadow: 0 0 9px rgba(195, 150, 247, 0.7);
          transform: scaleX(0);
          transform-origin: left center;
        }

        .spatial-header__mobile {
          display: none;
        }

        .spatial-header a:focus-visible,
        .spatial-header button:focus-visible {
          outline: 2px solid #e0c4ff;
          outline-offset: 4px;
        }

        .spatial-header__skip {
          position: fixed;
          z-index: 2;
          top: 8px;
          left: 12px;
          padding: 0.8rem 1rem;
          color: #21132d;
          background: #e4ceff;
          border-radius: 9px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          pointer-events: auto;
          transform: translateY(-160%);
        }

        .spatial-header__skip:focus {
          transform: translateY(0);
        }

        @keyframes spatial-menu-enter {
          from {
            opacity: 0;
            transform: translateY(-8px) rotateX(-7deg);
          }

          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        @media (max-width: 1000px) and (min-width: 801px) {
          .spatial-header__bar {
            gap: 0.75rem;
          }

          .spatial-header__desktop {
            gap: 0.1rem;
          }

          .spatial-header__nav-link {
            gap: 0.3rem;
            padding-right: 0.65rem;
            padding-left: 0.65rem;
            font-size: 0.75rem;
          }
        }

        @media (max-width: 800px) {
          .spatial-header {
            top: 10px;
            padding: 0 12px;
          }

          .spatial-header__bar {
            min-height: 58px;
            gap: 0.75rem;
            padding: 6px 9px;
            border-radius: 15px;
          }

          .spatial-header__logo-face {
            width: 44px;
            height: 42px;
            font-size: 1.4rem;
            border-radius: 10px;
          }

          .spatial-header__desktop {
            display: none;
          }

          .spatial-header__actions {
            gap: 0.55rem;
          }

          .spatial-header__talk {
            gap: 0.4rem;
            min-height: 44px;
            padding: 0.55rem 0.8rem;
            border-radius: 10px;
            font-size: 0.73rem;
          }

          .spatial-header__toggle {
            display: inline-flex;
          }

          .spatial-header__mobile:not([hidden]) {
            position: absolute;
            top: calc(100% + 13px);
            right: 0;
            left: 0;
            display: block;
            max-height: calc(100vh - 100px);
            max-height: calc(100dvh - 100px);
            overflow-y: auto;
            overscroll-behavior: contain;
            padding: 1rem;
            color: #eee0fb;
            background:
              radial-gradient(
                ellipse at 100% 0,
                rgba(165, 111, 221, 0.14),
                transparent 55%
              ),
              #15101e;
            border: 1px solid rgba(204, 165, 244, 0.25);
            border-radius: 18px;
            box-shadow:
              0 6px 0 #09070e,
              0 7px 0 rgba(164, 126, 204, 0.2),
              0 24px 45px rgba(0, 0, 0, 0.45),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
            transform-origin: top center;
            animation: spatial-menu-enter 220ms ease both;
          }

          .spatial-header__mobile-caption {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding: 0.1rem 0.25rem 0.8rem;
            color: #b59acb;
            font-family: ui-monospace, monospace;
            font-size: 0.48rem;
            letter-spacing: 0.09em;
          }

          .spatial-header__mobile-caption > span:last-child {
            color: #d1aff5;
            font-size: 1.2rem;
          }

          .spatial-header__mobile-links {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.65rem;
          }

          .spatial-header__mobile-links a {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-height: 64px;
            padding: 0.75rem;
            color: #e0d0ee;
            background: linear-gradient(135deg, #292032, #1a1323);
            border: 1px solid rgba(197, 160, 232, 0.13);
            border-radius: 12px;
            box-shadow:
              0 3px 0 #0c0811,
              inset 0 1px 0 rgba(255, 255, 255, 0.035);
            font-size: 0.9rem;
            text-decoration: none;
          }

          .spatial-header__mobile-number {
            align-self: flex-start;
            margin-top: 2px;
            color: #b296c6;
            font-family: ui-monospace, monospace;
            font-size: 0.5rem;
          }

          .spatial-header__mobile-links a :global(svg) {
            flex-shrink: 0;
            width: 16px;
            height: 16px;
            margin-left: auto;
            color: #bfa0d9;
          }

          .spatial-header__mobile-links a[aria-current="location"] {
            color: #f5e9ff;
            background: linear-gradient(135deg, #463057, #2a1c39);
            border-color: rgba(210, 169, 255, 0.45);
          }

          .spatial-header__mobile-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            margin-top: 1rem;
            padding-top: 0.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          .spatial-header__mobile-bottom > span {
            color: #af97c2;
            font-family: ui-monospace, monospace;
            font-size: 0.44rem;
            letter-spacing: 0.05em;
          }

          .spatial-header__mobile-bottom a {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            min-height: 44px;
            color: #dfc6f6;
            font-size: 0.76rem;
            text-decoration: none;
          }
        }

        @media (max-width: 360px) {
          .spatial-header {
            padding: 0 9px;
          }

          .spatial-header__mobile:not([hidden]) {
            padding: 0.8rem;
          }

          .spatial-header__mobile-links {
            gap: 0.5rem;
          }

          .spatial-header__mobile-links a {
            gap: 0.35rem;
            padding: 0.65rem;
            font-size: 0.8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .spatial-header *,
          .spatial-header *::before,
          .spatial-header *::after {
            animation: none !important;
            transition: none !important;
          }

          .spatial-header__logo-face,
          .spatial-header__logo:hover .spatial-header__logo-face,
          .spatial-header__nav-link:hover,
          .spatial-header__talk:hover,
          .spatial-header__talk:active {
            transform: none;
          }
        }
      `}</style>
    </header>
  );
}