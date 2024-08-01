import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormDashboard() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [folders, setFolders] = useState([]);
    const [selectedFolderIndex, setSelectedFolderIndex] = useState(null);
    const [showFolderDeletePopup, setShowFolderDeletePopup] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState(null);
    const [showFormDeletePopup, setShowFormDeletePopup] = useState(false);
    const [formToDelete, setFormToDelete] = useState({ folderIndex: null, formIndex: null });
    const [username, setUsername] = useState('');
    const [showFormPopup, setShowFormPopup] = useState(false);
    const [formName, setFormName] = useState('');
    const [formFolderIndex, setFormFolderIndex] = useState(null);



    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        fetchFolders();
    }, []);

    const fetchFolders = async () => {
        try {
            const response = await axios.get('/api/folders');
            setFolders(response.data);
        } catch (error) {
            console.error('Error fetching folders:', error);
        }
    };
    
    

    const handleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handlePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleFolderNameInput = (e) => {
        setFolderName(e.target.value);
    };

    const handleAddFolder = async () => {
        if (folderName.trim()) {
            try {
                const response = await axios.post('/api/folders', { name: folderName.trim() });
                setFolders([...folders, response.data]);
                setFolderName('');
                setShowPopup(false);
            } catch (error) {
                console.error('Error creating folder:', error);
            }
        }
    };

    const handleDeleteFolder = async (index) => {
        try {
            await axios.delete(`/api/folders/${folders[index]._id}`);
            setFolders(folders.filter((_, i) => i !== index));
            setShowFolderDeletePopup(false);
            setFolderToDelete(null);
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    const handleSelectFolder = (index) => {
        setSelectedFolderIndex(selectedFolderIndex === index ? null : index);
    };

    const handleAddForm = (folderIndex) => {
        setFormFolderIndex(folderIndex);
        setShowFormPopup(true);
    };
    
    

    const handleDeleteForm = (folderIndex, formIndex) => {
        setFormToDelete({ folderIndex, formIndex });
        setShowFormDeletePopup(true);
    };

    const showDeleteFolderPopup = (index) => {
        setFolderToDelete(index);
        setShowFolderDeletePopup(true);
    };

    const confirmDeleteFolder = () => {
        if (folderToDelete !== null) {
            handleDeleteFolder(folderToDelete);
            setFolderToDelete(null);
        }
    };

    const confirmDeleteForm = async () => {
        if (formToDelete.folderIndex !== null && formToDelete.formIndex !== null) {
            const { folderIndex, formIndex } = formToDelete;
            try {
                await axios.delete(`/api/forms/${folders[folderIndex].forms[formIndex]._id}`);
                const updatedFolders = folders.map((folder, index) => 
                    index === folderIndex 
                        ? { ...folder, forms: folder.forms.filter((_, i) => i !== formIndex) }
                        : folder
                );
                setFolders(updatedFolders);
                setFormToDelete({ folderIndex: null, formIndex: null });
                setShowFormDeletePopup(false);
            } catch (error) {
                console.error('Error deleting form:', error);
            }
        }
    };

    const handleFormNameInput = (e) => {
        setFormName(e.target.value);
    };
    const confirmAddForm = async () => {
        if (formName.trim() && formFolderIndex !== null) {
            try {
                const newForm = { name: formName.trim(), folderId: folders[formFolderIndex]._id };
                const response = await axios.post('/api/forms', newForm);
                const updatedFolders = folders.map((folder, index) => 
                    index === formFolderIndex ? { ...folder, forms: [...folder.forms, response.data] } : folder
                );
                setFolders(updatedFolders);
                setFormName('');
                setFormFolderIndex(null);
                setShowFormPopup(false);
            } catch (error) {
                console.error('Error adding form:', error);
            }
        }
    };
    
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        toast.info('You have been logged out.');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
    };

    return (
        <div className="form-dashboard">
            <div className="user-menu-box">
                <button className="user-button-menu" onClick={handleDropdown}>
                    {username}'s workspace
                    {isDropdownOpen ? (
                        <IoIosArrowUp />
                    ) : (
                        <IoIosArrowDown className="down-icon" />
                    )}
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <Link className='settings-page-link' to='/settingspage'>
                            <button className="dropdown-item-settings">Settings</button>
                        </Link>
                        <button className="dropdown-item-logout" onClick={handleLogout}>Log Out</button>
                    </div>
                )}
            </div>

        <div className='folder-box'>
                <button className='create-folder-button' onClick={handlePopup}>
                    <MdOutlineCreateNewFolder className='folder-icon' /> Create a folder
                </button>

                    {folders.map((folder, index) => (
                     <div key={index}>
                    <div className='folder' onClick={() => handleSelectFolder(index)}>
                            {folder.name}
                            <RiDeleteBin6Line className='delete-icon' onClick={(e) => {
                                e.stopPropagation(); showDeleteFolderPopup(index);
                     }} />
                    </div>

            {selectedFolderIndex === index && (
                <div className='form-box'>
                    <div className='typebot-form'>
                        <div>
                        <button className='plus-button' onClick={() => handleAddForm(index)}><FiPlus /></button>
                        <p className='typebot-title'>Create a typebot</p>
                    </div>
                    </div>

                {folder.forms.map((form, i) => (
                    <div key={form._id} className='New-form'>
                        <button className='delete-form-button' onClick={() => handleDeleteForm(index, i)}><RiDeleteBin6Line className='delete-newform-icon' /></button>
                        <Link className='form-link' to={`/workspace/${form._id}/flow`}>
                            <p className='Newform-title'>{form.name}</p>
                        </Link>
                    </div>
                ))}

                    </div>
                    )}
                    </div>
                ))}
            </div>

        {showPopup && (
            <div className='pop-up-create-folder'>
                <div className='popup'>
                    <h1 className='popup-title'>Create New Folder</h1>
                    <input className='popup-input' type="text" placeholder='Enter folder name' value={folderName} onChange={handleFolderNameInput} />
                <div className='popup-buttons'>
                    <button className='done-button' onClick={handleAddFolder}>Done</button>
                    <div className='separator'>|</div>
                    <button className='cancel-button' onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
                </div>
            </div>
        )}

        {showFolderDeletePopup && (
            <div className='delete-folder-modal-box'>
            <div className='folder-delete-modal'>
                <h1 className='delete-folder-title'>Are you sure you want to <br /> delete this folder?</h1>
                    <div className='delete-folder-buttons'>
                <button className='confirm-button' onClick={confirmDeleteFolder}>Confirm</button>
                    <div className='separator'>|</div>
                <button className='cancel-button-delete-folder' onClick={() => setShowFolderDeletePopup(false)}>Cancel</button>
                    </div>
            </div>
            </div>
        )}

        {showFormDeletePopup && (
            <div className='delete-form-modal-box'>
                    <div className='form-delete-modal'>
                    <h1 className='delete-form-title'>Are you sure you want to <br /> delete this Form?</h1>
                    <div className='delete-form-buttons'>
                    <button className='form-confirm-button' onClick={confirmDeleteForm}>Confirm</button>
                    <div className='separator'>|</div>
                    <button className='cancel-button-delete-form' onClick={() => setShowFormDeletePopup(false)}>Cancel</button>
                    </div>
                    </div>
            </div>
            )}

        {showFormPopup && (
            <div className='pop-up-create-form'>
                <div className='popup'>
                    <h1 className='popup-title'>Create New Form</h1>
                    <input className='popup-input' type="text" placeholder='Enter form name' value={formName} onChange={handleFormNameInput} />
                    <div className='popup-buttons'>
                        <button className='done-button' onClick={confirmAddForm}>Done</button>
                        <div className='separator'>|</div>
                        <button className='cancel-button' onClick={() => setShowFormPopup(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
        <ToastContainer />
        </div>
    );
}

export default FormDashboard;
