const API_KEY = "1592f85f-8617-4497-9fe3-16a84e459413";

async function loadScore(){

try{

let response = await fetch(
`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
);

let data = await response.json();

if(data.status === "success" && data.data.length > 0){

let liveMatch = data.data.find(match => match.matchStarted === true);

if(liveMatch){

document.getElementById("match").innerText = liveMatch.name;

document.getElementById("status").innerText = liveMatch.status;

if(liveMatch.score && liveMatch.score.length > 0){

let teamScore = liveMatch.score[0];

document.getElementById("score").innerText =
teamScore.r + "/" + teamScore.w;

}else{

document.getElementById("score").innerText = "Score Loading...";
}

}else{

document.getElementById("status").innerText = "No live match found";
}

}else{

document.getElementById("status").innerText = "API Error";
}

}catch(error){

document.getElementById("status").innerText = "Connection Error";

}

}

loadScore();
setInterval(loadScore, 5000);
