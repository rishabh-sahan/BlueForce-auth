export type UserRole = 'admin' | 'employer' | 'worker';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole | string; // allow string for dynamic roles
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Additional fields based on role
  companyName?: string; // For employers
  companyType?: string; // For employers (added for compatibility)
  companySize?: string; // For employers
  industry?: string; // For employers
  skills?: string[]; // For workers
  experience?: number; // For workers
  rating?: number; // For workers
  completedJobs?: number; // For workers
  bio?: string;
  profileImage?: string; // Used in UserProfilePage
  profile_photo?: string; // For compatibility with code using this property
  full_name?: string; // For compatibility with code using this property
  type?: string; // For compatibility with code using this property
  mobile?: string; // For compatibility with code using this property
  location?: string; // For employers
  projects?: string[]; // For employers
  availability?: {
    isAvailable: boolean;
    schedule?: {
      [key: string]: {
        start: string;
        end: string;
      };
    };
  };
}

export interface WorkerProfile extends UserProfile {
  skills: string[];
  experience: number;
  rating: number;
  completedJobs: number;
  availability: {
    isAvailable: boolean;
    schedule?: {
      [key: string]: {
        start: string;
        end: string;
      };
    };
  };
}

export interface EmployerProfile extends UserProfile {
  companyName: string;
  companyType?: string;
  companySize: string;
  industry: string;
  projects: string[];
  location?: string;
}

export interface AdminProfile extends UserProfile {
  permissions: string[];
  managedUsers: number;
} 