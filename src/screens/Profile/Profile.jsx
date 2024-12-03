import React, { useState, useContext } from 'react';
import sty from './Profile.module.scss';
import { context } from '../../store/store';
import { signOutUser } from '../../store/actions';
import { MdClose } from 'react-icons/md';

const Profile = () => {
  const { state, dispatch } = useContext(context);
  const { profile } = state;

  const [categories, setCategories] = useState(profile.categories);
  const [salaryCycle, setSalaryCycle] = useState(profile.salaryCycle);
  const [isEditingName, setIsEditingName] = useState(false);
  const [updatedName, setUpdatedName] = useState({
    firstName: profile.name.firstName,
    lastName: profile.name.lastName,
  });

  const handleAddCategory = (type, newCategory) => {
    const updatedCategories = {
      ...categories,
      [type]: [...categories[type], newCategory],
    };
    setCategories(updatedCategories);
    saveProfileChange({ categories: updatedCategories });
  };

  const handleRemoveCategory = (type, index) => {
    const updatedCategories = {
      ...categories,
      [type]: categories[type].filter((_, i) => i !== index),
    };
    setCategories(updatedCategories);
    saveProfileChange({ categories: updatedCategories });
  };

  const handleSalaryCycleChange = (field, value) => {
    const updatedSalaryCycle = { ...salaryCycle, [field]: value };
    setSalaryCycle(updatedSalaryCycle);
    saveProfileChange({ salaryCycle: updatedSalaryCycle });
  };

  const handleNameUpdate = () => {
    const updatedProfile = {
      ...profile,
      name: updatedName,
    };
    saveProfileChange(updatedProfile);
    setIsEditingName(false);
  };

  const saveProfileChange = updatedFields => {
    const updatedProfile = {
      ...profile,
      ...updatedFields,
    };
    dispatch({
      type: 'SET_PROFILE',
      payload: updatedProfile,
    });
  };

  return (
    <div className={sty.profileContainer}>
      <h1 className={sty.initials}>
        {profile.name.firstName[0] + profile.name.lastName[0]}
      </h1>
      <h1 className={sty.title}>
        {profile.name.firstName} {profile.name.lastName}
      </h1>
      <button
        className={sty.editNameBtn}
        onClick={() => setIsEditingName(true)}
      >
        Edit Name
      </button>
      <p className={sty.email}>{profile.email}</p>

      {isEditingName && (
        <div className={sty.popup}>
          <div className={sty.popupContent}>
            <h2>Update Name</h2>
            <input
              type="text"
              value={updatedName.firstName}
              onChange={e =>
                setUpdatedName({ ...updatedName, firstName: e.target.value })
              }
              placeholder="First Name"
              className={sty.input}
            />
            <input
              type="text"
              value={updatedName.lastName}
              onChange={e =>
                setUpdatedName({ ...updatedName, lastName: e.target.value })
              }
              placeholder="Last Name"
              className={sty.input}
            />
            <button onClick={handleNameUpdate} className={sty.saveBtn}>
              Save
            </button>
            <button
              onClick={() => setIsEditingName(false)}
              className={sty.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className={sty.categories}>
        {['expenses', 'income'].map(type => (
          <div key={type} className={sty.category}>
            <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Categories </h3>
            <ul>
              {categories[type].map((item, index) => (
                <li key={index} className={sty.listItem}>
                  {item}
                  <button
                    onClick={() => handleRemoveCategory(type, index)}
                    className={sty.removeBtn}
                  >
                    <MdClose />
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder={`Add new category`}
              onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleAddCategory(type, e.target.value.trim());
                  e.target.value = '';
                }
              }}
              className={sty.input}
            />
          </div>
        ))}
      </div>

      <button className={sty.logoutBtn} onClick={() => signOutUser()(dispatch)}>
        LOG OUT
      </button>
    </div>
  );
};

export default Profile;
