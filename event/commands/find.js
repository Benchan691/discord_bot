const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { checkdate, gettoday } = require('./plugins/check.js');
const { homework, stu_db } = require('./plugins/database.js');
const { Error } = require('./plugins/error.js');

function result(hom, subject, date) {
answer = '';
  for(var x = 0; x < hom.length; x++){
    arr = hom[x][0].split(',');
    if(subject === null){answer += arr[1] + ': ';}
    else if(date === null){answer += arr[2] + ': ';}
    else{answer += hom[x][0].substring(3) + ': ';}
    for(var y = 0;y < hom[x][1].length; y++){
      answer += hom[x][1][y] + ' ';
    }
    answer += '\n';
  }
  title = '';
  if(subject === null){
    title = `Homework in **${date}**`;
  }else if(date === null){
    title = `All the ${subject} Homework`;
  }else{
    title = `${subject} Homework in ${date}`
  }
if(answer === ""){
  answer = "Congratulations! You don't have any homeworks in that day!"
}
return new MessageEmbed()
           .setColor('#FFD700')
           .setTitle(title)
           .setDescription(answer)
}

module.exports = {
  data: new SlashCommandBuilder()
  .setName('find')
  .setDescription('Homework filter,please do update if you have any changes of your personal information')
  .addStringOption(option => option.setName("date").setDescription("in format dd/mm/yyyy or 'tmr'/'today'").setRequired(false))
  .addStringOption(option => option.setName("subject").setDescription("Homework subject")
  .addChoice("Chinese","CHI").addChoice("English","ENG").addChoice("Mathetmatics","MATH")
  .addChoice("Liberal Studies","LS").addChoice("Physics","PHY").addChoice("Chemistry","CHEM")
  .addChoice("Biology","BIO").addChoice("M2","M2").addChoice("Economics","ECON")
  .addChoice("BAFS","BAFS").addChoice("Chinese History","CHIS").addChoice("History","HIS")
  .addChoice("Computer ICT","ICT").addChoice("Geography","GEOG")
  .addChoice("Visual Arts","ART").setRequired(false)),

  async execute(interaction){

    const ins = stu_db.get(`${interaction.user.id}`);
    var date = gettoday(interaction.options.getString('date'));
    var subject = interaction.options.getString('subject');


    ins.then(info =>{
      check_s = info[2].split(' '); clas = info[0];
      if(subject === null && date === null){ interaction.reply({embeds: [Error.null], ephemeral: true}); return; }
      if(subject !== null){if(check_s.indexOf(subject) === -1){ interaction.reply({embeds: [Error.lack_subject], ephemeral: true}); return; }}
      if(date !== null){if(!checkdate(date)){interaction.reply({embeds: [Error.date], ephemeral: true}); return;}}
      homework.getAll().then(hom => {
            hom = Object.entries(hom)
            if(subject === null){
                  hom = hom.filter((key,value) => check_s.indexOf(key[0].split(',')[1]) !== -1 && key[0].split(',')[2] === date && key[0].substring(0,2) === clas)
            }else if(date === null){
                  hom = hom.filter((key,value) => key[0].split(',')[1] === subject && key[0].substring(0,2) === clas);
            }else{
                  hom = hom.filter((key,value) => key[0].split(',')[1] === subject && key[0].substring(0,2) === clas && key[0].split(',')[2] === date)
            }
          interaction.reply({embeds: [result(hom,subject,date)]});
          return;
        })
    })
  }
}
