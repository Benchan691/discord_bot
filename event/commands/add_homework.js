const { SlashCommandBuilder} = require('@discordjs/builders');
const check = require('./plugins/check.js');
const { homework } = require('./plugins/database.js')

module.exports = {
  data: new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add homework to a class,it will store in database and delete after the submit.")
  .addStringOption(option => option.setName("class").setDescription("Example: 6C").setRequired(true))
  .addStringOption(option => option.setName("subject").setDescription("Subject of the homework")
  .addChoice("Chinese","CHI").addChoice("English","ENG").addChoice("Mathetmatics","MATH")
  .addChoice("Liberal Studies","LS").addChoice("Physics","PHY").addChoice("Chemistry","CHEM")
  .addChoice("Biology","BIO").addChoice("M2","M2").addChoice("Economics","ECON")
  .addChoice("BAFS","BAFS").addChoice("Chinese History","CHIS").addChoice("History","HIS")
  .addChoice("Computer ICT","ICT").addChoice("Geography","GEOG")
  .addChoice("Visual Arts","ART").setRequired(true))
  .addStringOption(option => option.setName("date").setDescription("In format of dd/mm/yyyy").setRequired(true))
  .addStringOption(option => option.setName("homework").setDescription('homework name').setRequired(true)),
  
  async execute(interaction){
    const subject = interaction.options.getString('subject').toUpperCase();
    const clas = interaction.options.getString('class').toUpperCase();
    const date = check.gettoday(interaction.options.getString('date'));
    const name = interaction.options.getString('homework');
    const key = [clas,subject,date]
    embed = check.checkvaild(key);
    if(embed === null){
          homework.get(key).then(value => {
      if(value === null){value = new Array();value.push(name);}else{value.push(name);}
        homework.set(key, value).then(() => {
          interaction.reply({content: 'Add homework successfully! :white_check_mark:',ephemeral: true})
        });
      });
    }
    else{
      interaction.reply({embeds: embed, ephemeral: true});
    }
  }
}