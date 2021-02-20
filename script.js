const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitter = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  // Pick a random quote from apiQuotes
  const randomQuote = Math.floor(Math.random() * apiQuotes.length)
  const { text, author } = apiQuotes[randomQuote]
  // Check if Author field is blank and replace it with 'Unknown'
  if (!author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.innerText = author
  }
  // Check the quote length to determine styling
  if (text.length > 50) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  // set the quote, hide loader
  quoteText.innerText = text
  complete()
}

// Get Quote from API
async function getQuotes() {
  loading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    console.log('whoops, no quotes', error);
  }
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

// EventListener
newQuoteBtn.addEventListener('click', getQuotes)
twitter.addEventListener('click', tweetQuote)

// onLoad
getQuotes()