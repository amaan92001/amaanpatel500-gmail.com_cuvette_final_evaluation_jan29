const express = require('express');
const { createFolder, getFolders, deleteFolder } = require('../controllers/FolderController');
const authenticateToken = require('../Middleware/Authenticate');

const router = express.Router();

router.post('/', authenticateToken, createFolder);
router.get('/', authenticateToken, getFolders);
router.delete('/:id', authenticateToken, deleteFolder);

module.exports = router;
