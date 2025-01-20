require('dotenv').config();

const {
    Client,
    Collection,
    Events,
    GatewayIntentBits
} = require('discord.js');

// Events
const { clientReadyHandler } = require('./events/clientReady');
const { interactionCreateHandler } = require('./events/interactionCreateEvent');

// Commands
const pingCommand = require('./commands/ping');
const movieCommand = require('./commands/movie');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

// Setup for discord bot commands
client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(movieCommand.data.name, movieCommand);

/*
    Bot Event Setup
*/
client.once(Events.ClientReady, clientReadyHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);
client.login();
