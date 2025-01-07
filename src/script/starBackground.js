import * as THREE from 'three';

export function starBackground(scene, count = 100, areaSize = 5) {
    for (let i = 0; i < count; i++) {
        const sphereSize = Math.random() * 0.05; // size for stars

        const star = new THREE.Mesh(
            new THREE.SphereGeometry(sphereSize, 8, 8), // random size
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
