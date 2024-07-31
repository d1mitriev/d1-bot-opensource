const { Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, Intents, Collector } = require('discord.js');
const mongoose = require('mongoose');
const Category = require('../../../models/category')
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const awaitingFiles = new Set();

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param { ButtonInteraction } interaction
     */
    async execute(interaction) {
        try{
            if (interaction.customId === 'ImportJsonCategory' && interaction.isButton()) {
                awaitingFiles.add(interaction.user.id);

                await interaction.update({
                    content: 'Please upload a file with a .json extension.',
                    ephemeral: true,
                    embeds: [],
                    components: []
                });

                const filter = m => m.author.id === interaction.user.id;
                const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60_000, errors: ['time'] });

                collector.on('collect', async (message) => {
                    const attachment = message.attachments.first();
                    if (attachment) {
                        const fileExtension = path.extname(attachment.name);
                        if (fileExtension === '.json') {
                            const filePath = path.join(__dirname, attachment.name);

                            const response = await fetch(attachment.url);
                            const fileStream = fs.createWriteStream(filePath);
                            response.body.pipe(fileStream);

                            fileStream.on('finish', async () => {
                                console.log(`File ${attachment.name} has been saved locally.`);

                                try {
                                    await importData(filePath);
                                    fs.unlinkSync(filePath);
                                    console.log(`File ${attachment.name} has been deleted locally.`);

                                    awaitingFiles.delete(interaction.user.id);

                                    const embedText = new EmbedBuilder()
                                        .setColor('#2c2d30')
                                        .setTitle('Your category exports!');

                                    const actionRow = new ActionRowBuilder()
                                        .addComponents(
                                            new ButtonBuilder()
                                                .setCustomId('manageCategory')
                                                .setLabel('・Back to edit')
                                                .setStyle(ButtonStyle.Secondary),
                                        );

                                    await interaction.followUp({
                                        content: '\`\`\`The file was successfully downloaded and imported into the database.\`\`\`',
                                        ephemeral: true,
                                        embeds: [embedText],
                                        components: [actionRow],
                                    });
                                } catch (err) {
                                    console.error(err);
                                    await interaction.followUp({ content: 'An error occurred while processing the file.', ephemeral: true });
                                }
                            });
                        } else {
                            await interaction.followUp({ content: 'Please upload a file with a .json extension.', ephemeral: true });
                        }
                    } else {
                        await interaction.followUp({ content: 'No file attached. Please upload a file with a .json extension.', ephemeral: true });
                    }
                    message.delete()
                });

                collector.on('end', collected => {
                    if (collected.size === 0) {
                        interaction.followUp({ content: 'After a minute, no file was uploaded.', ephemeral: true });
                    }
                });

                async function importData(filePath) {
                    try {
                        const jsonData = fs.readFileSync(filePath, 'utf8');
                        const documents = JSON.parse(jsonData);
                        await mongoose.connect(process.env.DATABASE_MONGODB);
                        const result = await Category.insertMany(documents);
                        console.log(`${result.length} documents were inserted`);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};
