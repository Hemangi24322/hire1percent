import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProfile, updateProfile } from '../../services/profileService';

const CandidateProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProfile(); // Fetch current user's profile
        if (data) {
          setProfile({
            personalInfo: {
              fullName: data.personalInfo?.fullName || '',
              phone: data.personalInfo?.phone || '',
              location: data.personalInfo?.location || '',
              bio: data.personalInfo?.bio || ''
            },
            skills: data.skills || [],
            experience: data.experience || [],
            education: data.education || []
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setError(null);
      setSuccessMessage('');
      await updateProfile(user.id, {
        role: user.role,
        ...profile
      });
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleAddSkill = () => {
    if (!profile) return; // Prevent adding if profile is null
    const skill = prompt('Enter a new skill:');
    if (skill) {
      setProfile(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skill]
      }));
    }
  };

  const handleRemoveSkill = (index) => {
    if (!profile) return; // Prevent removing if profile is null
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleAddExperience = () => {
    if (!profile) return; // Prevent adding if profile is null
    const newExperience = {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setProfile(prev => ({
      ...prev,
      experience: [...(prev.experience || []), newExperience]
    }));
  };

  const handleRemoveExperience = (index) => {
    if (!profile) return; // Prevent removing if profile is null
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleAddEducation = () => {
    if (!profile) return; // Prevent adding if profile is null
    const newEducation = {
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setProfile(prev => ({
      ...prev,
      education: [...(prev.education || []), newEducation]
    }));
  };

  const handleRemoveEducation = (index) => {
    if (!profile) return; // Prevent removing if profile is null
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Handlers for nested objects in experience and education
  const handleExperienceChange = (index, field, value) => {
    if (!profile) return;
    const updatedExperience = [...profile.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setProfile(prev => ({ ...prev, experience: updatedExperience }));
  };

  const handleEducationChange = (index, field, value) => {
    if (!profile) return;
    const updatedEducation = [...profile.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setProfile(prev => ({ ...prev, education: updatedEducation }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
          <button
            onClick={() => {
              setIsEditing(true);
              setProfile({
                personalInfo: {
                  fullName: '',
                  phone: '',
                  location: '',
                  bio: ''
                },
                skills: [],
                experience: [],
                education: []
              });
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Profile
          </button>
        </div>
        <div className="text-center text-gray-600">
          No profile information available. Click "Create Profile" to get started.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
          <div className="space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {/* Personal Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={profile.personalInfo.fullName || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  personalInfo: { ...profile.personalInfo, fullName: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={profile.personalInfo.phone || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  personalInfo: { ...profile.personalInfo, phone: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={profile.personalInfo.location || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  personalInfo: { ...profile.personalInfo, location: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={profile.personalInfo.bio || ''}
              onChange={(e) => setProfile({
                ...profile,
                personalInfo: { ...profile.personalInfo, bio: e.target.value }
              })}
              disabled={!isEditing}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            {isEditing && (
              <button
                onClick={handleAddSkill}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Skill
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 rounded-full px-3 py-1"
              >
                <span>{skill}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Experience</h3>
            {isEditing && (
              <button
                onClick={handleAddExperience}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Experience
              </button>
            )}
          </div>
          <div className="space-y-4">
            {profile.experience.map((exp, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={exp.title || ''}
                      onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Job Title"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={exp.company || ''}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Company"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={exp.location || ''}
                      onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Location"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <input
                        type="date"
                        value={exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        disabled={!isEditing}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <input
                        type="date"
                        value={exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        disabled={!isEditing}
                        placeholder="End Date (or Current)"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <textarea
                      value={exp.description || ''}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      placeholder="Description"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveExperience(index)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Education</h3>
            {isEditing && (
              <button
                onClick={handleAddEducation}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Education
              </button>
            )}
          </div>
          <div className="space-y-4">
            {profile.education.map((edu, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={edu.school || ''}
                      onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                      disabled={!isEditing}
                      placeholder="School Name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Degree"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={edu.field || ''}
                      onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Field of Study"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <input
                        type="date"
                        value={edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        disabled={!isEditing}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <input
                        type="date"
                        value={edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        disabled={!isEditing}
                        placeholder="End Date (or Current)"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <textarea
                      value={edu.description || ''}
                      onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      placeholder="Description"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveEducation(index)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile; 