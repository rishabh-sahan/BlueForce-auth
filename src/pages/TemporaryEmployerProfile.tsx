import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building, 
  Users, 
  Briefcase, 
  MapPin, 
  Star, 
  BarChart2, 
  MessageSquare, 
  Upload,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const TemporaryEmployerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data for demonstration
  const employerData = {
    companyName: 'Tech Solutions Inc.',
    location: 'Mumbai',
    rating: 4.8,
    activeJobs: 5,
    totalApplications: 24,
    companySize: '50-100',
    industry: 'Technology',
    projects: [
      { id: 1, name: 'Office Renovation', status: 'In Progress', workers: 8 },
      { id: 2, name: 'New Branch Setup', status: 'Planning', workers: 12 },
      { id: 3, name: 'Warehouse Construction', status: 'Completed', workers: 15 }
    ],
    recentHires: [
      { id: 1, name: 'Rajesh Kumar', role: 'Electrician', rating: 4.5 },
      { id: 2, name: 'Priya Singh', role: 'Plumber', rating: 4.8 },
      { id: 3, name: 'Amit Patel', role: 'Carpenter', rating: 4.2 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
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
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{employerData.companyName}</h1>
                  <p className="text-gray-600">Verified Employer</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-700">{employerData.rating}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <nav className="flex space-x-4">
              {['overview', 'projects', 'workers', 'analytics', 'messages'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-blue-50 p-6 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Active Jobs</p>
                        <h3 className="text-2xl font-bold text-gray-900">{employerData.activeJobs}</h3>
                      </div>
                      <Briefcase className="h-8 w-8 text-blue-600" />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-green-50 p-6 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Total Applications</p>
                        <h3 className="text-2xl font-bold text-gray-900">{employerData.totalApplications}</h3>
                      </div>
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-purple-50 p-6 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Location</p>
                        <h3 className="text-2xl font-bold text-gray-900">{employerData.location}</h3>
                      </div>
                      <MapPin className="h-8 w-8 text-purple-600" />
                    </div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Hires</h3>
                    <div className="space-y-4">
                      {employerData.recentHires.map((hire) => (
                        <div key={hire.id} className="flex items-center justify-between border-b pb-3">
                          <div>
                            <p className="font-medium">{hire.name}</p>
                            <p className="text-sm text-gray-600">{hire.role}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{hire.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center space-x-2 p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                        <Upload className="h-5 w-5" />
                        <span>Post Job</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                        <FileText className="h-5 w-5" />
                        <span>View Reports</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                        <MessageSquare className="h-5 w-5" />
                        <span>Messages</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 p-3 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100">
                        <BarChart2 className="h-5 w-5" />
                        <span>Analytics</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Active Projects</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    New Project
                  </button>
                </div>
                <div className="space-y-4">
                  {employerData.projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{project.name}</h3>
                          <div className="flex items-center mt-2 space-x-4">
                            <span className="text-sm text-gray-600">
                              Workers: {project.workers}
                            </span>
                            <span className={`text-sm ${
                              project.status === 'Completed' ? 'text-green-600' :
                              project.status === 'In Progress' ? 'text-blue-600' :
                              'text-yellow-600'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                            View Details
                          </button>
                          <button className="px-3 py-1 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'workers' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Workers</h2>
                  <div className="flex space-x-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Hire Workers
                    </button>
                    <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                      Import CSV
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {employerData.recentHires.map((worker) => (
                    <div key={worker.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{worker.name}</h3>
                          <p className="text-sm text-gray-600">{worker.role}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{worker.rating}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Hiring Overview</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Hires</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Active Workers</span>
                        <span className="font-semibold">15</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Rating</span>
                        <span className="font-semibold">4.5</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Project Status</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Completed</span>
                        <span className="font-semibold">8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>In Progress</span>
                        <span className="font-semibold">5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Planned</span>
                        <span className="font-semibold">3</span>
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
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Rajesh Kumar</p>
                          <p className="text-sm text-gray-600">Interested in the electrician position...</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Priya Singh</p>
                          <p className="text-sm text-gray-600">Completed the assigned task...</p>
                          <p className="text-xs text-gray-500">5 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                        <div>
                          <p className="font-medium">New Application</p>
                          <p className="text-sm text-gray-600">Amit Patel applied for carpenter position</p>
                          <p className="text-xs text-gray-500">1 hour ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
                        <div>
                          <p className="font-medium">Project Update</p>
                          <p className="text-sm text-gray-600">Office Renovation is behind schedule</p>
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

export default TemporaryEmployerProfile; 