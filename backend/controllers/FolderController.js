const Folder = require('../models/Folder');

const createFolder = async (req, res) => {
    const { name } = req.body;
    console.log('User ID:', req.user);
    try {
        const folder = new Folder({ name, userId: req.user.id });
        await folder.save();
        console.log('HERE');
        res.status(201).json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating folder', error });
    }
};

const getFolders = async (req, res) => {
    try {
        const folders = await Folder.find({ userId: req.user.id }).populate('forms');
        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching folders', error });
    }
};

const deleteFolder = async (req, res) => {
    const { id } = req.params;
    try {
        await Folder.findByIdAndDelete(id);
        res.status(200).json({ message: 'Folder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting folder', error });
    }
};

module.exports = { createFolder, getFolders, deleteFolder };