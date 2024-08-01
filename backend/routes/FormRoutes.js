const express = require('express');
const {
    createForm, getForms, deleteForm, getSingleForm, updateForm, getFormsByFolder, submitForm, updateTheme, 
    ViewsCount,
    StartsCount,
    CompletionRate} = require('../controllers/FormController');
const authenticateToken = require('../Middleware/Authenticate');
const router = express.Router();


router.post('/', authenticateToken, createForm);
router.get('/', authenticateToken, getForms);
router.get('/folder/:folderId', authenticateToken, getFormsByFolder);
router.get('/:id', authenticateToken, getSingleForm);
router.put('/:id', authenticateToken, updateForm);
router.delete('/:id', authenticateToken, deleteForm);
router.post('/submit', authenticateToken, submitForm);
router.post('/:formId/increment-views', ViewsCount);
router.post('/:formId/increment-starts', StartsCount);
router.post('/:id/update-completion-rate', CompletionRate);

router.patch('/:id/theme', authenticateToken, updateTheme);

module.exports = router;
