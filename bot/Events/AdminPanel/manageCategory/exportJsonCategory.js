const { Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Category = require('../../../models/category')
const fs = require('fs');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param { ButtonInteraction } interaction
     */
    async execute(interaction) {
        try{
            if (interaction.customId === 'exportJsonCategory' && interaction.isButton()) {

                await mongoose.connect(process.env.DATABASE_MONGODB)
                const CategoryRecords = await Category.find({}, {_id: 0, __v: 0});
                
                const jsonContent = JSON.stringify(CategoryRecords, null, 2);
                const filePath = './data.json';
                fs.writeFileSync(filePath, jsonContent, 'utf8');
                const attachment = new AttachmentBuilder(filePath);

                console.log('File sent to Discord');

                const embedText = new EmbedBuilder()
                .setColor('#2c2d30')
                .setTitle('You`re category exports!')
    
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
                    files: [attachment]
                })
                return fs.unlinkSync(filePath);
            }
        }
        catch(error){
            return console.error(error);
        }

    }
}
