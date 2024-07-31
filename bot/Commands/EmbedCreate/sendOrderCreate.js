const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('order-select')
        .setDescription('Create order Embed')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {  
        try {
            const selectMenu = new StringSelectMenuBuilder()
			.setCustomId('listProducts')
			.setPlaceholder('Select a category...')
			.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Bulbasaur')
                    .setDescription('The dual-type Grass/Poison Seed Pokémon.')
                    .setValue('bulbasaur'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Charmander')
                    .setDescription('The Fire-type Lizard Pokémon.')
                    .setValue('charmander'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Squirtle')
                    .setDescription('The Water-type Tiny Turtle Pokémon.')
                    .setValue('squirtle'),
            );
            
            const embedOderImage = new EmbedBuilder()
                .setColor(config.DISCORD_COLOR_PRIMARY)
                .setImage(config.DISCORD_ORDER_OWN_IMG)
            const embedOdertext = new EmbedBuilder()
                .setColor('#2c2d30')
                .setImage(config.DISCORD_ORDER_DELIMITER_IMG)
                .setTitle('Buy Design')
                .setDescription('Buy or GAY');

            return await interaction.channel.send({
                embeds: [embedOderImage, embedOdertext],
                components: [actionOrderRow],
                ephemeral: true
            });
        }
        catch (error) {
            console.error(error);
            return await interaction.editReply('An error has occurred, check the console....');
        }
    },
};