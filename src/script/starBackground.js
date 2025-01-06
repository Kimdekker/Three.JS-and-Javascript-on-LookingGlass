import * as THREE from 'three';

export function starBackground(scene, count = 100, areaSize = 100) {
    for (let i = 0; i < count; i++) {
        const sphereSize = Math.random() * 0.5; // Random size for the sphere
        const star = new THREE.Mesh(
            new THREE.SphereGeometry(sphereSize, 16, 16),
            new THREE.MeshBasicMaterial({ color: 0x4F4747 })
        );

        // Random position within the defined area
        star.position.set(
            (Math.random() - 0.5) * areaSize, // x
            (Math.random() - 0.5) * areaSize, // y
            (Math.random() - 0.5) * areaSize  // z
        );

        // Add the star to the scene
        scene.add(star);
    }
}
