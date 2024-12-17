// main.js

import * as THREE from "three/src/Three.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import {
  LookingGlassWebXRPolyfill,
  LookingGlassConfig,
} from "@lookingglass/webxr";
import { taakOpCanvas } from "./script/taakOpCanvas";

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


// ****ALLE OBJECTEN IN HET CANVAS*******************************************************************************************************************************************************

// ****TAAK*************************************
const texture = taakOpCanvas();

const taak1 = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1),
  new THREE.MeshBasicMaterial({ map: texture })
);
taak1.position.set(0, 0.5, 0);
scene.add(taak1);

taak1.position.z = -20;
let animationSpeed = 0.3;
let animating = false;

window.addEventListener("keydown", (event) => {
  if (event.key === "h" && !animating) {
    animating = true;
  }
});

// ****CUBE*************************************
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.1, 0.1),
  new THREE.MeshStandardMaterial({ color: "#F2D492" })
);
scene.add(cube);

window.addEventListener("keydown", (event) => {
  if (event.key === "k") {
    cube.material.color.set("#F29559");
  }
});

cube.position.set(0, 0, -2);





// ****RENDER LOOP*******************************************************************************************************************************************************
renderer.setAnimationLoop(() => {
  texture.needsUpdate = true;

  if (animating) {
    // Animating the taak1
    if (taak1.position.z < 0) {
      taak1.position.z += animationSpeed;
      if (taak1.position.z > 0) taak1.position.z = 0;
    }

    if (taak1.position.z === 0) {
      animating = false;
    }
  }

  cube.rotation.z += 0.01;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);
});







// ****LOOKING GLASS BUTTON EN RESIZE SHIZZLE*******************************************************************************************************************************************************
document.body.append(VRButton.createButton(renderer));

function resize() {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
resize();
window.addEventListener("resize", resize);
