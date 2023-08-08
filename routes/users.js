
const jwt = require("jsonwebtoken");
const Router = require('express').Router

const User = require("../models/user");

const ExpressError = require("../expressError");

const { ensureLoggedIn } = require("../middleware/auth");
const router = new Router();

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/", ensureLoggedIn, async function(req, res, next) {
    try {
      let users = await User.all();
      return res.json({users})
    } catch (err) {
      return next(err);
    }
  });


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get("/:username/", ensureLoggedIn, async function(req, res, next) {
    let username = req.params.username
    try {
      let user = await User.get(username);
      console.log("user:", user)
      return res.json({user})
    } catch (err) {
      return next(err);
    }
  });
  

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", ensureLoggedIn, async function(req, res, next) {
    let username = req.params.username
    try {
      let messages = await User.messagesTo(username);
      console.log("messages:", messages)
      return res.json({messages})
    } catch (err) {
      return next(err);
    }
  });



/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/from", ensureLoggedIn, async function(req, res, next) {
    let username = req.params.username
    try {
      let messages = await User.messagesFrom(username);
      return res.json({messages})
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;