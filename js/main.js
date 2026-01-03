// Custom cursor
const cursor = document.getElementById("cursor");
window.addEventListener("mousemove", e => { cursor.style.left=e.clientX+'px'; cursor.style.top=e.clientY+'px'; });

// AI Bot toggle
const bot=document.getElementById("ai-bot");
const chat=document.getElementById("ai-chat");
bot.addEventListener("click",()=>{ chat.style.display = chat.style.display==='block' ? 'none':'block'; });

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray("section").forEach(sec => {
  gsap.from(sec.children, { opacity:0, y:80, stagger:0.15, duration:1.2, ease:"power3.out",
    scrollTrigger:{ trigger:sec, start:"top 80%" }
  });
});

// THREE.JS 3D Background
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,.1,1000);
camera.position.z=6;
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById("bg"),alpha:true,antialias:true});
renderer.setSize(innerWidth,innerHeight);

// Hero mesh
const geo=new THREE.IcosahedronGeometry(2.2,1);
const mat=new THREE.MeshStandardMaterial({ color:0x4fffbd, wireframe:true });
const mesh=new THREE.Mesh(geo,mat);
scene.add(mesh);

// Particles
const particlesGeo=new THREE.BufferGeometry();
const particlesCount=150;
const positions=new Float32Array(particlesCount*3);
for(let i=0;i<particlesCount*3;i++){ positions[i]=(Math.random()-0.5)*30; }
particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
const particlesMat=new THREE.PointsMaterial({color:0xffffff,size:0.07,transparent:true,opacity:0.4});
const particles=new THREE.Points(particlesGeo,particlesMat);
scene.add(particles);

// Floating social icons
const loader=new THREE.TextureLoader();
const icons=[];
const iconURLs=['assets/icons/facebook.png','assets/icons/instagram.png','assets/icons/linkedin.png','assets/icons/twitter.png','assets/icons/youtube.png'];
iconURLs.forEach(url=>{
  const tex=loader.load(url);
  const mat=new THREE.SpriteMaterial({map:tex,transparent:true});
  const sprite=new THREE.Sprite(mat);
  sprite.position.set((Math.random()-0.5)*12,(Math.random()-0.5)*6,(Math.random()-0.5)*8);
  const scale=0.7+Math.random()*0.8;
  sprite.scale.set(scale,scale,scale);
  scene.add(sprite);
  icons.push(sprite);
});

// Animate 3D
function animateIcons(){ icons.forEach(i=>{i.position.x+=Math.sin(Date.now()*0.001+i.position.y)*0.002; i.position.y+=Math.cos(Date.now()*0.001+i.position.x)*0.002; i.rotation.z+=0.0015; }); }
function animateParticles(){ particles.rotation.y+=0.0005; }

function animate(){
  requestAnimationFrame(animate);
  mesh.rotation.x+=0.002;
  mesh.rotation.y+=0.003;
  animateIcons();
  animateParticles();
  renderer.render(scene,camera);
}
animate();

// Cursor parallax effect
window.addEventListener("mousemove", e => {
  const x=(e.clientX/innerWidth-0.5)*2;
  const y=(e.clientY/innerHeight-0.5)*2;
  mesh.rotation.x=x*0.1; mesh.rotation.y=y*0.1;
});
