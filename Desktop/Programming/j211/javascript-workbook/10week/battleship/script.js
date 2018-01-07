'use strict'

class Battleship extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: undefined,
      players: ["player1", "player2"],
      Ships1: undefined,
      Ships2: undefined,
      occupied1:[],
      occupied2: [],
      turn: undefined,
      status: undefined
    }
    this.startGame = this.startGame.bind(this);
    this.generateLocations = this.generateLocations.bind(this);
    this.playerSelect = this.playerSelect.bind(this);
    this.occupiedList = this.occupiedList.bind(this);
    this.updateShips = this.updateShips.bind(this);
    this.turnCounter = this.turnCounter.bind(this);
    this.userDisplay = this.userDisplay.bind(this);
    this.missle = this.missle.bind(this);
    this.checkStrike = this.checkStrike.bind(this);
    this.shipHit = this.shipHit.bind(this);
    this.removeLoc = this.removeLoc.bind(this);
    this.updateShip = this.updateShip.bind(this);
    this.rowMin = this.rowMin.bind(this);
    this.rowMax = this.rowMax.bind(this);
  }

  rowMin(location){
    for (var r=0; r<10;r++){
      let rowArray = this.state.grid[r];
      let rowMin = rowArray[0];
      if (rowArray.includes(location) === true) {
        return rowArray[0];
      }
    }
  }

  rowMax(location){
    for (var r=0; r<10;r++){
      let rowArray = this.state.grid[r];
      let rowMax = rowArray[9];
      if (rowArray.includes(location) === true) {
        return rowArray[9];
      }
    }
  }


  componentWillMount() {
    let grid, turn, status;
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
    grid = newGrid;
    this.setState({ grid });
    turn = 0;
    this.setState({turn});
    status = 'start';
    this.setState({status});
    let Ships1 = this.shipList();
    let Ships2 = this.shipList();
    this.setState({Ships1});
    this.setState({Ships2});
  }

  shipList(){
    let ships = [
      {name: "Aircraft Carrier",
        size: 5,
        locations: [],
        hits: []
      },
      {name: "Battleship",
        size: 4,
        locations: [],
        hits: []
      },
      {name: "Submarine",
        size: 3,
        locations: [],
        hits: []
      },
      {name: "Destroyer",
        size: 3,
        locations: [],
        hits: []
      },
      {name: "Patrol Boat",
        size: 2,
        locations: [],
        hits: []
      }];
    return ships;
  }

  startGame(){
    this.generateLocations(1);
    this.generateLocations(2);
    this.state.turn = Math.floor((Math.random() * 2) + 1);
    this.userDisplay();
  }

  componentDidMount(){
    console.log("this.state for componentDidMount: ",this.state)
    // this.drawBoard();
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


  userDisplay(){
    let userTurn = this.state.turn;
    var turnDiv = document.getElementById('playerTurn');
    if (this.state.status === 'start') {
      var newPlayerDiv = document.createElement("div");
      newPlayerDiv.setAttribute("id", "playerDiv");
      newPlayerDiv.innerHTML = "Player's turn:";
      turnDiv.appendChild(newPlayerDiv);
      var currentPlayerDiv = document.createElement("div");
      currentPlayerDiv.setAttribute("id", 'currentPlayer');
      currentPlayerDiv.innerHTML = "Player 1"
      turnDiv.appendChild(currentPlayerDiv);
    } else {
      var updatePlayerDiv = document.getElementById('currentPlayer');
      if (userTurn%2 === 0){
        updatePlayerDiv.innerHTML = "Player 2";
      } else if (userTurn%2 !== 0){
        updatePlayerDiv.innerHTML = "Player 1";
      }
    }
  }

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

  updateShip(user,location) {
    if (user === 'Player 1') {
      var userShip = this.state.Ships1;
      for (var i=0; i<4; i++){
        let thisShipName = userShip[i].name;
        let thisShipLocs = userShip[i].locations;
        let thisShipHits = userShip[i].hits;
        if (thisShipLocs.includes(location) === true){
          let newShipLoc = this.removeLoc(thisShipLocs, location);
          thisShipHits.push(location);
          console.log(user,"'s ",thisShipName,"'s new locations: ",userShip[i]);
          if (thisShipLocs.length === 0) {

          }
        }
      }
    } if (user === 'Player 2') {
      var userShip = this.state.Ships2;
      for (var i=0; i<4; i++){
        let thisShipName = userShip[i].name;
        let thisShipLocs = userShip[i].locations;
        let thisShipHits = userShip[i].hits;
        if (thisShipLocs.includes(location) === true){
          let newShipLoc = this.removeLoc(thisShipLocs, location);
          thisShipHits.push(location);
          console.log(user,"'s ",thisShipName,"'s new locations: ",userShip[i]);
        }
      }
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
      let places, $place, maxSpacesNorth, maxSpacesEast, maxSpacesSouth, maxSpacesWest, posSpacesNorth, posSpacesEast, posSpacesSouth, posSpacesWest, addNew, addNorth, addEast, addSouth, addWest, thisRowEast, rowMax, thisRowWest, rowMin;
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
      // console.log("Testing initial location for ",shipType, " at: ", $initialLocation);
      // if the initial location is already occcupied it restarts
      if (occupied.includes($initialLocation) === false){
        // if that space is empty the code continues. Here the code breaks up into directions that are returned by the dirGen function
        places=[];

        // north direction(1)
        if ($direction === 1 && maxSpacesNorth > 0) {
          // console.log("direction is North");
          // if (maxSpacesNorth > 0){
          maxSpacesNorth = ($initialLocation - ((shipSize-1)*10));
          posSpacesNorth = [];
          addNew = [];
          for (var s=0;s<shipSize;s++) {
            $place = $initialLocation-(s*10);
            if (occupied.includes($place) === false){
              posSpacesNorth.push($place);
            }
          }
          // console.log("length of posSpaces: "+posSpacesNorth.length+ ". length of ship: "+shipSize);
          if (posSpacesNorth.length===shipSize){
            for (var p=0;p<posSpacesNorth.length;p++){
              addNorth= posSpacesNorth[p];
              addNew= addNorth;
              occupied.push(addNorth);
              shipLocs.push(addNew);
            }
            // console.log("It fits, current occupied spaces: "+occupied +'length: '+ occupied.length);
          }else if (posSpacesNorth.length<shipSize || (maxSpacesNorth < 0) ) {
            i=i-1;
            // console.log("Will not fit, initial location removed");
          }
        }else if (maxSpacesNorth < 0)  {
          i=i-1;
          // console.log("Will not fit, initial location removed");
        }

        // East direction (2)
        else if ($direction === 2) {
          rowMax = this.rowMax($initialLocation);
          if (maxSpacesEast <= rowMax && (maxSpacesEast < 101)) {
            // console.log("Seeing if ship fits");
            posSpacesEast = [];
            addNew = [];
            // console.log("length of posSpaces: "+posSpacesEast.length+ ". length of ship: "+shipSize);
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
              }
              // console.log("It fits, current occupied spaces: "+occupied +'length: '+ occupied.length);
            } else {
              i=i-1;
              // console.log("Will not fit, initial location removed");
            }
          } else {
            i=i-1;
            // console.log("Will not fit, initial location removed");
          }
        }
        // south direction (3)
        else if ($direction === 3 && maxSpacesSouth < 101) {
          // console.log("direction is South");
          posSpacesSouth = [];
          addNew = [];
          for (var s=0;s<shipSize;s++) {
            $place = $initialLocation+(s*10);
            if (occupied.includes($place) === false){
              posSpacesSouth.push($place);
            }
          }
          // console.log("length of posSpaces: "+posSpacesSouth.length+ ". length of ship: "+shipSize);
          if (posSpacesSouth.length===shipSize){
            for (var p=0;p<posSpacesSouth.length;p++){
              addSouth= posSpacesSouth[p];
              addNew= addSouth;
              occupied.push(addSouth);
              shipLocs.push(addNew);
            }
            // console.log("It fits, current occupied spaces: "+occupied +'length: '+ occupied.length);
          }else if (posSpacesSouth.length!==shipSize || (maxSpacesSouth > 100) ) {
            i=i-1;
            // console.log("Will not fit, initial location removed");
          }
        }

        // West direction (4)
        else if ($direction == 4) {
          rowMin = this.rowMin($initialLocation);
          if (maxSpacesWest < rowMin || maxSpacesWest < 0) {
            i=i-1;
            // console.log("Will not fit, initial location removed");
          }else if (maxSpacesWest >= rowMin) {
            posSpacesWest = [];
            addNew = [];
            for (var s=0;s<shipSize;s++) {
              $place = $initialLocation-s;
              if (occupied.includes($place) === false){
                posSpacesWest.push($place);
              }
              // console.log("length of posSpaces: "+posSpacesWest.length+ ". length of ship: "+shipSize);
            }
            if (posSpacesWest.length===shipSize){
              for (var p=0;p<posSpacesWest.length;p++){
                addWest= posSpacesWest[p];
                addNew= addWest;
                occupied.push(addWest);
                shipLocs.push(addNew);
              }
              // console.log("It fits, current occupied spaces: "+occupied +'length: '+ occupied.length);
            }else {
              i=i-1;
              // console.log("Will not fit, initial location removed");
            }
          }
        }else {
          i=i-1;
          // console.log("Will not fit, initial location removed");
        }

      }else {
        i=i-1;
        // console.log("space occupied, initial location removed");
      }
    };
    console.log("loop completed, user/Ships: ", user);
    console.log("loop completed, occupied: ", occupied);
    // console.log("testing this.state before updateShips: ", this.state);
    // this.updateShips(input,user,occupied);


      // console.log("for player1's ", shipType, " it has a size of ", shipSize, " at locations: ", shipLocs);
  }


