const util = require('util');

const epochToDateTime = (epoch) => {
    return new Date(epoch * 1000).toLocaleString();
};

const getEpochTimestampFromSecondsAgo = (seconds) => {
    const actual_dateTime = Date.now();
    return Math.floor((actual_dateTime - (seconds * 1000)) / 1000);
};

const formatEventMessage = (event) => {
    return util.format(
        `<b>${event.label === 'person' ? 'PERSONA RILEVATA' : event.label === 'cat' ? 'GATTO RILEVATO' : 'NUOVO EVENTO: ' + event.label.toUpperCase()} </b>`,
        `<i>Telecamera: ${event.camera}</i>`,
    );
};

module.exports = { epochToDateTime, getEpochTimestampFromSecondsAgo, formatEventMessage };
