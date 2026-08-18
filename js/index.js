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

