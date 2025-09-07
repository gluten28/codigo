// Utilities for localStorage management in the Excel Guide app
export interface UserProgress {
  completedLessons: string[];
  favorites: string[];
  notes: Record<string, string>;
  settings: {
    fontSize: 'small' | 'medium' | 'large';
    theme: 'light' | 'dark';
  };
}

const STORAGE_KEYS = {
  COMPLETED_LESSONS: 'excel-guide-completed',
  FAVORITES: 'excel-guide-favorites',
  NOTES: 'excel-guide-notes',
  SETTINGS: 'excel-guide-settings'
} as const;

// Completed Lessons
export const getCompletedLessons = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS) || '[]');
  } catch {
    return [];
  }
};

export const markLessonComplete = (lessonId: string): void => {
  const completed = getCompletedLessons();
  if (!completed.includes(lessonId)) {
    completed.push(lessonId);
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
  }
};

export const unmarkLessonComplete = (lessonId: string): void => {
  const completed = getCompletedLessons();
  const filtered = completed.filter(id => id !== lessonId);
  localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(filtered));
};

export const isLessonComplete = (lessonId: string): boolean => {
  return getCompletedLessons().includes(lessonId);
};

// Favorites
export const getFavorites = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
  } catch {
    return [];
  }
};

export const addFavorite = (lessonId: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(lessonId)) {
    favorites.push(lessonId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }
};

export const removeFavorite = (lessonId: string): void => {
  const favorites = getFavorites();
  const filtered = favorites.filter(id => id !== lessonId);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
};

export const clearAllFavorites = (): void => {
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
};

export const isFavorite = (lessonId: string): boolean => {
  return getFavorites().includes(lessonId);
};

// Notes
export const getNotes = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '{}');
  } catch {
    return {};
  }
};

export const saveNote = (lessonId: string, note: string): void => {
  const notes = getNotes();
  notes[lessonId] = note;
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
};

export const getNote = (lessonId: string): string => {
  const notes = getNotes();
  return notes[lessonId] || '';
};

// Settings
export const getSettings = () => {
  try {
    const settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}');
    return {
      fontSize: settings.fontSize || 'medium',
      theme: settings.theme || 'light'
    };
  } catch {
    return {
      fontSize: 'medium' as const,
      theme: 'light' as const
    };
  }
};

export const saveSettings = (settings: Partial<UserProgress['settings']>): void => {
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
};

// Copy to clipboard utility
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};