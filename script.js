
function getElement(element) {
  if (element) {
    const el = document.getElementById(element)
    return el
  }
  throw new Error(`No such a ${element} Please check!`)
}

const quoteContainer = getElement('quote-container')
const quoteText = getElement('quote')
const authorText = getElement('author')
const twitter = getElement('twitter')
const newQuoteBtn = getElement('new-quote')
const loader = getElement('loader')


let apiQuotes = []

// show loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  showLoadingSpinner()
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
  removeLoadingSpinner()
}

// Get Quote from API
async function getQuotes() {
  showLoadingSpinner()
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
newQuoteBtn.addEventListener('click', newQuote)
twitter.addEventListener('click', tweetQuote)

// onLoad
getQuotes()