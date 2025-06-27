// Mock exercise data for testing when API is unavailable
export const mockExercises = {
  shoulders: [
    {
      id: '1',
      name: 'shoulder press',
      target: 'shoulders',
      bodyPart: 'shoulders',
      equipment: 'dumbbell',
      gifUrl: 'https://v2.exercisedb.io/image/g7aOPQq9BElhD4',
      instructions: ['Stand with feet hip-width apart', 'Hold dumbbells at shoulder height', 'Press weights overhead'],
      secondaryMuscles: ['triceps']
    },
    {
      id: '2',
      name: 'lateral raise',
      target: 'shoulders',
      bodyPart: 'shoulders',
      equipment: 'dumbbell',
      gifUrl: 'https://v2.exercisedb.io/image/IwGnAqKF1RMPLQ',
      instructions: ['Stand with dumbbells at sides', 'Raise arms to shoulder height', 'Lower slowly'],
      secondaryMuscles: ['traps']
    },
    {
      id: '3',
      name: 'front raise',
      target: 'shoulders',
      bodyPart: 'shoulders',
      equipment: 'dumbbell',
      gifUrl: 'https://v2.exercisedb.io/image/4T3kEygEDILOGP',
      instructions: ['Hold dumbbells in front of thighs', 'Raise one arm forward to shoulder height', 'Lower slowly'],
      secondaryMuscles: ['chest']
    }
  ],
  back: [
    {
      id: '4',
      name: 'bent over row',
      target: 'lats',
      bodyPart: 'back',
      equipment: 'dumbbell',
      gifUrl: 'https://v2.exercisedb.io/image/eZUgGsrD7qTCX5',
      instructions: ['Bend at hips with dumbbells', 'Pull weights to chest', 'Lower slowly'],
      secondaryMuscles: ['rhomboids', 'biceps']
    },
    {
      id: '5',
      name: 'deadlift',
      target: 'spinal erectors',
      bodyPart: 'back',
      equipment: 'barbell',
      gifUrl: 'https://v2.exercisedb.io/image/lk7VPBzNzTlvJl',
      instructions: ['Stand with feet hip-width apart', 'Grip barbell with hands outside legs', 'Lift by extending hips and knees'],
      secondaryMuscles: ['glutes', 'hamstrings']
    }
  ],
  'lower arms': [
    {
      id: '6',
      name: 'bicep curl',
      target: 'biceps',
      bodyPart: 'lower arms',
      equipment: 'dumbbell',
      gifUrl: 'https://v2.exercisedb.io/image/vEbEV2LVgGJ7DE',
      instructions: ['Stand with dumbbells at sides', 'Curl weights to shoulders', 'Lower slowly'],
      secondaryMuscles: ['forearms']
    },
    {
      id: '7',
      name: 'hammer curl',
      target: 'biceps',
      bodyPart: 'lower arms',
      equipment: 'dumbbell',
      gifUrl: 'https://v2.exercisedb.io/image/ePMfPHVcKGJdQw',
      instructions: ['Hold dumbbells with neutral grip', 'Curl weights keeping thumbs up', 'Lower slowly'],
      secondaryMuscles: ['forearms']
    }
  ],
  'upper legs': [
    {
      id: '8',
      name: 'squat',
      target: 'quadriceps',
      bodyPart: 'upper legs',
      equipment: 'body weight',
      gifUrl: 'https://v2.exercisedb.io/image/jEJElkJjNTgsDY',
      instructions: ['Stand with feet shoulder-width apart', 'Lower body as if sitting back', 'Return to standing'],
      secondaryMuscles: ['glutes', 'calves']
    },
    {
      id: '9',
      name: 'lunge',
      target: 'quadriceps',
      bodyPart: 'upper legs',
      equipment: 'body weight',
      gifUrl: 'https://v2.exercisedb.io/image/NjW8w5dIpDbTJv',
      instructions: ['Step forward into lunge position', 'Lower back knee toward ground', 'Return to starting position'],
      secondaryMuscles: ['glutes', 'calves']
    }
  ]
};
