const loadFiles = require('../Functions/fileLoader.js');

async function commandHandler(client) {
	try {
		const commandFiles = await loadFiles('Commands');
		// console.log(`Found command files: ${commandFiles}`);

		for (const file of commandFiles) {
			const command = require(file);
			// console.log(`Loading command from file: ${file}`);

			if ('data' in command) {
				client.commands.set(command.data.name, command);
				console.log(`Command ${command.data.name} loaded successfully`);
			} else {
				console.log(`[WARNING] The command in file ${file} is missing a required "data" property.`);
			}
		}
	} catch (error) {
		console.error('Error loading command files:', error);
	}
}

module.exports = commandHandler;
