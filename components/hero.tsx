"use client"
import dynamic from 'next/dynamic'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
const SpatialScene=dynamic(()=>import('./spatial-scene'),{ssr:false,loading:()=> <div className="spatial-canvas"><div className="fallback-orb"/></div>})
export default function Hero(){return <section id="home" className="editorial-hero">
 <div className="hero-noise" aria-hidden="true"/>
 <div className="container editorial-hero-inner">
  <div className="hero-kicker"><span><i/> INDEPENDENT MIND. BUILDER AT HEART.</span><span>BASED IN NEW YORK, USA ↗</span></div>
  <div className="hero-name" aria-label="Uzair Rana"><span>UZAIR</span><span className="outline-name">RANA<span className="name-dot">.</span></span></div>
  <div className="hero-stage">
   <div className="hero-statement"><span className="mono-label">FULL STACK DEVELOPER & AI / ML ENGINEER</span><h1>Built with logic.<br/><em>Made to feel.</em></h1><p>Web experiences with personality.<br/>Intelligent products with purpose.<br/>I turn the “what if” into something real.</p><a className="solid-button" href="#projects">Discover my work <ArrowUpRight size={18}/></a></div>
   <div className="sculpture"><div className="sculpture-halo"/><SpatialScene/><span className="sculpture-coordinate">FIG. 01 — IDEAS IN MOTION</span><span className="sculpture-drag">↔ DRAG TO ROTATE</span></div>
   <div className="hero-side-note"><span>DESIGN</span><i/><span>ENGINEERING</span><i/><span>INTELLIGENCE</span></div>
  </div>
  <div className="editorial-bottom"><a href="#projects"><ArrowDown size={17}/> SCROLL TO EXPLORE</a><span>REACT / NEXT.JS / PYTHON / PYTORCH</span><a href="/uzair.pdf" target="_blank" rel="noreferrer">RESUME <ArrowUpRight size={14}/></a></div>
 </div>
 </section>}
