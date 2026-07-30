// sentiment/index.js
const natural = require('natural');
const Analyzer = natural.SentimentAnalyzer;
const Stemmer = natural.PorterStemmer;

// Initialize the sentiment analyzer using AFINN lexicon
const analyzer = new Analyzer("English", Stemmer, "afinn");

/**
 * Analyzes the sentiment of a given text.
 * @param {string} text - The input text to analyze.
 * @returns {object} An object containing the text and its calculated sentiment score.
 */
function analyzeSentiment(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);
  const score = analyzer.getSentiment(tokens);
  return { text, score };
}

// Example usage
const sampleText = "This capstone project is absolutely fantastic and works seamlessly!";
console.log(analyzeSentiment(sampleText));

module.exports = { analyzeSentiment };
