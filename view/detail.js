export const createMovieModal = (result) => {
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
