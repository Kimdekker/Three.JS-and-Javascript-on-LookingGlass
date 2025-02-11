import * as THREE from "three/src/Three.js";
import { cube } from "./script/cube.js";


const scene = new THREE.Scene();


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




// ****RENDER LOOP*******************************************************************************************************************************************************

renderer.setAnimationLoop(() => {
  
    cubeMesh.rotation.x += 0.005;
    cubeMesh.rotation.y += 0.005;


  // Render the scene
  renderer.render(scene, camera);
});




// ****LOOKING GLASS BUTTON EN RESIZE SHIZZLE*******************************************************************************************************************************************************
// document.body.append(VRButton.createButton(renderer));

function resize() {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
resize();
window.addEventListener("resize", resize);
