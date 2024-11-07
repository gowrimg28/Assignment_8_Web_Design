const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { getAllUsers, deleteUser, editUser, createUser } = require('../services/user')
const { validateEmailField, validateNameField , validateUserFields, validatePasswordField } = require("../validators/validations")
const multer = require('multer');
const upload = multer({
    dest: 'uploads/images', 
    fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
        }
    },
});


router.get('/getAll', async (req, res) => {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

router.post('/create', async (req, res) => {
    const email = req.body.email
    const fullname = req.body.fullname
    const password = req.body.password
    try {
        validateUserFields(email, fullname, password)
    } catch (error) {
        return res.status(400).json({ message : error.message })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(email, fullname, hashedPassword);
        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
        if (error.fullname === "UserAlreadyExists") {
            return res.status(409).json({ message : error.message})
        }
        return res.status(500).json({ message: error.message })
    }
})

router.put('/edit', async (req, res) => {
    const email = req.body.email
    const fullname = req.body.fullname
    const password = req.body.password
    try {
        validateEmailField(email)
        if (fullname != null) {
            validateNameField(fullname)
        }
        if (password != null) {
            validatePasswordField(password)
            const hashedPassword = await bcrypt.hash(password, 10);
            await editUser(email, fullname, hashedPassword);
        }
    } catch (error) {
        return res.status(400).json({ message : error.message })
    }

    try {
        const updatedUser = await editUser(email, fullname, password)
        res.json(updatedUser)
    } catch (error) {
        if (error.fullname === "UserDoesNotExist") {
            return res.status(409).json({ message : error.message})
        }
        res.status(500).json({ message: error.message })
    }

})

router.delete('/delete', async (req, res) => {
    let email = req.query.email || req.body.email
    if (!email) return res.status(400).json({ message: "Email required" });
    try {
        validateEmailField(email)
    } catch (error) {
        return res.status(400).json({ message : error.message })
    }

    try {
        await deleteUser(email)
        res.json({ message : "Deleted User" })
    } catch (error) {
        res.status(500).json({ message: error.message })   
    }
})

router.post('/uploadImage', upload.single('image'), async (req, res) => {
    const email = req.body.email;

    try {
        
        const user = await User.findOne({ email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.imagePath = req.file.path;
        await user.save();

        res.status(200).json({ message: 'Image uploaded successfully', path: req.file.path });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

 
module.exports = router
