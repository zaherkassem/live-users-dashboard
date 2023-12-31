import express from 'express';
import * as onLineUsersCtrl from '../controllers/onlineUsers.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: online_users
 *     description: onlineUsers operations
 */

/**
 * @swagger
 * definitions:
 *   onlineUsers:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific user
 *         example: 2
 *       first_name:
 *         type: string
 *         description: first name of the user
 *         example: Krishna
 *       last_name:
 *         type: string
 *         description: last name of the user
 *         example: Timilsina
 *       email:
 *         type: string
 *         description: email of the user
 *         required: true
 *         example: test@gmail.com
 *       password:
 *         type: string
 *         description: password of the user
 *         required: true
 *         example: "1234"
 *       status:
 *         type: integer
 *         description: status of the user
 *         example: 1
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: User creation datetime
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: User update datetime
 *   Error:
 *     type: object
 *     properties:
 *        message:
 *           type: string
 *        error:
 *           type: boolean
 *           default: true
 */

/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     description: |
 *            For accessing the API a valid JWT token must be passed in all the queries in
 *            the 'Authorization' header.
 *
 *
 *            A valid JWT token is generated by the API and returned as answer of a call
 *            to the route /auth/login giving a valid user & password.
 *
 *
 *            The following syntax must be used in the 'Authorization' header:
 *
 *            Bearer xxxxxx.yyyyyyy.zzzzzz
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *
 */

router
  .route('/')

  /**
   * @swagger
   * /onlineUsers:
   *   post:
   *     tags:
   *       - onlineUsers
   *     summary: "Create a new login"
   *     security:
   *        - Bearer: []
   *     operationId: storeUser
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Created user object
   *         required: true
   *         schema:
   *           $ref: "#/definitions/User"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/User"
   *       403:
   *          description: User not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .post(validate(schema.storeUser), (req, res) => {
    onLineUsersCtrl.store(req, res);
  })

  /**
   * @swagger
   * /onlineUsers:
   *   get:
   *     tags:
   *       - user
   *     summary: "List all onlineUsers"
   *     operationId: findAll
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *            type: object
   */

  .get((req, res) => {
    onLineUsersCtrl.findAll(req, res);
  });

router
  .route('/:id')

  /**
   * @swagger
   * /online_users/{id}:
   *   get:
   *     tags:
   *       - online_users
   *     summary: Find the online_users  by user ID
   *     operationId: findById
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id of user that needs to be fetched
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/User"
   *       404:
   *          description: User not found
   *          schema:
   *             $ref: '#/definitions/Error'
   */

  .get((req, res) => {
    console.log({ online_users: req });
    onLineUsersCtrl.findById(req, res);
  })

  /**
   * @swagger
   * /online_users/{id}:
   *   put:
   *     tags:
   *       - user
   *     summary: "Update an existing user by ID"
   *     security:
   *       - Bearer: []
   *     operationId: update
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id that need to be updated
   *         required: true
   *         type: integer
   *       - name: body
   *         in: body
   *         description: Updated user object
   *         required: true
   *         schema:
   *           $ref: "#/definitions/User"
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: "#/definitions/User"
   *       400:
   *         description: Invalid user
   */

  .put(isAuthenticated, (req, res) => {
    onLineUsersCtrl.update(req, res);
  })

  /**
   * @swagger
   * /online_users/{id}:
   *   delete:
   *     tags:
   *       - user
   *     summary: Delete the user by ID
   *     security:
   *       - Bearer: []
   *     operationId: destroy
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id of user that needs to be deleted
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *          description: "Invalid ID"
   */

  .delete(isAuthenticated, (req, res) => {
    onLineUsersCtrl.destroy(req, res);
  });

export default router;
