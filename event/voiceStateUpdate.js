const { Permissions } = require('discord.js');


module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState, newState){
    if (oldState.member.user.bot){return;}
    if(oldState.channelId === newState.channelId){return;}

  if(oldState.channelId != null){
		var old = oldState.channel;
		if (old.name === oldState.member.displayName + "'s Room") {
			try{await oldState.channel.delete();}catch{}
		}
	}
	if(newState.channelId != null){
    if (newState.channel.name === "Join me") {
		const guild = newState.guild;
    const everyone = guild.roles.everyone;
		try{await guild.channels.create(newState.member.displayName + "'s Room", {
			type: 'GUILD_VOICE',
			userLimit: 5,
			parent: newState.channel.parent,
			permissionOverwrites: [
        {type:"role", id: everyone.id,deny: [Permissions.FLAGS.VIEW_CHANNEL,Permissions.FLAGS.CONNECT]},
        {id: newState.id, allow:[Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.MANAGE_ROLES, Permissions.FLAGS.VIEW_CHANNEL,Permissions.FLAGS.CONNECT]}]
		}).then(async (chn) => {
			await newState.setChannel(chn);
		})}catch{}
    }
    else{return;}
	}
  }
}