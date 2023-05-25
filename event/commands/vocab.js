const Database = require("@replit/database");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Error } = require('./plugins/error.js');
const db = new Database();
const { dict_link, find_word } = require('./dictionary.js');
const https = require("https");
module.exports = {
  data: new SlashCommandBuilder()
            .setName('vocab_add')
            .setDescription('add a vocabulary in the quiz database')
            .addStringOption(option => option.setName('vocabulary').setDescription('New Vocabulary').setRequired(true))
            .addStringOption(option => option.setName('part_of_speech').setDescription('part_of_speech')
            .addChoice("Noun","noun").addChoice("Adjective","adjective").addChoice("Verb","verb").addChoice("Adverb","adverb").setRequired(true))
            .addStringOption(option => option.setName('chinese_meaning').setDescription('chinese meaning of the vocab').setRequired(true)),
  
  async execute(interaction){  
    vocab = interaction.options.getString('vocabulary');
    p = interaction.options.getString('part_of_speech');
    args = [p,vocab];
    link = dict_link(vocab);
    https.get(link,(resp) => {
      body = ' ';
      resp.on('data', (d) => {
        body += d;
      });
      resp.on('end', () => {
        if(Error.dictionary === find_word(body,args)){
          interaction.reply({embeds: [Error.dictionary], ephemeral: true}); return;
        }else{
          const v = {
            part_of_speech: p,
            meaning: interaction.options.getString('chinese_meaning')
          } 
          db.set("vocab:" + vocab, v)
            interaction.reply({content: "Your vocab add into databse successfully! :grinning:", ephemeral: true});
          }
        })
     })
  }
}

