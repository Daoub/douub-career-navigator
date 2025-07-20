import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ResumeData {
  personalInfo: any;
  experience: any[];
  education: any[];
  skills: any[];
  certificates: any[];
  courses: any[];
  template: string;
  lastModified: Date;
}

interface StorageOptions {
  autoSaveInterval?: number;
  storageKey?: string;
}

export const useResumeStorage = (initialData?: Partial<ResumeData>, options: StorageOptions = {}) => {
  const { toast } = useToast();
  const { autoSaveInterval = 30000, storageKey = 'resume_draft' } = options;
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedIn: '',
      nationality: '',
      dateOfBirth: '',
      maritalStatus: ''
    },
    experience: [],
    education: [],
    skills: [],
    certificates: [],
    courses: [],
    template: 'vision-professional',
    lastModified: new Date(),
    ...initialData
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save to localStorage
  const autoSave = useCallback(async () => {
    try {
      const dataToSave = JSON.stringify(resumeData);
      localStorage.setItem(storageKey, dataToSave);
      localStorage.setItem(`${storageKey}_timestamp`, Date.now().toString());
      setLastSaved(new Date());
    } catch (error) {
      console.warn('Auto-save failed:', error);
    }
  }, [resumeData, storageKey]);

  // Manual save with user feedback
  const save = useCallback(async (showToast = true) => {
    setIsSaving(true);
    try {
      const updatedData = {
        ...resumeData,
        lastModified: new Date()
      };
      
      // Update state
      setResumeData(updatedData);
      
      // Save to localStorage
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      localStorage.setItem(`${storageKey}_saved`, JSON.stringify(updatedData));
      localStorage.setItem(`${storageKey}_timestamp`, Date.now().toString());
      
      setLastSaved(new Date());
      
      if (showToast) {
        toast({
          title: 'Success',
          description: 'Resume saved successfully',
        });
      }
      
      return updatedData;
    } catch (error) {
      if (showToast) {
        toast({
          title: 'Error',
          description: 'Failed to save resume',
          variant: 'destructive'
        });
      }
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [resumeData, storageKey, toast]);

  // Load from localStorage
  const loadSaved = useCallback(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_saved`);
      if (saved) {
        const parsedData = JSON.parse(saved);
        setResumeData(prev => ({ ...prev, ...parsedData }));
        return parsedData;
      }
    } catch (error) {
      console.warn('Failed to load saved data:', error);
    }
    return null;
  }, [storageKey]);

  // Load draft from localStorage
  const loadDraft = useCallback(() => {
    try {
      const draft = localStorage.getItem(storageKey);
      if (draft) {
        const parsedData = JSON.parse(draft);
        setResumeData(prev => ({ ...prev, ...parsedData }));
        return parsedData;
      }
    } catch (error) {
      console.warn('Failed to load draft:', error);
    }
    return null;
  }, [storageKey]);

  // Clear all saved data
  const clearStorage = useCallback(() => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${storageKey}_saved`);
    localStorage.removeItem(`${storageKey}_timestamp`);
    setLastSaved(null);
  }, [storageKey]);

  // Check if there are unsaved changes
  const hasUnsavedChanges = useCallback(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_saved`);
      if (!saved) return true;
      
      const savedData = JSON.parse(saved);
      return JSON.stringify(resumeData) !== JSON.stringify(savedData);
    } catch (error) {
      return true;
    }
  }, [resumeData, storageKey]);

  // Auto-save effect
  useEffect(() => {
    const timer = setTimeout(autoSave, autoSaveInterval);
    return () => clearTimeout(timer);
  }, [autoSave, autoSaveInterval]);

  // Load data on mount
  useEffect(() => {
    loadDraft() || loadSaved();
  }, [loadDraft, loadSaved]);

  return {
    resumeData,
    setResumeData,
    save,
    autoSave,
    loadSaved,
    loadDraft,
    clearStorage,
    isSaving,
    lastSaved,
    hasUnsavedChanges: hasUnsavedChanges()
  };
};