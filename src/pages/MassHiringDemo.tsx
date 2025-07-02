import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

const MassHiringDemo = () => {
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    const hired = localStorage.getItem('massHiredWorkers');
    if (hired) {
      setWorkers(JSON.parse(hired));
    } else {
      setWorkers([]);
    }
  }, []);

  const handleDownloadCSV = () => {
    if (workers.length === 0) return;
    const headers = ['Name', 'Profession', 'Rating', 'Hourly Rate', 'Location', 'Availability', 'Verified'];
    const rows = workers.map(w => [
      w.name,
      w.profession,
      w.rating,
      `₹${w.hourlyRate}/hr`,
      w.location,
      w.availability,
      w.verified ? 'Yes' : 'No'
    ]);
    const csvContent = [headers, ...rows].map(row => row.map(String).map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hired_workers.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Mass Hiring Tool</h2>
        <div className="mb-6 flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleDownloadCSV}
            disabled={workers.length === 0}
          >
            <Download className="w-4 h-4" /> Download CSV
          </button>
          <span className="text-gray-500 text-sm">Download all hired workers as CSV</span>
        </div>
        {workers.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No workers have been hired in bulk yet.</div>
        ) : (
          <table className="w-full border text-left">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2">Name</th>
                <th className="p-2">Profession</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Hourly Rate</th>
                <th className="p-2">Location</th>
                <th className="p-2">Availability</th>
                <th className="p-2">Verified</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((w, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{w.name}</td>
                  <td className="p-2">{w.profession}</td>
                  <td className="p-2">{w.rating}</td>
                  <td className="p-2">₹{w.hourlyRate}/hr</td>
                  <td className="p-2">{w.location}</td>
                  <td className="p-2">{w.availability}</td>
                  <td className="p-2">{w.verified ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MassHiringDemo; 