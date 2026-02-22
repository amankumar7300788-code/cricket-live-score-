const API_KEY = "1592f85f-8617-4497-9fe3-16a84e459413";

const urlParams = new URLSearchParams(window.location.search);
const matchId = urlParams.get("id");

async function loadMatch(){

let res = await fetch(
`https://api.cricapi.com/v1/match_info?apikey=${API_KEY}&id=${matchId}`
);

let data = await res.json();

let match = data.data;

document.getElementById("matchName").innerText = match.name;

if(match.score && match.score.length > 0){

let s = match.score[0];

document.getElementById("score").innerText =
s.r + "/" + s.w + " (" + s.o + ")";

}

document.getElementById("status").innerText = match.status;


// Scorecard

let scorecardHTML = "";

if(match.scorecard){

match.scorecard.forEach(inn => {

scorecardHTML += `
<h4>${inn.inning}</h4>
`;

inn.batting.forEach(bat => {

scorecardHTML += `
<div>
${bat.batsmanName} - ${bat.r} (${bat.b})
</div>
`;

});

});

}

document.getElementById("scorecard").innerHTML = scorecardHTML;

}

loadMatch();
setInterval(loadMatch, 10000);
