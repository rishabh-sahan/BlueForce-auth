export type UserRole = 'admin' | 'employer' | 'worker';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole | string; // Allow custom roles from DB
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Optional role-specific or extended fields
  companyName?: string;           // Employer
  companyType?: string;           // Employer
  companySize?: string;           // Employer
  industry?: string;              // Employer
  location?: string;              // Employer
  projects?: string[];            // Employer

  skills?: string[];              // Worker
  experience?: number;            // Worker
  rating?: number;                // Worker
  completedJobs?: number;         // Worker

  availability?: {
    isAvailable: boolean;
    schedule?: {
      [day: string]: {
        start: string;
        end: string;
      };
    };
  };

  // General optional fields
  bio?: string;
  profileImage?: string;          // General
  profile_photo?: string;         // For compatibility with Supabase
  full_name?: string;             // Supabase profile fallback
  type?: string;                  // Supabase role fallback
  mobile?: string;                // Supabase phone fallback
}

export interface WorkerProfile extends UserProfile {
  skills: string[];
  experience: number;
  rating: number;
  completedJobs: number;
  availability: {
    isAvailable: boolean;
    schedule?: {
      [day: string]: {
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
