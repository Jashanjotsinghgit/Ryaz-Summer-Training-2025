let resetBtn = document.querySelector("#resetGame");
let newGameBtn = document.querySelector("#newGame");
let boxes = document.querySelectorAll(".box");
let msg = document.querySelector(".msg")
let turnO = true;

let winingPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
]
function resetGame(){
    boxes.forEach(box=>{
       box.disable = false;
       box.innerText = '';
    })
    turns = 0;
    for(let box of boxes){
        box.style.backgroundColor = "#edf2f4"
    }
}
function newGame(){
    newGameBtn.classList.add = "hide";
    resetBtn.classList.remove = "hide";
    msg.innerHTML = "";
    resetBtn.style.display = "inline-block";
    resetGame();
}
function showWinner(winner,pattern){
    if(pattern){
        for(let i=0;i<3;i++){
            boxes[pattern[i]].style.backgroundColor = "#6b705c";
            boxes[pattern[i]].style.color = "#000";
        }
    }
    msg.style.display = "block";
    if(winner==="draw"){
        msg.innerHTML = `<span>Oops!</span><br>DRAW`;
    }
    else{
        msg.innerHTML = `<span>Congratulations</span><br>Winner: ${winner}`;
    }
    disableAllBtns();
    resetBtn.style.display = "none";
    return ;
}

function disableAllBtns(){
    boxes.forEach(box=>{
       box.disable = true;
    })
}
let turns = 0;
function checkWinner(){
    for(let pattern of winingPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if( pos1 !== '' && pos2 !== '' && pos3!== '')
        {
            if(pos1===pos2 && pos2===pos3){
                showWinner(pos1,pattern);
            }
        }
    }
    turns+=1;
    if(turns===9){
            showWinner("draw");
        }
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (!box.disable){
            if(turnO){
                box.innerText = 'O';
                box.style.color = "#C1121F;";
                turnO = false;
                checkWinner();
            }
            else{
                box.innerText = 'X';
                box.style.color = '#2B2D42';
                turnO = true;
                checkWinner();
            }
            box.disable = true;
        }
    })
})
