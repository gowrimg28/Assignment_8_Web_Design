const { UserInputError } = require("../errors/errors")

testRegex = (pattern, str) => {
    return pattern.test(str)
}

isValidName = (fullname) => {
    // return testRegex(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/, fullname)
    return testRegex(/^([A-Za-z]+(?: [A-Za-z]+)*)$/, fullname)
}

isValidPassword = (password) => {
    return testRegex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, password)
}

isValidEmail = (email) => {
    return testRegex(/^[A-Za-z0-9._%+-]+@northeastern\.edu$/, email)
}

validateEmailField = (email) => {
    if (email == null) {
        throw new UserInputError("Email required")
    }
    if (email.length > 60) {
        throw new UserInputError("Email is too long")
    }
    if (!isValidEmail(email)) {
        throw new UserInputError("Email validation failed")
    }
}

validateNameField = (fullname) => {
    if (fullname == null) {
        throw new UserInputError("Name required")
    }
    if (fullname.length > 60) {
        throw new UserInputError("Name is too long")
    }
    if (!isValidName(fullname)) {
        throw new UserInputError("Name validation failed")
    }
}

validatePasswordField = (password) => {
    if (password == null) {
        throw new UserInputError("Password required")
    }
    if (password.length > 60) {
        throw new UserInputError("Password is too long")
    }
    if (!isValidPassword(password)) {
        throw new UserInputError("Password validation failed")
    }
}

validateUserFields = (email, fullname, password) => {
    validateEmailField(email)
    validateNameField(fullname)
    validatePasswordField(password)
}


module.exports = {
    validateEmailField,
    validateNameField, 
    validatePasswordField,
    validateUserFields
}