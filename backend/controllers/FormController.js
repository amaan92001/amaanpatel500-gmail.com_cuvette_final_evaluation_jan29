const Form = require('../models/Form');
const Folder = require('../models/Folder');

const createForm = async (req, res) => {
    const { name, folderId, flow } = req.body; 
    console.log(flow,'THIS IS FLOW');
    try {
        const form = new Form({ name, folderId, userId: req.user.id, flow });
        await form.save();

        const updatedFolder = await Folder.findByIdAndUpdate(folderId, { $push: { forms: form._id } });
        if (!updatedFolder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        res.status(201).json(form);
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ message: 'Error creating form', error });
    }
};

const getForms = async (req, res) => {
    const { folderId } = req.query;
    const query = folderId ? { folderId } : {};

    try {
        const forms = await Form.find(query);
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching forms', error });
    }
};

const getSingleForm = async (req, res) => {
    const { id } = req.params;

    try {
        const form = await Form.findById(id);
        console.log(form,'here in the getsinglrfrm');
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching form', error });
    }
};

const updateForm = async (req, res) => {
    const { id } = req.params;
    const { flow, steps } = req.body;

    const ResponseMap = {};
    const keywords = {
        welcome: ["hi"],
        name: ["name"],
        email: ["email"],
        dob: ["dob", "date of birth"],
        ratings: ["rate", "ratings", "rating"]
    };

    for (let i = 0; i < flow.length; i++) {
        const element = flow[i];
        if (element.messageSide === 'admin' && element.message && element.message[0]) {
            for (const [key, value] of Object.entries(keywords)) {
                if (value.some(keyword => element.message[0].toLowerCase().includes(keyword))) {
                   
                    if (flow[i + 1]) {
                        const userElement = flow[i + 1];
                     
                        if (userElement.messageSide === 'user') {
                            if (userElement.message && userElement.message[0]) {
                              
                                ResponseMap[key] = userElement.message[0];
                        } 
                }
            }
        }
    }
}
}

    try {
        const form = await Form.findByIdAndUpdate(
            id,
            { flow, steps, ResponseMap }, 
            { new: true, runValidators: true }
        );
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ message: 'Error updating form', error });
    }
};


const getFormsByFolder = async (req, res) => {
    const { folderId } = req.params;
    try {
        const forms = await Form.find({ folderId });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching forms', error });
    }
};

const submitForm = async (req, res) => {
    const { formId, inputValues } = req.body;

    try {
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        form.flow = form.flow.map((element, index) => {
            if (element.elementType === 'input' && inputValues.hasOwnProperty(index)) {
                return {
                    ...element,
                    message: [inputValues[index]]  
                };
            }
            return element;
        });

        await form.save();

        res.status(200).json({ message: 'Form responses saved successfully' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ message: 'Error submitting form', error });
    }
};

const updateTheme = async (req, res) => {
    const { formId } = req.params;
    const { theme } = req.body;

    if (!['light', 'dark', 'blue'].includes(theme)) {
        return res.status(400).json({ error: 'Invalid theme value' });
    }

    try {
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        form.theme = theme;
        await form.save();

        res.status(200).json({ message: 'Theme updated successfully', form });
    } catch (error) {
        console.error('Error updating form theme:', error);
        res.status(500).json({ message: 'Error updating theme', error });
    }
};

const ViewsCount = async (req, res) => {
    const { formId } = req.params;

    try {
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        form.views = form.views + 1;
        await form.save();

        res.status(200).json({ message: 'View count incremented' });
    } catch (error) {
        res.status(500).json({ message: 'Error incrementing views', error });
    }
};


const StartsCount = async (req, res) => {
    const { formId } = req.params;

    try {
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        form.starts = form.starts + 1;
        await form.save();

        res.status(200).json({ message: 'Start count incremented' });
    } catch (error) {
        res.status(500).json({ message: 'Error incrementing starts', error });
    }
};


const CompletionRate = async (req, res) => {
    const { formId } = req.params;

    try {
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        const totalFields = form.flow.filter(el => el.messageSide === 'user').length;
        const completedFields = form.response.length;
        const completionRate = (completedFields / totalFields) * 100;

        form.completionRate = completionRate;
        await form.save();

        res.status(200).json({ message: 'Completion rate updated', completionRate });
    } catch (error) {
        res.status(500).json({ message: 'Error updating completion rate', error });
    }
};

const deleteForm = async (req, res) => {
    const { id } = req.params;
    try {
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        await Folder.findByIdAndUpdate(form.folderId, { $pull: { forms: id } });
        await Form.findByIdAndDelete(id);

        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting form', error });
    }
};


module.exports = { createForm, getForms, getSingleForm, updateForm, deleteForm, getFormsByFolder, submitForm, updateTheme, StartsCount, ViewsCount, CompletionRate };