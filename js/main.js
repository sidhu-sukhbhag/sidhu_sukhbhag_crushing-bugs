console.log("Javascript is connected");

//variables
const resetButton = document.querySelector("#resetBut")
const theButtons = document.querySelectorAll("#buttonHolder img");
const puzzleBoard = document.querySelector(".puzzle-board");
const puzzlePieces = document.querySelectorAll(".puzzle-pieces img");
const dropZones = document.querySelectorAll(".drop-zone");
const puzzlePiecesDiv = document.querySelectorAll(".puzzle-pieces");
let draggedPiece;

//functions
function changeBGImage(event) {
    console.log("changeBGimage called");
    const puzzleId =event.currentTarget.id;
    puzzleBoard.style.backgroundImage = `url('./images/backGround${puzzleId}.jpg')`;

    resetPuzzlePieces();

    puzzlePieces.forEach(piece => {
        const pieceType = piece.getAttribute("data-piece");
        piece.src = `./images/${pieceType}${puzzleId}.jpg`;
        puzzlePiecesDiv.appendChild(piece);
    });
}

function handleStartDrag() {
    console.log(`started dragging ${this}`);
    draggedPiece = this;
}

function handleOver(e) {
    e.preventDefault();
    console.log("Dragged Over")
}

function handleDrop(e) {
    e.preventDefault();
    console.log("User dropped the piece");

    if(this.childNodes.length > 0){
        return;
    }

    this.appendChild(draggedPiece);
}

function resetPuzzlePieces(){
    console.log("User clicked to reset the puzzle.");

    puzzlePieces.forEach(piece => {
        puzzlePiecesDiv.appendChild(piece);
    });
}
//eventListeners
theButtons.forEach(button => button.addEventListener("click", changeBGImage));

theButtons.forEach(function(img){
    img.addEventListener("dragstart", function(event){
        event.preventDefault();
    });
});

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener("dragover", handleOver));

dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));