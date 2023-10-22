function hideButton() {
    let isHidden = document.getElementById("Bstart");
    if (isHidden.style.display === "none")
    {

    } else {
        isHidden.style.display = "none";
    }
}

function gameStart()
{
    playerA = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]; 
     playerB = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    let scoreA = [0,0,0];
    let scoreB = [0,0,0];
    const gCoords = document.getElementById("GridCoord");
    const gridC = gCoords.getContext("2d");
    turn = 1;
    drawBoard("CanvasA_ID", playerA);
    drawBoard("CanvasB_ID", playerB);

    document.getElementById("Bstart").disabled = true;
    gridC.strokeStyle = "#bfb556";
    gridC.stroke();
    roll();
}

function turnSwitch(num)
{
    const canvas = document.getElementById("GridCoord");
    const board = canvas.getContext("2d");
    if (num==2)
    {
        board.strokeStyle = "#CC896D";
        board.stroke();
        turn = 2;
    } else if (num==1)
    {
        board.strokeStyle = "#BFB556";
        board.stroke();
        turn = 1;
    } else {
        board.strokeStyle = "#222222";
        board.stroke();
        turn = 0;
    }
}

function dice() 
{
    let max = 6;
    let min = 1;
    return Math.floor(Math.random() * (max-min+1)) + min;
}

function roll() 
{
    diceScore = dice();
    document.getElementById("D6").innerHTML = diceScore;
}


