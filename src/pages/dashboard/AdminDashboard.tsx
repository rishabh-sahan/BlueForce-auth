import { useEffect, useState } from 'react';

// Sample User Type (customize it based on your schema)
interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'worker' | 'employer' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
}

const AdminDashboard: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Replace this with real fetch from your backend or Firebase
        const usersFromDB: User[] = [
          {
            uid: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            role: 'worker',
            status: 'pending',
          },
          {
            uid: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            role: 'employer',
            status: 'approved',
          },
        ];

        setPendingUsers(usersFromDB.filter(user => user.status === 'pending'));
        setApprovedUsers(usersFromDB.filter(user => user.status === 'approved'));
      } catch (err: any) {
        setError('Failed to fetch users: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleApproveUser = async (_userId: string) => {
    try {
      setLoading(true);
      setPendingUsers(prev =>
        prev.filter(user => {
          if (user.uid === _userId) {
            setApprovedUsers(prevApproved => [...prevApproved, { ...user, status: 'approved' }]);
            return false;
          }
          return true;
        })
      );
    } catch (err: any) {
      setError('Failed to approve user: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectUser = async (_userId: string) => {
    try {
      setLoading(true);
      setPendingUsers(prev => prev.filter(user => user.uid !== _userId));
    } catch (err: any) {
      setError('Failed to reject user: ' + err.message);
    } finally {
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
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {/* Pending Users */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pending Approvals</h2>
        {pendingUsers.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingUsers.map(user => (
                  <tr key={user.uid}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleApproveUser(user.uid)}
                        className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectUser(user.uid)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No pending users.</p>
        )}
      </section>

      {/* Approved Users */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Approved Users</h2>
        {approvedUsers.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {approvedUsers.map(user => (
                  <tr key={user.uid}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Approved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No approved users yet.</p>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
