console.log("Javascript is connected");

//variables
const resetButton = document.querySelector("#resetBut")
const theButtons = document.querySelectorAll("#buttonHolder img");
const puzzleBoard = document.querySelector(".puzzle-board");
const dropZones = document.querySelectorAll(".drop-zone");
const puzzlePiecesDiv = document.querySelectorAll(".puzzle-pieces");
let draggedPiece;
let currentPuzzle = 0;

//functions
function changeBGImage(event) {
    console.log("changeBGimage called");
    const puzzleId =event.currentTarget.id;
    puzzleBoard.style.backgroundImage = `url('./images/backGround${puzzleId}.jpg')`;

    resetPuzzlePieces();

    document.querySelector(`#puzzle${puzzleId}`).style.display = "block";


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
        console.log("Drop zone already occupied");
        return;
    }

    this.appendChild(draggedPiece);
}

function resetPuzzlePieces(){
    const currentPuzzleDiv = document.querySelector(`#puzzle${currentPuzzle}`);
    dropZones.forEach(zone =>{
        if (zone.children.length > 0){
            Array.from(zone.children).forEach(piece => {
                currentPuzzleDiv.appendChild(piece);
            });
        };
    });
};
//eventListeners
theButtons.forEach(button => button.addEventListener("click", changeBGImage));

theButtons.forEach(function(img){
    img.addEventListener("dragstart", function(event){
        event.preventDefault();
    });
});

puzzlePiecesDiv.forEach(puzzleDiv => {
    const pieces = puzzleDiv.querySelectorAll("img");
    pieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

});
dropZones.forEach(zone => {
    zone.addEventListener("dragover", handleOver);
    zone.addEventListener("drop", handleDrop);

});

resetButton.addEventListener("click", resetPuzzlePieces);

