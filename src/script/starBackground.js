import * as THREE from 'three';

let currentStars = []; // Array to track the current stars

export function starBackground(scene, count = 100, areaSize = 5, zPosition = -10, starColor = 0x4F4747) {
    // Remove any existing stars
    currentStars.forEach(star => {
        scene.remove(star);
    });

    currentStars = []; // Clear the array for new stars

    for (let i = 0; i < count; i++) {
        const cubeSize = Math.random() * 0.09; // size for stars

        const star = new THREE.Mesh(
            new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), // random size for cubes
            new THREE.MeshBasicMaterial({ color: starColor })
        );

        star.position.set( // random position
            (Math.random() - 0.5) * areaSize, // x
            (Math.random() - 0.5) * areaSize, // y
            zPosition  // z
        );

        scene.add(star);
        currentStars.push(star); // Track this star
    }
}
