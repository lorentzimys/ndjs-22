/**
 * @class User
 * @description User model  
 */
export class User {
    id: string | number;
    mail: string;

    constructor(opts: User) {
        const { id, mail } = opts;

        this.id = id;
        this.mail = mail;

        return this;
    }
}
