import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import OnlineUsers from '../models/onlineUsers.model';
import knex from '../config/knex';

/**
 * Find all the online_users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
  OnlineUsers.forge()
    .fetchAll()
    .then((user) => {
      console.log({ user });
      return res.json({
        error: false,
        data: user.toJSON(),
      });
    })
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      })
    );
}

/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
  const user_id = req.params.id;

  try {
    knex('online_users')
      .select('user_id', knex.raw('COUNT(*) AS logins_count'))
      .join('users', 'online_users.user_id', 'users.id')
      .select('users.created_at AS register_time', 'online_users.user_agent as user_agent')
      .where('online_users.user_id', user_id)
      .groupBy('user_id', 'users.created_at', 'online_users.user_agent')
      .then((result) => {
        res.json({
          error: false,
          data: result,
        });
      })
      .catch((err) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: err,
        });
      });
  } catch (ex) {
    console.log({ ex });
  }
}

/**
 * Store new user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
  const { first_name, last_name, email } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);

  OnlineUsers.forge({
    first_name,
    last_name,
    email,
    password,
  })
    .save()
    .then((user) =>
      res.json({
        success: true,
        data: user.toJSON(),
      })
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      })
    );
}

/**
 * Update user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
  OnlineUsers.forge({ id: req.params.id })
    .fetch({ require: true })
    .then((user) =>
      user
        .save({
          first_name: req.body.first_name || user.get('first_name'),
          last_name: req.body.last_name || user.get('last_name'),
          email: req.body.email || user.get('email'),
        })
        .then(() =>
          res.json({
            error: false,
            data: user.toJSON(),
          })
        )
        .catch((err) =>
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            data: { message: err.message },
          })
        )
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      })
    );
}

/**
 * Destroy user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
  OnlineUsers.forge({ user_id: req.params.id })
    .fetch({ require: true })
    .then((user) =>
      user
        .destroy()
        .then(() =>
          res.json({
            error: false,
            data: { message: 'User deleted successfully.' },
          })
        )
        .catch((err) =>
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            data: { message: err.message },
          })
        )
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      })
    );
}
