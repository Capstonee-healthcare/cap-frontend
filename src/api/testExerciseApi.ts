// Test script to verify ExerciseDB API access
import axios from 'axios';

const testExerciseAPI = async () => {
  console.log('🧪 Testing ExerciseDB API access...');
  
  // Use your working API key
  const apiKey = 'bc17782dcemsh63fff438aaf8adcp1b43a9jsn9981829fc593';
  
  try {
    console.log(`Testing with your API key: ${apiKey.substring(0, 10)}...`);
    
    const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
      headers: {
        'x-rapidapi-key': apiKey, // lowercase as in your curl example
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      },
      params: {
        limit: 10,
        offset: 0
      },
      timeout: 10000
    });
    
    console.log('✅ API Key works!', response.data.length, 'exercises found');
    console.log('Sample exercise:', response.data[0]?.name);
    console.log('Available body parts:', [...new Set(response.data.map((ex: any) => ex.bodyPart))].join(', '));
    return true;
    
  } catch (error: any) {
    console.log('❌ API Key failed:', error.response?.status, error.message);
    if (error.response) {
      console.log('Response data:', error.response.data);
    }
  }
  
  return false;
};

export { testExerciseAPI };
