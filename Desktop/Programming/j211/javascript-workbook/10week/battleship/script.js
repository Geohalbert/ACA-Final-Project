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
      occupied2: [],
      turn: 0
    }
    this.shipList = this.shipList.bind(this);
    this.startGame = this.startGame.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.drawBoard = this.drawBoard.bind(this);
    this.drawRow = this.drawRow.bind(this);
    this.drawBlocks = this.drawBlocks.bind(this);
    this.generateLocations = this.generateLocations.bind(this);
    this.playerSelect = this.playerSelect.bind(this);
    this.occupiedList = this.occupiedList.bind(this);
    this.updateShips = this.updateShips.bind(this);
    this.turnCounter = this.turnCounter.bind(this);
  }

  turnCounter(){
    console.log("turnCounter test1");
    let turn = this.state.turn;
    var newturn= turn++;
    console.log("turnCounter test2 - turn: ", turn);
    if (turn%2 === 0){
      console.log("turnCounter test3");
      console.log("turnCounter test4");
      const newState = {
        turn: newturn
      }
      this.setState(newState);
      return this.state.players[0];
    }

    }
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
      let player= this.state.Ships1;
      return player;
    } else if (input === 2) {
      let player = this.state.Ships2;
      return player;
    }
  }
  occupiedList(input){
    if (input === 1) {
      let occupied= this.state.occupied1;
      return occupied;
    } else if (input === 2) {
      let occupied = this.state.occupied2;
      return occupied;
    }
  }

  updateShips(input,user,occupied){
    if (input === 1) {
      const newShips1 = {
        Ships1: user,
        occupied1: occupied
      }
      this.setState(newShips1);
    } else if (input === 2) {
      const newState = {
        Ships2: user,
        occupied2: occupied
      }
      this.setState(newState);
    }
  }

  generateLocations(input){
    var user = this.playerSelect(input);
    var occupied = this.occupiedList(input);
    for (var i=0; i<user.length; i++){
      //assigning variables for rest of function
      let places, $place, maxSpacesNorth, maxSpacesEast, maxSpacesSouth, maxSpacesWest, posSpacesNorth, posSpacesEast, posSpacesSouth, posSpacesWest, addNew, addNorth, addEast, addSouth, addWest, thisRowEast, thisRowMax, thisRowWest, thisRowMin;
      let shipType = user[i].name;
      let shipSize = user[i].size;
      let shipLocs = user[i].locations;
      let shipHits = user[i].hits;
      let $initialLocation = Math.floor((Math.random() * 100) + 1);
      maxSpacesNorth = ($initialLocation - ((shipSize-1)*10));
      maxSpacesSouth = ($initialLocation + ((shipSize-1)*10));
      maxSpacesWest = ($initialLocation - (shipSize-1));
      maxSpacesEast = ($initialLocation + shipSize-1);
      let $direction = this.dirGen();
      console.log("Testing initial location for ",shipType, " at: ", $initialLocation);
      // if the initial location is already occcupied it restarts
      if (occupied.includes($initialLocation) === false){
        // if that space is empty the code continues. Here the code breaks up into directions that are returned by the dirGen function
        places=[];

// north direction(1)
if ($direction === 1 && maxSpacesNorth > 0) {
  console.log("direction is North");
  // if (maxSpacesNorth > 0){
  maxSpacesNorth = ($initialLocation - ((shipSize-1)*10));
  posSpacesNorth = [];
  addNew = [];
  for (var s=0;s<shipSize;s++) {
    $place = $initialLocation-(s*10);
    if (occupied.includes($place) === false){
      posSpacesNorth.push($place);
      }
    }console.log("length of posSpaces: "+posSpacesNorth.length+ ". length of ship: "+shipSize);
    if (posSpacesNorth.length===shipSize){
      for (var p=0;p<posSpacesNorth.length;p++){
        addNorth= posSpacesNorth[p];
        addNew= addNorth;
        occupied.push(addNorth);
        shipLocs.push(addNew);
      }console.log("It fits, current occupied spaces: "+occupied +'length: '+ occupied.length);
    }else if (posSpacesNorth.length<shipSize || (maxSpacesNorth < 0) ) {
      i=i-1;
      console.log("Will not fit, initial location removed");
      }
    }else if (maxSpacesNorth < 0)  {
      i=i-1;
      console.log("Will not fit, initial location removed");
      }

  // East direction (2)
        else if ($direction === 2) {
          console.log("direction is East");
          thisRowEast = parseInt($initialLocation/10)+1;
          if ($initialLocation%10 === 0) {
            thisRowMax = (thisRowEast*10);
            console.log("the row is " +thisRowEast);
          }else if (($initialLocation%10 !== 0)) {
            console.log("the row is " +thisRowEast);
            thisRowMax = (thisRowEast*10)+10;
          }
          if (maxSpacesEast <= thisRowMax && (maxSpacesEast < 101)) {
            console.log("Seeing if ship fits");
            posSpacesEast = [];
            addNew = [];
            console.log("length of posSpaces: "+posSpacesEast.length+ ". length of ship: "+shipSize);
            for (var s=0;s<shipSize;s++) {
              $place = $initialLocation+s;
              if (occupied.includes($place) === false){
                posSpacesEast.push($place);
              }
            }if (posSpacesEast.length===shipSize){
                  for (var p=0;p<posSpacesEast.length;p++){
                    addEast= posSpacesEast[p];
                    addNew= addEast;
                    occupied.push(addEast);
                    shipLocs.push(addNew);
                  }console.log("It fits, current occupied spaces: "+occupied +'length: '+ occupied.length);
            } else {
                    i=i-1;
                    console.log("Will not fit, initial location removed");
                    }
                  } else {
                          i=i-1;
                          console.log("Will not fit, initial location removed");
                        }
                }
  // south direction (3)
        else if ($direction === 3 && maxSpacesSouth < 101) {
          console.log("direction is South");
          posSpacesSouth = [];
          addNew = [];
          for (var s=0;s<shipSize;s++) {
            $place = $initialLocation+(s*10);
            if (occupied.includes($place) === false){
              posSpacesSouth.push($place);
              }
          }console.log("length of posSpaces: "+posSpacesSouth.length+ ". length of ship: "+shipSize);
          if (posSpacesSouth.length===shipSize){
            for (var p=0;p<posSpacesSouth.length;p++){
              addSouth= posSpacesSouth[p];
              addNew= addSouth;
              occupied.push(addSouth);
              shipLocs.push(addNew);
            }console.log("It fits, current occupied spaces: "+occupied +'length: '+ occupied.length);
          }else if (posSpacesSouth.length!==shipSize || (maxSpacesSouth > 100) ) {
              i=i-1;
              console.log("Will not fit, initial location removed");
            }
          }

  // West direction (4)
        else if ($direction == 4) {
          console.log("direction is West");
          thisRowWest = parseInt($initialLocation/10);
          if (thisRowWest === 0) {
            thisRowWest === 1;
          }else if (thisRowWest !== 0) {
            thisRowWest = parseInt($initialLocation/10)+1;
          }
          console.log("the row is " +thisRowWest);
          thisRowMin = ((thisRowWest*10)-9);
          if (maxSpacesWest < thisRowMin || maxSpacesWest < 0) {
            i=i-1;
            console.log("Will not fit, initial location removed");
          }else if (maxSpacesWest >= thisRowMin) {
            posSpacesWest = [];
            addNew = [];
            for (var s=0;s<shipSize;s++) {
              $place = $initialLocation-s;
              if (occupied.includes($place) === false){
                posSpacesWest.push($place);
              }console.log("length of posSpaces: "+posSpacesWest.length+ ". length of ship: "+shipSize);
            }
              if (posSpacesWest.length===shipSize){
                for (var p=0;p<posSpacesWest.length;p++){
                addWest= posSpacesWest[p];
                addNew= addWest;
                occupied.push(addWest);
                shipLocs.push(addNew);
              }console.log("It fits, current occupied spaces: "+occupied +'length: '+ occupied.length);
              }else {
                i=i-1;
                console.log("Will not fit, initial location removed");
              }
            }
          }else {
            i=i-1;
            console.log("Will not fit, initial location removed");
          }

      }else {
        i=i-1;
        console.log("space occupied, initial location removed");
      }
    };
    console.log("loop completed, user/Ships: ", user);
    console.log("loop completed, occupied: ", occupied);
    console.log("testing this.state before updateShips: ", this.state);
    // this.updateShips(input,user,occupied);


      // console.log("for player1's ", shipType, " it has a size of ", shipSize, " at locations: ", shipLocs);
  }


