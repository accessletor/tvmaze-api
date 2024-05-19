export const createMovieElement = (result) => {
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