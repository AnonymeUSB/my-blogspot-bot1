const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, SelectMenuBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')

const { Client, GatewayIntentBits } = require("discord.js");

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]});

    bot.on('ready', () => {
        console.log("OK");
        bot.user.setActivity("Explorer le discord");// WATCHING, LISTENING ou pas type mais url:lien twitch pour STREAMING  
    });
    

bot.on('guildMemberAdd', function (member) {
    member.createDM().then(function(channel){
        channel.send('Bienvenue sur notre serveur '+member.displayName+' :) (Je suis un bot créer par Timothée REN) !!');
    }).catch(console.error)
})

bot.on('messageCreate', (message) => {
    if (message.content == '$ping'){
        message.delete(1)
        message.channel.send('Pong');
    }
    if (message.content == '$help'){
    
    message.delete(1)
        const exampleEmbed = new EmbedBuilder()
	.setColor(0x7FFFD4)
	.setTitle('Aide')
	.setURL('https://discord.js.org/')
	.setThumbnail('https://my-blogspot.000webhostapp.com/icon.jpg')
	.addFields(
		{ name: '$ping', value: 'Teste le fonctionnement du bot.', inline: true },
		{ name: '$site', value: 'Ouvre le site.', inline: true },
	)
	.setTimestamp()
	.setFooter({ text: "Demandé par "+message.author.username, iconURL: 'https://my-blogspot.000webhostapp.com/icon.jpg' });

    const categories = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId('categories')
            .setPlaceholder('Sélectionner une catégories...')
            .addOptions(
                {
                    label: 'Administration',
                    description: 'Pour le personnel !',
                    value: 'option1',
                },
                {
                    label: 'Autres',
                    description: 'Tout le patatras...',
                    value: 'option2',
                },
            ),
    )

    message.channel.send({ embeds: [exampleEmbed], components: [categories] });
    }
    if (message.content == '$site'){

        const site = new ActionRowBuilder()
        .addComponents( 
            new ButtonBuilder()
                .setLabel('Ouvrir le site')
                .setStyle("Link")
                .setURL("https://my-blogspot.000webhostapp.com")
        )

        message.channel.send({content: "Site :", components: [site]});

    }
})

bot.on('interactionCreate', interaction => {

	if (interaction.isSelectMenu) {
        if (interaction.customId === "categories"){
            if (interaction.values[0] === 'option1'){
                interaction.reply('Administration');
                interaction.editReply("test");
            }
            if (interaction.values[0] === 'option2'){
                interaction.reply('Autre')
            }
        }
    }
});

bot.login('MTAyMzU0NjY5NDM4MzcwNjE2Mg.G2DyGI.beU-CYfGCqHqjJ1Y9cxjGvg3RJoumXfZ5yD_1c')