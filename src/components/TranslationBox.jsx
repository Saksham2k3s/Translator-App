import React from 'react';
import TranslationFields from './TranslationFields';
import TranslationControls from './TranslationControls';
import { useDispatch, useSelector } from 'react-redux';
import { translateText } from '../redux/translateSlice';

function TranslationBox() {
  const dispatch = useDispatch()
  const { originalText, sourceLanguage, targetLanguage, status } = useSelector(state => state.translate);
  const handleClick = () => {
      dispatch(translateText({text: originalText, sourceLanguage, targetLanguage}))
  }
  return (
    <div className='flex flex-col bg-white min-h-[300px] min-w-[50%] self-center p-1 lg:p-6 shadow-lg rounded-lg '>
      <TranslationFields />
      <TranslationControls/>
      <button className='w-[80%] bg-purple-400 text-white py-3 text-center self-center mt-4 rounded-xl font-bold  ' onClick={handleClick} >{status === "loading" ? "Translating" : "Translate"}</button>
    </div>
  );
}

export default TranslationBox;
