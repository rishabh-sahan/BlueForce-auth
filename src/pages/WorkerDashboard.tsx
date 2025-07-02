import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Star, User } from 'lucide-react';
import { getCurrentUser } from '../services/authService';

type NearbyJob = {
  id: number;
  title: string;
  location: string;
  rate: string;
  distance: string;
  status: 'pending' | 'accepted';
};

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [user] = useState(getCurrentUser());
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(() => {
    const stored = localStorage.getItem('workerAvailability');
    return stored ? stored === 'true' : true;
  });

  // Dummy nearby jobs for demo
  const [nearbyJobs, setNearbyJobs] = useState<NearbyJob[]>([
    { id: 1, title: 'Mall Electrical Maintenance', location: 'Bangalore', rate: '₹600/hour', distance: '2 km', status: 'pending' },
    { id: 2, title: 'Apartment Wiring', location: 'Bangalore', rate: '₹550/hour', distance: '3.5 km', status: 'pending' },
    { id: 3, title: 'Shop Lighting Setup', location: 'Bangalore', rate: '₹500/hour', distance: '1.2 km', status: 'pending' },
  ]);

  const handleAcceptJob = (id: number) => {
    setNearbyJobs(jobs => jobs.map(job => job.id === id ? { ...job, status: 'accepted' } : job));
  };
  const handleRejectJob = (id: number) => {
    setNearbyJobs(jobs => jobs.filter(job => job.id !== id));
  };

  const handleToggleAvailability = () => {
    setIsAvailable((prev) => {
      localStorage.setItem('workerAvailability', (!prev).toString());
      return !prev;
    });
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // The videoUrl is a base64 string saved in localStorage by the worker profile upload
    setVideoUrl(localStorage.getItem('workerSkillVideo'));

    // Update nearby jobs to match worker location and profession
    const workerLocation = user?.location || 'Bangalore';
    const workerProfession = user?.profession || 'General Work';
    setNearbyJobs([
      { id: 1, title: `${workerProfession} at Mall`, location: workerLocation, rate: '₹600/hour', distance: '2 km', status: 'pending' },
      { id: 2, title: `${workerProfession} for Apartment Project`, location: workerLocation, rate: '₹550/hour', distance: '3.5 km', status: 'pending' },
      { id: 3, title: `${workerProfession} for Shop Setup`, location: workerLocation, rate: '₹500/hour', distance: '1.2 km', status: 'pending' },
    ]);
  }, [user, navigate]);

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
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Worker'}</h1>
                  <p className="text-gray-600">{user?.profession || 'Professional'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-700">{user?.rating || '4.5'}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Available Jobs</p>
                  <h3 className="text-2xl font-bold text-gray-900">12</h3>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Upcoming Jobs</p>
                  <h3 className="text-2xl font-bold text-gray-900">3</h3>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Location</p>
                  <h3 className="text-2xl font-bold text-gray-900">{user?.location || 'Mumbai'}</h3>
                </div>
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
            </motion.div>
          </div>

          {/* Skill Demonstration Video Showcase */}
          {videoUrl && (
            <div className="mb-8 flex flex-col items-center">
              <div className="w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <video src={videoUrl} controls className="w-full h-full object-contain rounded-lg" />
              </div>
            </div>
          )}

          {/* Nearby Jobs Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Jobs</h2>
            {nearbyJobs.length === 0 ? (
              <p className="text-gray-500">No nearby jobs available at the moment.</p>
            ) : (
              <div className="space-y-4">
                {nearbyJobs.map(job => (
                  <motion.div
                    key={job.id}
                    whileHover={{ scale: 1.01 }}
                    className={`border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between ${job.status === 'accepted' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">Location: {job.location}</p>
                      <p className="text-gray-600">Rate: {job.rate}</p>
                      <p className="text-gray-600">Distance: {job.distance}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-3">
                      {job.status === 'accepted' ? (
                        <span className="text-green-700 font-semibold">Accepted</span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAcceptJob(job.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectJob(job.id)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Jobs */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Job Opportunities</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((job) => (
                <motion.div
                  key={job}
                  whileHover={{ scale: 1.01 }}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">Sample Job {job}</h3>
                      <p className="text-gray-600">Location: {user?.location || 'Mumbai'}</p>
                      <p className="text-gray-600">Rate: ₹500/hour</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Apply
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkerDashboard; 