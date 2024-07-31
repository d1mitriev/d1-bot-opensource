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
            if (interaction.customId === 'editDescription') {
                const editDescriptionInput = interaction.fields.getTextInputValue('editDescriptionInput');
                await mongoose.connect(process.env.DATABASE_MONGODB)
                const selectedCategory = dataStore.selectedCategory;
                const editDescription = await Category.findByIdAndUpdate( selectedCategory, { $set: {description: editDescriptionInput}});
                const embedText = new EmbedBuilder()
                .setColor('#2c2d30')
                .setTitle('Description Edited');
    
                const actionRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('manageCategory')
                    .setLabel('・Back to edit')
                    .setStyle(ButtonStyle.Secondary),
                );

                await interaction.update({ 
                    ephemeral: true, 
                    embeds: [embedText],
                    components: [actionRow],
                })
            }
        }
        catch(error){
            return console.error(error);
        }

    }
}
