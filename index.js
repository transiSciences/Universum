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
            .addField(":book: Utilitaires", "!help => Te permet d'accéder au menu des commandes\n!ping => Te donne le temps de réponse du bot en millisecondes\n!invite => Te permet d'inviter le bot sur ton serveur\n!msg => Te permet d'envoyer un message à un utilisateur utilisation: `!msg <@User#1234> Le message`")
            .addBlankField(true)
            .addField("🙂 Fun", "Aucune commande n'a encore été développée dans cette section")
            .addBlankField(true)
            .addField("🔒 Moderation", "!ban => Te permet de bannir un utilisateur\n!kick => Te permet d'expluser un membre gênant")
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


    //commande ban
    if (message.content.startsWith(prefix + "ban")) {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(":x: | Tu n'a pas la permission de bannir des membres");
        if (!message.guild.member(Client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(":x: | Je n'ai pas la permission pour bannir des membres");
        let member = message.mentions.members.first();
        if (!member) return message.reply(":x: | Mauvais usage fait comme ça : `=ban @User#1234`");
        if (!member.bannable) return message.reply(":x: | Je ne peux pas le bannir")
        if (member && message.member.permissions.has("BAN_MEMBERS")) {
            message.channel.send(`${member.username} a été banni avec succès. :white_check_mark:`)
            member.send(`Vous avez été banni du serveur ${message.guild.name} par ${message.author.tag}`)
            member.ban(`banni par ${message.author.tag}`);
        }

    }


    //commande kick
    if (message.content.startsWith(prefix + 'kick')) {
        if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send(":x: | Tu n'a pas la permission d'expulser des utilisateurs");
        if (!message.guild.member(Client.user).hasPermission("MANAGE_GUILD")) return message.channel.send(":x: | Je n'ai pas la permission gérer le serveur");
        let member = message.guild.member(message.mentions.users.first());
        if (!member) return message.channel.send(":x: | Mauvais usage fais comme ça: `=kick @User#1234`")
        member.send(`Vous avez été expulsé du serveur ${message.guild.name} par ${message.author.tag}`)
        message.reply("Cet utilisateur a bien été expulsé du serveur :white_check_mark:")
        member.kick(`Expulsé par ${message.author.tag}`)
    }

    //commande invite
    if (message.content === prefix + 'invite') {
        var help_embed = new Discord.RichEmbed()
            .setColor('#ffff')
            .setDescription("Pour m'inviter sur ton serveur, [clique ici](https://discordapp.com/oauth2/authorize?client_id=436623798448553984&scope=bot&permissions=471022679)")
        message.channel.send(help_embed)
    }


    //commande msg
    if (message.content.startsWith(prefix + 'msg')) {
        let receiver = message.mentions.users.first();
        if (!receiver) return message.channel.send(":x: **Erreur** | L'utilisateur indiqué n'est pas valide")
        if (message.content.substr(4).lenght === 0) return message.channel.send(":x: | Vous devez remplir un message")
        let content = message.content.substr(4);
        var msg_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('Vous avez un message !')
            .setDescription(`Message de ${message.author.username}`)
            .addField('Contenu du message', `${content}`)
            .setFooter(`Created by transiSciences#6105`, Client.user.avatarURL)
            .setTimestamp()
    }
})

Client.login(process.env.TOKEN)
