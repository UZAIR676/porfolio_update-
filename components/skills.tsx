"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  Workflow,
} from "lucide-react";

import * as THREE from "three";

import { RoundedBoxGeometry } from
  "three/addons/geometries/RoundedBoxGeometry.js";

const categories = [
  {
    name: "Frontend",
    label: "INTERFACES & EXPERIENCES",
    title: "Make the first impression count.",
    description:
      "Responsive interfaces, thoughtful interactions, and web experiences with personality.",
    color: "#b8a0ff",
    rgb: "184, 160, 255",
    icon: Code2,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    message: "Let’s build something people love using.",
  },
  {
    name: "Backend",
    label: "LOGIC & INFRASTRUCTURE",
    title: "Good experiences need good systems.",
    description:
      "Application logic, APIs, and databases that connect everything behind the interface.",
    color: "#7ddde1",
    rgb: "125, 221, 225",
    icon: Database,
    skills: [
      "Node.js",
      "Express",
      "Flask",
      "MongoDB",
      "PostgreSQL",
      "REST APIs",
    ],
    message: "Connecting the pieces behind the scenes.",
  },
  {
    name: "AI & ML",
    label: "DATA & INTELLIGENCE",
    title: "Turn curiosity into intelligence.",
    description:
      "Exploring data, training models, and putting machine learning to practical use.",
    color: "#f0a9d2",
    rgb: "240, 169, 210",
    icon: BrainCircuit,
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "NumPy",
    ],
    message: "This is where things get interesting.",
  },
  {
    name: "Workflow",
    label: "TOOLS & PROCESS",
    title: "Keep the good work moving.",
    description:
      "The everyday tools I use to manage code, test ideas, and improve what I build.",
    color: "#e8ce90",
    rgb: "232, 206, 144",
    icon: Workflow,
    skills: [
      "Git & GitHub",
      "VS Code",
      "Postman",
      "Jupyter",
      "Anaconda",
      "NPM",
    ],
    message: "Build. Test. Improve. Repeat.",
  },
];

