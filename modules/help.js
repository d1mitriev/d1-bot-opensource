const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "d!help",
	exec: async (message) => {
        await message.reply(`Commands:\nd!order - create order embed`);
        await message.delete()
    },
    onInitial: async (client, mongoProvider) => {
  }
}