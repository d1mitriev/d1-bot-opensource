const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, GuildMember } = require('discord.js');
const config = require('../../config');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param { ButtonInteraction } interaction
     */
    async execute(interaction) {
        try{
            if (!interaction.isStringSelectMenu() && !interaction.isButton() || !interaction.customId.startsWith('managmentOrder') && interaction.customId !== 'managmentOrder') return;
            const actionOrderRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('manageCategory')
                    .setLabel('・Edit category')
                    .setStyle(ButtonStyle.Secondary),
                // new ButtonBuilder()
                //     .setCustomId('listProduct')
                //     .setLabel('・Edit product')
                //     .setStyle(ButtonStyle.Secondary),
            );
        
            // const embedOderImage = new EmbedBuilder()
            //     .setColor(config.DISCORD_COLOR_PRIMARY)
            //     .setImage(config.DISCORD_ORDER_OWN_IMG)
            const embedtext = new EmbedBuilder()
                .setColor('#2c2d30')
                .setImage(config.DISCORD_ORDER_DELIMITER_IMG)
                .setTitle('Manage You`re Shop');

            await interaction.reply({
                embeds: [ embedtext],
                components: [actionOrderRow],
                ephemeral: true
            });
            }
        catch(error){
            return console.error(error);
        }

    }
}