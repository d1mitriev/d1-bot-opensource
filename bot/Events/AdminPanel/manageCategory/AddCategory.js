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
            if (!interaction.isModalSubmit()) return;
            if (interaction.customId === 'addCategory') {
                const nameCategoryInput = interaction.fields.getTextInputValue('nameCategoryInput');
                const descriptionCategoryInput = interaction.fields.getTextInputValue('descriptionCategoryInput');
                const emojiCategoryInput = interaction.fields.getTextInputValue('emojiCategoryInput');

                await mongoose.connect(process.env.DATABASE_MONGODB)
                
                const newCategory = {
                    name: nameCategoryInput,
                    description: descriptionCategoryInput,
                    emoji: emojiCategoryInput,
                }


                const addCategory = await Category.create(newCategory);
                const emojis = await interaction.guild.emojis.fetch();
                const searchEmoji = emojis.find(e => e.id === newCategory.emoji);
                const emojiMention = searchEmoji.animated ? `<a:${searchEmoji.name}:${searchEmoji.id}>` : `<:${searchEmoji.name}:${searchEmoji.id}>`;
                
                const embedText = new EmbedBuilder()
                .setColor('#2c2d30')
                .setTitle('Category Added')
                .setDescription(`Name:\`\ ${addCategory.name} \`\ \nDescription:\`\ ${addCategory.description} \`\ \nFavorited emoji for channel:${emojiMention}`);
    
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
