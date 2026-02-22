const API_KEY = "1592f85f-8617-4497-9fe3-16a84e459413";

async function loadMatches(){

try{

let res = await fetch(
`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
);

let json = await res.json();

let html = "";

if(!json.data){

document.getElementById("matches").innerHTML =
"No matches found";

return;

}

json.data.forEach(match => {

let score = "";

if(match.score && match.score.length > 0){

let s = match.score[0];

score =
s.r + "/" +
s.w +
" (" + s.o + ")";

}

html += `
<div class="card"
onclick="openMatch('${match.id}')">

<div class="title">

${match.name}

</div>

<div class="score">

${score}

</div>

<div class="status">

${match.status}

</div>

</div>
`;

});

document.getElementById("matches").innerHTML = html;

}catch(e){

document.getElementById("matches").innerHTML =
"Error loading matches";

}

}

function openMatch(id){

window.location =
"match.html?id=" + id;

}

loadMatches();

setInterval(loadMatches, 5000);
