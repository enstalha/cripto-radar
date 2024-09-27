const optionsPrice = { method: 'GET', headers: { accept: 'application/json' } };
const btcValue = document.querySelector(".btc-value");
const ethValue = document.querySelector(".eth-value");
const xrpValue = document.querySelector(".xrp-value");
const solValue = document.querySelector(".sol-value");
const news = document.querySelector(".news");
const walletBtcElement = document.querySelector(".wallet-btc");
const walletElement = document.querySelector(".wallet");

const fiyatlar = () => {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,solana&vs_currencies=usd', optionsPrice)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      if (data.bitcoin && data.bitcoin.usd) {
        console.log("Bitcoin Fiyatı:", data.bitcoin.usd);
        btcValue.innerHTML = data.bitcoin.usd;
      } else {
        console.error("Bitcoin verisi bulunamadı!");
      }

      if (data.ethereum && data.ethereum.usd) {
        console.log("Ethereum Fiyatı:", data.ethereum.usd);
        ethValue.innerHTML = data.ethereum.usd;
      } else {
        console.error("Ethereum verisi bulunamadı!");
      }

      if (data.ripple && data.ripple.usd) {
        console.log("Ripple Fiyatı:", data.ripple.usd);
        xrpValue.innerHTML = data.ripple.usd;
      } else {
        console.error("Ripple verisi bulunamadı!");
      }

      if (data.solana && data.solana.usd) {
        console.log("Solana Fiyatı:", data.solana.usd);
        solValue.innerHTML = data.solana.usd;
      } else {
        console.error("Solana verisi bulunamadı!");
      }

      const walletBtc = Number(walletBtcElement.innerHTML);
      const bitcoinPrice = Number(data.bitcoin.usd);
      
      walletElement.innerHTML = (walletBtc * bitcoinPrice).toFixed(2);
    })
    .catch(err => console.error('Fetch error: ', err));
}

fiyatlar();

// setInterval(fiyatlar, 60000); 

fetch('cripto-news.json')
  .then(response => {return response.json();})
  .then(data => {
    for(let i = 0; i < 4; i++){
        let random = ((Math.random()) * data.length).toFixed(0);
        console.log(data[random].title);

        let haber = document.createElement("p");

        haber.innerHTML = data[random].title;

        news.append(haber)
    }
    
  })
  .catch(err => console.error('Error fetching news: ', err));
