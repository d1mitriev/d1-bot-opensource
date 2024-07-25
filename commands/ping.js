const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "ping",
	exec: async (message) => {
        await message.reply('Pong!');
        await message.delete()
    },
    onInitial: async (client, mongoProvider) => {
  }
}