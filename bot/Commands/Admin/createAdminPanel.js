const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-admin-panel')
        .setDescription('Create channel and embed for admin panel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Select the channel where to place the admin panel')),
    async execute(interaction) {  
        try {
            await interaction.deferReply({ ephemeral: true });
            
            const channel = interaction.options.getChannel('channel');
            if (!channel || channel.type !== 0) { 
                return interaction.reply('Please select a valid text channel.')
            } else {
                const channel = interaction.options.getChannel('channel');

                const actionRowAdmin = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('・Managment Order')
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId(`managmentOrder`),
            );
                await channel.send({ content:'Admin panel has been created here!', components: [actionRowAdmin] })
            }

            const actionRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(`https://discord.com/channels/@me/${channel.id}`)
                    .setLabel('・Target channel')
                    .setStyle(ButtonStyle.Link),
            )
            return await interaction.editReply({content:`Admin panel has been successfully created!\n\`\`\`\ - Channel Name: ${channel.name}\n - Channel Id:${channel.id}\`\`\`\ `, components: [actionRow],ephemeral: true});
        }
        catch (error) {
            console.error(error);
            return await interaction.editReply('An error has occurred, check the console....');
        }
    },
};