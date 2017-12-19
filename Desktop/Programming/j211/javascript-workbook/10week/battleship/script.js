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
    this.drawBlocks = this.drawBlocks.bind(this);
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
      console.log('shiplist test1');
      console.log('ships object: ', ships);
      this.setState({
        Ships1: ships
      });
      console.log('after "this.shipList(1)" this.state.Ships1:', this.state.Ships1);
    } else if (player === 2) {
      this.setState({
        Ships2: ships
      });
    }
  };

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

  drawBoard(){
    this.createGrid();
    console.log('drawboard test 1');
    if (this.state.grid.length > 0){
      let board = [];
      let boardGrid = this.state.grid;
      for (var r=0; r<this.state.grid.length; r++){
        let gridRow = r;
        let rowNum = r+1;
        let vacantArr = [];
        let row = <div className="row" id='row' key={rowNum} data-row={rowNum}>{this.drawBlocks(vacantArr, gridRow)}</div>;
        board.push(row);
      }
      console.log('newRows after for loop: ',board);
      return board
    }
  }

  drawBlocks(arr,thisRow){
    let gridRowNum = Number(thisRow);
    // console.log('test1');
    // console.log('this.state.grid: ', this.state.grid)
    let blocks = [1,2,3,4,5,6,7,8,9,10];
    for (var c=0; c<10; c++) {
      // let content = this.state.grid[gridRow][c];
      // console.log('content: ',content);
      let gridCol = c;
      let colNum = c+1
      let block = <div key={colNum} data-block={colNum} data-row={rowNum} id="block">{this.state.grid[gridRowNum][gridCol]}</div>
      // console.log('block: ', block);
      arr.push(block);
    }
    // console.log('result:: ', arr);
    return arr;
    // blocks.map((block, index) =>{
    //   return <div key={index} data-block={block}>test{index}</div>;
    // })
  }

  // drawRows(){
  //   // if (this.state.board === null) {
  //   let newRows = [];
  //   // creates a 10x10 board filled with null values
  //   for (var r= 1; r<11; r++) {
  //     let rowNum = r;
  //     let gridRow = r-1
  //     let vacantArr = [];
  //     let rowID = "Row "+r;
  //     let row = <div className="row" id='row' key={rowNum} data-row={rowNum}>{rowID}{this.drawBlocks(vacantArr, gridRow)}</div>;
  //     newRows.push(row);
  //   }
  //   console.log('newRows after for loop: ',newRows);
  //   return newRows
  // }

  startGame(){
    console.log('testStart');
    document.getElementById('board').push(this.drawBoard());

    console.log('testEnd');
  }


  drawRows() {
    var board = document.getElementById('board');
    var newRow = document.createElement("div");
    newRow.innerHTML = "new Row"
    board.appendChild(newRow);
  }

  drawBlocks(arr,thisRow){
    let gridRow = Number(thisRow);
    // console.log('test1');
    // console.log('this.state.grid: ', this.state.grid)
    let blocks = [1,2,3,4,5,6,7,8,9,10];
    for (var c=0; c<10; c++) {
      // let content = this.state.grid[gridRow][c];
      // console.log('content: ',content);
      let blockIndex = c+1
      let block = <div key={blockIndex} data-block={blockIndex} id="block">{blockIndex}</div>
      // console.log('block: ', block);
      arr.push(block);
    }
    // console.log('result:: ', arr);
    return arr;
    // blocks.map((block, index) =>{
    //   return <div key={index} data-block={block}>test{index}</div>;
    // })
  }



// viewBoard(){
//
// }

  render() {
    return(
    <div id='game'>
      <div  id='board'>
      </div>
      <button onClick={this.startGame}>Start</button>
    </div>
    )
  }
}


  ReactDOM.render(<Battleship />, document.getElementById('react'));
