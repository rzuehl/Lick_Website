import React, { useState } from 'react';
import translateText from '../api/translate';

function TranslateWindow() {
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default: Spanish
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    if (inputText) {
      setTranslatedText(await translateText(inputText, targetLanguage));
      // Do something with the translatedText, e.g., display it on the page.
    }
  };

  return (
    <div className="translate-window">
        <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
        />
        <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
        >
            <option value="ar">Arabic</option>
            <option value="zh-CN">Chinese</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="pt">Portugese</option>
            <option value="es">Spanish</option>
            <option value="vi">Vietnamese</option>
        </select>
        <button onClick={handleTranslate}>Translate</button>
        <p>{translatedText}</p>
    </div>
  );
}

export default TranslateWindow;