function RobotScene({ selected }: { selected: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(selected);
  const waveRef = useRef(0);

  const [sceneState, setSceneState] = useState<
    "loading" | "ready" | "unavailable"
  >("loading");

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setSceneState("unavailable");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(2.7, 1.7, 7);
    camera.lookAt(0.25, 0.25, 0);

    scene.add(
      new THREE.HemisphereLight(0xe8e5ff, 0x242033, 2),
    );

    const keyLight = new THREE.DirectionalLight(0xffffff, 4);
    keyLight.position.set(3, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc5bbff, 2);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa6bdff, 3);
    rimLight.position.set(-2, 3, -4);
    scene.add(rimLight);

    const shellMaterial = new THREE.MeshStandardMaterial({
      color: "#e8e7f0",
      metalness: 0.3,
      roughness: 0.26,
    });

    const jointMaterial = new THREE.MeshStandardMaterial({
      color: "#454353",
      metalness: 0.55,
      roughness: 0.35,
    });

    const screenMaterial = new THREE.MeshStandardMaterial({
      color: "#080d18",
      metalness: 0.35,
      roughness: 0.19,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: categories[0].color,
      emissive: categories[0].color,
      emissiveIntensity: 0.8,
      metalness: 0.2,
      roughness: 0.25,
    });

    const hologramMaterial = new THREE.MeshStandardMaterial({
      color: categories[0].color,
      emissive: categories[0].color,
      emissiveIntensity: 0.2,
      metalness: 0.45,
      roughness: 0.28,
    });

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: "#171a25",
      metalness: 0.6,
      roughness: 0.4,
    });

    function addMesh(
      parent: THREE.Object3D,
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      x: number,
      y: number,
      z: number,
    ) {
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(x, y, z);
      parent.add(mesh);

      return mesh;
    }

    function roundedBox(
      parent: THREE.Object3D,
      width: number,
      height: number,
      depth: number,
      radius: number,
      material: THREE.Material,
      x: number,
      y: number,
      z: number,
    ) {
      return addMesh(
        parent,
        new RoundedBoxGeometry(
          width,
          height,
          depth,
          3,
          radius,
        ),
        material,
        x,
        y,
        z,
      );
    }

    const robot = new THREE.Group();
    robot.position.x = -0.3;
    scene.add(robot);

    const head = new THREE.Group();
    head.position.y = 0.95;
    robot.add(head);

    roundedBox(
      head, 1.65, 1.08, 1, 0.25,
      shellMaterial, 0, 0, 0,
    );

    roundedBox(
      head, 1.34, 0.72, 0.12, 0.17,
      jointMaterial, 0, -0.02, 0.49,
    );

    roundedBox(
      head, 1.25, 0.64, 0.1, 0.15,
      screenMaterial, 0, -0.02, 0.55,
    );

    const eyes = [-0.32, 0.32].map((x) => {
      return roundedBox(
        head, 0.22, 0.26, 0.055, 0.065,
        accentMaterial, x, 0.025, 0.62,
      );
    });

    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.12, -0.18, 0.625),
      new THREE.Vector3(0, -0.27, 0.625),
      new THREE.Vector3(0.12, -0.18, 0.625),
    );

    head.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(smileCurve, 16, 0.015, 6, false),
        accentMaterial,
      ),
    );

    [-0.86, 0.86].forEach((x) => {
      const ear = addMesh(
        head,
        new THREE.CylinderGeometry(0.17, 0.17, 0.15, 24),
        jointMaterial,
        x,
        -0.015,
        0,
      );

      ear.rotation.z = Math.PI / 2;
    });

    addMesh(
      head,
      new THREE.CylinderGeometry(0.035, 0.035, 0.25, 12),
      jointMaterial,
      0,
      0.65,
      0,
    );

    addMesh(
      head,
      new THREE.SphereGeometry(0.085, 20, 16),
      accentMaterial,
      0,
      0.81,
      0,
    );

    addMesh(
      robot,
      new THREE.CylinderGeometry(0.18, 0.2, 0.3, 24),
      jointMaterial,
      0,
      0.3,
      0,
    );

    roundedBox(
      robot, 1.02, 0.85, 0.73, 0.22,
      shellMaterial, 0, -0.15, 0,
    );

    addMesh(
      robot,
      new THREE.TorusGeometry(0.16, 0.025, 12, 32),
      jointMaterial,
      0,
      -0.1,
      0.39,
    );

    addMesh(
      robot,
      new THREE.SphereGeometry(0.11, 24, 16),
      accentMaterial,
      0,
      -0.1,
      0.39,
    );

    const arms = [-1, 1].map((side) => {
      const pivot = new THREE.Group();
      pivot.position.set(side * 0.63, 0.12, 0);
      robot.add(pivot);

      addMesh(
        pivot,
        new THREE.SphereGeometry(0.13, 20, 16),
        jointMaterial,
        0,
        0,
        0,
      );

      roundedBox(
        pivot, 0.25, 0.57, 0.3, 0.12,
        shellMaterial, 0, -0.29, 0,
      );

      roundedBox(
        pivot, 0.28, 0.25, 0.32, 0.1,
        shellMaterial, 0, -0.61, 0.025,
      );

      return pivot;
    });

    [-0.28, 0.28].forEach((x) => {
      roundedBox(
        robot, 0.34, 0.33, 0.49, 0.12,
        shellMaterial, x, -0.7, 0.06,
      );
    });

    addMesh(
      scene,
      new THREE.CylinderGeometry(1.3, 1.37, 0.13, 64),
      baseMaterial,
      -0.3,
      -1.2,
      0,
    );

    const platformRing = addMesh(
      scene,
      new THREE.TorusGeometry(1.27, 0.018, 8, 80),
      accentMaterial,
      -0.3,
      -1.12,
      0,
    );

    platformRing.rotation.x = Math.PI / 2;

    const hologram = new THREE.Group();
    hologram.position.set(1.3, 0.65, 0);
    hologram.scale.setScalar(0.55);
    scene.add(hologram);

    const modules = categories.map(() => new THREE.Group());

    modules.forEach((module) => {
      hologram.add(module);
    });

    for (let index = 0; index < 3; index += 1) {
      const panel = roundedBox(
        modules[0],
        0.95,
        0.64,
        0.08,
        0.05,
        hologramMaterial,
        (index - 1) * 0.12,
        (index - 1) * 0.16,
        (index - 1) * -0.2,
      );

      panel.rotation.y = -0.25;
    }

    for (let index = 0; index < 3; index += 1) {
      addMesh(
        modules[1],
        new THREE.CylinderGeometry(0.46, 0.46, 0.22, 32),
        hologramMaterial,
        0,
        (index - 1) * 0.3,
        0,
      );
    }

    addMesh(
      modules[2],
      new THREE.IcosahedronGeometry(0.3, 1),
      hologramMaterial,
      0,
      0,
      0,
    );

    for (let index = 0; index < 3; index += 1) {
      const orbit = addMesh(
        modules[2],
        new THREE.TorusGeometry(0.62, 0.022, 8, 48),
        accentMaterial,
        0,
        0,
        0,
      );

      orbit.rotation.set(
        index * Math.PI / 3,
        index * Math.PI / 3,
        0,
      );
    }

    addMesh(
      modules[3],
      new THREE.TorusGeometry(0.5, 0.04, 12, 48),
      hologramMaterial,
      0,
      0,
      0,
    );

    for (let index = 0; index < 4; index += 1) {
      const angle = index * Math.PI / 2;

      roundedBox(
        modules[3],
        0.24,
        0.24,
        0.24,
        0.05,
        accentMaterial,
        Math.cos(angle) * 0.5,
        Math.sin(angle) * 0.5,
        0,
      );
    }

    const pointer = new THREE.Vector2();
    const targetColor = new THREE.Color(categories[0].color);

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let reducedMotion = motionQuery.matches;
    let inView = true;
    let lastCategory = -1;
    let reaction = 0;
    let lastTime = performance.now();

    function updateMotion() {
      reducedMotion = motionQuery.matches;
    }

    function movePointer(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;

      const bounds = host!.getBoundingClientRect();

      pointer.x = THREE.MathUtils.clamp(
        ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
        -1,
        1,
      );

      pointer.y = THREE.MathUtils.clamp(
        ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
        -1,
        1,
      );
    }

    function resetPointer() {
      pointer.set(0, 0);
    }

    function resize() {
      const width = Math.max(host!.clientWidth, 1);
      const height = Math.max(host!.clientHeight, 1);

      renderer.setSize(width, height);

      camera.aspect = width / height;

      if (camera.aspect >= 1.5) {
        camera.position.set(2.1, 1.35, 6.7);
      } else if (camera.aspect < 0.85) {
        camera.position.set(2.7, 1.7, 8.6);
      } else {
        camera.position.set(2.7, 1.7, 7);
      }

      camera.lookAt(0.25, 0.25, 0);
      camera.updateProjectionMatrix();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.01 },
    );

    visibilityObserver.observe(host);

    host.addEventListener("pointermove", movePointer);
    host.addEventListener("pointerleave", resetPointer);
    host.addEventListener("pointercancel", resetPointer);
    motionQuery.addEventListener("change", updateMotion);

    resize();

    renderer.setAnimationLoop((time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (!inView || document.hidden) return;

      const index = selectedRef.current;
      const t = time / 1000;
      const smoothing = 1 - Math.exp(-7 * delta);

      if (index !== lastCategory) {
        lastCategory = index;
        targetColor.set(categories[index].color);
        reaction = 1;

        modules.forEach((module, moduleIndex) => {
          module.visible = moduleIndex === index;
        });
      }

      accentMaterial.color.lerp(targetColor, smoothing);
      accentMaterial.emissive.lerp(targetColor, smoothing);

      hologramMaterial.color.lerp(targetColor, smoothing);
      hologramMaterial.emissive.lerp(targetColor, smoothing);

      reaction = Math.max(0, reaction - delta * 1.3);
      waveRef.current = Math.max(0, waveRef.current - delta);

      if (reducedMotion) {
        robot.position.y = 0;
        robot.rotation.set(0, -0.12, 0);
        head.rotation.set(0, 0, 0);

        arms[0].rotation.z = -0.1;
        arms[1].rotation.z = 1.05;

        eyes.forEach((eye) => {
          eye.scale.y = 1;
        });
      } else {
        robot.position.y =
          Math.sin(t * 1.6) * 0.055 +
          Math.sin(reaction * Math.PI) * 0.08;

        robot.rotation.y +=
          (-0.12 + pointer.x * 0.1 - robot.rotation.y) * smoothing;

        head.rotation.y +=
          (pointer.x * 0.25 - head.rotation.y) * smoothing;

        head.rotation.x +=
          (pointer.y * 0.12 - head.rotation.x) * smoothing;

        head.rotation.z = Math.sin(t * 0.8) * 0.035;

        arms[0].rotation.z =
          -0.1 + Math.sin(t * 1.5) * 0.06;

        const armTarget =
          waveRef.current > 0
            ? 2.4 + Math.sin(t * 12) * 0.3
            : 1.05 + Math.sin(t * 1.8) * 0.07;

        arms[1].rotation.z +=
          (armTarget - arms[1].rotation.z) * smoothing;

        const blinkPhase = t % 5;

        const blink =
          blinkPhase > 4.65 && blinkPhase < 4.8 ? 0.12 : 1;

        eyes.forEach((eye) => {
          eye.scale.y +=
            (blink - eye.scale.y) * smoothing * 0.9;
        });
      }

      hologram.position.y =
        0.65 + (reducedMotion ? 0 : Math.sin(t * 1.8) * 0.08);

      if (!reducedMotion) {
        hologram.rotation.y += delta * 0.4;
      }

      hologram.scale.setScalar(
        reducedMotion
          ? 0.55
          : 0.55 + Math.sin(reaction * Math.PI) * 0.06,
      );

      renderer.render(scene, camera);
    });

    setSceneState("ready");

    return () => {
      renderer.setAnimationLoop(null);

      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      host.removeEventListener("pointermove", movePointer);
      host.removeEventListener("pointerleave", resetPointer);
      host.removeEventListener("pointercancel", resetPointer);

      motionQuery.removeEventListener("change", updateMotion);

      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);

          const meshMaterials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          meshMaterials.forEach((material) => {
            materials.add(material);
          });
        }
      });

      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());

      renderer.dispose();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="studio-scene">
      <div ref={hostRef} className="studio-scene__canvas" />

      {sceneState !== "ready" && (
        <div className="studio-scene__fallback" role="status">
          <BrainCircuit size={32} strokeWidth={1.2} />

          <span>
            {sceneState === "loading"
              ? "Waking up the studio..."
              : "Explore the toolkit below."}
          </span>
        </div>
      )}

      {sceneState === "ready" && (
        <button
          type="button"
          className="studio-scene__hello"
          onClick={() => {
            waveRef.current = 2.5;
          }}
          aria-label="Make the robot wave hello"
        >
          Say hello
          <span aria-hidden="true">↗</span>
        </button>
      )}
    </div>
  );
}

