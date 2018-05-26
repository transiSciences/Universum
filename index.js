const Discord = require('discord.js');
const Client = new Discord.Client();
const prefix = '!';
const name = 'Universum';
const version = 'Alpha 0.0.1';
const lang = 'fr';

Client.on('ready', () => {
    console.log(`Logged in as ${name} ${version} ${lang}`)
    Client.user.setActivity('!help | Développement en cours !')
});

Client.on('message', (message, member) => {
    //commande help
    if (message.content === prefix + 'help') {
        var help_embed = new Discord.RichEmbed()
            .setColor('#ffff')
            .setTitle(`Les commandes disponibles du bot ${Client.user.username}`)
            .setDescription(`Le prefix est: ` + prefix)
            .setThumbnail(`${Client.user.avatarURL}`)
            .addBlankField(true)
            .addField(":book: Utilitaires", "!help => Te permet d'accéder au menu des commandes\n!ping => Te donne le temps de réponse du bot en millisecondes")
            .addBlankField(true)
            .addField("🙂 Fun", "Aucune commande n'a encore été développée dans cette section")
            .addBlankField(true)
            .addField("🔒 Moderation", "Aucune commande n'a encore été développée dans cette section")
            .setFooter(Client.user.username)
            .setTimestamp()
        message.author.send(help_embed)
        message.channel.send("Les commandes utilisables vous ont été envoyées en MP. :envelope_with_arrow:")
    }

    //commande ping
    if (message.content === prefix + 'ping') {
        var ping_embed = new Discord.RichEmbed()
            .setColor('#ffff')
            .setDescription(`pong :ping_pong: | \`${Date.now() - message.createdTimestamp} ms\``)
        message.channel.send(ping_embed)
    }

})

Client.login(process.env.TOKEN)
