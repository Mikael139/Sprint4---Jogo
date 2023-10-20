// MONTA OS QUADRADOS(ROBÔS E OBSTÁCULOS)
const quadrado = function (posX, posY, width, height, color, velocidade, imgSrc) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocidade = velocidade;
    this.imgSrc = imgSrc;
    this.img = new Image();
    this.img.src = this.imgSrc;
}