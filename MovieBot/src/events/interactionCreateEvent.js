async function interactionCreateHandler(interaction) {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        return;
    }

    try {
        console.log("Executing Command!");
        await command.execute(interaction);
        console.log(`${interaction.user.username} used command -- '${interaction.commandName}' -- in Server '${interaction.guild}`);
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
    interactionCreateHandler
}