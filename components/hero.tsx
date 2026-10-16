"use client";

import { useState, type PointerEvent } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

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
    <section
      id="home"
      className="robot-hero"
      aria-labelledby="robot-hero-title"
    >
      <div className="robot-hero__background" aria-hidden="true" />

      <div className="robot-hero__container">
        <div className="robot-hero__kicker">
          <span>
            <i aria-hidden="true" />
            INDEPENDENT MIND. BUILDER AT HEART.
          </span>

          <span>NEW YORK, USA ↗</span>
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
              FULL STACK DEVELOPER
              <br />
              & AI / ML ENGINEER
            </span>

            <h1 id="robot-hero-title">
              Built with logic.
              <br />
              <em>Made to feel.</em>
            </h1>

            <p>
              Web experiences with personality. Intelligent products with
              purpose. I turn the “what if” into something real.
            </p>

            <a className="robot-hero__cta" href="#projects">
              Discover my work
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div
            className="robot-stage"
            onPointerMove={moveRobot}
            onPointerLeave={resetRobot}
            onPointerCancel={resetRobot}
          >
            <div className="robot-stage__glow" aria-hidden="true" />

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

            <div className="robot-stage__status">
              <i aria-hidden="true" />
              YOUR AI COMPANION
            </div>

            <div
              className={`robot-stage__greeting ${
                greeting ? "robot-stage__greeting--visible" : ""
              }`}
              role="status"
              aria-live="polite"
            >
              {greeting ? "Hey! Let’s build. ✦" : ""}
            </div>

            <div className="robot-stage__robot-wrap">
              <button
                type="button"
                className={`ai-robot ${
                  greeting ? "ai-robot--happy" : ""
                }`}
                aria-label={
                  greeting
                    ? "Hide robot greeting"
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
            </div>

            <div className="robot-stage__platform" aria-hidden="true" />

            <span className="robot-stage__caption">
              TAP TO SAY HI ↗
            </span>
          </div>
        </div>

        <div className="robot-hero__bottom">
          <a href="#projects">
            <ArrowDown size={15} aria-hidden="true" />
            EXPLORE WORK
          </a>

          <span>REACT / NEXT.JS / PYTHON / PYTORCH</span>

          <a href="/uzair.pdf" target="_blank" rel="noreferrer">
            RESUME
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>

      <style jsx global>{`
        .robot-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 6.5rem 0 1.25rem;
          color: #f4f2fa;
          background: #08090d;
        }

        .robot-hero,
        .robot-hero *,
        .robot-hero *::before,
        .robot-hero *::after {
          box-sizing: border-box;
        }

        .robot-hero__background {
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              ellipse at 85% 55%,
              rgba(113, 72, 200, 0.14),
              transparent 48%
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
          color: #aaa5b9;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          line-height: 1.5;
        }

        .robot-hero__kicker > span:first-child {
          display: flex;
          align-items: center;
          gap: 0.6rem;
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
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 1.8rem;
          font-size: clamp(3rem, 14vw, 11.5rem);
          font-weight: 750;
          line-height: 1;
          letter-spacing: -0.075em;
          white-space: nowrap;
          user-select: none;
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
          padding: 1.5rem 0;
        }

        .robot-hero__copy {
          position: relative;
          z-index: 2;
          min-width: 0;
          padding: 1.5rem 0;
          text-align: left;
        }

        .robot-hero__label {
          display: block;
          margin-bottom: 1.1rem;
          color: #b1a7c2;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          line-height: 1.65;
        }

        .robot-hero__copy h1 {
          margin: 0;
          font-size: clamp(2.5rem, 4.2vw, 4rem);
          font-weight: 550;
          letter-spacing: -0.06em;
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
          max-width: 340px;
          margin: 1.25rem 0 1.6rem;
          color: #aaa5b9;
          font-size: 0.95rem;
          line-height: 1.8;
        }

        .robot-hero__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          min-height: 48px;
          padding: 0.75rem 1.2rem;
          color: #17121f;
          background: #d6c7fa;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 8px 30px rgba(139, 102, 210, 0.12);
          transition:
            transform 200ms ease,
            background 200ms ease;
        }

        .robot-hero__cta svg {
          flex-shrink: 0;
        }

        .robot-hero__cta:hover {
          background: #e6dcff;
          transform: translateY(-3px);
        }

        .robot-hero__cta:focus-visible,
        .robot-hero__bottom a:focus-visible {
          outline: 2px solid #d6c7fa;
          outline-offset: 5px;
        }

        .robot-stage {
          --head-x: 0deg;
          --head-y: 0deg;
          --eye-x: 0px;
          --eye-y: 0px;
          --robot-scale: 0.95;
          position: relative;
          min-width: 0;
          height: 460px;
          perspective: 1000px;
        }

        .robot-stage__glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(100%, 420px);
          aspect-ratio: 1;
          background: radial-gradient(
            circle,
            rgba(139, 95, 228, 0.25),
            rgba(76, 55, 132, 0.08) 45%,
            transparent 70%
          );
          pointer-events: none;
          transform: translate(-50%, -50%);
        }

        .robot-stage__orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(88%, 410px);
          height: 210px;
          border: 1px solid rgba(180, 151, 238, 0.18);
          border-radius: 50%;
          pointer-events: none;
        }

        .robot-stage__orbit--one {
          transform: translate(-50%, -50%) rotate(-25deg);
        }

        .robot-stage__orbit--two {
          border-style: dashed;
          border-color: rgba(143, 194, 211, 0.15);
          transform: translate(-50%, -50%) rotate(28deg);
        }

        .robot-stage__status {
          position: absolute;
          top: 15px;
          left: 50%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: max-content;
          color: #aaa3ba;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.52rem;
          letter-spacing: 0.1em;
          transform: translateX(-50%);
        }

        .robot-stage__status i {
          width: 5px;
          height: 5px;
          background: #9ed8cb;
          border-radius: 50%;
          box-shadow: 0 0 9px rgba(158, 216, 203, 0.5);
        }

        .robot-stage__greeting {
          position: absolute;
          z-index: 6;
          top: 39px;
          left: 50%;
          width: max-content;
          max-width: 100%;
          padding: 0.55rem 0.75rem;
          color: #e9dfff;
          background: #1c172b;
          border: 1px solid rgba(180, 151, 238, 0.35);
          border-radius: 12px;
          font-size: 0.73rem;
          line-height: 1.4;
          text-align: center;
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, 6px);
          transition:
            opacity 180ms ease,
            transform 180ms ease;
        }

        .robot-stage__greeting--visible {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        .robot-stage__robot-wrap {
          position: absolute;
          z-index: 3;
          top: 50%;
          left: 50%;
          width: 290px;
          height: 350px;
          transform:
            translate(-50%, -50%)
            scale(var(--robot-scale));
          transform-origin: center;
        }

        .ai-robot {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          color: inherit;
          background: transparent;
          border: 0;
          border-radius: 3rem;
          cursor: pointer;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .ai-robot:focus-visible {
          outline: 3px solid #bda5ff;
          outline-offset: 8px;
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
          width: 220px;
          height: 160px;
          transform:
            rotateX(var(--head-x))
            rotateY(var(--head-y));
          transform-style: preserve-3d;
          transition: transform 200ms ease-out;
        }

        .ai-robot__shell {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #ffffff,
            #e4e1f0 25%,
            #bdb5d3 63%,
            #817195
          );
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 55px;
          box-shadow:
            inset 4px 5px 10px rgba(255, 255, 255, 0.9),
            inset -9px -9px 18px rgba(58, 41, 86, 0.45),
            0 14px 24px rgba(0, 0, 0, 0.3);
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
          inset: 29px 18px 25px;
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
          background: linear-gradient(
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
          background: linear-gradient(#e5fbff, #9ae9ff 55%, #898bff);
          border-radius: 12px;
          box-shadow:
            0 0 12px rgba(135, 218, 255, 0.65),
            0 0 26px rgba(126, 126, 255, 0.32);
          animation: ai-robot-blink 6s infinite;
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
          background: radial-gradient(
            circle at 35% 30%,
            #efffff,
            #a38cf4 65%
          );
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
        }

        .ai-robot__body {
          position: absolute;
          z-index: 3;
          top: 198px;
          left: 75px;
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
          place-items: center;
        }

        .ai-robot__core > span {
          width: 23px;
          height: 23px;
          background: radial-gradient(
            circle at 35% 30%,
            #edffff,
            #a5c3ff 45%,
            #8c65df
          );
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
          width: 34px;
          height: 72px;
          background: linear-gradient(
            100deg,
            #eee9f8,
            #b6a9cc 50%,
            #80708f
          );
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

        .robot-stage__platform {
          position: absolute;
          top: calc(50% + 162px);
          left: 50%;
          width: 240px;
          height: 40px;
          background: radial-gradient(
            ellipse,
            rgba(142, 109, 213, 0.2),
            transparent 65%
          );
          border: 1px solid rgba(159, 130, 223, 0.25);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }

        .robot-stage__platform::after {
          position: absolute;
          inset: 7px 25px;
          content: "";
          border: 1px solid rgba(159, 130, 223, 0.14);
          border-radius: 50%;
        }

        .robot-stage__spark {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #c9b3ff;
          border-radius: 50%;
          box-shadow: 0 0 13px rgba(166, 130, 242, 0.6);
          pointer-events: none;
          animation: ai-robot-spark 4s ease-in-out infinite;
        }

        .robot-stage__spark--one {
          top: 32%;
          left: 13%;
        }

        .robot-stage__spark--two {
          top: 55%;
          right: 12%;
          animation-delay: -1.5s;
        }

        .robot-stage__caption {
          position: absolute;
          bottom: 7px;
          left: 0;
          width: 100%;
          color: #c3b3df;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.5rem;
          letter-spacing: 0.08em;
          text-align: center;
          pointer-events: none;
        }

        .robot-hero__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #a39aad;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.56rem;
          letter-spacing: 0.06em;
        }

        .robot-hero__bottom a {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 44px;
          color: #c8bedb;
          text-decoration: none;
        }

        @keyframes ai-robot-hover {
          0%,
          100% {
            transform: translateY(3px) rotate(-2deg);
          }

          50% {
            transform: translateY(-12px) rotate(2deg);
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
            opacity: 0.75;
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
            transform: translateY(-10px);
          }
        }

        @media (min-width: 701px) and (max-width: 1000px) {
          .robot-hero {
            padding-top: 5.5rem;
          }

          .robot-hero__main {
            gap: 1rem;
          }

          .robot-hero__copy h1 {
            font-size: 2.7rem;
          }

          .robot-hero__copy p {
            font-size: 0.85rem;
          }

          .robot-stage {
            --robot-scale: 0.78;
            height: 400px;
          }

          .robot-stage__platform {
            top: calc(50% + 137px);
            width: 205px;
            height: 34px;
          }
        }

        /* Mobile: text left, small robot right. */
        @media (max-width: 700px) {
          .robot-hero {
            padding: 5rem 0 0.6rem;
          }

          .robot-hero__container {
            width: min(600px, calc(100% - 32px));
          }

          .robot-hero__kicker {
            align-items: flex-start;
            gap: 0.6rem;
            font-size: 0.47rem;
            letter-spacing: 0.025em;
          }

          .robot-hero__kicker > span:first-child {
            gap: 0.35rem;
          }

          .robot-hero__kicker > span:last-child {
            flex-shrink: 0;
            text-align: right;
          }

          .robot-hero__kicker i {
            width: 4px;
            height: 4px;
            margin-top: 3px;
          }

          .robot-hero__name {
            margin-top: 1.1rem;
            gap: 0.35rem;
            font-size: clamp(2.5rem, 13.5vw, 5rem);
          }

          .robot-hero__main {
            grid-template-columns:
              minmax(0, 1.2fr)
              minmax(0, 0.8fr);
            align-items: center;
            gap: 0.5rem;
            padding: 1.75rem 0 1.5rem;
          }

          .robot-hero__copy {
            padding: 0;
            text-align: left;
          }

          .robot-hero__label {
            margin-bottom: 0.65rem;
            font-size: 0.5rem;
            letter-spacing: 0.035em;
            line-height: 1.6;
          }

          .robot-hero__copy h1 {
            font-size: clamp(1.45rem, 5.8vw, 2.5rem);
            letter-spacing: -0.065em;
            line-height: 1.12;
          }

          .robot-hero__copy p {
            max-width: 260px;
            margin: 0.75rem 0 0.9rem;
            font-size: 0.76rem;
            line-height: 1.65;
          }

          .robot-hero__cta {
            justify-content: space-between;
            gap: 0.45rem;
            max-width: 100%;
            min-height: 44px;
            padding: 0.6rem 0.8rem;
            font-size: 0.7rem;
            line-height: 1.4;
          }

          .robot-hero__cta svg {
            width: 15px;
            height: 15px;
          }

          .robot-stage {
            --robot-scale: 0.43;
            width: 100%;
            height: 220px;
            margin: 0;
            justify-self: end;
          }

          .robot-stage__status {
            display: none;
          }

          .robot-stage__glow {
            width: 185px;
            max-width: none;
          }

          .robot-stage__orbit {
            width: 100%;
            height: 92px;
          }

          .robot-stage__greeting {
            top: 3px;
            width: 100%;
            max-width: 145px;
            padding: 0.4rem;
            border-radius: 9px;
            font-size: 0.65rem;
            line-height: 1.35;
          }

          .robot-stage__platform {
            top: calc(50% + 76px);
            width: 105px;
            height: 21px;
          }

          .robot-stage__platform::after {
            inset: 4px 12px;
          }

          .robot-stage__caption {
            bottom: 4px;
            font-size: 0.46rem;
            letter-spacing: 0.035em;
          }

          .robot-stage__spark {
            width: 3px;
            height: 3px;
          }

          .robot-stage__spark--one {
            top: 34%;
            left: 0;
          }

          .robot-stage__spark--two {
            top: 60%;
            right: 0;
          }

          .robot-hero__bottom {
            gap: 0.5rem;
            padding-top: 0;
            font-size: 0.5rem;
          }

          .robot-hero__bottom > span {
            display: none;
          }

          .robot-hero__bottom a {
            gap: 0.35rem;
          }
        }

        @media (min-width: 480px) and (max-width: 700px) {
          .robot-stage {
            --robot-scale: 0.56;
            height: 270px;
          }

          .robot-stage__platform {
            top: calc(50% + 97px);
            width: 145px;
            height: 26px;
          }

          .robot-stage__orbit {
            height: 130px;
          }

          .robot-hero__copy p {
            font-size: 0.85rem;
          }

          .robot-hero__cta {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 360px) {
          .robot-hero__container {
            width: calc(100% - 24px);
          }

          .robot-hero__kicker {
            font-size: 0.42rem;
            letter-spacing: 0;
          }

          .robot-hero__main {
            gap: 0.35rem;
            padding-top: 1.4rem;
          }

          .robot-hero__label {
            font-size: 0.46rem;
          }

          .robot-hero__copy h1 {
            font-size: 1.4rem;
          }

          .robot-hero__copy p {
            font-size: 0.72rem;
            line-height: 1.55;
          }

          .robot-hero__cta {
            padding: 0.55rem 0.6rem;
            gap: 0.3rem;
            font-size: 0.65rem;
          }

          .robot-stage {
            --robot-scale: 0.36;
            height: 195px;
          }

          .robot-stage__platform {
            top: calc(50% + 64px);
            width: 92px;
            height: 18px;
          }

          .robot-stage__caption {
            font-size: 0.42rem;
          }
        }

        @media (max-width: 700px) and (max-height: 650px) {
          .robot-hero {
            padding-top: 4.25rem;
          }

          .robot-hero__name {
            margin-top: 0.75rem;
          }

          .robot-hero__main {
            padding-top: 1.15rem;
            padding-bottom: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .robot-hero *,
          .robot-hero *::before,
          .robot-hero *::after {
            animation: none !important;
            transition: none !important;
          }

          .ai-robot__head,
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