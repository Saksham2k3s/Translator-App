import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const REACT_APP_TRANSLATOR_URL = process.env.REACT_APP_TRANSLATOR_URL;
export const translateText = createAsyncThunk(
  'translation/translateText',
  async ({ text, sourceLanguage, targetLanguage }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_TRANSLATOR_URL}?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`
      );
      return response.data.responseData.translatedText;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Parse translateHistory from localStorage or set an empty array if not found
const storedHistory = localStorage.getItem('translateHistory');
const translateHistory = storedHistory ? JSON.parse(storedHistory) : [];

// Initial state for the translation slice
const initialState = {
  originalText: '',
  translatedText: '',
  sourceLanguage: 'en-GB',
  targetLanguage: 'hi-IN',
  status: 'idle',
  error: null,
  translateHistory: translateHistory
};

const translateSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setOriginalText: (state, action) => {
      state.originalText = action.payload;
    },
    setTranslatedText: (state, action) => {
      state.translatedText = action.payload;
    },
    setSourceLanguage: (state, action) => {
      state.sourceLanguage = action.payload;
    },
    setTargetLanguage: (state, action) => {
      state.targetLanguage = action.payload;
    },
    resetTranslation: (state) => {
      state.originalText = '';
      state.translatedText = '';
      state.sourceLanguage = 'en-GB';
      state.targetLanguage = 'hi-IN';
      state.status = 'idle';
      state.error = null;
    },
    addTranslationToHistory: (state, action) => {
      const newTranslation = {
        originalText: action.payload.originalText,
        translatedText: action.payload.translatedText,
        sourceLanguage: action.payload.sourceLanguage,
        targetLanguage: action.payload.targetLanguage,
        timestamp: new Date().toLocaleString()
      };

      if (state.translateHistory.length >= 10) {
        state.translateHistory.shift();
      }

      state.translateHistory.push(newTranslation);

      localStorage.setItem('translateHistory', JSON.stringify(state.translateHistory));
    },

    removeItem : (state, action) => {
      console.log("This is index", action.payload);
      const index = action.payload;
      const filtredItems = state.translateHistory.filter((_, idx) => idx !== index);
      state.translateHistory = filtredItems
      localStorage.setItem('translateHistory', JSON.stringify(filtredItems));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(translateText.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(translateText.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.translatedText = action.payload;

        // Save the new translation to history
        const newTranslation = {
          originalText: state.originalText,
          translatedText: state.translatedText,
          sourceLanguage: state.sourceLanguage,
          targetLanguage: state.targetLanguage,
          timestamp: new Date().toLocaleString() // Adding current date and time
        };

        // Ensure history does not exceed 10 entries
        if (state.translateHistory.length >= 10) {
          state.translateHistory.shift(); // Remove the first (oldest) entry
        }

        state.translateHistory.push(newTranslation);
        localStorage.setItem('translateHistory', JSON.stringify(state.translateHistory));
      })
      .addCase(translateText.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const {
  setOriginalText,
  setTranslatedText,
  setSourceLanguage,
  setTargetLanguage,
  resetTranslation,
  addTranslationToHistory,
  removeItem
} = translateSlice.actions;

export default translateSlice.reducer;
