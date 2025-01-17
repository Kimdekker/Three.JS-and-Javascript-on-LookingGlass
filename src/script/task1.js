import * as THREE from 'three';
import { taskShape } from './taskShape.js';

export function task1() {
    const octahedron = taskShape();

    // Create a canvas for 2D content
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Draw on the canvas
    ctx.fillStyle = "#E9EBF5";
    ctx.beginPath();
    ctx.moveTo(242, 10);
    ctx.lineTo(262, 50);
    ctx.lineTo(222, 50);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#E9EBF5";
    ctx.fillRect(5, 35, 490, 80);

    ctx.fillStyle = "#0C0A0A";
    ctx.font = "300 68px helvetica";
    ctx.fillText("Quantum Mech", 15, 95);

    // Create sprite for the 2D element
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true; // Ensure texture updates
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    // Position sprite below the 3D object
    sprite.position.set(-0.02, -0.85, 0);
    sprite.scale.set(1, 0.5, 1);

    // Group 3D and 2D elements
    const group = new THREE.Group();
    group.add(octahedron);
    group.add(sprite);


    return group;
}
