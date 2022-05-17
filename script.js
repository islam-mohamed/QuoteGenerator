"use strict";
// Select containers and elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-text");
const soundBtn = document.getElementById("sound-text");
const loader = document.getElementById("loader");

// Get Quote From API
let apiQuotes = [];
async function getQuote() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //   Catch Error
    console.log(error);
  }
}

// Show New Quote
function newQuote() {
  loading();
  // Get a randon quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check author text
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote lenth
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  loadingComplete();
}

// Tweet function
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
// Show loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// hide loader
function loadingComplete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// POST ON TWITTER
twitterBtn.addEventListener("click", tweetQuote);

// Generate new Quote
newQuoteBtn.addEventListener("click", newQuote);

// Listen to quote
soundBtn.addEventListener("click", () => {
  let speechText = new SpeechSynthesisUtterance(
    `${quoteText.textContent} by ${authorText.textContent}`
  );
  speechSynthesis.speak(speechText);
});

// Copy quote
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(
    `${quoteText.textContent} - by ${authorText.textContent}`
  );
});

getQuote();
