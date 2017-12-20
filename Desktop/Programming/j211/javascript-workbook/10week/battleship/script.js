'use strict'

class Battleship extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      players: ["player1", "player2"],
      Ships1: [],
      Ships2: [],
      occupied1:[],
      occupied2: []
    }
    this.shipList = this.shipList.bind(this);
    this.startGame = this.startGame.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.drawBoard = this.drawBoard.bind(this);
    this.drawRow = this.drawRow.bind(this);
    this.drawBlocks = this.drawBlocks.bind(this);
    this.generateLocations = this.generateLocations.bind(this);
    this.playerSelect = this.playerSelect.bind(this);
  }

  shipList(player){
    const ships = [
      {name: "Aircraft Carrier",
      size: 5,
      locations: [],
      hits: ["", ""]
    },
      {name: "Battleship",
      size: 4,
      locations: [],
      hits: ["", ""]
    },
      {name: "Submarine",
      size: 3,
      locations: [],
      hits: ["", ""]
    },
      {name: "Destroyer",
      size: 3,
      locations: [],
      hits: ["", ""]
    },
      {name: "Patrol Boat",
      size: 2,
      locations: [],
      hits: ["", ""]
    }];
    if (player === 1) {
      const newState = {
        Ships1: ships
      }
      this.setState(newState);
    } else if (player === 2) {
      const newState = {
        Ships2: ships
      }
      this.setState(newState);
    }
  };
  playerSelect(input){
    if (input === 1) {
      console.log("locTest1");
      let player= this.state.Ships1;
      return player;
    } else if (input === 2) {
      let player = this.state.Ships2;
      return player;
    }
  }
  generateLocations(input){
    var user = this.playerSelect(input);
    for (var s=0; s<user.length; s++){
      let shipType = user[s].name;
      let shipSize = user[s].size;
      let shipLocs = user[s].locations;
      console.log("for player1's ", shipType, " it has a size of ", shipSize, " at locations: ", shipLocs);
    }
  }

  dirGen() {
    let $direction = Math.floor((Math.random() * 4) + 1);
    return $direction;
  };

  createGrid() {
    var row1=[1,2,3,4,5,6,7,8,9,10];
    var row2=[11,12,13,14,15,16,17,18,19,20];
    var row3=[21,22,23,24,25,26,27,28,29,30];
    var row4=[31,32,33,34,35,36,37,38,39,40];
    var row5=[41,42,43,44,45,46,47,48,49,50];
    var row6=[51,52,53,54,55,56,57,58,59,60];
    var row7=[61,62,63,64,65,66,67,68,69,70];
    var row8=[71,72,73,74,75,76,77,78,79,80];
    var row9=[81,82,83,84,85,86,87,88,89,90];
    var row10=[91,92,93,94,95,96,97,98,99,100];
    var newGrid=[row1,row2,row3,row4,row5,row6,row7,row8,row9,row10];
    console.log('grid: ', newGrid);
    console.log('grid.length: ', newGrid.length);
    const newState = {
      grid: newGrid
    }
    this.setState(newState);
  }

  startGame(){
    this.createGrid();
    this.drawBoard();
    this.shipList(1);
    this.shipList(2);
    this.generateLocations(1);
    // this.drawBoard();
  }

  drawBoard(){
    console.log('test 2 for this.state.grid: ', this.state.grid);
    console.log('drawboard test 1');
    if (this.state.grid.length > 0){
      console.log('drawboard test 2')
      let boardGrid = this.state.grid;
      for (var r=0; r<this.state.grid.length; r++){
        let gridRow = r;
        let rowNum = r+1;
        this.drawRow(rowNum);
      }
      console.log('newRows after for loop: ',board);
      return board
    }
  }

  drawRow(rowNum) {
    var board = document.getElementById('board');
    var newRow = document.createElement("div");
    var rowID = "row"+rowNum;
    newRow.setAttribute("data-row", rowNum);
    newRow.setAttribute("class", "row");
    newRow.setAttribute("id", rowID);
    board.appendChild(newRow);
    for (var c=0; c<10; c++) {
      this.drawBlocks(rowNum,rowID,c);
    }
  }

  drawBlocks(rowNum,rowID,col){
    let gridRowNum = Number(rowNum-1);
    var gridRow = document.getElementById(rowID);
    let gridCol = Number(col);
    let colNum = gridCol+1;
    let cellNum = this.state.grid[gridRowNum][gridCol];
    var newBlock = document.createElement("div");
    newBlock.setAttribute("data-col", colNum);
    newBlock.innerHTML = cellNum;
    gridRow.appendChild(newBlock);
  }

  render() {
    return(
    <div id='game'>
      <div  id='board' className="col">
      </div>
      <button onClick={this.startGame}>Start</button>
    </div>
    )
  }
}


  ReactDOM.render(<Battleship />, document.getElementById('react'));
