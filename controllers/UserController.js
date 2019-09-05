const User = require('../models/User');

const UserController = {
    async index(req, res) {
        let users = await User.find();
        let data = {
            users: users
        };

        res.render('users/index', data);
    },
    create(req, res) {
        res.render('users/create');
    },
    store(req, res) {
        try {
            let user = new User(req.body);
            user.save();
            req.flash('success', 'User created');

            res.redirect('/users');
        } catch (e) {
            req.flash('errors', 'Add user fail');
            req.flash('old', req.body);
            res.redirect('back');
        }
    },
    async edit(req, res) {
        let user = await User.findOne({_id: req.params.id});
        let data = {
            user: user
        };

        res.render('users/edit', data);
    },
    async update(req, res) {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body);
            req.flash('success', 'User updated');

            res.redirect('/users');
        } catch (e) {
            req.flash('errors', 'User update fail');
            req.flash('old', req.body);
            res.redirect('back');
        }
    },
    async delete(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
            req.flash('success', 'User deleted');
        } catch (e) {
            req.flash('errors', 'User delete fail');
        }
        res.redirect('back');
    }
};

module.exports = UserController;
