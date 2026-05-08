let squaresRevealed = 0;
const words = [
    "Winner","Not a winner","Loser", "Try again","Maybe next time",
    "<img id = 'tryAgainImg' src = 'resources/index/try_again.jpg'>"
];
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve,time));
}
async function scratch(square){
    if(square.innerHTML === ""){
        squaresRevealed += 1;
        square.innerHTML = square.id;
            if(square.firstChild.textContent === "Winner"){
                const winnings = document.getElementById("winnings");
                const total = document.getElementById("total");
                const netResults = document.getElementById("netResults");
                winnings.textContent = `$${Number(winnings.textContent.split("$")[1]) + Number(square.children[1].textContent.replace("$",""))}`;
                total.textContent = `$${Number(total.textContent.split("$")[1]) + Number(square.children[1].textContent.replace("$",""))}`;
                if(netResults.textContent.startsWith("-")){
                    let current = netResults.textContent.split("$")[1] - square.children[1].textContent.replace("$","");
                    if(current > 0){
                        netResults.textContent = `-$${current}`;
                    }else{
                        netResults.textContent = `$${Math.abs(current)}`;
                        netResults.style.color = "#1a652a";
                    }
                }else{
                    netResults.textContent = `$${Number(netResults.textContent.split("$")[1]) + Number(square.children[1].textContent.replace("$",""))}`;
                }
            }
        }
        if(squaresRevealed === 16){
            const message = document.getElementById("message");
            message.textContent = `You won $${winnings.textContent.split("$")[1]}.`;
            await sleep(2000);
            getNewCard();
        }
}
function getNewCard(){
    squaresRevealed = 0;
    const squares = document.getElementsByClassName("square");
    const winnings = document.getElementById("winnings");
    winnings.textContent = "$0";
    const cardNumber = document.getElementById("cardNumber");
    cardNumber.textContent = String(Number(cardNumber.textContent) + 1).padStart(3,0)
    const netResult = document.getElementById("netResults");
    if(netResult.textContent.replace("$","") <= 0){
        netResult.style.color = "red";
        netResult.textContent = `-$${Number(netResult.textContent.split("$")[1]) + 2}`;
    }else{
        let current = netResult.textContent.split("$")[1] - 2;
        if(current >= 0){
            netResult.textContent = `$${current}`;
            netResult.style.color = "#1a652a";
        }else{
            netResult.textContent = `-$${Number(netResult.textContent.split("$")[1])}`;
            netResult.style.color = "red";
        }
    }
    const message = document.getElementById("message");
    message.textContent = "Your ticket still has unscratched squares.";
    if(netResults.style.color === "red"){
        message.textContent += " Your still in the red";
    }
    for(square of squares){
        square.innerHTML = "";
        square.id = `<h6>${choice(words)}</h6><p class = "squareWinnings">$${randint(3,1)}</p>`;
    }
}
function randint(max,startAt = 0){
    return Math.floor(Math.random() * max) + startAt;
}
function choice(data){
    return data[randint(data.length)];
}
const squares = document.getElementsByClassName("square");
for(square of squares){
    square.id = `<h6>${choice(words)}</h6><p class = "squareWinnings">$${randint(2,1)}</p>`;
}