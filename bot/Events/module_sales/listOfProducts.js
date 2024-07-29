// const { Events, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, GuildMember } = require('discord.js');
// const { execute } = require('../Client/clientReady');
// const config = require('../../config');

// module.exports = {
//     name: Events.InteractionCreate,
//     /**
//      * @param { ButtonInteraction } interaction
//      */
//     async execute(interaction) {
//         await interaction.deferReply({ ephemeral: true });
//         if (!interaction.isButton() || !interaction.customId.startsWith('listOfProducts')) return;
//         try{
//             const selectMenu = new StringSelectMenuBuilder()
// 				.setCustomId('listProducts')
// 				.setPlaceholder('Select a category...')
// 				.addOptions(
//                     new StringSelectMenuOptionBuilder()
//                         .setLabel('Bulbasaur')
//                         .setDescription('The dual-type Grass/Poison Seed Pokémon.')
//                         .setValue('bulbasaur'),
//                     new StringSelectMenuOptionBuilder()
//                         .setLabel('Charmander')
//                         .setDescription('The Fire-type Lizard Pokémon.')
//                         .setValue('charmander'),
//                     new StringSelectMenuOptionBuilder()
//                         .setLabel('Squirtle')
//                         .setDescription('The Water-type Tiny Turtle Pokémon.')
//                         .setValue('squirtle'),
//                 );
//             const actionRowrderListStep = new ActionRowBuilder().addComponents(selectMenu);
//             const OrderlistEmbedImage = new EmbedBuilder()
//                 .setImage(config.DISCORD_ORDER_DELIMITER_IMG);
//             const OrderlistEmbedText = new EmbedBuilder()
//                 .setTitle('Buy Design')
//                 .setDescription('Buy or GAY')
//                 .setImage(config.DISCORD_ORDER_DELIMITER_IMG);

//             return await interaction.editReply({
//                 embeds: [OrderlistEmbedImage, OrderlistEmbedText],
//                 components: [actionRowrderListStep],
//                 ephemeral: true
//             });

//         }
//         catch(error){
//             console.error(error);
//         }

//     }
// }