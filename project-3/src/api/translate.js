import axios from 'axios';

const API_KEY = 'AIzaSyAjsTytVyEbN9Ap81tqiuW8zVcoycN_oP4';
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

/**
 * Sends a query to the translation.googleapis.com website including text to be translated and the language to translate to.
 * 
 * The script contains an API_Key variable required to access the API
 * @param {string} text text to be translated into the target language
 * @param {string} targetLanguage the language the text should be translated to
 * @returns Text translated into the target language
 */
const translateText = async (text, targetLanguage) => {
  const response = await axios.post(
    `${API_URL}?key=${API_KEY}`,
    {
      q: text,
      target: targetLanguage,
    }
  );

  return response.data.data.translations[0].translatedText;
};

export default translateText;