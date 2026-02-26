gsap.registerPlugin(ScrollTrigger);

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-container").appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(5,10,7);
scene.add(light);

// Tree Trunk
const trunkGeo = new THREE.CylinderGeometry(0.5,0.7,3,16);
const trunkMat = new THREE.MeshStandardMaterial({color:0x8B5A2B});
const trunk = new THREE.Mesh(trunkGeo, trunkMat);
trunk.position.y = -2;
scene.add(trunk);

// Foliage
const leaves = [];
for(let i=0;i<6;i++){
  const leafGeo = new THREE.SphereGeometry(1.5,32,32);
  const leafMat = new THREE.MeshStandardMaterial({color:0x3e6b2f});
  const leaf = new THREE.Mesh(leafGeo, leafMat);
  leaf.position.set(Math.random()*2-1, i*0.7, Math.random()*1-0.5);
  scene.add(leaf);
  leaves.push(leaf);
}

// Lemons
const lemons = [];
for(let i=0;i<5;i++){
  const lemonGeo = new THREE.SphereGeometry(0.4,32,32);
  const lemonMat = new THREE.MeshStandardMaterial({color:0xf4c430, roughness:0.4});
  const lemon = new THREE.Mesh(lemonGeo, lemonMat);
  lemon.position.set(Math.random()*2-1, 2+i*0.3, Math.random()*0.5-0.25);
  scene.add(lemon);
  lemons.push(lemon);
}

// Tree sway
gsap.to(leaves.map(l=>l.rotation), { z:0.1, duration:3, repeat:-1, yoyo:true, ease:"sine.inOut" });

// Drop lemons randomly with bounce
function dropLemon(lemon){
  gsap.to(lemon.position, {
    y:-2.8,
    duration:1.5 + Math.random(),
    ease:"bounce.out",
    onComplete:()=>scatterSeeds(lemon.position)
  });
}

setTimeout(()=>{
  lemons.forEach((lemon,i)=>{
    setTimeout(()=>dropLemon(lemon), i*700);
  });
},1500);

// Seed scatter
function scatterSeeds(position){
  for(let i=0;i<10;i++){
    const seedGeo = new THREE.SphereGeometry(0.06,8,8);
    const seedMat = new THREE.MeshStandardMaterial({color:0xffffff});
    const seed = new THREE.Mesh(seedGeo, seedMat);
    seed.position.copy(position);
    scene.add(seed);

    gsap.to(seed.position,{
      x:(Math.random()-0.5)*3,
      y:-4 - Math.random()*1.5,
      z:(Math.random()-0.5)*2,
      duration:2 + Math.random(),
      ease:"power2.out"
    });
  }
  revealTextSequence();
  revealForm();
}

// Text Reveal
function revealTextSequence(){
  gsap.to(".headline-main",{opacity:1,y:0,duration:1.2,ease:"power3.out"});
  gsap.to(".headline-sub",{opacity:1,y:0,duration:1.2,delay:1,ease:"power3.out"});
  gsap.to(".headline-question",{opacity:1,y:0,duration:1.2,delay:2,ease:"power3.out"});
}

// Form Reveal
function revealForm(){document.querySelector(".form-section").style.bottom="0";}

// Play birds audio
const birds = document.getElementById("birds");
window.addEventListener("click",()=>{birds.play();},{once:true});

// Animate
function animate(){requestAnimationFrame(animate); renderer.render(scene,camera);}
animate();

// Resize
window.addEventListener("resize",()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Form submission
document.getElementById("lemonForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  alert("Your lemon has been planted. When it becomes something, we will let you know.");
  e.target.reset();
});
