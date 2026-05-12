let squaresRevealed = 0;

const words = [
    "Winner", "Not a winner", "Loser", "Try again", "Maybe next time", "Next time's the charm", "Losing square", "Not a winning square", "A losing square",
    "<img id = 'tryAgainImg' src = 'resources/index/try_again.jpg' alt = 'Spongbob try again meme'>", "MMM try again", "Sorry not this one", "Sorry maybe next time", 
    "Not this time", "Next time maybe", "Don't give up!", "Keep going", "A non-winning square", "No dice", "A winless square", "A loser", "A square that did not win",
    "No chicken dinner"
];

const randomAmounts = [[1,100], [2,50], [5,40], [10,20], [20,15], [25,10], [50,5], [100,4], [200,3], [250,2] [500,1]];

function sleep(time){
    return new Promise((resolve) => setTimeout(resolve,time));
}

async function scratch(square){
    const message = document.getElementById("message");
    square.onclick = "";
    squaresRevealed += 1;
    message.textContent = `Your ticket still has ${16 - squaresRevealed} unscratched squares`;
    square.innerHTML = square.id;
        if(square.firstChild.textContent === "Winner"){
            const winnings = document.getElementById("winnings");
            const total = document.getElementById("total");
            const netResult = document.getElementById("netResult");
            const amountWon = Number(square.children[1].textContent.replace("$",""));
            winnings.textContent = `$${Number(winnings.textContent.split("$")[1]) + amountWon}`;
            total.textContent = `$${Number(total.textContent.split("$")[1]) + amountWon}`;

            if(netResult.textContent.startsWith("-")){

                const current = netResult.textContent.split("$")[1] - amountWon;
                if(current > 0){
                    netResult.textContent = `-$${current}`;
                }else{
                    netResult.textContent = `$${Math.abs(current)}`;
                    netResult.style.color = "#1a652a";
                }

            }else{
                netResult.textContent = `$${Number(netResult.textContent.split("$")[1]) + amountWon}`;
            }

        }
    if(squaresRevealed === 16){

        if(Number(winnings.textContent.split("$")[1]) > 0){
            message.innerHTML = `You won <span style = "color: rgb(26, 101, 42);">${winnings.textContent}</span> this round for a total of <span class = "green">${total.textContent}</span> won overall with a net result of `;

            const span = document.createElement("span");
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
                message.innerHTML += `<span style = "class = "green">$${netResult.textContent.replace("$","") - 2}</span> try again.`;
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
    //const qrCode = document.getElementbyId("qrCode");
    //qrCode.innerHTML = "";
    
    for(square of squares){
        square.innerHTML = "";
        square.id = `<h6>${choice(words)}</h6><p class = "squareWinnings">$${weightedChoice(randomAmounts)}</p>`;
        square.onclick = function(){"scratch(this)"};
        square.addEventListener('click', function(event) {
            scratch(event.target);
        },{once: true});
    }

    const winnings = document.getElementById("winnings");
    winnings.textContent = "$0";
    const amountSpent = document.getElementById("amountSpent");
    amountSpent.textContent = `$${Number(amountSpent.textContent.split("$")[1]) + 2}`;
    const cardNumber = document.getElementById("cardNumber");
    cardNumber.textContent = String(Number(cardNumber.textContent) + 1).padStart(3,0);
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

function weightedChoice(data){
    let newData = [];
    for(element of data){
        for(let i = 0; i < element[1]; i++){
            newData.push(element[0]);
        }
    }
    return choice(newData);
}

const squares = document.getElementsByClassName("square");

for(square of squares){
    square.id = `<h6>${choice(words)}</h6><p class = "squareWinnings">$${weightedChoice(randomAmounts)}</p>`;
}
