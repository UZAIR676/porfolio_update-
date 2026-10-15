"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Code2,
  BrainCircuit,
  MapPin,
  Sparkles,
} from "lucide-react";

import portrait from "./mainimg.jpeg";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();

    const x = Math.max(
      0,
      Math.min(1, (event.clientX - bounds.left) / bounds.width),
    );

    const y = Math.max(
      0,
      Math.min(1, (event.clientY - bounds.top) / bounds.height),
    );

    stage.style.setProperty("--rotate-x", `${(0.5 - y) * 12}deg`);
    stage.style.setProperty("--rotate-y", `${(x - 0.5) * 14}deg`);
    stage.style.setProperty("--light-x", `${x * 100}%`);
    stage.style.setProperty("--light-y", `${y * 100}%`);
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    const stage = event.currentTarget;

    stage.style.setProperty("--rotate-x", "0deg");
    stage.style.setProperty("--rotate-y", "0deg");
    stage.style.setProperty("--light-x", "50%");
    stage.style.setProperty("--light-y", "50%");
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`about3d ${visible ? "about3d--visible" : ""}`}
      aria-labelledby="about3d-title"
    >
      <div className="about3d__ambient" aria-hidden="true" />

      <div className="about3d__container">
        <div className="about3d__caption">
          <span>02 / THE PERSON BEHIND THE PIXELS</span>
          <span>ABOUT ME</span>
        </div>

        <div className="about3d__layout">
          <div className="about3d__portrait-reveal">
            <div
              className="about3d__stage"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              <div className="about3d__orbit" aria-hidden="true" />

              <div className="about3d__floating">
                <div className="about3d__spatial">
                  <div
                    className="about3d__backplate about3d__backplate--one"
                    aria-hidden="true"
                  />

                  <div
                    className="about3d__backplate about3d__backplate--two"
                    aria-hidden="true"
                  />

                  <div className="about3d__portrait">
                    <Image
                      src={portrait}
                      alt="Rana Muhammad Uzair"
                      fill
                      sizes="(max-width: 760px) 85vw, 440px"
                      className="about3d__image"
                    />

                    <div
                      className="about3d__image-shade"
                      aria-hidden="true"
                    />

                    <div
                      className="about3d__reflection"
                      aria-hidden="true"
                    />

                    <div className="about3d__portrait-caption">
                      <div>
                        <span className="about3d__small-label">
                          THE HUMAN BEHIND THE CODE
                        </span>
                        <strong>Rana Muhammad Uzair</strong>
                      </div>

                      <ArrowUpRight size={24} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="about3d__location">
                    <span className="about3d__location-icon">
                      <MapPin size={16} aria-hidden="true" />
                    </span>

                    <div>
                      <span>BASED IN</span>
                      <strong>New York City</strong>
                    </div>
                  </div>

                  <div className="about3d__signature">
                    <Sparkles size={18} aria-hidden="true" />
                    <span>
                      A curious mind.
                      <br />
                      Always building.
                    </span>
                  </div>
                </div>
              </div>

              <span
                className="about3d__particle about3d__particle--one"
                aria-hidden="true"
              />
              <span
                className="about3d__particle about3d__particle--two"
                aria-hidden="true"
              />
              <span
                className="about3d__particle about3d__particle--three"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="about3d__copy">
            <div className="about3d__eyebrow">
              <span aria-hidden="true" />
              DEVELOPER. EXPLORER. BUILDER.
            </div>

            <h2 id="about3d-title">
              A little curiosity.
              <br />
              A lot of
              <br />
              <em>building.</em>
            </h2>

            <p className="about3d__lead">
              I’m Uzair, a New York–based developer working at the intersection
              of <strong>full-stack development</strong> and{" "}
              <strong>artificial intelligence.</strong>
            </p>

            <p className="about3d__description">
              I build from the ground up: interfaces, APIs, machine learning
              pipelines, and AI-powered products. I care about how things
              work—and how they feel to use.
            </p>

            <div className="about3d__facts">
              <div
                className="about3d__fact"
                style={{ "--fact-delay": "100ms" } as CSSProperties}
              >
                <div className="about3d__fact-icon">
                  <Code2 size={22} aria-hidden="true" />
                </div>

                <div className="about3d__fact-copy">
                  <span>01 / ENGINEERING</span>
                  <h3>Full-stack products</h3>
                  <p>From interface to infrastructure.</p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="about3d__fact-arrow"
                  aria-hidden="true"
                />
              </div>

              <div
                className="about3d__fact"
                style={{ "--fact-delay": "200ms" } as CSSProperties}
              >
                <div className="about3d__fact-icon about3d__fact-icon--teal">
                  <BrainCircuit size={22} aria-hidden="true" />
                </div>

                <div className="about3d__fact-copy">
                  <span>02 / INTELLIGENCE</span>
                  <h3>Machine intelligence</h3>
                  <p>From raw data to working models.</p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="about3d__fact-arrow"
                  aria-hidden="true"
                />
              </div>
            </div>

            <a href="#contact" className="about3d__contact">
              <span>Let’s build something together</span>

              <span className="about3d__contact-icon">
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .about3d {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(5rem, 9vw, 8rem) 0;
          color: #f5f6fb;
          background: #08090d;
          scroll-margin-top: 5rem;
        }

        .about3d,
        .about3d * {
          box-sizing: border-box;
        }

        .about3d__container {
          position: relative;
          z-index: 1;
          width: min(1240px, calc(100% - 48px));
          margin: 0 auto;
        }

        .about3d__ambient {
          position: absolute;
          top: 20%;
          left: -18rem;
          width: 50rem;
          height: 50rem;
          pointer-events: none;
          background: radial-gradient(
            circle,
            rgba(118, 79, 220, 0.12),
            transparent 65%
          );
        }

        .about3d__caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1rem;
          color: #9296a5;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .about3d__layout {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          align-items: center;
          gap: clamp(3rem, 7vw, 7rem);
          padding-top: clamp(3rem, 7vw, 6rem);
        }

        .about3d__portrait-reveal,
        .about3d__copy {
          min-width: 0;
        }

        .about3d--visible .about3d__portrait-reveal {
          animation: about3d-enter-left 900ms
            cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .about3d--visible .about3d__copy {
          animation: about3d-enter-up 900ms
            cubic-bezier(0.2, 0.8, 0.2, 1) 120ms both;
        }

        .about3d__stage {
          --rotate-x: 0deg;
          --rotate-y: 0deg;
          --light-x: 50%;
          --light-y: 50%;
          position: relative;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          padding: 2rem 1.6rem 3rem;
          perspective: 1200px;
        }

        .about3d__orbit {
          position: absolute;
          top: 12%;
          right: -5%;
          bottom: 10%;
          left: -5%;
          pointer-events: none;
          border: 1px solid rgba(167, 139, 250, 0.13);
          border-radius: 50%;
          transform: rotate(-24deg);
        }

        .about3d__orbit::before {
          position: absolute;
          inset: 1.5rem -1rem;
          content: "";
          border: 1px dashed rgba(167, 139, 250, 0.12);
          border-radius: 50%;
          transform: rotate(45deg);
        }

        .about3d__floating {
          position: relative;
          transform-style: preserve-3d;
          animation: about3d-float 7s ease-in-out infinite;
        }

        .about3d__spatial {
          position: relative;
          width: 100%;
          aspect-ratio: 0.78;
          transform:
            rotateX(var(--rotate-x))
            rotateY(var(--rotate-y));
          transform-style: preserve-3d;
          transition: transform 220ms ease-out;
        }

        .about3d__backplate {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border: 1px solid rgba(190, 166, 255, 0.2);
          border-radius: 1.45rem;
        }

        .about3d__backplate--one {
          background: linear-gradient(
            145deg,
            rgba(145, 103, 235, 0.2),
            rgba(15, 16, 26, 0.9)
          );
          transform: translate3d(-16px, 12px, -35px) rotate(-6deg);
        }

        .about3d__backplate--two {
          background: linear-gradient(
            145deg,
            rgba(75, 173, 187, 0.12),
            rgba(15, 16, 26, 0.8)
          );
          transform: translate3d(14px, 7px, -65px) rotate(5deg);
        }

        .about3d__portrait {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #15151e;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1.3rem;
          box-shadow:
            0 35px 80px rgba(0, 0, 0, 0.45),
            0 0 0 5px rgba(255, 255, 255, 0.025);
          transform: translateZ(15px);
        }

        .about3d__image {
          object-fit: cover;
          object-position: center;
          transition: transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .about3d__stage:hover .about3d__image {
          transform: scale(1.045);
        }

        .about3d__image-shade {
          position: absolute;
          z-index: 1;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(8, 9, 13, 0.03) 35%,
            rgba(8, 9, 13, 0.12) 55%,
            rgba(8, 9, 13, 0.92) 100%
          );
        }

        .about3d__reflection {
          position: absolute;
          z-index: 2;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            circle at var(--light-x) var(--light-y),
            rgba(255, 255, 255, 0.16),
            transparent 55%
          );
          opacity: 0;
          transition: opacity 300ms ease;
        }

        .about3d__stage:hover .about3d__reflection {
          opacity: 1;
        }

        .about3d__portrait-caption {
          position: absolute;
          z-index: 3;
          right: 1.4rem;
          bottom: 1.5rem;
          left: 1.4rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
        }

        .about3d__small-label {
          display: block;
          margin-bottom: 0.6rem;
          color: #c5c1d3;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.52rem;
          letter-spacing: 0.14em;
        }

        .about3d__portrait-caption strong {
          display: block;
          color: #fff;
          font-size: clamp(1rem, 1.8vw, 1.35rem);
          font-weight: 600;
          letter-spacing: -0.035em;
        }

        .about3d__portrait-caption > svg {
          flex-shrink: 0;
          color: #d9ceff;
        }

        .about3d__location {
          position: absolute;
          z-index: 4;
          top: 1.6rem;
          left: -1.8rem;
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.8rem 1rem;
          background: rgba(19, 20, 30, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 0.9rem;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
          transform: translateZ(65px) rotate(-4deg);
          backdrop-filter: blur(14px);
        }

        .about3d__location-icon {
          display: grid;
          width: 2.1rem;
          height: 2.1rem;
          color: #c7b3ff;
          background: rgba(167, 139, 250, 0.12);
          border: 1px solid rgba(167, 139, 250, 0.18);
          border-radius: 0.65rem;
          place-items: center;
        }

        .about3d__location div > span {
          display: block;
          margin-bottom: 0.22rem;
          color: #9494a9;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.49rem;
          letter-spacing: 0.14em;
        }

        .about3d__location strong {
          color: #f0edf9;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .about3d__signature {
          position: absolute;
          z-index: 4;
          right: -1.7rem;
          bottom: -1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.2rem;
          color: #161122;
          background: linear-gradient(115deg, #d5c5ff, #a7dce9);
          border: 1px solid rgba(255, 255, 255, 0.45);
          border-radius: 0.85rem;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
          transform: translateZ(85px) rotate(5deg);
        }

        .about3d__signature span {
          font-size: 0.74rem;
          font-weight: 650;
          line-height: 1.5;
        }

        .about3d__signature svg {
          flex-shrink: 0;
        }

        .about3d__particle {
          position: absolute;
          width: 5px;
          height: 5px;
          pointer-events: none;
          background: #d8c9ff;
          border-radius: 50%;
          box-shadow: 0 0 17px 4px rgba(167, 139, 250, 0.4);
          animation: about3d-particle 5s ease-in-out infinite;
        }

        .about3d__particle--one {
          top: 10%;
          right: 2%;
        }

        .about3d__particle--two {
          bottom: 18%;
          left: -2%;
          width: 3px;
          height: 3px;
          animation-delay: -1.8s;
        }

        .about3d__particle--three {
          right: 12%;
          bottom: 2%;
          width: 4px;
          height: 4px;
          background: #9fe6e8;
          animation-delay: -3s;
        }

        .about3d__eyebrow {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
          color: #aaa2c2;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.59rem;
          font-weight: 600;
          letter-spacing: 0.13em;
        }

        .about3d__eyebrow > span {
          width: 6px;
          height: 6px;
          background: #b6a1f5;
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(167, 139, 250, 0.6);
        }

        .about3d__copy h2 {
          margin: 0 0 1.7rem;
          font-size: clamp(2.7rem, 4.8vw, 4.6rem);
          font-weight: 600;
          line-height: 1.04;
          letter-spacing: -0.065em;
        }

        .about3d__copy h2 em {
          color: transparent;
          font-style: normal;
          background: linear-gradient(
            100deg,
            #d5c6ff,
            #a58aee 50%,
            #8ad8df
          );
          background-clip: text;
          -webkit-background-clip: text;
        }

        .about3d__lead {
          margin: 0 0 1rem;
          color: #b8b8c8;
          font-size: 1rem;
          line-height: 1.8;
        }

        .about3d__lead strong {
          color: #eeebf7;
          font-weight: 500;
        }

        .about3d__description {
          margin: 0;
          color: #9193a4;
          font-size: 0.92rem;
          line-height: 1.85;
        }

        .about3d__facts {
          display: grid;
          gap: 0.8rem;
          margin-top: 1.9rem;
        }

        .about3d__fact {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: linear-gradient(
            115deg,
            rgba(255, 255, 255, 0.045),
            rgba(255, 255, 255, 0.015)
          );
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.9rem;
          transition:
            transform 250ms ease,
            border-color 250ms ease,
            background 250ms ease;
        }

        .about3d--visible .about3d__fact {
          animation: about3d-fact-enter 700ms ease both;
          animation-delay: calc(250ms + var(--fact-delay, 0ms));
        }

        .about3d__fact:hover {
          background: rgba(167, 139, 250, 0.065);
          border-color: rgba(167, 139, 250, 0.3);
          transform: translateX(5px);
        }

        .about3d__fact-icon {
          display: grid;
          flex-shrink: 0;
          width: 2.8rem;
          height: 2.8rem;
          color: #c5b1ff;
          background: rgba(167, 139, 250, 0.1);
          border: 1px solid rgba(167, 139, 250, 0.16);
          border-radius: 0.75rem;
          place-items: center;
          transition: transform 250ms ease;
        }

        .about3d__fact-icon--teal {
          color: #8ed7df;
          background: rgba(94, 186, 200, 0.09);
          border-color: rgba(94, 186, 200, 0.16);
        }

        .about3d__fact:hover .about3d__fact-icon {
          transform: rotate(-6deg) scale(1.06);
        }

        .about3d__fact-copy {
          min-width: 0;
        }

        .about3d__fact-copy > span {
          display: block;
          margin-bottom: 0.35rem;
          color: #86889a;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.49rem;
          letter-spacing: 0.12em;
        }

        .about3d__fact-copy h3 {
          margin: 0;
          color: #e9e7f2;
          font-size: 0.93rem;
          font-weight: 550;
          letter-spacing: -0.02em;
        }

        .about3d__fact-copy p {
          margin: 0.3rem 0 0;
          color: #9192a3;
          font-size: 0.73rem;
          line-height: 1.5;
        }

        .about3d__fact-arrow {
          flex-shrink: 0;
          margin-left: auto;
          color: #727387;
          transition:
            transform 250ms ease,
            color 250ms ease;
        }

        .about3d__fact:hover .about3d__fact-arrow {
          color: #d2c3ff;
          transform: translate(2px, -2px);
        }

        .about3d__contact {
          display: inline-flex;
          align-items: center;
          gap: 1.1rem;
          margin-top: 1.8rem;
          color: #e8e2f6;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
        }

        .about3d__contact > span:first-child {
          position: relative;
          padding-bottom: 0.2rem;
        }

        .about3d__contact > span:first-child::after {
          position: absolute;
          right: 0;
          bottom: -3px;
          left: 0;
          height: 1px;
          content: "";
          background: #c4b0ff;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 250ms ease;
        }

        .about3d__contact:hover > span:first-child::after {
          transform: scaleX(1);
        }

        .about3d__contact-icon {
          display: grid;
          width: 2.65rem;
          height: 2.65rem;
          color: #d5c7ff;
          background: rgba(167, 139, 250, 0.08);
          border: 1px solid rgba(167, 139, 250, 0.25);
          border-radius: 50%;
          place-items: center;
          transition:
            transform 250ms ease,
            background 250ms ease,
            color 250ms ease;
        }

        .about3d__contact:hover .about3d__contact-icon {
          color: #15101e;
          background: #d3c3ff;
          transform: translate(3px, -3px);
        }

        .about3d__contact:focus-visible {
          outline: 2px solid #c4b0ff;
          outline-offset: 7px;
          border-radius: 0.3rem;
        }

        @keyframes about3d-float {
          0%,
          100% {
            transform: translateY(0) rotate(-1deg);
          }

          50% {
            transform: translateY(-12px) rotate(1deg);
          }
        }

        @keyframes about3d-particle {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.45;
          }

          50% {
            transform: translateY(-16px);
            opacity: 1;
          }
        }

        @keyframes about3d-enter-left {
          from {
            opacity: 0;
            transform: translate(-25px, 25px);
          }

          to {
            opacity: 1;
            transform: translate(0, 0);
          }
        }

        @keyframes about3d-enter-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes about3d-fact-enter {
          from {
            opacity: 0;
            translate: 0 16px;
          }

          to {
            opacity: 1;
            translate: 0 0;
          }
        }

        @media (max-width: 1000px) {
          .about3d__layout {
            gap: 2.7rem;
          }

          .about3d__stage {
            padding-right: 1.2rem;
            padding-left: 1.2rem;
          }

          .about3d__location {
            left: -0.8rem;
          }

          .about3d__signature {
            right: -0.8rem;
          }
        }

        @media (max-width: 760px) {
          .about3d {
            padding: 4.5rem 0;
          }

          .about3d__container {
            width: min(620px, calc(100% - 32px));
          }

          .about3d__caption {
            align-items: flex-start;
            font-size: 0.53rem;
            line-height: 1.6;
          }

          .about3d__caption > span:last-child {
            flex-shrink: 0;
          }

          .about3d__layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding-top: 2.8rem;
          }

          .about3d__stage {
            max-width: 390px;
            padding: 1.8rem 1.7rem 2.6rem;
          }

          .about3d__copy h2 {
            font-size: clamp(2.8rem, 10vw, 4rem);
          }

          .about3d__lead {
            font-size: 0.96rem;
          }

          .about3d__description {
            font-size: 0.88rem;
          }

          .about3d__portrait-caption strong {
            font-size: 1.1rem;
          }

          .about3d__signature {
            right: -0.6rem;
            padding: 0.85rem 1rem;
          }

          .about3d__signature span {
            font-size: 0.68rem;
          }

          .about3d__location {
            left: -0.6rem;
            padding: 0.7rem 0.8rem;
          }

          .about3d__orbit {
            right: 0;
            left: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about3d *,
          .about3d *::before,
          .about3d *::after {
            animation: none !important;
            transition: none !important;
          }

          .about3d__spatial,
          .about3d__floating {
            transform: none;
          }

          .about3d__stage:hover .about3d__image,
          .about3d__fact:hover,
          .about3d__fact:hover .about3d__fact-icon,
          .about3d__fact:hover .about3d__fact-arrow,
          .about3d__contact:hover .about3d__contact-icon {
            transform: none;
          }
        }
      `}</style>
    </section>
    
  );
}

     