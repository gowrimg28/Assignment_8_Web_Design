module.exports = {

    mapUsertoDAO: (user) => {
        return {
            fullname: user.fullname,
            email: user.email,
            password: user.password 
        }

    }

}