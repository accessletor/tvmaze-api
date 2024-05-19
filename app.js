// const form = document.querySelector('#search-form');

// form.addEventListener('submit', async (e) => {
// 	e.preventDefault();

// 	// document.querySelectorAll('img').forEach((img) => img.remove());
// 	document.querySelectorAll('img').forEach((img) => img.remove());
//     document.querySelectorAll('h2').forEach((h2) => h2.remove());
//     document.querySelectorAll('p').forEach((p) => p.remove());

// 	const keyword = form.elements.query.value;
// 	const config = {
// 		params: { q: keyword },
// 	};
// 	const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
// 	getImages(res.data);
// 	form.elements.query.value = '';
// });

// const getImages = (shows) => {
// 	const moviesContainer = document.querySelector('.movies'); // Get movies container
//     moviesContainer.innerHTML = '';

//     for (let result of shows) {
//         if (result.show.image && result.show.name && result.show.summary && result.show.rating) {
//             const movieItem = createMovieElement(result);
//             moviesContainer.appendChild(movieItem);
//         }
//     }
// 	const modalBtn = document.querySelectorAll('.btn-modal');
// 	modalBtn.forEach(btn => {
// 		btn.addEventListener('click', function() {
// 			const imdbid = this.dataset.tv;
//             console.log(imdbid)
// 			fetch('https://api.tvmaze.com/lookup/shows?imdb=' + imdbid)
//                 .then(response => response.json())
//                 .then(m => {
// 					const movieDetail = createMovieModal(m);
// 					const buat = document.createElement('div')
// 					buat.classList.add('buat-modal');
// 					buat.innerHTML = movieDetail;
//             })
			
// 			// 
// 			// fetch('http://www.omdbapi.com/?apikey=dca61bcc&i=' + imdbid)
//             //     .then(response => response.json())
//             //     .then(m => {
//             //         const movieDetail = showMovieDetail(m);
//             //         const modalBody = document.querySelector('.modal-body');
//             //         modalBody.innerHTML = movieDetail;
//             // })
// 		})
// 	})

// 	window.onclick = function(event) {
// 		if (event.target == modal) {
// 			modal.style.display = "none";
// 		}
// 		}
// };


// // item
// const createMovieElement = (result) => {
//     const movieItem = document.createElement('div');
//     movieItem.classList.add('movie-item');

//     movieItem.innerHTML = `
//         <img class="movie-item__header__poster" src="${result.show.image.medium}">
//         <div class="movie-item__content">
//             <h2 class="judul_movie btn-modal" data-tv="${result.show.externals.imdb}">${result.show.name}</h2>
//             <p class="rating">${result.show.rating.average ? `Rating: ⭐️${result.show.rating.average}` : 'Rating: -'}</p>
//             <p class="isi">${result.show.summary}</p>
//         </div>
//     `;

//     return movieItem;
// };

// const createMovieModal = (result) => {
// 	return `<div id="modal" class="modal">
// 	<div class="modal-content">
// 	  <span class="close">&times;</span>
// 	  <p>Isi modal box kamu disini.</p>
// 	</div>
//   </div>`	
// }

// dua
const form = document.querySelector('#search-form');

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	// document.querySelectorAll('img').forEach((img) => img.remove());
	document.querySelectorAll('img').forEach((img) => img.remove());
    document.querySelectorAll('h2').forEach((h2) => h2.remove());
    document.querySelectorAll('p').forEach((p) => p.remove());

	const keyword = form.elements.query.value;
	const config = {
		params: { q: keyword },
	};
	const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
	getImages(res.data);
	form.elements.query.value = '';
});

const getImages = (shows) => {
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

const fetchAndDisplayMovies = async () => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear(); // Dapatkan tahun saat ini

        const response = await fetch(`https://api.tvmaze.com/schedule?country=US&date=${currentYear}-01-01`);
        const moviesData = await response.json();
        getImages(moviesData);
    } catch (error) {
        console.error('Error fetching and displaying movies:', error);
    }
};

document.addEventListener('DOMContentLoaded', fetchAndDisplayMovies);



// item
const createMovieElement = (result) => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    movieItem.innerHTML = `
        <img class="movie-item__header__poster" src="${result.show.image.medium}">
        <div class="movie-item__content">
            <h2 class="judul_movie btn-modal" data-tv="${result.show.externals.imdb}">${result.show.name}</h2>
            <p class="rating">${result.show.rating.average ? `Rating: ⭐️${result.show.rating.average}` : 'Rating: -'}</p>
            <p class="isi">${result.show.summary}</p>
        </div>
    `;

    return movieItem;
};

