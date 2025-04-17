const express = require('express');
const router = express.Router();
const { Task } = require('../models');
const authenticateJWT = require('../middlewares/authMiddleware'); // Import the middleware

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management routes
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task created successfully
 */
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user_id: req.user.id, // Associate task with authenticated user
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks for the authenticated user
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks for the authenticated user
 */
router.get('/', authenticateJWT, async (req, res) => {
  const tasks = await Task.findAll({
    where: { user_id: req.user.id }, // Only return tasks that belong to the authenticated user
  });
  res.json(tasks);
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task details for the authenticated user
 */
router.get('/:id', authenticateJWT, async (req, res) => {
  const task = await Task.findOne({
    where: { id: req.params.id, user_id: req.user.id },
  });
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
});

// Update task (only if it belongs to the authenticated user)
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put('/:id', authenticateJWT, async (req, res) => {
  const task = await Task.findOne({
    where: { id: req.params.id, user_id: req.user.id },
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await task.update(req.body);
  res.json({ message: 'Task updated', task });
});

// Delete task (only if it belongs to the authenticated user)
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete('/:id', authenticateJWT, async (req, res) => {
  const task = await Task.findOne({
    where: { id: req.params.id, user_id: req.user.id },
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await task.destroy();
  res.json({ message: 'Task deleted' });
});

module.exports = router;
