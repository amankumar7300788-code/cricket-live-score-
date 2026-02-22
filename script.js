const API_KEY = "1592f85f-8617-4497-9fe3-16a84e459413";

async function loadMatches(){

let res = await fetch(
`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
);

let data = await res.json();

let html = "";

data.data.forEach(match => {

html += `
<div class="matchCard" onclick="openMatch('${match.id}')">

<div class="matchTitle">
${match.name}
</div>

<div>
${match.status}
</div>

</div>
`;

});

document.getElementById("matchList").innerHTML = html;

}

function openMatch(id){

window.location.href = "match.html?id=" + id;

}

loadMatches();
setInterval(loadMatches, 10000);
