"use client"

import { useState, useEffect, useRef } from "react";

import Image from "next/image";
import { ArrowUpRight, Plus, Minus, X, Github } from "lucide-react";
import e from "./Images/e.png";
import m from "./Images/m.png";
import vein from "./Images/vine.png";
import heart from "./Images/heart.png";
import rain from "./Images/rain.png";
import Elbo from "./Images/elcomparafor.png";
import carg from "./Images/carmen.png";
import quiz from './Images/quizapp.png'
import taskpilot from "./Images/taskapp.png";
import music from './Images/musicai.png'
import nexa from './Images/nexagaurd.png'

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured online store with product management, cart functionality, and payment processing.",
    image: e,
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    githubLink: "https://github.com/UZAIR676/Ecommerce",
    // demoLink: "https://store-app-ten-rho.vercel.app/",
    category: "mern",
    accent: "purple",
  },
  {
  title: "NexaGuard",
  description:
  "Enterprise-grade financial security & market intelligence platform for US markets. Features an AI financial advisor powered by a locally-run Qwen 2.5 LLM, LSTM/XGBoost hybrid stock prediction, real-time transaction fraud scoring, face biometric authentication with liveness detection, and geo-IP impossible-travel detection — all wrapped in a full-stack FastAPI + React app with role-based admin controls.",
  image: nexa,
  tags: ["FastAPI", "React", "TensorFlow", "XGBoost", "DeepFace"],
  githubLink: "https://github.com/UZAIR676/NexaGuard",
  demoLink: "",
  category: "datascience",
  accent: "teal",
  },
  {
    title: "TaskPilot",
    description:
      "AI-powered task manager with Spring Boot REST API and Google Gemini integration. Supports natural language task creation, AI summarization, and subtask breakdown.",
    image: taskpilot,
    tags: ["Java", "Spring Boot", "React", "Gemini AI", "H2"],
    githubLink: "https://github.com/UZAIR676/TaskPilot",
    // demoLink: "https://task-pilot-lac.vercel.app/",
    category: "mern", // ✅ Fixed: was "fullstack", now "mern"
    accent: "purple",
  },
  {
    title: "Quiz App",
    description:
      "Interactive React quiz platform with dynamic UI, real-time score updates, and questions fetched live from an API.",
    image: quiz,
    tags: ["React", "Node.js", "Tailwind CSS", "CSS"],
    githubLink: "https://github.com/UZAIR676/Quiz-App-",
    demoLink: "",
    category: "mern",
    accent: "purple",
  },
  {
    title: "ElComparador",
    description:
      "Modern full-stack React app for product comparison with clean UI, responsive design, and scalable component architecture.",
    image: Elbo,
    tags: ["React", "Node.js", "Tailwind CSS", "CSS"],
    githubLink: "https://github.com/UZAIR676/Ecommerce",
    // demoLink: "https://elcomparador.netlify.app/",
    category: "mern",
    accent: "purple",
  },
  {
  title: "Mood Music AI",
  description:
    "Transformer trained from scratch on Google's MAESTRO dataset to generate original piano music. Architecture: 3-layer decoder, 4 attention heads, 128-dim embeddings, 512 FFN. Custom tokenizer encodes each note into 4 tokens — pitch, velocity, timing, duration — across a 364-token vocab. Mood control via musical scale filtering (Major, Minor, Pentatonic, Diminished) with per-mood temperature. 10 epochs, AdamW, lr 3e-4.",
  image: music,
  tags: ["PyTorch", "Transformer", "MAESTRO", "Flask", "pretty_midi", "Top-K Sampling"],
  githubLink: "https://github.com/UZAIR676/mood-music-ai",
  demoLink: "",
  category: "datascience",
  accent: "teal",
},
  {
    title: "Wine Quality Prediction",
    description:
      "ML project predicting wine quality from chemical properties using Random Forest and SVM classifiers.",
    image: vein,
    tags: ["Python", "Random Forest", "SVM", "Jupyter Notebook"],
    githubLink: "https://github.com/UZAIR676/-Wine-Quality-Prediction-ML",
    demoLink: "",
    category: "datascience",
    accent: "teal",
  },
  {
    title: "Heart Disease Prediction",
    description:
      "Machine learning pipeline predicting heart disease from patient health data using feature engineering and multiple ML models.",
    image: heart,
    tags: ["Python", "Scikit-learn", "Jupyter Notebook", "Data Analysis"],
    githubLink: "https://github.com/UZAIR676/Heart-Disease-Prediction-using-Machine-Learning-",
    demoLink: "",
    category: "datascience",
    accent: "teal",
  },
  {
    title: "Car Price Prediction",
    description:
      "ML web app predicting Indian used-car prices with 92% accuracy. Flask REST API backend, React.js frontend with dark/light mode.",
    image: carg,
    tags: ["Python", "React.js", "Flask", "Random Forest", "Scikit-learn"],
    githubLink: "https://github.com/UZAIR676/car_prediction-",
    demoLink: "",
    category: "datascience",
    accent: "teal",
  },
  {
    title: "Rain Prediction",
    description:
      "Rainfall forecasting using machine learning on historical weather data — covers preprocessing, model training, and evaluation.",
    image: rain,
    tags: ["Python", "Random Forest", "Jupyter Notebook"],
    githubLink: "https://github.com/UZAIR676/Rainfall-Prediction-Using-Machine-Learning",
    demoLink: "",
    category: "datascience",
    accent: "teal",
  },
];

