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
import { taskInDepth } from "./script/taskInDepth.js";
import { playingButton } from "./script/playingButton.js";



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

let cubeColor = 0x0051FF;
let cubeSize = 2;


const cubeMesh = cube(cubeSize, cubeColor);
cubeMesh.position.set(0, 0, -1);
cubeMesh.rotation.set(Math.PI / 4, Math.PI / -4, 0);
scene.add(cubeMesh);

const secondCube = cube(cubeSize);
secondCube.position.set(0, -1, -1);
secondCube.rotation.set(Math.PI / 4, Math.PI / -4, 0);
scene.add(secondCube);


// Default target position and rotation for animation of the cube going backwards
let targetPosition = new THREE.Vector3(0, 0, -1); 
let targetPositionSecond = new THREE.Vector3(0, 0, -1); 

let targetRotation = new THREE.Euler(Math.PI / 4, Math.PI / -4, 0);
let targetRotationSecond = new THREE.Euler(Math.PI / 4, Math.PI / -4, 0);

let currentRotation = new THREE.Euler();


let animatingRotation = false;
let animateRotatingCube = true;

const updateCubeColor = (newColor) => {
  cubeColor = newColor;
  cubeMesh.material.emissive.set(new THREE.Color(cubeColor));
};





// ****STARS*************************************

starBackground(scene, 100, 6); // Adjust count and areaSize



// ****TASKS*************************************


// Task 1 with Red Light
const taskOne = task1();
scene.add(taskOne);
taskOne.position.set(-1.5, 0, 10);
taskOne.scale.set(0, 0, 0);

const redLight = new THREE.PointLight(0xff0000, 15, 3);
redLight.position.set(-2.5, 0, 6);
scene.add(redLight);


taskOne.position.z = -20;

// Task 2 with Green Light
const taskTwo = task2();
scene.add(taskTwo);
taskTwo.position.set(0, 0, 10);
taskTwo.scale.set(0, 0, 0);

const greenLight = new THREE.PointLight(0x00ff00, 20, 1.2);
greenLight.position.set(0, 0, 5);
scene.add(greenLight);

taskTwo.position.z = -20;


// Task 3 with Blue Light
const taskThree = task3();
scene.add(taskThree);
taskThree.position.set(1.5, 0, 10);
taskThree.scale.set(0, 0, 0);

const blueLighting = new THREE.PointLight(0x0000ff, 15, 3);
blueLighting.position.set(1.5, 0, 6);
scene.add(blueLighting);


taskThree.position.z = -20;


let animationSpeed = 3; // snelheid van de tasks die in en uitvliegen. Hoe hoger hoe sneller.
let animatingTasks = false;


// ****Task in depth data*************************************

const canvasInDepth = taskInDepth();
canvasInDepth.position.set(0, -5, 0);
scene.add(canvasInDepth);
canvasInDepth.scale.set(0, 0, 0);

canvasInDepth.position.z = -20;

const buttonPlaying = playingButton();
buttonPlaying.position.set(0, 0, 0);
scene.add(buttonPlaying);
buttonPlaying.scale.set(0, 0, 0);

buttonPlaying.position.z = -10;

let animatingTaskInDepth = false;




// ****ranking************************************************

let orangeLighting;
let redLighting;
let yellowLighting;

function updateLighting(state) {
  if (orangeLighting) {
    scene.remove(orangeLighting, redLighting, yellowLighting);
  }

  if (state === "ranking") {
    orangeLighting = new THREE.PointLight(0xFF4D00, 2, 3);
    orangeLighting.position.set(0.5, 0.5, -2);
    scene.add(orangeLighting);

    // redLighting = new THREE.PointLight(0xFF4D00, 2, 3);
    // redLighting.position.set(-0.75, -0.6, 1);
    // scene.add(redLighting);

    // yellowLighting = new THREE.PointLight(0xFF4D00, 2, 3);
    // yellowLighting.position.set(1.9, 1.2, -4);
    // scene.add(yellowLighting);


  } else if (state === "home" || state === "tasks" || state === "taskInDepth") {
    orangeLighting = new THREE.PointLight(0x000000, 0, 0);
    orangeLighting.position.set(0.5, 0.5, -2);
    scene.add(orangeLighting);
  }
}


