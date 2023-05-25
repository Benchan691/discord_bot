const Database = require("@replit/database");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Error } = require('./plugins/error.js');
const db = new Database();
const { find_word } = require('./dictionary.js');
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = {
  data: new SlashCommandBuilder()
            .setName('vocab_ask')
            .setDescription('ask a vocabulary from the quiz database'),
  
  async execute(interaction){  
    db.getAll().then((obj) => {
      ele = Object.keys(obj);
      ele = ele.filter(w => w.split(':')[0] === "vocab");
      if(ele.length === 0){interaction.reply({embeds : [Error.database_no_word]}); return;}
      interaction.reply({content: ele[getRandomInt(ele.length)]});
      return;
    })
  }
}
