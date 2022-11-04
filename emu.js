var logo;
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
  pipis_pro[CPU.name].init();
}
function draw() {
  frameRate(pipis_pro[GPU.name].frameRate);
  if(pipis_pro[GPU.name].oldScreen != pipis_pro[RAM.name].readBytes(pipis_pro[GPU.name].screen[0], pipis_pro[GPU.name].screen[1])) pipis_pro[GPU.name].frame();
}
class RAM {
  constructor() {
    this.vendor = "dumpstar elecktronicks co.";
    this.nickname = "dumpstar amillwen dollar wam pwo";
    this.memory = new Array(0xffff);
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
  readBytes(byteA, byteB) {
    return this.memory.slice(byteA, byteB-1);
  }
  writeByte(byteA, byteToA) {
    this.memory[byteA] = byteToA;
  }
  writeBytes(starting, ending, bytes) {
    for(let i = 0; i < (ending-starting); i++) {
      this.writeByte(starting+i, bytes[i]);
    }
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
    for(let cbit = 0; cbit <= (this.screen[1]*8)-(this.screen[0]*8); cbit++) {
      var cbitRead = pipis_pro[RAM.name].readBit(this.screen[0] + parseInt(cbit/8), cbit % 8);
      if(cbitRead) {
        fill(...colorScheme[1]);
        noStroke();
        rect(cbit % width, parseInt(cbit/width), 1, 1);
      }
    }
    this.oldScreen = pipis_pro[RAM.name].readBytes(this.screen[0], this.screen[1]);
  }
}
var opcodes = {
  blankScreen: 0x23,
  logoScreen: 0x24,
  writeBytes: 0x3
  
};
for(ourKey of Object.keys(opcodes)) {
  window[ourKey] = opcodes[ourKey];
}
class CPU {
  constructor(fr) {
    this.vendor = "dumpstar elecktronicks co.";
    this.nickname = "dumpstar c-pee-ew pwo";
  }
  loadROM(rom, data) {
    for(let i = 0; i < rom.length; i++) {
      var currentOpcode = rom[i];
      if(currentOpcode == blankScreen) {
        pipis_pro[RAM.name].writeBytes(pipis_pro[GPU.name].screen[0], pipis_pro[GPU.name].screen[1], ''.padStart(pipis_pro[GPU.name].screen[1]+pipis_pro[GPU.name].screen[0], '0').split('').map(parseInt));
      }
      if(currentOpcode == logoScreen) {
        pipis_pro[RAM.name].writeBytes(pipis_pro[GPU.name].screen[0], pipis_pro[GPU.name].screen[1], logo);
      }
    }
  }
  init() {
    this.loadROM([blankScreen ]);
  }
}
