import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
import knex from '../config/knex';

/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
  knex('users as u')
    .select(
      'u.id',
      'u.email',
      'ou.user_ip',
      knex.raw('TIME(ou.created_at) AS login_time'),
      knex.raw('TIME(ou.updated_at) AS last_update_time'),
      knex.raw('DATE(ou.created_at) AS last_login')
    )
    .join('online_users as ou', function () {
      this.on('u.id', '=', 'ou.user_id').andOn(function () {
        this.on(
          'ou.created_at',
          '=',
          knex.raw('(SELECT MAX(created_at) FROM online_users WHERE user_id = u.id)')
        );
      });
    })
    .where('u.isOnline', true)
    .orderBy('ou.created_at', 'desc')
    .then((users) => {
      res.json({
        error: false,
        data: users,
      });
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      });
    });
}

/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
  User.forge({ id: req.params.id })
    .fetch()
    .then((user) => {
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({
          error: true,
          data: {},
        });
      } else {
        res.json({
          error: false,
          data: user.toJSON(),
        });
      }
    })
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      })
    );
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

  User.forge({
    first_name,
    last_name,
    email,
    password,
    isOnline,
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
  User.forge({ id: req.params.id })
    .fetch({ require: true })
    .then((user) =>
      user
        .save({
          first_name: req.body.first_name || user.get('first_name'),
          last_name: req.body.last_name || user.get('last_name'),
          email: req.body.email || user.get('email'),
          isOnline: req.body.isOnline ?? user.get('email'),
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
  User.forge({ id: req.params.id })
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
