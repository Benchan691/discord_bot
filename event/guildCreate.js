const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "guildCreate",
  async execute(guild){
    const des = `You are the owner of **${guild.name}**,This is what can the bot do:\n`+
                `**Private channel**: You can create a channel name ***Join me***, then `+
                `the bot will create a \nprivate channel for the user who join the `+
                `***Join me*** channel in the same catergory.\n\n`+
                `**Homework Management**: User can add a homework into database by command\n`+
                `***/add***, student can use ***/find*** to find a homework,detail the description.\n\n` +
                `**Role/subject creation**: You can use create role choice for user to select,deail in the description.\n\n` +
                `**Dictionary**: You can use this bot search for vocabulary, dictionary copied from free dictionary API`
    const guide = new MessageEmbed()
                      .setColor('#FFFACD')
                      .setTitle(`Thank you use MyBot Pro in ${guild.name} :smiling_face_with_3_hearts: `)
                      .setDescription(des);
    owner = guild.client.users.cache.find(user => user.id === guild.ownerId);
    owner.send({embeds: [guide]});
  }
}