let squaresRevealed = 0;
const words = [
    "Winner", "Not a winner", "Loser", "Try again", "Maybe next time", "Next time's the charm",
    "<img id = 'tryAgainImg' src = 'resources/index/try_again.jpg'>"
];
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve,time));
}
async function scratch(square){
    const message = document.getElementById("message");
    square.onclick = "";
    squaresRevealed += 1;
    message.textContent = `Your ticket still has ${16 - squaresRevealed} unscratched squares`
    square.innerHTML = square.id;
        if(square.firstChild.textContent === "Winner"){
            const winnings = document.getElementById("winnings");
            const total = document.getElementById("total");
            const netResult = document.getElementById("netResult");
            winnings.textContent = `$${Number(winnings.textContent.split("$")[1]) + Number(square.children[1].textContent.replace("$",""))}`;
            total.textContent = `$${Number(total.textContent.split("$")[1]) + Number(square.children[1].textContent.replace("$",""))}`;
            if(netResult.textContent.startsWith("-")){
                let current = netResult.textContent.split("$")[1] - square.children[1].textContent.replace("$","");
                if(current > 0){
                    netResult.textContent = `-$${current}`;
                }else{
                    netResult.textContent = `$${Math.abs(current)}`;
                    netResult.style.color = "#1a652a";
                }
            }else{
                netResult.textContent = `$${Number(netResult.textContent.split("$")[1]) + Number(square.children[1].textContent.replace("$",""))}`;
            }
        }
    if(squaresRevealed === 16){
        if(Number(winnings.textContent.split("$")[1]) > 0){
            message.innerHTML = `You won <span class = "green">${winnings.textContent}</span> this round for a total of <span class = "green">${total.textContent}</span> won overall with a net result of `;
            span = document.createElement("span");
            if(netResult.textContent.replace("$","") - 2 >= 0){
                span.style.color = "rgb(26, 101, 42)";
                span.textContent = `$${netResult.textContent.replace("$","") - 2}.`;
                message.appendChild(span);
            }else{
                message.innerHTML += `<span style = "color: red;">-$${Math.abs(netResult.textContent.replace("$","") - 2)}</span>.`;
            }
        }else{
            message.innerHTML = `You didn't win anything, you have a total of <span class = "green">${total.textContent}</span>, you have a net result of `;
            if(netResult.textContent.replace("$","") - 2 >= 0){
                message.innerHTML += `<span style = "color: rgb(26, 101, 42);"">$${netResult.textContent.replace("$","") - 2}</span> try again.`;
            }else{
                message.innerHTML += `<span style = "color: red;">-$${Math.abs(netResult.textContent.replace("$","") - 2)}</span>.`;
            }
        }
        await sleep(2000);
        getNewCard();
    }
}
function revealQrCode(div){
    div.innerHTML = "<img src = 'resources/index/qr_code.png' alt = 'QR code'>";
}
function getNewCard(){
    squaresRevealed = 0;
    const squares = document.getElementsByClassName("square");
    for(square of squares){
        square.innerHTML = "";
        square.id = `<h6>${choice(words)}</h6><p class = "squareWinnings">$${randint(3,1)}</p>`;
        square.onclick = function(){"scratch(this)"};
        square.addEventListener('click', function(event) {
            scratch(event.target);
        });
    }
    const winnings = document.getElementById("winnings");
    winnings.textContent = "$0";
    const cardNumber = document.getElementById("cardNumber");
    cardNumber.textContent = String(Number(cardNumber.textContent) + 1).padStart(3,0)
    const netResult = document.getElementById("netResult");
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
    message.textContent = "Your ticket still has 16 unscratched squares.";
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
