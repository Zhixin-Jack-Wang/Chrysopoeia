const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const shortid = require("shortid");
// User model
const User = require("../models/User");

// Register Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check password match
  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // Check pass length

  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.json("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        // User exits
        // res.json('already registered');
        errors.push({ msg: "Email is already registered" });
        res.json("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        res.json("added");
        const newUser = new User({
          name,
          email,
          password,
          inventory: [],
          offer: []
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then(user => {
                res.redirect("/users/login");
              })
              .catch(err => {});
          })
        );
      }
    });
  }
});

// Login Handle
// router.post('/login', (req, res, next)=>{
//     passport.authenticate('local', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req, res, next);
// });
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    login: "success",
    email: req.body.email
  });
});

// Return user
router.post("/name", (req, res) => {
  User.findOne()
    .byEmail(req.body.email)
    .exec(function(err, user) {
      res.json(user);
    });
});

// Change name
router.put("/name", (req, res) => {
  User.findOneAndUpdate(
    { name: req.body.name },
    { name: req.body.newname },
    function(err, found) {
      if (err) throw err;
    }
  );
  res.json("update done");
});
// Update item
router.put(
  "/item/update",
  (
    {
      body: {
        pid,
        email,
        pname,
        expect,
        img,
        mode,
        description,
        ownername,
        owneremail
      }
    },
    res
  ) => {
    User.findOneAndUpdate(
      { email: email, inventory: { $elemMatch: { _id: pid } } },
      {
        $set: {
          "inventory.$.pname": pname,
          "inventory.$.expect": expect,
          "inventory.$.img": img,
          "inventory.$.mode": mode,
          "inventory.$.description": description
        }
      },
      err => {
        if (err) {
          return res.status(404).json({ message: "Error" });
        }
        return res.status(200).json({
          success: true,
          message: "success"
        });
      }
    );
  }
);

// Delete item
router.put("/item/delete", ({ body: { email, pname } }, res) => {
  User.findOneAndUpdate(
    { email: email },
    { $pull: { inventory: { pname: pname } } },
    err => {
      if (err) {
        return res.status(404).json({ message: "Error" });
      }
      return res.status(200).json({
        success: true,
        message: "success"
      });
    }
  );
});

// Add item
router.put(
  "/item",
  (
    {
      body: {
        email,
        pname,
        expect,
        img,
        mode,
        description,
        ownername,
        owneremail
      }
    },
    res
  ) => {
    User.findOneAndUpdate(
      { email: email },
      {
        $push: {
          inventory: {
            pname,
            expect,
            img,
            mode,
            description,
            ownername,
            owneremail
          }
        }
      },
      err => {
        if (err) {
          return res.status(404).json({ message: "Error" });
        }
        return res.status(200).json({
          success: true,
          message: "success"
        });
      }
    );
    // res.json("deleted");
  }
);

//  Add offer
router.put(
  "/offer",
  (
    {
      body: {
        inEmail,
        reEmail,
        initiator,
        receiver,
        moneyoffer,
        itemoffer,
        targetItem
      }
    },
    res
  ) => {
    const offerId = shortid.generate();
    User.findOneAndUpdate(
      { email: reEmail },
      {
        $push: {
          offer: {
            initiator,
            receiver,
            moneyoffer,
            itemoffer,
            targetItem,
            status: "incoming",
            offerId
          }
        }
      },
      err => {
        if (err) {
          return res.status(404).json({ message: "Error" });
        } else {
          User.findOneAndUpdate(
            { email: inEmail },
            {
              $push: {
                offer: {
                  initiator,
                  receiver,
                  moneyoffer,
                  itemoffer,
                  targetItem,
                  status: "outgoing",
                  offerId
                }
              }
            },
            err => {
              if (err) {
                return res.status(404).json({ message: "Error" });
              }
              return res.status(200).json({
                success: true,
                message: "success"
              });
            }
          );
        }
      }
    );
  }
);

// Get offers
// router.post('/offer', ({body:{email,offerId}},res)=>{
//     User.findOne({"email": email,"offer":{$elemMatch:{"offerId":offerId}}})
//         .then(
//             find=>{
//                 console.log(find);
//                 res.send(find.offer[0]);
//             }
//         )
//         .catch((err)=>{
//             res.json(err);
//         }
//         )

// })

router.post("/offer", ({ body: { email, offerId } }, res) => {
  User.aggregate([
    { $match: { email: email } },
    { $unwind: "$offer" },
    { $match: { "offer.offerId": offerId } }
  ])
    .then(find => {
      // console.log(find);
      res.send(find[0].offer.conversation);
    })
    .catch(err => {
      res.json(err);
    });
});

//set offer status
router.put(
  "/offer/set",
  ({ body: { userEmail, otherEmail, offerId, status } }, res) => {
    User.findOneAndUpdate(
      { email: userEmail, offer: { $elemMatch: { offerId: offerId } } },
      {
        $set: {
          "offer.$.status": status
        }
      },
      err => {
        if (err) {
          return res.status(404).json({ message: "Error" });
        } else {
          User.findOneAndUpdate(
            { email: otherEmail, offer: { $elemMatch: { offerId: offerId } } },
            {
              $set: {
                "offer.$.status": status
              }
            },
            err => {
              if (err) {
                return res.status(404).json({ message: "Error" });
              }
              return res.status(200).json({
                success: true,
                message: "success"
              });
            }
          );
        }
      }
    );
  }
);

// Get inventory
router.get("/inv", (req, res) => {
  var query = User.find({}).select("inventory -_id");

  query.exec(function(err, inventory) {
    if (err) return next(err);
    res.send(inventory);
  });
});

// Add Conversation
router.put(
  "/conv",
  ({ body: { offerId, emailPost, emailReceive, from, message } }, res) => {
    User.findOneAndUpdate(
      { email: emailPost, offer: { $elemMatch: { offerId: offerId } } },
      { $push: { "offer.$.conversation": { from, message } } },
      err => {
        if (err) {
          return res.status(404).json({ message: "Error" });
        } else {
          User.findOneAndUpdate(
            {
              email: emailReceive,
              offer: { $elemMatch: { offerId: offerId } }
            },
            { $push: { "offer.$.conversation": { from, message } } },
            err => {
              if (err) {
                return res.status(404).json({ message: "Error" });
              }
              return res.status(200).json({
                success: true,
                message: "success"
              });
            }
          );
        }
      }
    );
  }
);

module.exports = router;
