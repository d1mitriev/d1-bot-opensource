const { Events, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder  } = require('discord.js');
const config = require('../../../config');
const mongoose = require('mongoose');
const Category = require('../../../models/category')
// const { MongoClient, ObjectId } = require('mongodb');


module.exports = {
    name: Events.InteractionCreate,
    
    async execute(interaction) {
        try{

            if (interaction.isButton() && interaction.customId === 'manageCategory'){
                //Mongoose
                await mongoose.connect(process.env.DATABASE_MONGODB)
                const CategoryRecords = await Category.find();

                let options = []
                if(CategoryRecords.length === 0){
                    const ErrorAction = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('addCategoryModal')
                                .setLabel(' ')
                                .setEmoji('1268274866847748180')
                                .setStyle(ButtonStyle.Success),
                            new ButtonBuilder()
                                .setCustomId('ImportJsonCategory')
                                .setLabel('Import')
                                .setStyle(ButtonStyle.Success),
                        );
                    await interaction.update({
                        content: '[701]Error: Modify the data in categories using import or add first category.',
                        embeds: [],
                        components: [ErrorAction],
                        ephemeral: true
                    });
                } else {
                    for (const category of CategoryRecords) {
                        options.push(
                            new StringSelectMenuOptionBuilder()
                                .setLabel(category.name)
                                .setDescription(category.description.slice(0, 99))
                                .setValue(category._id.toString())
                                .setEmoji(category.emoji)
                        )
                    }
    
                    const selectMenu = new StringSelectMenuBuilder()
                    .setCustomId('infoCategory')
                    .setPlaceholder('Select a category...')
                    .addOptions(options);
                    const actionListRow = new ActionRowBuilder().addComponents(selectMenu);
    
                    const embedText = new EmbedBuilder()
                        .setColor('#2c2d30')
                        .setImage(config.DISCORD_ORDER_DELIMITER_IMG)
                        .setTitle('Select category')
                        .setDescription('hehe + mongodb');
    
                    const actionRow = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('addCategoryModal')
                                .setLabel(' ')
                                .setEmoji('1268274866847748180')
                                .setStyle(ButtonStyle.Success),
                            new ButtonBuilder()
                                .setCustomId('deleteCategorySelect')
                                .setLabel(' ')
                                .setEmoji('1268278741134737570')
                                .setStyle(ButtonStyle.Danger),
                            new ButtonBuilder()
                                .setCustomId('exportJsonCategory')
                                .setLabel('Export')
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId('ImportJsonCategory')
                                .setLabel('Import')
                                .setStyle(ButtonStyle.Success),
                        );
    
                    await interaction.update({
                            content: ``,
                            embeds: [embedText],
                            components: [actionListRow, actionRow],
                            ephemeral: true,
                            files: []
                        });
                }
            }
        }
        catch(error){
            return console.error(error);
        }

    }
}