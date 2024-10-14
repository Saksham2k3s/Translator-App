import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiVolumeUp, HiSwitchHorizontal, HiClipboard } from 'react-icons/hi';
import languages from '../languages';
import { setSourceLanguage, setTargetLanguage } from '../redux/translateSlice';
import toast from 'react-hot-toast';

function TranslationControls() {
  const dispatch = useDispatch();
  const { sourceLanguage, targetLanguage, originalText, translatedText } = useSelector((state) => state.translate);

  const handleSwitchLanguages = () => {
    dispatch(setSourceLanguage(targetLanguage));
    dispatch(setTargetLanguage(sourceLanguage));
  };

  const speakText = (text, languageCode) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCode;
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy!');
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border border-gray-300 rounded-lg p-3 bg-white shadow-md space-y-4 md:space-y-0 md:space-x-4">
      {/* Source Language Section */}
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <button
          onClick={() => speakText(originalText, sourceLanguage)}
          className="text-gray-500 hover:text-black"
        >
          <HiVolumeUp size={20} />
        </button>
        <select
          value={sourceLanguage}
          onChange={(e) => dispatch(setSourceLanguage(e.target.value))}
          className="border-none bg-transparent text-lg focus:outline-none cursor-pointer w-full md:w-auto"
        >
          {Object.keys(languages).map((langCode) => (
            <option key={langCode} value={langCode}>
              {languages[langCode]}
            </option>
          ))}
        </select>
        <button onClick={() => handleCopyText(originalText)} className="text-gray-500 hover:text-black">
          <HiClipboard size={20} />
        </button>
      </div>

      {/* Language Switch Button */}
      <div className="flex justify-center md:mx-4 w-full md:w-auto">
        <button onClick={handleSwitchLanguages} className="text-gray-500 hover:text-black">
          <HiSwitchHorizontal size={20} />
        </button>
      </div>

      {/* Target Language Section */}
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <select
          value={targetLanguage}
          onChange={(e) => dispatch(setTargetLanguage(e.target.value))}
          className="border-none bg-transparent text-lg focus:outline-none cursor-pointer w-full md:w-auto"
        >
          {Object.keys(languages).map((langCode) => (
            <option key={langCode} value={langCode}>
              {languages[langCode]}
            </option>
          ))}
        </select>
        <button onClick={() => handleCopyText(translatedText)} className="text-gray-500 hover:text-black">
          <HiClipboard size={20} />
        </button>
        <button onClick={() => speakText(translatedText, targetLanguage)} className="text-gray-500 hover:text-black">
          <HiVolumeUp size={20} />
        </button>
      </div>
    </div>
  );
}

export default TranslationControls;
