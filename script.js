const API_KEY = "1592f85f-8617-4497-9fe3-16a84e459413";

async function loadScore(){

try{

let response = await fetch(
`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
);

let data = await response.json();

if(data.status === "success"){

let liveMatch = data.data.find(m => m.matchStarted);

if(liveMatch){

document.getElementById("match").innerText =
liveMatch.name;

document.getElementById("status").innerText =
liveMatch.status;


// TEAM NAMES

let teams = liveMatch.teams;

document.getElementById("team1").innerText =
teams[0];

document.getElementById("team2").innerText =
teams[1];


// SCORE

if(liveMatch.score.length > 0){

let score = liveMatch.score[0];

document.getElementById("score").innerText =
score.r + "/" + score.w;

}else{

document.getElementById("score").innerText =
"Score updating...";

}

}else{

document.getElementById("status").innerText =
"No live match currently";

}

}

}catch{

document.getElementById("status").innerText =
"API connection error";

}

}

loadScore();

setInterval(loadScore,5000);
