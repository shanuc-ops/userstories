// index.js
const natural = require('natural');

// Example usage of the natural npm package
const tokenizer = new natural.WordTokenizer();
console.log(tokenizer.tokenize("Natural language processing with Node.js is powerful!"));

const PORT = process.env.PORT || 3000;
console.log(`Application running on port ${PORT}`);
