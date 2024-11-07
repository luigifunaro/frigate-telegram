const { fetchEvents } = require('./fetchEvents.js');
const { formatEventMessage } = require('./utils.js');
const { fetchFrigateStatus } = require('./fetchStatus.js');
const { downloadVideo } = require('./processVideo.js');
const processedEvents = require('./processedEvents.js');
const { frigate } = require('../config/settings.js').config;
const telegram = require('./telegramBot.js');
const logger = require('./logger.js');

const processEvent = async (event) => {
    try {
        logger.info(`Event ${event.id} received`);

        const videoUrl = `${frigate.mediaUrl}/api/events/${event.id}/clip.mp4`;
        const videoBuffer = await downloadVideo(videoUrl);

        const eventMessage = formatEventMessage(event);

        telegram.sendVideo(eventMessage, videoBuffer, event.id);

        logger.info(`Event ${event.id} sent to Telegram`);

        // Aggiungo l'ID dell'evento al set degli eventi processati
        processedEvents.addProcessedEventId(event.id);
    } catch (error) {
        logger.error(`Error processing event ${event.id}`, error);
    }
};

const processEvents = async () => {
    try {
        const events = await fetchEvents();

        if (events && events.length > 0) {
            await Promise.all(events.map(processEvent));
            logger.info('All events sent to Telegram');
        }
    } catch (error) {
        logger.error('Error processing events', error);
    }
};

const processFrigateStatus = async () => {
    try {
        return await fetchFrigateStatus();
    } catch (error) {
        logger.error('Error processing Frigate status', {
            message: error.message,
            stack: error.stack
        });
    }
};

module.exports = { processEvents, processFrigateStatus };