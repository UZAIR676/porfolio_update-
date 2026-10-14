"use client"
import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export default function SpatialScene() {
 const host = useRef<HTMLDivElement>(null)
 const [failed, setFailed] = useState(false)
 const [paused,setPaused]=useState(false)
 const pauseRef=useRef(false),resetRef=useRef(false)
 const togglePause=()=>{pauseRef.current=!pauseRef.current;setPaused(pauseRef.current)}
 useEffect(() => {
  const el=host.current; if(!el) return
  let renderer: THREE.WebGLRenderer
  try { renderer=new THREE.WebGLRenderer({antialias:true,alpha:true}) } catch {setFailed(true);return}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75)); renderer.setClearColor(0,0)
  renderer.outputColorSpace=THREE.SRGBColorSpace; el.appendChild(renderer.domElement)
  const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(38,1,.1,100)
  camera.position.set(0,0,7.5)
  const room=new RoomEnvironment(); const pmrem=new THREE.PMREMGenerator(renderer); const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
  const group=new THREE.Group(); scene.add(group)
  const metal=new THREE.MeshPhysicalMaterial({color:0x719aff,metalness:.95,roughness:.16,clearcoat:1})
  const core=new THREE.Mesh(new THREE.TorusKnotGeometry(1.12,.38,180,32,2,3),metal); group.add(core)
  const edge=new THREE.Mesh(new THREE.IcosahedronGeometry(1.9,1),new THREE.MeshBasicMaterial({color:0x8eaaff,wireframe:true,transparent:true,opacity:.12})); group.add(edge)
  const satellites:THREE.Mesh[]=[]
  for(let i=0;i<5;i++) {
   const cube=new THREE.Mesh(new THREE.BoxGeometry(.22,.22,.22),new THREE.MeshStandardMaterial({color:i%2?0xc2d5ff:0x537aff,metalness:.65,roughness:.2}))
   const t=i*Math.PI*2/5;cube.position.set(Math.cos(t)*2.2,Math.sin(t)*1.8,Math.sin(t*2));group.add(cube);satellites.push(cube)
  }
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.35,.009,8,140),new THREE.MeshBasicMaterial({color:0x5277de,transparent:true,opacity:.6}));ring.rotation.x=1.15;ring.rotation.y=.3;group.add(ring)
  scene.add(new THREE.AmbientLight(0xbad0ff,2))
  const light=new THREE.PointLight(0x8db9ff,90);light.position.set(-3,3,4);scene.add(light)
  const rim=new THREE.PointLight(0x704cff,60);rim.position.set(3,-2,2);scene.add(rim)
  const top=new THREE.PointLight(0xffffff,60);top.position.set(2,4,-1);scene.add(top)
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');pauseRef.current=reduce.matches;setPaused(reduce.matches);let pointer={x:0,y:0},frame=0,visible=true,drag=false,spin=0,velocity=0,lastX=0,lastTime=0,elapsed=0
  const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();pointer={x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5};if(drag){velocity=(e.clientX-lastX)*.007;spin+=velocity;lastX=e.clientX}}
  const down=(e:PointerEvent)=>{drag=true;lastX=e.clientX;velocity=0;el.setPointerCapture(e.pointerId)}; const up=()=>{drag=false};const leave=()=>{pointer={x:0,y:0}}
  el.addEventListener('pointermove',move);el.addEventListener('pointerdown',down);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.addEventListener('pointerleave',leave)
  const resize=new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()});resize.observe(el)
  const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});intersection.observe(el)
  const draw=(time:number)=>{frame=requestAnimationFrame(draw);const delta=Math.min((time-lastTime)/1000,.05);lastTime=time;if(!visible||document.hidden)return;if(resetRef.current){spin=0;velocity=0;elapsed=0;pointer={x:0,y:0};resetRef.current=false}if(!pauseRef.current)elapsed+=delta;const t=elapsed*.25;if(!drag&&!pauseRef.current){spin+=velocity;velocity*=Math.pow(.93,delta*60)}core.rotation.set(t*.45+pointer.y*.3,t+spin,.3);group.rotation.y+=(pointer.x*.35-group.rotation.y)*.04;group.position.y=pauseRef.current?0:Math.sin(t*2)*.12;edge.rotation.y=-t*.25;satellites.forEach((s,i)=>s.rotation.set(t+i,t*1.3,i));renderer.render(scene,camera)};frame=requestAnimationFrame(draw)

  return()=>{cancelAnimationFrame(frame);resize.disconnect();intersection.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerdown',down);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);el.removeEventListener('pointerleave',leave);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const m=Array.isArray(o.material)?o.material:[o.material];m.forEach(x=>x.dispose())}});env.dispose();renderer.dispose();renderer.domElement.remove()}
 },[])
 return <><div ref={host} className="spatial-canvas" role="img" aria-label="Interactive blue metallic knot with orbiting geometric shapes">{failed&&<div className="fallback-orb"/>}</div>{!failed&&<div className="scene-controls"><button type="button" aria-label={paused?'Play animation':'Pause animation'} aria-pressed={paused} onClick={togglePause}>{paused?<Play size={13}/>:<Pause size={13}/>}</button><button type="button" aria-label="Reset sculpture rotation" onClick={()=>{resetRef.current=true}}><RotateCcw size={13}/></button></div>}</>
}
