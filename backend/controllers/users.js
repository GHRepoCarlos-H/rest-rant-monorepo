//controllers folder users.js file
const router = require('express').Router();
const db = require("../models");
const bcrypt = require('bcrypt');

const { User } = db;

router.post('/', async (req, res) => {
    let { password, ...rest } = req.body;
    const passwordDigest = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            ...rest,
            passwordDigest: passwordDigest 
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
