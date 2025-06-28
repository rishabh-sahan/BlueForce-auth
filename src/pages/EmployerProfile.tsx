import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, CircleCheck, Loader, Shield, X } from 'lucide-react';
import { updateUserProfile, getCurrentUser } from '../services/authService';

const businessTypes = [
  'Construction Company', 
  'Manufacturing Unit', 
  'Service Provider', 
  'Hospitality Business',
  'Retail Business', 
  'Real Estate', 
  'Facility Management', 
  'Event Management',
  'Other'
];

const hiringVolumeOptions = [
  '1-5', '6-10', '11-20', '21-50', '50+'
];

const EmployerProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    mobile: '',
    email: '',
    businessType: '',
    location: '',
    gstin: '',
    hiringVolume: '',
    preferredSkills: [] as string[],
    newSkill: ''
  });
  
  const [companyLogo, setCompanyLogo] = useState<string | ArrayBuffer | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setCompanyLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const addSkill = () => {
    if (formData.newSkill && !formData.preferredSkills.includes(formData.newSkill)) {
      setFormData({
        ...formData,
        preferredSkills: [...formData.preferredSkills, formData.newSkill],
        newSkill: ''
      });
    }
  };
  
  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      preferredSkills: formData.preferredSkills.filter(s => s !== skill)
    });
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        throw new Error('User not logged in');
      }

      const updatedUser = await updateUserProfile(currentUser.id, {
        name: formData.companyName,
        type: 'employer',
        location: formData.location,
        companyType: formData.businessType
      });

      if (!updatedUser) {
        throw new Error('Failed to update profile');
      }

      navigate('/browse-workers');
    } catch (error) {
      setIsLoading(false);
      alert('Error creating profile: ' + (error as Error).message);
    }
  };
  
  // Render different steps based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Company Information</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-gray-700 font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="businessType" className="block text-gray-700 font-medium mb-1">Company Type</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select company type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Business Details</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="location" className="block text-gray-700 font-medium mb-1">Business Address / Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="gstin" className="block text-gray-700 font-medium mb-1">Business License or GSTIN (optional)</label>
                <input
                  type="text"
                  id="gstin"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Company Logo */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Company Logo</label>
                <div className="mt-1 flex items-center gap-5">
                  <div 
                    className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {companyLogo ? (
                      <img src={companyLogo as string} alt="Company Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Building className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Upload Logo
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Hiring Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="hiringVolume" className="block text-gray-700 font-medium mb-1">Hiring Volume (Monthly)</label>
                <select
                  id="hiringVolume"
                  name="hiringVolume"
                  value={formData.hiringVolume}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select hiring volume</option>
                  {hiringVolumeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">Preferred Skills</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="newSkill"
                    value={formData.newSkill}
                    onChange={handleInputChange}
                    placeholder="Enter a skill"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                
                {formData.preferredSkills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.preferredSkills.map((skill, index) => (
                      <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        <span className="text-sm">{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 text-sm rounded-md">
                <p className="text-blue-700 flex items-start">
                  <Shield className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Your profile will be reviewed by our admin team. Once verified, your company will receive a verified employer badge, increasing trust with potential workers.</span>
                </p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 py-4 px-6">
            <h2 className="text-2xl font-bold text-white">Employer Profile</h2>
            <p className="text-blue-100 mt-1">Complete your profile to start hiring skilled workers</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {[...Array(totalSteps)].map((_, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                      ${index + 1 === currentStep
                        ? 'bg-blue-600 text-white'
                        : index + 1 < currentStep
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                  >
                    {index + 1 < currentStep ? <CircleCheck size={16} /> : index + 1}
                  </div>
                ))}
              </div>
              <div className="relative">
                <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
                <div 
                  className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Step content */}
            {renderStep()}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                className={`px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ${
                  currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentStep === 1}
              >
                Back
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin mr-2 h-5 w-5" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Profile'
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
