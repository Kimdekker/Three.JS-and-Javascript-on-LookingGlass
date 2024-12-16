import "./styles.css";
import * as THREE from "three/src/Three.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import {
  LookingGlassWebXRPolyfill,
  LookingGlassConfig
} from "@lookingglass/webxr";

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
