const { SlashCommandBuilder} = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, Permissions, DMChannel} = require('discord.js');
const { developer } = require("./plugins/config.json");
const { Error } = require("./plugins/error.js");
module.exports = {
  data: new SlashCommandBuilder()
  .setName("create_role_choice")
  .setDescription("For admin use only, create a message which contain role button for user to select")
  .addStringOption(option => option.setName('class').setDescription('class of these roles').setRequired(true))
  .addRoleOption(option => option.setName('role1').setDescription('role 1').setRequired(true))
  .addRoleOption(option => option.setName('role2').setDescription('role 2'))
  .addRoleOption(option => option.setName('role3').setDescription('role 3'))
  .addRoleOption(option => option.setName('role4').setDescription('role 4'))
  .addRoleOption(option => option.setName('role5').setDescription('role 5')),
  async execute(interaction){

    if(interaction.channel instanceof DMChannel){
      await interaction.reply({embeds: [Error.channel], ephemeral: true});
      return;
    }

    if(!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) && developer.indexOf(interaction.member.id) === -1){
      await interaction.reply({embeds: [Error.permission], ephemeral: true})
      return;
    }

    var roles;
    const clas = interaction.options.getString('class');

    var row = new MessageActionRow()
    const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(clas)
			.setDescription('You can add your role from here');

    for(var x = 0; x < 5; x++){
      var exist = interaction.options.getRole(`role${x + 1}`);
      if(exist !== null){row.addComponents(new MessageButton().setCustomId(`role_management:${exist.name}`).setLabel(exist.name).setStyle('PRIMARY'));}
    }
    await interaction.channel.send({embeds: [embed], components: [row] })
    await interaction.reply({content: "role choice create successfully! :white_check_mark:", ephemeral: true})
  }
  
}