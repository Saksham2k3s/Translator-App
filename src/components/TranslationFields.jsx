import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOriginalText } from '../redux/translateSlice';

function TranslationFields() {
  const dispatch = useDispatch();
  const { originalText, translatedText } = useSelector(state => state.translate);
  
  const handleOriginalTextChange = (e) => {
    dispatch(setOriginalText(e.target.value)); 
  };

  return (
    <div className='flex w-full gap-2 lg:gap-4'>
      <div className='w-[50%]'>
        <textarea
          name="inputText"
          id="inputText"
          className='w-full h-[150px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Enter text in English...'
          value={originalText}
          onChange={handleOriginalTextChange} 
        ></textarea>
      </div>
      <div className='w-[50%]'>
        <textarea
          name="translatedText"
          id="translatedText"
          className='w-full h-[150px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
          placeholder='Translated text...'
          value={translatedText}
          readOnly
        ></textarea>
      </div>
    </div>
  );
}

export default TranslationFields;
