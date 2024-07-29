const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, GuildMember } = require('discord.js');
const { execute } = require('../Client/clientReady');
const config = require('../../config');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param { ButtonInteraction } interaction
     */
    async execute(interaction) {
        if (!interaction.isStringSelectMenu() && !interaction.isButton() || !interaction.customId.startsWith('listProducts') && interaction.customId !== 'listProducts') return;

        try{
            const actionOrderRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('createOrderTicket')
                        .setLabel('・Confirmed/Create Chat')
                        .setStyle(ButtonStyle.Success)
                )
            const OrderEmbedImage = new EmbedBuilder()
                .setImage(config.DISCORD_ORDER_DELIMITER_IMG);
            const OrderEmbedText = new EmbedBuilder()
                .setTitle('Buy Design')
                .setDescription('Buy or GAY')
                .setImage(config.DISCORD_ORDER_DELIMITER_IMG);

            return await interaction.update({
                    embeds: [OrderEmbedImage, OrderEmbedText],
                    components: [actionOrderRow],
            });

        }
        catch(error){
            return console.error(error);
        }

    }
}