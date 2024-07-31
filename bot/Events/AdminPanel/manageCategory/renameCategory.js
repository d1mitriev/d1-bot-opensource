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
            if (interaction.customId === 'renameModal') {
                const renameInput = interaction.fields.getTextInputValue('renameInput');
                await mongoose.connect(process.env.DATABASE_MONGODB)
                const selectedCategory = dataStore.selectedCategory;
                const CategoryRename = await Category.findByIdAndUpdate( selectedCategory, { $set: {name: renameInput}});
                const embedText = new EmbedBuilder()
                .setColor('#2c2d30')
                .setTitle('Rename Succesfull');
    
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
