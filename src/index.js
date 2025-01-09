// main.js

import * as THREE from "three/src/Three.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import {
  LookingGlassWebXRPolyfill,
  LookingGlassConfig,
} from "@lookingglass/webxr";
import { cube } from "./script/cube.js";
import { starBackground } from "./script/starBackground.js";
import { task1 } from "./script/task1.js";
import { task2 } from "./script/task2.js";
import { task3 } from "./script/task3.js";



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



// **************************Camera******************************************
const camera = new THREE.PerspectiveCamera();
camera.position.z = 3;

// ***************************Lights****************************************
// Add dim blue ambient light
const blueLight = new THREE.AmbientLight(0xCCD9FF, 0.8); // Dim blue ambient light
scene.add(blueLight);

// Add focused white spotlight
const whiteLight = new THREE.SpotLight(0xffffff, 0.3); // Soft white spotlight
whiteLight.position.set(0, 5, -8);
scene.add(whiteLight);

// Add a backlight shining from behind the object
const backLight = new THREE.SpotLight(0x0051FF, 0.9); // Blue backlight
backLight.position.set(5, -3, -10); // Adjust position to be behind the object
scene.add(backLight);

const backLightTw = new THREE.SpotLight(0x02297D, 0.9); // Blue backlight
backLightTw.position.set(-5, 3, -10); // Adjust position to be behind the object
scene.add(backLightTw);



// ****ALLE OBJECTEN IN HET CANVAS*******************************************************************************************************************************************************

// ****TAAK*************************************
// const textureTaak1 = taak1OpCanvas();

// const taak1 = new THREE.Mesh(
//   new THREE.PlaneGeometry(2, 1),
//   new THREE.MeshBasicMaterial({ map: textureTaak1 })
// );
// taak1.position.set(-1.2, 0.5, -1.2);
// scene.add(taak1);

// taak1.position.z = -20;

// const textureTaak2 = taak1OpCanvas();

// const taak2 = new THREE.Mesh(
//   new THREE.PlaneGeometry(2, 1),
//   new THREE.MeshBasicMaterial({ map: textureTaak2 })
// );
// taak2.position.set(1.2, 0.5, -1.2);
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


const cubeMesh = cube();

scene.add(cubeMesh);

cubeMesh.position.set(0, 0, -3);
cubeMesh.rotation.set(45, 45, 0);



// ****STARS*************************************

starBackground(scene, 100, 5); // Adjust count and areaSize



// ****TASKS*************************************


// const taskOne = task1();
// scene.add(taskOne);

// taskOne.position.set(-1, 0, 0);


// const taskTwo = task2();
// scene.add(taskTwo);

// taskTwo.position.set(0, 0, 0);

// const taskThree = task3();
// scene.add(taskThree);

// taskThree.position.set(1, 0, 0);

// Task 1: Red Light
const taskOne = task1();
scene.add(taskOne);
taskOne.position.set(-1, 0, 0);

const redLight = new THREE.PointLight(0xff0000, 15, 3);
redLight.position.set(-2, 0, 2);
scene.add(redLight);

// Task 2: Green Light
const taskTwo = task2();
scene.add(taskTwo);
taskTwo.position.set(0, 0, 0);

const greenLight = new THREE.PointLight(0x00ff00, 20, 1.2);
greenLight.position.set(0, 0, 1);
scene.add(greenLight);

// Task 3: Blue Light
const taskThree = task3();
scene.add(taskThree);
taskThree.position.set(1, 0, 0);

const blueLighting = new THREE.PointLight(0x0000ff, 15, 3);
blueLighting.position.set(2, 0, 2);
scene.add(blueLighting);




// ****RENDER LOOP*******************************************************************************************************************************************************
let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  // if (animating) {
  //   // Animating taak1
  //   if (taak1.position.z < 0) {
  //     taak1.position.z += animationSpeed;
  //     if (taak1.position.z > -1.5) taak1.position.z = -1.5;
  //   }

  //   if (taak1.position.z === -2.2) {
  //     animating = false;
  //   }

  //   // Animating taak2
  //   if (taak2.position.z < 0) {
  //     taak2.position.z += animationSpeed;
  //     if (taak2.position.z > -1.5) taak2.position.z = -1.5;
  //   }

  //   if (taak2.position.z === -2.2) {
  //     animating = false;
  //   }
  // }

  // Hover effect for cubeMesh
  let time = clock.getElapsedTime(); // Get the elapsed time
  cubeMesh.position.y = Math.sin(time * 2) * 0.1; // Oscillate up and down

  cubeMesh.rotation.z += 0.001;
  cubeMesh.rotation.y += 0.001;

  taskOne.rotation.y += 0.01;

  taskTwo.rotation.y += 0.01;

  taskThree.rotation.y += 0.01;



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
