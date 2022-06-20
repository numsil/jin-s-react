var Tetris = {
  //������ ����
  B_UPOPEN: 1 << 4,
  B_RIGHTOPEN: 1 << 5,
  B_BOTTOMOPEN: 1 << 6,
  B_LEFTOPEN: 1 << 7,
  B_HASBLOCK: 1 << 8,

  B_BLOCKNUM_MASK: 0xf,

  nBlockX: 30,
  nBlockY: 30,

  nRectSize: 15,
  width: 10,
  height: 20,
  nBlockBlock: 7,

  nStartX: 3,
  nStartY: 0,

  blockColors: [
    ["#69e1ff", "#20beeb", "#06abe3"], //1
    ["#ffa234", "#ff6e05", "#ff5604"], //��
    ["#0e87f8", "#036be4", "#0262f5"], //��
    ["#ffe567", "#fbd504", "#ffba00"], //��
    ["#da58ff", "#c22dff", "#ab23f1"], //��
    ["#86f113", "#6ed804", "#58c104"], //����
    ["#ff4f81", "#fe2156", "#ea0f47"], //����
    ["#BBB", "#999", "#777"], //�߸� ����
  ],

  levelLine: [1000, 2000, 3000, 5000, 6000, 7000, 9000, 11000, 20000],
  levelSpeed: [20, 16, 12, 10, 8, 6, 5, 4, 3],

  init: function () {
    this.blocks = [
      //1�� ����
      [
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      //���� ����
      [
        [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      //���� ����
      [
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      //���� ����
      [[0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      //���� ����
      [
        [0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      ],
      //������ ����
      [
        [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      //������ ����
      [
        [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    ];
  },

  blocks: null,

  isCanMove: function (blockMap, blockMap2, a_x, a_y) {
    for (var y = 0; y < 4; y++)
      for (var x = 0; x < 4; x++) {
        if (blockMap2[y][x]) {
          //�·� ����
          if (a_x + x < 0) return false;
          //��� ����
          if (a_x + x >= this.width) return false;

          if (a_y + y < 0) return false;
          if (a_y + y >= this.height) return false;

          //�̹� ���ڸ��� �� ����
          if (blockMap[a_y + y][a_x + x]) return false;
        }
      }
    return true;
  },

  isRightOut: function (blockMap, blockMap2, a_x, a_y) {
    for (var y = 0; y < 4; y++)
      for (var x = 0; x < 4; x++) {
        if (blockMap2[y][x]) {
          //��� ����
          if (a_x + x >= this.width) return true;
        }
      }
    return false;
  },

  isLeftOut: function (blockMap, blockMap2, a_x, a_y) {
    for (var y = 0; y < 4; y++)
      for (var x = 0; x < 4; x++) {
        if (blockMap2[y][x]) {
          //��� ����
          if (a_x + x < 0) return true;
        }
      }
    return false;
  },

  drawBlock: function (oCanvas, a_x, a_y, blockMap, nX, nY) {
    if (nX == null) nX = 0;
    if (nY == null) nY = 0;

    for (var y = 0; y < 4; y++)
      for (var x = 0; x < 4; x++) {
        this.drawBlockRect(
          oCanvas,
          nX + (a_x + x) * this.nRectSize,
          nY + (a_y + y) * this.nRectSize,
          blockMap[y][x],
          this.blockColors[(blockMap[y][x] & this.B_BLOCKNUM_MASK) - 1]
        );
      }
  },

  freezeBlock: function (oBlockMap, blockMap2, a_x, a_y) {
    for (var y = 0; y < 4; y++)
      for (var x = 0; x < 4; x++) {
        if (blockMap2[y][x]) {
          oBlockMap[a_y + y][a_x + x] = blockMap2[y][x];
        }
      }
  },

  drawFreezeBlock: function (blockMap) {
    for (var y = 0; y < Tetris.height; y++)
      for (var x = 0; x < Tetris.width; x++) {
        if (blockMap[y][x]) {
          this.drawBlockRect(
            context,
            this.nBlockX + x * this.nRectSize,
            this.nBlockY + y * this.nRectSize,
            blockMap[y][x],
            this.blockColors[(blockMap[y][x] & this.B_BLOCKNUM_MASK) - 1]
          );
        }
      }
  },

  getRandomBlock: function () {
    var nNum = UTIL.random(this.blocks.length);
    return nNum;
  },

  getBlock: function (nNum, nRotate, blockMap) {
    for (var y = 0; y < 4; y++)
      for (var x = 0; x < 4; x++) {
        blockMap[y][x] = 0;
      }

    for (var y = 0; y < 4; y++)
      for (var x = 0; x < 4; x++) {
        if (this.blocks[nNum][nRotate][y * 4 + x]) blockMap[y][x] = nNum + 1;
      }
    this.makeEmbodBloc(blockMap);
  },

  makeEmbodBloc: function (blockMap) {
    for (var y = 0; y < 4; y++)
      for (var x = 0; x < 4; x++) {
        if (blockMap[y][x]) {
          //���� ������ ����Ǿ��°�?
          if (x >= 1 && blockMap[y][x - 1])
            blockMap[y][x] = blockMap[y][x] | this.B_LEFTOPEN;
          //���� ������ ����Ǿ��°�?
          if (x < 3 && blockMap[y][x + 1])
            blockMap[y][x] = blockMap[y][x] | this.B_RIGHTOPEN;
          //���� ������ ����Ǿ��°�?
          if (y >= 1 && blockMap[y - 1][x])
            blockMap[y][x] = blockMap[y][x] | this.B_UPOPEN;
          //���� ������ ����Ǿ��°�?
          if (y < 3 && blockMap[y + 1][x])
            blockMap[y][x] = blockMap[y][x] | this.B_BOTTOMOPEN;
        }
      }
  },

  onEnterFrame: function () {},

  drawBlockRect: function (oCanvas, x, y, blockType, aszColor) {
    if (blockType == 0) return;

    oCanvas.fillStyle = aszColor[1];
    oCanvas.strokeStyle = "#f00";
    oCanvas.fillRect(x + 2, y + 2, this.nRectSize - 4, this.nRectSize - 4);

    oCanvas.lineWidth = 1;

    context.beginPath();
    //if( (this.B_UPOPEN & blockType) == 0 )
    {
      oCanvas.fillStyle =
        (this.B_UPOPEN & blockType) == 0 ? aszColor[0] : aszColor[1];
      oCanvas.fillRect(x + 1, y, this.nRectSize - 1, 1);
      oCanvas.fillRect(x + 1 + 1, y + 1, this.nRectSize - 2 - 1, 1);
      oCanvas.moveTo(x, y);
      oCanvas.lineTo(x + this.nRectSize, y);
    }

    //if( (this.B_RIGHTOPEN & blockType) == 0 )
    {
      oCanvas.fillStyle =
        (this.B_RIGHTOPEN & blockType) == 0 ? aszColor[2] : aszColor[1];
      oCanvas.fillRect(x - 1 + this.nRectSize, y + 1, 1, this.nRectSize - 1);
      oCanvas.fillRect(
        x - 2 + this.nRectSize,
        y + 1 + 1,
        1,
        this.nRectSize - 2 - 1
      );
      oCanvas.moveTo(x + this.nRectSize, y);
      oCanvas.lineTo(x + this.nRectSize, y + this.nRectSize);
    }

    //if( (this.B_BOTTOMOPEN & blockType) == 0 )
    {
      oCanvas.fillStyle =
        (this.B_BOTTOMOPEN & blockType) == 0 ? aszColor[2] : aszColor[1];
      oCanvas.fillRect(x, y - 1 + this.nRectSize, this.nRectSize - 1, 1);
      oCanvas.fillRect(
        x + 1,
        y - 2 + this.nRectSize,
        this.nRectSize - 2 - 1,
        1
      );
      oCanvas.moveTo(x, y + this.nRectSize);
      oCanvas.lineTo(x + this.nRectSize, y + this.nRectSize);
    }

    //if( (this.B_LEFTOPEN & blockType) == 0 )
    {
      oCanvas.fillStyle =
        (this.B_LEFTOPEN & blockType) == 0 ? aszColor[0] : aszColor[1];
      oCanvas.fillRect(x, y, 1, this.nRectSize - 1);
      oCanvas.fillRect(x + 1, y + 1, 1, this.nRectSize - 2 - 1);
      oCanvas.moveTo(x, y);
      oCanvas.lineTo(x, y + this.nRectSize);
    }

    //oCanvas.stroke();
    oCanvas.closePath();
  },

  ratateBlock: function (angle, nBlockNum, nRotate) {
    if (angle == 90) {
      nRotate++;
      if (this.blocks[nBlockNum].length <= nRotate) nRotate = 0;
    } else if (angle == -90) {
      nRotate--;
      if (0 > nRotate) nRotate = this.blocks[nBlockNum].length - 1;
    }

    return nRotate;

    /*
		var iBlockMap = [];
		for( var y=0;y<4;y++ )
		{
			iBlockMap.push( [] );
			for( var x=0;x<4;x++ )
			{
				iBlockMap[y][x] = blockMap[y][x] & 0xf;
			}
		}
	
		if( angle == 90 )
		{
			for( var y=0;y<4;y++ )
			for( var x=0;x<4;x++ )
			{
				blockMap[y][x] = iBlockMap[x][3-y];
			}
			this.makeEmbodBloc(blockMap);
		}
		else if( angle == -90 )
		{
			for( var y=0;y<4;y++ )
			for( var x=0;x<4;x++ )
			{
				blockMap[y][x] = iBlockMap[3-x][y];
			}
			this.makeEmbodBloc(blockMap);
		}
		*/
  },
};

var Tetris_User = {
  nNowBlock: 1,
  bHold: false,
  holdCount: 0,
  nCount: 0,
  nSpeed: 50,
  anNextBlocks: [],
  nHoldNum: -1,
  score: 0,
  oBlocks: [],
  nNowBlockNum: 0,
  oNowBlock: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  nNowBlockRotate: 0,
  oPreBlock: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  bGameOver: false,
  level: 1,

  nCombo: 0,

  nX: 0,
  nY: 0,

  rotate: function (nRotate) {
    if (nRotate == null) nRotate = 90;

    TetrisUI.sound.rotate.play();
    this.nNowBlockRotate = Tetris.ratateBlock(
      nRotate,
      this.nNowBlockNum,
      this.nNowBlockRotate
    );
    Tetris.getBlock(this.nNowBlockNum, this.nNowBlockRotate, this.oNowBlock);

    if (!Tetris.isCanMove(this.oBlocks, this.oNowBlock, this.nX, this.nY)) {
      //��� ����
      if (Tetris.isRightOut(this.oBlocks, this.oNowBlock, this.nX, this.nY)) {
        if (
          Tetris.isRightOut(this.oBlocks, this.oNowBlock, this.nX - 1, this.nY)
        )
          this.nX -= 2;
        else this.nX -= 1;
        return;
      }
      //�·� ����
      if (Tetris.isLeftOut(this.oBlocks, this.oNowBlock, this.nX, this.nY)) {
        if (
          Tetris.isRightOut(this.oBlocks, this.oNowBlock, this.nX + 1, this.nY)
        )
          this.nX += 2;
        else this.nX += 1;
        return;
      }

      this.nNowBlockRotate = Tetris.ratateBlock(
        nRotate * -1,
        this.nNowBlockNum,
        this.nNowBlockRotate
      );
      Tetris.getBlock(this.nNowBlockNum, this.nNowBlockRotate, this.oNowBlock);
    }
  },

  left: function () {
    TetrisUI.sound.move.play();
    if (Tetris.isCanMove(this.oBlocks, this.oNowBlock, this.nX - 1, this.nY))
      this.nX--;
  },

  right: function () {
    TetrisUI.sound.move.play();
    if (Tetris.isCanMove(this.oBlocks, this.oNowBlock, this.nX + 1, this.nY))
      this.nX++;
  },

  up: function () {
    /*if( Tetris.isCanMove( this.oBlocks, this.oNowBlock, this.nX, this.nY-1 ) )
			this.nY --;
		*/
    this.rotate();
  },

  down: function (bSound) {
    if (bSound) TetrisUI.sound.move.play();
    if (Tetris.isCanMove(this.oBlocks, this.oNowBlock, this.nX, this.nY + 1)) {
      this.nY++;
    } else {
      Tetris.freezeBlock(this.oBlocks, this.oNowBlock, this.nX, this.nY);
      if (this.checkClearLine() == 0) this.nCombo = 0;
      this.newBlock();
    }
  },

  drop: function () {
    TetrisUI.sound.down.play();
    for (var y = 0; y < Tetris.height; y++) {
      if (
        Tetris.isCanMove(this.oBlocks, this.oNowBlock, this.nX, this.nY + 1)
      ) {
        this.down();
      } else {
        this.down();
        return;
      }
    }
  },

  hold: function () {
    if (!this.bHold) return;
    if (this.holdCount <= 0) return;
    this.holdCount--;

    TetrisUI.sound.hold.play();

    var temp;
    if (this.nHoldNum != -1) {
      temp = this.nNowBlockNum;
      this.nNowBlockNum = this.nHoldNum;
      this.nHoldNum = temp;
      this.nNowBlockRotate = 0;

      Tetris.getBlock(this.nNowBlockNum, this.nNowBlockRotate, this.oNowBlock);
      this.showPreBlocks();
      this.nX = Tetris.nStartX;
      this.nY = Tetris.nStartY;
    } else {
      this.nHoldNum = this.nNowBlockNum;
      this.newBlock();
    }
    this.bHold = false;
  },

  attack: function (nAttackNum) {},

  attackMe: function (nAttackNum) {
    var nHoldNum = UTIL.random(Tetris.width);
    //Y���� ��ĭ�� ����
    for (var i = 0; i < nAttackNum; i++) {
      for (var y = 0; y < Tetris.height - 1; y++) {
        for (var x = 0; x < Tetris.width; x++) {
          this.oBlocks[y][x] = this.oBlocks[y + 1][x];
        }
      }
      if (this.checkDie()) this.gameOver();

      //����� ü���
      for (var x = 0; x < Tetris.width; x++) {
        if (nHoldNum == x) this.oBlocks[Tetris.height - 1][x] = 0;
        else this.oBlocks[Tetris.height - 1][x] = Tetris.nBlockBlock + 1;
      }

      //���� ������ ���ƴ��� üũ
      if (!Tetris.isCanMove(this.oBlocks, this.oNowBlock, this.nX, this.nY)) {
        this.nY += -1;
        UTIL.debug("up");
      }
      //������ ���ƴ��� üũ
    }
  },

  isLastDown: function () {
    return !Tetris.isCanMove(
      this.oBlocks,
      this.oNowBlock,
      this.nX,
      this.nY + 1
    );
  },

  checkClearLine: function () {
    var oClearLine = [];
    var nAddScore = 0;
    var nClearY = 0;
    //���� �ʱ�ȭ
    for (var y = 0; y < Tetris.height; y++) {
      var bClear = true;
      for (var x = 0; x < Tetris.width; x++) {
        if (this.oBlocks[y][x] == 0) {
          bClear = false;
          break;
        }
      }

      if (bClear) {
        if (nAddScore == 0) nAddScore = 100;
        else nAddScore *= 2;
        oClearLine.push(y);
        nClearY = y;
      }
    }

    for (var i = 0; i < oClearLine.length; i++) {
      //Y���� ��ĭ�� ������
      for (var y = oClearLine[i]; y >= 1; y--) {
        for (var x = 0; x < Tetris.width; x++) {
          this.oBlocks[y][x] = this.oBlocks[y - 1][x];
        }
      }

      if (oClearLine[i] + 1 < Tetris.height)
        for (var x = 0; x < Tetris.width; x++) {
          if (this.oBlocks[oClearLine[i] + 1][x])
            this.oBlocks[oClearLine[i] + 1][x] =
              this.oBlocks[oClearLine[i] + 1][x] & ~Tetris.B_UPOPEN;
        }
      for (var x = 0; x < Tetris.width; x++) {
        if (this.oBlocks[oClearLine[i]][x])
          this.oBlocks[oClearLine[i]][x] =
            this.oBlocks[oClearLine[i]][x] & ~Tetris.B_BOTTOMOPEN;
      }

      for (var x = 0; x < Tetris.width; x++) {
        this.oBlocks[0][x] = 0;
      }
    }

    if (nClearY) {
      this.nCombo++;
      if (this.nCombo >= 2) {
        var ani1 = new AnmateKeyFrameInfo();
        ani1.repeat = 0;
        ani1.append(
          new AnmateFrame(TetrisUI.numbers.getSlice("combo"), {
            x: Tetris.nBlockX + this.nX * Tetris.nRectSize,
            y: Tetris.nBlockY + this.nY + nClearY * Tetris.nRectSize - 40,
          }),
          8,
          true
        );
        ani1.append(
          new AnmateFrame(TetrisUI.numbers.getSlice("combo"), {
            x: Tetris.nBlockX + this.nX * Tetris.nRectSize,
            y: Tetris.nBlockY + this.nY + nClearY * Tetris.nRectSize - 40,
            alpha: 1,
            xscale: 120,
            yscale: 120,
          }),
          2,
          false
        );
        ani1.handler.setEventListener(
          "endOfFrame",
          function (param, userParam) {
            Anmate.remove(userParam.tar);
          },
          { tar: ani1 }
        );
        Anmate.append(ani1);
        nAddScore *= this.nCombo;

        TetrisUI.sound.combo.play();
      } else TetrisUI.sound.clear.play();
    }

    this.addScore(nAddScore);
    return nAddScore;
  },

  init: function () {
    TetrisUI.init();
    TetrisUI.sound.bg.play();
    this.level = 1;
    //���� �ʱ�ȭ
    for (var y = 0; y < Tetris.height; y++) {
      this.oBlocks.push([]);
      for (var x = 0; x < Tetris.width; x++) {
        this.oBlocks[y][x] = 0;
      }
    }

    for (var i = 0; i < 3; i++) {
      this.anNextBlocks[i] = Tetris.getRandomBlock();
    }

    this.holdCount = 9;
    this.newBlock();
  },

  onEnterFrame: function (oCanvas) {
    if (this.nSpeed <= this.nCount++) {
      this.nCount = 0;
      //���� ������
      if (this.isLastDown()) {
        Tetris.freezeBlock(this.oBlocks, this.oNowBlock, this.nX, this.nY);
        if (this.checkClearLine() == 0) this.nComb = 0;
        this.newBlock();
      } else this.down();
    }
    this.drawUi(oCanvas);
  },

  popPreBlock: function () {
    var nBlockNum = this.anNextBlocks[0];
    for (var i = 0; i < 2; i++) {
      this.anNextBlocks[i] = this.anNextBlocks[i + 1];
    }
    this.anNextBlocks[2] = Tetris.getRandomBlock();

    this.showPreBlocks();
    return nBlockNum;
  },

  newBlock: function () {
    if (this.checkDie()) {
      this.gameOver();
      return;
    }

    this.nX = Tetris.nStartX;
    this.nY = Tetris.nStartY;
    this.nNowBlockNum = this.popPreBlock();
    this.nNowBlockRotate = 0;
    Tetris.getBlock(this.nNowBlockNum, this.nNowBlockRotate, this.oNowBlock);
    this.bHold = true;
  },

  //�ϴܿ��� �̸� ���̰� �ϱ�
  showNowBlockPreview: function (oCanvas) {
    var bDraw = false;
    for (var y = this.nY; y < Tetris.height; y++) {
      if (!Tetris.isCanMove(this.oBlocks, this.oNowBlock, this.nX, y)) {
        break;
      }
    }

    oCanvas.globalAlpha = 0.2;
    Tetris.drawBlock(
      oCanvas,
      this.nX,
      y - 1,
      this.oNowBlock,
      Tetris.nBlockX,
      Tetris.nBlockY
    );
    oCanvas.globalAlpha = 1;
    bDraw = true;
  },

  showPreBlocks: function () {
    for (var i = 0; i < 2; i++) {
      //context.fillStyle = "#0c1524";
      //context.fillRect( (Tetris.width+2)*Tetris.nRectSize + Tetris.nBlockX, i*5*Tetris.nRectSize + Tetris.nBlockY, Tetris.nRectSize*4, Tetris.nRectSize*5 );
      Tetris.getBlock(this.anNextBlocks[i], 0, this.oPreBlock);
      Tetris.drawBlock(
        context,
        Tetris.width + 2,
        i * 5,
        this.oPreBlock,
        Tetris.nBlockX,
        Tetris.nBlockY + 10
      );
    }

    //hold
    context.fillStyle = "#0c1524";
    context.fillRect(
      (Tetris.width + 2) * Tetris.nRectSize + Tetris.nBlockX,
      12 * Tetris.nRectSize + Tetris.nBlockY,
      Tetris.nRectSize * 4,
      Tetris.nRectSize * 5
    );
    if (this.nHoldNum != -1) {
      Tetris.getBlock(this.nHoldNum, 0, this.oPreBlock);
      Tetris.drawBlock(
        context,
        Tetris.width + 2,
        12,
        this.oPreBlock,
        Tetris.nBlockX,
        Tetris.nBlockY + 10
      );
    }
  },

  addScore: function (nScrore) {
    this.score += nScrore;
    for (var i = 0; i < Tetris.levelLine.length; i++) {
      if (this.score < Tetris.levelLine[i]) {
        this.level = i + 1;
        break;
      }
    }

    this.nSpeed = Tetris.levelSpeed[this.level - 1];
  },
  showScore: function (oCanvas) {
    //document.getElementById('score').innerHTML = this.score;
    //document.getElementById('hold').innerHTML = this.holdCount;
    var cnt = 0;
    TetrisUI.numbers.drawSprite(oCanvas, "score", 5, 5);
    for (var i = this.score; true; cnt++) {
      TetrisUI.numbers.drawSprite(oCanvas, "" + (i % 10), 170 - 10 * cnt, 5);
      i = parseInt((i /= 10));
      if (i == 0) break;
    }
  },

  //������ y=0�� ������ ����
  checkDie: function () {
    var bDie = false;
    for (var x = 0; x < Tetris.width; x++) {
      if (this.oBlocks[0][x]) bDie = true;
    }
    return bDie;
  },
  gameOver: function () {
    TetrisUI.sound.bg.pause();
    this.bGameOver = true;
  },

  drawUi: function (oCanvas) {
    TetrisUI.numbers.drawSprite(oCanvas, "back", 0, 0);
    TetrisUI.numbers.drawSprite(oCanvas, "hold", 203, 188);
    TetrisUI.numbers.drawSprite(oCanvas, "" + this.holdCount, 255, 187);

    TetrisUI.numbers.drawSprite(oCanvas, "level", 205, 290);
    TetrisUI.numbers.drawSprite(oCanvas, "" + this.level, 255, 288);

    //oCanvas.fillStyle = "#0c1524";
    //oCanvas.fillRect( Tetris.nBlockX, Tetris.nBlockY, Tetris.nRectSize * Tetris.width, Tetris.nRectSize * Tetris.height  );

    this.showNowBlockPreview(oCanvas);
    Tetris.drawBlock(
      oCanvas,
      this.nX,
      this.nY,
      this.oNowBlock,
      Tetris.nBlockX,
      Tetris.nBlockY
    );
    Tetris.drawFreezeBlock(this.oBlocks);
    this.showScore(oCanvas);
    this.showPreBlocks(oCanvas);

    if (this.bGameOver) {
      oCanvas.fillStyle = "#000";
      oCanvas.globalAlpha = 0.8;
      oCanvas.fillRect(
        Tetris.nBlockX,
        Tetris.nBlockY,
        Tetris.nRectSize * Tetris.width,
        Tetris.nRectSize * Tetris.height
      );
      oCanvas.globalAlpha = 1;
      TetrisUI.numbers.drawSprite(oCanvas, "gameover", 60, 164);
    }
  },
};

var TetrisUI = {
  numbers: new Sprite(new Resource("numbers.png"), {
    0: new SpriteInfo(0, 0, 17, 24), //0
    1: new SpriteInfo(17, 0, 17, 24), //1
    2: new SpriteInfo(34, 0, 17, 24), //2

    3: new SpriteInfo(51, 0, 15, 24), //3
    4: new SpriteInfo(66, 0, 18, 24), //4
    5: new SpriteInfo(84, 0, 16, 24), //5
    6: new SpriteInfo(100, 0, 16, 24), //6

    7: new SpriteInfo(116, 0, 18, 24), //7
    8: new SpriteInfo(132, 0, 16, 24), //8
    9: new SpriteInfo(148, 0, 16, 24), //9

    gameover: new SpriteInfo(123, 24, 100, 21), //score : 60 174

    score: new SpriteInfo(0, 24, 66, 21), //score
    hold: new SpriteInfo(66, 24, 56, 21), //hold

    back: new SpriteInfo(0, 45, 350, 350), //back

    clear: new SpriteInfo(230, 0, 55, 22), //clear
    combo: new SpriteInfo(165, 0, 66, 22), //combo
    level: new SpriteInfo(283, 0, 50, 22), //combo
  }),
  sound: {
    clear: new Audio("sound/clear.wav"),
    down: new Audio("sound/down.wav"),
    rotate: new Audio("sound/rotate.wav"),
    move: new Audio("sound/move.wav"),
    hold: new Audio("sound/hold.wav"),
    combo: new Audio("sound/combo.wav"),
    bg: new Audio("sound/bg.ogg"),
  },

  init: function () {
    for (var key in this.sound) {
      this.sound[key].loop = false;
      this.sound[key].preload = "auto";
      this.sound[key].autoplay = false;
    }
  },
};
