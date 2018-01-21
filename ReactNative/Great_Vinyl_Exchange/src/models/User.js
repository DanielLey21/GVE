class User {

    constructor(email, name, address = null) {
        this.email = email;
        this.address = address;
        this.name = name;

        this.creationDate = new Date();
        this.updatedDate = new Date();
    }
}

module.exports = User;