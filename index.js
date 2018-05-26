const Discord = require('discord.js');
const Client = new Discord.Client();
const prefix = '=';
const name = 'Universum';
const version = 'Alpha 0.0.1';
const lang = 'fr';

Client.login(process.env.TOKEN)
