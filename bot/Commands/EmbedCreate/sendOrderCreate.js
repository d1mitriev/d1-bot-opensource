const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('order-select')
        .setDescription('Create order Embed')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {  
        console.log("debug");
        try {

            await interaction.deferReply({ ephemeral: true });
            const actionOrderRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji('1266502794903552031')
                        .setCustomId('listOfProducts')
                        .setLabel('・Order Design')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setURL('https://discord.com/channels/1264233125567926352/1264909318671695952')
                        .setLabel('・Portfolio')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setEmoji('1266510032405659698')
                        .setCustomId('socialShare')
                        .setLabel(' ')
                        .setStyle(ButtonStyle.Secondary),
                );
            
            const embedOderImage = new EmbedBuilder()
                .setColor(config.DISCORD_COLOR_PRIMARY)
                .setImage(config.DISCORD_ORDER_OWN_IMG)
            const embedOdertext = new EmbedBuilder()
                .setColor('#2c2d30')
                .setImage(config.DISCORD_ORDER_DELIMITER_IMG)
                .setTitle('Buy Design')
                .setDescription('Buy or GAY');

            await interaction.channel.send({
                embeds: [embedOderImage, embedOdertext],
                components: [actionOrderRow],
            });

            return await interaction.editReply('Successfully sent embed in chat!');
        }
        catch (error) {
            console.error(error);
            return await interaction.editReply('An error has occurred, check the console....');
        }
    },
};