const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
//Show Loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
//Hide Loading
const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

//Show New Quote
function newQuote() {
  loading();
  //Picking a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if author field is blank and replace it with "unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown author";
  } else {
    authorText.textContent = quote.author;
  }

  //Check quote length to determine styling
  if (quote.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

//Get Quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json(); //turn response into a JSON object
    //console.log(apiQuotes[12]);
    newQuote();
  } catch (error) {
    alert(error.message);
  }
}

//Tweet Quotes
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuotes();
