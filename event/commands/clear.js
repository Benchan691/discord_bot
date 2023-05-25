const { SlashCommandBuilder } = require('@discordjs/builders');
const { DMChannel } = require('discord.js');
const { Error } = require('./plugins/error.js')
function deleteDM(user , resultsChannel){
  client = user.client;
  user.client.users.fetch( user.id )
.then( u => {
    u.createDM()
    .then( dmchannel => { 
        dmchannel.messages.fetch( { limit: 100 } )
        .then( messages => {
            let c = messages.size;
            messages = messages.filter( m => { return m.author.id === client.user.id } );
                messages.forEach( msg => {
                    msg.delete()
                    .then( () => {
                        c --;
                        if( c === 0 ) return;
                    } ).catch( err => { resultsChannel.send( `Error occurred while deleting DMs.\n${err}` ) } );
                } );
        } ).catch( err => { resultsChannel.send( `Error occurred while fetching DMs.\n${err}` ) } );
    } ).catch( err => { resultsChannel.send( `Error occurred while resolving DM channel.\n${err}` ) } );
} ).catch( err => { resultsChannel.send( `Error occurred while fetching user.\n${err}` ) } );
}

module.exports = {
  data: new SlashCommandBuilder()
            .setName("clear")
            .setDescription("clear the message of the bot"),
             
  async execute(interaction){
    
    if(!(interaction.channel instanceof DMChannel)){interaction.reply({embeds: [Error.channel], ephemeral: true}); return;}
    deleteDM(interaction.user, interaction.channel);
    interaction.reply({content: "DMs deleted successfully! :white_check_mark:", ephemeral: true});
    return;
  }
}