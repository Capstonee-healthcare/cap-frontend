import axios from 'axios';
import { mockExercises } from '../data/mockExercises';

// Use your working API key
const API_HOST = 'exercisedb.p.rapidapi.com';
const API_KEY = 'bc17782dcemsh63fff438aaf8adcp1b43a9jsn9981829fc593';

type Exercise = {
  id: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  instructions: string[];
  secondaryMuscles: string[];
};

// Create axios instance with proper configuration matching your curl example
const axiosInstance = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': API_KEY, // Note: lowercase 'x' as in your curl example
    'x-rapidapi-host': API_HOST, // Note: lowercase 'x' as in your curl example
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const fetchExercisesByBodyPart = async (bodyPart: string): Promise<Exercise[]> => {
  console.log(`🔍 Fetching exercises for body part: ${bodyPart}`);
  
  try {
    // Method 1: Direct body part endpoint
    console.log('🌐 Trying direct bodyPart endpoint...');
    const response = await axiosInstance.get(`/exercises/bodyPart/${bodyPart}`, {
      params: { limit: 10 }
    });
    
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      console.log(`✅ Success: Found ${response.data.length} exercises for ${bodyPart}`);
      return response.data.slice(0, 10);
    }
  } catch (error: any) {
    console.error('❌ Direct endpoint failed:', error.response?.status, error.message);
    
    // Method 2: Try the base exercises endpoint and filter
    try {
      console.log('🔄 Trying base exercises endpoint with filtering...');
      const allResponse = await axiosInstance.get('/exercises', {
        params: { limit: 100 }
      });
      
      if (allResponse.data && Array.isArray(allResponse.data)) {
        const filtered = allResponse.data.filter((exercise: any) => 
          exercise.bodyPart && exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase()
        );
        
        if (filtered.length > 0) {
          console.log(`✅ Filtering worked: Found ${filtered.length} exercises for ${bodyPart}`);
          return filtered.slice(0, 10);
        }
      }
    } catch (filterError: any) {
      console.error('❌ Filtering approach failed:', filterError.response?.status, filterError.message);
    }
    
    // Method 3: Try with different API key format or headers
    try {
      console.log('🔄 Trying with alternative headers...');
      const altResponse = await axios({
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        },
        timeout: 20000
      });
      
      if (altResponse.data && Array.isArray(altResponse.data) && altResponse.data.length > 0) {
        console.log(`✅ Alternative headers worked: Found ${altResponse.data.length} exercises`);
        return altResponse.data.slice(0, 10);
      }
    } catch (altError: any) {
      console.error('❌ Alternative headers failed:', altError.response?.status, altError.message);
      
      // Show detailed error information
      if (altError.response) {
        console.error('� Detailed error info:');
        console.error('Status:', altError.response.status);
        console.error('Status Text:', altError.response.statusText);
        console.error('Headers:', altError.response.headers);
        console.error('Data:', altError.response.data);
        
        if (altError.response.status === 403) {
          console.error('🔑 403 Forbidden: This usually means:');
          console.error('   - API key is invalid or expired');
          console.error('   - You need to subscribe to the ExerciseDB API on RapidAPI');
          console.error('   - Rate limits exceeded');
          console.error('   - API endpoint has changed');
        }
      }
    }
  }
  
  // Final fallback to mock data
  console.log('📦 All API methods failed, using mock data');
  const mockData = mockExercises[bodyPart as keyof typeof mockExercises];
  if (mockData && mockData.length > 0) {
    console.log(`📦 Using ${mockData.length} mock exercises for ${bodyPart}`);
    return mockData;
  }
  
  return [];
};

export const fetchExerciseById = async (id: string): Promise<Exercise | null> => {
  try {
    const response = await axiosInstance.get(`/exercises/exercise/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exercise by ID:', error);
    return null;
  }
};

export const fetchAllBodyParts = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get('/exercises/bodyPartList');
    return response.data;
  } catch (error) {
    console.error('Error fetching body parts:', error);
    return [];
  }
};

export const searchExercises = async (query: string): Promise<Exercise[]> => {
  try {
    const response = await axiosInstance.get(`/exercises/name/${query}`);
    return response.data.slice(0, 10);
  } catch (error) {
    console.error('Error searching exercises:', error);
    return [];
  }
};
