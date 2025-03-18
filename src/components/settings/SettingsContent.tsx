'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Settings, UserCircle, Key, Users, CreditCard, Mail, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { getUserProfile, updateUserProfile, updateUserMetadata } from '@/lib/supabase';

export default function SettingsContent() {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    timezone: '',
    language: 'en',
  });

  const [profileInfo, setProfileInfo] = useState({
    displayName: '',
    bio: '',
    profileImage: '',
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [emailSettings, setEmailSettings] = useState({
    marketingEmails: true,
    productUpdates: true,
    securityAlerts: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    inAppNotifications: true,
    emailNotifications: true,
    pushNotifications: false,
  });

  // Fetch user data on component mount
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        // Get user data from auth
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;
        
        // Get user email directly from auth user
        const userEmail = user.email || '';
        
        // Extract user metadata
        const metadata = user.user_metadata || {};
        
        // Try to fetch profile from profiles table
        try {
          const profile = await getUserProfile();
          
          if (profile) {
            // Split full name into first and last name
            const nameParts = profile.full_name ? profile.full_name.split(' ') : ['', ''];
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            
            setPersonalInfo(prev => ({
              ...prev,
              firstName,
              lastName,
              email: userEmail, // Use email directly from auth user
              phone: metadata.phone || '',
              jobTitle: metadata.job_title || '',
              timezone: metadata.timezone || '',
              language: metadata.language || 'en',
            }));
            
            setProfileInfo(prev => ({
              ...prev,
              displayName: metadata.display_name || profile.full_name || '',
              bio: metadata.bio || '',
              profileImage: profile.avatar_url || metadata.avatar_url || '',
            }));
            
            setEmailSettings(prev => ({
              ...prev,
              marketingEmails: metadata.marketing_emails !== false,
              productUpdates: metadata.product_updates !== false,
              securityAlerts: metadata.security_alerts !== false,
            }));
            
            setNotificationSettings(prev => ({
              ...prev,
              inAppNotifications: metadata.in_app_notifications !== false,
              emailNotifications: metadata.email_notifications !== false,
              pushNotifications: metadata.push_notifications === true,
            }));
          }
        } catch (error) {
          // Even if profile fetch fails, still set the email
          setPersonalInfo(prev => ({
            ...prev,
            email: userEmail,
          }));
          console.error('Error fetching profile:', error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load your settings');
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [supabase]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEmailSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };

  const savePersonalInfo = async () => {
    try {
      setLoading(true);
      const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();
      
      // Update profile
      await updateUserProfile({
        full_name: fullName,
        email: personalInfo.email,
      });
      
      // Update user metadata
      await updateUserMetadata({
        phone: personalInfo.phone,
        job_title: personalInfo.jobTitle,
        timezone: personalInfo.timezone,
        language: personalInfo.language,
      });
      
      toast.success('Personal information updated successfully');
    } catch (error) {
      console.error('Error updating personal info:', error);
      toast.error('Failed to update personal information');
    } finally {
      setLoading(false);
    }
  };

  const saveProfileInfo = async () => {
    try {
      setLoading(true);
      
      // Update user metadata
      await updateUserMetadata({
        display_name: profileInfo.displayName,
        bio: profileInfo.bio,
      });
      
      // Update profile if avatar_url changes
      if (profileInfo.profileImage) {
        await updateUserProfile({
          avatar_url: profileInfo.profileImage,
        });
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Use a simple redirect UI since you mentioned this is just a template
  return (
    <div className="flex justify-center items-center p-8">
      <h1 className="text-2xl">Settings content will be displayed here</h1>
    </div>
  );
} 