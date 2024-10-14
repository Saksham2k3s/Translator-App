
# Translator App

The Translator App is a web-based language translation tool built with React and Redux. It allows users to input text, select source and target languages, and get translations in real-time. The app also includes features like text-to-speech, a history of translations, and the ability to switch between languages easily.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Redux State Structure](#redux-state-structure)
- [Responsive Design](#responsive-design)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Translation:** Translate text between multiple languages.
- **Language Switching:** Easily switch between source and target languages.
- **Text-to-Speech:** Listen to both the original and translated text.
- **Translation History:** View your previous translations and click on them to reuse.
- **Copy to Clipboard:** Copy the translated text to your clipboard.
- **Responsive Design:** Mobile-first responsive design with dynamic sidebar visibility on smaller screens.

## Technologies Used

- **Frontend:** React, Redux
- **UI Library:** TailwindCSS
- **Icons:** React Icons (Hi, Rx, Md Icons)
- **Text-to-Speech API:** Browser's `SpeechSynthesis` API
- **Other Dependencies:**
  - `react-hot-toast`: For error and success notifications.
  - `languages`: Custom object for handling multiple languages.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/translator-app.git
   cd translator-app
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. **Build the app for production:**

   ```bash
   npm run build
   ```

## Usage

1. **Translation:** Enter text in the input box, select source and target languages, and click the translate button.
2. **Switch Languages:** Use the language switch button between the source and target languages.
3. **Text-to-Speech:** Click the speaker icon next to the source or target language to hear the text.
4. **Copy to Clipboard:** Click the clipboard icon next to the translated text to copy it.
5. **History:** Your past translations will appear in the sidebar. You can click on any item to load it into the translation box again.
6. **Mobile View:** In mobile view, a history button will appear. Clicking it reveals the sidebar for translation history.

## Redux State Structure

```javascript
{
  translate: {
    originalText: '',        // The input text to translate
    translatedText: '',      // The result of the translation
    sourceLanguage: 'en',    // Selected source language (default: English)
    targetLanguage: 'fr',    // Selected target language (default: French)
    translateHistory: [],    // Array of past translations
    error: null              // Error messages for failed translations
  }
}
```

## Responsive Design

The Translator App is designed to be responsive, ensuring usability on both desktop and mobile devices.

- **Desktop:** The translation history is always visible in the sidebar for easy access.
- **Mobile:** A 'History' button is available to toggle the visibility of the translation history sidebar.

## Future Enhancements

- **API Integration:** Use an external translation API like Google Translate or Microsoft Azure Translator for improved translation accuracy.
- **Authentication:** Allow users to sign in and save their translation history permanently.
- **Multi-language support for the app UI.**
- **Dark Mode:** Add a dark mode toggle for better accessibility.

## Contributing

We welcome contributions! Please feel free to submit a pull request or file an issue if you have suggestions for improving the app.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push the branch (`git push origin feature-branch`)
5. Create a new Pull Request


