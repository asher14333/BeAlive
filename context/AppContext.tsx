import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Types
interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

interface Challenge {
  id: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  snapshot: string;
  expiry: string;
  stake: number;
  totalPool: number;
  yesPool: number;
  noPool: number;
  yesCount: number;
  noCount: number;
  myCommitment: 'yes' | 'no' | null;
  updates: Array<{
    id: string;
    text: string;
    timestamp: string;
  }>;
}

interface AppState {
  user: User | null;
  challenges: Challenge[];
  isAuthenticated: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'ADD_CHALLENGE'; payload: Challenge }
  | { type: 'UPDATE_CHALLENGE'; payload: { id: string; updates: Partial<Challenge> } }
  | { type: 'COMMIT_TO_CHALLENGE'; payload: { challengeId: string; choice: 'yes' | 'no' } };

// Initial state
const initialState: AppState = {
  user: null,
  challenges: [
    {
      id: '1',
      title: 'Will Asher go to the gym 5 days this week?',
      creator: 'Sarah',
      creatorAvatar: 'SA',
      snapshot: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Gym+Photo',
      expiry: '2 days left',
      stake: 20,
      totalPool: 240,
      yesPool: 180,
      noPool: 60,
      yesCount: 9,
      noCount: 3,
      myCommitment: null,
      updates: [
        { id: '1', text: 'Day 1: Hit the gym! 💪', timestamp: '2 hours ago' },
        { id: '2', text: 'Day 2: Another great session', timestamp: '1 day ago' },
      ],
    },
    {
      id: '2',
      title: 'Will Mike finish his book this month?',
      creator: 'Emma',
      creatorAvatar: 'EM',
      snapshot: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Book+Photo',
      expiry: '5 days left',
      stake: 15,
      totalPool: 120,
      yesPool: 40,
      noPool: 80,
      yesCount: 2,
      noCount: 6,
      myCommitment: 'no',
      updates: [
        { id: '1', text: 'Started chapter 3 today', timestamp: '3 hours ago' },
      ],
    },
    {
      id: '3',
      title: 'Will Lisa cook dinner at home 4 nights this week?',
      creator: 'Tom',
      creatorAvatar: 'TO',
      snapshot: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Cooking+Photo',
      expiry: '3 days left',
      stake: 25,
      totalPool: 200,
      yesPool: 150,
      noPool: 50,
      yesCount: 6,
      noCount: 2,
      myCommitment: 'yes',
      updates: [],
    },
  ],
  isAuthenticated: false,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'ADD_CHALLENGE':
      return { ...state, challenges: [...state.challenges, action.payload] };
    case 'UPDATE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload.id
            ? { ...challenge, ...action.payload.updates }
            : challenge
        ),
      };
    case 'COMMIT_TO_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload.challengeId
            ? { ...challenge, myCommitment: action.payload.choice }
            : challenge
        ),
      };
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
