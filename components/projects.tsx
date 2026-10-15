"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Minus,
  Plus,
  X,
} from "lucide-react";

import ecommerceImage from "./Images/e.png";
import wineImage from "./Images/vine.png";
import heartImage from "./Images/heart.png";
import rainImage from "./Images/rain.png";
import carImage from "./Images/carmen.png";
import quizImage from "./Images/quizapp.png";
import taskPilotImage from "./Images/taskapp.png";
import musicImage from "./Images/musicai.png";
import nexaImage from "./Images/nexagaurd.png";
import comparatorImage from "./Images/elcomparafor.png";

type ProjectCategory = "fullstack" | "ai";
type Filter = "all" | ProjectCategory;

type Project = {
  title: string;
  description: string;
  summary: string;
  image: StaticImageData;
  tags: string[];
  githubLink: string;
  category: ProjectCategory;
  number: string;
};

const projects: Project[] = [
  {
    title: "NexaGuard",
    description:
      "An AI-powered financial security and market intelligence platform. It combines a Qwen 2.5 financial assistant, LSTM and XGBoost stock predictions, transaction fraud scoring, face verification, liveness checks, and geo-IP impossible-travel alerts in a FastAPI and React app.",
    summary: "Financial security, market intelligence, and AI advisory.",
    image: nexaImage,
    tags: ["FastAPI", "React", "TensorFlow", "XGBoost", "DeepFace"],
    githubLink: "https://github.com/UZAIR676/NexaGuard",
    category: "ai",
    number: "01",
  },
  {
    title: "Mood Music AI",
    description:
      "A piano music generator trained from scratch on Google's MAESTRO dataset. The three-layer Transformer uses four attention heads and mood-aware sampling to create original melodies from note, timing, velocity, and duration tokens.",
    summary: "A custom Transformer that composes piano music by mood.",
    image: musicImage,
    tags: ["PyTorch", "Transformer", "MAESTRO", "Flask", "pretty_midi"],
    githubLink: "https://github.com/UZAIR676/mood-music-ai",
    category: "ai",
    number: "02",
  },
  {
    title: "TaskPilot",
    description:
      "An AI task manager with a Spring Boot REST API and Google Gemini integration. Create tasks with natural language, summarize work, and break large goals into useful subtasks.",
    summary: "Natural language task planning with AI summaries.",
    image: taskPilotImage,
    tags: ["Java", "Spring Boot", "React", "Gemini AI", "H2"],
    githubLink: "https://github.com/UZAIR676/TaskPilot",
    category: "fullstack",
    number: "03",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack online store with product management, a shopping cart, and payment processing, built with the MERN stack.",
    summary: "A complete storefront built around the shopping journey.",
    image: ecommerceImage,
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    githubLink: "https://github.com/UZAIR676/Ecommerce",
    category: "fullstack",
    number: "04",
  },
  {
    title: "ElComparador",
    description:
      "A responsive product comparison app that helps shoppers compare options in a clean, focused interface.",
    summary: "Product discovery with a simple comparison experience.",
    image: comparatorImage,
    tags: ["React", "Node.js", "Tailwind CSS"],
    githubLink: "https://github.com/UZAIR676/Ecommerce",
    category: "fullstack",
    number: "05",
  },
  {
    title: "Quiz App",
    description:
      "An interactive quiz app with questions fetched from an API, dynamic screens, and immediate score updates.",
    summary: "Live questions and instant feedback in a quick quiz flow.",
    image: quizImage,
    tags: ["React", "Node.js", "Tailwind CSS", "API"],
    githubLink: "https://github.com/UZAIR676/Quiz-App-",
    category: "fullstack",
    number: "06",
  },
  {
    title: "Wine Quality Prediction",
    description:
      "A machine learning project that predicts wine quality from chemical measurements using Random Forest and SVM classifiers.",
    summary: "Classification models for a real-world quality prediction task.",
    image: wineImage,
    tags: ["Python", "Random Forest", "SVM", "Jupyter"],
    githubLink: "https://github.com/UZAIR676/-Wine-Quality-Prediction-ML",
    category: "ai",
    number: "07",
  },
  {
    title: "Heart Disease Prediction",
    description:
      "A machine learning pipeline that explores patient health data, prepares useful features, and compares models for heart disease prediction.",
    summary: "Health data, feature engineering, and model evaluation.",
    image: heartImage,
    tags: ["Python", "Scikit-learn", "Jupyter", "Data Analysis"],
    githubLink:
      "https://github.com/UZAIR676/Heart-Disease-Prediction-using-Machine-Learning-",
    category: "ai",
    number: "08",
  },
  {
    title: "Car Price Prediction",
    description:
      "A used-car price prediction app with a Flask API, a React interface, and a Random Forest model trained on vehicle data.",
    summary: "An end-to-end ML app for used-car price estimates.",
    image: carImage,
    tags: ["Python", "React", "Flask", "Random Forest"],
    githubLink: "https://github.com/UZAIR676/car_prediction-",
    category: "ai",
    number: "09",
  },
  {
    title: "Rain Prediction",
    description:
      "A rainfall forecasting project that uses historical weather data to train and evaluate machine learning models.",
    summary: "Weather data turned into a practical forecasting model.",
    image: rainImage,
    tags: ["Python", "Random Forest", "Jupyter"],
    githubLink:
      "https://github.com/UZAIR676/Rainfall-Prediction-Using-Machine-Learning",
    category: "ai",
    number: "10",
  },
];

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "fullstack", label: "Full stack" },
  { id: "ai", label: "AI & data" },
];

