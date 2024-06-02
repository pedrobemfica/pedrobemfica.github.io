function showSection(event, sectionId) {
    event.preventDefault();
    
    // Remove 'active' class from all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Add 'active' class to the selected section
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.add('active');
}

// Show the first section by default
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.section').classList.add('active');
});
