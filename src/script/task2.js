import * as THREE from 'three';
import { taskShape } from './taskShape.js';

export function task2() {
    const octahedron = taskShape();

    // Create a canvas for 2D content
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Draw on the canvas
    ctx.fillStyle = "#E9EBF5";
    ctx.beginPath();
    ctx.moveTo(255, 10);
    ctx.lineTo(275, 50);
    ctx.lineTo(235, 50);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#E9EBF5";
    ctx.fillRect(50, 35, 413, 80);

    ctx.fillStyle = "#0C0A0A";
    ctx.font = "300 68px helvetica";
    ctx.fillText("Biasoderator", 60, 95);

    // Create sprite for the 2D element
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true; // Ensure texture updates
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    // Position sprite below the 3D object
    sprite.position.set(0, -0.85, 0);
    sprite.scale.set(1, 0.5, 1);

    // Group 3D and 2D elements
    const group = new THREE.Group();
    group.add(octahedron);
    group.add(sprite);


    return group;
}
