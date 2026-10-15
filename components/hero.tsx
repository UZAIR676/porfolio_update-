"use client";

import { useState, type PointerEvent } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function Hero() {
  const [greeting, setGreeting] = useState(false);

  function moveRobot(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();

    const x = Math.max(
      -1,
      Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
    );

    const y = Math.max(
      -1,
      Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
    );

    stage.style.setProperty("--head-x", `${-y * 10}deg`);
    stage.style.setProperty("--head-y", `${x * 16}deg`);
    stage.style.setProperty("--eye-x", `${x * 7}px`);
    stage.style.setProperty("--eye-y", `${y * 5}px`);
  }

  function resetRobot(event: PointerEvent<HTMLDivElement>) {
    const stage = event.currentTarget;

    stage.style.setProperty("--head-x", "0deg");
    stage.style.setProperty("--head-y", "0deg");
    stage.style.setProperty("--eye-x", "0px");
    stage.style.setProperty("--eye-y", "0px");
  }

  return (
    <section id="home" className="robot-hero">
      <div className="robot-hero__background" aria-hidden="true" />

      <div className="robot-hero__container">
        <div className="robot-hero__kicker">
          <span>
            <i aria-hidden="true" />
            INDEPENDENT MIND. BUILDER AT HEART.
          </span>

          <span>BASED IN NEW YORK, USA ↗</span>
        </div>

        <div className="robot-hero__name" aria-label="Uzair Rana">
          <span>UZAIR</span>

          <span className="robot-hero__outline">
            RANA<span className="robot-hero__dot">.</span>
          </span>
        </div>

        <div className="robot-hero__main">
          <div className="robot-hero__copy">
            <span className="robot-hero__label">
              FULL STACK DEVELOPER & AI / ML ENGINEER
            </span>

            <h1>
              Built with logic.
              <br />
              <em>Made to feel.</em>
            </h1>

            <p>
              Web experiences with personality.
              <br />
              Intelligent products with purpose.
              <br />
              I turn the “what if” into something real.
            </p>

            <a className="robot-hero__cta" href="#projects">
              Discover my work
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div
            className="robot-stage"
            onPointerMove={moveRobot}
            onPointerLeave={resetRobot}
            onPointerCancel={resetRobot}
          >
            <div className="robot-stage__glow" aria-hidden="true" />
            <div className="robot-stage__grid" aria-hidden="true" />

            <div
              className="robot-stage__orbit robot-stage__orbit--one"
              aria-hidden="true"
            />

            <div
              className="robot-stage__orbit robot-stage__orbit--two"
              aria-hidden="true"
            />

            <span
              className="robot-stage__spark robot-stage__spark--one"
              aria-hidden="true"
            />

            <span
              className="robot-stage__spark robot-stage__spark--two"
              aria-hidden="true"
            />

            <span
              className="robot-stage__spark robot-stage__spark--three"
              aria-hidden="true"
            />

            <div className="robot-stage__status">
              <span aria-hidden="true" />
              A LITTLE HUMAN. A LITTLE AI.
            </div>

            <div
              className={`robot-stage__greeting ${
                greeting ? "robot-stage__greeting--visible" : ""
              }`}
              role="status"
            >
              {greeting ? "Hey, I’m Uzair’s little AI. Let’s build! ✦" : ""}
            </div>

            <button
              type="button"
              className={`ai-robot ${greeting ? "ai-robot--happy" : ""}`}
              aria-label={
                greeting
                  ? "Hide the robot greeting"
                  : "Say hello to the AI robot"
              }
              aria-pressed={greeting}
              onClick={() => setGreeting((current) => !current)}
            >
              <span className="ai-robot__floating" aria-hidden="true">
                <span className="ai-robot__head">
                  <span className="ai-robot__antenna">
                    <span />
                  </span>

                  <span className="ai-robot__ear ai-robot__ear--left" />
                  <span className="ai-robot__ear ai-robot__ear--right" />

                  <span className="ai-robot__shell">
                    <span className="ai-robot__head-shine" />

                    <span className="ai-robot__face">
                      <span className="ai-robot__face-glass" />

                      <span className="ai-robot__eyes">
                        <span className="ai-robot__eye" />
                        <span className="ai-robot__eye" />
                      </span>

                      <span className="ai-robot__cheek ai-robot__cheek--left" />
                      <span className="ai-robot__cheek ai-robot__cheek--right" />
                      <span className="ai-robot__mouth" />
                    </span>
                  </span>
                </span>

                <span className="ai-robot__neck" />

                <span className="ai-robot__arm ai-robot__arm--left">
                  <span className="ai-robot__hand" />
                </span>

                <span className="ai-robot__arm ai-robot__arm--right">
                  <span className="ai-robot__hand" />
                </span>

                <span className="ai-robot__body">
                  <span className="ai-robot__body-seam" />

                  <span className="ai-robot__core">
                    <span />
                  </span>

                  <span className="ai-robot__body-label">UZ / AI</span>

                  <span className="ai-robot__vents">
                    <i />
                    <i />
                    <i />
                  </span>
                </span>

                <span className="ai-robot__leg ai-robot__leg--left" />
                <span className="ai-robot__leg ai-robot__leg--right" />
              </span>
            </button>

            <div className="robot-stage__shadow" aria-hidden="true" />
            <div className="robot-stage__platform" aria-hidden="true" />

            <div className="robot-stage__caption">
              <span>FIG. 01 — YOUR NEXT IDEA STARTS HERE</span>
              <span>MOVE YOUR CURSOR · TAP TO SAY HI</span>
            </div>
          </div>
        </div>

        <div className="robot-hero__bottom">
          <a href="#projects">
            <ArrowDown size={16} />
            SCROLL TO EXPLORE
          </a>

          <span>REACT / NEXT.JS / PYTHON / PYTORCH</span>

          <a href="/uzair.pdf" target="_blank" rel="noreferrer">
            RESUME
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <style jsx global>{`
        .robot-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 7rem 0 1.5rem;
          color: #f4f2fa;
          background: #08090d;
        }

        .robot-hero,
        .robot-hero * {
          box-sizing: border-box;
        }

        .robot-hero__background {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            radial-gradient(
              ellipse at 80% 55%,
              rgba(113, 72, 200, 0.12),
              transparent 45%
            ),
            radial-gradient(
              ellipse at 15% 5%,
              rgba(116, 99, 182, 0.08),
              transparent 40%
            );
        }

        .robot-hero__container {
          width: min(1240px, calc(100% - 48px));
          margin: 0 auto;
        }

        .robot-hero__kicker {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          color: #9493a4;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          line-height: 1.6;
        }

        .robot-hero__kicker > span:first-child {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .robot-hero__kicker i {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          background: #bda5ff;
          border-radius: 50%;
          box-shadow: 0 0 14px rgba(189, 165, 255, 0.6);
        }

        .robot-hero__name {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          margin: 2rem 0 0;
          font-size: clamp(4rem, 14.5vw, 12.2rem);
          font-weight: 750;
          line-height: 0.95;
          letter-spacing: -0.075em;
          user-select: none;
          animation: robot-hero-enter 850ms ease both;
        }

        .robot-hero__outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(211, 202, 237, 0.65);
        }

        .robot-hero__dot {
          color: #b69af3;
          -webkit-text-stroke: 0;
        }

        .robot-hero__main {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          align-items: center;
          gap: 2rem;
          min-height: 560px;
          padding: 2rem 0;
        }

        .robot-hero__copy {
          position: relative;
          z-index: 2;
          padding: 2rem 0;
          animation: robot-hero-enter 850ms ease 100ms both;
        }

        .robot-hero__label {
          display: block;
          margin-bottom: 1.25rem;
          color: #a39aad;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.59rem;
          letter-spacing: 0.11em;
          line-height: 1.7;
        }

        .robot-hero__copy h1 {
          margin: 0;
          font-size: clamp(2.5rem, 4.2vw, 4rem);
          font-weight: 550;
          letter-spacing: -0.065em;
          line-height: 1.08;
        }

        .robot-hero__copy h1 em {
          color: transparent;
          font-style: normal;
          background: linear-gradient(100deg, #d9cbff, #aa8ce9, #88cfd8);
          background-clip: text;
          -webkit-background-clip: text;
        }

        .robot-hero__copy p {
          margin: 1.5rem 0 1.9rem;
          color: #9997aa;
          font-size: 0.95rem;
          line-height: 1.85;
        }

        .robot-hero__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1.3rem;
          min-height: 3.2rem;
          padding: 0.8rem 1.25rem;
          color: #17121f;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          background: #d6c7fa;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 999px;
          box-shadow: 0 8px 30px rgba(139, 102, 210, 0.12);
          transition:
            transform 200ms ease,
            background 200ms ease,
            box-shadow 200ms ease;
        }

        .robot-hero__cta:hover {
          transform: translateY(-3px);
          background: #e6dcff;
          box-shadow: 0 12px 35px rgba(139, 102, 210, 0.24);
        }

        .robot-hero__cta:focus-visible,
        .robot-hero__bottom a:focus-visible {
          outline: 2px solid #d6c7fa;
          outline-offset: 6px;
        }

        .robot-stage {
          --head-x: 0deg;
          --head-y: 0deg;
          --eye-x: 0px;
          --eye-y: 0px;
          position: relative;
          display: grid;
          min-width: 0;
          height: 520px;
          perspective: 1000px;
          place-items: center;
          animation: robot-hero-enter 1000ms ease 180ms both;
        }

        .robot-stage__glow {
          position: absolute;
          top: 15%;
          left: 50%;
          width: 430px;
          max-width: 100%;
          aspect-ratio: 1;
          pointer-events: none;
          background: radial-gradient(
            circle,
            rgba(139, 95, 228, 0.22),
            rgba(76, 55, 132, 0.08) 45%,
            transparent 70%
          );
          transform: translateX(-50%);
        }

        .robot-stage__grid {
          position: absolute;
          inset: 10% 0 14%;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(170, 148, 211, 0.045) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(170, 148, 211, 0.045) 1px,
              transparent 1px
            );
          background-size: 38px 38px;
          mask-image: radial-gradient(ellipse, black 15%, transparent 70%);
          -webkit-mask-image: radial-gradient(
            ellipse,
            black 15%,
            transparent 70%
          );
        }

        .robot-stage__orbit {
          position: absolute;
          top: 22%;
          left: 50%;
          width: min(90%, 450px);
          height: 240px;
          pointer-events: none;
          border: 1px solid rgba(180, 151, 238, 0.17);
          border-radius: 50%;
        }

        .robot-stage__orbit--one {
          transform: translateX(-50%) rotate(-28deg);
        }

        .robot-stage__orbit--two {
          border-style: dashed;
          border-color: rgba(143, 194, 211, 0.12);
          transform: translateX(-50%) rotate(30deg);
        }

        .robot-stage__status {
          position: absolute;
          top: 20px;
          left: 50%;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          width: max-content;
          color: #9290a4;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.52rem;
          letter-spacing: 0.12em;
          transform: translateX(-50%);
        }

        .robot-stage__status > span {
          width: 5px;
          height: 5px;
          background: #9ed8cb;
          border-radius: 50%;
          box-shadow: 0 0 9px rgba(158, 216, 203, 0.5);
        }

        .robot-stage__greeting {
          position: absolute;
          z-index: 5;
          top: 47px;
          left: 50%;
          width: max-content;
          max-width: 92%;
          padding: 0.7rem 0.95rem;
          color: #e9dfff;
          font-size: 0.73rem;
          line-height: 1.5;
          text-align: center;
          background: #1c172b;
          border: 1px solid rgba(180, 151, 238, 0.3);
          border-radius: 0.85rem;
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, 8px);
          transition:
            opacity 200ms ease,
            transform 200ms ease;
        }

        .robot-stage__greeting--visible {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        .ai-robot {
          position: relative;
          z-index: 3;
          display: block;
          width: 290px;
          height: 350px;
          margin-top: 4px;
          padding: 0;
          color: inherit;
          background: transparent;
          border: 0;
          border-radius: 3rem;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .ai-robot:focus-visible {
          outline: 2px solid #bda5ff;
          outline-offset: 10px;
        }

        .ai-robot__floating {
          position: absolute;
          inset: 0;
          display: block;
          animation: ai-robot-hover 5s ease-in-out infinite;
        }

        .ai-robot__head {
          position: absolute;
          z-index: 5;
          top: 28px;
          left: 35px;
          display: block;
          width: 220px;
          height: 160px;
          transform:
            rotateX(var(--head-x))
            rotateY(var(--head-y));
          transform-style: preserve-3d;
          transition: transform 220ms ease-out;
        }

        .ai-robot__shell {
          position: absolute;
          inset: 0;
          display: block;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #e4e1f0 25%,
            #bdb5d3 63%,
            #817195 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 55px;
          box-shadow:
            inset 4px 5px 10px rgba(255, 255, 255, 0.9),
            inset -9px -9px 18px rgba(58, 41, 86, 0.45),
            0 14px 24px rgba(0, 0, 0, 0.3),
            0 0 45px rgba(150, 105, 223, 0.12);
        }

        .ai-robot__head-shine {
          position: absolute;
          top: 7px;
          left: 30px;
          width: 140px;
          height: 17px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.9),
            transparent
          );
          border-radius: 50%;
          filter: blur(3px);
        }

        .ai-robot__face {
          position: absolute;
          top: 29px;
          right: 18px;
          bottom: 25px;
          left: 18px;
          display: block;
          overflow: hidden;
          background:
            radial-gradient(
              ellipse at 50% 85%,
              rgba(75, 67, 140, 0.35),
              transparent 70%
            ),
            linear-gradient(145deg, #1e2036, #090b17 65%);
          border: 3px solid #7f7896;
          border-radius: 34px;
          box-shadow:
            inset 0 4px 13px rgba(0, 0, 0, 0.85),
            0 2px 0 rgba(255, 255, 255, 0.6);
        }

        .ai-robot__face-glass {
          position: absolute;
          z-index: 2;
          top: -45px;
          left: -25px;
          width: 160px;
          height: 90px;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.12),
            rgba(255, 255, 255, 0.015)
          );
          border-radius: 50%;
          transform: rotate(-18deg);
        }

        .ai-robot__eyes {
          position: absolute;
          top: 26px;
          left: 33px;
          display: flex;
          gap: 37px;
          transform: translate(var(--eye-x), var(--eye-y));
          transition: transform 160ms ease-out;
        }

        .ai-robot__eye {
          display: block;
          width: 35px;
          height: 31px;
          background: linear-gradient(180deg, #e5fbff, #9ae9ff 55%, #898bff);
          border-radius: 12px;
          box-shadow:
            0 0 12px rgba(135, 218, 255, 0.65),
            0 0 26px rgba(126, 126, 255, 0.32);
          animation: ai-robot-blink 6s infinite;
          transform-origin: center;
        }

        .ai-robot--happy .ai-robot__eye {
          height: 22px;
          margin-top: 5px;
          border-radius: 50% 50% 7px 7px;
        }

        .ai-robot__mouth {
          position: absolute;
          bottom: 15px;
          left: calc(50% - 12px);
          width: 24px;
          height: 11px;
          border-bottom: 3px solid #9ae9ff;
          border-radius: 0 0 20px 20px;
          filter: drop-shadow(0 0 4px rgba(154, 233, 255, 0.6));
          transition:
            width 200ms ease,
            left 200ms ease;
        }

        .ai-robot--happy .ai-robot__mouth {
          left: calc(50% - 18px);
          width: 36px;
        }

        .ai-robot__cheek {
          position: absolute;
          bottom: 20px;
          width: 17px;
          height: 7px;
          background: #ad87e8;
          border-radius: 50%;
          opacity: 0.45;
          filter: blur(2px);
        }

        .ai-robot__cheek--left {
          left: 21px;
        }

        .ai-robot__cheek--right {
          right: 21px;
        }

        .ai-robot__antenna {
          position: absolute;
          top: -28px;
          left: calc(50% - 4px);
          display: block;
          width: 8px;
          height: 32px;
          background: linear-gradient(90deg, #6d6387, #ddd4f3, #9281b3);
          border-radius: 5px;
        }

        .ai-robot__antenna > span {
          position: absolute;
          top: -10px;
          left: -5px;
          width: 18px;
          height: 18px;
          background: radial-gradient(circle at 35% 30%, #efffff, #a38cf4 65%);
          border: 1px solid #d4c7ff;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(173, 139, 250, 0.65);
          animation: ai-robot-signal 3s ease-in-out infinite;
        }

        .ai-robot__ear {
          position: absolute;
          top: 59px;
          width: 18px;
          height: 46px;
          background: linear-gradient(90deg, #6c5f86, #c8bedc, #9585b4);
          border: 1px solid rgba(221, 210, 247, 0.5);
          border-radius: 12px;
        }

        .ai-robot__ear--left {
          left: -10px;
        }

        .ai-robot__ear--right {
          right: -10px;
        }

        .ai-robot__neck {
          position: absolute;
          z-index: 2;
          top: 178px;
          left: 126px;
          width: 38px;
          height: 29px;
          background: linear-gradient(90deg, #615473, #b8accd, #695a81);
          border-radius: 10px;
          box-shadow: inset 0 7px 7px rgba(0, 0, 0, 0.3);
        }

        .ai-robot__body {
          position: absolute;
          z-index: 3;
          top: 198px;
          left: 75px;
          display: block;
          width: 140px;
          height: 109px;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #f2f0fa,
            #d4cce4 35%,
            #a598bf 70%,
            #776487
          );
          border: 1px solid rgba(244, 236, 255, 0.65);
          border-radius: 37px 37px 45px 45px;
          box-shadow:
            inset 3px 4px 7px rgba(255, 255, 255, 0.8),
            inset -7px -7px 14px rgba(70, 45, 101, 0.35),
            0 12px 18px rgba(0, 0, 0, 0.2);
        }

        .ai-robot__body-seam {
          position: absolute;
          inset: 10px;
          border: 1px solid rgba(80, 62, 111, 0.14);
          border-radius: 28px 28px 34px 34px;
        }

        .ai-robot__core {
          position: absolute;
          top: 18px;
          left: calc(50% - 20px);
          display: grid;
          width: 40px;
          height: 40px;
          background: linear-gradient(145deg, #534766, #b3a4d0);
          border: 1px solid #bfb2d7;
          border-radius: 50%;
          box-shadow:
            inset 0 2px 5px rgba(0, 0, 0, 0.4),
            0 1px 0 rgba(255, 255, 255, 0.65);
          place-items: center;
        }

        .ai-robot__core > span {
          width: 23px;
          height: 23px;
          background: radial-gradient(circle at 35% 30%, #edffff, #a5c3ff 45%, #8c65df);
          border: 2px solid #d5caff;
          border-radius: 50%;
          box-shadow: 0 0 17px rgba(163, 137, 255, 0.7);
          animation: ai-robot-signal 3s ease-in-out infinite;
        }

        .ai-robot__body-label {
          position: absolute;
          top: 66px;
          left: 0;
          width: 100%;
          color: #50455f;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
          text-align: center;
        }

        .ai-robot__vents {
          position: absolute;
          bottom: 15px;
          left: 55px;
          display: flex;
          gap: 4px;
        }

        .ai-robot__vents i {
          width: 7px;
          height: 3px;
          background: #81728f;
          border-radius: 2px;
        }

        .ai-robot__arm {
          position: absolute;
          z-index: 2;
          top: 207px;
          display: block;
          width: 34px;
          height: 72px;
          background: linear-gradient(100deg, #eee9f8, #b6a9cc 50%, #80708f);
          border: 1px solid rgba(238, 226, 255, 0.45);
          border-radius: 22px;
          box-shadow: inset -4px -5px 9px rgba(65, 44, 91, 0.25);
          transform-origin: 50% 14px;
        }

        .ai-robot__arm--left {
          left: 43px;
          transform: rotate(15deg);
        }

        .ai-robot__arm--right {
          right: 43px;
          transform: rotate(-15deg);
        }

        .ai-robot--happy .ai-robot__arm--right {
          animation: ai-robot-wave 850ms ease-in-out infinite;
        }

        .ai-robot__hand {
          position: absolute;
          bottom: -9px;
          left: 2px;
          width: 28px;
          height: 27px;
          background: linear-gradient(135deg, #e7dff5, #9c8bb3);
          border: 1px solid rgba(234, 222, 252, 0.5);
          border-radius: 12px;
          box-shadow: inset -3px -3px 5px rgba(60, 42, 84, 0.2);
        }

        .ai-robot__leg {
          position: absolute;
          z-index: 2;
          top: 294px;
          width: 43px;
          height: 39px;
          background: linear-gradient(135deg, #d8d0e8, #9382aa);
          border: 1px solid rgba(234, 222, 252, 0.45);
          border-radius: 12px 12px 18px 18px;
          box-shadow: inset -4px -5px 7px rgba(65, 44, 91, 0.3);
        }

        .ai-robot__leg--left {
          left: 91px;
          transform: rotate(5deg);
        }

        .ai-robot__leg--right {
          right: 91px;
          transform: rotate(-5deg);
        }

        .robot-stage__shadow {
          position: absolute;
          z-index: 1;
          bottom: 83px;
          left: calc(50% - 90px);
          width: 180px;
          height: 27px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
          filter: blur(10px);
          animation: ai-robot-shadow 5s ease-in-out infinite;
        }

        .robot-stage__platform {
          position: absolute;
          bottom: 66px;
          left: calc(50% - 135px);
          width: 270px;
          height: 56px;
          pointer-events: none;
          background: radial-gradient(
            ellipse,
            rgba(142, 109, 213, 0.12),
            transparent 65%
          );
          border: 1px solid rgba(159, 130, 223, 0.25);
          border-radius: 50%;
          box-shadow:
            0 0 22px rgba(159, 130, 223, 0.06),
            inset 0 0 20px rgba(159, 130, 223, 0.04);
        }

        .robot-stage__platform::after {
          position: absolute;
          inset: 9px 30px;
          content: "";
          border: 1px solid rgba(159, 130, 223, 0.14);
          border-radius: 50%;
        }

        .robot-stage__spark {
          position: absolute;
          width: 4px;
          height: 4px;
          pointer-events: none;
          background: #c9b3ff;
          border-radius: 50%;
          box-shadow: 0 0 13px 3px rgba(166, 130, 242, 0.35);
          animation: ai-robot-spark 4s ease-in-out infinite;
        }

        .robot-stage__spark--one {
          top: 31%;
          left: 12%;
        }

        .robot-stage__spark--two {
          top: 43%;
          right: 10%;
          animation-delay: -1.5s;
        }

        .robot-stage__spark--three {
          right: 22%;
          bottom: 26%;
          width: 3px;
          height: 3px;
          background: #b3efff;
          animation-delay: -2.5s;
        }

        .robot-stage__caption {
          position: absolute;
          right: 0;
          bottom: 12px;
          left: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          color: #7f7a92;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.49rem;
          letter-spacing: 0.1em;
          text-align: center;
        }

        .robot-stage__caption > span:last-child {
          color: #a396ba;
          font-size: 0.46rem;
        }

        .robot-hero__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.2rem;
          padding: 1.3rem 0 0.2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #777485;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.56rem;
          letter-spacing: 0.08em;
        }

        .robot-hero__bottom a {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          color: #bab2cd;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .robot-hero__bottom a:hover {
          color: #eee5ff;
        }

        @keyframes robot-hero-enter {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ai-robot-hover {
          0%,
          100% {
            transform: translateY(3px) rotate(-2deg);
          }

          50% {
            transform: translateY(-14px) rotate(2deg);
          }
        }

        @keyframes ai-robot-shadow {
          0%,
          100% {
            transform: scaleX(1);
            opacity: 0.6;
          }

          50% {
            transform: scaleX(0.78);
            opacity: 0.35;
          }
        }

        @keyframes ai-robot-blink {
          0%,
          42%,
          46%,
          100% {
            transform: scaleY(1);
          }

          44% {
            transform: scaleY(0.1);
          }
        }

        @keyframes ai-robot-signal {
          0%,
          100% {
            opacity: 0.8;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes ai-robot-wave {
          0%,
          100% {
            transform: rotate(-100deg);
          }

          50% {
            transform: rotate(-135deg);
          }
        }

        @keyframes ai-robot-spark {
          0%,
          100% {
            opacity: 0.35;
            transform: translateY(0);
          }

          50% {
            opacity: 1;
            transform: translateY(-14px);
          }
        }

        @media (max-width: 900px) {
          .robot-hero__main {
            gap: 0;
          }

          .robot-hero__copy h1 {
            font-size: 2.8rem;
          }

          .robot-hero__label {
            max-width: 250px;
          }

          .robot-stage {
            height: 500px;
          }
        }

        @media (max-width: 700px) {
          .robot-hero {
            padding-top: 6rem;
          }

          .robot-hero__container {
            width: calc(100% - 32px);
          }

          .robot-hero__kicker {
            align-items: flex-start;
            font-size: 0.48rem;
          }

          .robot-hero__kicker > span:last-child {
            max-width: 110px;
            text-align: right;
          }

          .robot-hero__name {
            gap: 0.6rem;
            margin-top: 1.7rem;
            font-size: clamp(3.25rem, 14.5vw, 6.3rem);
          }

          .robot-hero__main {
            grid-template-columns: 1fr;
            padding: 1.5rem 0 0;
          }

          .robot-hero__copy {
            padding: 1rem 0 0;
          }

          .robot-hero__copy h1 {
            font-size: clamp(2.5rem, 9vw, 3.6rem);
          }

          .robot-hero__label {
            max-width: none;
            font-size: 0.53rem;
          }

          .robot-hero__copy p {
            font-size: 0.88rem;
          }

          .robot-stage {
            height: 490px;
            margin-top: 1rem;
          }

          .robot-stage__status {
            top: 12px;
          }

          .robot-stage__greeting {
            top: 35px;
          }

          .robot-stage__shadow {
            bottom: 67px;
          }

          .robot-stage__platform {
            bottom: 50px;
          }

          .robot-stage__caption {
            bottom: 5px;
          }

          .robot-hero__bottom {
            margin-top: 1rem;
            font-size: 0.5rem;
          }

          .robot-hero__bottom > span {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .robot-hero *,
          .robot-hero *::before,
          .robot-hero *::after {
            animation: none !important;
            transition: none !important;
          }

          .ai-robot__head {
            transform: none;
          }

          .ai-robot__eyes {
            transform: none;
          }

          .ai-robot--happy .ai-robot__arm--right {
            transform: rotate(-110deg);
          }

          .robot-hero__cta:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}