const { SlashCommandBuilder } = require('discord.js');

// Defines the Name, Description, etc
const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

// Defines the response to the command
async function execute(interaction) {
   await interaction.reply('Pong!');
}

module.exports = {
    data,
    execute
}