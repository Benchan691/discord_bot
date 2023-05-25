const { Client, Intents, Collection, Permissions, MessageEmbed, DMChannel} = require('discord.js');
const { Error } = require("./commands/plugins/error.js");
const { Button } = require("./button_setting/add_role_code.js");
const client = new Client({
	intents: 32767,
  partials: ['USER', 'MEMBER', 'MESSAGE', 'CHANNEL']
});
const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs.readdirSync('./event/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

module.exports = {
  name: 'interactionCreate',
  async execute(interaction){
    if(interaction.isButton()){
      if(interaction.message.author.id !== interaction.client.user.id) return;
      customId = interaction.customId.split(':')[0]
      switch(customId){
        case 'role_management': Button.role_moderation(interaction); break;
      }
    }
  const command = client.commands.get(interaction.commandName);

	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
  }
}