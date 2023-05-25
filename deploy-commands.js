const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./event/config.json');
const fs = require('fs');
const commands = new Array();
const commandFiles = fs.readdirSync('./event/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./event/commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);