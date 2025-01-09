import * as THREE from 'three';

export function taskShape() {
    const textureLoader = new THREE.TextureLoader();

    const albedoMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/task_albedo.jpeg');
    const normalMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/task_normal.jpeg');
    const roughnessMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/task_roughness.jpeg');

    const material = new THREE.MeshStandardMaterial({
        map: albedoMap,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        roughness: 1,
        metalness: 1,
    });

    const geometry = new THREE.OctahedronGeometry();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.3, 0.5, 0.3); // Adjust scale

    return mesh;
}
