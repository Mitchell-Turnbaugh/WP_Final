function scratch(square){
    if(square.innerHTML === ""){
    square.innerHTML = square.id
        if(square.firstChild.textContent === "Winner"){
            const winnings = document.getElementById("winnings");
            const total = document.getElementById("total");
            winnings.textContent = `Amount Won This Round: $${Number(winnings.textContent.split("$")[1]) + Number(square.children[1].textContent.replace("$",""))}`;
            total.textContent = `Total Amount Won: $${Number(total.textContent.split("$")[1]) + Number(square.children[1].textContent.replace("$",""))}`
        }
    }
}
function getNewCard(){
    const squares = document.getElementsByClassName("square");
    for(square of squares){
        square.innerHTML = ""
        words = ["Winner","Loser"];
        square.id = `<h6>${choice(words)}</h6><p>$${randint(2,1)}</p>`;
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
    square.id = `<h6>${choice(words)}</h6><p>$${randint(2,1)}</p>`;
}