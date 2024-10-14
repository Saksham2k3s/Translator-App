import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { MdWorkHistory } from "react-icons/md";
import {
  setOriginalText,
  setSourceLanguage,
  setTargetLanguage,
  setTranslatedText,
  removeItem,
  resetTranslation,
} from "../redux/translateSlice";

function HistorySideBar() {
  const dispatch = useDispatch();
  const { translateHistory } = useSelector((state) => state.translate);

  // Load the selected history item into the translation fields
  const handleHistoryClick = (historyItem) => {
    dispatch(setOriginalText(historyItem.originalText));
    dispatch(setSourceLanguage(historyItem.sourceLanguage));
    dispatch(setTargetLanguage(historyItem.targetLanguage));
    dispatch(setTranslatedText(historyItem.translatedText));
  };

  // Remove history item without affecting other translations
  const removeItemHandler = (event, index) => {
    event.stopPropagation(); // Prevent triggering the history click
    dispatch(removeItem(index));
    dispatch(resetTranslation());
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-4 text-center pt-5 ">
        History
      </h2>
      <div className="flex flex-col w-full h-full p-4">
        {translateHistory && translateHistory.length > 0 ? (
          translateHistory.map((text, idx) => (
            <div
              key={idx}
              className="relative p-4 mb-3 bg-white rounded-lg shadow-md hover:bg-slate-200 transition-colors duration-200 cursor-pointer"
              onClick={() => handleHistoryClick(text)}
            >
              {/* Remove item button */}
              <div
                className="absolute right-4 top-4 p-2 hover:bg-gray-400 rounded-full"
                onClick={(e) => removeItemHandler(e, idx)}
              >
                <RxCross2 />
              </div>
              {/* Display original and translated text previews */}
              <div className="text-lg font-semibold text-gray-800">
                {text.originalText.slice(0, 10)}...
              </div>
              <div className="text-gray-600">
                {text.translatedText.slice(0, 20)}...
              </div>
              {/* Display timestamp */}
              <div className="text-sm text-gray-400">
                {new Date(text.timestamp).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 flex flex-col justify-center align-middle">
            <MdWorkHistory className="self-center" size={24} />
            <div className="self-center">No items..</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistorySideBar;
