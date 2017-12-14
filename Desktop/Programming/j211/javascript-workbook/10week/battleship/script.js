'use strict'

class Battleship extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      Ships: [],
      quakes: [],
      filter: [],
      lessThan: [],
      greaterThan: [],
      total: null,
      average: null,
      stdDev: null,
      bins: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
    // this.createGrid = this.createGrid.bind(this);
    this.drawRows = this.drawRows.bind(this);
    this.drawBlocks = this.drawBlocks.bind(this);
  }

componentWillMount() {
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
  this.setState({
    grid: newGrid
  });
  console.log('this.state.grid: ', this.state.grid);
}

drawRows(){
  // if (this.state.board === null) {
    let newRows = [];
    // creates a 10x10 board filled with null values
    for (var r= 1; r<11; r++) {
      let rowNum = r;
      let gridRow = r-1
      let vacantArr = [];
      let rowID = "Row "+r;
      let row = <div className="row" id='row' key={rowNum} data-row={rowNum}>{rowID}{this.drawBlocks(vacantArr, gridRow)}</div>;
      newRows.push(row);
    }
    console.log('newRows after for loop: ',newRows);
    return newRows
  }

drawBlocks(arr,thisRow){
  let gridRow = Number(thisRow);
  console.log('test1');
  let blocks = [1,2,3,4,5,6,7,8,9,10];
  for (var c=0; c<10; c++) {
    let content = this.state.grid[gridRow][c];
    let blockIndex = c+1
    let block = <div key={blockIndex} data-block={blockIndex} id="block">{content}</div>
    console.log('block: ', block);
    arr.push(block);
  }
  console.log('result:: ', arr);
  return arr;
  // blocks.map((block, index) =>{
  //   return <div key={index} data-block={block}>test{index}</div>;
  // })
}



