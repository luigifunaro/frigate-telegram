const axios = require('axios').default;
const logger = require('./logger.js');
const { frigate } = require('../config/settings.js').config;

const fetchFrigateStatus = async () => {
    try {
        const url = `${frigate.url}/api/version`;

        const response = await axios.get(url);

        return response.status;
    } catch (error) {
        logger.warn('Cannot fetch Frigate status', error);
    }
};

module.exports = { fetchFrigateStatus };