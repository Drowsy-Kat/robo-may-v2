const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pings nathanial'),
    async execute(interaction) {
        console.log("pinging")
        const nathanial = await interaction.client.users.fetch('591944567239081995')
        console.log(`${nathanial}`)
        await interaction.reply(`${nathanial}`)
    }

}