const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
  if(member.user.bot) return;
  const welcome_message = new MessageEmbed()
                        .setColor('#F8C300')
                        .setTitle(`Welcome to **${member.guild.name}** :tada:`)
                        .setDescription(`Welcome to the server. I am a bot in **${member.guild.name}**\n I can use to find the homework, create voice channel, type /help for more information of the bot`);
  await member.send({embeds: [welcome_message]}); return;
	},
};