const order=['NexaGuard','Mood Music AI','TaskPilot','E-Commerce Platform','ElComparador','Quiz App'];
const sorted=[...projects].sort((a,b)=>(order.indexOf(a.title)<0?99:order.indexOf(a.title))-(order.indexOf(b.title)<0?99:order.indexOf(b.title)));
const summaries:Record<string,string>={NexaGuard:'Financial security meets machine intelligence. AI advisory, fraud scoring and market prediction in one full-stack platform.','Mood Music AI':'A transformer trained from scratch to compose original piano music. Neural networks, musical structure, and a little creativity.'};
export default function Projects(){
 const [filter,setFilter]=useState('all');const [expanded,setExpanded]=useState(false);
 const [selected,setSelected]=useState<(typeof projects)[number]|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(!selected)return;const modal=dialog.current;if(!modal)return;const prior=document.body.style.overflow;modal.showModal();document.body.style.overflow='hidden';return()=>{modal.close();document.body.style.overflow=prior}},[selected]);
 const filtered=sorted.filter(p=>filter==='all'||p.category===filter);const visible=expanded?filtered:filtered.slice(0,5);
 return <section id="projects" className="work-editorial"><div className="container section-wrap"><div className="section-caption"><span>01 / SELECTED WORK</span><span>IDEAS, SHIPPED.</span></div><div className="section-heading"><h2>Less talk.<br/><em>More making.</em></h2><p>A collection of full-stack builds,<br/>machine learning, and experiments.</p></div><div className="work-controls"><div className="work-filters">{[{id:'all',label:'All work'},{id:'mern',label:'Full stack'},{id:'datascience',label:'AI & data'}].map(f=><button key={f.id} aria-pressed={filter===f.id} onClick={()=>{setFilter(f.id);setExpanded(false)}}>{f.label}<span>{f.id==='all'?projects.length:projects.filter(p=>p.category===f.id).length}</span></button>)}</div><span className="mono-label">EXPLORE THE DETAILS ↘</span></div><div className="work-grid">{visible.map((p,i)=><article key={p.title} className={'work-card '+(i===0?'featured-work':'')}><button type="button" className="work-visual" onClick={()=>setSelected(p)} aria-label={'View '+p.title+' project details'}><div className="work-image-stage"><div className="browser-chrome"><i/><i/><i/><span>{p.title.toLowerCase().replaceAll(' ','-')}</span></div><Image src={p.image} alt={p.title+' project screenshot'} sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 800px" className="work-image"/></div><span className="work-number">{String(i+1).padStart(2,'0')}</span><span className="work-open"><ArrowUpRight size={22}/></span></button><div className="work-info"><div><span className="mono-label">{p.category==='mern'?'FULL STACK DEVELOPMENT':'AI / MACHINE LEARNING'}</span><h3><button type="button" onClick={()=>setSelected(p)}>{p.title}</button></h3></div><p>{summaries[p.title]||p.description}</p><div className="work-tags">{p.tags.slice(0,5).map(t=><span key={t}>{t}</span>)}</div><div className="project-actions"><button type="button" onClick={()=>setSelected(p)}>Explore project <ArrowUpRight size={14}/></button><a href={p.githubLink} target="_blank" rel="noreferrer" aria-label={p.title+' source on GitHub'}><Github size={14}/> Source</a></div></div></article>)}</div>{filtered.length>5&&<button className="more-work" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'Show selected projects':`Explore all ${filtered.length} projects`}{expanded?<Minus size={18}/>:<Plus size={18}/>}</button>}</div><dialog ref={dialog} aria-labelledby="project-detail-title" className="project-dialog" onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}} onClose={()=>setSelected(null)}>{selected&&<div className="project-dialog-body"><div className="dialog-top"><span className="mono-label">PROJECT EXPLORER / {selected.category==='mern'?'FULL STACK':'AI & DATA'}</span><button type="button" onClick={()=>setSelected(null)} aria-label="Close project details" autoFocus><X size={20}/></button></div><div className="dialog-image"><Image src={selected.image} alt={selected.title+' interface'} sizes="(max-width: 700px) 95vw, 950px"/></div><div className="dialog-copy"><span className="mono-label">BEHIND THE BUILD</span><h2 id="project-detail-title">{selected.title}</h2><p>{selected.description}</p><div className="work-tags">{selected.tags.map(t=><span key={t}>{t}</span>)}</div><a className="solid-button" href={selected.githubLink} target="_blank" rel="noreferrer"><Github size={16}/> Explore the source <ArrowUpRight size={16}/></a></div></div>}</dialog></section>
}
