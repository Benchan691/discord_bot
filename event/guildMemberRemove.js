const { Client, Intents, Collection, Permissions, MessageEmbed, DMChannel} = require('discord.js');
const { protector } = require('./config.json');

function ban_and_remove( removelog, member ){
  const { executor, target } = removelog;
  if (protector.indexOf(target.id) !== -1) {
        var need_kick = executor.client.guilds.cache.get(member.guild.id).members;
        var final = need_kick.cache.get(executor.id);
        if(final.user.bot) return;
        final.send("抵你死啦 DLLM Fuck YOU ON99 想踢走我你而家得到報應啦 :middle_finger: ")
        final.ban()
  }
}

module.exports = {
  name: 'guildMemberRemove',
  async execute(member){
    if(member.user.bot) return;
    per = member.guild.me.permissions;
    if(!per.has(Permissions.FLAGS.BAN_MEMBERS)) return; 
    const fetchedLogs_ban = await member.guild.fetchAuditLogs({
        limit: 1,
        type:"MEMBER_BAN_ADD"
    });

    const fetchedLogs_kick = await member.guild.fetchAuditLogs({
        limit: 1,
        type:"MEMBER_KICK"
    });

    const kickLog = fetchedLogs_kick.entries.first();
    const banLog = fetchedLogs_ban.entries.first();

    if (!kickLog && !banLog) return;
    
    if(banLog.createdTimestamp < kickLog.createdTimestamp){ban_and_remove(kickLog,member);}
  }
}