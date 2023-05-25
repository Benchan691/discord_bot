const { Client, Intents, Collection, Permissions, MessageEmbed, DMChannel} = require('discord.js');
const { Error } = require('./error.js');
function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function checkdate(date){
    if(date.length != 10){return false;}
    if(date[2] != '/' && date[5] != '/'){return false;}
    var m = date.split('/');
    day = Number(m[0]); month = Number(m[1]); year = Number(m[2]);
    if(!(month >= 1 && month <= 12)){return false;}
    else{
        if((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && !(day >= 1 && day <= 31)){return false;}
        else if((month == 4 || month == 6 || month == 9 || month == 11) && !(day >= 1 && day <= 30)){return false;}
        else if(month == 2){if((leapYear(year) && !(day >= 1 && day<=28)) || (!leapYear(year) && !(day >=1 && day <= 29))){return false;}
    }
    today = new Date();
    today.setDate(today.getDate());
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = Number(today.getFullYear());
    if(yyyy > year){return false;}
    else if(yyyy == year && mm > month){return false;}
    else if(yyyy == year && mm == month && dd > day){return false;}
    return true;    
   }
}

function classvaild (Class){
  Class = Class.toUpperCase();
  if(Class.length != 2){return false;}
  else if(!(Class[0] >= '1' && Class[0] <= '6') || !(Class[1]>='A' && Class[1] <='D')){return false;}
  return true;
}

function subjectvaild(msg){
  msg = msg.toUpperCase();
  if(msg != 'CHI' && msg != 'ENG' && msg != 'MATH' && msg != 'LS' && 
  msg != 'GEOG' && msg != 'HIS' && msg != 'CHIS' && msg != 'M2' && 
  msg != 'PHY' && msg != 'CHEM' && msg != 'BIO' && msg != 'BAFS'&&
  msg != 'ECON' && msg != 'ICT' && msg != 'ART' && msg != 'MUSIC'&&
  msg != 'SCI'){return false;}
  return true;
}

function numvaild(msg){
  if(msg.length != 2){return false;}
  else if(!(msg[0] >= '0' && msg[0] <= '3')){return false;}
  else if(msg[0] == '0' && msg[1] == '0'){return false;}
  else if(!(msg[1] >= '0' && msg[1] <= '9')){return false;}
  return true;
}

function checkvaild (msg) {
  error = new Array();
    if(!classvaild(msg[0])){error.push(Error.class)}
    if(!checkdate(msg[2])){error.push(Error.date)}
    if(!subjectvaild(msg[1])){error.push(Error.subject)}
    if(error.length === 0){return null;}
    return error;  
}

function gettoday(command){
  command = command.toLowerCase();
  if(command === "tmr" || command == "tomorrow"){
      today = new Date();
      today.setDate(today.getDate()+1);
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;
  }
  else if(command === "today"){
      today = new Date();
      today.setDate(today.getDate());
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;
  }
  else{
    today = command;
  }
  return today;
}

async function turn(clas){
        if (clas[0] == '1' || clas[0] == '2') {
            sub = ["CHI", "ENG", "MATH", "LS", "HIS", "CHIS", "SCI", "ICT", "ART", "GEOG"];
        } else if (clas[0] == '3') {
            sub = ["CHI", "ENG", "MATH", "LS", "PHY", "CHEM", "BIO", "ICT", "ART", "GEOG", "BAFS", "ECON", "HIS", "CHIS"];
        } else {
            sub = ["CHI", "ENG", "MATH", "LS"];
        }
        return sub.join(' ');
}

const Subject = {
  "CHINESE": "CHI",
  "CHI": "CHI",
  "ENGLISH": "ENG",
  "ENG": "ENG",
  "MATHETMATICS": "MATH",
  "MATH": "MATH",
  "M2": "M2"
  
}
function checkvaild_stu (msg) {
  var error = new Array();
    if(!classvaild(msg[0])){error.push(Error.class)}
    if(!numvaild(msg[1])){error.push(Error.classnum)}
    if(msg[0][0]>='4' && msg[0][0]<='6'){ 
    if(msg[2] === null){error.push(Error.senior);}

    else if(msg[2].filter(sub => subjectvaild(sub)).length !== 0){error.push(Error.subject)}
    }
    else if(msg[0][0]>='1' && msg[0][0]<='3' && msg[2] !== null){ 
      error.push(Error.junior);
    }
    if(error.length === 0){return null;}
    return error;  
}
module.exports = {checkvaild , classvaild, subjectvaild, checkdate, numvaild, gettoday, turn, checkvaild_stu};