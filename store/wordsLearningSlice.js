import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_FORGETTING_SPAN } from "../constants";

const initialState = {
  words: [],
};

const wordsLearningSlice = createSlice({
  name: "wordsLearning",
  initialState,
  reducers: {
    addWord(state, action) {
      const alreadyExists = state.words.some(
        (item) => item.word === action.payload.word
      );
      if (!alreadyExists) {
        const now = new Date().getTime();
        state.words.push({
          ...action.payload,
          status: 0,
          forgettingSpan: INITIAL_FORGETTING_SPAN,
          dateForgets: now - INITIAL_FORGETTING_SPAN,
          dateTotallyForgets: now,
        });
      }
    },

    updateWord(state, action) {
      const { word, phonetics, audio, meaning, partOfSpeech } = action.payload;
      const existing = state.words.find((item) => item.word === word);
      if (existing) {
        existing.phonetics = phonetics;
        existing.audio = audio;
        existing.meaning = meaning;
        existing.partOfSpeech = partOfSpeech;
      }
    },

    removeWord(state, action) {
      state.words = state.words.filter((item) => item.word !== action.payload);
    },

    updateWordLearnInfo(state, action) {
      const existing = state.words.find((item) => item.word === action.payload);
      if (existing) {
        const now = new Date().getTime();
        existing.dateForgets = now + existing.forgettingSpan;
        existing.dateTotallyForgets = now + existing.forgettingSpan * 2;
        existing.forgettingSpan = existing.forgettingSpan * 2;
        existing.status = 2;
      }
    },

    updateStatuses(state) {
      const now = new Date().getTime();
      state.words.forEach((item) => {
        if (now > item.dateTotallyForgets) {
          item.status = 0;
        } else if (now > item.dateForgets) {
          item.status = 1;
        } else {
          item.status = 2;
        }
      });
    },
  },
});

// For correct passing of the tests please, leave these exports as they are
export const wordsLearningActions = wordsLearningSlice.actions;

export default wordsLearningSlice;