const config = {
    telegram: {
        token: process.env.TELEGRAM_BOT_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID
    },
    frigate: {
        url: process.env.FRIGATE_URL,
        mediaUrl: process.env.FRIGATE_MEDIA_URL || process.env.FRIGATE_URL,
        camera: process.env.CAMERA,
        zones: process.env.ZONES,
        label: process.env.LABEL
    },
    dateTime: {
        timezone: process.env.TIMEZONE || 'Europe/Rome',
        locales: process.env.LOCALES || 'it-IT'
    },
    polling: {
        interval: process.env.POLLING_INTERVAL || 60
    }
};

module.exports = { config };