'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Settings, UserCircle, Key, Users, CreditCard, Mail, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { getUserProfile, updateUserProfile, updateUserMetadata } from '@/lib/supabase';

export default function SettingsPage() {
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

  const savePassword = async () => {
    try {
      setLoading(true);
      
      // Validate password
      if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }
      
      if (passwordInfo.newPassword.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
      
      // For users with password auth, verify current password first
      if (passwordInfo.currentPassword) {
        // Sign in with current password to verify it
        try {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: personalInfo.email,
            password: passwordInfo.currentPassword,
          });
          
          if (signInError) {
            toast.error('Current password is incorrect');
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error verifying current password:', error);
          toast.error('Failed to verify current password');
          setLoading(false);
          return;
        }
      }
      
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: passwordInfo.newPassword,
      });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
      
      // Clear password fields
      setPasswordInfo({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const saveEmailSettings = async () => {
    try {
      setLoading(true);
      
      // Update user metadata
      await updateUserMetadata({
        marketing_emails: emailSettings.marketingEmails,
        product_updates: emailSettings.productUpdates,
        security_alerts: emailSettings.securityAlerts,
      });
      
      toast.success('Email preferences updated successfully');
    } catch (error) {
      console.error('Error updating email preferences:', error);
      toast.error('Failed to update email preferences');
    } finally {
      setLoading(false);
    }
  };

  const saveNotificationSettings = async () => {
    try {
      setLoading(true);
      
      // Update user metadata
      await updateUserMetadata({
        in_app_notifications: notificationSettings.inAppNotifications,
        email_notifications: notificationSettings.emailNotifications,
        push_notifications: notificationSettings.pushNotifications,
      });
      
      toast.success('Notification settings updated successfully');
    } catch (error) {
      console.error('Error updating notification settings:', error);
      toast.error('Failed to update notification settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
    <div className="max-w-3xl">
      <h2 className="text-lg font-medium text-black">Settings Overview</h2>
      <p className="mt-1 text-sm text-gray-500">
        Manage your account settings and preferences.
      </p>
      </div>

      {/* Personal Information */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <UserCircle className="h-5 w-5 text-black" />
          <h2 className="text-lg font-medium text-black">Personal Information</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500 mb-6">
          Update your personal information and preferences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={personalInfo.firstName}
              onChange={handlePersonalInfoChange}
              className="mt-1 input input-bordered w-full"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={personalInfo.lastName}
              onChange={handlePersonalInfoChange}
              className="mt-1 input input-bordered w-full"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="mt-1 input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
              className="mt-1 input input-bordered w-full"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            className="btn btn-primary" 
            onClick={savePersonalInfo}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Personal Information'}
          </button>
        </div>
      </div>

      {/* Profile */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-black" />
          <h2 className="text-lg font-medium text-black">Profile</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500 mb-6">
          Customize how others see you on the platform.
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
              Display name
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              value={profileInfo.displayName}
              onChange={handleProfileInfoChange}
              className="mt-1 input input-bordered w-full"
              placeholder="Enter your display name"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={3}
              value={profileInfo.bio}
              onChange={handleProfileInfoChange}
              className="mt-1 textarea textarea-bordered w-full"
              placeholder="Tell us about yourself"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            className="btn btn-primary" 
            onClick={saveProfileInfo}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-5 w-5 text-black" />
          <h2 className="text-lg font-medium text-black">Password</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500 mb-6">
          Update your password to keep your account secure.
        </p>

        <div className="space-y-6 max-w-md">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Current password
            </label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={passwordInfo.currentPassword}
              onChange={handlePasswordChange}
              className="mt-1 input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={passwordInfo.newPassword}
              onChange={handlePasswordChange}
              className="mt-1 input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm new password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={passwordInfo.confirmPassword}
              onChange={handlePasswordChange}
              className="mt-1 input input-bordered w-full"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            className="btn btn-primary" 
            onClick={savePassword}
            disabled={loading || !passwordInfo.newPassword || !passwordInfo.confirmPassword}
          >
            {loading ? 'Saving...' : 'Update Password'}
          </button>
        </div>
      </div>

      {/* Email Preferences */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-black" />
          <h2 className="text-lg font-medium text-black">Email Preferences</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500 mb-6">
          Manage the emails you receive from us.
        </p>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="marketingEmails"
              id="marketingEmails"
              checked={emailSettings.marketingEmails}
              onChange={handleEmailSettingsChange}
              className="checkbox checkbox-black"
            />
            <label htmlFor="marketingEmails" className="ml-3 text-sm text-gray-700">
              Marketing emails
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="productUpdates"
              id="productUpdates"
              checked={emailSettings.productUpdates}
              onChange={handleEmailSettingsChange}
              className="checkbox checkbox-black"
            />
            <label htmlFor="productUpdates" className="ml-3 text-sm text-gray-700">
              Product updates
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="securityAlerts"
              id="securityAlerts"
              checked={emailSettings.securityAlerts}
              onChange={handleEmailSettingsChange}
              className="checkbox checkbox-black"
            />
            <label htmlFor="securityAlerts" className="ml-3 text-sm text-gray-700">
              Security alerts
            </label>
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            className="btn btn-primary" 
            onClick={saveEmailSettings}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Email Preferences'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-black" />
          <h2 className="text-lg font-medium text-black">Notifications</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500 mb-6">
          Configure how you want to receive notifications.
        </p>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="inAppNotifications"
              id="inAppNotifications"
              checked={notificationSettings.inAppNotifications}
              onChange={handleNotificationChange}
              className="checkbox checkbox-black"
            />
            <label htmlFor="inAppNotifications" className="ml-3 text-sm text-gray-700">
              In-app notifications
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="emailNotifications"
              id="emailNotifications"
              checked={notificationSettings.emailNotifications}
              onChange={handleNotificationChange}
              className="checkbox checkbox-black"
            />
            <label htmlFor="emailNotifications" className="ml-3 text-sm text-gray-700">
              Email notifications
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="pushNotifications"
              id="pushNotifications"
              checked={notificationSettings.pushNotifications}
              onChange={handleNotificationChange}
              className="checkbox checkbox-black"
            />
            <label htmlFor="pushNotifications" className="ml-3 text-sm text-gray-700">
              Push notifications
            </label>
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            className="btn btn-primary" 
            onClick={saveNotificationSettings}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Notification Settings'}
          </button>
        </div>
      </div>
    </div>
  );
} 