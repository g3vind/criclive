async function getMatchData() {
  return await fetch(
    "https://api.cricapi.com/v1/cricScore?apikey=0386a5e5-4a9d-4fc8-adec-c73d0f4afd67"
  )
    .then((data) => data.json())
    .then((data) => {
      if (data.status !== "success" || !data.data) {
        document.getElementById("matches").textContent =
          "API LIMITS TOUCHED FOR TODAY ☹";
        return;
      }

      const matchesList = data.data;

      // Filter out matches with a status containing "won" or "Match not started"
      const relevantData = matchesList
        .filter(
          (match) =>
            !match.status.includes("won") &&
            match.status !== "Match not started"
        )
        .map((match) => {
          const teamBScore = match.t2s ? match.t2s : "not batted yet";
          const teamAScore = match.t1s ? match.t1s : "not batted yet";

          const matchStatus =
            teamAScore === "not batted yet" && teamBScore === "not batted yet"
              ? "Match not started"
              : "Match going on";

          return `
                <li class="match">
                  <b class="match-status">
                    <strong id="match-status-title">
                      Match Status : 
                    </strong> ${matchStatus}
                  </b>
                  <div class="type-cont">
                    <strong id="type">Match Type : </strong> ${match.matchType.toUpperCase()}<br>
                  </div>
                  <div id="scores">
                    <p class="team-name">${match.t1.toUpperCase()} </p><b>${teamAScore}</b><br>
                    <p class="team-name">${match.t2.toUpperCase()} </p><b>${teamBScore}</b><br>
                  </div>
                </li>`;
        });

      console.log({ relevantData });
      document.getElementById("matches").innerHTML = relevantData
        .map((match) => `<li>${match}</li>`)
        .join(" ");
    })
    .catch((e) => console.log(e));
}

getMatchData();
