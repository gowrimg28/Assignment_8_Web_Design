class UserDoesNotExist extends Error {
    get message() {
         return "Cannot find user"
    }
    get fullname() {
         return "UserDoesNotExist"
    }
}

class UserInputError extends Error {
    constructor(message) {
         super(message)
    }
    get fullname() {
         return "UserInputError"
    }
}

class UserAlreadyExists extends Error {
    get message() {
         return "User already exists"
    }
    get fullname() {
         return "UserAlreadyExists"
    }
}


module.exports = { 
    UserDoesNotExist,
    UserInputError,
    UserAlreadyExists
}