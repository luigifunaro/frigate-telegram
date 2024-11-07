const axios = require('axios').default;
const logger = require('./logger.js');
const processedEvents = require('./processedEvents.js');
const { getEpochTimestampFromSecondsAgo } = require('./utils.js');
const { frigate, polling } = require('../config/settings.js').config;

const fetchEvents = async () => {
    try {
        const url = `${frigate.url}/api/events`;

        const response = await axios.get(url, {
            params: {
                cameras: frigate.cameras.join(','),
                after: getEpochTimestampFromSecondsAgo(polling.interval * 2),
                has_clip: 1,
                in_progress: 0
            }
        });

        // Filtro gli eventi già processati
        const newEvents = response.data.filter(event => !processedEvents.hasProcessedEventId(event.id));

        return newEvents;
    } catch (error) {
        logger.warn(`Cannot fetch events for camera ${camera}`, error);
        return [];
    }
};

module.exports = { fetchEvents };