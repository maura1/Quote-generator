const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


//Get Quotes from API using an asynchronous function

let apiQuotes = []; //let because we are starting with an empty array but changing the value of it when we get the quotes.

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}




//Show New Quote

function newQuote(){
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.texContent ='Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    
    //Check quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote')
    }
    //Set quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
    }


async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        //The constance response will not be populated until it has some data fetched from the api
        const response = await fetch(apiUrl);
        //We are getting the JSON from the api as a response, and we are turning it into a JSON object, that will be passed into a global variable (apiQuotes)
        apiQuotes = await response.json();
        
        newQuote();

    }catch(error){

    }
}
//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
  }

//Event listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On load
getQuotes();






/* if we wanted to use the loal quotes in the 'quotes.js' file .It does not need a fetch request
function newQuote(){
    //Pick a random quote from apiQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    console.log(quote)
}

newQuote();*/