import { useState } from 'react';
import { MapPin, Star, User, X } from 'lucide-react';

type Worker = {
  id: number;
  name: string;
  profession: string;
  rating: number;
  hourlyRate: number;
  location: string;
  availability: string;
  verified: boolean;
};

const mockWorkers: Worker[] = [
  {
    id: 1,
    name: 'Ravi Kumar',
    profession: 'Electrician',
    rating: 4.8,
    hourlyRate: 350,
    location: 'Bangalore',
    availability: 'Immediate',
    verified: true,
  },
  {
    id: 2,
    name: 'Anand Singh',
    profession: 'Plumber',
    rating: 4.5,
    hourlyRate: 300,
    location: 'Delhi',
    availability: '1 Day',
    verified: true,
  },
  {
    id: 3,
    name: 'Priya Sharma',
    profession: 'Painter',
    rating: 4.9,
    hourlyRate: 400,
    location: 'Mumbai',
    availability: 'Scheduled',
    verified: true,
  },
  {
    id: 4,
    name: 'Suresh Patel',
    profession: 'Carpenter',
    rating: 4.6,
    hourlyRate: 450,
    location: 'Chennai',
    availability: 'Immediate',
    verified: false,
  },
  { id: 5, name: 'Meena Gupta', profession: 'Welder', rating: 4.2, hourlyRate: 500, location: 'Pune', availability: '1 Day', verified: true },
  { id: 6, name: 'Ajay Meena', profession: 'Driver', rating: 3.7, hourlyRate: 250, location: 'Hyderabad', availability: 'Scheduled', verified: false },
  { id: 7, name: 'Geeta Pandey', profession: 'Gardener', rating: 4.5, hourlyRate: 320, location: 'Kolkata', availability: 'Immediate', verified: true },
  { id: 8, name: 'Manoj Kumar', profession: 'Mason', rating: 3.9, hourlyRate: 380, location: 'Ahmedabad', availability: '1 Day', verified: false },
  { id: 9, name: 'Shalini Nair', profession: 'Cook', rating: 4.9, hourlyRate: 420, location: 'Jaipur', availability: 'Scheduled', verified: true },
  { id: 10, name: 'Deepak Verma', profession: 'Mechanic', rating: 4.4, hourlyRate: 470, location: 'Lucknow', availability: 'Immediate', verified: true },
  { id: 11, name: 'Kiran Desai', profession: 'Electrician', rating: 3.2, hourlyRate: 220, location: 'Mumbai', availability: '1 Day', verified: false },
  { id: 12, name: 'Farhan Ali', profession: 'Plumber', rating: 4.0, hourlyRate: 320, location: 'Delhi', availability: 'Immediate', verified: true },
  { id: 13, name: 'Sita Ram', profession: 'Carpenter', rating: 5.0, hourlyRate: 600, location: 'Bangalore', availability: 'Scheduled', verified: true },
  { id: 14, name: 'Lalita Kumari', profession: 'Painter', rating: 3.8, hourlyRate: 280, location: 'Chennai', availability: 'Immediate', verified: false },
  { id: 15, name: 'Ajay Meena', profession: 'Welder', rating: 4.1, hourlyRate: 520, location: 'Pune', availability: '1 Day', verified: true },
  { id: 16, name: 'Rohit Sahu', profession: 'Driver', rating: 2.9, hourlyRate: 200, location: 'Hyderabad', availability: 'Scheduled', verified: false },
  { id: 17, name: 'Kavya Menon', profession: 'Gardener', rating: 3.6, hourlyRate: 270, location: 'Mumbai', availability: 'Immediate', verified: true },
  { id: 18, name: 'Suresh Babu', profession: 'Mason', rating: 4.4, hourlyRate: 550, location: 'Delhi', availability: '1 Day', verified: true },
  { id: 19, name: 'Ritu Jain', profession: 'Cook', rating: 2.8, hourlyRate: 210, location: 'Bangalore', availability: 'Scheduled', verified: false },
  { id: 20, name: 'Prakash Singh', profession: 'Mechanic', rating: 4.5, hourlyRate: 520, location: 'Chennai', availability: 'Immediate', verified: true },
];

const skillsOptions = ['All Skills', 'Electrician', 'Plumber', 'Carpenter', 'Painter'];
const experienceOptions = ['Any Experience', '1 year', '2 years', '3 years', '4+ years'];
const availabilityOptions = ['Any Time', 'Immediate', '1 Day', 'Scheduled'];
const ratingOptions = ['Any Rating', '5', '4+', '3+', '2+', '1+'];
const priceOptions = ['Any Price', '500+', '400+', '300+', '200+'];
const locationOptions = ['Any Location', 'Bangalore', 'Delhi', 'Mumbai', 'Chennai'];

