// @ts-ignore
import colors from 'colors/safe';

const logger = {
    /**
     * @param {string} msg
     */
    info: (msg) => {
        console.info(colors.cyan(msg));
    },

    /**
     * @param {string} msg
     */
    error: (msg) => {
        console.error(colors.red(msg));
    },

    /**
     * @param {string} msg
     */
    log: (msg) => {
        console.log(msg);
    },

    /**
     * @param {string} msg
     */
    success: (msg) => {
        console.log(colors.green(msg));
    },

    /**
     * @param {string} msg
     */
    warn: (msg) => {
        console.warn(colors.yellow(msg));
    }
};

export default logger;
