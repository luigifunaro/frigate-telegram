const fs = require('fs');
const path = require('path');
const logger = require('./logger.js');

const processedEventsFile = path.join(__dirname, '../db/processedEvents.json');
let processedEventIds = new Map(); // Uso Map per associare ID e timestamp

const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 giorni in millisecondi

// Carico gli ID degli eventi al momento dell'avvio
const loadProcessedEventIds = () => {
    try {
        if (fs.existsSync(processedEventsFile)) {
            const data = fs.readFileSync(processedEventsFile, 'utf8');
            const entries = JSON.parse(data);
            processedEventIds = new Map(entries);
            logger.info('Events ID processed successfully.');
        }
    } catch (error) {
        console.error('Error reading events ID:', error);
        processedEventIds = new Map(); // Ripristino Map vuoto
    }
};

// Salvo gli ID degli eventi su file
const saveProcessedEventIds = () => {
    try {
        const entries = Array.from(processedEventIds.entries());
        fs.writeFileSync(processedEventsFile, JSON.stringify(entries), 'utf8');
        logger.info('Events ID saved.');
    } catch (error) {
        console.error('Error saving events ID:', error);
    }
};

// Aggiungo un nuovo ID al set e salva su file
const addProcessedEventId = (eventId) => {
    const timestamp = Date.now();
    processedEventIds.set(eventId, timestamp);
    saveProcessedEventIds();
};

// Controllo se un ID è già stato processato
const hasProcessedEventId = (eventId) => {
    return processedEventIds.has(eventId);
};

// Funzione per pulire gli ID vecchi
const cleanUpOldEventIds = () => {
    const now = Date.now();
    let removedCount = 0;

    for (const [eventId, timestamp] of processedEventIds.entries()) {
        if (now - timestamp > EXPIRATION_TIME) {
            processedEventIds.delete(eventId);
            removedCount++;
        }
    }

    if (removedCount > 0) {
        logger.info(`Deleted ${removedCount} old events ID.`);
        saveProcessedEventIds();
    }
};

// Eseguo la pulizia al caricamento e a intervalli regolari
loadProcessedEventIds();
cleanUpOldEventIds(); // Pulizia iniziale
setInterval(cleanUpOldEventIds, 24 * 60 * 60 * 1000); // Ogni 24 ore

module.exports = {
    addProcessedEventId,
    hasProcessedEventId
};