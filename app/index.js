const { processEvents, processFrigateStatus } = require('./processEvents.js');
const logger = require('./logger.js');
const { polling } = require('../config/settings.js').config;

const pollEventsWithErrorHandling = () => {
    try {
        processEvents();
    } catch (error) {
        logger.error('Error occurred during pollEvents execution:', error);
    }
};

const startPolling = () => {
    processFrigateStatus()
        .then((status) => {
            if (status === 200) {
                logger.info('Frigate is up and running. Starting polling...');

                pollEventsWithErrorHandling();
                setInterval(pollEventsWithErrorHandling, polling.interval * 1000);
            }
        });
};

startPolling();