import { createMovieModal } from "../view/detail.js";
import { createMovieElement } from "../view/cards.js";
export const getImages = (shows) => {
    const moviesContainer = document.querySelector('.movies');
    moviesContainer.innerHTML = '';

    for (let result of shows) {
        if (result.show.image && result.show.name && result.show.summary && result.show.rating) {
            const movieItem = createMovieElement(result);
            moviesContainer.appendChild(movieItem);
        }
    }

    const modalBtns = document.querySelectorAll('.btn-modal');
    // modalBtns.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         const imdbid = this.dataset.tv;
    //         console.log(imdbid);
    //         fetch('https://api.tvmaze.com/lookup/shows?imdb=' + imdbid)
    //             .then(response => response.json())
    //             .then(m => {
    //                 const movieDetail = createMovieModal(m);
    //                 // Append modal to body
    //                 document.body.insertAdjacentHTML('beforeend', movieDetail);
    //                 // Show modal
    //                 const modal = document.querySelector('.modal');
    //                 modal.style.display = "block";
    //                 // Close modal when close button is clicked
    //                 const closeModalBtn = document.querySelector('.close');
    //                 closeModalBtn.addEventListener('click', function() {
    //                     modal.style.display = "none";
    //                     modal.remove(); // Remove modal from DOM
    //                 });
    //                 // Close modal when clicked outside the modal
    //                 window.addEventListener('click', function(event) {
    //                     if (event.target === modal) {
    //                         modal.style.display = "none";
    //                         modal.remove(); // Remove modal from DOM
    //                     }
    //                 });
    //             })
    //             .catch(error => console.error('Error fetching movie details:', error));
    //     });
    // });
	modalBtns.forEach(btn => {
		btn.addEventListener('click', function() {
			const imdbid = this.dataset.tv;
			console.log(imdbid);
			fetch('https://api.tvmaze.com/lookup/shows?imdb=' + imdbid)
				.then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then(m => {
					const movieDetail = createMovieModal(m);
					// Append modal to body
					document.body.insertAdjacentHTML('beforeend', movieDetail);
					// Show modal
					const modal = document.querySelector('.modal');
					modal.style.display = "block";
					// Close modal when close button is clicked
					const closeModalBtn = document.querySelector('.close');
					closeModalBtn.addEventListener('click', function() {
						modal.style.display = "none";
						modal.remove(); // Remove modal from DOM
					});
					// Close modal when clicked outside the modal
					window.addEventListener('click', function(event) {
						if (event.target === modal) {
							modal.style.display = "none";
							modal.remove(); // Remove modal from DOM
						}
					});
				})
				.catch(error => alert(`Error fetching movie details. Status: ${error}`));
		});
	});
	
};