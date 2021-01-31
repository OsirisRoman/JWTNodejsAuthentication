const db = require("../models");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    //Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
        .then((user) => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles,
                        },
                    },
                }).then((roles) => {
                    user.setRoles(roles).then(() => {
                        res.send({
                            message: "User was registered successfully",
                        });
                    });
                });
            } else {
                //user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully" });
                });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};