//determines the direction the ship will attempt to set from $initialLocation
  dirGen() {
    let $direction = Math.floor((Math.random() * 4) + 1);
    // if ($direction === 1) {
    //   console.log("the direction is North");
    // } else if ($direction === 2) {
    //   console.log("the direction is East");
    // } else if ($direction === 3) {
    //   console.log("the direction is South");
    // } else if ($direction === 4) {
    //   console.log("the direction is West");
    // }
    return $direction;
  };

  removeLoc(arr,loc){
    let locIndex = arr.indexOf(loc);
    let spliced = arr.splice(locIndex,1);
    return arr;
  }

// searchShips(userShips,hit) {
//
// }

  shipHit(hit, userHit,playerLocs){
    let newOccupied = this.removeLoc(playerLocs,hit);
    this.updateShip(userHit, hit);
    console.log('occupied after hit: ',newOccupied);
  }

  checkStrike(user, guess){
    if (user === 'Player 1') {
      let player2Locs = this.state.occupied2;
      if (player2Locs.includes(guess) === true){
        console.log(user +'has hit his opponents ship!');
        this.shipHit(guess,'Player 2', player2Locs);
      } else {
        console.log(user +' has missed!');
      }
    } else if (user === 'Player 2') {
      let player1Locs = this.state.occupied1;
      if (player1Locs.includes(guess) === true){
        console.log(user+' has hit his opponents ship!');
        this.shipHit(guess,'Player 1', player1Locs);
      } else {
        console.log(user+' has missed!');
      }
    }
  }

  missle(event){
    this.state.status = 'playing';
    let dataBlockNum = event.target.getAttribute("data-block");
    let guess = Number(dataBlockNum);
    if (this.state.turn> 0){
      this.state.turn++;
      var getUser = document.getElementById('currentPlayer').innerHTML;
      this.checkStrike(getUser, guess);
    } else {
      alert('press the start button to play!')
    }
    this.userDisplay();
  }

  render() {
    return(
    <div id='game'>
      <div id='playerTurn' className='row'></div>
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
      <div  id='board' className="col">{
        this.state.grid.map((row, index)=> {
          var rowArray = row;
          var rowNum = index+1;
          var rowID = 'row'+rowNum;
          const newBlock = rowArray.map((block,key) =>{
            return <div id='block' data-block={block} key={key} onClick={this.missle} >{block}</div>
          });
          return <div key={index} className='row'>{newBlock}</div>
        })
      }
    </div>
      <button id='start' onClick={this.startGame}>Start</button>
    </div>
    )
}
}


  ReactDOM.render(<Battleship />, document.getElementById('react'));
