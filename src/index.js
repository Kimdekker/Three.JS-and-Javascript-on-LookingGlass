// main.js

import * as THREE from "three/src/Three.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import {
  LookingGlassWebXRPolyfill,
  LookingGlassConfig,
} from "@lookingglass/webxr";
import { taak1OpCanvas } from "./script/taak1OpCanvas";

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
// const textureTaak1 = taak1OpCanvas();

// const taak1 = new THREE.Mesh(
//   new THREE.PlaneGeometry(2, 1),
//   new THREE.MeshBasicMaterial({ map: textureTaak1 })
// );
// taak1.position.set(-1.2, 0.5, -1.5);
// scene.add(taak1);

// taak1.position.z = -20;

// const textureTaak2 = taak1OpCanvas();

// const taak2 = new THREE.Mesh(
//   new THREE.PlaneGeometry(2, 1),
//   new THREE.MeshBasicMaterial({ map: textureTaak2 })
// );
// taak2.position.set(1.2, 0.5, -1.5);
// scene.add(taak2);

// taak2.position.z = -20;
// let animationSpeed = 0.3;
// let animating = false;

// window.addEventListener("keydown", (event) => {
//   if (event.key === "h" && !animating) {
//     animating = true;
//   }
// });




// ****CUBE*************************************




// // Load all maps
// const albedoMap = textureLoader.load('./assets/texture/textureMapPanel_albedo.jpeg');
// const normalMap = textureLoader.load('./assets/texture/textureMapPanel_normal.jpeg');
// const roughnessMap = textureLoader.load('./assets/texture/textureMapPanel_roughness.jpeg');
// const heightMap = textureLoader.load('./assets/texture/textureMapPanel_height.jpeg');
// const metallicMap = textureLoader.load('./assets/texture/textureMapPanel_metallic.jpeg');
// const aoMap = textureLoader.load('./assets/texture/textureMapPanel_ambient.jpeg');

// // Create the material
// const material = new THREE.MeshStandardMaterial({
//   // map: albedoMap,              // Base color
//   color: "#F2D492",
//   // normalMap: normalMap,        // Surface details
//   // roughnessMap: roughnessMap,  // Surface roughness
//   // roughness: 0.8,              // Base roughness
//   // displacementMap: heightMap,  // Height variations
//   // displacementScale: 0.1,      // Scale of displacement
//   // metalnessMap: metallicMap,   // Metallic properties
//   // metalness: 0.5,              // Base metallic value
//   // aoMap: aoMap,                // Ambient occlusion
//   // aoMapIntensity: 1.0,         // AO intensity
// });

// Create the geometry and mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


window.addEventListener("keydown", (event) => {
  if (event.key === "k") {
    cube.material.color.set("#F9629F");
  }
});

cube.position.set(0, 0, -5);





// ****RENDER LOOP*******************************************************************************************************************************************************
renderer.setAnimationLoop(() => {
  // if (animating) {
  //   // Animating the taak1
  //   if (taak1.position.z < 0) {
  //     taak1.position.z += animationSpeed;
  //     if (taak1.position.z > -1.5) taak1.position.z = -1.5;
  //   }

  //   if (taak1.position.z === -2.2) {
  //     animating = false;
  //   }


  //   if (taak2.position.z < 0) {
  //     taak2.position.z += animationSpeed;
  //     if (taak2.position.z > -1.5) taak2.position.z = -1.5;
  //   }

  //   if (taak2.position.z === -2.2) {
  //     animating = false;
  //   }
  // }

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
