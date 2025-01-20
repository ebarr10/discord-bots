const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

const { fetchMovies } = require('../requests/movie');
const { genresList, sortList } = require('../data/data');

const data = new SlashCommandBuilder()
    .setName('movie')
    .setDescription('Replies with a movie suggestion!')
    .addStringOption((option) => {
        return option
            .setName('genre')
            .setDescription('The genre of the movie suggestions.')
            .setRequired(false)
            .addChoices(
                { name: 'Action', value: '28'},
                { name: 'Adventure', value: '12'},
                { name: 'Animation', value: '16'},
                { name: 'Comedy', value: '35'},
                { name: 'Crime', value: '80'},
                { name: 'Documentary', value: '99'},
                { name: 'Drama', value: '18'},
                { name: 'Family', value: '10751'},
                { name: 'Fantasy', value: '14'},
                { name: 'History', value: '36'},
                { name: 'Horror', value: '27'},
                { name: 'Music', value: '10402'},
                { name: 'Mystery', value: '9648'},
                { name: 'Romance', value: '10749'},
                { name: 'Science Fiction', value: '878'},
                { name: 'TV Movie', value: '10770'},
                { name: 'Thriller', value: '53'},
                { name: 'War', value: '10752'},
                { name: 'Western', value: '37'},
            );
        }
    )
    .addStringOption((option) => {
        return option
            .setName('sortby')
            .setDescription('How the movies are sorted.')
            .setRequired(false)
            .addChoices(
                { name: 'Popularity', value: 'popularity.desc'},
                { name: 'Voting', value: 'vote_average.desc'},
            );
    });

async function execute(interaction) {
    await interaction.deferReply();

    let description = 'Movie recommendations:\n';
    const genre = interaction.options.getString('genre') || '';
    const sortby = interaction.options.getString('sortby') || 'random';

    if (genre) {
        description += `Genre: ${genresList[genre]}\n`;
    }
    if (sortby) {
        description += `Sorted by: ${sortList[sortby]}\n`;
    }

    try {
        const movieList = await fetchMovies(genre, sortby);
        const embed = new EmbedBuilder()
            .setColor(0x3f704d)
            .setTitle('Movie Recommendations...')
            .setDescription(description)
            .setTimestamp()
            .setFooter({
                text: 'Powered by the developer.themoviedb.org API'
            });
        
        for (const movie of movieList) {
            embed.addFields({
                name: `${movie.title}`,
                value: `\n
                    Overview: ${movie.overview}
                    Release Date: ${movie.releaseDate}
                    Voting Average: ${movie.voteAverage}
                    Popularity: ${movie.popularity}
                    Genres: ${JSON.stringify(movie.genres)}\n\n
                `
            });
        }
        
        await interaction.editReply({
            embeds: [embed],
        });
    } catch (error) {
        await interaction.editReply(error);
    }
}

module.exports = {
    data,
    execute
}