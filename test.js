const { homework } = require('./event/commands/plugins/database.js');
const {gettoday} = require('./event/commands/plugins/check.js');
const msInSecond = 1000;
const msInMinute = 60 * msInSecond;
const msInHour = 60 * msInMinute;
const msInDay = 24 * msInHour;

const desiredTimeInHours = 12; // fill out your desired hour in UTC!
const desiredTimeInMinutes = 0; // fill out your desired minutes in UTC!
const desiredTimeInSeconds = 0; // fill out your desired seconds in UTC!

const currentDate = new Date();

const controlDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate(), desiredTimeInHours, desiredTimeInMinutes, desiredTimeInSeconds);

let desiredDate;

if (currentDate.getTime() <= controlDate.getTime()) {
    desiredDate = controlDate;
}
else {
    desiredDate = new Date(controlDate.getTime() + msInDay);
}

const msDelta = desiredDate.getTime() - currentDate.getTime();

setTimeout(clear_database, msDelta);

function clear_database() {
    actualJob();
    setInterval(actualJob, msInDay);
}

function actualJob() {
    homework.getAll().then((obj) => {
  ele = Object.keys(obj); v = gettoday('today');
  ele = ele.filter(w => w.split(',')[2] === v);
  homework.deleteMultiple(ele);
})
}

module.exports = { clear_database };