const lessCube = cube(0.5, 0xFF0000, 0.03);
lessCube.position.set(-1.2, -1, 0);
lessCube.rotation.set(Math.PI / 4, Math.PI / -4, 0);
scene.add(lessCube);

const moreCube = cube(1.2, 0xFFFF00);
moreCube.position.set(1.8, 1, -5);
moreCube.rotation.set(Math.PI / 2, Math.PI / 4, 0);
scene.add(moreCube);

lessCube.updateSize(0);
moreCube.updateSize(0);

let animatingRanking = false;




// ****INPUTS*************************************************************************************************

let state = "home";

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    switch (state) {
      case "home":
        state = "tasks";
        taskOne.scale.set(1, 1, 1);
        taskTwo.scale.set(1, 1, 1);
        taskThree.scale.set(1, 1, 1);
        animatingTasks = true;
        animatingRotation = true;
        animatingTaskInDepth = false;

        targetPosition.set(0, 0, -6);
        targetPositionSecond.set(0, 0, -6);

        currentRotation.copy(cubeMesh.rotation);
        targetRotation.set(Math.PI / 2, Math.PI / 2, 0);
        targetRotationSecond.set(Math.PI / 2, Math.PI / 2, 0);



        break;

      case "tasks":
        state = "taskInDepth";
        animatingTasks = false;
        animatingRotation = true;
        animatingTaskInDepth = true;

        targetPosition.set(.1, -1.5, -10);
        targetPositionSecond.set(0, 0, -3);

        targetRotation.set(Math.PI / 4, Math.PI / 4, Math.PI / 2);
        targetRotationSecond.set(Math.PI / 4, Math.PI / 4, Math.PI / 2);

        updateCubeColor(0x808080);
        cubeMesh.updateSize(1);
        secondCube.updateSize(1.5);

        buttonPlaying.scale.set(1, 0.5, 1);
        canvasInDepth.scale.set(1, 1, 1);

        canvasInDepth.position.set(0, 0.5, 4);

        setTimeout(() => {
          targetRotationSecond.set(Math.PI / 2, Math.PI / 2, Math.PI / 2);
          buttonPlaying.position.z = 4;
        }, 8000);

        setTimeout(() => {
          taskOne.scale.set(0, 0, 0);
          taskTwo.scale.set(0, 0, 0);
          taskThree.scale.set(0, 0, 0);
        }, 400);




        break;

      default:
        break;
    }
  } else if (event.key === "ArrowLeft") {
    switch (state) {
      case "tasks":
        state = "home";
        animatingTasks = false;
        animatingRotation = false;
        animatingTaskInDepth = false;

        targetPosition.set(0, 0, -1);

        targetRotation.set(Math.PI / 4, Math.PI / -4, 0);
        targetRotationSecond.set(Math.PI / 4, Math.PI / -4, 0);

        setTimeout(() => {
          taskOne.scale.set(0, 0, 0);
          taskTwo.scale.set(0, 0, 0);
          taskThree.scale.set(0, 0, 0);
        }, 400);

        break;

      case "taskInDepth":
        state = "tasks";
        taskOne.scale.set(1, 1, 1);
        taskTwo.scale.set(1, 1, 1);
        taskThree.scale.set(1, 1, 1);
        animatingTasks = true;
        animatingRotation = true;
        animateRotatingCube = true;
        animatingTaskInDepth = false;

        targetPosition.set(0, 0, -6);
        targetPositionSecond.set(0, 0, -6);

        currentRotation.copy(cubeMesh.rotation);
        targetRotation.set(Math.PI / 2, Math.PI / 2, 0);
        targetRotationSecond.set(Math.PI / 2, Math.PI / 2, 0);

        updateCubeColor(0x0051FF);
        cubeMesh.updateSize(2);
        secondCube.updateSize(1.5);

        buttonPlaying.position.z = -10;

        setTimeout(() => {
          buttonPlaying.scale.set(0, 0, 0);
          canvasInDepth.scale.set(0, 0, 0);
        }, 400);



        break;

        case "ranking":
          state = "home";
          animatingRotation = false;
          animatingRanking = false;
  
          targetPosition.set(0, 0, -1);
          targetPositionSecond.set(0, 0, -4);
  
          targetRotation.set(Math.PI / 2, Math.PI / 2, 0);
          targetRotationSecond.set(Math.PI / 2, Math.PI / 2, 0);
  
          updateCubeColor(0x0051FF);

          updateLighting("home");

          setTimeout(() => {
            lessCube.updateSize(0);
            moreCube.updateSize(0);
          }, 400);

  
          break;

      default:
        break;
    }
  } else if (event.key === "ArrowUp") {
    switch (state) {
      case "home":
        state = "ranking";
        animatingRotation = true;

        targetPosition.set(0, 0, -4);
        targetPositionSecond.set(0, 0, -4);

        targetRotation.set(Math.PI / 2, Math.PI / 2, 0);
        targetRotationSecond.set(Math.PI / 2, Math.PI / 2, 0);

        updateCubeColor(0xFF4D00);
        secondCube.updateSize(1.5);

        updateLighting("ranking");

        lessCube.updateSize(0.5);
        moreCube.updateSize(1.2);

        animatingRanking = true;

        break;

      default:
        break;
    }
  } else if (event.key === "ArrowDown") {
    switch (state) { 
      case "tasks":
        state = "home";
        animatingTasks = false;
        animatingRotation = false;
        animatingTaskInDepth = false;

        targetPosition.set(0, 0, -1);
        targetPositionSecond.set(0, 0, -6);

        targetRotation.set(Math.PI / 4, Math.PI / -4, 0);
        targetRotationSecond.set(Math.PI / 4, Math.PI / -4, 0);

        setTimeout(() => {
          taskOne.scale.set(0, 0, 0);
          taskTwo.scale.set(0, 0, 0);
          taskThree.scale.set(0, 0, 0);
        }, 400);

        break;
      
      case "taskInDepth":
        state = "home";
        animatingTasks = false;
        animatingRotation = false;
        animateRotatingCube = true;
        animatingTaskInDepth = false;

        targetPosition.set(0, 0, -1);
        targetPositionSecond.set(0, 0, -6);

        currentRotation.copy(cubeMesh.rotation);
        targetRotation.set(Math.PI / 2, Math.PI / 2, 0);
        targetRotationSecond.set(Math.PI / 2, Math.PI / 2, 0);

        updateCubeColor(0x0051FF);
        cubeMesh.updateSize(2);
        secondCube.updateSize(1.5);

        buttonPlaying.position.z = -10;

        setTimeout(() => {
          buttonPlaying.scale.set(0, 0, 0);
          canvasInDepth.scale.set(0, 0, 0);
        }, 400);


        case "ranking":
          state = "home";
          animatingRotation = false;
          animatingRanking = false;
  
          targetPosition.set(0, 0, -1);
          targetPositionSecond.set(0, 0, -4);
  
          targetRotation.set(Math.PI / 2, Math.PI / 2, 0);
          targetRotationSecond.set(Math.PI / 2, Math.PI / 2, 0);
  
          updateCubeColor(0x0051FF);

          updateLighting("home");

          setTimeout(() => {
            lessCube.updateSize(0);
            moreCube.updateSize(0);
          }, 400);

  
          break;


        break;

      default:
        break;
    }
  }
});


