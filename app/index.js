require('dotenv').config();

const { processEvents, processFrigateStatus } = require('./processEvents.js');
const logger = require('./logger.js');
const { polling } = require('../config/settings.js').config;

const pollEventsWithErrorHandling = () => {
    try {
        processEvents();
    } catch (error) {
        logger.error('Error occurred during pollEvents execution:', error);
        process.exit(1); // Exit the application with a non-zero status code
    }
};

const startPolling = async () => {
    let retries = 5; // Numero massimo di tentativi
    const retryInterval = 10000; // Intervallo tra i tentativi (in millisecondi)

    while (retries > 0) {
        try {
            const status = await processFrigateStatus();
            if (status === 200) {
                logger.info('Frigate is up and running. Starting polling...');
                pollEventsWithErrorHandling();
                setInterval(pollEventsWithErrorHandling, polling.interval * 1000);
                return;
            }
        } catch (error) {
            logger.error('Error occurred during processFrigateStatus execution:', error);
        }

        retries--;
        logger.warn(`Retrying... (${retries} retries left)`);
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
    }

    logger.error('Frigate did not start. Exiting...');
    process.exit(1);
};


startPolling();