function drawGrid()//draw all static component
{
    //draw grid coord
    const gCoords = document.getElementById("GridCoord");
    const gridC = gCoords.getContext("2d");
    
    gridC.strokeStyle = "#222222";
    gridC.lineWidth = 3;
    gridC.moveTo(25,75);//A
    gridC.lineTo(50,25);
    gridC.lineTo(75,75);
    gridC.moveTo(125,25);//B
    gridC.lineTo(175,50);
    gridC.lineTo(125,75);
    gridC.moveTo(175,50);
    gridC.lineTo(125,50);
    gridC.moveTo(250,25);//C
    gridC.lineTo(225,50);
    gridC.lineTo(250,75);
    gridC.lineTo(275,50);
    gridC.stroke();
    
    //draws player 1 3x3 grid
    const canvasA = document.getElementById("CanvasA_ID");
    const gridA = canvasA.getContext("2d");
    
    gridA.strokeStyle = "#BFB556";
    gridA.lineWidth = 3;
    gridA.moveTo(100,0);
    gridA.lineTo(100,350);
    gridA.moveTo(200,350);
    gridA.lineTo(200,0);
    gridA.moveTo(0,100);
    gridA.lineTo(300,100);
    gridA.moveTo(300,200);
    gridA.lineTo(0,200);
    gridA.moveTo(0,300);
    gridA.lineTo(300,300);
    gridA.stroke();
    
    //draws player 2 3x3 grid
    const canvasB = document.getElementById("CanvasB_ID");
    const gridB = canvasB.getContext("2d");
            
    gridB.strokeStyle = "#CC896D";
    gridB.lineWidth = 3;
    gridB.moveTo(100,0);
    gridB.lineTo(100,350);
    gridB.moveTo(200,350);
    gridB.lineTo(200,0);
    gridB.moveTo(0,150);
    gridB.lineTo(300,150);
    gridB.moveTo(300,250);
    gridB.lineTo(0,250);
    gridB.moveTo(0,50);
    gridB.lineTo(300,50);
    gridB.stroke();
}
function drawX(x,y,canvas)//complete, utility function
{
    const currCanvas = document.getElementById(canvas);
    const board = currCanvas.getContext("2d");

    board.strokeStyle = "#B4AD96";
    board.lineWidth = 3;

    if (canvas.localeCompare("CanvasA_ID")==0)
    {
        board.moveTo(11+x,11+y);
        board.lineTo(22+x,22+y);
        board.moveTo(11+x,22+y);
        board.lineTo(22+x,11+y);
    } else if (canvas.localeCompare("CanvasB_ID")==0)
    {
        board.moveTo(11+x,61+y);
        board.lineTo(22+x,72+y);
        board.moveTo(11+x,72+y);
        board.lineTo(22+x,61+y);
    }

    board.stroke();
}
function drawCell(cellX,cellY,canvas,diceNum)//in-service
{
    let x = cellX*100;
    let y = cellY*100;

    //clear cell
    clearCell(cellX,cellY,canvas);

    //middle-middle dot
    if (diceNum&1)
    {
        drawX(x+33,y+33,canvas);
    }
    //top-left and bottom-right
    if (diceNum>1)
    {
        drawX(x+0,y+0,canvas);
        drawX(x+67,y+67,canvas);
    }

    //bottom-left and top-right
    if (diceNum>3)
    {
        drawX(x+67,y+0,canvas);
        drawX(x+0,y+67,canvas);
    }
    //middle-left and middle-right
    if (diceNum>5)
    {
        drawX(x+0,y+33,canvas);
        drawX(x+67,y+33,canvas);
    }
}
function clearCell(cellX,cellY,canvas)//in-service
{
    const currCanvas = document.getElementById(canvas);
    const board = currCanvas.getContext("2d");

    let x = cellX*100;
    let y = cellY*100;

    if (canvas.localeCompare("CanvasA_ID")==0)
    {
        board.clearRect(x+5,y+5,90,90);
        board.beginPath();//idk why but without this, it wont clear the selected area
    } else if (canvas.localeCompare("CanvasB_ID")==0)
    {
        board.clearRect(x+5,y+55,90,90);
        board.beginPath();
    }
    board.moveTo(0,0);
    
}
function drawScore(cellX,canvas)
{
    const currCanvas = document.getElementById(canvas);
    const board = currCanvas.getContext("2d");
    board.font = "50px Consolas";
    board.strokeStyle = "#B4AD96";
    let x = cellX*100;

    clearScore(cellX,canvas);

    if (canvas.localeCompare("CanvasA_ID")==0)
    {
        board.strokeText(laneScoreCount(playerA,cellX),x+25,340);
        board.stroke();
    } else if (canvas.localeCompare("CanvasB_ID")==0)
    {
        board.strokeText(laneScoreCount(playerB,cellX),x+25,40);
        board.stroke();
    }
}
function clearScore(cellX, canvas)
{
    const currCanvas = document.getElementById(canvas);
    const board = currCanvas.getContext("2d");

    let x = cellX*100;
    
    if (canvas.localeCompare("CanvasA_ID")==0)
    {
        board.clearRect(x+5,305,85,45);
        board.beginPath();
    } else if (canvas.localeCompare("CanvasB_ID")==0)
    {
        board.clearRect(x+5,0,85,45);
        board.beginPath();
    }
    board.moveTo(0,0);
}
function drawBoard(canvas, board)
{
    for (let i=0;i<3;i++)
    {
        for (let j=0;j<3;j++)
        {
            drawCell(i,j,canvas,board[i][j]);
        }
        drawScore(i,canvas);
    }

}

function trickleDiceA(arr) //must be used on one dimension only(arr[n]), using (arr) results in error
{
    if (arr[2]==0 && arr[1]!=0)
    {
        arr[2]=arr[1];
        arr[1]=0;
    }
    if (arr[1]==0 && arr[0]!=0)
    {
        arr[1]=arr[0];
        arr[0]=0;
    }
}
function trickleDiceB(arr)//in-service, same as trickleDiceA but in reverse order
{
    if (arr[0]==0 && arr[1]!=0)
    {
        arr[0]=arr[1];
        arr[1]=0;
    }
    if (arr[1]==0 && arr[2]!=0)
    {
        arr[1]=arr[2];
        arr[2]=0;
    }
}

