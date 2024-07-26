const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { execute } = require('../../Events/clientReady');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('order-select')
        .setDescription('Create order Embed')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        console.log("debug");
        try {
            const actionOrderRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('buyDesign')
                        .setLabel('・Order Design')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setURL('https://discord.com/channels/1264233125567926352/1264909318671695952')
                        .setLabel('・Portfolio')
                        .setStyle(ButtonStyle.Link),
                );

            const embedOderext = new EmbedBuilder()
                .setColor('#2b2d31')
                .setTitle('Buy Design')
                .setDescription('Test message');

            await interaction.channel.send({
                embeds: [embedOderext],
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