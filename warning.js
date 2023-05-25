const { Client, Intents, Collection, Permissions, MessageEmbed, DMChannel} = require('discord.js');
const { token , botId, rolechannelId, protector, developer} = require('./event/config.json');
const client = new Client({
	intents: 32767,
  partials: ['USER', 'MEMBER', 'MESSAGE', 'CHANNEL']
});

msg = new Array()
msg.push('https://tenor.com/view/fuck-you-angry-mad-gif-16308847')
msg.push('https://tenor.com/view/eat-shit-and-die-pose-cricket-spin-gif-16931248')
msg.push('https://tenor.com/view/face-wipe-kid-funny-gif-3530759')
count = 0;
client.once('ready', () => {
  console.log("ready!");
	client.users.fetch('645629511278264340').then(user => {
    while(count < 5){
      for(x = 0; x < msg.length; x++){
        user.send(msg[x]);
      }
      count = count + 1
    }
  })
});

client.login(token)