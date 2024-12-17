import * as THREE from "three/src/Three.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import {
  LookingGlassWebXRPolyfill,
  LookingGlassConfig,
} from "@lookingglass/webxr";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const config = LookingGlassConfig;
config.targetY = 0;
config.targetZ = 0;
config.targetDiam = 3;
config.fovy = (14 * Math.PI) / 180;
new LookingGlassWebXRPolyfill();

const scene = new THREE.Scene();

// **Initialize Renderer**
const renderer = new THREE.WebGLRenderer({ antialias: true });
document.body.append(renderer.domElement);
renderer.xr.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

// **Camera**
const camera = new THREE.PerspectiveCamera();
camera.position.z = 3;

// **Lights**
scene.add(new THREE.AmbientLight(0xaaaaaa));
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);




// **Canvas Texture for Plane**

const taak = document.createElement("canvas");
taak.width = 512;
taak.height = 256;

const ctx = taak.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, taak.width, taak.height);

ctx.font = "35px helvetica";
ctx.fillStyle = "black";
ctx.fillText("Hologram w/ Three.js", 15, 60);


ctx.fillStyle = "pink";
ctx.fillRect(20, 100, 190, 30);
ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText("HOLOWORKING", 35, 122);

ctx.fillStyle = "blue";
ctx.fillRect(20, 160, 150, 50);
ctx.fillStyle = "white";
ctx.font = "30px Arial";
ctx.fillText("Klik mij", 35, 195);

const texture = new THREE.CanvasTexture(taak);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1),
  new THREE.MeshBasicMaterial({ map: texture })
);
plane.position.set(0, 1, 0);
scene.add(plane);

plane.position.z = -20;
let animationSpeed = 0.3;
let animating = false;


window.addEventListener("keydown", (event) => {
  if (event.key === "h" && !animating) {
    animating = true;
  }
});


// **Rotating Cube**
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.1, 0.1),
  new THREE.MeshStandardMaterial({ color: "red" })
);
scene.add(cube);

window.addEventListener("keydown", (event) => {
  if (event.key === "k") {
    cube.material.color.set("blue");
  }
});

cube.position.set(0, 0, -2);

// **Render animation loop**
renderer.setAnimationLoop(() => {
  texture.needsUpdate = true;

    // **Animatie logica voor de plane in de z-as**
  // **Animatie logica voor de plane in de z-as**
  // **Animatie logica voor de plane in de z-as**
  if (animating) {
    // Beweeg de plane geleidelijk naar het doel in de z-as
    if (plane.position.z < 0) {
      plane.position.z += animationSpeed;
      if (plane.position.z > 0) plane.position.z = 0; // Zorg dat het niet overschrijdt
    }

    // Stop de animatie als we het doel bereiken
    if (plane.position.z === 0) {
      animating = false; // Zet animatie uit als doel bereikt is
    }
  }

  cube.rotation.z += 0.01;
  cube.rotation.y += 0.02;
  // Render the scene
  renderer.render(scene, camera);
});




// To make the canvas work for LG
document.body.append(VRButton.createButton(renderer));

function resize() {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
resize();
window.addEventListener("resize", resize);
