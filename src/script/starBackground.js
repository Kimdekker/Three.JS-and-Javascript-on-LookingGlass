import * as THREE from 'three';

export function starBackground(scene, count = 100, areaSize = 5) {
    for (let i = 0; i < count; i++) {
        const cubeSize = Math.random() * 0.09; // size for stars

        const star = new THREE.Mesh(
            new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), // random size for cubes
            new THREE.MeshBasicMaterial({ color: 0x4F4747 })
        );

        star.position.set( // random position
            (Math.random() - 0.5) * areaSize, // x
            (Math.random() - 0.5) * areaSize, // y
            -10  // z
        );

        scene.add(star);
    }
}
