// const router = require("express").Router();
// const Schedule = require("../models/schedule");

import express from 'express';
import { Schedule } from '../models/schedule';

const router = express.Router();
// Find All
/**
 * @swagger
 *  /schedule:
 *    get:
 *      tags:
 *      - Schedule
 *      description: 모든 스케쥴 조회
 *      produces:
 *      - application/json
 *      responses:
 *        '200':
 *           description: OK
 *        '400':
 *          description: Bad request. User ID must be an integer and larger than 0.
 *        '401':
 *          description: Authorization information is missing or invalid.
 *        '404':
 *          description: A user with the specified ID was not found.
 *        '5XX':
 *          description: Unexpected error.
 */
router.get('/', (req, res) => {
  Schedule.findAll()
    .then((schedule) => {
      if (!schedule.length)
        return res.status(404).send({ err: 'Schedule not found' });
      res.send(schedule);
    })
    .catch((err) => res.status(500).send(err));
});

// Find One by scheduleId
/**
 * @swagger
 *  /schedule/scheduleId/{_id}:
 *    get:
 *      tags:
 *      - Schedule
 *      description: 일련번호(_id)에 해당하는 스케쥴 조회
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: path
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *        description: 스케쥴의 일련번호
 *      responses:
 *        '200':
 *           description: OK
 *        'XXX':
 *           description: ...
 */
router.get('/scheduleId/:scheduleId', (req, res) => {
  Schedule.findOneById(req.params.scheduleId)
    .then((schedule) => {
      if (!schedule) return res.status(404).send({ err: 'Schedule not found' });
      res.send(schedule);
    })
    .catch((err) => res.status(500).send(err));
});

// Create new schedule document
/**
 * @swagger
 *  /schedule:
 *    post:
 *      tags:
 *      - Schedule
 *      description: 스케쥴 생성
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: body
 *        name: schedule
 *        description: 생성할 스케쥴
 *        schema:
 *          type: object
 *          required:
 *            - title
 *            - content
 *          properties:
 *            title:
 *              type: string
 *            content:
 *              type: string
 *            completed:
 *              type: boolean
 *      responses:
 *        '200':
 *           description: OK
 *        'XXX':
 *           description: ...
 */
router.post('/', (req, res) => {
  Schedule.create(req.body)
    .then((schedule) => res.send(schedule))
    .catch((err) => res.status(500).send(err));
});

// updateByTodoid
/**
 * @swagger
 *  /schedule/scheduleId/{_id}:
 *    put:
 *      tags:
 *      - Schedule
 *      description: 스케쥴 수정
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: path
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *        description: 스케쥴의 일련번호
 *      - in: body
 *        name: schedule
 *        description: 수정할 스케쥴
 *        schema:
 *          type: object
 *          required:
 *            - title
 *            - content
 *            - completed
 *          properties:
 *            title:
 *              type: string
 *            content:
 *              type: string
 *            completed:
 *              type: boolean
 *      responses:
 *        '200':
 *           description: OK
 *        'XXX':
 *           description: ...
 */
router.put('/scheduleId/:scheduleId', (req, res) => {
  Schedule.updateByTodoid(req.params.scheduleId, req.body)
    .then((schedule) => res.send(schedule))
    .catch((err) => res.status(500).send(err));
});

// Delete by scheduleId
/**
 * @swagger
 *  /schedule/scheduleId/{_id}:
 *    delete:
 *      tags:
 *      - Schedule
 *      description: 일련번호(_id)에 해당하는 스케쥴 삭제
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: path
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *        description: 스케쥴의 일련번호
 *      responses:
 *        '200':
 *           description: OK
 *        'XXX':
 *           description: ...
 */
router.delete('/scheduleId/:scheduleId', (req, res) => {
  Schedule.deleteById(req.params.scheduleId)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

// module.exports = router;
export const routeSchedule = router;
