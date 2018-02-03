class User {

    constructor(email, name = "", address = "") {
        this.email = email;
        this.address = address;
        this.name = name;

        this.creationDate = new Date();
        this.updatedDate = new Date();
    }
}

module.exports = User;