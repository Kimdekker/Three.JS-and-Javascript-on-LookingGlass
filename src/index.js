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


// ****CUBE*************************************


const cubeMesh = cube();

scene.add(cubeMesh);

cubeMesh.position.set(0, 0, -1);
cubeMesh.rotation.set(Math.PI / 4, Math.PI / -4, 0);

// Default target position and rotation for animation of the cube going backwards
let targetPosition = new THREE.Vector3(0, 0, -1); 
let targetRotation = new THREE.Euler(Math.PI / 4, Math.PI / -4, 0);
let currentRotation = new THREE.Euler();

let animatingRotation = false;
let animateRotatingCube = true;


// ****STARS*************************************

starBackground(scene, 100, 5); // Adjust count and areaSize



// ****TASKS*************************************


const taskTest = task1();
scene.add(taskTest);
taskTest.position.set(-1, 0, 0);

const testLight = new THREE.PointLight(0xff0000, 15, 3);
testLight.position.set(-2, 0, 2);
scene.add(testLight);

// Task 1 with Red Light
// const taskOne = task1();
// scene.add(taskOne);
// taskOne.position.set(-1, 0, 10);

// const redLight = new THREE.PointLight(0xff0000, 15, 3);
// redLight.position.set(-2, 0, 6);
// redLight.intensity = 0;
// scene.add(redLight);

// let redLightIn = false

// taskOne.position.z = -20;

// // Task 2 with Green Light
// const taskTwo = task2();
// scene.add(taskTwo);
// taskTwo.position.set(0, 0, 10);

// const greenLight = new THREE.PointLight(0x00ff00, 20, 1.2);
// greenLight.position.set(0, 0, 5);
// greenLight.intensity = 0;
// scene.add(greenLight);

// let greenLightIn = false

// taskTwo.position.z = -20;


// // Task 3 with Blue Light
// const taskThree = task3();
// scene.add(taskThree);
// taskThree.position.set(1, 0, 10);

// const blueLighting = new THREE.PointLight(0x0000ff, 15, 3);
// blueLighting.position.set(2, 0, 6);
// blueLighting.intensity = 0;
// scene.add(blueLighting);

// let blueLightIn = false

// taskThree.position.z = -20;

// Animeren van achter naar voor als klik op h

let animationSpeed = 0.5;
let animatingTasks = false;

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && !animatingTasks) {
    animatingTasks = true;
    animatingRotation = true

    currentRotation.copy(cubeMesh.rotation);

    targetPosition.set(0, 0, -6);
    targetRotation.set(Math.PI / 2, Math.PI / 2, 0);

    // redLightIn = true;
    // greenLightIn = true;
    // blueLightIn = true;

  }
});


// ****RENDER LOOP*******************************************************************************************************************************************************
let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  // if (animatingTasks) {
  //   const arcHeight = -2; // adjust height of the arc
  
  //   // Animating taskOne
  //   if (taskOne.position.z < 4) { // Change condition to check against 4
  //     taskOne.position.z += animationSpeed;
  
  //     // Calculate the y position for the arc
  //     const t = (taskOne.position.z - 4) / -20; // Normalize z to a 0-1 range
  //     taskOne.position.y = -4 * arcHeight * t * (1 - t); // Quadratic curve formula
  //   }
  
  //   // Animating taskTwo
  //   if (taskTwo.position.z < 4) {
  //     taskTwo.position.z += animationSpeed;
  
  //     const t = (taskTwo.position.z - 4) / -20;
  //     taskTwo.position.y = -4 * arcHeight * t * (1 - t);
  //   }
  
  //   // Animating taskThree
  //   if (taskThree.position.z < 4) {
  //     taskThree.position.z += animationSpeed;
  
  //     const t = (taskThree.position.z - 4) / -20;
  //     taskThree.position.y = -4 * arcHeight * t * (1 - t);
  //   }
  // }
  
  


  // cube mesh animation backwards

  cubeMesh.position.lerp(targetPosition, 0.1); // Adjust the speed for position

    // Animate rotation to targetRotation
    if (animatingRotation) {
      const targetQuat = new THREE.Quaternion().setFromEuler(targetRotation);
  
      // Slerp between the current and target quaternions
      cubeMesh.quaternion.slerp(targetQuat, 0.1); // Adjust speed
  
      // Check if rotation is close to target to stop animating
      if (cubeMesh.quaternion.angleTo(targetQuat) < 0.01) {
        animatingRotation = false;
        animateRotatingCube = false;
      }
    }

  if (animateRotatingCube) {
    cubeMesh.rotation.x += 0.005;
    cubeMesh.rotation.y += 0.005;
  }

  // if (redLightIn) {
  //   redLight.intensity = 15;
  // }

  // if (greenLightIn) {
  //   greenLight.intensity = 15;
  // }

  // if (blueLightIn) {
  //   blueLighting.intensity = 15;
  // }



  // Hover effect for cubeMesh
  let time = clock.getElapsedTime(); // Get the elapsed time
  cubeMesh.position.y = Math.sin(time * 2) * 0.1; // Oscillate up and down

  // taskOne.rotation.y += 0.01;

  // taskTwo.rotation.y += 0.01;

  // taskThree.rotation.y += 0.01;



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
