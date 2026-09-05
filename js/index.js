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

fetch ("https://api.github.com/users/mwilcox6/repos") 
.then(function(response){
 
    if (!response.ok){
        throw new Error(response.status);
    }
    
    return response.json();

})

.then(function (data){
    const repositories = data;
    console.log(repositories);

    let projectSection = document.getElementById('Projects');

let projectList = projectSection.querySelector('ul');

for (let i = 0; i < repositories.length ; i++ ) {

    const project = document.createElement('li');

    project.innerText = repositories[i].name;

    projectList.appendChild(project);
}

})

.catch(function(error) {

console.error(error)

projectList.innerText = "Unable to load projects.";

});


