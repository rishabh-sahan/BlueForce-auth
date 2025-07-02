import React, { useState } from 'react';

const EmployerDashboard = () => {
  const [profile] = useState<any>(null);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement worker search functionality
    console.log('Searching for:', searchQuery);
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
      <h1 className="text-3xl font-bold mb-8">Employer Dashboard</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'projects', 'workers', 'company'].map((tab) => (
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
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Active Projects</h3>
              <p className="text-3xl font-bold text-blue-600">{profile?.projects.length || 0}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Company Size</h3>
              <p className="text-3xl font-bold text-green-600">{profile?.companySize || 'N/A'}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Industry</h3>
              <p className="text-3xl font-bold text-purple-600">{profile?.industry || 'N/A'}</p>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Active Projects</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                New Project
              </button>
            </div>
            {profile?.projects.length === 0 ? (
              <p className="text-gray-500">No active projects found.</p>
            ) : (
              <div className="space-y-4">
                {profile?.projects.map((project: string, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{project}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'workers' && (
          <div>
            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for workers..."
                  className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Search
                </button>
              </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <p className="text-gray-500">No workers found.</p>
            </div>
          </div>
        )}

        {activeTab === 'company' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <p className="mt-1 text-gray-900">{profile?.companyName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Size</label>
                <p className="mt-1 text-gray-900">{profile?.companySize}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Industry</label>
                <p className="mt-1 text-gray-900">{profile?.industry}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard; 