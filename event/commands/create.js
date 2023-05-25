const { SlashCommandBuilder} = require('@discordjs/builders');
const { Permissions, DMChannel } = require('discord.js');
const { Error } = require("./plugins/error.js");
const { developer } = require("./plugins/config.json");


module.exports = {
  data: new SlashCommandBuilder()
  .setName("create")
  .setDescription("Create new subject: a role and private channel in current category for the subject.")
  .addStringOption(option => option.setName('subject').setDescription('The subject name').setRequired(true)),
  
  async execute(interaction){
    if(interaction.channel instanceof DMChannel){
      await interaction.reply({embeds: [Error.channel], ephemeral: true});
      return;
    }

    if(!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) && developer.indexOf(interaction.member.id) === -1){
      await interaction.reply({embeds: [Error.permission], ephemeral: true})
      return;
    }

    const args = interaction.options.getString('subject');
    await interaction.guild.roles.create({
        name: args,
        color: 'BLUE',
      }
      ).then(async (role) => {
      await interaction.guild.channels.create(args,{
        type: "GUILD_TEXT",
        parent: interaction.channel.parent,
        permissionOverwrites: [
           {
             id: interaction.guild.roles.everyone,
             deny: [Permissions.FLAGS.VIEW_CHANNEL]
		       },
           {
             id: role.id,
             allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
           }
           ],
      }).then(async () => {
        await interaction.reply({content: "Your build up successful! :white_check_mark:", ephemeral: true})
        });
      })
  }
}