
// launch cmd prompt straight away
var colorScheme = [ [0], [0, 200, 0] ];
window.pipis_pro = {};
function setup() {
  createCanvas(300, 200);
  window.pipis_pro = {
    'GPU': new GPU(16),
    'CPU': new CPU(),
    'RAM': new RAM()
  };
}
function draw() {
  frameRate(pipis_pro[GPU.name].frameRate);
  pipis_pro[GPU.name].frame();
}
class RAM {
  constructor() {
    this.vendor = "dumpstar elecktronicks co.";
    this.nickname = "dumpstar amillwen dollar wam pwo";
    this.memory = new Array[0xffff];
    for(let byte = 0; byte < this.memory.length; byte++) {
      this.memory[byte] = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    }
  }
  readBit(byteA, bitA) {
    return ((this.readByteStrArr(byteA)[bitA] == '0') ? false : true);
  }
  readByte(byteA) {
    return this.memory[byteA];
  }
  readByteStrArr(byteA) {
    return (this.memory[byteA]).toString(2).padStart(8, '0').split('');
  }
  writeByte(byteA, byteToA) {
    this.memory[byteA] = byteToA;
  }
  writeBit(byteA, bitA, bitToA) {
    var strs = this.readByteStrArr(byteA);
    strs[bitA] = bitToA;
    this.memory[byteA] = parseInt(strs.join``, 2);
  }
}
class GPU {
  constructor(fr) {
    this.vendor = "dumpstar elecktronicks co.";
    this.nickname = "dumpstar gp-ew pwo";
    this.screen = [0x1000, 0xfa60];
    this.frameRate = fr;
  }

  frame() {
    background(...colorScheme[0]);
    for(let cbit = 0; cbit <= this.screen[1]*8; cbit++) {
      var cbitRead = pipis_pro[RAM.name].readBit(parseInt(cbit/8), cbit % 8);
      fill(...colorScheme[1]);
      rect(cbit % width, parseInt(cbit/width)); 
    }
  }
}
