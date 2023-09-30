import geID from "../util/HtmlHelper";
import { ICoordinate } from "./ICoordinate";
import { gameOfLife } from "./gameOfLife";


const canvas = geID<HTMLCanvasElement>("canvas");


//canvas setup
const context = canvas.getContext("2d");
if (context) {
    context.fillStyle = "black";
}

//Sliders
const rangeSize = geID<HTMLInputElement>("rangeSize");
const rangeInit = geID<HTMLInputElement>("rangeInit");
const sizeVal = geID<HTMLParagraphElement>("sizeVal");
const initVal = geID<HTMLParagraphElement>("initVal");
sizeVal.innerText = rangeSize.value;
initVal.innerText = rangeInit.value;
rangeSize.oninput = ()=>{sizeVal.innerText = rangeSize.value.length==2?"0"+rangeSize.value:rangeSize.value};
rangeInit.oninput = ()=>{initVal.innerText = rangeInit.value};

const cw = canvas.width;
const ch = canvas.height;
let blockW:number;
let blockH:number;

//restart
const restartbtn = geID<HTMLButtonElement>("restart");
restartbtn.onclick = restart;

let game:gameOfLife;

function restart(){
    game = new gameOfLife(parseInt(rangeSize.value), parseInt(rangeInit.value)/100);
    blockW = cw/parseInt(rangeSize.value);
    blockH = ch/parseInt(rangeSize.value);
}

function clearCanvas(){
    context?.clearRect(0,0,cw, ch);
}


function update() {
    game.nextIteration();
}

function drawIteration(){
    const grid = game.getTrueCords();
    
    for (let i = 0; i < grid.length; i++) {
        const cord:ICoordinate = grid[i];
        context?.fillRect(cord.x*blockW, cord.y*blockH, blockW, blockH);
        
    }
}





let lastTimestamp:number = 0;
const msPerFram:number = 50;

restart();

function animationLoop(timestamp: number) {
    const deltaTime:number = timestamp-lastTimestamp;
    if (deltaTime>=msPerFram) {
        clearCanvas();
        update();
        drawIteration();
        
        lastTimestamp = timestamp;
    }

    requestAnimationFrame(animationLoop);
}
  
// Start the animation loop
requestAnimationFrame(animationLoop);