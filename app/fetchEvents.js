const axios = require('axios').default;
const logger = require('./logger.js');
const { getEpochTimestampFromSecondsAgo } = require('./utils.js');
const { frigate, polling } = require('../config/settings.js').config;

const fetchEvents = async () => {
    try {
        const url = `${frigate.url}/api/events`;
        const response = await axios.get(url, {
            params: {
                cameras: frigate.cameras,
                after: getEpochTimestampFromSecondsAgo(polling.interval)
            }
        });

        return response.data;
    } catch (error) {
        logger.warn(`Cannot fetch events for camera ${camera}`, error);
        return [];
    }
};

module.exports = { fetchEvents };