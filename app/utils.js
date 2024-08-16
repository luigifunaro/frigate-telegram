const util = require('util');

const epochToDateTime = (epoch) => {
    return new Date(epoch * 1000).toLocaleString();
};

const getEpochTimestampFromSecondsAgo = (seconds) => {
    const actual_dateTime = Date.now();
    return Math.floor((actual_dateTime - (seconds * 1000)) / 1000);
};

const formatEventMessage = (event, frigateMediaUrl) => {
    return util.format('%s\n%s\n%s\n%s',
        '⚠️⚠️ <b>EVENT DETECTED</b> ⚠️⚠️', 
        `<pre>${event.id}</pre>`, 
        `🎥 <a href="${frigateMediaUrl}/api/events/${event.id}/clip.mp4"><b>VIDEO LINK</b></a> 🎥`, 
        `<pre><i>${epochToDateTime(event.start_time)}</i>`, 
        `<i>${epochToDateTime(event.end_time)}</i></pre>`,
    );
};

module.exports = { epochToDateTime, getEpochTimestampFromSecondsAgo, formatEventMessage };