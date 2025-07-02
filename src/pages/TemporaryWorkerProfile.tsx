import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  MapPin,
  Star,
  Search,
  FileText,
  // BarChart2,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { getCurrentUser } from '../services/authService';

const TemporaryWorkerProfile = () => {
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [videoUrl, setVideoUrl] = useState(() => localStorage.getItem('workerSkillVideo') || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAvailable, setIsAvailable] = useState(() => {
    const stored = localStorage.getItem('workerAvailability');
    return stored ? stored === 'true' : true;
  });

  const user = getCurrentUser();

  // Dummy data for demonstration (fallbacks)
  const workerData = {
    name: user?.name || 'Amit Patel',
    location: user?.location || 'Bangalore',
    rating: user?.rating || 4.6,
    profession: user?.profession || 'Electrician',
    experience: (user as any)?.experience || '5 years',
    skills: (user as any)?.skills || ['Wiring', 'Maintenance', 'Troubleshooting'],
    applications: [
      { id: 1, job: 'Office Renovation', status: 'Interview Scheduled' },
      { id: 2, job: 'Warehouse Construction', status: 'Applied' },
      { id: 3, job: 'Mall Lighting', status: 'Rejected' }
    ],
    messages: [
      { id: 1, from: 'Tech Solutions Inc.', text: 'Interview scheduled for Office Renovation.', time: '1 hour ago' },
      { id: 2, from: 'BuildPro', text: 'Application received for Mall Lighting.', time: '3 hours ago' }
    ]
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setVideoUrl(base64);
        localStorage.setItem('workerSkillVideo', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveVideo = () => {
    setVideoUrl('');
    localStorage.removeItem('workerSkillVideo');
  };

  const handleToggleAvailability = () => {
    setIsAvailable((prev) => {
      localStorage.setItem('workerAvailability', (!prev).toString());
      return !prev;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Availability Slider */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4">
            <span className={`font-semibold text-lg ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>{isAvailable ? 'Available Now' : 'Not Available'}</span>
            <button
              onClick={handleToggleAvailability}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${isAvailable ? 'bg-green-400' : 'bg-gray-300'}`}
              aria-label="Toggle availability"
            >
              <span
                className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 ${isAvailable ? 'translate-x-8' : ''}`}
                style={{ transform: isAvailable ? 'translateX(2rem)' : 'translateX(0)' }}
              ></span>
            </button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{workerData.name}</h1>
                  <p className="text-gray-600">{workerData.profession}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-700">{workerData.rating}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <nav className="flex space-x-4">
              {['overview', 'find-jobs', 'applications', 'analytics', 'messages'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab === 'find-jobs' ? 'Find Jobs' : tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Profession</p>
                        <h3 className="text-2xl font-bold text-gray-900">{workerData.profession}</h3>
                      </div>
                      <Briefcase className="h-8 w-8 text-blue-600" />
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-green-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Experience</p>
                        <h3 className="text-2xl font-bold text-gray-900">{workerData.experience}</h3>
                      </div>
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-purple-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Location</p>
                        <h3 className="text-2xl font-bold text-gray-900">{workerData.location}</h3>
                      </div>
                      <MapPin className="h-8 w-8 text-purple-600" />
                    </div>
                  </motion.div>
                </div>
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {workerData.skills.map((skill: string, idx: number) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {/* Skill Demonstration Video Upload */}
                  <div className="mt-6">
                    <h4 className="text-md font-semibold mb-2">Skill Demonstration Video</h4>
                    {videoUrl ? (
                      <div className="mb-4 flex flex-col items-center">
                        <div className="w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                          <video src={videoUrl} controls className="w-full h-full object-contain rounded-lg" />
                        </div>
                        <button
                          onClick={handleRemoveVideo}
                          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Remove Video
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-500 mb-2">No video uploaded yet.</p>
                    )}
                    <input
                      type="file"
                      accept="video/*"
                      ref={fileInputRef}
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {videoUrl ? 'Change Video' : 'Upload Video'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'find-jobs' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Find Jobs</h2>
                <div className="bg-blue-50 border rounded-lg p-6 flex items-center gap-4">
                  <Search className="h-8 w-8 text-blue-600" />
                  <span className="text-gray-700">Search and apply for jobs that match your skills and experience.</span>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4">Browse Jobs</button>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">My Applications</h2>
                <div className="space-y-4">
                  {workerData.applications.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{app.job}</h3>
                        <p className="text-sm text-gray-600">Status: {app.status}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">View Details</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Job Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Applications</span>
                        <span className="font-semibold">{workerData.applications.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Interviews Scheduled</span>
                        <span className="font-semibold">1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Offers Received</span>
                        <span className="font-semibold">0</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Ratings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 mr-2" />
                        <span className="font-semibold">{workerData.rating}</span>
                        <span className="ml-2 text-gray-600">Average Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Messages & Notifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
                    <div className="space-y-4">
                      {workerData.messages.map((msg) => (
                        <div key={msg.id} className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{msg.from}</p>
                            <p className="text-sm text-gray-600">{msg.text}</p>
                            <p className="text-xs text-gray-500">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                        <div>
                          <p className="font-medium">Interview Scheduled</p>
                          <p className="text-sm text-gray-600">You have an interview for Office Renovation</p>
                          <p className="text-xs text-gray-500">1 hour ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
                        <div>
                          <p className="font-medium">Application Update</p>
                          <p className="text-sm text-gray-600">Your application for Mall Lighting was rejected</p>
                          <p className="text-xs text-gray-500">3 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TemporaryWorkerProfile; 