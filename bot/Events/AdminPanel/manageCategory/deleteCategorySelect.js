const { Events, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder, GuildMember } = require('discord.js');
const mongoose = require('mongoose');
const Category = require('../../../models/category');
const config = require('../../../config')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try{
            if (!interaction.isStringSelectMenu() && !interaction.isButton() || !interaction.customId.startsWith('deleteCategorySelect') && interaction.customId !== 'deleteCategorySelect') return;
            
            //Mongoose
            await mongoose.connect(process.env.DATABASE_MONGODB)
            const CategoryRecords = await Category.find();

            let options = [];

            for (const category of CategoryRecords) {
                options.push(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(category.name)
                        .setDescription(category.description.slice(0, 99))
                        .setValue(category._id.toString())
                        .setEmoji('1268278741134737570')
                )
            }

            const selectMenu = new StringSelectMenuBuilder()
			.setCustomId('deleteCategory')
			.setPlaceholder('Select a category for delete')
			.addOptions(options);
            const actionListRow = new ActionRowBuilder().addComponents(selectMenu);
            
            const embedText = new EmbedBuilder()
                .setColor('#2c2d30')
                .setImage(config.DISCORD_ORDER_DELIMITER_IMG)
                .setTitle('Delete category')

            await interaction.update({
                    embeds: [embedText],
                    components: [actionListRow],
                    ephemeral: true
                });
            }
        catch(error){
            return console.error(error);
        }

    }
}
