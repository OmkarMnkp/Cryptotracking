// FETCHING LIVE CRYPTOCURRENCY PRICES -------------***************--------------

// function to fetch prices

async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coincap.io/v2/assets?limit=5');
        const { data } = await response.json();
        Table(data);
    } catch (error) {
        console.error('Error fetching currency prices:', error);
    }
}

// function for table
function Table(data) {
    const tableBody = document.getElementById('cryptoTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    // creating arrays of text symbols and image URLs
    const textSymbols = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'ADA'];
    const imageUrls = [
        './icons/bitcoin.png',
        './icons/ethereum.png',
        './icons/tether.png',
        './icons/binance.png',
        './icons/solana.png',
        './icons/cardano.png'  
    ];
    // using for each loop for allocation of image, symbol, name, and price row
    data.forEach((crypto, index) => {
        const row = tableBody.insertRow();
        const imageCell = row.insertCell(0);
        const emptyCell = row.insertCell(1);
        const nameCell = row.insertCell(2);
        const priceCell = row.insertCell(3);

        // Add image to the image cell
        const img = document.createElement('img');
        img.src = imageUrls[index % imageUrls.length];
        img.alt = 'Crypto Image';
        imageCell.appendChild(img);

        // Add text symbol to the empty cell
        const textSymbol = document.createTextNode(textSymbols[index % textSymbols.length]);
        emptyCell.appendChild(textSymbol);

        // Appending crypto name and price in name cell and price cell
        nameCell.textContent += ` ${crypto.name}`;
        priceCell.textContent = `$${parseFloat(crypto.priceUsd).toFixed(4)}`;
    });
}

// Fetch cryptocurrency prices when the page loads
window.onload = fetchCryptoPrices;

// Fetch cryptocurrency prices every 5 seconds
setInterval(fetchCryptoPrices, 5000);



// FETCHING CRYPTOCURRENCY GRAPH -----------------***************------------------------ 

// function to fetch Cryptocurrency graph
document.addEventListener("DOMContentLoaded", () => {
    function searchCrypto() {

        // taking input from class crypto-input
        const cryptoInput = document.getElementById('crypto-input');

        // converting text to lowercase
        const cryptoName = cryptoInput.value.trim().toLowerCase();

        // creating a div 
        const graphDiv = document.createElement("div");

        // setting a class
        graphDiv.classList.add('created-div');

        // append div to container
        document.getElementById('graph-container').innerHTML = "";
        document.getElementById('graph-container').appendChild(graphDiv);

        // creating a canvas
        const canvas = document.createElement('canvas');
        graphDiv.appendChild(canvas);

        // showing graph in 2d form
        const cryptoChart = canvas.getContext('2d');

        // fetching data for last 5 months 
        fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=usd&days=150&interval=daily`).then(response => response.json())
            .then(data => {
                if (data.prices.length === 0) {
                    alert(`error for ${cryptoName}.`);
                    return;
                }

                // extracting prices and timestamp at indexes from data with array of prices
                const timestamps = data.prices.map(entry => entry[0]);
                const prices = data.prices.map(entry => entry[1]);

                // convert timestamps into human readable format
                const dates = timestamps.map(timestamp => new Date(timestamp).toLocaleDateString());

                // creating a graph using chart.js
                new Chart(cryptoChart, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            label: `${cryptoName.toUpperCase()} Price (USD)`,
                            data: prices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: false,
                        }],
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Price (USD)',
                                },
                            },
                        },
                    },
                });

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    document.querySelector('.searchBtn').addEventListener('click', searchCrypto);
});



//  SIGNUP SECTION

// function to open signup model
function openSignUpModal() {

    // using signupmodel
    const modal = document.getElementById('signUpModal');

    // setting to displayflex
    modal.style.display = 'flex';
}

// function to close signup model
function closeSignUpModal() {

    const modal = document.getElementById('signUpModal');

    // setting display to none
    modal.style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    const modal = document.getElementById('signUpModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// CONVERSION OF ONE CURRENCY TO ANOTHER
document.addEventListener('DOMContentLoaded', function () {
    // Function to convert one currency to another  to crypto
    window.convert = function () {

        // getting values from amount,currency and crytocurrency and converting to upper case
        const amount = parseFloat(document.getElementById('amount').value);
        const currency = document.getElementById('currency').value.toUpperCase();
        const cryptoCurrency = document.getElementById('cryptoCurrency').value.toUpperCase();

        // if user enter wrong informations
        if (isNaN(amount) || !currency || !cryptoCurrency) {
            alert('Please enter a valid amount, currency, and cryptocurrency.');
            return;
        }

        //fetching conversion through api 
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`)
            .then(response => response.json())
            .then(data => {
                // chatgpt code
                const cryptoAmount = amount / data.bitcoin[currency.toLowerCase()];
                const resultElement = document.getElementById('result');
                resultElement.innerHTML = `${amount} ${currency} is approximately ${cryptoAmount.toFixed(3)} ${cryptoCurrency}`;
            })
            .catch(error => {
                console.error('Error fetching exchange rate:', error);
                alert('Error fetching exchange rate. Please try again.');
            });
    };
});


// CONVERSION POPUP

// function to open popup
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

// function to close popup
function closePopup() {

    // setting display to none
    document.getElementById('popup').style.display = 'none';
}

function signup() {

    alert('sucessfully signedUp!!!!!');
}

// adding record in database
async function addCrypto() {

    const cryptoName = document.getElementById('cryptoName').value.toLowerCase();
    const quantity = document.getElementById('quantity').value;
    const purchasePrice = document.getElementById('purchasePrice').value;
    const date = document.getElementById('dateAcquisition').value;

    const URL = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data[cryptoName] && data[cryptoName].usd) {
            const currentPrice = data[cryptoName].usd;
            const totalInvestment = (quantity * purchasePrice).toFixed(2);
            const percentageChange = (((currentPrice - purchasePrice) / purchasePrice) * 100).toFixed(2);

            const messageContainer = document.getElementById('message-container');

            // Display success message
            messageContainer.textContent = 'Record inserted successfully!';

            // emptyingthe inputs
            document.getElementById('userName').value = '';
            document.getElementById('userEmail').value = '';
            document.getElementById('cryptoName').value = '';
            document.getElementById('quantity').value = '';
            document.getElementById('purchasePrice').value = '';
            document.getElementById('dateAcquisition').value = '';
        } else {
            alert('Invalid cryptocurrency name or unable to fetch data.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// deleting items
function deleteListItem(listItem) {
    listItem.remove();
}
