const { Client, Intents, Collection, Permissions, MessageEmbed, DMChannel} = require('discord.js');

const Error = {
    date: new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle(`Date error :exclamation: `)
        .setDescription('date should be in format of dd/mm/yyyy'),
         
    subject: new MessageEmbed()
                .setColor('#E74C3C')
                .setTitle('Subject error :exclamation: ')
                .setDescription("Subject: You don't have to mind uppercase and the lowercase \n\n" +
        "Chinese: CHI \nEnglish: ENG \nMathematics: MATH \nLiberal Studies: LS\n"+
        "Economics: ECON\nGeography: GEOG \nChinese History: CHIS\nHistory: HIS\n"+
        "Physics: PHY\nChemistry: CHEM\nBiology: BIO\nBAFS: BAFS\nART: ART\n"+
        "Internet Communication Technology: ICT \nMathematics external: M2\n" +
        "Science: SCI\nMusic: MUSIC"), 

    class: new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle(`Class error :exclamation: `)
        .setDescription('Class should be between [1~6][A~D]'),

    classnum: new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle(`Class number error :exclamation: `)
        .setDescription('Class number should be in format of 01 to 40'),
    
    senior: new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle(`Senior Form Error :exclamation: `)
        .setDescription('You are senior form, you must chose a selective subject'),

    junior: new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle(`Junior Form Error :exclamation: `)
        .setDescription("You are junior form, you don't need to chose a selective subject"),  
    
    permission: new MessageEmbed()
                   .setColor('#E74C3C')
                   .setTitle("Permission Error :exclamation: ")
                   .setDescription("Please check the requirement role or permission to use this command"),
    
    role_permission_admin: function(role){
                      return new MessageEmbed()
                      .setColor('#E74C3C')
                      .setTitle("Perrmission error :exclamation: ")
                      .setDescription(`**School Bot** don't have permission to edit role ***${role}***, please open the permission again.`)
                      },  

    role_permission_member: new MessageEmbed()
                      .setColor('#E74C3C')
                      .setTitle("Perrmission error :exclamation: ")
                      .setDescription(`**School Bot** don't have permission to edit the role, please contact the stuff open the permission`),

    channel: new MessageEmbed()
                .setColor('#E74C3C')
                .setTitle('Channel Error :exclamation: ')
                .setDescription("You can't use this command in this channel, please type help for more information of the command"),

    null: new MessageEmbed()
                 .setColor('#E74C3C')
                 .setTitle(`Null input error :exclamation: `)
                 .setDescription(`You can't input two (date and subject) both in null.`),
          
    lack_subject: new MessageEmbed()
                        .setColor('#E74C3C')
                        .setTitle(`Lack Subject Error :exclamation: `)
                        .setDescription(`You didn't study this subject, please first update your personal information`),
                        
    find_role_member: new MessageEmbed()
                   .setColor('#E74C3C')
                   .setTitle('Find role Error :exclamation: ')
                   .setDescription("The role has been remove from the server, please contact the admin to delete this message."),

    find_role_admin: function(role){
                              return new MessageEmbed()
                                 .setColor('#E74C3C')
                                 .setTitle('Find role Error :exclamation: ')
                                 .setDescription(`The ${role} has been remove from the server, please delete it as soon as possible.`)
                            }
}




 




module.exports = { Error };