// ****RENDER LOOP*******************************************************************************************************************************************************
let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  // Easier-to-compute easing function
  const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);

  let reversingTasks = false;

  if (animatingTasks) {
    reversingTasks = false; // Reset reversingTasks
  
    const arcHeight = -2; // Adjust height of the arc
  
    // Animating taskOne
    if (taskOne.position.z < 4) {
      taskOne.position.z += animationSpeed;
      
      const t = easeInOutQuad((taskOne.position.z - 4) / -20);
      taskOne.position.y = -4 * arcHeight * t * (1 - t);
    }
  
    // Animating taskTwo
    setTimeout(() => {
      if (taskTwo.position.z < 4) {
        taskTwo.position.z += animationSpeed;
    
        const t = easeInOutQuad((taskTwo.position.z - 4) / -20);
        taskTwo.position.y = -4 * arcHeight * t * (1 - t);
      }
    }, 100);

  
    // Animating taskThree
    setTimeout(() => {
      if (taskThree.position.z < 4) {
      taskThree.position.z += animationSpeed;
  
      const t = easeInOutQuad((taskThree.position.z - 4) / -20);
      taskThree.position.y = -4 * arcHeight * t * (1 - t);
      }
    }, 200);

  } else if (!animatingTasks && !reversingTasks) {
    reversingTasks = true;
  
    const arcHeight = -2; // Adjust height of the arc
  
    // Reversing taskOne


    if (taskOne.position.z > -20) {
      taskOne.position.z -= animationSpeed;
  
      const t = easeInOutQuad(taskOne.position.z / 20);
      taskOne.position.y = -4 * arcHeight * t * (1 - t);
    }
  
    // Reversing taskTwo
    setTimeout(() => {
      if (taskTwo.position.z > -20) {
        taskTwo.position.z -= animationSpeed;
    
        const t = easeInOutQuad(taskTwo.position.z / 20);
        taskTwo.position.y = -4 * arcHeight * t * (1 - t);
      }
    }, 100);
  
    // Reversing taskThree
    setTimeout(() => {
    if (taskThree.position.z > -20) {
      taskThree.position.z -= animationSpeed;
  
      const t = easeInOutQuad(taskThree.position.z / 20);
      taskThree.position.y = -4 * arcHeight * t * (1 - t);
    }
    }, 200);
  }



  // zelfde logica voor een task in depth

  let reversingTaskInDepth = false;

  if (animatingTaskInDepth) {
    reversingTaskInDepth = false;
  
    const arcHeight = -2;
  
    if (canvasInDepth.position.z < 4) {
      canvasInDepth.position.z += animationSpeed;
      
      const t = easeInOutQuad((canvasInDepth.position.z - 4) / -20);
      canvasInDepth.position.y = -4 * arcHeight * t * (1 - t);
    }

  } else if (!animatingTaskInDepth && !reversingTaskInDepth) {
    reversingTaskInDepth = true;
  
    const arcHeight = -2;

    if (canvasInDepth.position.z > -20) {
      canvasInDepth.position.z -= animationSpeed;
  
      const t = easeInOutQuad(canvasInDepth.position.z / 20);
      canvasInDepth.position.y = -4 * arcHeight * t * (1 - t);
    }

  }



  let reversingRanking = false;

  if (animatingRanking) {
    reversingRanking = false;


  
    if (lessCube.position.z < 0) {
      lessCube.position.z += animationSpeed;
    }

    setTimeout(() => {
      if (moreCube.position.z < -5) {
        moreCube.position.z += animationSpeed;
      }
    }, 100);
  
  } else if (!animatingRanking && !reversingRanking) {
    reversingRanking = true;
  
    if (lessCube.position.z > -20) {
      lessCube.position.z -= animationSpeed;
    }
    setTimeout(() => {
      if (moreCube.position.z > -20) {
        moreCube.position.z -= animationSpeed;
      }
    }, 100);
  }
  
  
  
  
  


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



  secondCube.position.lerp(targetPositionSecond, 0.1); // Adjust the speed for position
  
  // Animate rotation to targetRotation
  if (animatingRotation) {
    const targetQuat = new THREE.Quaternion().setFromEuler(targetRotationSecond);

    // Slerp between the current and target quaternions
    secondCube.quaternion.slerp(targetQuat, 0.1); // Adjust speed

    // Check if rotation is close to target to stop animating
    if (secondCube.quaternion.angleTo(targetQuat) < 0.01) {
      animatingRotation = false;
      animateRotatingCube = false;
    }
  }

  if (animateRotatingCube) {
    secondCube.rotation.x += 0.005;
    secondCube.rotation.y += 0.005;
  }


  // Hover effect for cubeMesh
  let time = clock.getElapsedTime(); // Get the elapsed time

  if (targetPosition.z == -1) {
    cubeMesh.position.y = Math.sin(time * 2) * 0.1;
    secondCube.position.y = Math.sin(time * 2) * 0.1;
  }


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
