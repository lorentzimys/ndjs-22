/**
 * @class User
 * @description User model  
 */
class User {
    constructor(opts) {
        const { id, mail } = opts;

        this.id = id;
        this.mail = mail;

        return this;
    }
}

module.exports = { User };