function fillA(num,grid)//in-service 
{
    if (playerA[grid][0]!=0)
    {
        return;
    } else if (playerA[grid][2]==0)
    {
        playerA[grid][2]=num;
    } else if (playerA[grid][1]==0)
    {
        playerA[grid][1]=num;
    } else 
    {
        playerA[grid][0]=num;
    }
}
function fillB(num,grid)//in-service,same as fillA() but in reverse order
{
    if (playerB[grid][2]!=0)
    {
        return;
    } else if (playerB[grid][0]==0)
    {
        playerB[grid][0]=num;
    } else if (playerB[grid][1]==0)
    {
        playerB[grid][1]=num;
    } else 
    {
        playerB[grid][2]=num;
    }
}

function drainA(arr, num)
{
    
}

function scoreMult(n)//calculation utility
{
    return (n/2)*(2+2*(n-1));
}

function laneScoreCount(arr, grid)
{
    let total = [0,0,0, 0,0,0];
    for (let i = 0; i < 3; i++)
    {
        switch(arr[grid][i])
        {
            case 1:
                total[0] +=1;
                break;
            case 2:
                total[1] +=1;
                break;
            case 3:
                total[2] +=1;
                break;
            case 4:
                total[3] +=1;
                break;
            case 5:
                total[4] +=1;
                break;
            case 6:
                total[5] +=1;
                break;
            default:
                break;
        } 
    }
    let value = 0;
    for (let i=0; i<6; i++)
    {
        value += (i+1)*scoreMult(total[i]);
    }
    return value;
}

function isFull()
{
    for (let i=0; i<3; i++)
    {
        for (let j=0; j<3; j++)
        {
            if (j==2)
            {
                if (playerA[i][j] !=0 || playerB[i][j]!=0)
                {
                    break;
                }
            }
            if (playerA[i][j] ==0) return;
            if (playerB[i][j] ==0) return;
        }
    }
	
    turnSwitch(0);
    document.getElementById("Bstart").disabled = false;
    document.getElementById("D6").innerHTML = "-";
    console.log("yes its full");
}

function updateScore()
{
    for (let i=0; i<3; i++)
    {
        scoreA[i] = laneScoreCount(playerA,i);
        scoreB[i] = laneScoreCount(playerB,i);
    }
}
let diceScore = 0;
let scoreA = [0,0,0];
let scoreB = [0,0,0];
let playerA = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]; 
let playerB = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];// initialize grid

let turn = 0;//0=none, 1=player 1, 2=player 2

console.table(playerA);
console.table(playerB);

drawGrid();
drawBoard("CanvasA_ID", playerA);
drawBoard("CanvasB_ID", playerB);

//controls
const canvas = document.getElementById("GridCoord");
const ctx = canvas.getContext("2d");
canvas.addEventListener("click", function(event)//clicklistener for grid selector
{
    let x = event.offsetX;
    let y = event.offsetY;
    
    

    switch(true)
    {
        case (x<100 && turn==1 && playerA[0][0]==0)://A
            fillA(diceScore,0);turnSwitch(2);
            roll();
            // console.log("A area");
            break;
        case (x>100 && x<200 && turn==1 && playerA[1][0]==0):
            fillA(diceScore,1);turnSwitch(2);
            roll();
            // console.log("B area");
            break;
        case (x>200 && x<300 && turn==1 && playerA[2][0]==0):
            fillA(diceScore,2);turnSwitch(2);
            roll();
            // console.log("C area");
            break;

        case (x<100 && turn==2 && playerB[0][2]==0)://B
            fillB(diceScore,0);turnSwitch(1);
            roll();
            // console.log("A area");
            break;
        case (x>100 && x<200 && turn==2 && playerB[1][2]==0):
            fillB(diceScore,1);turnSwitch(1);
            roll();
            // console.log("B area");
            break;
        case (x>200 && x<300 && turn==2 && playerB[2][2]==0):
            fillB(diceScore,2);turnSwitch(1);
            roll();
            // console.log("C area");
            break;

        default:
            break;
    }
    isFull();
    updateScore();
    drawBoard("CanvasA_ID", playerA);
    drawBoard("CanvasB_ID", playerB);

    // console.clear();
    // console.table(playerA);
    // console.table(playerB);
    // console.table(scoreA);
    // console.table(scoreB);
})