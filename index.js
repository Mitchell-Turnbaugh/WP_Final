function scratch(square){
    square.innerHTML = square.id
    
}
function randint(max ,startAt = 0){
    return Math.floor(Math.random() * max) + startAt
}
function choice(data){
    return data[randint(data.length)]
}
const squares = document.getElementsByClassName("square");
for(square of squares){
    words = ["Winner","Loser"];
    square.id = `<h6>${choice(words)}</h6>$${randint(2,1)}`;
}