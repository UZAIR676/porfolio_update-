"use client";

import { useState, type PointerEvent } from "react";
import { ArrowUpRight, ArrowUp } from "lucide-react";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/UZAIR676",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/uzair-rana-uzair/",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/aeronox_/",
  },
];

export default function Footer() {
  const [energized, setEnergized] = useState(false);

  function moveCard(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();

    if (!bounds.width || !bounds.height) {
      return;
    }

    const x = Math.max(
      -1,
      Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
    );

    const y = Math.max(
      -1,
      Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
    );

    card.style.setProperty("--tilt-x", `${-y * 4}deg`);
    card.style.setProperty("--tilt-y", `${x * 5}deg`);
    card.style.setProperty("--light-x", `${50 + x * 35}%`);
    card.style.setProperty("--light-y", `${50 + y * 35}%`);
  }

  function resetCard(event: PointerEvent<HTMLDivElement>) {
    const card = event.currentTarget;

    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--light-x", "70%");
    card.style.setProperty("--light-y", "20%");
  }

  return (
    <footer className="orbit-footer">
      <div className="orbit-footer__container">
        <div className="orbit-footer__perspective">
          <div
            className="orbit-footer__card"
            onPointerMove={moveCard}
            onPointerLeave={resetCard}
            onPointerCancel={resetCard}
          >
            <div className="orbit-footer__grid" aria-hidden="true" />

            <div className="orbit-footer__copy">
              <span className="orbit-footer__eyebrow">
                <i aria-hidden="true" />
                THE NEXT CHAPTER
              </span>

              <h2>
                Good ideas.
                <br />
                <em>Great possibilities.</em>
              </h2>

              <p>Have something in mind? Let’s bring it to life.</p>

              <a href="#contact" className="orbit-footer__connect">
                Let’s connect
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>

            <div className="footer-orb-scene">
              <div className="footer-orb-scene__glow" aria-hidden="true" />

              <button
                type="button"
                className={`footer-orb ${
                  energized ? "footer-orb--energized" : ""
                }`}
                onClick={() => setEnergized((current) => !current)}
                aria-label={
                  energized
                    ? "Return the orb to its normal glow"
                    : "Change the orb glow"
                }
                aria-pressed={energized}
              >
                <span className="footer-orb__float" aria-hidden="true">
                  <span className="footer-orb__ring footer-orb__ring--back" />

                  <span className="footer-orb__sphere">
                    <span className="footer-orb__shine" />
                    <span className="footer-orb__symbol">✳</span>
                    <span className="footer-orb__equator" />
                  </span>

                  <span className="footer-orb__ring footer-orb__ring--front">
                    <span />
                  </span>

                  <span className="footer-orb__satellite footer-orb__satellite--one" />
                  <span className="footer-orb__satellite footer-orb__satellite--two" />
                </span>
              </button>

              <div className="footer-orb-scene__base" aria-hidden="true" />

              <span className="footer-orb-scene__caption">
                TAP TO {energized ? "RESET" : "IGNITE"} ↗
              </span>
            </div>
          </div>
        </div>

        <div className="orbit-footer__main">
          <a
            href="#home"
            className="orbit-footer__wordmark"
            aria-label="Uzair — back to home"
          >
            uzair
            <span aria-hidden="true">✳</span>
          </a>

          <nav
            className="orbit-footer__socials"
            aria-label="Social profiles"
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </nav>

          <a
            href="#home"
            className="orbit-footer__back"
            aria-label="Back to top"
          >
            <ArrowUp size={20} aria-hidden="true" />
          </a>
        </div>

        <div className="orbit-footer__bottom">
          <span>
            © {new Date().getFullYear()} Rana Muhammad Uzair
          </span>

          <span className="orbit-footer__motto">
            THOUGHTFULLY BUILT. ALWAYS EVOLVING.
          </span>

          <span>NEW YORK, USA</span>
        </div>
      </div>

      <style jsx>{`
        .orbit-footer {
          position: relative;
          isolation: isolate;
          padding: 3rem 0 1.2rem;
          color: #f1eaf9;
          background: #08090d;
          border-top: 1px solid rgba(194, 165, 231, 0.1);
        }

        .orbit-footer,
        .orbit-footer *,
        .orbit-footer *::before,
        .orbit-footer *::after {
          box-sizing: border-box;
        }

        .orbit-footer__container {
          width: min(1240px, calc(100% - 48px));
          margin: 0 auto;
        }

        .orbit-footer__perspective {
          perspective: 1200px;
          padding-bottom: 10px;
        }

        .orbit-footer__card {
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --light-x: 70%;
          --light-y: 20%;
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          align-items: center;
          gap: 1.5rem;
          min-height: 320px;
          padding: 2.5rem 3rem;
          background:
            radial-gradient(
              circle at var(--light-x) var(--light-y),
              rgba(166, 126, 225, 0.16),
              transparent 55%
            ),
            linear-gradient(130deg, #1b1526, #111018 65%, #151322);
          border: 1px solid rgba(204, 173, 246, 0.23);
          border-radius: 25px;
          box-shadow:
            0 2px 0 #3a2c4b,
            0 9px 0 #17121f,
            0 10px 0 rgba(192, 157, 236, 0.14),
            0 28px 60px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
          transform:
            rotateX(var(--tilt-x))
            rotateY(var(--tilt-y));
          transform-style: preserve-3d;
          transition: transform 220ms ease-out;
        }

        .orbit-footer__grid {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background-image:
            linear-gradient(
              rgba(188, 155, 229, 0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(188, 155, 229, 0.045) 1px,
              transparent 1px
            );
          background-size: 35px 35px;
          mask-image: linear-gradient(90deg, transparent 15%, black);
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 15%,
            black
          );
        }

        .orbit-footer__copy {
          position: relative;
          min-width: 0;
          transform: translateZ(28px);
        }

        .orbit-footer__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #b9a5cc;
          font-family: ui-monospace, monospace;
          font-size: 0.57rem;
          letter-spacing: 0.13em;
        }

        .orbit-footer__eyebrow i {
          width: 5px;
          height: 5px;
          background: #bca0ed;
          border-radius: 50%;
          box-shadow: 0 0 11px rgba(188, 160, 237, 0.8);
        }

        .orbit-footer__copy h2 {
          margin: 0.9rem 0;
          color: #f1eaf9;
          font-size: clamp(2rem, 4vw, 3.7rem);
          font-weight: 550;
          letter-spacing: -0.06em;
          line-height: 1.1;
        }

        .orbit-footer__copy h2 em {
          color: transparent;
          font-style: normal;
          background: linear-gradient(100deg, #dfc6ff, #b59ae5, #9fd7db);
          background-clip: text;
          -webkit-background-clip: text;
        }

        .orbit-footer__copy p {
          max-width: 330px;
          margin: 0 0 1.4rem;
          color: #b4a5c2;
          font-size: 0.85rem;
          line-height: 1.7;
        }

        .orbit-footer__connect {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          min-height: 46px;
          padding: 0.7rem 1.1rem;
          color: #251831;
          background: linear-gradient(135deg, #e8d8ff, #bca4e8);
          border: 1px solid #e2ccff;
          border-radius: 12px;
          box-shadow:
            0 5px 0 #6f538e,
            0 10px 20px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          font-size: 0.83rem;
          font-weight: 650;
          text-decoration: none;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .orbit-footer__connect:hover {
          transform: translateY(-2px);
          box-shadow:
            0 7px 0 #6f538e,
            0 13px 24px rgba(0, 0, 0, 0.25);
        }

        .orbit-footer__connect:active {
          transform: translateY(3px);
          box-shadow: 0 2px 0 #6f538e;
        }

        .footer-orb-scene {
          position: relative;
          display: grid;
          min-width: 0;
          height: 270px;
          place-items: center;
          transform: translateZ(40px);
        }

        .footer-orb-scene__glow {
          position: absolute;
          inset: 0 -5%;
          background: radial-gradient(
            ellipse,
            rgba(161, 114, 234, 0.23),
            transparent 65%
          );
          pointer-events: none;
        }

        .footer-orb {
          --orb-size: 165px;
          position: relative;
          z-index: 2;
          display: block;
          width: 260px;
          height: 230px;
          margin: 0;
          padding: 0;
          background: transparent;
          border: 0;
          border-radius: 50%;
          cursor: pointer;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .footer-orb__float {
          position: absolute;
          inset: 0;
          display: block;
          animation: footer-orb-float 5s ease-in-out infinite;
        }

        .footer-orb__sphere {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 50%;
          display: grid;
          width: var(--orb-size);
          height: var(--orb-size);
          overflow: hidden;
          background:
            radial-gradient(
              circle at 30% 23%,
              rgba(255, 255, 255, 0.98),
              rgba(238, 220, 255, 0.65) 8%,
              transparent 30%
            ),
            radial-gradient(
              circle at 68% 78%,
              #33234d,
              #7d5ba3 35%,
              #c6a5eb 65%,
              #f1e3ff
            );
          border: 1px solid rgba(239, 219, 255, 0.7);
          border-radius: 50%;
          box-shadow:
            inset 6px 6px 17px rgba(255, 255, 255, 0.35),
            inset -13px -17px 24px rgba(28, 12, 51, 0.55),
            14px 20px 28px rgba(0, 0, 0, 0.3),
            0 0 35px rgba(175, 124, 234, 0.15);
          transform: translate(-50%, -50%);
          place-items: center;
          transition:
            filter 400ms ease,
            box-shadow 400ms ease;
        }

        .footer-orb--energized .footer-orb__sphere {
          filter: hue-rotate(55deg) brightness(1.15);
          box-shadow:
            inset 6px 6px 17px rgba(255, 255, 255, 0.4),
            inset -13px -17px 24px rgba(28, 12, 51, 0.4),
            0 0 50px rgba(148, 190, 255, 0.45);
        }

        .footer-orb__shine {
          position: absolute;
          top: 12%;
          left: 17%;
          width: 45%;
          height: 19%;
          background: rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          filter: blur(7px);
          transform: rotate(-35deg);
        }

        .footer-orb__symbol {
          position: relative;
          color: rgba(255, 245, 255, 0.85);
          font-size: 75px;
          line-height: 1;
          text-shadow:
            0 2px 0 rgba(90, 48, 125, 0.5),
            0 0 24px rgba(255, 255, 255, 0.4);
          animation: footer-symbol-turn 24s linear infinite;
        }

        .footer-orb__equator {
          position: absolute;
          inset: 35% -10%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: rotate(-25deg);
        }

        .footer-orb__ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 245px;
          height: 90px;
          border: 2px solid rgba(219, 193, 255, 0.65);
          border-radius: 50%;
          transform: translate(-50%, -50%) rotate(-28deg);
          pointer-events: none;
        }

        .footer-orb__ring--back {
          z-index: 1;
          border-color: rgba(168, 209, 235, 0.35);
          transform: translate(-50%, -50%) rotate(42deg);
        }

        .footer-orb__ring--front {
          z-index: 3;
          border-top-color: transparent;
          border-left-color: rgba(219, 193, 255, 0.2);
          box-shadow: 0 5px 6px rgba(24, 12, 35, 0.15);
          animation: footer-ring-drift 7s ease-in-out infinite;
        }

        .footer-orb__ring--front > span {
          position: absolute;
          right: 14px;
          bottom: 10px;
          width: 11px;
          height: 11px;
          background: radial-gradient(circle at 30% 25%, white, #bd91ec);
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(213, 181, 255, 0.7);
        }

        .footer-orb__satellite {
          position: absolute;
          width: 15px;
          height: 15px;
          background: radial-gradient(circle at 30% 25%, #ffffff, #9abfca);
          border-radius: 50%;
          box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.25);
        }

        .footer-orb__satellite--one {
          top: 20px;
          right: 29px;
          animation: footer-satellite 4s ease-in-out infinite;
        }

        .footer-orb__satellite--two {
          bottom: 21px;
          left: 24px;
          width: 9px;
          height: 9px;
          background: radial-gradient(circle at 30% 25%, white, #d3a5dd);
          animation: footer-satellite 4s ease-in-out -2s infinite;
        }

        .footer-orb-scene__base {
          position: absolute;
          bottom: 16px;
          left: 50%;
          width: 140px;
          height: 24px;
          background: radial-gradient(
            ellipse,
            rgba(0, 0, 0, 0.45),
            transparent 70%
          );
          border: 1px solid rgba(191, 158, 228, 0.15);
          border-radius: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .footer-orb-scene__caption {
          position: absolute;
          right: 0;
          bottom: -7px;
          left: 0;
          color: #bba6ce;
          font-family: ui-monospace, monospace;
          font-size: 0.48rem;
          letter-spacing: 0.1em;
          text-align: center;
          pointer-events: none;
        }

        .orbit-footer__main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 2rem 0 1.4rem;
        }

        .orbit-footer__wordmark {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #f2ecf9;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.065em;
          text-decoration: none;
        }

        .orbit-footer__wordmark span {
          color: #bba0ee;
          font-size: 1.5rem;
        }

        .orbit-footer__socials {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .orbit-footer__socials a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          min-height: 44px;
          padding: 0.55rem 0.85rem;
          color: #cbbcd9;
          background: linear-gradient(145deg, #1c1823, #100e15);
          border: 1px solid rgba(193, 163, 224, 0.13);
          border-radius: 10px;
          box-shadow: 0 4px 0 #050407;
          font-size: 0.75rem;
          text-decoration: none;
          transition:
            transform 180ms ease,
            border-color 180ms ease;
        }

        .orbit-footer__socials a:hover {
          border-color: rgba(193, 163, 224, 0.45);
          transform: translateY(-3px);
        }

        .orbit-footer__back {
          display: grid;
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          color: #ddcaf7;
          background: linear-gradient(145deg, #33283f, #17111f);
          border: 1px solid rgba(194, 159, 234, 0.3);
          border-radius: 13px;
          box-shadow:
            0 5px 0 #09070d,
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          place-items: center;
          transition: transform 180ms ease;
        }

        .orbit-footer__back:hover {
          transform: translateY(-3px);
        }

        .orbit-footer a:focus-visible,
        .orbit-footer button:focus-visible {
          outline: 2px solid #dac0fa;
          outline-offset: 5px;
        }

        .orbit-footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem 1rem;
          padding-top: 1rem;
          color: #a99ab6;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-family: ui-monospace, monospace;
          font-size: 0.52rem;
          line-height: 1.6;
          letter-spacing: 0.03em;
        }

        @keyframes footer-orb-float {
          0%,
          100% {
            transform: translateY(3px);
          }

          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes footer-symbol-turn {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes footer-ring-drift {
          0%,
          100% {
            transform: translate(-50%, -50%) rotate(-28deg);
          }

          50% {
            transform: translate(-50%, -50%) rotate(-16deg);
          }
        }

        @keyframes footer-satellite {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @media (min-width: 701px) and (max-width: 1000px) {
          .orbit-footer__card {
            gap: 0.75rem;
            padding: 2rem;
          }

          .footer-orb {
            transform: scale(0.85);
          }
        }

        /* Mobile: text left, smaller orb right. */
        @media (max-width: 700px) {
          .orbit-footer {
            padding: 1.5rem 0 1rem;
          }

          .orbit-footer__container {
            width: calc(100% - 28px);
          }

          .orbit-footer__card {
            grid-template-columns:
              minmax(0, 1.25fr)
              minmax(0, 0.75fr);
            gap: 0.35rem;
            min-height: 220px;
            padding: 1.2rem 0.9rem;
            border-radius: 17px;
            transform: none;
          }

          .orbit-footer__copy {
            transform: none;
          }

          .orbit-footer__eyebrow {
            gap: 0.35rem;
            font-size: 0.44rem;
            letter-spacing: 0.04em;
          }

          .orbit-footer__eyebrow i {
            width: 4px;
            height: 4px;
          }

          .orbit-footer__copy h2 {
            margin: 0.65rem 0;
            font-size: clamp(1.4rem, 5.5vw, 2.3rem);
            line-height: 1.12;
            letter-spacing: -0.055em;
          }

          .orbit-footer__copy p {
            margin-bottom: 0.9rem;
            font-size: 0.71rem;
            line-height: 1.55;
          }

          .orbit-footer__connect {
            gap: 0.5rem;
            min-height: 44px;
            padding: 0.6rem 0.75rem;
            border-radius: 9px;
            font-size: 0.72rem;
          }

          .footer-orb-scene {
            height: 165px;
            transform: none;
          }

          .footer-orb {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.43);
          }

          .footer-orb-scene__glow {
            inset: 0 -10%;
          }

          .footer-orb-scene__base {
            bottom: 20px;
            width: 75px;
            height: 15px;
          }

          .footer-orb-scene__caption {
            bottom: 3px;
            font-size: 0.42rem;
            letter-spacing: 0.025em;
          }

          .orbit-footer__main {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 0.8rem;
            padding: 1.35rem 0 1.1rem;
          }

          .orbit-footer__wordmark {
            font-size: 1.65rem;
          }

          .orbit-footer__wordmark span {
            font-size: 1.25rem;
          }

          .orbit-footer__back {
            grid-column: 2;
            grid-row: 1;
            width: 44px;
            height: 44px;
            border-radius: 11px;
          }

          .orbit-footer__socials {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            grid-column: 1 / -1;
            grid-row: 2;
            gap: 0.5rem;
          }

          .orbit-footer__socials a {
            gap: 0.25rem;
            padding: 0.45rem 0.3rem;
            font-size: 0.68rem;
            border-radius: 8px;
          }

          .orbit-footer__bottom {
            gap: 0.5rem;
            padding-top: 0.75rem;
            font-size: 0.45rem;
          }

          .orbit-footer__motto {
            display: none;
          }
        }

        @media (min-width: 480px) and (max-width: 700px) {
          .footer-orb {
            transform: translate(-50%, -50%) scale(0.58);
          }

          .footer-orb-scene {
            height: 195px;
          }

          .footer-orb-scene__base {
            width: 105px;
          }
        }

        @media (max-width: 360px) {
          .orbit-footer__card {
            padding: 1rem 0.7rem;
          }

          .orbit-footer__copy h2 {
            font-size: 1.3rem;
          }

          .orbit-footer__copy p {
            font-size: 0.67rem;
          }

          .footer-orb {
            transform: translate(-50%, -50%) scale(0.36);
          }

          .orbit-footer__bottom {
            font-size: 0.41rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-footer *,
          .orbit-footer *::before,
          .orbit-footer *::after {
            animation: none !important;
            transition: none !important;
          }

          .orbit-footer__card {
            transform: none;
          }

          .orbit-footer__connect:hover,
          .orbit-footer__connect:active,
          .orbit-footer__socials a:hover,
          .orbit-footer__back:hover {
            transform: none;
          }
        }
      `}</style>
    </footer>
  );
}