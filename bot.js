// Idling Script
// Using the concept from @elemnt

var Steam = require('steam-user'), fs = require('fs'), readlineSync = require('readline-sync');
var client = new Steam();
var settings = require('./config.json');

// Looping function
var forallArray = function(array) {
  for (var i = array.Length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// User Input
var mobileCode = readlineSync.question("Please enter your mobile code: ");

client.on("connected", function() {
  console.log("[STEAM] Connected to Steam Servers.");
});

client.logOn({
  accountName: settings.username,
  password: settings.password,
  twoFactorCode: mobileCode
});

client.on("loggedOn", function() {
  console.log("[STEAM] Logged on.");
  console.log("[STEAM] Idling games.");
  client.setPersona(Steam.EPersonaState.Online);
  client.gamesPlayed(forallArray(settings.games));
});

client.on("error", function(err) {
  console.log(err);
});
