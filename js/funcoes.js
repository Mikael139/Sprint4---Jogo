(function () {
  const cnv = document.querySelector('#canvas');
  const ctx = cnv.getContext('2d');

  //movimentos
  let moveLeft = false;
  let moveUp = false;
  let moveRight = false;
  let moveDown = false;
  let moveLeft2 = false;
  let moveUp2 = false;
  let moveRight2 = false;
  let moveDown2 = false;
  let colisoes = 0;

  const modeToggleBtn = document.getElementById('modeToggle');
  const body = document.body;

  // Metodo para modo dark/light
  modeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    modeToggleBtn.classList.toggle('light-text');

    if (body.classList.contains('dark-mode')) {
        modeToggleBtn.textContent = 'Modo light';
    } else {
        modeToggleBtn.textContent = 'Modo dark';
    }
  });


  // arrays
  const quadrados = [];

  // quadrados (Robôs)
  const quadrado1 = new quadrado(20, 10, 100, 100, "#f60", 5, 'IMG/robo.gif');
  quadrados.push(quadrado1);

  const quadrado2 = new quadrado(200, 200, 100, 100, "#0f0", 5, 'IMG/robo2.gif');
  quadrados.push(quadrado2);

  // pressionar as teclas
  window.addEventListener('keydown', function (e) {
    const nomeKey = e.key;
    console.log(nomeKey);
    switch (nomeKey) {
      case 'h':
        moveLeft = true;
        break;
      case 'u':
        moveUp = true;
        break;
      case 'k':
        moveRight = true;
        break;
      case 'j':
        moveDown = true;
        break;
      case 'a':
        moveLeft2 = true;
        break;
      case 'w':
        moveUp2 = true;
        break;
      case 'd':
        moveRight2 = true;
        break;
      case 's':
        moveDown2 = true;
        break;
    }
  });

  //soltar as teclas  
  window.addEventListener('keyup', (e) => {
    const key = e.key;
    switch (key) {
      case 'g':
        moveLeft = false;
        break;
      case 'u':
        moveUp = false;
        break;
      case 'k':
        moveRight = false;
        break;
      case 'j':
        moveDown = false;
        break;
      case 'a':
        moveLeft2 = false;
        break;
      case 'w':
        moveUp2 = false;
        break;
      case 'd':
        moveRight2 = false;
        break;
      case 's':
        moveDown2 = false;
        break;
    }
  });

  function moverQuadrados() {
    // Código para mover o primeiro robô
    if (moveLeft && !moveRight) {
      quadrado1.posX -= quadrado1.velocidade;
    }
    if (moveRight && !moveLeft) {
      quadrado1.posX += quadrado1.velocidade;
    }
    if (moveUp && !moveDown) {
      quadrado1.posY -= quadrado1.velocidade;
    }
    if (moveDown && !moveUp) {
      quadrado1.posY += quadrado1.velocidade;
    }
    
    // Código para mover o segundo robô
    if (moveLeft2 && !moveRight2) {
      quadrado2.posX -= quadrado2.velocidade;
    }
    if (moveRight2 && !moveLeft2) {
      quadrado2.posX += quadrado2.velocidade;
    }
    if (moveUp2 && !moveDown2) {
      quadrado2.posY -= quadrado2.velocidade;
    }
    if (moveDown2 && !moveUp2) {
      quadrado2.posY += quadrado2.velocidade;
    }
  
    // Código para manter o primeiro robô dentro do canvas
    quadrado1.posX = Math.max(0, Math.min(cnv.width - quadrado1.width, quadrado1.posX));
    quadrado1.posY = Math.max(0, Math.min(cnv.height - quadrado1.height, quadrado1.posY));
    
    // Código para manter o segundo robô dentro do canvas
    quadrado2.posX = Math.max(0, Math.min(cnv.width - quadrado2.width, quadrado2.posX));
    quadrado2.posY = Math.max(0, Math.min(cnv.height - quadrado2.height, quadrado2.posY));
  }


  function exibirQuadrados() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (const i in quadrados) {
      const spr = quadrados[i];
      ctx.drawImage(spr.img, spr.posX, spr.posY, spr.width, spr.height);
    }
  }

  function getRandomDamage() {
    return Math.floor(Math.random() * 21);
  }

  quadrado1.vida = 100; // Inicializa a vida do robo1 como 100
  quadrado2.vida = 100; // Inicializa a vida do robo2 como 100

  function atualizarTela() {
    window.requestAnimationFrame(atualizarTela, cnv);
    
    moverQuadrados();
    exibirQuadrados();
    
    // Verificação de colisão
    if (quadrado1.posX < quadrado2.posX + quadrado2.width && quadrado1.posX + quadrado1.width > quadrado2.posX && quadrado1.posY < quadrado2.posY + quadrado2.height && quadrado1.height + quadrado1.posY > quadrado2.posY) {
        console.log('colisão detectada');
        
        // Diminue o nível de vida aqui
        const damage1 = getRandomDamage();
        const damage2 = getRandomDamage();
        quadrado1.vida -= damage1;
        quadrado2.vida -= damage2;
        console.log(`Dano Robô 1: ${damage1}, Vida do Robô 1: ${quadrado1.vida}, Dano Robô 2: ${damage2}, Vida do Robô 2: ${quadrado2.vida}`);
        
        colisoes++;
        
        // Separar os robôs após cada colisão
        if (quadrado1.posX < quadrado2.posX) {
          quadrado1.posX -= 70;
          quadrado2.posX += 70;
        } else {
          quadrado1.posX += 70;
          quadrado2.posX -= 70;
        }
        
        if (quadrado1.posY < quadrado2.posY) {
          quadrado1.posY -= 70;
          quadrado2.posY += 70;
        } else {
          quadrado1.posY += 70;
          quadrado2.posY -= 70;
        }
        
        // Após 5 colisões, o jogo é finalizado e declara o Robô vencedor
        if (colisoes === 5) {
          let vencedor;
          if (quadrado1.vida > quadrado2.vida) {
            vencedor = 'Robô 1';
          } else if (quadrado2.vida > quadrado1.vida) {
            vencedor = 'Robô 2';
          } else {
            vencedor = 'Empate';
          }
          
          alert(`O jogo terminou após ${colisoes} colisões. O vencedor é: ${vencedor}`);
          
          location.reload();

          return;
        }
      }
      
      document.getElementById('progressBarRobo1').style.width = `${quadrado1.vida}%`;
      document.getElementById('progressBarRobo2').style.width = `${quadrado2.vida}%`;
}
  atualizarTela();

}());