export default function Skills() {
  const [selected, setSelected] = useState(0);

  const active = categories[selected];
  const ActiveIcon = active.icon;

  const theme = {
    "--studio-accent": active.color,
    "--studio-rgb": active.rgb,
  } as CSSProperties;

  return (
    <section
      id="skills"
      className="skills-studio"
      style={theme}
      aria-labelledby="skills-studio-title"
    >
      <div className="skills-studio__container">
        <div className="skills-studio__caption">
          <span>03 / MY TOOLKIT</span>
          <span>BUILT TO BUILD</span>
        </div>

        <header className="skills-studio__heading">
          <div>
            <span className="skills-studio__eyebrow">
              A SMALL STUDIO. A LOT OF POSSIBILITIES.
            </span>

            <h2 id="skills-studio-title">
              The tools change.
              <br />
              <em>The curiosity stays.</em>
            </h2>
          </div>

          <p>
            Pick a card.
            <br />
            See what I build with.
          </p>
        </header>

        <div className="studio">
          <div className="studio__top">
            <span>
              <i aria-hidden="true" />
              UZAIR’S INTERACTIVE STUDIO
            </span>

            <span>
              0{selected + 1}
              <span className="studio__divider"> / </span>
              04
            </span>
          </div>

          <div className="studio__main">
            <div className="studio__character">
              <div className="studio__aura" aria-hidden="true" />

              <RobotScene selected={selected} />

              <div
                key={`message-${selected}`}
                className="studio__robot-message"
              >
                <span aria-hidden="true">✦</span>
                {active.message}
              </div>
            </div>

            <div className="studio__details-wrap">
              <div className="studio__details-back" aria-hidden="true" />

              <div
                key={active.name}
                className="studio__details"
                role="region"
                aria-label={`${active.name} skills`}
              >
                <div className="studio__detail-top">
                  <span>{active.label}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </div>

                <div className="studio__category">
                  <div className="studio__category-icon">
                    <ActiveIcon size={28} strokeWidth={1.4} />
                  </div>

                  <span>{active.name}</span>
                </div>

                <h3>{active.title}</h3>
                <p>{active.description}</p>

                <div className="studio__skills">
                  {active.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="studio__detail-footer">
                  <span>FROM IDEA TO IMPLEMENTATION</span>
                  <span>06 TOOLS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="studio__bottom">
            <span>SELECT A CARD TO EXPLORE</span>
            <span>DESIGN · ENGINEERING · INTELLIGENCE</span>
          </div>
        </div>

        <div className="studio-deck" aria-label="Choose a toolkit">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selected === index;

            const cardTheme = {
              "--deck-color": category.color,
              "--deck-rgb": category.rgb,
            } as CSSProperties;

            return (
              <button
                key={category.name}
                type="button"
                className={`studio-deck__card ${
                  isSelected ? "studio-deck__card--active" : ""
                }`}
                style={cardTheme}
                aria-pressed={isSelected}
                onClick={() => setSelected(index)}
              >
                <span className="studio-deck__top">
                  <span className="studio-deck__icon">
                    <Icon size={23} strokeWidth={1.5} />
                  </span>

                  <span className="studio-deck__number">
                    0{index + 1}
                  </span>
                </span>

                <span className="studio-deck__name">
                  {category.name}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>

                <span className="studio-deck__footer">
                  <span>06 TOOLS</span>
                  <span>{isSelected ? "SELECTED" : "EXPLORE"}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .skills-studio {
          position: relative;
          overflow: hidden;
          padding: clamp(5rem, 9vw, 8rem) 0;
          color: #f2eff8;
          background: #08090d;
          scroll-margin-top: 5rem;
        }

        .skills-studio,
        .skills-studio * {
          box-sizing: border-box;
        }

        .skills-studio__container {
          width: min(1240px, calc(100% - 48px));
          margin: 0 auto;
        }

        .skills-studio__caption {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1rem;
          color: #91879c;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .skills-studio__heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          padding: clamp(3rem, 6vw, 5rem) 0 3rem;
        }

        .skills-studio__eyebrow {
          color: #a497b5;
          font-family: ui-monospace, monospace;
          font-size: 0.5rem;
          letter-spacing: 0.11em;
          line-height: 1.7;
        }

        .skills-studio__heading h2 {
          margin: 1rem 0 0;
          font-size: clamp(2.8rem, 5.5vw, 5.3rem);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.065em;
        }

        .skills-studio__heading h2 em {
          color: transparent;
          font-style: normal;
          background: linear-gradient(
            100deg,
            #e2d2ff,
            #aa8de6 55%,
            #93d7dd
          );
          background-clip: text;
          -webkit-background-clip: text;
        }

        .skills-studio__heading > p {
          margin: 0 0 0.3rem;
          color: #a095ac;
          font-size: 0.87rem;
          line-height: 1.8;
        }

        .studio {
          position: relative;
          overflow: hidden;
          padding: 1.3rem 1.5rem;
          background:
            radial-gradient(
              ellipse at 25% 45%,
              rgba(var(--studio-rgb), 0.065),
              transparent 60%
            ),
            linear-gradient(135deg, #14131d, #0c0e14);
          border: 1px solid rgba(var(--studio-rgb), 0.2);
          border-radius: 24px;
          box-shadow:
            0 30px 70px rgba(0, 0, 0, 0.25),
            inset 0 1px rgba(255, 255, 255, 0.055);
          transition: border-color 250ms ease;
        }

        .studio__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          color: #a196b2;
          font-family: ui-monospace, monospace;
          font-size: 0.49rem;
          letter-spacing: 0.1em;
        }

        .studio__top > span:first-child {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .studio__top i {
          flex-shrink: 0;
          width: 5px;
          height: 5px;
          background: var(--studio-accent);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(var(--studio-rgb), 0.5);
        }

        .studio__top > span:last-child {
          flex-shrink: 0;
        }

        .studio__divider {
          color: #62596d;
        }

        .studio__main {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 0 2rem;
        }

        .studio__character {
          position: relative;
          min-width: 0;
        }

        .studio__aura {
          position: absolute;
          inset: 5% 0 15%;
          pointer-events: none;
          background: radial-gradient(
            ellipse,
            rgba(var(--studio-rgb), 0.11),
            transparent 65%
          );
        }

        .studio-scene {
          position: relative;
          width: 100%;
          height: 410px;
        }

        .studio-scene__canvas {
          position: absolute;
          inset: 0;
        }

        .studio-scene__canvas canvas {
          display: block;
          width: 100%;
          height: 100%;
        }

        .studio-scene__fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          color: var(--studio-accent);
        }

        .studio-scene__fallback > span {
          color: #a89ab8;
          font-size: 0.74rem;
        }

        .studio-scene__hello {
          position: absolute;
          right: 1rem;
          bottom: 0.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          min-height: 38px;
          padding: 0.4rem 0.8rem;
          color: #cdbfdf;
          font: inherit;
          font-size: 0.68rem;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          cursor: pointer;
        }

        .studio-scene__hello:hover {
          color: var(--studio-accent);
          border-color: rgba(var(--studio-rgb), 0.4);
        }

        .studio__robot-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 42px;
          margin-top: 0.6rem;
          padding: 0.4rem 0.7rem;
          color: #c6b9d5;
          font-size: 0.72rem;
          line-height: 1.6;
          text-align: center;
          animation: studio-appear 350ms ease both;
        }

        .studio__robot-message > span {
          color: var(--studio-accent);
        }

        .studio__details-wrap {
          position: relative;
          min-width: 0;
          margin-right: 1rem;
          perspective: 900px;
        }

        .studio__details-back {
          position: absolute;
          inset: 9px -8px -8px 8px;
          pointer-events: none;
          background: rgba(var(--studio-rgb), 0.025);
          border: 1px solid rgba(var(--studio-rgb), 0.14);
          border-radius: 19px;
          transform: rotate(2deg);
        }

        .studio__details {
          position: relative;
          min-height: 365px;
          padding: clamp(1.2rem, 2.6vw, 2rem);
          background:
            radial-gradient(
              ellipse at 100% 0,
              rgba(var(--studio-rgb), 0.07),
              transparent 60%
            ),
            #14141e;
          border: 1px solid rgba(var(--studio-rgb), 0.3);
          border-radius: 19px;
          box-shadow:
            0 20px 45px rgba(0, 0, 0, 0.25),
            inset 0 1px rgba(255, 255, 255, 0.06);
          animation: studio-card-in 450ms
            cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .studio__detail-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          color: var(--studio-accent);
          font-family: ui-monospace, monospace;
          font-size: 0.47rem;
          letter-spacing: 0.1em;
          line-height: 1.6;
        }

        .studio__category {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .studio__category-icon {
          display: grid;
          flex-shrink: 0;
          width: 61px;
          height: 61px;
          color: var(--studio-accent);
          background: linear-gradient(
            135deg,
            rgba(var(--studio-rgb), 0.14),
            rgba(var(--studio-rgb), 0.025)
          );
          border: 1px solid rgba(var(--studio-rgb), 0.25);
          border-radius: 17px;
          box-shadow:
            5px 5px 0 rgba(var(--studio-rgb), 0.03),
            inset 0 1px rgba(255, 255, 255, 0.08);
          place-items: center;
        }

        .studio__category > span {
          color: var(--studio-accent);
          font-size: clamp(1.7rem, 2.5vw, 2.4rem);
          font-weight: 600;
          letter-spacing: -0.06em;
        }

        .studio__details h3 {
          margin: 0 0 0.7rem;
          color: #eee7f5;
          font-size: 1.2rem;
          font-weight: 550;
          letter-spacing: -0.035em;
          line-height: 1.4;
        }

        .studio__details > p {
          margin: 0;
          color: #a99cb7;
          font-size: 0.82rem;
          line-height: 1.8;
        }

        .studio__skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin: 1.3rem 0 1.5rem;
        }

        .studio__skills > span {
          padding: 0.43rem 0.65rem;
          color: #cfc1de;
          font-size: 0.68rem;
          line-height: 1.4;
          background: rgba(var(--studio-rgb), 0.045);
          border: 1px solid rgba(var(--studio-rgb), 0.15);
          border-radius: 8px;
        }

        .studio__detail-footer {
          display: flex;
          justify-content: space-between;
          gap: 0.6rem;
          padding-top: 0.85rem;
          color: #897b98;
          font-family: ui-monospace, monospace;
          font-size: 0.41rem;
          letter-spacing: 0.06em;
          line-height: 1.6;
          border-top: 1px solid rgba(255, 255, 255, 0.075);
        }

        .studio__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1rem;
          color: #81758e;
          font-family: ui-monospace, monospace;
          font-size: 0.43rem;
          letter-spacing: 0.09em;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .studio-deck {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
          perspective: 1000px;
        }

        .studio-deck__card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 0;
          padding: 1.15rem;
          color: #e5deed;
          font-family: inherit;
          text-align: left;
          background: linear-gradient(145deg, #19161f, #101016);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow:
            0 6px 0 #040408,
            0 14px 25px rgba(0, 0, 0, 0.18);
          cursor: pointer;
          transform: rotateX(3deg);
          transition:
            transform 200ms ease,
            border-color 200ms ease,
            background 200ms ease,
            box-shadow 200ms ease;
          -webkit-tap-highlight-color: transparent;
        }

        .studio-deck__card:hover {
          transform: translateY(-5px) rotateX(0deg);
          border-color: rgba(var(--deck-rgb), 0.45);
        }

        .studio-deck__card--active {
          background:
            linear-gradient(
              130deg,
              rgba(var(--deck-rgb), 0.09),
              transparent 80%
            ),
            #15131c;
          border-color: rgba(var(--deck-rgb), 0.55);
          transform: translateY(-3px) rotateX(0deg);
          box-shadow:
            0 6px 0 #06050a,
            0 14px 30px rgba(var(--deck-rgb), 0.06);
        }

        .studio-deck__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .studio-deck__icon {
          display: grid;
          width: 43px;
          height: 43px;
          color: var(--deck-color);
          background: rgba(var(--deck-rgb), 0.075);
          border: 1px solid rgba(var(--deck-rgb), 0.18);
          border-radius: 12px;
          place-items: center;
        }

        .studio-deck__number {
          color: #756a82;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
        }

        .studio-deck__name {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.6rem;
          font-size: 1.05rem;
          font-weight: 550;
          letter-spacing: -0.03em;
        }

        .studio-deck__name svg {
          flex-shrink: 0;
          color: #8a7b99;
        }

        .studio-deck__card--active .studio-deck__name svg {
          color: var(--deck-color);
        }

        .studio-deck__footer {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          padding-top: 0.75rem;
          color: #81738f;
          font-family: ui-monospace, monospace;
          font-size: 0.42rem;
          letter-spacing: 0.06em;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .studio-deck__card--active
          .studio-deck__footer > span:last-child {
          color: var(--deck-color);
        }

        .skills-studio button:focus-visible {
          outline: 2px solid var(--studio-accent);
          outline-offset: 4px;
        }

        @keyframes studio-appear {
          from {
            opacity: 0;
            transform: translateY(6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes studio-card-in {
          from {
            opacity: 0;
            transform: translateX(12px) rotateY(-5deg);
          }

          to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
          }
        }

        /* Tablet */

        @media (min-width: 701px) and (max-width: 1000px) {
          .skills-studio {
            padding: 4rem 0;
          }

          .skills-studio__heading {
            gap: 1.5rem;
            padding: 2.5rem 0;
          }

          .skills-studio__heading h2 {
            font-size: 3rem;
          }

          .skills-studio__heading > p {
            font-size: 0.75rem;
          }

          .studio__main {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 0.6rem;
            padding: 1rem 0;
          }

          .studio-scene {
            height: 330px;
          }

          .studio__details {
            padding: 1.2rem;
          }

          .studio__category {
            gap: 0.7rem;
            margin: 1rem 0;
          }

          .studio__category-icon {
            width: 46px;
            height: 46px;
          }

          .studio__category > span {
            font-size: 1.8rem;
          }

          .studio__details h3 {
            font-size: 1rem;
          }

          .studio-deck {
            gap: 0.7rem;
          }

          .studio-deck__card {
            padding: 0.85rem;
          }

          .studio-deck__name {
            font-size: 0.9rem;
          }
        }

        /* Compact mobile layout */

        @media (max-width: 700px) {
          .skills-studio {
            padding: 1.25rem 0;
            scroll-margin-top: 4rem;
          }

          .skills-studio__container {
            width: min(540px, calc(100% - 24px));
          }

          .skills-studio__caption {
            gap: 0.5rem;
            padding-bottom: 0.55rem;
            font-size: 0.49rem;
            letter-spacing: 0.07em;
          }

          .skills-studio__heading {
            align-items: center;
            gap: 0.5rem;
            padding: 0.85rem 0;
          }

          .skills-studio__eyebrow {
            display: none;
          }

          .skills-studio__heading h2 {
            margin: 0;
            font-size: clamp(1.65rem, 6.6vw, 2.3rem);
            line-height: 1.03;
            letter-spacing: -0.055em;
          }

          .skills-studio__heading > p {
            display: none;
          }

          .studio {
            padding: 0.65rem;
            border-radius: 17px;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
          }

          .studio__top {
            gap: 0.4rem;
            font-size: 0.4rem;
            letter-spacing: 0.05em;
          }

          .studio__top > span:first-child {
            gap: 0.35rem;
          }

          .studio__top i {
            width: 4px;
            height: 4px;
          }

          .studio__main {
            grid-template-columns: 1fr;
            gap: 0.45rem;
            padding: 0;
          }

          .studio__character {
            min-height: 0;
          }

          .studio-scene {
            height: 160px;
            height: clamp(130px, 22svh, 185px);
          }

          .studio-scene__hello {
            right: 0;
            bottom: 0.35rem;
            min-height: 36px;
            padding: 0.35rem 0.55rem;
            gap: 0.35rem;
            font-size: 0.6rem;
            background: rgba(20, 17, 29, 0.8);
          }

          .studio-scene__fallback {
            gap: 0.4rem;
          }

          .studio-scene__fallback > span {
            font-size: 0.65rem;
          }

          .studio__robot-message {
            min-height: 0;
            margin: -0.15rem 0 0.3rem;
            padding: 0 0.2rem;
            gap: 0.35rem;
            font-size: 0.6rem;
            line-height: 1.4;
          }

          .studio__details-wrap {
            margin: 0;
          }

          .studio__details-back {
            display: none;
          }

          .studio__details {
            min-height: 0;
            padding: 0.75rem;
            border-radius: 12px;
            box-shadow: inset 0 1px rgba(255, 255, 255, 0.04);
          }

          .studio__detail-top {
            display: none;
          }

          .studio__category {
            gap: 0.55rem;
            margin: 0 0 0.45rem;
          }

          .studio__category-icon {
            width: 31px;
            height: 31px;
            border-radius: 9px;
            box-shadow: none;
          }

          .studio__category-icon svg {
            width: 18px;
            height: 18px;
          }

          .studio__category > span {
            font-size: 1.2rem;
            letter-spacing: -0.04em;
          }

          .studio__details h3 {
            margin: 0 0 0.35rem;
            font-size: 0.86rem;
            line-height: 1.3;
            letter-spacing: -0.02em;
          }

          .studio__details > p {
            font-size: 0.72rem;
            line-height: 1.45;
          }

          .studio__skills {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.35rem;
            margin: 0.6rem 0 0;
          }

          .studio__skills > span {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 0;
            padding: 0.32rem 0.2rem;
            font-size: 0.61rem;
            line-height: 1.35;
            text-align: center;
            overflow-wrap: anywhere;
            border-radius: 6px;
          }

          .studio__detail-footer {
            display: none;
          }

          .studio__bottom {
            justify-content: center;
            margin-top: 0.55rem;
            padding-top: 0.45rem;
            font-size: 0.4rem;
            letter-spacing: 0.06em;
          }

          .studio__bottom > span:last-child {
            display: none;
          }

          .studio-deck {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.5rem;
            margin-top: 0.65rem;
            perspective: none;
          }

          .studio-deck__card {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            align-items: center;
            gap: 0.55rem;
            min-height: 48px;
            padding: 0.5rem 0.6rem;
            border-radius: 11px;
            box-shadow: 0 3px 0 #040408;
            transform: none;
          }

          .studio-deck__card:hover,
          .studio-deck__card--active {
            transform: none;
          }

          .studio-deck__card--active {
            box-shadow:
              0 3px 0 #040408,
              inset 0 0 0 1px rgba(var(--deck-rgb), 0.12);
          }

          .studio-deck__top {
            display: block;
          }

          .studio-deck__icon {
            width: 29px;
            height: 29px;
            border-radius: 8px;
          }

          .studio-deck__icon svg {
            width: 17px;
            height: 17px;
          }

          .studio-deck__number {
            display: none;
          }

          .studio-deck__name {
            gap: 0.25rem;
            font-size: 0.75rem;
            line-height: 1.3;
            letter-spacing: -0.02em;
          }

          .studio-deck__name svg {
            width: 13px;
            height: 13px;
          }

          .studio-deck__footer {
            display: none;
          }
        }

        /* Smaller mobile screens */

        @media (max-width: 360px) {
          .skills-studio {
            padding: 1rem 0;
          }

          .skills-studio__container {
            width: calc(100% - 20px);
          }

          .skills-studio__heading h2 {
            font-size: 1.65rem;
          }

          .studio {
            padding: 0.55rem;
          }

          .studio__details {
            padding: 0.65rem;
          }

          .studio__details > p {
            font-size: 0.7rem;
          }

          .studio__skills > span {
            font-size: 0.58rem;
          }

          .studio-deck__card {
            padding: 0.45rem 0.5rem;
            gap: 0.4rem;
          }

          .studio-deck__name {
            font-size: 0.71rem;
          }
        }

        /* Short mobile viewports */

        @media (max-width: 700px) and (max-height: 700px) {
          .skills-studio {
            padding: 0.85rem 0;
          }

          .skills-studio__heading {
            padding: 0.65rem 0;
          }

          .studio-scene {
            height: 125px;
          }

          .studio__robot-message {
            display: none;
          }

          .studio__details {
            padding: 0.65rem;
          }

          .studio__skills {
            margin-top: 0.45rem;
          }

          .studio__bottom {
            display: none;
          }

          .studio-deck {
            margin-top: 0.55rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skills-studio *,
          .skills-studio *::before,
          .skills-studio *::after {
            animation: none !important;
            transition: none !important;
          }

          .studio-deck__card,
          .studio-deck__card:hover,
          .studio-deck__card--active {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}