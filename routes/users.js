const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const shortid = require("shortid");
// User model
const User = require("../models/User");

const getInv = async () => {
  try {
    const cat = await User.find({}).select("inventory -_id");
    const catalogue = [];
    cat.forEach(({ inventory }) => {
      inventory.forEach(i => catalogue.push(i));
    });
    // console.log(catalogue);
    return catalogue;
  } catch (e) {
    console.log(e);
  }
};

//getUser
const getUser = async email => {
  try {
    return await User.findOne().byEmail(email);
  } catch (error) {
    console.log(err);
  }
};

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
    res.status(400).json({
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
        res.status(400).json({
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

//login
router.post("/login", function(req, res, next) {
  passport.authenticate("local", async function(err, user, info) {
    if (info) res.status(400).json(info);
    else {
      console.log(req.body.email);
      const catalogue = await getInv();
      const user = await getUser(req.body.email);
      res.json({
        login: "success",
        email: req.body.email,
        catalogue: catalogue,
        user: user
      });
    }
  })(req, res, next);
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
//Update item
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
      async () => {
        const catalogue = await getInv();
        const user = await getUser(email);
        res.status(200).json({ catalogue: catalogue, user: user });
      }
    );
  }
);

// Delete item
router.put("/item/delete", ({ body: { email, pname } }, res) => {
  User.findOneAndUpdate(
    { email: email },
    { $pull: { inventory: { pname: pname } } },
    async () => {
      const catalogue = await getInv();
      const user = await getUser(email);

      res.status(200).json({
        catalogue: catalogue,
        user: user
      });
    }
  );
});

//Add item
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
      async () => {
        const catalogue = await getInv();
        const user = await getUser(email);
        res.status(200).json({ catalogue: catalogue, user: user });
      }
    );
  }
);

//Add offer
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
            async () => {
              const user = await getUser(inEmail);
              res.status(200).json({
                user: user
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

//set offer status
router.put(
  "/offer/set",
  ({ body: { userEmail, otherEmail, offerId, status } }, res) => {
    console.log(status);
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
            async () => {
              const user = await getUser(otherEmail);
              res.status(200).json({
                user: user
              });
            }
          );
        }
      }
    );
  }
);

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
            async () => {
              const find = await User.aggregate([
                { $match: { email: emailPost } },
                { $unwind: "$offer" },
                { $match: { "offer.offerId": offerId } }
              ]);
              const conv = find[0].offer.conversation;

              const user = await getUser(emailPost);
              res.status(200).json({
                user: user,
                conv: conv
              });
            }
          );
        }
      }
    );
  }
);

//Get Conversation
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

module.exports = router;
