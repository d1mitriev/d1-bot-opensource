require('dotenv').config();

const eventHandler = require('./Handlers/eventHandler');
const commandHandler = require('./Handlers/commandHandler');
const MongoProvider = require('./mongoProvider');
const mongoProvider = new MongoProvider();

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ 
        intents: [
	    	GatewayIntentBits.Guilds,
	    	GatewayIntentBits.GuildMembers,
	    	GatewayIntentBits.GuildModeration,
	    	GatewayIntentBits.GuildEmojisAndStickers,
	    	GatewayIntentBits.GuildIntegrations,
	    	GatewayIntentBits.GuildWebhooks,
	    	GatewayIntentBits.GuildInvites,
	    	GatewayIntentBits.GuildVoiceStates,
	    	GatewayIntentBits.GuildPresences,
	    	GatewayIntentBits.GuildMessages,
	    	GatewayIntentBits.GuildMessageReactions,
	    	GatewayIntentBits.GuildMessageTyping,
	    	GatewayIntentBits.DirectMessages,
	    	GatewayIntentBits.DirectMessageReactions,
	    	GatewayIntentBits.DirectMessageTyping,
	    	GatewayIntentBits.MessageContent,
	    	GatewayIntentBits.GuildScheduledEvents,
	    	GatewayIntentBits.AutoModerationConfiguration,
	    	GatewayIntentBits.AutoModerationExecution,
	    ],
	    partials: [
	    	Partials.User,
	    	Partials.Channel,
	    	Partials.GuildMember,
	    	Partials.Message,
	    	Partials.Reaction,
	    	Partials.GuildScheduledEvent,
	    	Partials.ThreadMember,
	    ],
        //for memory
	    sweepers: {
	    	messages: {
	    		interval: 3600,
	    		lifetime: 86400,
	    	},
	    	users: {
	    		interval: 3600,
	    		filter: () => (user) => user.bot && user.id !== client.user.id,
	    	},
	    },
     });

client.commands = new Collection();
client.cooldowns = new Collection();

eventHandler(client, MongoProvider);
commandHandler(client);

client.setMaxListeners(0);

client.login(process.env.DISCORD_TOKEN);
