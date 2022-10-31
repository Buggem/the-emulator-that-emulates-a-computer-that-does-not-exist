
// launch cmd prompt straight away
var colorScheme = [ [0, 0, 0], [0, 200, 0] ];
var pipis_pro = {
  'GPU': new GPU(16),
  'CPU': new CPU(),
  'RAM': new RAM()
};
function draw() {
  frameRate(pipis_pro[GPU.name].frameRate);
}
class RAM {
  constructor() {
    this.vendor = "dumpstar elecktronicks co.";
    this.nickname = "dumpstar amillwen dollar wam pwo";
    this.memory = new Array[0xffff];
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
    for(let cbit = 0; cbit <= this.screen[1]*8; cbit++) {
      var cbitRead = pipis_pro[RAM.name].readBit()
    }
  }
}
