const { Permissions } = require('discord.js');
const {  protector } = require('./config.json');

module.exports = {
  name: 'guildBanAdd',
  async execute(guildban){
    const guild = guildban.guild;
    const client = guild.client;
    const per = guild.me.permissions;
    if(!(per.has(Permissions.FLAGS.BAN_MEMBERS) && per.has(Permissions.FLAGS.CREATE_INSTANT_INVITE))) return;

    const fetchedLogs = await guild.fetchAuditLogs({
          limit: 1,
          type: 'MEMBER_BAN',
    });

    const banlog = fetchedLogs.entries.first();

    if(!banlog) return;

    const { executor, target } = banlog;
    
    if (protector.indexOf(guildban.user.id) !== -1) {
      var need_kick = guild.members;
      var final = need_kick.cache.get(executor.id);
      if(final.user.bot) return;
      guild.bans.remove(guildban.user);
      final.send("抵你死啦 DLLM Fuck YOU ON99 想踢走我你而家得到報應啦 :middle_finger: ");
      final.ban({reason: "想踢走無辜嘅人"});
      chnnel = guild.channels.cache.find(chn => chn.name === "announcement");
      guild.invites.create(chnnel).then(invite => {
        guildban.user.send("https://discord.gg/" + invite.code); 
      })
    }
  }
}