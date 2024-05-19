import { getImages } from "./utils/function.js";
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