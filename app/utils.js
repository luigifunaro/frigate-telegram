const util = require('util');

const epochToDateTime = (epoch) => {
    return new Date(epoch * 1000).toLocaleString();
};

const getEpochTimestampFromSecondsAgo = (seconds) => {
    const actual_dateTime = Date.now();
    return Math.floor((actual_dateTime - (seconds * 1000)) / 1000);
};

const formatEventMessage = (event) => {
    return util.format('%s\n%s\n%s\n%s',
        '⚠️⚠️ <b>NUOVO EVENTO</b> ⚠️⚠️',
        `<pre><i>Telecamera: ${event.camera}</i>`, 
        `<pre><i>${epochToDateTime(event.start_time)}</i>`, 
        `<i>${epochToDateTime(event.end_time)}</i></pre>`,
    );
};

module.exports = { epochToDateTime, getEpochTimestampFromSecondsAgo, formatEventMessage };