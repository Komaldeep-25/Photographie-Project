document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'IaoFVZD6rKoxYIAjHab0F9Wuken7S5sUkyzf4lDD1hPU6ekOj4AQSMQQ'; // Replace with your Pexels API Key

    let currentPage = 1;
    let currentCategory = 'photos';

    const searchBtn = document.getElementById('searchBtn');
    const searchQuery = document.getElementById('searchQuery');
    const imagesContainer = document.getElementById('images');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const categoryBtns = document.querySelectorAll('.category-btn');

    searchBtn.addEventListener('click', () => {
        currentPage = 1;
        fetchMedia();
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCategory = e.target.dataset.category;
            currentPage = 1;
            fetchMedia();
        });
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchMedia();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        fetchMedia();
    });

    function fetchMedia() {
        const query = searchQuery.value;
        let url = `https://api.pexels.com/v1/search?query=${query}&page=${currentPage}&per_page=10`;

        if (currentCategory === 'videos') {
            url = `https://api.pexels.com/videos/search?query=${query}&page=${currentPage}&per_page=10`;
        }

        fetch(url, {
            headers: {
                Authorization: apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            displayMedia(data);
            updatePagination(data);
        })
        .catch(error => console.error('Error fetching media:', error));
    }

    function displayMedia(data) {
        imagesContainer.innerHTML = '';

        const items = currentCategory === 'photos' ? data.photos : data.videos;

        items.forEach(item => {
            const mediaSrc = currentCategory === 'photos' ? item.src.medium : item.video_files[0].link;
            const mediaElement = currentCategory === 'photos' ? document.createElement('img') : document.createElement('video');
            mediaElement.src = mediaSrc;
            if (currentCategory === 'videos') {
                mediaElement.controls = true;
            }

            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            const openLink = document.createElement('a');
            openLink.href = mediaSrc;
            openLink.target = '_blank';
            openLink.innerHTML = '<i class="fa fa-external-link"></i>';
            const downloadLink = document.createElement('a');
            downloadLink.href = mediaSrc;
            downloadLink.download = '';
            downloadLink.innerHTML = '<i class="fa fa-download"></i>';
            overlay.appendChild(openLink);
            overlay.appendChild(downloadLink);

            const mediaContainer = document.createElement('div');
            mediaContainer.classList.add('image-container');
            mediaContainer.appendChild(mediaElement);
            mediaContainer.appendChild(overlay);
            imagesContainer.appendChild(mediaContainer);
        });
    }

    function updatePagination(data) {
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = data.page >= data.total_pages;
    }

    // Initial fetch
    fetchMedia();
});