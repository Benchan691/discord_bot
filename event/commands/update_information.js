const { SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('fs');
const { stu_db } = require('./plugins/database.js')
const { checkvaild_stu, turn } = require('./plugins/check.js');
module.exports = {
  data: new SlashCommandBuilder()
  .setName('update')
  .setDescription('update your student information')
  .addStringOption(option => option.setName('class').setDescription('Your Class, [1 to 6][A to D]').setRequired(true))
  .addStringOption(option => option.setName('classnum').setDescription('Your Class Number, in format 01 to 40').setRequired(true))
  .addStringOption(option => option.setName('subject').setDescription('Selective Subject: PHY CHEM BIO ICT BAFS ECON HIS CHIS GEOG ART\n From three can ignore it.')),
  
  async execute(interaction){

    const clas = interaction.options.getString('class').toUpperCase();
    var subject = interaction.options.getString('subject');
    const class_num = interaction.options.getString('classnum');

    if(subject !== null){subject = subject.toUpperCase().split(' ');}
    embed = checkvaild_stu([clas,class_num,subject]);
    if(embed !== null){interaction.reply({embeds: embed, ephemeral: true}); return;}
    if(subject === null){
      x = await turn(clas);
      await stu_db.set(`${interaction.user.id}`,[clas, class_num,x]).then(() =>{
      interaction.reply({content: "You add your student information successfully! :tada: ",ephemeral: true});
      return;
      });
    }else{
      x = await turn(clas);
      await stu_db.set(`${interaction.user.id}`,[clas, class_num, subject.join(' ') + ' ' + x]).then(() =>{
          interaction.reply({content: "You add your student information successfully! :tada: ",ephemeral: true})
      });
    return;
    }
  }
}