let squaresRevealed = 0;
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve,time));
}
async function scratch(square){
    if(square.innerHTML === ""){
        squaresRevealed += 1
        square.innerHTML = square.id
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
    const squares = document.getElementsByClassName("square");
    const winnings = document.getElementById("winnings");
    winnings.textContent = "$0";
    const netResult = document.getElementById("netResults");
    console.log(netResult.textContent.replace("$",""))
    if(netResult.textContent.replace("$","") < 0){
        netResult.style.color = "red";
        netResult.textContent = `-$${Math.abs(Number(netResult.textContent.split("$")[1]) + 2)}`;
    }else{
        let current = netResult.textContent("$")[1] - 2
        if(current > 0){
            netResult.textContent = `$${netResult.textContent.split("$")[1] - 2}`;
            netResult.style.color = "#1a652a";
        }else{
            console.log(netResult.textContent)
        }
    }
    const message = document.getElementById("message");
    message.textContent = "Your ticket still has unscratched squares."
    for(square of squares){
        square.innerHTML = "";
        words = ["Winner","Loser"];
        square.id = `<h6>${choice(words)}</h6><p class = "squareWinnings">$${randint(2,1)}</p>`;
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
    words = ["Winner","Loser"];
    square.id = `<h6>${choice(words)}</h6><p class = "squareWinnings">$${randint(2,1)}</p>`;
}