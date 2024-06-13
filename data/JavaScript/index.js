document.addEventListener('DOMContentLoaded', () => {
    const newsItems = [
        // { id: 0, title: 'Title', description: 'Description', image: 'Image' },
        { id: 1, title: 'Performence update', description: 'Neues Website-Update hat Design, Leistung und Funktion geändert', image: 'https://kinsta.com/wp-content/uploads/2018/04/what-is-github-1-1-1024x512.png' },
        { id: 0, title: 'Website Sourcecode update', description: 'Neue Struckturierung der Webseite', image: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/573/506/datas/gallery.jpg' },
    ];

    const TimeIntervalInSeconds = 5;

    const newsContainer = document.getElementById('news-container');

    newsItems.forEach((item, index) => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news-item');
        newsDiv.innerHTML = `
            <h3>${item.title}</h3>
            <img src="${item.image}" alt="${item.title}" class="news-image">
            <p>${item.description}</p>`;
        newsContainer.appendChild(newsDiv);
    });

    let currentIndex = 0;
    const newsElements = document.querySelectorAll('.news-item');

    function showNextNewsItem() {
        newsElements[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % newsElements.length;
        newsElements[currentIndex].classList.add('active');
    }

    setInterval(showNextNewsItem, TimeIntervalInSeconds * 1000);

    newsElements[currentIndex].classList.add('active');

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.animationDuration = `${TimeIntervalInSeconds}s`;
});

document.addEventListener('DOMContentLoaded', () => {
    const features = [
        { title: 'v1.3.2 - 13/06/2024 - Website-Update', description: 'Webseitestrucktur überarbeitet' },
        { title: 'v1.2 - 13/06/2024 - Website-Update', description: 'Update-Tabs' },
        { title: 'v1.1 - 13/06/2024 - Website-Update', description: 'Update-Tab und News-Tab hinzugefügt und Shop-Abstürze behoben' },
    ];

    const featuresList = document.getElementById('features-list');

    features.forEach(feature => {
        const listItem = document.createElement('li');
        listItem.textContent = `${feature.title}: ${feature.description}`;
        featuresList.appendChild(listItem);
    });
});

