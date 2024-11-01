const config = {
    telegram: {
        token: process.env.TELEGRAM_BOT_TOKEN,
        chatIds: process.env.TELEGRAM_CHAT_IDS.split(',')
    },
    frigate: {
        url: process.env.FRIGATE_URL,
        mediaUrl: process.env.FRIGATE_MEDIA_URL || process.env.FRIGATE_URL,
        cameras: process.env.CAMERAS.split(','),
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