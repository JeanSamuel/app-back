/**
 * Http Error Handler
 */
export class ErrorHandler {
    status = 0;
    code = "";
    message = "";

    /**
     *
     * @param status
     * @param code
     * @param message
     */
    constructor(status, code, message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

    /**
     *
     * @param res
     * @returns {any}
     */
    send(res) {
        return res.status(this.status).json({ code: this.code, message: this.message });
    }
}

export const GENERIC_ERROR = new ErrorHandler(500, "GENERIC_ERROR", "Generic Error");