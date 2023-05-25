const { MessageEmbed } = require('discord.js')
function function_detail(f){
  h = {
    embeds: [new MessageEmbed()
         .setTitle(f.function_name)
         .setColor('#EE82EE')
         .setDescription(f.detail)],
    ephemeral: true
  }
  return h;
}
const clear = {
  function_name: 'clear',
  detail: "clear the bot messgae in the private channel, you can "
}






