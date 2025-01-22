import * as THREE from 'three';

export function ranking() {

    // 1e label

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
    ctx.fillRect(105, 35, 308, 80);

    ctx.fillStyle = "#0C0A0A";
    ctx.font = "300 68px helvetica";
    ctx.fillText("Proficient", 115, 95);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true; 
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.scale.set(1, 0.5, 1);


    // 2e label

    const canvasTwo = document.createElement('canvas');
    canvasTwo.width = 512;
    canvasTwo.height = 256;
    const ctxTwo = canvasTwo.getContext('2d');

    ctxTwo.fillStyle = "#E9EBF5";
    ctxTwo.beginPath();
    ctxTwo.moveTo(262, 140);
    ctxTwo.lineTo(282, 110);
    ctxTwo.lineTo(242, 110);
    ctxTwo.closePath();
    ctxTwo.fill();

    ctxTwo.fillStyle = "#E9EBF5";
    ctxTwo.fillRect(150, 35, 225, 80);

    ctxTwo.fillStyle = "#0C0A0A";
    ctxTwo.font = "300 68px helvetica";
    ctxTwo.fillText("Initiant", 160, 95);


    const textureTwo = new THREE.CanvasTexture(canvasTwo);
    textureTwo.needsUpdate = true; 
    const spriteMaterialTwo = new THREE.SpriteMaterial({ map: textureTwo });
    const spriteTwo = new THREE.Sprite(spriteMaterialTwo);

    spriteTwo.scale.set(1, 0.5, 1);
    spriteTwo.position.set(-1, -0.2, 0);

    // 3e label

    const canvasThree = document.createElement('canvas');
    canvasThree.width = 512;
    canvasThree.height = 256;
    const ctxThree = canvasThree.getContext('2d');
    
    // Draw shapes and text on the canvas
    ctxThree.fillStyle = "#E9EBF5";
    ctxThree.beginPath();
    ctxThree.moveTo(262, 140);
    ctxThree.lineTo(282, 110);
    ctxThree.lineTo(242, 110);
    ctxThree.closePath();
    ctxThree.fill();
    
    ctxThree.fillStyle = "#E9EBF5";
    ctxThree.fillRect(155, 35, 210, 80);
    
    ctxThree.fillStyle = "#0C0A0A";
    ctxThree.font = "300 68px helvetica";
    ctxThree.fillText("Adept", 165, 95);
    
    // Use the canvas as a texture
    const textureThree = new THREE.CanvasTexture(canvasThree);
    textureThree.needsUpdate = true;
    
    const spriteMaterialThree = new THREE.SpriteMaterial({ map: textureThree });
    const spriteThree = new THREE.Sprite(spriteMaterialThree);
    
    // Set sprite scale and position
    spriteThree.scale.set(1, 0.5, 1);
    spriteThree.position.set(1, 0.2, 0);


    const group = new THREE.Group();
    group.add(sprite);
    group.add(spriteTwo);
    group.add(spriteThree);

    return group;
}
