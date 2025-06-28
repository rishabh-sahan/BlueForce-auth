import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile, WorkerProfile, EmployerProfile } from '../types/user';
import { motion } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  Star, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Edit2,
  Clock,
  Users,
  Building,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const UserProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'jobs' | 'bookings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!currentUser) return;
      // Fetch all profiles for this user (worker and employer)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', currentUser.email);
      console.log('Fetched profiles from Supabase:', data, 'Error:', error);
      if (data && data.length > 0) {
        setProfiles(data);
        setSelectedProfile(data[0]);
      } else {
        setProfiles([]);
        setSelectedProfile(null);
      }
    };
    fetchProfiles();
  }, [currentUser]);

  if (!selectedProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">No profile found. Please create a profile.</p>
      </div>
    );
  }

  const renderProfileSection = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={selectedProfile.profileImage || selectedProfile.profile_photo || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
            />
            <button
              onClick={() => setIsEditing(true)}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Edit2 size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedProfile.firstName || selectedProfile.full_name || ''} {selectedProfile.lastName || ''}
            </h2>
            <p className="text-gray-600">{selectedProfile.email}</p>
            <div className="flex items-center mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {(selectedProfile.type || selectedProfile.role || '').charAt(0).toUpperCase() + (selectedProfile.type || selectedProfile.role || '').slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div>
          {profiles.length > 1 && (
            <select
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              value={selectedProfile.type || selectedProfile.role}
              onChange={e => {
                const newProfile = profiles.find(p => (p.type || p.role) === e.target.value);
                if (newProfile) setSelectedProfile(newProfile);
              }}
            >
              {profiles.map((p, idx) => (
                <option key={idx} value={p.type || p.role}>
                  Switch to {(p.type || p.role).charAt(0).toUpperCase() + (p.type || p.role).slice(1)} Profile
                </option>
              ))}
            </select>
          )}
          {profiles.length === 1 && (
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={() => {
                if ((selectedProfile.type || selectedProfile.role) === 'worker') {
                  navigate('/employer-profile');
                } else {
                  navigate('/individual-profile');
                }
              }}
            >
              Switch to {(selectedProfile.type || selectedProfile.role) === 'worker' ? 'Employer' : 'Worker'} Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-600" size={20} />
            <span className="text-gray-700">{selectedProfile.phoneNumber}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="text-blue-600" size={20} />
            <span className="text-gray-700">{selectedProfile.email}</span>
          </div>
          {selectedProfile.role === 'worker' && (selectedProfile as WorkerProfile).skills && (
            <div className="flex items-start space-x-3">
              <Award className="text-blue-600 mt-1" size={20} />
              <div>
                <span className="text-gray-700 font-medium">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(selectedProfile as WorkerProfile).skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {selectedProfile.role === 'employer' && (selectedProfile as EmployerProfile).companyName && (
            <div className="flex items-center space-x-3">
              <Building className="text-blue-600" size={20} />
              <span className="text-gray-700">
                {(selectedProfile as EmployerProfile).companyName}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {selectedProfile.role === 'worker' && (
            <>
              <div className="flex items-center space-x-3">
                <Star className="text-blue-600" size={20} />
                <span className="text-gray-700">
                  Rating: {(selectedProfile as WorkerProfile).rating || 0}/5
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="text-blue-600" size={20} />
                <span className="text-gray-700">
                  Experience: {(selectedProfile as WorkerProfile).experience || 0} years
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-blue-600" size={20} />
                <span className="text-gray-700">
                  Completed Jobs: {(selectedProfile as WorkerProfile).completedJobs || 0}
                </span>
              </div>
            </>
          )}
          {selectedProfile.role === 'employer' && (
            <>
              <div className="flex items-center space-x-3">
                <Users className="text-blue-600" size={20} />
                <span className="text-gray-700">
                  Company Size: {(selectedProfile as EmployerProfile).companySize}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="text-blue-600" size={20} />
                <span className="text-gray-700">
                  Industry: {(selectedProfile as EmployerProfile).industry}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderJobsSection = () => {
    if (selectedProfile.role === 'worker') {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Available Jobs</h3>
          <div className="space-y-4">
            {/* Add job listings here */}
            <p className="text-gray-600">No jobs available at the moment.</p>
          </div>
        </div>
      );
    } else if (selectedProfile.role === 'employer') {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Posted Jobs</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4">
            Post New Job
          </button>
          <div className="space-y-4">
            {/* Add posted jobs here */}
            <p className="text-gray-600">No jobs posted yet.</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderBookingsSection = () => {
    if (selectedProfile.role === 'worker') {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">My Bookings</h3>
          <div className="space-y-4">
            {/* Add worker's bookings here */}
            <p className="text-gray-600">No bookings yet.</p>
          </div>
        </div>
      );
    } else if (selectedProfile.role === 'employer') {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Worker Bookings</h3>
          <div className="space-y-4">
            {/* Add employer's worker bookings here */}
            <p className="text-gray-600">No worker bookings yet.</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'jobs'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {selectedProfile.role === 'worker' ? 'Available Jobs' : 'Posted Jobs'}
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Bookings
            </button>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && renderProfileSection()}
            {activeTab === 'jobs' && renderJobsSection()}
            {activeTab === 'bookings' && renderBookingsSection()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage; 