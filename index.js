const { Client, Intents, Collection, Permissions, MessageEmbed, DMChannel} = require('discord.js');
const { token , botId, rolechannelId, protector, developer} = require('./event/config.json');
const { clear_database } = require('./test.js');
const fs = require('fs');
const client = new Client({
	intents: 32767,
  partials: ['USER', 'MEMBER', 'MESSAGE', 'CHANNEL']
});
const keepAlive = require("./server.js");

keepAlive();
clear_database();

process.on('unhandledRejection', error => {
    embed = new MessageEmbed()
            .setColor('#992D22')
            .setTitle('Your bot have an error :warning:')
            .setDescription(error.name + ': ' + error.message);
    for(var x = 0;x < developer.length; x++){
      client.users.fetch(developer[x]).then(user => {
        user.createDM().then(chn =>{
          chn.send({embeds: [embed]})
        })
      })
    }
});



client.once('ready', () => {
	console.log("Ready")
});

const eventFiles = fs.readdirSync('./event').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./event/${file}`);
		client.on(event.name, (...args) => event.execute(...args));
}

client.login(token);