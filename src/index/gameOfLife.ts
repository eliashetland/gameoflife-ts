import { ICoordinate } from "./ICoordinate";


export class gameOfLife {

    private grid: boolean[][] =[];
    private gridTrue: ICoordinate[]=[];
    private size: number;

    constructor(size:number, initProb:number) {
        this.size = size;
        for (let y = 0; y < size; y++) {
            const row: boolean[] = [];
            for (let x = 0; x < size; x++) {
                const randomTrueOrFalse: boolean = Math.random()<initProb;
                row.push(randomTrueOrFalse);
                if (randomTrueOrFalse) {
                    this.gridTrue.push(this.createCord(x,y));
                }
            }            
            this.grid.push(row);
        }

    }

    private createCord(xCord: number, yCord:number): ICoordinate {
        return {x: xCord, y:yCord}
    }


    public nextIteration(){
        const newGrid: boolean[][] = [];
        const newGridTrue: ICoordinate[]=[]; 
        
    
        for (let y = 0; y < this.size; y++) {
            const row: boolean[] = [];
            for (let x = 0; x < this.size; x++) {
                const trueOrFalse = this.checkNeighboors(this.createCord(x,y));
                
                row.push(trueOrFalse);
                if (trueOrFalse) {
                    newGridTrue.push(this.createCord(x,y));
                }
            }
            newGrid.push(row);            
        }
        console.log(this.gridTrue);
        
        
        this.grid = newGrid;
        this.gridTrue = newGridTrue;
        
    }

    private checkNeighboors(cord:ICoordinate):boolean{
        const count = this.countLiveNeighboors(cord);
        
        if (this.grid[cord.y][cord.x]) {
            return count == 2 || count == 3;
        }
        return count == 3;
    }

    private countLiveNeighboors(cord:ICoordinate):number{
        let count:number = 0;

        for (let yOff = -1; yOff <= 1; yOff++) {
            for (let xOff = -1; xOff <= 1; xOff++) {
                if (!(cord.x+xOff>=this.size || cord.x+xOff<0 || cord.y+yOff>=this.size || cord.y+yOff<0)) {
                    if (this.grid[cord.y+yOff][cord.x+xOff]) {
                        count += 1;
                    }
                }
                
            }            
        }
        if (this.grid[cord.y][cord.x]) {
            count-=1;
        }
        
        return count;
    }
    
    public getTrueCords(){
        return this.gridTrue;
    }
}