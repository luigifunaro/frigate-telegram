const axios = require('axios').default;

const downloadVideo = async (url) => {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
        });
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        logger.error(`Error downloading video from ${url}`, error);
        throw error;
    }
};

module.exports = { downloadVideo };