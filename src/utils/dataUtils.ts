import { format, parse, isValid } from 'date-fns'; // Ensure date-fns is imported

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  // Using date-fns format for consistency and better React Native compatibility
  return format(date, 'dd.MM.yyyy');
};

export const getUpcomingBirthday = (dateString: string): Date => {
  const today = new Date();
  const birthDate = new Date(dateString);
  
  // Set birthday to current year
  const thisYearBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  
  // If the birthday has already passed this year, get next year's date
  if (thisYearBirthday < today) {
    thisYearBirthday.setFullYear(today.getFullYear() + 1);
  }
  
  return thisYearBirthday;
};

export const getDaysUntilBirthday = (dateString: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const birthDate = new Date(dateString);
  
  // Create this year's birthday
  const thisYearBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  thisYearBirthday.setHours(0, 0, 0, 0);
  
  // If birthday already passed this year, use next year
  let targetBirthday = thisYearBirthday;
  if (thisYearBirthday < today) {
    targetBirthday = new Date(
      today.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
    targetBirthday.setHours(0, 0, 0, 0);
  }
  
  // Calculate difference in days
  const diffTime = targetBirthday.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
};

export const getBirthdayThisYear = (dateString: string): Date => {
  const date = new Date(dateString);
  const today = new Date();
  return new Date(today.getFullYear(), date.getMonth(), date.getDate());
};

export const calculateAge = (dateString: string): number => {
  const birthDate = new Date(dateString);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  
  // Check if birthday hasn't occurred yet this year
  const hasBirthdayOccurred = 
    today.getMonth() > birthDate.getMonth() || 
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
  if (!hasBirthdayOccurred) {
    age--;
  }
  
  return age;
}; 