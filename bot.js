// Idling Script
// Using the concept from @elemnt

var Steam = require('steam-user'), fs = require('fs'), readlineSync = require('readline-sync');
var client = new Steam();
var settings = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Looping function @lynxaa
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
var mobileCode = function() {
  var code = readFileSync.question("Please enter your mobile code: ");
  return code;
}

client.logOn({
  accountName: settings.username,
  password: settings.password,
  twoFactorCode: mobileCode
})

client.on("loggedOn", function() {
  console.log("[STEAM] Logged on.");
  client.setPersona(Steam.EPersonaState.Online);
  client.gamesPlayed(forallArray(settings.games));
});

client.on("error", function(err) {
  console.log(err);
});
