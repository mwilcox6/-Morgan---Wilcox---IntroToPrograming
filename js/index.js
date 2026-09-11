let today = new Date(); 

let thisYear = today.getFullYear();

const footer = document.createElement('footer')

const body = document.querySelector('body');

body.appendChild(footer);

const copyright = document.createElement('p')

copyright.innerHTML = "Morgan Wilcox" +  ' ' + thisYear;

footer.appendChild(copyright);

const skills = [ "JavaScript" , "HTML", "CSS" , "Adobe Photoshop" , "Adobe Premier Pro" , "SOQL"];

const skillsSection = document.getElementById('Skills')

const skillsList = skillsSection.querySelector('ul')

for ( let i = 0; i < skills.length ;i++) {
    let skill = document.createElement('li');
    
    skill.innerText = skills[i];

    skillsList.appendChild(skill)
}
let messageForm = document.querySelector('form[name="leave_message"]');
messageForm.addEventListener("submit" , function (event)
{

    event.preventDefault();
    let inputName = event.target.usersName.value;
    let inputEmail = event.target.usersEmail.value;
    let inputMessage = event.target.usersMessage.value;

    console.log(inputName);
    console.log(inputEmail);
    console.log(inputMessage);

    let messageSection = document.getElementById('messages');
    let messageList = messageSection.querySelector('ul');
    let newMessage = document.createElement('li');

    newMessage.innerHTML = '<a href="mailto:' + inputEmail + '">' + inputName + '</a> <span>' + inputMessage + '</span>';

    let removeButton = document.createElement('button');

    removeButton.innerText = "remove";

    removeButton.setAttribute("type" , "button");

    removeButton.addEventListener("click", function(event){

    let entry = event.target.parentNode;

    entry.remove();


    });

    newMessage.appendChild(removeButton);

    messageList.appendChild(newMessage);

    event.target.reset();
});

// Select the Projects section and its list as the assignment expects
var projectSection = document.getElementById('Projects');
var projectList = projectSection ? projectSection.querySelector('ul') : null;

fetch ("https://api.github.com/users/mwilcox6/repos") 
.then(function(response){
    if (!response.ok){
        throw new Error(response.status);
    }
    return response.json();
})
.then(function(data){
    const repositories = data;
    console.log(repositories);

    // If the expected list doesn't exist in #Projects, abort and log an error
    if (!projectList) {
        console.error('Projects list (<ul>) not found inside #Projects. Cannot render repositories.');
        return;
    }

    // render the repositories into the list
    projectList.innerHTML = '';
    for (let i = 0; i < repositories.length ; i++ ) {
        const project = document.createElement('li');
        project.innerText = repositories[i].name;
        projectList.appendChild(project);
    }
})
.catch(function(error) {
    console.error(error);
    // show a safe error message appended to a guaranteed DOM target
    const errorMessage = document.createElement('p');
    errorMessage.className = 'fetch-error';
    errorMessage.innerText = 'Unable to load projects.';
    if (projectSection) {
        projectSection.appendChild(errorMessage);
    } else {
        console.error('Projects section (#Projects) not found; unable to display error message.');
    }
});
// end


