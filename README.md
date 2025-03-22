# SurveyMe

A modern React Native application for creating and managing surveys, built with TypeScript and styled with NativeWind.

## Features

- Modern UI components using Gluestack UI
- Type-safe development with TypeScript
- Beautiful styling with NativeWind (Tailwind CSS for React Native)
- Form handling with React Hook Form and Yup validation
- State management with Zustand
- QR code scanning capabilities
- SVG support
- Safe area handling
- Animated components with React Native Reanimated

## Prerequisites

- Node.js >= 18
- React Native development environment setup
- iOS: Xcode (for iOS development)
- Android: Android Studio (for Android development)

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd surveyme
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (iOS only):

```bash
cd ios
pod install
cd ..
```

4. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

## Running the App

### Start Metro Bundler

```bash
npm start
# or
yarn start
```

### Run on iOS

```bash
npm run ios
# or
yarn ios
```

### Run on Android

```bash
npm run android
# or
yarn android
```

## Development

### Project Structure

- `/src` - Main source code
- `/components` - Reusable UI components
- `/types` - TypeScript type definitions
- `/__tests__` - Test files

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS
- `npm run android` - Run on Android
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Key Dependencies

- **UI Components**: Gluestack UI components
- **Styling**: NativeWind (Tailwind CSS)
- **Forms**: React Hook Form with Yup validation
- **State Management**: Zustand
- **Navigation**: React Navigation
- **Animations**: React Native Reanimated
- **Icons**: Lucide React Native
- **QR Scanning**: React Native Scanner

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the maintainers.
