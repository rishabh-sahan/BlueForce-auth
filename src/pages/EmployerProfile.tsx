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
        type: 'employer',
        name: formData.companyName,
        email: formData.email,
        location: formData.location,
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

  return null; // Ensure your full JSX return content is here if removed earlier
};

export default EmployerProfile;