const BrowseWorkers = () => {
  const [search, setSearch] = useState('');
  const [sortRating, setSortRating] = useState('Any Rating');
  const [sortPrice, setSortPrice] = useState('Any Price');
  const [location, setLocation] = useState('Any Location');
  const [skills, setSkills] = useState('All Skills');
  const [experience, setExperience] = useState('Any Experience');
  const [availability, setAvailability] = useState('Any Time');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  // Filtering logic
  let filteredWorkers = mockWorkers.filter(worker => {
    return (
      (search === '' ||
        worker.name.toLowerCase().includes(search.toLowerCase()) ||
        worker.profession.toLowerCase().includes(search.toLowerCase()) ||
        worker.location.toLowerCase().includes(search.toLowerCase())) &&
      (skills === 'All Skills' || worker.profession === skills) &&
      (experience === 'Any Experience' || true) && // Placeholder, as no experience in data
      (availability === 'Any Time' || worker.availability === availability) &&
      (location === 'Any Location' || worker.location === location)
    );
  });

  // Sorting logic
  if (sortRating !== 'Any Rating') {
    if (sortRating === '5') filteredWorkers = filteredWorkers.filter(w => w.rating === 5);
    else if (sortRating === '4+') filteredWorkers = filteredWorkers.filter(w => w.rating >= 4);
    else if (sortRating === '3+') filteredWorkers = filteredWorkers.filter(w => w.rating >= 3);
    else if (sortRating === '2+') filteredWorkers = filteredWorkers.filter(w => w.rating >= 2);
    else if (sortRating === '1+') filteredWorkers = filteredWorkers.filter(w => w.rating >= 1);
  }
  if (sortPrice !== 'Any Price') {
    const minPrice = parseInt(sortPrice);
    filteredWorkers = filteredWorkers.filter(w => w.hourlyRate >= minPrice);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 p-8">
      <div className="max-w-7xl mx-auto bg-white bg-opacity-10 rounded-lg shadow-lg flex">
        {/* Sidebar Filters */}
        <aside className="w-full max-w-xs p-6 bg-white bg-opacity-20 rounded-lg mr-8 flex-shrink-0">
          <div className="mb-6">
            <label className="block text-white font-medium mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by name, skills, or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-medium mb-1">Sort by Rating</label>
            <select value={sortRating} onChange={e => setSortRating(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300">
              {ratingOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white font-medium mb-1">Sort by Price</label>
            <select value={sortPrice} onChange={e => setSortPrice(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300">
              {priceOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white font-medium mb-1">Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300">
              {locationOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white font-medium mb-1">Skills</label>
            <select value={skills} onChange={e => setSkills(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300">
              {skillsOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white font-medium mb-1">Experience</label>
            <select value={experience} onChange={e => setExperience(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300">
              {experienceOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white font-medium mb-1">Availability</label>
            <select value={availability} onChange={e => setAvailability(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300">
              {availabilityOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
        </aside>
        {/* Worker Cards */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.length === 0 ? (
            <div className="col-span-full text-center text-white text-lg">No workers found.</div>
          ) : (
            filteredWorkers.map(worker => (
              <div key={worker.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition" onClick={() => setSelectedWorker(worker)}>
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{worker.name}</h3>
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-gray-700 font-medium">{worker.rating}</span>
                </div>
                <div className="text-gray-600 mb-1">{worker.profession}</div>
                <div className="text-gray-600 mb-1">Experience: 3+ years</div>
                <div className="text-gray-600 mb-1">Price: ₹{worker.hourlyRate}/hr</div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {worker.location}
                </div>
                <div className="text-gray-500 mb-2">{worker.availability}</div>
                <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">View Profile</button>
              </div>
            ))
          )}
        </main>
        {/* Modal for worker details */}
        {selectedWorker && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setSelectedWorker(null)}>
                <X size={24} />
              </button>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedWorker.name}</h2>
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-gray-700 font-medium">{selectedWorker.rating}</span>
                </div>
                <div className="text-gray-600 mb-1">{selectedWorker.profession}</div>
                <div className="text-gray-600 mb-1">Experience: 3+ years</div>
                <div className="text-gray-600 mb-1">Price: ₹{selectedWorker.hourlyRate}/hr</div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedWorker.location}
                </div>
                <div className="text-gray-500 mb-2">{selectedWorker.availability}</div>
                <div className="mt-4 text-center text-gray-700">Verified: {selectedWorker.verified ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseWorkers;
