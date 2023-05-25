const { SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Error } = require('./plugins/error.js');
const https = require("https");
function find_word_3(body,args){
    try{
      let evaldata = eval(body);
      flag = false;
      for (var x = 0; x < evaldata[0].meanings.length; x++) {
          if (evaldata[0].meanings[x].partOfSpeech === args[0]) {
              flag = true;
                break;
          }
      }
        if (flag === false) {
           return Error.dictionary;
        }
          var answer = '';
          for (var y = 0; y < evaldata[0].meanings[x].definitions.length; y++) {
                answer += 'defintion: ' + evaldata[0].meanings[x].definitions[y].definition + "\n" + 'example: ' + evaldata[0].meanings[x].definitions[y].example + "\n\n";
          }
      return new MessageEmbed()
			  .setColor('#0099ff')
		    .setTitle(args[1])
			  .setDescription(answer);
  }catch{return Error.dictionary;}
}

function dictionary_linking(wordId){
        const options = {
            host: 'api.dictionaryapi.dev',
            path: '/api/v2/entries/en/' + wordId,
            method: "GET",
        };
  return options;
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dictionary")
    .setDescription("ask the meaning of the word")
    .addStringOption(option => option
    .setName('part_of_speech')
    .setDescription('part_of_speech')
    .addChoice("Noun","noun").addChoice("Adjective","adjective")
    .addChoice("Verb","verb").addChoice("Adverb","adverb").setRequired(true))
    .addStringOption(option => option.setName('word').setDescription('word').setRequired(true)),

    find_word: find_word_3,
    dict_link: dictionary_linking,

    async execute(interaction) {
      var args = [interaction.options.getString('part_of_speech'),interaction.options.getString('word')]
      ans = await dictionary_linking(args[1]);
      body = '';
      https.get(ans,(resp) => {
        resp.on('data', (d) => {
        body += d;
      });
      resp.on('end', () => {
        interaction.reply({embeds: [find_word_3(body,args)]});
        return;
       })
     })
    }
}