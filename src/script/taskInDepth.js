import * as THREE from 'three';

export function taskInDepth() {

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "#E9EBF5";
    ctx.beginPath();
    ctx.moveTo(262, 140);
    ctx.lineTo(282, 110);
    ctx.lineTo(242, 110);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#E9EBF5";
    ctx.fillRect(15, 35, 490, 80);

    ctx.fillStyle = "#0C0A0A";
    ctx.font = "300 68px helvetica";
    ctx.fillText("Quantum Mech", 25, 95);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true; 
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.scale.set(1, 0.5, 1);


    // Button element

    const canvasTwo = document.createElement('canvas');
    canvasTwo.width = 512;
    canvasTwo.height = 256;
    const ctxTwo = canvasTwo.getContext('2d');

    ctxTwo.fillStyle = "#0051FF";
    ctxTwo.fillRect(0, 0, 460, 120);

    ctxTwo.fillStyle = "#E9EBF5";
    ctxTwo.font = "300 68px helvetica";
    ctxTwo.fillText("Start task", 35, 80);

    var buttonIcon = document.getElementById("buttonIcon");
    ctxTwo.drawImage(buttonIcon, 360, 35, 22 * 2.5, 19 * 2.5);
    ctxTwo.filter = 'none';

    // Create sprite for the 2D element
    const textureTwo = new THREE.CanvasTexture(canvasTwo);
    textureTwo.needsUpdate = true; 
    const spriteMaterialTwo = new THREE.SpriteMaterial({ map: textureTwo });
    const spriteTwo = new THREE.Sprite(spriteMaterialTwo);

    spriteTwo.scale.set(1, 0.5, 1);
    spriteTwo.position.set(0.05, -1.2, 0);

    const group = new THREE.Group();
    group.add(sprite);
    group.add(spriteTwo);


    return group;
}