function tiltCard(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;

  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;

  card.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
  card.style.setProperty("--tilt-y", `${(x - 0.5) * 10}deg`);
  card.style.setProperty("--pointer-x", `${x * 100}%`);
  card.style.setProperty("--pointer-y", `${y * 100}%`);
}

function resetTilt(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
  card.style.setProperty("--pointer-x", "50%");
  card.style.setProperty("--pointer-y", "50%");
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );

  const visibleProjects = expanded
    ? filteredProjects
    : filteredProjects.slice(0, 5);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !selected) return;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".project3d-card");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card, index) => {
      (card as HTMLElement).style.setProperty(
        "--reveal-delay",
        `${index * 100}ms`,
      );
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filter, expanded]);

  return (
    <section
      id="projects"
      className="projects3d"
      aria-labelledby="projects-title"
    >
      <div
        className="projects3d__glow projects3d__glow--one"
        aria-hidden="true"
      />
      <div
        className="projects3d__glow projects3d__glow--two"
        aria-hidden="true"
      />

      <div className="projects3d__container">
        <div className="projects3d__eyebrow">
          <span>01 / SELECTED WORK</span>
          <span>IDEAS, SHIPPED.</span>
        </div>

        <header className="projects3d__heading">
          <div>
            <p className="projects3d__kicker">A few things I have built</p>
            <h2 id="projects-title">
              Less talk.
              <br />
              <span>More making.</span>
            </h2>
          </div>

          <p className="projects3d__intro">
            Full-stack products, machine learning experiments, and ideas brought
            to life with code.
          </p>
        </header>

        <div className="projects3d__toolbar">
          <div className="projects3d__filters" aria-label="Filter projects">
            {filters.map((item) => {
              const count =
                item.id === "all"
                  ? projects.length
                  : projects.filter(
                      (project) => project.category === item.id,
                    ).length;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={
                    filter === item.id
                      ? "projects3d__filter is-active"
                      : "projects3d__filter"
                  }
                  aria-pressed={filter === item.id}
                  onClick={() => {
                    setFilter(item.id);
                    setExpanded(false);
                  }}
                >
                  {item.label}
                  <span>{String(count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>

          <span className="projects3d__hint">
            MOVE YOUR CURSOR TO EXPLORE <ArrowDownRight size={14} />
          </span>
        </div>

        <div className="projects3d__grid" ref={gridRef}>
          {visibleProjects.map((project, index) => (
            <article
              key={project.title}
              className={`project3d-card ${
                index === 0 ? "project3d-card--featured" : ""
              }`}
              onPointerMove={tiltCard}
              onPointerLeave={resetTilt}
            >
              <button
                type="button"
                className="project3d-card__visual"
                onClick={() => setSelected(project)}
                aria-label={`View ${project.title} project details`}
              >
                <span
                  className="project3d-card__halo"
                  aria-hidden="true"
                />
                <span
                  className="project3d-card__orbit project3d-card__orbit--one"
                  aria-hidden="true"
                />
                <span
                  className="project3d-card__orbit project3d-card__orbit--two"
                  aria-hidden="true"
                />

                <span className="project3d-card__number">
                  {project.number}
                </span>

                <span className="project3d-card__open" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>

                <span className="project3d-card__screen">
                  <span className="project3d-card__chrome">
                    <i />
                    <i />
                    <i />
                    <span>
                      {project.title.toLowerCase().replaceAll(" ", "-")}
                    </span>
                  </span>

                  <span className="project3d-card__image-wrap">
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="(max-width: 700px) 92vw, (max-width: 1100px) 48vw, 620px"
                      className="project3d-card__image"
                    />
                  </span>

                  <span
                    className="project3d-card__screen-reflection"
                    aria-hidden="true"
                  />
                </span>

                <span className="project3d-card__underlabel">
                  {project.category === "fullstack"
                    ? "FULL STACK / PRODUCT"
                    : "AI / MACHINE LEARNING"}
                </span>
              </button>

              <div className="project3d-card__content">
                <h3>
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                  >
                    {project.title}
                  </button>
                </h3>

                <p>{project.summary}</p>

                <div className="project3d-card__tags">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="project3d-card__actions">
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                  >
                    Explore project <ArrowUpRight size={15} />
                  </button>

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} source code on GitHub`}
                  >
                    <Github size={15} /> Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length > 5 && (
          <button
            type="button"
            className="projects3d__more"
            aria-expanded={expanded}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded
              ? "Show selected projects"
              : `Explore all ${filteredProjects.length} projects`}
            {expanded ? <Minus size={17} /> : <Plus size={17} />}
          </button>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="projects3d-dialog"
        aria-labelledby="project3d-dialog-title"
        onCancel={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setSelected(null);
          }
        }}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="projects3d-dialog__panel">
            <div className="projects3d-dialog__top">
              <span>
                PROJECT EXPLORER /{" "}
                {selected.category === "fullstack" ? "FULL STACK" : "AI & DATA"}
              </span>

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close project details"
                autoFocus
              >
                <X size={19} />
              </button>
            </div>

            <div className="projects3d-dialog__image">
              <Image
                src={selected.image}
                alt={`${selected.title} interface`}
                fill
                sizes="(max-width: 700px) 94vw, 900px"
              />
            </div>

            <div className="projects3d-dialog__copy">
              <span className="projects3d__kicker">BEHIND THE BUILD</span>
              <h2 id="project3d-dialog-title">{selected.title}</h2>
              <p>{selected.description}</p>

              <div className="project3d-card__tags">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <a
                className="projects3d-dialog__source"
                href={selected.githubLink}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} />
                Explore the source
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        )}
      </dialog>

      <style jsx global>{`
        .projects3d {
          --p3d-bg: #08090d;
          --p3d-panel: #11131a;
          --p3d-line: rgba(255, 255, 255, 0.1);
          --p3d-muted: #9296a5;
          --p3d-text: #f5f6fb;
          --p3d-accent: #a78bfa;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(5rem, 10vw, 9rem) 0;
          color: var(--p3d-text);
          background:
            radial-gradient(
              ellipse at 50% -10%,
              rgba(124, 91, 220, 0.14),
              transparent 42%
            ),
            var(--p3d-bg);
        }

        .projects3d__container {
          position: relative;
          z-index: 1;
          width: min(1240px, calc(100% - 48px));
          margin: 0 auto;
        }

        .projects3d__glow {
          position: absolute;
          z-index: 0;
          width: 30rem;
          aspect-ratio: 1;
          pointer-events: none;
          filter: blur(110px);
          opacity: 0.16;
        }

        .projects3d__glow--one {
          top: 24%;
          left: -18rem;
          background: #6842d2;
        }

        .projects3d__glow--two {
          right: -20rem;
          bottom: 10%;
          background: #2563eb;
        }

        .projects3d__eyebrow,
        .projects3d__toolbar,
        .projects3d-card__actions,
        .projects3d-dialog__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .projects3d__eyebrow,
        .projects3d__hint,
        .projects3d__kicker,
        .project3d-card__underlabel,
        .projects3d-dialog__top > span {
          font-family: var(
            --font-mono,
            ui-monospace,
            SFMono-Regular,
            monospace
          );
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.13em;
        }

        .projects3d__eyebrow {
          padding-bottom: 1rem;
          color: var(--p3d-muted);
          border-bottom: 1px solid var(--p3d-line);
        }

        .projects3d__heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 2rem;
          padding: clamp(3rem, 7vw, 6rem) 0 3rem;
        }

        .projects3d__kicker {
          display: block;
          margin: 0 0 1rem;
          color: var(--p3d-accent);
        }

        .projects3d__heading h2 {
          margin: 0;
          font-size: clamp(3.4rem, 8vw, 7.2rem);
          font-weight: 650;
          letter-spacing: -0.075em;
          line-height: 0.91;
        }

        .projects3d__heading h2 span {
          color: transparent;
          background: linear-gradient(
            100deg,
            #d4c7ff 5%,
            #8b72eb 52%,
            #59c9d9 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
        }

        .projects3d__intro {
          max-width: 19rem;
          margin: 0 0 0.3rem;
          color: var(--p3d-muted);
          font-size: 1rem;
          line-height: 1.75;
        }

        .projects3d__toolbar {
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .projects3d__filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
        }

        .projects3d__filter {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          min-height: 2.7rem;
          padding: 0.3rem 0.95rem;
          color: #b4b6c2;
          font: inherit;
          font-size: 0.82rem;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid var(--p3d-line);
          border-radius: 999px;
          cursor: pointer;
          transition:
            color 180ms ease,
            border-color 180ms ease,
            background 180ms ease;
        }

        .projects3d__filter span {
          color: #85899a;
          font: 600 0.65rem var(--font-mono, ui-monospace, monospace);
        }

        .projects3d__filter:hover,
        .projects3d__filter.is-active {
          color: white;
          background: rgba(167, 139, 250, 0.12);
          border-color: rgba(167, 139, 250, 0.55);
        }

        .projects3d__filter.is-active span {
          color: #d6c9ff;
        }

        .projects3d__hint {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: #777c8d;
          white-space: nowrap;
        }

        .projects3d__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(1.1rem, 3vw, 2.2rem);
          perspective: 1500px;
        }

        .project3d-card {
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --pointer-x: 50%;
          --pointer-y: 50%;
          position: relative;
          min-width: 0;
          padding: 0.65rem;
          overflow: hidden;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.075),
              rgba(255, 255, 255, 0.015) 45%
            ),
            var(--p3d-panel);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 1.25rem;
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.25),
            inset 0 1px rgba(255, 255, 255, 0.07);
          transform:
            rotateX(var(--tilt-x))
            rotateY(var(--tilt-y))
            translateZ(0);
          transform-style: preserve-3d;
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            box-shadow 220ms ease;
          will-change: transform;
        }

        .project3d-card.is-visible {
          animation: project3d-reveal 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          animation-delay: var(--reveal-delay, 0ms);
        }

        .project3d-card::before {
          position: absolute;
          z-index: 2;
          inset: 0;
          pointer-events: none;
          content: "";
          background: radial-gradient(
            420px circle at var(--pointer-x) var(--pointer-y),
            rgba(186, 165, 255, 0.13),
            transparent 48%
          );
          opacity: 0;
          transition: opacity 220ms ease;
        }

        .project3d-card:hover {
          border-color: rgba(178, 157, 255, 0.3);
          box-shadow:
            0 32px 90px rgba(0, 0, 0, 0.38),
            0 0 40px rgba(111, 77, 201, 0.08),
            inset 0 1px rgba(255, 255, 255, 0.12);
        }

        .project3d-card:hover::before {
          opacity: 1;
        }

        .project3d-card--featured {
          grid-column: span 2;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem;
        }

        .project3d-card__visual {
          position: relative;
          display: block;
          width: 100%;
          min-width: 0;
          aspect-ratio: 1.46;
          padding: 1rem 1rem 1.9rem;
          overflow: hidden;
          color: inherit;
          text-align: left;
          background:
            radial-gradient(
              ellipse at 50% 110%,
              rgba(119, 82, 218, 0.28),
              transparent 55%
            ),
            #0b0c12;
          border: 1px solid rgba(255, 255, 255, 0.045);
          border-radius: 0.9rem;
          cursor: pointer;
          transform: translateZ(18px);
          transform-style: preserve-3d;
        }

        .project3d-card__halo {
          position: absolute;
          top: 10%;
          left: 50%;
          width: 60%;
          aspect-ratio: 1;
          background: rgba(133, 97, 235, 0.18);
          border-radius: 50%;
          filter: blur(70px);
          transform: translateX(-50%);
          transition:
            opacity 250ms ease,
            transform 450ms ease;
        }

        .project3d-card:hover .project3d-card__halo {
          opacity: 0.8;
          transform: translateX(-50%) scale(1.2);
        }

        .project3d-card__orbit {
          position: absolute;
          z-index: 1;
          width: 4px;
          height: 4px;
          background: #ded5ff;
          border-radius: 50%;
          box-shadow: 0 0 16px 3px rgba(183, 159, 255, 0.7);
          animation: project3d-float 4s ease-in-out infinite;
        }

        .project3d-card__orbit--one {
          top: 24%;
          right: 14%;
        }

        .project3d-card__orbit--two {
          bottom: 25%;
          left: 12%;
          width: 3px;
          height: 3px;
          animation-delay: -1.5s;
        }

        .project3d-card__number,
        .project3d-card__open,
        .project3d-card__underlabel {
          position: absolute;
          z-index: 4;
          transform: translateZ(36px);
        }

        .project3d-card__number {
          top: 1rem;
          left: 1rem;
          color: rgba(255, 255, 255, 0.66);
          font: 600 0.67rem var(--font-mono, ui-monospace, monospace);
        }

        .project3d-card__open {
          top: 0.75rem;
          right: 0.75rem;
          display: grid;
          width: 2.25rem;
          height: 2.25rem;
          color: #f7f4ff;
          background: rgba(15, 14, 24, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.17);
          border-radius: 50%;
          place-items: center;
          transition:
            color 180ms ease,
            background 180ms ease,
            transform 180ms ease;
        }

        .project3d-card__visual:hover .project3d-card__open {
          color: #111;
          background: #d4c7ff;
          transform: translateZ(42px) rotate(45deg);
        }

        .project3d-card__screen {
          position: relative;
          display: flex;
          flex-direction: column;
          width: min(88%, 620px);
          height: 88%;
          margin: 6% auto 0;
          overflow: hidden;
          background: #151720;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.6rem;
          box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.5),
            0 0 0 5px rgba(255, 255, 255, 0.025);
          transform: translateZ(45px) rotateX(2deg);
          transition:
            transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 350ms ease;
          transform-style: preserve-3d;
        }

        .project3d-card:hover .project3d-card__screen {
          box-shadow:
            0 42px 80px rgba(0, 0, 0, 0.58),
            0 0 38px rgba(140, 107, 235, 0.13);
          transform: translateZ(58px) rotateX(0deg) scale(1.025);
        }

        .project3d-card__chrome {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 5px;
          min-height: 1.65rem;
          padding: 0 0.65rem;
          background: #1d202a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .project3d-card__chrome i {
          width: 6px;
          height: 6px;
          background: #fe706a;
          border-radius: 50%;
        }

        .project3d-card__chrome i:nth-child(2) {
          background: #f7bd4f;
        }

        .project3d-card__chrome i:nth-child(3) {
          background: #61c454;
        }

        .project3d-card__chrome > span {
          width: 48%;
          margin: 0 auto;
          overflow: hidden;
          color: #8c91a2;
          font: 500 0.55rem var(--font-mono, ui-monospace, monospace);
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .project3d-card__image-wrap {
          position: relative;
          display: block;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          background: #101218;
        }

        .project3d-card__image {
          object-fit: cover;
          object-position: top center;
          transition:
            transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 300ms ease;
        }

        .project3d-card:hover .project3d-card__image {
          filter: saturate(1.08);
          transform: scale(1.055);
        }

        .project3d-card__screen-reflection {
          position: absolute;
          z-index: 1;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.11),
            transparent 25%,
            transparent 65%,
            rgba(255, 255, 255, 0.035)
          );
          mix-blend-mode: screen;
        }

        .project3d-card__underlabel {
          right: 1.1rem;
          bottom: 0.8rem;
          left: 1.1rem;
          color: rgba(226, 224, 240, 0.6);
          font-size: 0.56rem;
          text-align: center;
        }

        .project3d-card__content {
          position: relative;
          z-index: 3;
          padding: 1.15rem 1.05rem 0.55rem;
          transform: translateZ(28px);
        }

        .project3d-card__content h3 {
          margin: 0 0 0.55rem;
          font-size: clamp(1.25rem, 2.3vw, 1.75rem);
          letter-spacing: -0.045em;
        }

        .project3d-card__content h3 button {
          padding: 0;
          color: inherit;
          font: inherit;
          text-align: left;
          background: none;
          border: 0;
          cursor: pointer;
        }

        .project3d-card__content > p {
          max-width: 38rem;
          min-height: 2.8rem;
          margin: 0 0 1.15rem;
          color: var(--p3d-muted);
          font-size: 0.88rem;
          line-height: 1.7;
        }

        .project3d-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .project3d-card__tags span {
          padding: 0.36rem 0.62rem;
          color: #c7c4d5;
          font-size: 0.68rem;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
        }

        .project3d-card__actions {
          gap: 1rem;
          margin-top: 1.3rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--p3d-line);
        }

        .project3d-card__actions button,
        .project3d-card__actions a {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0;
          color: #f2edff;
          font: inherit;
          font-size: 0.77rem;
          text-decoration: none;
          background: none;
          border: 0;
          cursor: pointer;
          transition: color 180ms ease;
        }

        .project3d-card__actions a {
          color: #a4a6b3;
        }

        .project3d-card__actions button:hover,
        .project3d-card__actions a:hover {
          color: #c7b5ff;
        }

        .projects3d__more {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          min-height: 3.2rem;
          margin: 2.5rem auto 0;
          padding: 0 1.25rem;
          color: #eee9ff;
          font: inherit;
          font-size: 0.84rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--p3d-line);
          border-radius: 999px;
          cursor: pointer;
          transition:
            background 180ms ease,
            border-color 180ms ease,
            transform 180ms ease;
        }

        .projects3d__more:hover {
          background: rgba(167, 139, 250, 0.12);
          border-color: rgba(167, 139, 250, 0.45);
          transform: translateY(-2px);
        }

        .projects3d-dialog {
          width: min(900px, calc(100% - 28px));
          max-height: min(90vh, 960px);
          padding: 0;
          overflow: auto;
          color: var(--p3d-text);
          background: #101118;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 1.2rem;
          box-shadow: 0 40px 120px rgba(0, 0, 0, 0.72);
        }

        .projects3d-dialog::backdrop {
          background: rgba(3, 4, 9, 0.78);
          backdrop-filter: blur(12px);
        }

        .projects3d-dialog__panel {
          padding: clamp(1rem, 3vw, 1.5rem);
        }

        .projects3d-dialog__top {
          gap: 1rem;
          margin-bottom: 1rem;
          color: var(--p3d-muted);
        }

        .projects3d-dialog__top button {
          display: grid;
          width: 2.3rem;
          height: 2.3rem;
          color: white;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--p3d-line);
          border-radius: 50%;
          cursor: pointer;
          place-items: center;
        }

        .projects3d-dialog__image {
          position: relative;
          aspect-ratio: 1.8;
          overflow: hidden;
          background: #0a0b10;
          border: 1px solid var(--p3d-line);
          border-radius: 0.8rem;
        }

        .projects3d-dialog__image img {
          object-fit: contain;
        }

        .projects3d-dialog__copy {
          padding: 1.7rem 0.25rem 0.5rem;
        }

        .projects3d-dialog__copy h2 {
          margin: 0.65rem 0;
          font-size: clamp(2rem, 5vw, 3.6rem);
          letter-spacing: -0.06em;
        }

        .projects3d-dialog__copy > p {
          max-width: 64ch;
          margin: 0 0 1.3rem;
          color: #b2b4c1;
          line-height: 1.8;
        }

        .projects3d-dialog__source {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          margin-top: 1.5rem;
          padding: 0.85rem 1rem;
          color: #100e17;
          font-size: 0.82rem;
          font-weight: 650;
          text-decoration: none;
          background: linear-gradient(100deg, #d6c9ff, #9be8ed);
          border-radius: 999px;
        }

        @keyframes project3d-float {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.65;
          }

          50% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        @keyframes project3d-reveal {
          from {
            opacity: 0;
            translate: 0 36px;
            scale: 0.97;
          }

          to {
            opacity: 1;
            translate: 0 0;
            scale: 1;
          }
        }

        @media (max-width: 760px) {
          .projects3d__container {
            width: min(100% - 30px, 620px);
          }

          .projects3d__heading {
            display: block;
            padding-bottom: 2.2rem;
          }

          .projects3d__intro {
            margin-top: 1.4rem;
          }

          .projects3d__toolbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .projects3d__hint {
            display: none;
          }

          .projects3d__grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .project3d-card--featured {
            grid-column: auto;
            display: block;
            padding: 0.6rem;
          }

          .project3d-card__visual {
            aspect-ratio: 1.25;
          }

          .project3d-card__content {
            padding: 1.05rem 0.7rem 0.45rem;
          }

          .project3d-card__content > p {
            min-height: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project3d-card,
          .project3d-card::before,
          .project3d-card__image,
          .project3d-card__screen,
          .project3d-card__orbit,
          .project3d-card.is-visible,
          .projects3d__more {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}