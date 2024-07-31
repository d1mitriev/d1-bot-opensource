const { Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const mongoose = require('mongoose');
const Category = require('../../../models/category')
const eventEmitter = require('../../eventEmitter');
const dataStore = require('./dataStore');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param { ButtonInteraction } interaction
     */
    async execute(interaction) {
        try{
            if(!interaction.isModalSubmit()) return;
            if (interaction.customId === 'choiseEmoji') {
                const choiseEmojiInput = interaction.fields.getTextInputValue('choiseEmojiInput');
                
                const emojis = await interaction.guild.emojis.fetch();
                const searchEmoji = emojis.find(e => e.id === choiseEmojiInput);

                if (searchEmoji) {
                    await mongoose.connect(process.env.DATABASE_MONGODB)
                    const selectedCategory = dataStore.selectedCategory;
                    const choiseEmoji = await Category.findByIdAndUpdate( selectedCategory, { $set: {emoji: choiseEmojiInput}});
                    const embedText = new EmbedBuilder()
                    .setColor('#2c2d30')
                    .setTitle('Emoji Choised');
                    const actionRow = new ActionRowBuilder()
                    .addComponents(
                    new ButtonBuilder()
                        .setCustomId('manageCategory')
                        .setLabel('・Back to edit')
                        .setStyle(ButtonStyle.Secondary),
                    );

                return await interaction.update({ 
                    ephemeral: true, 
                    embeds: [embedText],
                    components: [actionRow],
                })
                } else {
                    const embedText = new EmbedBuilder()
                    .setColor('#2c2d30')
                    .setTitle('Сын бляди, айдишник вставь! А не целый эмодзи');
                    const actionRow = new ActionRowBuilder()
                    .addComponents(
                    new ButtonBuilder()
                        .setCustomId('choseEmoji')
                        .setLabel('・Try again')
                        .setStyle(ButtonStyle.Secondary),
                    );
                    return await interaction.update({ 
                        ephemeral: true, 
                        embeds: [embedText],
                        components: [actionRow],
                    });
                }
            }
        }
        catch(error){
            return console.error(error);
        }

    }
}
