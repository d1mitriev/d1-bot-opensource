console.log("Starting discord bot")
require('dotenv').config();
const botToken = process.env.DISCORD_TOKEN;

//import files, Test
const pingCommand = require(`./commands/ping`);

const commands = [
    pingCommand,
]

const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
    ]
     });

//Starting bot notification
client.once(Events.ClientReady, readyClient => {
    console.log(`Bot is ready! Tag is ${client.user.tag}`);
    commands.forEach((command) => {
        console.log(`Command initialized ${command.name}`)
        command.onInitial(client)
    })
    console.log(`========= BOT IS STARTING! ===========`);
});

client.on('messageCreate', (message) => {
    for (const command of commands) {
        if (message.content.startsWith(command.name)) {
            command.exec(message)
            break
        }
    }
});

//End Point
client.login(botToken);