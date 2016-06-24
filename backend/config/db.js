
class dbProps {
    constructor() {
        this.base = 'mongodb://';
        this.name = 'test';
        this.username = 'test';
        this.password = 'test';
        this.prod = this.base + this.username + ':' + this.password + '@ds000000.mongolab.com:11111/' + this.name;
        this.dev = this.base + this.username + ':' + this.password + '@ds000000.mongolab.com:11111/' + this.name;
        this.local = this.base + 'localhost:27017/' + this.name;
    }
};

export const db = new dbProps;