"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type PointerEvent,
} from "react";

import {
  ArrowUpRight,
  Check,
  Copy,
  Loader2,
  MapPin,
  Send,
} from "lucide-react";

import emailjs from "emailjs-com";

const EMAIL = "uzairranamuhammad7@gmail.com";

const SERVICE =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_0udfgyf";

const TEMPLATE =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_2l3c6ys";

const PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "jP0wAi_NHFf-No7kj";

const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type Field = keyof typeof EMPTY_FORM;
type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [activeField, setActiveField] = useState<Field | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [copyStatus, setCopyStatus] = useState("");
  const [waving, setWaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendingRef = useRef(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const waveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const uniqueId = useId().replace(/:/g, "");
  const metalId = `${uniqueId}-metal`;
  const screenId = `${uniqueId}-screen`;
  const eyeId = `${uniqueId}-eyes`;

  const hiding =
    activeField === "email" &&
    status !== "sending" &&
    status !== "sent";

  const typing =
    activeField === "message" &&
    status !== "sending" &&
    status !== "sent";

  const pose =
    status === "sending"
      ? "sending"
      : status === "sent"
        ? "success"
        : hiding
          ? "hiding"
          : typing
            ? "typing"
            : waving
              ? "waving"
              : activeField
                ? "looking"
                : "idle";

  const robotText =
    status === "sending"
      ? "Off it goes..."
      : status === "sent"
        ? "Message delivered!"
        : status === "error"
          ? "Let’s try again."
          : hiding
            ? "I won’t peek!"
            : typing
              ? "Taking notes..."
              : waving
                ? "Hey there! ✦"
                : activeField === "name"
                  ? "Nice to meet you!"
                  : activeField === "subject"
                    ? "I’m listening."
                    : "Tap to say hi ↗";

  useEffect(() => {
    return () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }

      if (waveTimer.current) {
        clearTimeout(waveTimer.current);
      }
    };
  }, []);

  function change(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status === "sent" || status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  function sayHello() {
    if (waveTimer.current) {
      clearTimeout(waveTimer.current);
    }

    setWaving(true);

    waveTimer.current = setTimeout(() => {
      setWaving(false);
    }, 2400);
  }

  async function copyEmail() {
    if (copyTimer.current) {
      clearTimeout(copyTimer.current);
    }

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus("Email copied!");
    } catch {
      setCopyStatus("Select the email address to copy it.");
    }

    copyTimer.current = setTimeout(() => {
      setCopyStatus("");
    }, 2500);
  }

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const stage = event.currentTarget;
    const rect = stage.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      return;
    }

    const x = Math.max(
      -1,
      Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2),
    );

    const y = Math.max(
      -1,
      Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2),
    );

    stage.style.setProperty("--eye-x", `${x * 6}px`);
    stage.style.setProperty("--eye-y", `${y * 4}px`);
  }

  function resetPointer(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--eye-x", "0px");
    event.currentTarget.style.setProperty("--eye-y", "0px");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (sendingRef.current) {
      return;
    }

    const cleaned = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (Object.values(cleaned).some((value) => !value)) {
      setErrorMessage("Please fill in every field.");
      setStatus("error");
      return;
    }

    sendingRef.current = true;
    setActiveField(null);
    setErrorMessage("");
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE,
        TEMPLATE,
        {
          to_name: "Uzair",
          to_email: EMAIL,
          from_name: cleaned.name,
          user_email: cleaned.email,
          reply_to: cleaned.email,
          subject: cleaned.subject,
          message: cleaned.message,
        },
        PUBLIC_KEY,
      );

      setStatus("sent");
      setForm({ ...EMPTY_FORM });
    } catch {
      setErrorMessage("Couldn’t send your message. Please try again.");
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  }

  return (
    <section
      id="contact"
      className="buddy-contact"
      aria-labelledby={`${uniqueId}-title`}
    >
      <div className="buddy-contact__container">
        <div className="buddy-contact__caption">
          <span>04 / NEXT CHAPTER</span>
          <span>LET’S CONNECT</span>
        </div>

        <div className="buddy-contact__intro">
          <header className="buddy-contact__header">
            <span className="buddy-contact__eyebrow">
              EVERY IDEA STARTS SOMEWHERE
            </span>

            <h2 id={`${uniqueId}-title`}>
              Let’s make
              <br />
              <em>something</em>
              <br />
              <em>happen.</em>
            </h2>

            <p>
              A project, a collaboration, or just a hello.
              Let’s see what we can build together.
            </p>

            <span className="buddy-contact__location">
              <MapPin size={13} aria-hidden="true" />
              New York, USA
            </span>
          </header>

          <div
            className={`buddy-stage buddy-stage--${pose}`}
            onPointerMove={followPointer}
            onPointerLeave={resetPointer}
            onPointerCancel={resetPointer}
          >
            <div className="buddy-stage__halo" aria-hidden="true" />
            <div className="buddy-stage__ring" aria-hidden="true" />

            <button
              type="button"
              className="buddy-stage__character"
              onClick={sayHello}
              aria-label="Say hello to the robot"
            >
              <svg
                viewBox="0 0 300 320"
                className="buddy-svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id={metalId}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="30%" stopColor="#e5e0f1" />
                    <stop offset="70%" stopColor="#b8a9ce" />
                    <stop offset="100%" stopColor="#79628e" />
                  </linearGradient>

                  <linearGradient
                    id={screenId}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#29283f" />
                    <stop offset="100%" stopColor="#090b15" />
                  </linearGradient>

                  <linearGradient
                    id={eyeId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f0ffff" />
                    <stop offset="100%" stopColor="#a6a1ff" />
                  </linearGradient>
                </defs>

                <ellipse
                  cx="150"
                  cy="290"
                  rx="75"
                  ry="13"
                  fill="#b18ad9"
                  fillOpacity="0.06"
                  stroke="#b18ad9"
                  strokeOpacity="0.25"
                />

                <ellipse
                  cx="150"
                  cy="287"
                  rx="49"
                  ry="7"
                  fill="#000000"
                  opacity="0.3"
                />

                <g className="buddy-svg__body-group">
                  <rect
                    x="113"
                    y="240"
                    width="30"
                    height="30"
                    rx="12"
                    fill={`url(#${metalId})`}
                    stroke="#d8c6eb"
                  />

                  <rect
                    x="158"
                    y="240"
                    width="30"
                    height="30"
                    rx="12"
                    fill={`url(#${metalId})`}
                    stroke="#d8c6eb"
                  />

                  <rect
                    x="134"
                    y="145"
                    width="32"
                    height="29"
                    rx="10"
                    fill="#9c88b3"
                  />

                  <rect
                    x="97"
                    y="162"
                    width="106"
                    height="89"
                    rx="33"
                    fill={`url(#${metalId})`}
                    stroke="#e5daef"
                  />

                  <rect
                    x="107"
                    y="172"
                    width="86"
                    height="67"
                    rx="26"
                    fill="none"
                    stroke="#80668e"
                    strokeOpacity="0.23"
                  />

                  <circle
                    cx="150"
                    cy="198"
                    r="18"
                    fill="#7e638f"
                    stroke="#e6d5fa"
                    strokeWidth="2"
                  />

                  <circle
                    className="buddy-svg__core"
                    cx="150"
                    cy="198"
                    r="10"
                    fill="#d5bcff"
                  />

                  <text
                    x="150"
                    y="230"
                    textAnchor="middle"
                    fill="#5e466f"
                    fontSize="8"
                    fontFamily="monospace"
                    letterSpacing="2"
                  >
                    UZ / AI
                  </text>

                  <g className="buddy-svg__head">
                    <path
                      d="M150 45 L150 29"
                      stroke="#c5b1da"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />

                    <circle
                      cx="150"
                      cy="23"
                      r="8"
                      fill="#dac3ff"
                      stroke="#f3e6ff"
                      strokeWidth="2"
                    />

                    <rect
                      x="60"
                      y="84"
                      width="17"
                      height="34"
                      rx="8"
                      fill="#af98c2"
                    />

                    <rect
                      x="223"
                      y="84"
                      width="17"
                      height="34"
                      rx="8"
                      fill="#af98c2"
                    />

                    <rect
                      x="70"
                      y="45"
                      width="160"
                      height="110"
                      rx="39"
                      fill={`url(#${metalId})`}
                      stroke="#f2eaf9"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M95 57 Q150 42 205 57"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeOpacity="0.55"
                      strokeLinecap="round"
                    />

                    <rect
                      x="85"
                      y="66"
                      width="130"
                      height="70"
                      rx="25"
                      fill={`url(#${screenId})`}
                      stroke="#9380a5"
                      strokeWidth="3"
                    />

                    {status === "sent" ? (
                      <path
                        d="M128 100 L144 114 L175 85"
                        fill="none"
                        stroke="#a2f0cd"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <>
                        <g className="buddy-svg__gaze">
                          <g className="buddy-svg__eyes">
                            <rect
                              x="108"
                              y="86"
                              width="25"
                              height="22"
                              rx="8"
                              fill={`url(#${eyeId})`}
                            />

                            <rect
                              x="167"
                              y="86"
                              width="25"
                              height="22"
                              rx="8"
                              fill={`url(#${eyeId})`}
                            />
                          </g>
                        </g>

                        <path
                          d="M141 119 Q150 126 159 119"
                          fill="none"
                          stroke="#c4b3ff"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </>
                    )}
                  </g>

                  <g className="buddy-svg__laptop">
                    <rect
                      x="95"
                      y="210"
                      width="110"
                      height="53"
                      rx="8"
                      fill="#44364f"
                      stroke="#b39ac8"
                      strokeWidth="2"
                    />

                    <path
                      d="M87 264 H213 L204 271 H96 Z"
                      fill="#c3b0d5"
                    />

                    <path
                      d="M145 230 L137 237 L145 244 M155 230 L163 237 L155 244"
                      fill="none"
                      stroke="#d8b7ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  <path
                    d={
                      hiding
                        ? "M101 181 Q66 145 119 102"
                        : typing
                          ? "M101 181 Q65 199 108 218"
                          : "M101 181 Q64 179 58 209"
                    }
                    fill="none"
                    stroke="#9f8bb2"
                    strokeWidth="23"
                    strokeLinecap="round"
                  />

                  <g className="buddy-svg__right-arm">
                    <path
                      d={
                        hiding
                          ? "M199 181 Q234 145 181 102"
                          : typing
                            ? "M199 181 Q235 199 192 218"
                            : "M199 181 Q236 179 242 209"
                      }
                      fill="none"
                      stroke="#9f8bb2"
                      strokeWidth="23"
                      strokeLinecap="round"
                    />

                    <g className="buddy-svg__hand buddy-svg__hand--right">
                      <rect
                        x="226"
                        y="187"
                        width="33"
                        height="43"
                        rx="14"
                        fill={`url(#${metalId})`}
                        stroke="#f1e3ff"
                      />

                      <path
                        d="M236 195 V205 M243 193 V204 M250 195 V205"
                        stroke="#a58bb7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>

                  <g className="buddy-svg__hand buddy-svg__hand--left">
                    <rect
                      x="41"
                      y="187"
                      width="33"
                      height="43"
                      rx="14"
                      fill={`url(#${metalId})`}
                      stroke="#f1e3ff"
                    />

                    <path
                      d="M50 195 V205 M57 193 V204 M64 195 V205"
                      stroke="#a58bb7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </g>

                <g className="buddy-svg__letter">
                  <rect
                    x="119"
                    y="180"
                    width="62"
                    height="42"
                    rx="6"
                    fill="#e2cafb"
                    stroke="#f4e9ff"
                  />

                  <path
                    d="M123 185 L150 203 L177 185"
                    fill="none"
                    stroke="#8d6eaa"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </g>

                <g className="buddy-svg__confetti">
                  <path
                    d="M58 57 L64 69 M242 61 L235 72 M45 140 L56 136 M247 143 L259 149"
                    fill="none"
                    stroke="#c5a2fa"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />

                  <circle cx="93" cy="28" r="4" fill="#99dec9" />
                  <circle cx="218" cy="30" r="4" fill="#e9c693" />
                  <circle cx="37" cy="101" r="3" fill="#e9c693" />
                  <circle cx="263" cy="106" r="3" fill="#99dec9" />
                </g>
              </svg>
            </button>

            <p className="buddy-stage__speech">{robotText}</p>
          </div>
        </div>

        <div className="buddy-contact__layout">
          <aside className="buddy-contact__direct">
            <span className="buddy-contact__eyebrow">
              OR SAY HELLO DIRECTLY
            </span>

            <h3>Good things start with a conversation.</h3>

            <div className="buddy-contact__email">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>

              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copyStatus === "Email copied!" ? (
                  <Check size={16} aria-hidden="true" />
                ) : (
                  <Copy size={16} aria-hidden="true" />
                )}
              </button>
            </div>

            <div
              className="buddy-contact__copy-status"
              aria-live="polite"
            >
              {copyStatus}
            </div>

            <div className="buddy-contact__links">
              <a
                href="https://wa.me/13477241605"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>

              <a href="tel:+13477241605">
                +1 (347) 724-1605
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </aside>

          <form
            className="buddy-form"
            onSubmit={submit}
            aria-busy={status === "sending"}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setActiveField(null);
              }
            }}
          >
            <div className="buddy-form__heading">
              <span>YOUR NEXT IDEA STARTS HERE</span>
              <Send size={17} aria-hidden="true" />
            </div>

            <fieldset disabled={status === "sending"}>
              <legend className="buddy-sr-only">
                Contact details and message
              </legend>

              <div className="buddy-form__row">
                <label htmlFor={`${uniqueId}-name`}>
                  Your name
                  <input
                    id={`${uniqueId}-name`}
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={change}
                    onFocus={() => setActiveField("name")}
                    required
                    maxLength={120}
                  />
                </label>

                <label htmlFor={`${uniqueId}-email`}>
                  Email address
                  <input
                    id={`${uniqueId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={change}
                    onFocus={() => setActiveField("email")}
                    required
                    maxLength={254}
                  />
                </label>
              </div>

              <label htmlFor={`${uniqueId}-subject`}>
                What’s it about?
                <input
                  id={`${uniqueId}-subject`}
                  name="subject"
                  placeholder="A project, opportunity, or hello..."
                  value={form.subject}
                  onChange={change}
                  onFocus={() => setActiveField("subject")}
                  required
                  maxLength={200}
                />
              </label>

              <label htmlFor={`${uniqueId}-message`}>
                Your message
                <textarea
                  id={`${uniqueId}-message`}
                  name="message"
                  placeholder="Tell me what you have in mind..."
                  value={form.message}
                  onChange={change}
                  onFocus={() => setActiveField("message")}
                  required
                  rows={3}
                  maxLength={5000}
                />
              </label>

              <div className="buddy-form__bottom">
                <span>No perfect brief needed.</span>

                <button
                  type="submit"
                  className="buddy-form__submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send message"}

                  {status === "sending" ? (
                    <Loader2
                      size={16}
                      className="buddy-spinner"
                      aria-hidden="true"
                    />
                  ) : (
                    <Send size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
            </fieldset>

            <div
              className={`buddy-form__status buddy-form__status--${status}`}
              role="status"
              aria-live="polite"
            >
              {status === "sent" && (
                <span>Message sent. Thanks for reaching out!</span>
              )}

              {status === "error" && (
                <span>
                  {errorMessage} You can also{" "}
                  <a href={`mailto:${EMAIL}`}>email me directly</a>.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .buddy-contact {
          position: relative;
          isolation: isolate;
          padding: 5rem 0;
          color: #f1eaf7;
          background:
            radial-gradient(
              ellipse at 90% 15%,
              rgba(139, 91, 192, 0.08),
              transparent 45%
            ),
            #0b090f;
          scroll-margin-top: 5rem;
        }

        .buddy-contact,
        .buddy-contact *,
        .buddy-contact *::before,
        .buddy-contact *::after {
          box-sizing: border-box;
        }

        .buddy-contact__container {
          width: min(1160px, calc(100% - 48px));
          margin: 0 auto;
        }

        .buddy-contact__caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1rem;
          color: #aa9bb5;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
        }

        .buddy-contact__intro {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          align-items: center;
          gap: 2rem;
          padding: 2.5rem 0;
        }

        .buddy-contact__header {
          min-width: 0;
          text-align: left;
        }

        .buddy-contact__eyebrow {
          display: block;
          color: #b09cbe;
          font-family: ui-monospace, monospace;
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          line-height: 1.6;
        }

        .buddy-contact__header h2 {
          margin: 0.8rem 0 1rem;
          font-size: clamp(2.5rem, 5.5vw, 4.8rem);
          font-weight: 550;
          line-height: 1.04;
          letter-spacing: -0.065em;
        }

        .buddy-contact__header h2 em {
          color: transparent;
          font-style: normal;
          background: linear-gradient(100deg, #ecd5ff, #b89be4, #a3cbd9);
          background-clip: text;
          -webkit-background-clip: text;
        }

        .buddy-contact__header p {
          max-width: 350px;
          margin: 0;
          color: #afa0b9;
          font-size: 0.88rem;
          line-height: 1.75;
        }

        .buddy-contact__location {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 1rem;
          color: #b3a0c0;
          font-size: 0.7rem;
        }

        .buddy-stage {
          --eye-x: 0px;
          --eye-y: 0px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 0;
          width: 100%;
        }

        .buddy-stage__halo {
          position: absolute;
          inset: 0 -10% 10%;
          pointer-events: none;
          background: radial-gradient(
            ellipse,
            rgba(171, 120, 227, 0.2),
            transparent 65%
          );
        }

        .buddy-stage__ring {
          position: absolute;
          top: 24%;
          left: 50%;
          width: 95%;
          height: 45%;
          border: 1px solid rgba(189, 147, 229, 0.17);
          border-radius: 50%;
          pointer-events: none;
          transform: translateX(-50%) rotate(-20deg);
        }

        .buddy-stage__character {
          position: relative;
          display: block;
          width: min(100%, 285px);
          margin: 0;
          padding: 0;
          background: transparent;
          border: 0;
          border-radius: 25px;
          cursor: pointer;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .buddy-svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .buddy-svg__body-group {
          transform-origin: 150px 170px;
          animation: buddy-breathe 4.5s ease-in-out infinite;
        }

        .buddy-svg__head {
          transform-origin: 150px 145px;
          transition: transform 300ms ease;
        }

        .buddy-svg__gaze {
          transform: translate(var(--eye-x), var(--eye-y));
          transition: transform 180ms ease;
        }

        .buddy-svg__eyes {
          transform-box: fill-box;
          transform-origin: center;
          filter: drop-shadow(0 0 5px rgba(184, 182, 255, 0.65));
          animation: buddy-blink 5.5s infinite;
        }

        .buddy-svg__core {
          filter: drop-shadow(0 0 6px rgba(196, 158, 255, 0.65));
        }

        .buddy-svg__hand {
          transition: transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .buddy-svg__right-arm {
          transform-origin: 199px 181px;
        }

        .buddy-stage--hiding .buddy-svg__hand--left {
          transform: translate(62px, -110px);
        }

        .buddy-stage--hiding .buddy-svg__hand--right {
          transform: translate(-62px, -110px);
        }

        .buddy-stage--hiding .buddy-svg__head {
          transform: translateY(2px);
        }

        .buddy-stage--hiding .buddy-svg__gaze {
          transform: none;
        }

        .buddy-stage--looking .buddy-svg__head {
          transform: rotate(-6deg);
        }

        .buddy-stage--looking .buddy-svg__gaze {
          transform: translate(-5px, 2px);
        }

        .buddy-stage--typing .buddy-svg__head {
          transform: translateY(3px);
        }

        .buddy-stage--typing .buddy-svg__gaze {
          transform: translate(0, 5px);
        }

        .buddy-svg__laptop {
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 250ms ease,
            transform 250ms ease;
        }

        .buddy-stage--typing .buddy-svg__laptop {
          opacity: 1;
          transform: translateY(0);
        }

        .buddy-stage--typing .buddy-svg__hand--left {
          animation: buddy-type-left 420ms ease-in-out infinite;
        }

        .buddy-stage--typing .buddy-svg__hand--right {
          animation: buddy-type-right 420ms ease-in-out 210ms infinite;
        }

        .buddy-stage--waving .buddy-svg__right-arm {
          animation: buddy-wave 650ms ease-in-out infinite;
        }

        .buddy-svg__letter {
          opacity: 0;
          pointer-events: none;
        }

        .buddy-stage--sending .buddy-svg__letter {
          animation: buddy-letter 1.5s ease-in-out infinite;
        }

        .buddy-stage--sending .buddy-svg__head {
          transform: rotate(-8deg);
        }

        .buddy-svg__confetti {
          opacity: 0;
          transform-origin: 150px 140px;
          pointer-events: none;
        }

        .buddy-stage--success .buddy-svg__confetti {
          animation: buddy-confetti 1s ease-out both;
        }

        .buddy-stage--success .buddy-svg__body-group {
          animation: buddy-celebrate 850ms ease-in-out 2;
        }

        .buddy-stage--success .buddy-svg__right-arm {
          animation: buddy-wave 650ms ease-in-out 3;
        }

        .buddy-stage__speech {
          position: relative;
          max-width: 100%;
          margin: 0;
          padding: 0.5rem 0.8rem;
          color: #d5bfe7;
          background: rgba(166, 119, 215, 0.07);
          border: 1px solid rgba(185, 143, 231, 0.18);
          border-radius: 12px;
          font-size: 0.73rem;
          line-height: 1.4;
          text-align: center;
        }

        .buddy-contact__layout {
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
          align-items: start;
          gap: clamp(2rem, 5vw, 4rem);
        }

        .buddy-contact__direct {
          min-width: 0;
          padding-top: 1.25rem;
        }

        .buddy-contact__direct h3 {
          max-width: 290px;
          margin: 0.8rem 0 1.5rem;
          font-size: 1.8rem;
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 1.2;
        }

        .buddy-contact__email {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .buddy-contact__email > a {
          min-width: 0;
          color: #e7ddec;
          font-size: 0.85rem;
          text-decoration: none;
          overflow-wrap: anywhere;
        }

        .buddy-contact__email button {
          display: grid;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          padding: 0;
          color: #d6bce9;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          place-items: center;
        }

        .buddy-contact__copy-status {
          color: #c5abd7;
          font-size: 0.68rem;
          line-height: 1.5;
        }

        .buddy-contact__copy-status:not(:empty) {
          margin-top: 0.4rem;
        }

        .buddy-contact__links {
          display: grid;
          gap: 0.65rem;
          margin-top: 1rem;
        }

        .buddy-contact__links a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          min-height: 44px;
          padding: 0.7rem 0.85rem;
          color: #d2c0e0;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 10px;
          font-size: 0.8rem;
          text-decoration: none;
        }

        .buddy-contact__links svg {
          flex-shrink: 0;
        }

        .buddy-form {
          min-width: 0;
          padding: 1.6rem;
          background:
            radial-gradient(
              ellipse at 100% 0,
              rgba(169, 113, 230, 0.1),
              transparent 45%
            ),
            linear-gradient(135deg, #17131e, #111016);
          border: 1px solid rgba(202, 174, 232, 0.18);
          border-radius: 20px;
          box-shadow:
            0 8px 0 rgba(78, 52, 99, 0.13),
            0 20px 55px rgba(0, 0, 0, 0.2),
            inset 0 1px rgba(255, 255, 255, 0.05);
        }

        .buddy-form__heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1.2rem;
          padding-bottom: 1rem;
          color: #cbb2df;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: ui-monospace, monospace;
          font-size: 0.55rem;
          letter-spacing: 0.08em;
        }

        .buddy-form fieldset {
          display: grid;
          gap: 1rem;
          min-width: 0;
          margin: 0;
          padding: 0;
          border: 0;
        }

        .buddy-form__row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.8rem;
        }

        .buddy-form label {
          display: grid;
          gap: 0.45rem;
          min-width: 0;
          color: #d2c0df;
          font-size: 0.75rem;
        }

        .buddy-form input,
        .buddy-form textarea {
          display: block;
          width: 100%;
          min-width: 0;
          padding: 0.75rem;
          color: #efe6f6;
          background: rgba(5, 5, 9, 0.3);
          border: 1px solid rgba(210, 181, 239, 0.15);
          border-radius: 9px;
          outline: none;
          font-family: inherit;
          font-size: 16px;
          line-height: 1.4;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .buddy-form input {
          min-height: 44px;
        }

        .buddy-form textarea {
          min-height: 105px;
          resize: vertical;
        }

        .buddy-form input::placeholder,
        .buddy-form textarea::placeholder {
          color: #a28eae;
          opacity: 1;
        }

        .buddy-form input:focus,
        .buddy-form textarea:focus {
          border-color: #b38ad9;
          box-shadow: 0 0 0 3px rgba(179, 138, 217, 0.12);
        }

        .buddy-form input:disabled,
        .buddy-form textarea:disabled {
          opacity: 0.65;
        }

        .buddy-form__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .buddy-form__bottom > span {
          color: #b29ac0;
          font-size: 0.68rem;
          line-height: 1.4;
        }

        .buddy-form__submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          gap: 0.65rem;
          min-height: 44px;
          padding: 0.7rem 1rem;
          color: #25142f;
          background: linear-gradient(110deg, #e0c9fb, #bcadf0);
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 999px;
          box-shadow: 0 3px 0 #624774;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 650;
          cursor: pointer;
        }

        .buddy-form__submit:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .buddy-contact button:focus-visible,
        .buddy-contact a:focus-visible {
          outline: 2px solid #d3b3f4;
          outline-offset: 4px;
        }

        .buddy-form__status {
          color: #bea4d0;
          font-size: 0.75rem;
          line-height: 1.6;
        }

        .buddy-form__status:not(:empty) {
          margin-top: 1rem;
        }

        .buddy-form__status--sent {
          color: #a1ddbe;
        }

        .buddy-form__status--error {
          color: #efb1bf;
        }

        .buddy-form__status a {
          color: inherit;
          text-underline-offset: 3px;
        }

        .buddy-spinner {
          animation: buddy-spin 1s linear infinite;
        }

        .buddy-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          overflow: hidden;
          white-space: nowrap;
          clip-path: inset(50%);
          border: 0;
        }

        @keyframes buddy-breathe {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes buddy-blink {
          0%,
          43%,
          47%,
          100% {
            transform: scaleY(1);
          }

          45% {
            transform: scaleY(0.1);
          }
        }

        @keyframes buddy-type-left {
          0%,
          100% {
            transform: translate(50px, 8px);
          }

          50% {
            transform: translate(50px, 2px);
          }
        }

        @keyframes buddy-type-right {
          0%,
          100% {
            transform: translate(-50px, 8px);
          }

          50% {
            transform: translate(-50px, 2px);
          }
        }

        @keyframes buddy-wave {
          0%,
          100% {
            transform: rotate(-95deg);
          }

          50% {
            transform: rotate(-125deg);
          }
        }

        @keyframes buddy-letter {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }

          15% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translate(65px, -110px) rotate(20deg);
          }
        }

        @keyframes buddy-celebrate {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          35% {
            transform: translateY(-12px) rotate(-4deg);
          }

          70% {
            transform: translateY(-5px) rotate(4deg);
          }
        }

        @keyframes buddy-confetti {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }

          35% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: scale(1.15) translateY(15px);
          }
        }

        @keyframes buddy-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Mobile: heading left, small robot right. */
        @media (max-width: 760px) {
          .buddy-contact {
            padding: 1.75rem 0;
          }

          .buddy-contact__container {
            width: min(600px, calc(100% - 28px));
          }

          .buddy-contact__caption {
            padding-bottom: 0.65rem;
            font-size: 0.49rem;
            letter-spacing: 0.06em;
          }

          .buddy-contact__intro {
            grid-template-columns:
              minmax(0, 1.25fr)
              minmax(0, 0.75fr);
            gap: 0.5rem;
            padding: 1.1rem 0;
          }

          .buddy-contact__header > .buddy-contact__eyebrow {
            font-size: 0.44rem;
            letter-spacing: 0.04em;
          }

          .buddy-contact__header h2 {
            margin: 0.45rem 0 0.55rem;
            font-size: clamp(1.65rem, 6.7vw, 2.7rem);
            line-height: 1.04;
          }

          .buddy-contact__header p {
            max-width: 260px;
            font-size: 0.73rem;
            line-height: 1.5;
          }

          .buddy-contact__location {
            gap: 0.3rem;
            margin-top: 0.55rem;
            font-size: 0.6rem;
          }

          .buddy-contact__location svg {
            width: 11px;
            height: 11px;
          }

          .buddy-stage {
            justify-self: end;
          }

          .buddy-stage__character {
            width: min(100%, 155px);
          }

          .buddy-stage__halo {
            inset: -10% -10% 0;
          }

          .buddy-stage__speech {
            padding: 0.35rem 0.4rem;
            border-radius: 8px;
            font-size: 0.6rem;
            line-height: 1.35;
          }

          .buddy-contact__layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 0.9rem;
          }

          .buddy-form {
            grid-row: 1;
            padding: 0.85rem;
            border-radius: 14px;
            box-shadow: 0 4px 0 rgba(78, 52, 99, 0.13);
          }

          .buddy-form__heading {
            margin-bottom: 0.65rem;
            padding-bottom: 0.55rem;
            font-size: 0.46rem;
          }

          .buddy-form__heading svg {
            width: 14px;
            height: 14px;
          }

          .buddy-form fieldset {
            gap: 0.65rem;
          }

          .buddy-form__row {
            gap: 0.55rem;
          }

          .buddy-form label {
            gap: 0.3rem;
            font-size: 0.67rem;
          }

          .buddy-form input,
          .buddy-form textarea {
            padding: 0.55rem 0.6rem;
            border-radius: 7px;
            font-size: 16px;
          }

          .buddy-form textarea {
            min-height: 80px;
          }

          .buddy-form__bottom {
            gap: 0.5rem;
          }

          .buddy-form__bottom > span {
            max-width: 110px;
            font-size: 0.61rem;
          }

          .buddy-form__submit {
            gap: 0.5rem;
            padding: 0.6rem 0.8rem;
            font-size: 0.72rem;
          }

          .buddy-form__status {
            font-size: 0.7rem;
          }

          .buddy-contact__direct {
            padding-top: 0;
          }

          .buddy-contact__direct > .buddy-contact__eyebrow,
          .buddy-contact__direct h3 {
            display: none;
          }

          .buddy-contact__email > a {
            font-size: 0.72rem;
          }

          .buddy-contact__links {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.5rem;
            margin-top: 0.35rem;
          }

          .buddy-contact__links a {
            padding: 0.5rem 0.6rem;
            font-size: 0.66rem;
            border-radius: 8px;
          }

          .buddy-contact__links svg {
            width: 13px;
            height: 13px;
          }
        }

        @media (max-width: 360px) {
          .buddy-contact__container {
            width: calc(100% - 24px);
          }

          .buddy-contact__header h2 {
            font-size: 1.6rem;
          }

          .buddy-contact__header p {
            font-size: 0.69rem;
          }

          .buddy-contact__header > .buddy-contact__eyebrow {
            font-size: 0.4rem;
          }

          .buddy-stage__speech {
            font-size: 0.55rem;
          }

          .buddy-form {
            padding: 0.7rem;
          }

          .buddy-contact__links a {
            font-size: 0.61rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .buddy-contact *,
          .buddy-contact *::before,
          .buddy-contact *::after {
            animation: none !important;
            transition: none !important;
          }

          .buddy-stage--typing .buddy-svg__hand--left {
            transform: translate(50px, 8px);
          }

          .buddy-stage--typing .buddy-svg__hand--right {
            transform: translate(-50px, 8px);
          }

          .buddy-stage--waving .buddy-svg__right-arm,
          .buddy-stage--success .buddy-svg__right-arm {
            transform: rotate(-100deg);
          }

          .buddy-stage--sending .buddy-svg__letter {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}