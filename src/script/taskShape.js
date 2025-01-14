import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';


export function taskShape() {
    const textureLoader = new THREE.TextureLoader();

    const albedoMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/task_albedo.jpeg');
    const normalMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/task_normal.jpeg');
    const roughnessMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/task_roughness.jpeg');

    const material = new THREE.MeshStandardMaterial({
        map: albedoMap,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        roughness: 1.5,
        metalness: 1,
    });

    const geometry = new RoundedBoxGeometry(0.5, 0.5, 0.5, 10, 0.05);  // Size: 1x1x1, Segments, Radius
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(Math.PI / 4, Math.PI / -4, 0);

    return mesh;
}
