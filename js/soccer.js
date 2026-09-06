const options = {
    method: 'GET',
    headers: {
        'x-apisports-key': '4f4fae0f037a056d34161b26c199c624'
    }
};

const teamsList = document.getElementById('team-list');


const playersList = document.getElementById('player-list');
const teamsButton = document.getElementById('teams-button');
const teamInput = document.getElementById('team-input');
const backToTeamsButton = document.getElementById('back-to-teams');
const teamsSection = document.getElementById('teams');
const playersSection = document.getElementById('players');
const clearTeamsButton = document.getElementById('clear-teams');

// teams button event listener

teamsButton.addEventListener('click', function () {

teamsList.innerHTML = '';


    //teams fetch 
    fetch('https://v3.football.api-sports.io/teams?search=' + teamInput.value, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
    
        if (Object.keys(data.errors).length > 0) {
            teamsList.innerText = "Unable to load teams. Please try again later.";
            return;
        }

        for (let i = 0; i < data.response.length; i++) { 
        const teamItem = document.createElement('li');
        teamItem.innerText = data.response[i].team.name;
        teamItem.dataset.teamId = data.response[i].team.id;

        teamItem.addEventListener('click', function() {

        

            const teamId = teamItem.dataset.teamId;
        
            playersList.innerHTML = '';

            teamsSection.hidden = true;
            playersSection.hidden = false;
            backToTeamsButton.hidden = false;
           
            
            

            // players fetch

                fetch('https://v3.football.api-sports.io/players?team=' + teamId + '&season=2024', options)
                .then(function(response){
                    return response.json();
                })

                .then(function(data){

                    if (Object.keys(data.errors).length > 0) {
                        playersList.innerText = "Unable to load players. Please try again later.";
                        return;
                    }

                    for(let i = 0; i < data.response.length; i++){
                        const playerItem = document.createElement('li');
                        playerItem.innerText = data.response[i].player.name;
                        playersList.appendChild(playerItem);
                    }
                })

        
                    .catch(function(error) {
                        console.error(error);
                        playersList.innerText = "Unable to load players. Please try again"
                        
                    });
        });

    

        teamsList.appendChild(teamItem);
                    }
        })

            .catch(function(error) {
                console.error(error);
                teamsList.innerText = "Unable to load teams. Please try again.";
            });
            });


            backToTeamsButton.addEventListener('click',function(){

                teamsSection.hidden = false;
                playersSection.hidden = true;
                backToTeamsButton.hidden = true;
    

            });

            clearTeamsButton.addEventListener('click', function(){
                teamsList.innerHTML = '';

            });