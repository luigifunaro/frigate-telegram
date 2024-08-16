const axios = require('axios').default;
const logger = require('./logger.js');
const { getEpochTimestampFromSecondsAgo } = require('./utils.js');
const { frigate, polling } = require('../config/settings.js').config;

const fetchEvents = async () => {
    try {
        const url = `${frigate.url}/api/events`;

        const response = await axios.get(url, { // ?camera=${config.camera}&zones=${config.zones}&label=${config.label}&after=${after_value}`;
            params: {
                camera: frigate.camera,
                zones: frigate.zones,
                label: frigate.label,
                after: getEpochTimestampFromSecondsAgo(polling.interval)
            }
        });

        return response.data;
    } catch (error) {
        logger.warn('Cannot fetch events from Frigate', error);
    }
};

module.exports = { fetchEvents };