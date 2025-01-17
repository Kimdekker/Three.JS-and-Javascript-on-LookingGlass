import * as THREE from 'three';

export function playingButton() {

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    var playingButton = document.getElementById("playingButton");
    ctx.drawImage(playingButton, 204, 50, 104, 101);
    ctx.filter = 'none';

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true; 
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.scale.set(1, 0.5, 1);


    return sprite;
}