// viewBoard(){
//
// }

  render() {
    // this.createGrid();
    return(
      <div  id='board'>
        {/* <div className="columns">
          <div className= "row">
            <div> </div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>D</div>
            <div>E</div>
            <div>F</div>
            <div>G</div>
            <div>H</div>
            <div>I</div>
            <div>J</div>
          </div>
          <div className= "row">
            <div>1</div>
            <div id="1 colA row1" className="empty">1</div>
            <div id="2 colB row1" className="empty">2</div>
            <div id="3 colC row1" className="empty">3</div>
            <div id="4 colD row1" className="empty">4</div>
            <div id="5 colE row1" className="empty">5</div>
            <div id="6 colF row1" className="empty">6</div>
            <div id="7 colG row1" className="empty">7</div>
            <div id="8 colH row1" className="empty">8</div>
            <div id="9 colI row1" className="empty">9</div>
            <div id="10 colJ row1" className="empty">10</div>
          </div>
          <div className= "row">
            <div>2</div>
            <div id="11 colA row2" className="empty">11</div>
            <div id="12 colB row2" className="empty">12</div>
            <div id="13 colC row2" className="empty">13</div>
            <div id="14 colD row2" className="empty">14</div>
            <div id="15 colE row2" className="empty">15</div>
            <div id="16 colF row2" className="empty">16</div>
            <div id="17 colG row2" className="empty">17</div>
            <div id="18 colH row2" className="empty">18</div>
            <div id="19 colI row2" className="empty">19</div>
            <div id="20 colJ row2" className="empty">20</div>
          </div>
          <div className= "row">
            <div>3</div>
            <div id="21 colA row3" className="empty">21</div>
            <div id="22 colB row3" className="empty">22</div>
            <div id="23 colC row3" className="empty">23</div>
            <div id="24 colD row3" className="empty">24</div>
            <div id="25 colE row3" className="empty">25</div>
            <div id="26 colF row3" className="empty">26</div>
            <div id="27 colG row3" className="empty">27</div>
            <div id="28 colH row3" className="empty">28</div>
            <div id="29 colI row3" className="empty">29</div>
            <div id="30 colJ row3" className="empty">30</div>
          </div>
          <div className= "row">
            <div>4</div>
            <div id="31 colA row4" className="empty">31</div>
            <div id="32 colB row4" className="empty">32</div>
            <div id="33 colC row4" className="empty">33</div>
            <div id="34 colD row4" className="empty">34</div>
            <div id="35 colE row4" className="empty">35</div>
            <div id="36 colF row4" className="empty">36</div>
            <div id="37 colG row4" className="empty">37</div>
            <div id="38 colH row4" className="empty">38</div>
            <div id="39 colI row4" className="empty">39</div>
            <div id="40 colJ row4" className="empty">40</div>
          </div>
          <div className= "row">
            <div>5</div>
            <div id="41 colA row5" className="empty">41</div>
            <div id="42 colB row5" className="empty">42</div>
            <div id="43 colC row5" className="empty">43</div>
            <div id="44 colD row5" className="empty">44</div>
            <div id="45 colE row5" className="empty">45</div>
            <div id="46 colF row5" className="empty">46</div>
            <div id="47 colG row5" className="empty">47</div>
            <div id="48 colH row5" className="empty">48</div>
            <div id="49 colI row5" className="empty">49</div>
            <div id="50 colJ row5" className="empty">50</div>
          </div>
          <div className= "row">
            <div>6</div>
            <div id="51 colA row6" className="empty">51</div>
            <div id="52 colB row6" className="empty">52</div>
            <div id="53 colC row6" className="empty">53</div>
            <div id="54 colD row6" className="empty">54</div>
            <div id="55 colE row6" className="empty">55</div>
            <div id="56 colF row6" className="empty">56</div>
            <div id="57 colG row6" className="empty">57</div>
            <div id="58 colH row6" className="empty">58</div>
            <div id="59 colI row6" className="empty">59</div>
            <div id="60 colJ row6" className="empty">60</div>
          </div>
          <div className= "row">
            <div>7</div>
            <div id="61 colA row7" className="empty">61</div>
            <div id="62 colB row7" className="empty">62</div>
            <div id="63 colC row7" className="empty">63</div>
            <div id="64 colD row7" className="empty">64</div>
            <div id="65 colE row7" className="empty">65</div>
            <div id="66 colF row7" className="empty">66</div>
            <div id="67 colG row7" className="empty">67</div>
            <div id="68 colH row7" className="empty">68</div>
            <div id="69 colI row7" className="empty">69</div>
            <div id="70 colJ row7" className="empty">70</div>
          </div>
          <div className= "row">
            <div>8</div>
            <div id="71 colA row8" className="empty">71</div>
            <div id="72 colB row8" className="empty">72</div>
            <div id="73 colC row8" className="empty">73</div>
            <div id="74 colD row8" className="empty">74</div>
            <div id="75 colE row8" className="empty">75</div>
            <div id="76 colF row8" className="empty">76</div>
            <div id="77 colG row8" className="empty">77</div>
            <div id="78 colH row8" className="empty">78</div>
            <div id="79 colI row8" className="empty">79</div>
            <div id="80 colJ row8" className="empty">80</div>
          </div>
          <div className= "row">
            <div>9</div>
            <div id="81 colA row9" className="empty">81</div>
            <div id="82 colB row9" className="empty">82</div>
            <div id="83 colC row9" className="empty">83</div>
            <div id="84 colD row9" className="empty">84</div>
            <div id="85 colE row9" className="empty">85</div>
            <div id="86 colF row9" className="empty">86</div>
            <div id="87 colG row9" className="empty">87</div>
            <div id="88 colH row9" className="empty">88</div>
            <div id="89 colI row9" className="empty">89</div>
            <div id="90 colJ row9" className="empty">90</div>
          </div>
          <div className= "row">
            <div>10</div>
            <div id="91 colA row10" className="empty">91</div>
            <div id="92 colB row10" className="empty">92</div>
            <div id="93 colC row10" className="empty">93</div>
            <div id="94 colD row10" className="empty">94</div>
            <div id="95 colE row10" className="empty">95</div>
            <div id="96 colF row10" className="empty">96</div>
            <div id="97 colG row10" className="empty">97</div>
            <div id="98 colH row10" className="empty">98</div>
            <div id="99 colI row10" className="empty">99</div>
            <div id="100 colJ row10" className="empty">Hal</div>
          </div>
        </div> */}
        {this.drawRows()}
      </div>
    )
  }
}


  ReactDOM.render(<Battleship />, document.getElementById('react'));
