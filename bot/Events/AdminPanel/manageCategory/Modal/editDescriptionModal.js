const { Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle  } = require('discord.js');
const mongoose = require('mongoose');
const Category = require('../../../../models/category');
const dataStore = require('../dataStore');
module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param { ButtonInteraction } interaction
     */
    async execute(interaction) {
        try{
            if (interaction.customId === "editDescription") {

                const selectedCategory = dataStore.selectedCategory;
                await mongoose.connect(process.env.DATABASE_MONGODB)              
                const CategoryRecords = await Category.findOne({ _id: selectedCategory});
                
                const modal = new ModalBuilder()
			        .setCustomId('editDescription')
			        .setTitle('Еdit description');
                const renameInput = new TextInputBuilder()
                    .setCustomId('editDescriptionInput')
                    .setPlaceholder(CategoryRecords.description)
                    .setLabel("Whriting new description category:")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
                const PlaceHolderActionRow = new ActionRowBuilder().addComponents(renameInput);
                modal.addComponents(PlaceHolderActionRow);
                await interaction.showModal(modal);
            }
        }
        catch(error){
            return console.error(error);
        }

    }
}
