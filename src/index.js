// main.js

import * as THREE from "three/src/Three.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import {
  LookingGlassWebXRPolyfill,
  LookingGlassConfig,
} from "@lookingglass/webxr";
import { taak1OpCanvas } from "./script/taak1OpCanvas";
import { cube } from "./script/cube.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";



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
// Add dim purple ambient light
const purpleLight = new THREE.AmbientLight(0xE6E6FA, 0.8); // Dim purple ambient light
scene.add(purpleLight);

// Add focused white spotlight
const whiteLight = new THREE.SpotLight(0xffffff, 0.6); // Soft white spotlight
whiteLight.position.set(3, 5, -8);
whiteLight.castShadow = true; // Cast shadows for a dramatic effect
scene.add(whiteLight);

// Add a backlight shining from behind the object
const backLight = new THREE.SpotLight(0xA020F0, 0.9); // Purple backlight
backLight.position.set(5, -5, -3); // Adjust position to be behind the object
backLight.target.position.set(0, 0, 0); // Make it shine on the object (e.g., at the origin)
backLight.castShadow = true;
scene.add(backLight);




// ****ALLE OBJECTEN IN HET CANVAS*******************************************************************************************************************************************************

// ****TAAK*************************************
const textureTaak1 = taak1OpCanvas();

const taak1 = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1),
  new THREE.MeshBasicMaterial({ map: textureTaak1 })
);
taak1.position.set(-1.2, 0.5, -1.2);
scene.add(taak1);

taak1.position.z = -20;

const textureTaak2 = taak1OpCanvas();

const taak2 = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1),
  new THREE.MeshBasicMaterial({ map: textureTaak2 })
);
taak2.position.set(1.2, 0.5, -1.2);
scene.add(taak2);

taak2.position.z = -20;
let animationSpeed = 0.3;
let animating = false;

window.addEventListener("keydown", (event) => {
  if (event.key === "h" && !animating) {
    animating = true;
  }
});




// ****CUBE*************************************


const cubeMesh = cube();

scene.add(cubeMesh);

cubeMesh.position.set(0, 0, -3);




// ****RENDER LOOP*******************************************************************************************************************************************************
let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  if (animating) {
    // Animating taak1
    if (taak1.position.z < 0) {
      taak1.position.z += animationSpeed;
      if (taak1.position.z > -1.5) taak1.position.z = -1.5;
    }

    if (taak1.position.z === -2.2) {
      animating = false;
    }

    // Animating taak2
    if (taak2.position.z < 0) {
      taak2.position.z += animationSpeed;
      if (taak2.position.z > -1.5) taak2.position.z = -1.5;
    }

    if (taak2.position.z === -2.2) {
      animating = false;
    }
  }

  // Hover effect for cubeMesh
  let time = clock.getElapsedTime(); // Get the elapsed time
  cubeMesh.position.y = Math.sin(time * 2) * 0.1; // Oscillate up and down

  cubeMesh.rotation.z += 0.001;
  cubeMesh.rotation.y += 0.002;

  // Render the scene
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
