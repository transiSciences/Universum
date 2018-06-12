const Discord = require('discord.js');
const Client = new Discord.Client();
const prefix = '!';
const name = 'Universum';
const version = 'Alpha 0.0.1';
const lang = 'fr';
const cooldown = new Set();
const cdseconds = 10;
const os = require('os');
var cpu = os.loadavg();

var embedjoin = new Discord.RichEmbed()
    .setTitle("-------------------------------------")
    .addField(":wave: Bienvenue sur le serveur Universum !", "-------------------------------------")
    .addField(`:smile: J'espère que tu passeras un bon moment !`, "-------------------------------------")
    .addField(":wink: N'hésite pas à faire un tour #reglement !", "-------------------------------------")
    .setColor("0x07CAF7")

var embedleave = new Discord.RichEmbed()
    .setTitle("-------------------------------------")
    .addField(":worried: Un membre a quitté le serveur Universum !", "-------------------------------------")
    .addField(`:smile: J'espère quele serveur lui a plu !`, "-------------------------------------")
    .addField(":wave: Au plaisir de le revoir !", "-------------------------------------")
    .setColor("0x07CAF7")

Client.on('ready', () => {
    console.log(`Logged in as ${name} ${version} ${lang}`)
    Client.user.setActivity('!help | Développement en cours !')
});

Client.on('guildMemberAdd', (member) => {
    member.guild.channels.find('id', '452777552499572757').send(embedjoin)
});

Client.on('guildMemberRemove', (member) => {
    member.guild.channels.find('id', '452777552499572757').send(embedleave)
});

Client.on('message', async(message, member) => {
    //commande help
    if (message.content === prefix + 'help') {
        var help_embed = new Discord.RichEmbed()
            .setColor('#ffff')
            .setTitle(`Les commandes disponibles du bot ${Client.user.username}`)
            .setDescription(`Le prefix est: ` + prefix)
            .setThumbnail(`${Client.user.avatarURL}`)
            .addBlankField(true)
            .addField(":book: Utilitaires", "!help => Te permet d'accéder au menu des commandes\n!ping => Te donne le temps de réponse du bot en millisecondes\n!invite => Te permet d'inviter le bot sur ton serveur\n!msg => Te permet d'envoyer un message à un utilisateur utilisation: `!msg <@User#1234> Le message`\n!mc => Te donne le nombre de membre sur le serveur")
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
        const m = await message.channel.send("Loading...");
        m.edit(`Pong! Ping local \`${m.createdTimestamp - message.createdTimestamp} ms\`. Ping API \`${Math.round(Client.ping)} ms\``);
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
        message.delete()
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
        receiver.send(msg_embed)
    }

    //commande mc
    if (message.content === prefix + 'mc') {
        if (cooldown.has(message.author.id)) return message.channel.send('Tu dois attendre 10 secondes avant de povoir réutiliser la commande')
        let memberCount = message.guild.memberCount;
        cooldown.add(message.author.id)
        message.channel.send(`Nous sommes actuellement **${memberCount}** sur le serveur`)
        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, cdseconds * 1000);
    }

    //commande vent
    if (message.content === prefix + 'vent') {
        message.delete()
        message.channel.send("Un courant d'air passa sur le champ de bataille :cloud_tornado: ")
    }

    //commande test
    if (message.content === prefix + 'test') {
        message.channel.send("Usage mémoire " + Math.ceil(cpu[1] * 100) / 10 + "%")
    }

    //commande tic-tac-toe
    if (message.content === prefix + 'tic-tac-toe') {
        var player_1 = message.author.username;
        const ttt = await message.channel.send(`Jouez avec **${message.author.username}** en utilisant la commande \`!join ${message.author.username}\`\n**Ne commencer la partie seulement si vous en avez le temps !**`)
        if (message.content === prefix + `join ${player_1}`) {
            ttt.edit(`\`\`\`1A | 1B | 1C\n------------\n2A | 2B | 2C\n------------\n3A | 3B | 3C\`\`\``)
        }
    } else {}
})

Client.on('message', message => {
    if (message.author === Client.user) return;
});

Client.login(process.env.TOKEN)
