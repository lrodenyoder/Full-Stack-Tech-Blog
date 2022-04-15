const router = require("express").Router();
const { User} = require("../../models");
const { route } = require("../home-routes");

//get all users
router.get('/', (req, res) => {
    User.findAll({
        //attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get user by id
router.get('/:id', (req, res) => {
    User.findOne({
        //attributes: { exclude: ['password'] },
        where: { id: req.params.id },
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//create new user
router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
        .then((dbUserData) => {
          //give server access to user_id, username and whether a user is logged in or not
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json(dbUserData);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

//user login (use POST to secure plaintext password) 
//TODO: verify password with bcrypt
router.post('/login', (req, res) => {
    User.findOne({
        where: { username: req.body.username }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'Username not found' });
                return;
            }
            
            //verify user. compare plaintext password to hashed password

            const correctPW = dbUserData.checkPassword(req.body.password);

            if (!correctPW) {
                res.status(400).json({ message: "Invalid password" });

                return;
            }

            

            req.session.save(() => {
              // declare session variables
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;

              res.json({ user: dbUserData, message: "Successful login!" });
            });
        });
});

//logout user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//update user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'User not found' });
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//delete user
router.delete("/:id", (req, res) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;