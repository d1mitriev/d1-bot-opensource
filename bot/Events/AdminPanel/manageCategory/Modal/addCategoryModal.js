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
            if (interaction.customId === "addCategoryModal") {
                const modal = new ModalBuilder()
			        .setCustomId('addCategory')
			        .setTitle('Add new category');
                const nameCategory = new TextInputBuilder()
                    .setCustomId('nameCategoryInput')
                    .setPlaceholder('Category name')
                    .setLabel("Write name:")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
                const descriptionCategory = new TextInputBuilder()
                    .setCustomId('descriptionCategoryInput')
                    .setPlaceholder('Category description')
                    .setLabel("Write description:")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
                const emojiCategory = new TextInputBuilder()
                    .setCustomId('emojiCategoryInput')
                    .setPlaceholder('Category emoji')
                    .setLabel("Write emoji ID:")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
                const nameActionRow = new ActionRowBuilder().addComponents(nameCategory);
                const descriptionHolderActionRow = new ActionRowBuilder().addComponents(descriptionCategory);
                const emojiActionRow = new ActionRowBuilder().addComponents(emojiCategory);
                modal.addComponents(nameActionRow, descriptionHolderActionRow, emojiActionRow);
                await interaction.showModal(modal);
            }
        }
        catch(error){
            return console.error(error);
        }

    }
}
