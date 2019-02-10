var XPoints=0;
var YPoints=0;
function newGame(){
    for (var i=1; i <= 9 ; i++){
       restart(i);
    }

    var x=prompt("which player do you want?");
    document.turn=x.toUpperCase();
    messageToShow(document.turn+ " \'s Move");
    document.winner=null;
}
function nextTurn(cell1){
    if(document.winner!=null){
        messageToShow("Can't make a move,Because " + document.turn + " WON")
    }
    else if(cell1.innerHTML==""){
        cell1.innerText=document.turn;
        newUserTurn();
    }
    else{
        messageToShow("please choose different column");
    }
}
function newUserTurn(){

    if(checkForWinner(document.turn)){
        messageToShow("Congrats " + document.turn + " Win" )
        document.winner=document.turn;
        if(document.winner=="X"){
            XPoints+=10;
            YPoints-=5;
        }else{
            YPoints+=10;
            XPoints-=5;
        }
        console.log(document.winner + " Wins and points is" + "\nX Points: " + XPoints +" \nO Points: " +YPoints);
    }
    else if(document.turn=="X"){
        document.turn="O";
        messageToShow("O' s Move");
    }
    else{
        document.turn="X";
        messageToShow("X' s Move");
    }
}
function checkForWinner(move){
    var result=false;
    if(checkRow(1,2,3,move) ||
       checkRow(4,5,6,move) ||
       checkRow(7,8,9,move) ||
       checkRow(1,4,7,move) ||
       checkRow(2,5,8,move) ||
       checkRow(3,6,9,move) ||
       checkRow(1,5,9,move) ||
       checkRow(3,5,7,move)){
        result= true;
    }
    return result;
}
function messageToShow(msg){
    document.getElementById("Message").innerHTML=msg;
}
function checkRow(a,b,c,move){
    var result=false;
    if(getBox(a)== move && getBox(b)==move && getBox(c)==move){
        result = true;
    }
    return result;
}
function getBox(number){
    return document.getElementById("box"+number).innerHTML;
}
function restart(number){

    document.getElementById("box"+number).innerText="";
}
function SubmitData(){
    var dataToSend={
        "id": "4",
        "XPoints": XPoints,
        "OPoints": YPoints
    }
    $.ajax({
        url:"http://localhost:59264/api/Scores",
        data: dataToSend,
        type:'post',
        dataType:'json',
        success:function(res){
            console.log(res);
            alert("scord submitted");
        }

    });
}