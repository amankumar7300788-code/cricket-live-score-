const API_KEY = "1592f85f-8617-4497-9fe3-16a84e459413";

async function loadMatches(){

let response = await fetch(
`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
);

let data = await response.json();

let liveHTML = "";
let upcomingHTML = "";
let recentHTML = "";

data.data.forEach(match => {

let score = "Score not available";

if(match.score.length > 0){

score =
match.score[0].r + "/" +
match.score[0].w + " (" +
match.score[0].o + ")";

}

let html = `
<div class="matchCard">

<div class="matchTitle">
${match.name}
</div>

<div class="matchScore">
${score}
</div>

<div>
${match.status}
</div>

</div>
`;

if(match.matchStarted && !match.matchEnded){

liveHTML += html;

}else if(!match.matchStarted){

upcomingHTML += html;

}else{

recentHTML += html;

}

});

document.getElementById("liveMatches").innerHTML = liveHTML;
document.getElementById("upcomingMatches").innerHTML = upcomingHTML;
document.getElementById("recentMatches").innerHTML = recentHTML;

}

loadMatches();

setInterval(loadMatches,5000);