const createMovieModal = (result) => {
	// genre
	const genres = result.genres;
    let genresHTML = '';

    // Lakukan iterasi melalui setiap elemen genres dan tambahkan ke dalam string HTML
    genres.forEach((genre, index) => {
        // Tambahkan koma kecuali untuk genre terakhir
        if (index !== genres.length - 1) {
            genresHTML += `<span class="genre">${genre}, </span>`;
        } else {
            genresHTML += `<span class="genre">${genre}</span>`;
        }
    });
	// hari
	// Fungsi untuk menerjemahkan nama hari
	const translateDay = (day) => {
    const daysMap = {
        "Monday": "Senin",
        "Tuesday": "Selasa",
        "Wednesday": "Rabu",
        "Thursday": "Kamis",
        "Friday": "Jumat",
        "Saturday": "Sabtu",
        "Sunday": "Minggu"
    };
    return daysMap[day] || day; // Jika nama hari tidak ditemukan, kembalikan nama hari asli
};

// Menggunakan fungsi translateDay untuk menerjemahkan nama hari
	const hari = result.schedule.days;
	let hariHTML = '';

	// Lakukan iterasi melalui setiap nama hari dan terjemahkan
	hari.forEach((day, index) => {
		// Tambahkan koma kecuali untuk hari terakhir
		if (index !== hari.length - 1) {
			hariHTML += `<span class="hari">${translateDay(day)}, </span>`;
		} else {
			hariHTML += `<span class="hari">${translateDay(day)}</span>`;
		}
	});


	return `<div id="modal" class="modal">
	<div class="modal-content">
		<span class="close">&times;</span>
		<div class="modal-body">
			<div class="modal-image">
				<img src="${result.image.medium}" alt="Movie Poster">
			</div>
			<div class="modal-description">
				<h2>${result.name}</h2>
				<p><strong>Genres:</strong> ${genresHTML}</p>
				<p>${result.rating.average ? `<strong>Rating:</strong> ⭐️${result.rating.average}` : '<strong>Rating:</strong> -'}</p>
				<p><strong>Tayang Setiap Hari:</strong> ${hariHTML}</p>
				<p>${result.schedule.time ? `<strong> Tayang Setiap Jam:</strong> ${result.schedule.time}` : '<strong>Tayang Setiap Jam:</strong> -'}</p>
				<p><strong>Rilis:</strong> ${result.premiered}</p>
				<p>${result.ended ? `<strong>Tamat:</strong> ${result.ended}` : '<strong>Tamat:</strong> -'}</p>
				<p><strong> Bahasa:</strong> ${result.language}</p>
				<p><strong> Plot:</strong> ${result.summary}</p>
			</div>
		</div>
	</div>
  </div>`	
}

// document.addEventListener('DOMContentLoaded', function() {
//     modal();
// });


// const form = document.querySelector('#search-form');

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     // document.querySelectorAll('img').forEach((img) => img.remove());
//     document.querySelectorAll('img').forEach((img) => img.remove());
//     document.querySelectorAll('h2').forEach((h2) => h2.remove());
//     document.querySelectorAll('p').forEach((p) => p.remove());

//     const keyword = form.elements.query.value;
//     const config = {
//         params: { q: keyword },
//     };
//     const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
//     getImages(res.data);
//     form.elements.query.value = '';
// });

// const getImages = (shows) => {
//     const moviesContainer = document.querySelector('.movies'); // Get movies container
//     moviesContainer.innerHTML = '';

//     for (let result of shows) {
//         if (result.show.image && result.show.name && result.show.summary && result.show.rating) {
//             const movieItem = createMovieElement(result);
//             moviesContainer.appendChild(movieItem);
//         }
//     }
// };

// // modal
// const modal = (m) => {
//     const modalBtn = document.querySelectorAll('.btn-modal');
//     let count = 0;

//     modalBtn.forEach(btn => {
//         btn.addEventListener('click', function(){
//             alert('ok');
//             count++;
//             console.log(`Jumlah klik: ${count}`);
//             // Tambahkan kode untuk menampilkan modal di sini
//             const imdbID = this.getAttribute('data-tv');
//             const modalContent = createMovieModal(imdbID);
//             document.body.insertAdjacentHTML('beforeend', modalContent);
//             const modalCloseBtn = document.querySelector('.close');
//             modalCloseBtn.addEventListener('click', function() {
//                 document.querySelector('.modal').remove();
//             });
//         });
//     });
// };

// // item
// const createMovieElement = (result) => {
//     const movieItem = document.createElement('div');
//     movieItem.classList.add('movie-item');

//     movieItem.innerHTML = `
//         <img class="movie-item__header__poster" src="${result.show.image.medium}">
//         <div class="movie-item__content">
//             <h2 class="judul_movie btn-modal" data-tv="${result.show.externals.imdb}">${result.show.name}</h2>
//             <p class="rating">${result.show.rating.average ? `Rating: ⭐️${result.show.rating.average}` : 'Rating: -'}</p>
//             <p class="isi">${result.show.summary}</p>
//         </div>
//     `;

//     return movieItem;
// };

// const createMovieModal = (imdbID) => {
//     return `<div id="modal" class="modal">
//     <div class="modal-content">
//       <span class="close">&times;</span>
//       <p>Isi modal box kamu disini. IMDB ID: ${imdbID}</p>
//     </div>
//   </div>`;
// };

// modal(); // Panggil fungsi modal untuk menambahkan event listener ke tombol-tombol judul film
