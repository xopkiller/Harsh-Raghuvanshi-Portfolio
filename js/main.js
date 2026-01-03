// Cursor
const cursor = document.getElementById("cursor");
window.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Magnetic Buttons
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform =
      `translate(${(e.clientX-r.left-r.width/2)*.15}px,
                 ${(e.clientY-r.top-r.height/2)*.15}px)`;
  });
  btn.addEventListener("mouseleave",()=>btn.style.transform="translate(0)");
});

// GSAP Scroll
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray("section").forEach(sec=>{
  gsap.from(sec.children,{
    opacity:0,y:80,stagger:.15,duration:1.2,
    scrollTrigger:{trigger:sec,start:"top 80%"}
  });
});

// THREE.JS BACKGROUND
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,.1,1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById("bg"),
  alpha:true,antialias:true
});
renderer.setSize(innerWidth,innerHeight);

const geo = new THREE.IcosahedronGeometry(2.3,1);
const mat = new THREE.MeshStandardMaterial({
  color:0x4fffbd, wireframe:true
});
const mesh = new THREE.Mesh(geo,mat);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff,1);
light.position.set(5,5,5);
scene.add(light);

function animate(){
  requestAnimationFrame(animate);
  mesh.rotation.x+=.002;
  mesh.rotation.y+=.003;
  renderer.render(scene,camera);
}
animate();
