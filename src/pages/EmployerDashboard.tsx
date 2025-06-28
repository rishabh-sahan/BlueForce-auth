import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Users, Briefcase, MapPin, Star, User as UserIcon } from 'lucide-react';
import { getCurrentUser } from '../services/authService';

// Copy mockWorkers from BrowseWorkers
const mockWorkers = [
  { id: 1, name: 'Ravi Kumar', profession: 'Electrician', rating: 4.8, hourlyRate: 350, location: 'Bangalore', availability: 'Immediate', verified: true },
  { id: 2, name: 'Anand Singh', profession: 'Plumber', rating: 4.5, hourlyRate: 300, location: 'Delhi', availability: '1 Day', verified: true },
  { id: 3, name: 'Priya Sharma', profession: 'Painter', rating: 4.9, hourlyRate: 400, location: 'Mumbai', availability: 'Scheduled', verified: true },
  { id: 4, name: 'Suresh Patel', profession: 'Carpenter', rating: 4.6, hourlyRate: 450, location: 'Chennai', availability: 'Immediate', verified: false },
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

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [selected, setSelected] = useState<number[]>([]);
  const [allBooked, setAllBooked] = useState(false);
  const [hiredWorkers, setHiredWorkers] = useState<typeof mockWorkers>([]);

  // Sorting/filtering state
  const [sortProfession, setSortProfession] = useState('All');
  const [sortPrice, setSortPrice] = useState('Any');
  const [sortLocation, setSortLocation] = useState('All');
  const [sortAvailability, setSortAvailability] = useState('All');
  const [sortRating, setSortRating] = useState('Any');

  // Get unique options
  const professionOptions = ['All', ...Array.from(new Set(mockWorkers.map(w => w.profession)))];
  const priceOptions = ['Any', '500+', '400+', '300+', '200+'];
  const locationOptions = ['All', ...Array.from(new Set(mockWorkers.map(w => w.location)))];
  const availabilityOptions = ['All', ...Array.from(new Set(mockWorkers.map(w => w.availability)))];
  const ratingOptions = ['Any', '5', '4+', '3+', '2+', '1+'];

  const dummyWorkers = [
    { id: 1, name: 'Rajesh Kumar', profession: 'Plumber', rating: 4.5, hourlyRate: 350, location: 'Bangalore', availability: 'Available Now', verified: true },
    { id: 2, name: 'Priya Singh', profession: 'Electrician', rating: 4.8, hourlyRate: 400, location: 'Mumbai', availability: 'Available Now', verified: true },
    { id: 3, name: 'Amit Patel', profession: 'Carpenter', rating: 4.2, hourlyRate: 300, location: 'Delhi', availability: 'Not Available', verified: false },
    { id: 4, name: 'Sneha Sharma', profession: 'Painter', rating: 4.0, hourlyRate: 250, location: 'Chennai', availability: 'Available Now', verified: true },
    { id: 5, name: 'Vikram Yadav', profession: 'Plumber', rating: 4.7, hourlyRate: 380, location: 'Hyderabad', availability: 'Available Now', verified: true },
    { id: 6, name: 'Anjali Gupta', profession: 'Electrician', rating: 4.3, hourlyRate: 420, location: 'Kolkata', availability: 'Not Available', verified: false },
    { id: 7, name: 'Rahul Verma', profession: 'Carpenter', rating: 4.6, hourlyRate: 320, location: 'Pune', availability: 'Available Now', verified: true },
    { id: 8, name: 'Meera Joshi', profession: 'Painter', rating: 4.1, hourlyRate: 270, location: 'Ahmedabad', availability: 'Available Now', verified: true },
    { id: 9, name: 'Suresh Kumar', profession: 'Plumber', rating: 4.4, hourlyRate: 360, location: 'Bangalore', availability: 'Not Available', verified: false },
    { id: 10, name: 'Neha Singh', profession: 'Electrician', rating: 4.9, hourlyRate: 410, location: 'Mumbai', availability: 'Available Now', verified: true },
    { id: 11, name: 'Karan Patel', profession: 'Carpenter', rating: 4.5, hourlyRate: 310, location: 'Delhi', availability: 'Available Now', verified: true },
    { id: 12, name: 'Pooja Sharma', profession: 'Painter', rating: 4.2, hourlyRate: 260, location: 'Chennai', availability: 'Not Available', verified: false },
    { id: 13, name: 'Arun Yadav', profession: 'Plumber', rating: 4.8, hourlyRate: 370, location: 'Hyderabad', availability: 'Available Now', verified: true },
    { id: 14, name: 'Divya Gupta', profession: 'Electrician', rating: 4.4, hourlyRate: 430, location: 'Kolkata', availability: 'Available Now', verified: true },
    { id: 15, name: 'Ravi Verma', profession: 'Carpenter', rating: 4.7, hourlyRate: 330, location: 'Pune', availability: 'Not Available', verified: false },
    { id: 16, name: 'Lakshmi Joshi', profession: 'Painter', rating: 4.3, hourlyRate: 280, location: 'Ahmedabad', availability: 'Available Now', verified: true },
    { id: 17, name: 'Ganesh Kumar', profession: 'Plumber', rating: 4.6, hourlyRate: 340, location: 'Bangalore', availability: 'Available Now', verified: true },
    { id: 18, name: 'Ritu Singh', profession: 'Electrician', rating: 4.5, hourlyRate: 440, location: 'Mumbai', availability: 'Not Available', verified: false },
    { id: 19, name: 'Harsh Patel', profession: 'Carpenter', rating: 4.8, hourlyRate: 340, location: 'Delhi', availability: 'Available Now', verified: true },
    { id: 20, name: 'Shweta Sharma', profession: 'Painter', rating: 4.4, hourlyRate: 290, location: 'Chennai', availability: 'Available Now', verified: true },
    { id: 21, name: 'Naveen Yadav', profession: 'Plumber', rating: 4.7, hourlyRate: 350, location: 'Hyderabad', availability: 'Not Available', verified: false },
    { id: 22, name: 'Kavita Gupta', profession: 'Electrician', rating: 4.6, hourlyRate: 450, location: 'Kolkata', availability: 'Available Now', verified: true },
    { id: 23, name: 'Sandeep Verma', profession: 'Carpenter', rating: 4.9, hourlyRate: 350, location: 'Pune', availability: 'Available Now', verified: true },
    { id: 24, name: 'Anita Joshi', profession: 'Painter', rating: 4.5, hourlyRate: 300, location: 'Ahmedabad', availability: 'Not Available', verified: false },
    { id: 25, name: 'Manoj Kumar', profession: 'Plumber', rating: 4.8, hourlyRate: 360, location: 'Bangalore', availability: 'Available Now', verified: true },
    { id: 26, name: 'Deepika Singh', profession: 'Electrician', rating: 4.7, hourlyRate: 460, location: 'Mumbai', availability: 'Available Now', verified: true },
    { id: 27, name: 'Raj Patel', profession: 'Carpenter', rating: 4.6, hourlyRate: 360, location: 'Delhi', availability: 'Not Available', verified: false },
    { id: 28, name: 'Sunita Sharma', profession: 'Painter', rating: 4.8, hourlyRate: 310, location: 'Chennai', availability: 'Available Now', verified: true },
    { id: 29, name: 'Vijay Yadav', profession: 'Plumber', rating: 4.9, hourlyRate: 370, location: 'Hyderabad', availability: 'Available Now', verified: true },
    { id: 30, name: 'Rekha Gupta', profession: 'Electrician', rating: 4.8, hourlyRate: 470, location: 'Kolkata', availability: 'Not Available', verified: false },
    { id: 31, name: 'Prakash Verma', profession: 'Carpenter', rating: 4.7, hourlyRate: 370, location: 'Pune', availability: 'Available Now', verified: true },
    { id: 32, name: 'Jyoti Joshi', profession: 'Painter', rating: 4.9, hourlyRate: 320, location: 'Ahmedabad', availability: 'Available Now', verified: true },
    { id: 33, name: 'Ramesh Kumar', profession: 'Plumber', rating: 4.8, hourlyRate: 380, location: 'Bangalore', availability: 'Not Available', verified: false },
    { id: 34, name: 'Smita Singh', profession: 'Electrician', rating: 4.9, hourlyRate: 480, location: 'Mumbai', availability: 'Available Now', verified: true },
    { id: 35, name: 'Dinesh Patel', profession: 'Carpenter', rating: 4.8, hourlyRate: 380, location: 'Delhi', availability: 'Available Now', verified: true },
    { id: 36, name: 'Anita Sharma', profession: 'Painter', rating: 4.7, hourlyRate: 330, location: 'Chennai', availability: 'Not Available', verified: false },
    { id: 37, name: 'Krishna Yadav', profession: 'Plumber', rating: 4.9, hourlyRate: 390, location: 'Hyderabad', availability: 'Available Now', verified: true },
    { id: 38, name: 'Lalita Gupta', profession: 'Electrician', rating: 4.8, hourlyRate: 490, location: 'Kolkata', availability: 'Available Now', verified: true },
    { id: 39, name: 'Rakesh Verma', profession: 'Carpenter', rating: 4.9, hourlyRate: 390, location: 'Pune', availability: 'Not Available', verified: false },
    { id: 40, name: 'Meena Joshi', profession: 'Painter', rating: 4.8, hourlyRate: 340, location: 'Ahmedabad', availability: 'Available Now', verified: true },
    { id: 41, name: 'Suresh Kumar', profession: 'Plumber', rating: 4.9, hourlyRate: 400, location: 'Bangalore', availability: 'Available Now', verified: true },
    { id: 42, name: 'Ritu Singh', profession: 'Electrician', rating: 4.8, hourlyRate: 500, location: 'Mumbai', availability: 'Not Available', verified: false },
    { id: 43, name: 'Amit Patel', profession: 'Carpenter', rating: 4.9, hourlyRate: 400, location: 'Delhi', availability: 'Available Now', verified: true },
    { id: 44, name: 'Priya Sharma', profession: 'Painter', rating: 4.8, hourlyRate: 350, location: 'Chennai', availability: 'Available Now', verified: true },
    { id: 45, name: 'Vikram Yadav', profession: 'Plumber', rating: 4.9, hourlyRate: 410, location: 'Hyderabad', availability: 'Not Available', verified: false },
    { id: 46, name: 'Anjali Gupta', profession: 'Electrician', rating: 4.9, hourlyRate: 510, location: 'Kolkata', availability: 'Available Now', verified: true },
    { id: 47, name: 'Rahul Verma', profession: 'Carpenter', rating: 4.8, hourlyRate: 410, location: 'Pune', availability: 'Available Now', verified: true },
    { id: 48, name: 'Meera Joshi', profession: 'Painter', rating: 4.9, hourlyRate: 360, location: 'Ahmedabad', availability: 'Not Available', verified: false },
    { id: 49, name: 'Rajesh Kumar', profession: 'Plumber', rating: 4.9, hourlyRate: 420, location: 'Bangalore', availability: 'Available Now', verified: true },
    { id: 50, name: 'Neha Singh', profession: 'Electrician', rating: 4.9, hourlyRate: 520, location: 'Mumbai', availability: 'Available Now', verified: true },
    { id: 51, name: 'Karan Patel', profession: 'Carpenter', rating: 4.9, hourlyRate: 420, location: 'Delhi', availability: 'Not Available', verified: false },
    { id: 52, name: 'Pooja Sharma', profession: 'Painter', rating: 4.9, hourlyRate: 370, location: 'Chennai', availability: 'Available Now', verified: true },
    { id: 53, name: 'Arun Yadav', profession: 'Plumber', rating: 4.9, hourlyRate: 430, location: 'Hyderabad', availability: 'Not Available', verified: false },
    { id: 54, name: 'Divya Gupta', profession: 'Electrician', rating: 4.9, hourlyRate: 530, location: 'Kolkata', availability: 'Available Now', verified: true },
    { id: 55, name: 'Ravi Verma', profession: 'Carpenter', rating: 4.9, hourlyRate: 530, location: 'Pune', availability: 'Available Now', verified: true },
    { id: 56, name: 'Lakshmi Joshi', profession: 'Painter', rating: 4.9, hourlyRate: 480, location: 'Ahmedabad', availability: 'Not Available', verified: false },
    { id: 57, name: 'Ganesh Kumar', profession: 'Plumber', rating: 4.9, hourlyRate: 540, location: 'Bangalore', availability: 'Available Now', verified: true },
    { id: 58, name: 'Ritu Singh', profession: 'Electrician', rating: 4.9, hourlyRate: 640, location: 'Mumbai', availability: 'Available Now', verified: true },
    { id: 59, name: 'Harsh Patel', profession: 'Carpenter', rating: 4.9, hourlyRate: 540, location: 'Delhi', availability: 'Not Available', verified: false },
    { id: 60, name: 'Shweta Sharma', profession: 'Painter', rating: 4.9, hourlyRate: 490, location: 'Chennai', availability: 'Available Now', verified: true },
    { id: 61, name: 'Naveen Yadav', profession: 'Plumber', rating: 4.9, hourlyRate: 450, location: 'Hyderabad', availability: 'Available Now', verified: true },
    { id: 62, name: 'Kavita Gupta', profession: 'Electrician', rating: 4.9, hourlyRate: 550, location: 'Kolkata', availability: 'Available Now', verified: true },
    { id: 63, name: 'Sandeep Verma', profession: 'Carpenter', rating: 4.9, hourlyRate: 450, location: 'Pune', availability: 'Not Available', verified: false },
    { id: 64, name: 'Anita Joshi', profession: 'Painter', rating: 4.9, hourlyRate: 400, location: 'Ahmedabad', availability: 'Available Now', verified: true },
    { id: 65, name: 'Manoj Kumar', profession: 'Plumber', rating: 4.9, hourlyRate: 460, location: 'Bangalore', availability: 'Available Now', verified: true },
    { id: 66, name: 'Deepika Singh', profession: 'Electrician', rating: 4.9, hourlyRate: 560, location: 'Mumbai', availability: 'Not Available', verified: false },
    { id: 67, name: 'Raj Patel', profession: 'Carpenter', rating: 4.9, hourlyRate: 460, location: 'Delhi', availability: 'Available Now', verified: true },
    { id: 68, name: 'Sunita Sharma', profession: 'Painter', rating: 4.9, hourlyRate: 410, location: 'Chennai', availability: 'Available Now', verified: true },
    { id: 69, name: 'Vijay Yadav', profession: 'Plumber', rating: 4.9, hourlyRate: 470, location: 'Hyderabad', availability: 'Not Available', verified: false },
    { id: 70, name: 'Rekha Gupta', profession: 'Electrician', rating: 4.9, hourlyRate: 570, location: 'Kolkata', availability: 'Available Now', verified: true },
    { id: 71, name: 'Prakash Verma', profession: 'Carpenter', rating: 4.9, hourlyRate: 470, location: 'Pune', availability: 'Available Now', verified: true },
    { id: 72, name: 'Jyoti Joshi', profession: 'Painter', rating: 4.9, hourlyRate: 420, location: 'Ahmedabad', availability: 'Not Available', verified: false },
    { id: 73, name: 'Ramesh Kumar', profession: 'Plumber', rating: 4.9, hourlyRate: 480, location: 'Bangalore', availability: 'Available Now', verified: true },
    { id: 74, name: 'Smita Singh', profession: 'Electrician', rating: 4.9, hourlyRate: 580, location: 'Mumbai', availability: 'Available Now', verified: true },
    { id: 75, name: 'Dinesh Patel', profession: 'Carpenter', rating: 4.9, hourlyRate: 480, location: 'Delhi', availability: 'Not Available', verified: false },
    { id: 76, name: 'Anita Sharma', profession: 'Painter', rating: 4.9, hourlyRate: 430, location: 'Chennai', availability: 'Available Now', verified: true },
    { id: 77, name: 'Krishna Yadav', profession: 'Plumber', rating: 4.9, hourlyRate: 490, location: 'Hyderabad', availability: 'Available Now', verified: true },
    { id: 78, name: 'Lalita Gupta', profession: 'Electrician', rating: 4.9, hourlyRate: 590, location: 'Kolkata', availability: 'Not Available', verified: false },
    { id: 79, name: 'Rakesh Verma', profession: 'Carpenter', rating: 4.9, hourlyRate: 490, location: 'Pune', availability: 'Available Now', verified: true },
    { id: 80, name: 'Meena Joshi', profession: 'Painter', rating: 4.9, hourlyRate: 440, location: 'Ahmedabad', availability: 'Available Now', verified: true },
    { id: 81, name: 'Suresh Kumar', profession: 'Plumber', rating: 4.9, hourlyRate: 500, location: 'Bangalore', availability: 'Not Available', verified: false },
    { id: 82, name: 'Ritu Singh', profession: 'Electrician', rating: 4.9, hourlyRate: 600, location: 'Mumbai', availability: 'Available Now', verified: true },
    { id: 83, name: 'Amit Patel', profession: 'Carpenter', rating: 4.9, hourlyRate: 500, location: 'Delhi', availability: 'Available Now', verified: true },
    { id: 84, name: 'Priya Sharma', profession: 'Painter', rating: 4.9, hourlyRate: 450, location: 'Chennai', availability: 'Not Available', verified: false },
    { id: 85, name: 'Vikram Yadav', profession: 'Plumber', rating: 4.9, hourlyRate: 510, location: 'Hyderabad', availability: 'Available Now', verified: true },
    { id: 86, name: 'Anjali Gupta', profession: 'Electrician', rating: 4.9, hourlyRate: 610, location: 'Kolkata', availability: 'Available Now', verified: true },
    { id: 87, name: 'Rahul Verma', profession: 'Carpenter', rating: 4.9, hourlyRate: 510, location: 'Pune', availability: 'Not Available', verified: false },
    { id: 88, name: 'Meera Joshi', profession: 'Painter', rating: 4.9, hourlyRate: 460, location: 'Ahmedabad', availability: 'Available Now', verified: true },
    { id: 89, name: 'Rajesh Kumar', profession: 'Plumber', rating: 4.9, hourlyRate: 520, location: 'Bangalore', availability: 'Available Now', verified: true },
    { id: 90, name: 'Neha Singh', profession: 'Electrician', rating: 4.9, hourlyRate: 620, location: 'Mumbai', availability: 'Not Available', verified: false },
    { id: 91, name: 'Karan Patel', profession: 'Carpenter', rating: 4.9, hourlyRate: 520, location: 'Delhi', availability: 'Available Now', verified: true },
    { id: 92, name: 'Pooja Sharma', profession: 'Painter', rating: 4.9, hourlyRate: 470, location: 'Chennai', availability: 'Available Now', verified: true },
    { id: 93, name: 'Arun Yadav', profession: 'Plumber', rating: 4.9, hourlyRate: 530, location: 'Hyderabad', availability: 'Not Available', verified: false },
    { id: 94, name: 'Divya Gupta', profession: 'Electrician', rating: 4.9, hourlyRate: 630, location: 'Kolkata', availability: 'Available Now', verified: true },
    { id: 95, name: 'Ravi Verma', profession: 'Carpenter', rating: 4.9, hourlyRate: 530, location: 'Pune', availability: 'Available Now', verified: true },
    { id: 96, name: 'Lakshmi Joshi', profession: 'Painter', rating: 4.9, hourlyRate: 480, location: 'Ahmedabad', availability: 'Not Available', verified: false },
    { id: 97, name: 'Ganesh Kumar', profession: 'Plumber', rating: 4.9, hourlyRate: 540, location: 'Bangalore', availability: 'Available Now', verified: true },
    { id: 98, name: 'Ritu Singh', profession: 'Electrician', rating: 4.9, hourlyRate: 640, location: 'Mumbai', availability: 'Available Now', verified: true },
    { id: 99, name: 'Harsh Patel', profession: 'Carpenter', rating: 4.9, hourlyRate: 540, location: 'Delhi', availability: 'Not Available', verified: false },
    { id: 100, name: 'Shweta Sharma', profession: 'Painter', rating: 4.9, hourlyRate: 490, location: 'Chennai', availability: 'Available Now', verified: true },
  ];

  let filteredWorkers = dummyWorkers.filter(w =>
    (sortProfession === 'All' || w.profession === sortProfession) &&
    (sortLocation === 'All' || w.location === sortLocation) &&
    (sortAvailability === 'All' || w.availability === sortAvailability)
  );
  if (sortRating !== 'Any') {
    if (sortRating === '5') filteredWorkers = filteredWorkers.filter(w => w.rating === 5);
    else if (sortRating === '4+') filteredWorkers = filteredWorkers.filter(w => w.rating >= 4);
    else if (sortRating === '3+') filteredWorkers = filteredWorkers.filter(w => w.rating >= 3);
    else if (sortRating === '2+') filteredWorkers = filteredWorkers.filter(w => w.rating >= 2);
    else if (sortRating === '1+') filteredWorkers = filteredWorkers.filter(w => w.rating >= 1);
  }
  if (sortPrice !== 'Any') {
    const minPrice = parseInt(sortPrice);
    filteredWorkers = filteredWorkers.filter(w => w.hourlyRate >= minPrice);
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSelect = (id: number) => {
    setSelected(sel => sel.includes(id) ? sel.filter(i => i !== id) : [...sel, id]);
  };

  const handleSelectAll = () => {
    if (selected.length === mockWorkers.length) setSelected([]);
    else setSelected(mockWorkers.map(w => w.id));
  };

  const handleBulkHire = () => {
    setAllBooked(true);
    const hired = mockWorkers.filter(w => selected.includes(w.id));
    setHiredWorkers(hired);
    localStorage.setItem('massHiredWorkers', JSON.stringify(hired));
    setTimeout(() => setAllBooked(false), 2500);
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
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Company'}</h1>
                  <p className="text-gray-600">Verified Employer</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-700">4.8</span>
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
                  <p className="text-gray-600">Active Jobs</p>
                  <h3 className="text-2xl font-bold text-gray-900">5</h3>
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
                  <p className="text-gray-600">Total Applications</p>
                  <h3 className="text-2xl font-bold text-gray-900">24</h3>
                </div>
                <Users className="h-8 w-8 text-green-600" />
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

          {/* Post New Job Button */}
          <div className="mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center"
            >
              <Briefcase className="h-5 w-5 mr-2" />
              Post New Job
            </motion.button>
          </div>

          {/* Mass Hiring Tool */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mass Hiring Tool</h2>
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <span className="font-medium">Select Workers to Hire in Bulk</span>
              <div className="flex flex-wrap gap-3 items-center bg-gray-50 rounded-lg px-4 py-2 shadow-sm">
                <label className="text-sm font-semibold text-gray-700">Profession</label>
                <select value={sortProfession} onChange={e => setSortProfession(e.target.value)} className="px-2 py-1 rounded border border-gray-300">
                  {professionOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <label className="text-sm font-semibold text-gray-700">Price</label>
                <select value={sortPrice} onChange={e => setSortPrice(e.target.value)} className="px-2 py-1 rounded border border-gray-300">
                  {priceOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <label className="text-sm font-semibold text-gray-700">Location</label>
                <select value={sortLocation} onChange={e => setSortLocation(e.target.value)} className="px-2 py-1 rounded border border-gray-300">
                  {locationOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <label className="text-sm font-semibold text-gray-700">Availability</label>
                <select value={sortAvailability} onChange={e => setSortAvailability(e.target.value)} className="px-2 py-1 rounded border border-gray-300">
                  {availabilityOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <label className="text-sm font-semibold text-gray-700">Rating</label>
                <select value={sortRating} onChange={e => setSortRating(e.target.value)} className="px-2 py-1 rounded border border-gray-300">
                  {ratingOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <button onClick={handleSelectAll} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {selected.length === mockWorkers.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {filteredWorkers.map(worker => (
                <div key={worker.id} className={`border rounded-lg p-4 flex flex-col items-center shadow-sm ${selected.includes(worker.id) ? 'ring-2 ring-blue-500' : ''}`}> 
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <UserIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{worker.name}</h3>
                  <div className="flex items-center mb-1">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="text-gray-700 font-medium">{worker.rating}</span>
                  </div>
                  <div className="text-gray-600 mb-1">{worker.profession}</div>
                  <div className="text-gray-600 mb-1">Price: ₹{worker.hourlyRate}/hr</div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {worker.location}
                  </div>
                  <div className="text-gray-500 mb-2">{worker.availability}</div>
                  <button onClick={() => handleSelect(worker.id)} className={`mt-auto px-4 py-2 rounded-md ${selected.includes(worker.id) ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{selected.includes(worker.id) ? 'Selected' : 'Select'}</button>
                </div>
              ))}
            </div>
            <button
              onClick={handleBulkHire}
              disabled={selected.length === 0}
              className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hire Selected
            </button>
            {allBooked && (
              <div className="mt-4 text-green-700 font-bold text-center text-lg">Bulk workers are booked!</div>
            )}
            {hiredWorkers.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 text-blue-700">Hired Workers</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Profession</th>
                        <th className="px-4 py-2 border">Rating</th>
                        <th className="px-4 py-2 border">Hourly Rate</th>
                        <th className="px-4 py-2 border">Location</th>
                        <th className="px-4 py-2 border">Availability</th>
                        <th className="px-4 py-2 border">Verified</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hiredWorkers.map(worker => (
                        <tr key={worker.id} className="text-center">
                          <td className="px-4 py-2 border">{worker.name}</td>
                          <td className="px-4 py-2 border">{worker.profession}</td>
                          <td className="px-4 py-2 border">{worker.rating}</td>
                          <td className="px-4 py-2 border">₹{worker.hourlyRate}/hr</td>
                          <td className="px-4 py-2 border">{worker.location}</td>
                          <td className="px-4 py-2 border">{worker.availability}</td>
                          <td className="px-4 py-2 border">{worker.verified ? <span className="text-green-600 font-semibold">Yes</span> : <span className="text-red-500 font-semibold">No</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployerDashboard; 