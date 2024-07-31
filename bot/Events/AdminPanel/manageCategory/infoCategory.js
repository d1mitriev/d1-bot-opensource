const { Events, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, Intents  } = require('discord.js');
const mongoose = require('mongoose');
const Category = require('../../../models/category')
const dataStore = require('./dataStore');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param { ButtonInteraction } interaction
     */
    async execute(interaction) {
        try{
            if (interaction.customId === "infoCategory") {
                const selectedCategory = interaction.values[0];
                dataStore.selectedCategory = selectedCategory;
                await mongoose.connect(process.env.DATABASE_MONGODB)              
                const CategoryRecords = await Category.findOne({ _id: selectedCategory});

                const emojis = await interaction.guild.emojis.fetch();
                const searchEmoji = emojis.find(e => e.id === CategoryRecords.emoji);
                const emojiMention = searchEmoji.animated ? `<a:${searchEmoji.name}:${searchEmoji.id}>` : `<:${searchEmoji.name}:${searchEmoji.id}>`;

                const embedText = new EmbedBuilder()
                .setColor('#2c2d30')
                .setTitle('Select category')
                .setDescription(`\`\`\`Name: ${CategoryRecords.name}\nDescription: ${CategoryRecords.description}\nEmoji:${emojiMention}\`\`\``);
                
                const actionOrderRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('renameCategory')
                        .setLabel('・Rename')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('editDescription')
                        .setLabel('・Edit description')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('choseEmoji')
                        .setLabel('・ChoseEmoji')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('editCategory')
                        .setLabel('・Back to select caregory')
                        .setStyle(ButtonStyle.Danger),   
                );

                return await interaction.update({ 
                    ephemeral: true, 
                    embeds: [embedText],
                    components: [actionOrderRow],
                })
            }
        }

        catch(error){
            return console.error(error);
        }
    }
}
