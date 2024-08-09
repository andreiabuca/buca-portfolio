// Function to fetch JSON data
async function fetchProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error fetching the projects:', error);
    }
}

// Function to display the projects
function displayProjects(projects) {
    const container = document.getElementById('div_projects');
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        const imageElement = document.createElement('img');
        imageElement.src = project.image;
        imageElement.alt = project.title;
        imageElement.classList.add('project-img');

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');
        const titleElement = document.createElement('h3');
        titleElement.textContent = project.title;

        titleContainer.appendChild(titleElement);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('project-buttons');

        if (project.link) {
            const linkElement = document.createElement('a');
            linkElement.href = project.link;
            linkElement.textContent = 'Voir projet';
            linkElement.target = "_blank";
            linkElement.classList.add('project-button');
            buttonsContainer.appendChild(linkElement);
        }

        const githubElement = document.createElement('a');
        githubElement.href = project.github;
        githubElement.textContent = 'GitHub repo';
        githubElement.target = "_blank";
        githubElement.classList.add('project-button');
        buttonsContainer.appendChild(githubElement);

        projectElement.appendChild(imageElement);
        projectElement.appendChild(titleContainer);
        projectElement.appendChild(buttonsContainer);

        imageElement.addEventListener('click', () => openModal(project));

        container.appendChild(projectElement);
    });
}

//Function to open the modal 
function openModal(project) {
    const modal = document.getElementById('projectModal')
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechnologies = document.getElementById('modalTechnologies');
    

    if (modal && modalImg && modalTitle && modalDescription && modalTechnologies) {
        modalImg.src = project.image;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;

        modalTechnologies.innerHTML = '';

        project.technologies.forEach(tech => {
            const techElement = document.createElement('div');
            techElement.classList.add('technology');

            const techIcon = document.createElement('img');
            techIcon.src = tech.icon;
            techIcon.alt = tech.name;
            techIcon.classList.add('tech-icon');

            const techName = document.createElement('span');
            techName.textContent = tech.name;
            techName.classList.add('tech-name');

            techElement.appendChild(techIcon);
            techElement.appendChild(techName);
            modalTechnologies.appendChild(techElement);
        });

        modal.style.display = 'block';
    } else {
        console.error('Modal elements are not found');
    }
}

//Function to close the modal 
function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking on the close button
document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});

//Close modal when clicking outside of the modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('projectModal');
    if (modal && event.target === modal) {
        closeModal();
    }
});

// Fetch and display projects on page load
window.onload = fetchProjects;

//Animation for the header 
document.addEventListener('DOMContentLoaded', function() {
    const text = "Intégrateur web front-end";
    let index = 0;
    const speed = 100; 
    const delay = 1000;
    const typingElement = document.getElementById('typing');

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                index = 0;
                typingElement.textContent = "";
                type();
            }, delay);
        }
    }

    type();
});
