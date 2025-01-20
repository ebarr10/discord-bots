async function interactionCreateHandler(interaction) {
    // If interaction is not a slash command
    if (!interaction.isChatInputCommand()) {
        return;
    }

    // Get the command
    const command = interaction.client.commands.get(interaction.commandName);

    // If the command doesn't exist
    if (!command) {
        return;
    }

    try {
        // Executing the shared function for commands
        await command.execute(interaction);
        console.log(`${interaction.user.username} used command -- '${interaction.commandName}' -- in Server '${interaction.guild}'`);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error executing this command!',
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: 'There was an error executing this command!',
                ephemeral: true,
            });
        }
    }
}

module.exports = {
    interactionCreateHandler,
};