//determines the direction the ship will attempt to set from $initialLocation
  dirGen() {
    let $direction = Math.floor((Math.random() * 4) + 1);
    if ($direction === 1) {
      console.log("the direction is North");
    } else if ($direction === 2) {
      console.log("the direction is East");
    } else if ($direction === 3) {
      console.log("the direction is South");
    } else if ($direction === 4) {
      console.log("the direction is West");
    }
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
    this.generateLocations(2);
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
      <div id='ships'>
        <div id='player1ships'>
          <div>Player 1: </div>
          <div className='activeship'>Carrier</div>
          <div className='activeship'>Battleship</div>
          <div className='activeship'>Submarine</div>
          <div className='activeship'>Destroyer</div>
          <div className='activeship'>Patrol Boat</div>
        </div>
        <div id='player2ships'>
          <div>Player 2: </div>
          <div className='activeship'>Carrier</div>
          <div className='activeship'>Battleship</div>
          <div className='activeship'>Submarine</div>
          <div className='activeship'>Destroyer</div>
          <div className='activeship'>Patrol Boat</div>
        </div>
      </div>
      <div  id='board' className="col">
      </div>
      <button onClick={this.startGame}>Start</button>
    </div>
    )
  }
}


  ReactDOM.render(<Battleship />, document.getElementById('react'));
