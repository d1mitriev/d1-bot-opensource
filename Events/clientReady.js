const { Events } = require('discord.js');

console.log(`BOT STRARTING... DEV:D1MITRIEV`)

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};