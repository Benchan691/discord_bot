const { MessageEmbed } = require('discord.js');
const { find_word, dict_link } = require('./commands/dictionary.js');
const Database = require("@replit/database");
const Error = require('./commands/plugins/error.js');
const https = require('https');
const db = new Database()
function dictionary_reply(message){
r = message.reference;
client = message.client;
      message.channel.messages.fetch(r.messageId).then(msg => {
        if(msg.author.id !== client.user.id) return;
        if(msg.content.split(':')[0] !== 'vocab') return;
        db.get(msg.content).then(value => {
          args = [value.part_of_speech, msg.content.split(':')[1]];
          link = dict_link(args[1]);
          https.get(link,(resp) => {
            body = '';
            resp.on('data', (d) => {
            body += d;
            });
            resp.on('end', () => {
              if(value.meaning !== message.content){
                  const e = {
                    content: `Sorry, your answer is wrong, the real answer is ${value.meaning} :pensive: `,
                    embeds: [find_word(body,args)]
                  }
                message.reply(e);
                return;
              }
              message.reply({content: "congrats! You are correct! :partying_face: ", embeds: [find_word(body,args)]}); return;
            })
          })
        })
      });
}
module.exports = {
	name: 'messageCreate',
	async execute(message) {
    if(message.author.bot) return;
    if(message.type === "REPLY"){
      dictionary_reply(message); return;
    }
  }
};