const Discord = require('discord.js');
const Client = new Discord.Client();
const prefix = '!';
const name = 'Universum';
const version = 'Alpha 0.0.1';
const lang = 'fr';

//#region ----------------------DEMARRAGE DU BOT----------------------\\
Client.on('ready', () => {
    console.log(`Logged in as ${name} ${version} ${lang}`)
    Client.user.setActivity('!help | Développement en cours !')
});

Client.login(process.env.TOKEN)
