const { Permissions } = require('discord.js');
const { Error } = require("./error.js");
const Button = {
  role_moderation: async function (interaction){
    client = interaction.client;
    var role = interaction.customId.split(':')[1];
    if(!interaction.guild.roles.cache.find(r => r.name === role)){
      interaction.reply({embeds: [Error.find_role], ephemeral: true})
      id = interaction.guild.ownerId
        client.users.fetch(id).then(user => {
            user.createDM().then(chn =>{
            chn.send({embeds: [Error.remind_delete_the_role(role)]})
          })
        })
      return;
    }
    have = interaction.member.roles.cache.find(r => r.name === role)
      if(have){
        try{
        await interaction.member.roles.remove(have);
        }catch{
          id = interaction.guild.ownerId;
          client.users.fetch(id).then(user => {
            user.send({embeds: [Error.role_permission_admin(role)]})
          })
          interaction.reply({embeds: [Error.role_permission_member], ephemeral: true});
          return;
        }
        await interaction.reply({content: `you remove **${role}** successfully! :white_check_mark: `, ephemeral: true})
        return; 
      }
      else{
      var exist = interaction.guild.roles.cache.find(r => r.name === role);
      try{
      await interaction.member.roles.add(exist);
      }catch{
          id = interaction.guild.ownerId;
          client.users.fetch(id).then(user => {
            user.send({embeds: [Error.role_permission_admin(role)]})
          })
        interaction.reply({embeds: [Error.role_permission_member], ephemeral: true});
        return;
      }
      await interaction.reply({content: `you add **${role}** successfully! :white_check_mark: `, ephemeral: true})
      }
  return;
  }    
}

module.exports = { Button }