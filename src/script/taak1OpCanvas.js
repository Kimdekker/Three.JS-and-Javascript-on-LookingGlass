import * as THREE from "three";

export function taak1OpCanvas() {
  const taak = document.createElement("canvas");
  taak.width = 512 * 2;
  taak.height = 256 * 2;

  const ctx = taak.getContext("2d");
  
  ctx.beginPath();
  ctx.roundRect(0, 0, taak.width, taak.height, [50]); // border radius
  ctx.clip(); // clip border radius op image
  ctx.filter = 'blur(10px)';
  var quantumImg = document.getElementById("quantum");
  ctx.drawImage(quantumImg, 0, 0, taak.width, taak.height);
  ctx.filter = 'none';

  ctx.font = "90px helvetica";
  ctx.fillStyle = "#fff";
  ctx.fillText("Quantum Mechanics", 35, 170);

  ctx.font = "35px helvetica";
  ctx.fillStyle = "#fff";
  ctx.fillText("Quantum Mechanics is hard to understand.", 45, 230);

  ctx.fillStyle = "#F2D492";
  ctx.beginPath();
  ctx.roundRect(40, 35, 128, 40, [40]);
  ctx.fill();

  ctx.fillStyle = "#202C39";
  ctx.font = "20px helvetica";
  ctx.fillText("6 HOURS", 57, 61);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(taak);

  return texture;
}
