const loadFiles = require('../Functions/fileLoader');

async function eventHandler(client) {
	try {
		const eventFiles = await loadFiles('Events');

		for (const eventFile of eventFiles) {
			try {
				const eventModule = require(eventFile);
				const eventMethod = eventModule.once ? 'once' : 'on';
				const executeEvent = (...args) => eventModule.execute(...args, client);
				const target = eventModule.rest ? client.rest : client;
				target[eventMethod](eventModule.name, executeEvent);
			}
			catch (error) {
				console.error(error);
			}
		}
	}
	catch (error) {
		console.error('Error loading event files:', error);
	}
}

module.exports = eventHandler;