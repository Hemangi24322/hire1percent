import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProfile, updateProfile } from '../../services/profileService';

const EmployerProfile = () => {
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
        const data = await getProfile();
        if (data) {
          setProfile({
            companyInfo: {
              name: data.companyInfo?.name || '',
              website: data.companyInfo?.website || '',
              industry: data.companyInfo?.industry || '',
              size: data.companyInfo?.size || '',
              location: data.companyInfo?.location || '',
              description: data.companyInfo?.description || ''
            },
            contactInfo: {
              name: data.contactInfo?.name || '',
              position: data.contactInfo?.position || '',
              email: data.contactInfo?.email || '',
              phone: data.contactInfo?.phone || ''
            },
            jobPostings: data.jobPostings || []
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
          <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
          <button
            onClick={() => {
              setIsEditing(true);
              setProfile({
                companyInfo: {
                  name: '',
                  website: '',
                  industry: '',
                  size: '',
                  location: '',
                  description: ''
                },
                contactInfo: {
                  name: '',
                  position: '',
                  email: '',
                  phone: ''
                },
                jobPostings: []
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
          <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
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

        {/* Company Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={profile.companyInfo.name || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  companyInfo: { ...profile.companyInfo, name: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                value={profile.companyInfo.website || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  companyInfo: { ...profile.companyInfo, website: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                value={profile.companyInfo.industry || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  companyInfo: { ...profile.companyInfo, industry: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Size</label>
              <select
                value={profile.companyInfo.size || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  companyInfo: { ...profile.companyInfo, size: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={profile.companyInfo.location || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  companyInfo: { ...profile.companyInfo, location: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Company Description</label>
            <textarea
              value={profile.companyInfo.description || ''}
              onChange={(e) => setProfile({
                ...profile,
                companyInfo: { ...profile.companyInfo, description: e.target.value }
              })}
              disabled={!isEditing}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Name</label>
              <input
                type="text"
                value={profile.contactInfo.name || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  contactInfo: { ...profile.contactInfo, name: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={profile.contactInfo.position || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  contactInfo: { ...profile.contactInfo, position: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={profile.contactInfo.email || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  contactInfo: { ...profile.contactInfo, email: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={profile.contactInfo.phone || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  contactInfo: { ...profile.contactInfo, phone: e.target.value }
                })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Job Postings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Active Job Postings</h3>
          {profile.jobPostings.map((job, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between">
                <h4 className="font-medium">{job.title}</h4>
                {isEditing && (
                  <button
                    onClick={() => {
                      const newJobs = [...profile.jobPostings];
                      newJobs.splice(index, 1);
                      setProfile({ ...profile, jobPostings: newJobs });
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-gray-500 text-sm">{job.type}</p>
              <p className="mt-2">{job.description}</p>
            </div>
          ))}
          {isEditing && (
            <button
              onClick={() => {
                // TODO: Implement add job posting form
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              + Add Job Posting
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile; 