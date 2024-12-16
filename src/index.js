import * as THREE from "three/src/Three.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import {
  LookingGlassWebXRPolyfill,
  LookingGlassConfig
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

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.1, 0.1),
  new THREE.MeshStandardMaterial({ color: "red" })
);

scene.add(cube);

scene.add(new THREE.AmbientLight(0xaaaaaa));
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);


// Laad een lettertype (JSON-bestand)
const fontLoader = new FontLoader();
fontLoader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", // URL naar standaard Three.js font
  (font) => {
    // Maak tekst geometrie
    const textGeometry = new TextGeometry("Hello Looking Glass!", {
      font: font,
      size: 0.15, // Grootte van de tekst
      height: 0, // Diepte van de tekst
      curveSegments: 12, // Hoeveelheid curven in de tekst
      bevelEnabled: false, // Eventueel bevel toevoegen
    });

    // Materiaal voor de tekst
    const textMaterial = new THREE.MeshStandardMaterial({ color: "white" });

    // Maak een mesh van de tekst
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Plaats de tekst ergens in de scene
    textMesh.position.set(-2, 0.8, 0); // X = horizontaal (- is naar links), Y = verticaal (- is naar onder), Z positie (- is naar achter)
    // textMesh.rotation.y = Math.PI / 4; // Draaien van teskt
    scene.add(textMesh); // Voeg toe aan de scene
  }
);



const renderer = new THREE.WebGLRenderer({ antialias: true });
document.body.append(renderer.domElement);
renderer.xr.enabled = true;

const camera = new THREE.PerspectiveCamera();
camera.position.z = 3;

renderer.setAnimationLoop(() => {
  cube.rotation.z += 0.01;
  cube.rotation.x += 0.02;
  renderer.render(scene, camera);
});

document.body.append(VRButton.createButton(renderer));

function resize() {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
resize();
window.addEventListener("resize", resize);
