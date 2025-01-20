const axios = require('axios');

// https://developer.themoviedb.org/reference/discover-movie
const URL = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1`;

const { genresList } = require('../data/data');

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getGenres(genreIds) {
    let genreNames = [];
    for (const genreId of genreIds) {
        genreNames.push(genresList[genreId]);
    }
    return genreNames;
}

async function fetchMovies(genre, sortby) {
    let url = URL;
    if (genre) {
        url += `&with_genres=${genre}`;
    }
    if (sortby) {
        url += `&sort_by=${sortby}`;
    }
    return await axios({
        url: url,
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIE_TOKEN}`
        }
    }).then((response) => {
        // If sorting then get top 5, otherwise grab 5 random ones
        let movies = response.data.results;
        if (sortby) {
            movies = movies.slice(0, 5);
        } else {
            let randomMovies = [];
            for (let i = 0; i < 5; i++) {
                randomMovies.push(movies[randomNumber(0, movies.length)]);
            }
            movies = randomMovies;
        }
        return movies.map((movie) => {
            let title = `Title: ${movie["title"]}\nOriginal Title: ${movie["original_title"]}`;
            return {
                genres: getGenres(movie["genre_ids"]),
                title: title,
                overview: movie["overview"],
                releaseDate: movie["release_date"],
                voteAverage: movie["vote_average"],
                popularity: movie["popularity"],
            };
        });c
    }).catch((error) => {
        console.error(error);
        throw new Error(`Error fetching movie!`);
    });
}

module.exports = {
    fetchMovies,
}