import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  readonly WHITE = false;
  readonly BLACK = true;

  /**
   * Value of the Width input
   * @type {number}
   * @private
   */
  @Input() private _inputWidth = 80;

  /**
   * Width of the grid
   * @type {any[]}
   */
  width = new Array(this._inputWidth);

  /**
   * Getter for the inputWidth
   * @returns {number}
   */
  get inputWidth(): number {
    return this._inputWidth;
  }

  /**
   * Setter for the inputWidth
   * @param value
   */
  set inputWidth(value: number) {
    this._inputWidth = value;
    this.width = new Array(+value);
    this.initGrid();
  }

  /**
   * Value of the height input
   * @type {number}
   * @private
   */
  @Input() private _inputHeight = 50;

  /**
   * Height of the grid
   * @type {any[]}
   */
  height = new Array(this._inputHeight);

  /**
   * Getter for the inputHeight
   * @returns {number}
   */
  get inputHeight(): number {
    return this._inputHeight;
  }

  /**
   * Setter for the inputHeight
   * @param value
   */
  set inputHeight(value: number) {
    this._inputHeight = value;
    this.height = new Array(+value);
    this.initGrid();
  }

  //Ant position
  antPositionX;
  antPositionY;

  readonly NORTH = "NORTH";
  readonly EAST = "EAST";
  readonly SOUTH = "SOUTH";
  readonly WEST = "WEST";

  //Directions
  directions = [this.NORTH,this.EAST,this.SOUTH,this.WEST];

  //Directions
  directionsIndex = {NORTH:0,EAST:1,SOUTH:2,WEST:3};


  //template of the ant
  antTemplate = {NORTH:"▲",EAST:"▶",SOUTH:"▼",WEST:"◀"};

  //current direction of the ant
  antDirection = this.NORTH;

  /**
   *
   * @type {Array}
   */
  grid = [];

  /**
   * Interval of the generations
   * @type interval
   */
  interval;

  /**
   * Index of the current Generation
   * @type number
   */
  indexGeneration = 0;


  constructor() {}

  ngOnInit() {
    this.initGrid();
  }

  /**
   * Initialisation of the grid
   */
  initGrid() {

    this.stop();

    this.antDirection = this.NORTH;
    this.antPositionX = (this.width.length/2) -1;
    this.antPositionY = (this.height.length/2) -1;

    for(var x=0; x< this.width.length; x++){
      for(var y=0; y< this.height.length; y++){
        if (this.grid[x] == null){
          this.grid[x] = []
        }
        this.grid[x][y] = this.WHITE;
      }
    }
  }


  /**
   * Calculate the next direction of the ant
   */
  findNextDirection(){

    if (this.grid[this.antPositionX][this.antPositionY] == this.WHITE){
      if (this.directionsIndex[this.antDirection]==3){
        this.antDirection = this.directions[0];
      }else{
        this.antDirection = this.directions[this.directionsIndex[this.antDirection]+1];
      }
    }else{
      if (this.directionsIndex[this.antDirection]==0){
        this.antDirection = this.directions[3];
      }else{
        this.antDirection = this.directions[this.directionsIndex[this.antDirection]-1];
      }
    }
  }

  /**
   * Calculate the next position of the ant
   */
  findNextPosition() {
    if(this.antDirection == this.WEST){
      this.antPositionX--;
    }
    else if(this.antDirection == this.NORTH){
      this.antPositionY--;
    }
    else if(this.antDirection == this.EAST){
      this.antPositionX++;
    }
    else{
      this.antPositionY++;
    }
  }

  /**
   * Change the color of a cell
   *
   * @param int x
   * @param int y
   * @returns boolean
   */
  changeColor(x,y){
    this.grid[x][y] = !this.grid[x][y];
  }

  /**
   * Move the ant
   */
  moveAntForward(){

    var oldX = this.antPositionX;
    var oldY = this.antPositionY;

    this.findNextDirection();
    this.findNextPosition();

    this.changeColor(oldX,oldY);

    this.indexGeneration++;
  }

  /**
   * True if the cell is black
   *
   * @param x
   * @param y
   * @returns {boolean}
   */
  isCellBlack(x,y){
    return this.grid[x][y];
  }

  /**
   * Returns the character to mark into the cell if the ant is in it
   *
   * @param x
   * @param y
   * @returns {any}
   */
  getAntCharacter(x,y){
    if (x == this.antPositionX && y == this.antPositionY){
      return this.antTemplate[this.antDirection];
    }else{
      return "";
    }
  }


  /**
   * Run the generation
   */
  run() {
    this.stop();
    this.interval = setInterval(() => this.moveAntForward(), 10);

  }

  /**
   * Stop the Interval
   */
  stop(){
    if (this.interval != null){
      clearInterval(this.interval);
    }
    this.indexGeneration = 0;
  }


}
