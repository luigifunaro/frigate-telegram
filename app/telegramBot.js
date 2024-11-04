const TelegramBot = require('node-telegram-bot-api');
const logger = require('./logger.js');
const { telegram } = require('../config/settings.js').config;

const token = telegram.token;
const chatIds = telegram.chatIds;

const bot = new TelegramBot(token);

// Fix for the deprecation warning
process.env['NTBA_FIX_350'] = 1;

bot.on('polling_error', (error) => {
    logger.error('Polling error:', error);
    process.exit(1);
});

const sendPhoto = (eventMessage, photoBuffer, eventId) => {
    const options = {
        caption: eventMessage,
        parse_mode: 'HTML'
    };

    const fileOptions = {
        filename: `${eventId}.jpg`,
        contentType: 'image/jpeg'
    };

    chatIds.forEach((chatId) => {
        try {
            bot.sendPhoto(chatId, photoBuffer, options, fileOptions);
            logger.info(`Photo for event ${eventId} sent to chat ${chatId}`);
        } catch (error) {
            logger.error(`Error sending photo to chat ${chatId}:`, error);
        }
    });
};

const sendVideo = (eventMessage, videoBuffer, eventId) => {
    const options = {
        caption: eventMessage,
        parse_mode: 'HTML'
    };

    const fileOptions = {
        filename: `${eventId}.mp4`,
        contentType: 'video/mp4'
    };

    chatIds.forEach((chatId) => {
        try {
            bot.sendVideo(chatId, videoBuffer, options, fileOptions);
            logger.info(`Video for event ${eventId} sent to chat ${chatId}`);
        } catch (error) {
            logger.error(`Error sending video to chat ${chatId}:`, error);
        }
    });
};

module.exports = { sendPhoto, sendVideo };