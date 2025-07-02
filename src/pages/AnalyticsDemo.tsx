// import React from 'react';

const AnalyticsDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Analytics Dashboard (Demo)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-100 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-700 mb-2">120</div>
            <div className="text-gray-700">Total Hires</div>
          </div>
          <div className="bg-green-100 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">18</div>
            <div className="text-gray-700">Hires This Month</div>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-yellow-700 mb-2">Plumber</div>
            <div className="text-gray-700">Most Popular Role</div>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Hiring Trend (Last 6 Months)</h3>
          <div className="w-full h-48 bg-gray-100 rounded flex items-end gap-2 p-4">
            {/* Dummy bar chart */}
            {[10, 20, 30, 25, 40, 35].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="bg-blue-500 w-6" style={{ height: `${val * 2}px` }}></div>
                <span className="text-xs mt-1">M{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Application Conversion Rate</h3>
          <div className="w-full h-8 bg-green-200 rounded flex items-center">
            <div className="bg-green-600 h-8 rounded-l" style={{ width: '70%' }}></div>
            <span className="ml-4 text-green-800 font-bold">70%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDemo; 