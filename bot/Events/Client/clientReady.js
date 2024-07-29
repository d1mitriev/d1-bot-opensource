const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Create Connect! Logged in as ${client.user.tag}`);
	},
};