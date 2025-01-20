require('dotenv').config();

const {
    Client,
    Collection,
    Events,
    GatewayIntentBits,
} = require('discord.js');

// Events
const { clientReadyHandler } = require('./events/clientReady');
const { interactionCreateHandler } = require('./events/interactionCreateEvent');

// Commands
const pingCommand = require('./commands/ping');
const forecastCommand = require('./commands/forecast');
const astroCommand = require('./commands/astro');

// Guilds is Discords internal naming for Servers
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

// Setting up all the commands for the discord bot
client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(forecastCommand.data.name, forecastCommand);
client.commands.set(astroCommand.data.name, astroCommand);

/*
    Bot Event Setup 
*/

// Event that triggered when Bot is Logging in ('once' because it should only happen once)
client.once(Events.ClientReady, clientReadyHandler);

// Event that will be triggered/Emitted whenever there is an interaction with the bot (Slash Commands)
client.on(Events.InteractionCreate, interactionCreateHandler);


client.login();