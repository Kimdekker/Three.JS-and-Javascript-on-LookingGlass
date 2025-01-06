import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';

export function cube() {

    const textureLoader = new THREE.TextureLoader();

    const albedoMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/TextureMapPanel_albedo.jpg');
    const normalMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/TextureMapPanel_normal.jpeg');
    const roughnessMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/TextureMapPanel_roughness.jpeg');
    const metallicMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/TextureMapPanel_metallic.jpeg');
    const aoMap = textureLoader.load('https://www.kim-dekker.nl/assets/textures/textureMapPanel_ambient.jpeg');

    const material = new THREE.MeshStandardMaterial({
        map: albedoMap,              // Base color
        normalMap: normalMap,        // Surface details
        roughnessMap: roughnessMap,  // Surface roughness
        roughness: 1.0,              // Base roughness
        metalnessMap: metallicMap,   // Metallic properties
        metalness: 0.5,              // Base metallic value
        aoMap: aoMap,                // Ambient occlusion
        aoMapIntensity: 1.0,         // AO intensity

        emissive: new THREE.Color(0x0051FF), // Neon purple color
        emissiveIntensity: 0.3, // Intensity of the glow effect
    });

    // Create the geometry and mesh
    const geometry = new RoundedBoxGeometry(2, 2, 2, 10, 0.2);  // Size: 1x1x1, Segments: 10, Radius: 0.1
    const cube = new THREE.Mesh(geometry, material);

    return cube;
}
