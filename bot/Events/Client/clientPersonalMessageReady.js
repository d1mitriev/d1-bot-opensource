const { Events } = require('discord.js');
const {hours,minutes,day,month,year} = require('../Date/dateNow')

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.users.send('839523044682104902', `Starting - ${hours}:${minutes} | ${day}.${month}.${year}`);
	},
};