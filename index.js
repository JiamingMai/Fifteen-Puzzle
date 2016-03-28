window.onload = init;

var EventUtil = {
    getEvent: function (event){
         return event?event:window.event;
    },

    getTarget: function(event){
        return event.target || event.srcElement;
    },

    addHandler: function (element, type, handler){
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            element.attachEvent("on" + type, handler);
        }else {
            element["on"+type] = handler;
        }
    },

    removeHandler: function (element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type, handler, false);
        }else if(element.detachEvent){
            element.detachEvent("on" + type, handler);
        }else {
            element["on" + type] = null;
        }
    }
}

function isCellEmpty(element){
    var divElement = element.firstChild;
    while(divElement.nodeName == "#text"){
        divElement = divElement.nextSibling;
    }
    if(divElement.title == "empty"){
        return true;
    }else {
        return false;
    }
}

function swapTile(selectedCell, destinationCell){
    var srcDiv = selectedCell.firstChild;
    while(srcDiv.nodeName == "#text"){
        srcDiv = srcDiv.nextSibling;
    }
    var desDiv = destinationCell.firstChild;
    while(desDiv.nodeName == "#text"){
        desDiv = desDiv.nextSibling;
    }
    destinationCell.appendChild(srcDiv);
    selectedCell.appendChild(desDiv);
}

function isWin(){
    var divs = document.getElementById("puzzleGrid").getElementsByTagName("div");
    var str = "";
    for(var i = 0, len = divs.length; i < len; i++) {
        div = divs[i];
        var tempStr = Number(div.innerHTML);
        if (tempStr == "0"){
            tempStr = "";
        }
        str += tempStr;
    }
    if(str == "123456789101112131415"){
        return true;
    }else {
        return false;
    }
}

function tileClick(event) {
    var event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    var rowNum = this.id.charAt(0);
    var colNum = this.id.charAt(1);

    //Check above
    if(rowNum > 1){
        var testRow = Number(rowNum) - 1;
        var testCellId = testRow + "" + colNum;
        var testCell = document.getElementById(testCellId);
        if(isCellEmpty(testCell)) {
           swapTile(this, testCell);
           stepPlusOne();
        }
    }

    //Check below
    if(rowNum < 4){
        var testRow = Number(rowNum) + 1;
        var testCellId = testRow + "" + colNum;
        var testCell = document.getElementById(testCellId);
        if(isCellEmpty(testCell)){
            swapTile(this, testCell);
            stepPlusOne();
        }
    }

    //Check left
    if(colNum > 1){
        var testCol = Number(colNum) - 1;
        var testCellId = rowNum + "" + testCol;
        var testCell = document.getElementById(testCellId);
        if(isCellEmpty(testCell)){
            swapTile(this, testCell);
            stepPlusOne();
        }
    }

    //Check right
    if(colNum < 4){
        var testCol = Number(colNum) + 1;
        var testCellId = rowNum + "" + testCol;
        var testCell = document.getElementById(testCellId);
        if(isCellEmpty(testCell)){
            swapTile(this, testCell);
            stepPlusOne();
        }
    }

    if(isWin()){
        alert("You win!");
        window.location = window.location;
    }
}

function stepPlusOne(){
    var span = document.getElementById("counter");
    span.innerHTML = Number(span.innerHTML) + 1;
}

function showTime(){
    var timeValue = document.getElementById("timeValue").value;
    var totalSeconds = (new Date().getTime() - Number(timeValue)) / 1000;
    var seconds = Math.floor(totalSeconds % 60);
    var minutes = Math.floor((totalSeconds / 60) % 60);
    var hours = Math.floor((totalSeconds / 60 / 60) % 24);
    var timerStr = hours + " h " + minutes + " m " + seconds + " s";
    var timer = document.getElementById("timer");
    timer.innerHTML = timerStr;
}

function init() {
    var table = document.getElementById("puzzleGrid");
    var cells = table.getElementsByTagName("td");
    for(var i = 0, len = cells.length; i < len; i++ )
    {
        var cell = cells[i];
        EventUtil.addHandler(cell, "click", tileClick);
    }

    var timeValue = document.getElementById("timeValue");
    timeValue.value = new Date().getTime();
    window.setInterval(showTime, 1000);
}