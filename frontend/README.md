# BeAlive - Bet on Everyday Life

A social accountability + prediction app that blends Polymarket's betting mechanics with BeReal-style authenticity.

## Features

### 🎯 Core Mechanics
- **Challenge Creation**: Create challenges with photo proof (BeReal-style)
- **Commitment System**: Users commit yes/no with fixed stakes (locked permanently)
- **Pool Management**: Prize pools split evenly among winners
- **Progress Updates**: Challenge creators can post daily updates

### 📱 Screens
- **Splash Screen**: Animated BeAlive branding
- **Authentication**: Phone number + SMS verification (demo: use code 123456)
- **Home Feed**: Browse and commit to challenges from friends
- **My Commitments**: View locked-in bets with payout calculations
- **Settings**: Profile management, notifications, privacy controls
- **Create Challenge**: Modal for creating new challenges with photo upload

### 🎨 Design
- **Color Scheme**: White primary, black secondary
- **Typography**: Clean, modern sans-serif fonts
- **UI Components**: Reusable Button and Input components
- **Animations**: Smooth transitions and micro-interactions

## Tech Stack

- **Framework**: Expo React Native
- **Navigation**: Expo Router with tab navigation
- **State Management**: React Context + useReducer
- **Icons**: Expo Vector Icons (Ionicons)
- **Styling**: StyleSheet with consistent design system

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on device/simulator:
   ```bash
   npm run ios
   # or
   npm run android
   ```

## App Flow

1. **Splash** → **Login** → **Home Feed**
2. Users can browse challenges and commit (yes/no)
3. Once committed, choices are locked permanently
4. View commitments in "My Bets" tab
5. Create new challenges via floating action button

## Key Features Implemented

✅ **Navigation Structure**: Bottom tabs (Home, Commitments, Settings)  
✅ **Authentication Flow**: Phone verification with demo code  
✅ **Challenge Cards**: Rich UI with pool stats and commit buttons  
✅ **Commitment System**: Locked-in choices with visual feedback  
✅ **State Management**: Context-based state with proper typing  
✅ **Reusable Components**: Button, Input, and consistent styling  
✅ **Responsive Design**: Clean white/black color scheme throughout  

## Demo Credentials

- **Phone Number**: Any valid format (e.g., +1 (555) 123-4567)
- **Verification Code**: 123456

## Architecture

```
app/
├── (tabs)/           # Tab navigation screens
├── splash.tsx        # Animated splash screen
├── login.tsx         # Phone verification
├── create-challenge.tsx # Modal for challenge creation
└── _layout.tsx       # Root navigation setup

components/
├── Button.tsx        # Reusable button component
└── Input.tsx         # Reusable input component

context/
└── AppContext.tsx    # Global state management
```

The app demonstrates a complete social betting experience with proper state management, beautiful UI, and the critical "no-switch" commitment rule that makes each bet permanent and meaningful.
