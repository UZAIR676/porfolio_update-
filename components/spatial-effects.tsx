"use client"
import { useEffect } from 'react'
export default function SpatialEffects(){useEffect(()=>{
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');const fine=window.matchMedia('(pointer: fine)');let active:HTMLElement|null=null
 const clear=()=>{if(active){active.style.removeProperty('transform');active.style.removeProperty('--shine-x');active.style.removeProperty('--shine-y');active=null}}
 const move=(e:PointerEvent)=>{if(media.matches||!fine.matches)return;const target=(e.target as HTMLElement).closest<HTMLElement>('[data-spatial-card]');if(target!==active)clear();if(!target||target.closest('#contact'))return;active=target;const r=target.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;target.style.transform=`perspective(1000px) rotateX(${-y*7}deg) rotateY(${x*9}deg) translateY(-5px)`;target.style.setProperty('--shine-x',`${(x+.5)*100}%`);target.style.setProperty('--shine-y',`${(y+.5)*100}%`)}
 document.addEventListener('pointermove',move);document.addEventListener('pointerleave',clear);window.addEventListener('blur',clear);return()=>{clear();document.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',clear);window.removeEventListener('blur',clear)}
 },[]);return null}
