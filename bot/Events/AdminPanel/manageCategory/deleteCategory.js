const { Events, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, GatewayIntentBits, Client  } = require('discord.js');
const mongoose = require('mongoose');
const Category = require('../../../models/category')

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param { ButtonInteraction } interaction
     */
    async execute(interaction) {
        try{
            if (interaction.customId === "deleteCategory"){
                const selectedCategory = interaction.values[0];
                await mongoose.connect(process.env.DATABASE_MONGODB)              
                const CategoryDelete = await Category.findByIdAndDelete(selectedCategory);
                const emojis = await interaction.guild.emojis.fetch();
                const searchEmoji = emojis.find(e => e.id === CategoryDelete.emoji);
                const emojiMention = searchEmoji.animated ? `<a:${searchEmoji.name}:${searchEmoji.id}>` : `<:${searchEmoji.name}:${searchEmoji.id}>`;
                const embedText = new EmbedBuilder()
                .setColor('#2c2d30')
                .setTitle('Category deleted:');
                // .setDescription(`\`\`\`Name: ${CategoryDelete.name}\nDescription: ${CategoryDelete.description}\nEmoji:${emojiMention}\`\`\``);
                
                const actionOrderRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('manageCategory')
                    .setLabel('・Back to edit')
                    .setStyle(ButtonStyle.Secondary),
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
