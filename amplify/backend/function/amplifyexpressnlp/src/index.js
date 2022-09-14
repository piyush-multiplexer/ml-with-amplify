/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const stopwords = [
  "i",
  "me",
  "my",
  "myself",
  "we",
  "our",
  "ours",
  "ourselves",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "he",
  "him",
  "his",
  "himself",
  "she",
  "her",
  "hers",
  "herself",
  "it",
  "its",
  "itself",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  "what",
  "which",
  "who",
  "whom",
  "this",
  "that",
  "these",
  "those",
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "having",
  "do",
  "does",
  "did",
  "doing",
  "a",
  "an",
  "the",
  "and",
  "but",
  "if",
  "or",
  "because",
  "as",
  "until",
  "while",
  "of",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "to",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "should",
  "now",
];

function remove_stopwords(str) {
  let res = [];
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    let word_clean = words[i].split(".").join("");
    if (!stopwords.includes(word_clean)) {
      res.push(word_clean);
    }
  }
  return res.join(" ");
}
exports.handler = async (event) => {
  console.log("LAMBDA FUNTION INVOKED");
  const natural = require("natural");
  const fetch = require("node-fetch");
  let TfIdf = natural.TfIdf; // term-frequency inverce document frequency
  let tfidf = new TfIdf();
  const sent_tokenizer = new natural.SentenceTokenizer(); // sentence tokenizer
  const word_tokenizer = new natural.WordTokenizer(); // word tokenizer
  const body = JSON.parse(event.body);
  const doc = body.doc;
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const sents = sent_tokenizer.tokenize(doc); // tokenize sentences
  let word_freq = {};
  // sentences without stopwords
  sents.forEach((sent) => {
    tfidf.addDocument(remove_stopwords(sent));
  });
  // remove stopwords from document
  let stopWRDoc = remove_stopwords(doc);
  let wordArr = [];

  wordArr = word_tokenizer.tokenize(stopWRDoc);

  // find frequency of words
  wordArr.forEach((word) => {
    if (!word_freq[word]) word_freq[word] = 0;
    if (wordArr.indexOf(word) === -1) word_freq[word] = 1;
    else word_freq[word] += 1;
  });

  // get maximum frequency
  const MAX_FREQ = Math.max(...Object.values(word_freq));

  // calculate weighted frequency
  Object.keys(word_freq).forEach((key) => {
    word_freq[key] = word_freq[key] / MAX_FREQ;
  });

  // calculate sentence scores
  let sent_scores = {};

  const word_freq_keys = Object.keys(word_freq);
  sents.forEach((sent) => {
    word_tokenizer.tokenize(sent.toLowerCase()).forEach((word) => {
      if (word_freq_keys.indexOf(word) !== -1) {
        // shorter sentence for summary X length
        if (sent.split(" ").length < body.sentLength) {
          if (Object.keys(sent_scores).indexOf(sent) === -1) {
            sent_scores[sent] = word_freq[word];
          } else {
            sent_scores[sent] += word_freq[word];
          }
        }
      }
    });
  });
  // get summary
  const summary = await fetch("https://heapq-api.vercel.app/nlargest", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      size: 5,
      sent_scores: sent_scores,
    }),
  }).then((res) => res.json());

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({ flag: true, data: summary }),
  };
};
