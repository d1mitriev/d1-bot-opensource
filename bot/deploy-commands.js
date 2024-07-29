require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const globalCommandNames = ['help', 'black-list'];
const globalCommands = [];
const guildCommands = [];
const foldersPath = path.join(__dirname, 'Commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			if (globalCommandNames.includes(command.data.name)) {
				globalCommands.push(command.data.toJSON());
			}
			else {
				guildCommands.push(command.data.toJSON());
			}
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		if (globalCommands.length > 0) {
			const globalData = await rest.put(
				Routes.applicationCommands(process.env.DISCORD_CLIEND_ID),
				{ body: globalCommands },
			);
			console.log(`Successfully registered ${globalData.length} global application (/) commands.`);
		}
		if (guildCommands.length > 0) {
			const guildData = await rest.put(
				Routes.applicationGuildCommands(process.env.DISCORD_CLIEND_ID, process.env.DISCORD_GUILD_ID),
				{ body: guildCommands },
			);
			console.log(`Successfully reloaded ${guildData.length} application (/) commands for the guild.`);
		}
	}
	catch (error) {
		console.error(error);
	}
})();
