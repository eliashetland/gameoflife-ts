import geID from "../util/HtmlHelper";
import { ICoordinate } from "./ICoordinate";
import { gameOfLife } from "./gameOfLife";



const canvas = geID<HTMLCanvasElement>("canvas");
const context = canvas.getContext("2d");
if (context) {
    context.fillStyle = "black";
}
const cw = canvas.width;
const ch = canvas.height;
const s:number = 200;
const blockW = cw/s;
const blockH = ch/s;

const game = new gameOfLife(s, 0.4);



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