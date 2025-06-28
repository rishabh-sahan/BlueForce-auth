import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { WorkerProfile } from '../../types/user';

const WorkerDashboard = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<WorkerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const updateAvailability = async (isAvailable: boolean) => {
    try {
      setLoading(true);
      // Implement your availability update logic here
      setLoading(false);
    } catch (err: any) {
      setError('Failed to update availability: ' + err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Worker Dashboard</h1>
        <button
          onClick={() => updateAvailability(!profile?.availability.isAvailable)}
          className={`px-4 py-2 rounded-lg ${
            profile?.availability.isAvailable
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          } text-white`}
        >
          {profile?.availability.isAvailable ? 'Available' : 'Not Available'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'jobs', 'profile', 'earnings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Completed Jobs</h3>
              <p className="text-3xl font-bold text-blue-600">{profile?.completedJobs || 0}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Rating</h3>
              <p className="text-3xl font-bold text-green-600">{profile?.rating || 0}/5.0</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Experience</h3>
              <p className="text-3xl font-bold text-purple-600">{profile?.experience || 0} years</p>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>
            <p className="text-gray-500">No recent jobs found.</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Skills</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {profile?.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <p className="mt-1 text-gray-900">{profile?.experience} years</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <p className="mt-1 text-gray-900">{profile?.rating}/5.0</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
            <p className="text-gray-500">No earnings data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard; 