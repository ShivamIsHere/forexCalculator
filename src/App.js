import './App.css';
import CurrencyInput from './CurrencyInput';
import { useState , useEffect} from 'react';
import axios from 'axios'; 
import { format } from "date-fns";

const ACCESS_KEY ="efd0d33ecf2409ce676ffb99788d3600";
const CURRENCY_API =  `http://data.fixer.io/api/latest?access_key=${ACCESS_KEY}&symbols=INR,USD,AED,GBP,CAD,SGD,EUR,JPY,PKR,ZAR,ALL`;

function App() {
  const [amountOne, setAmountOne ] = useState(1);
  const [amountTwo, setAmountTwo ] = useState(1);
  const [currencyOne, setCurrencyOne ] = useState("INR");
  const [currencyTwo, setCurrencyTwo ] = useState("USD");
  const [currencyRates, setCurrencyRates] = useState([]);
  useEffect(()=>{
    axios
    .get(CURRENCY_API)
    .then((response)=>setCurrencyRates(response.data.rates))
    .catch((err)=>{
      console.log(err);
      setCurrencyRates(null);
    })
  },[]);

  const handleAmountOneChange = (amountOne) => {
    const newAmountTwo = formatCurrency((amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]);
    setAmountTwo(newAmountTwo);
    setAmountOne(amountOne);
  };
  useEffect(()=>{
    if(!!currencyRates){
      handleAmountOneChange(1);
    }
  },[currencyRates]);

const formatCurrency = (number)=>{
  return number.toFixed(2);
}


  const handleAmountTwoChange =(amountTwo)=>{
    setAmountOne(
      formatCurrency((amountTwo * currencyRates[currencyOne])/currencyRates[currencyTwo]
    ));
    setAmountTwo(amountTwo);
  }



  const handleCurrencyOneChange =(currencyOne)=>{
    setAmountTwo(
      formatCurrency((amountOne * currencyRates[currencyTwo])/currencyRates[currencyOne]
    ));
    setCurrencyOne(currencyOne);
  }


  const handleCurrencyTwoChange =(currencyTwo)=>{
    setAmountOne(
      formatCurrency((amountTwo * currencyRates[currencyOne])/currencyRates[currencyTwo]
    ));
    setCurrencyTwo(currencyTwo);
  }



 if(!currencyRates) return <p>Wrong Api Key...Reset api key</p>;
 if(currencyRates.length===0) return <p>Loading.......</p>;

  return (
    <div>
      <h1>Forex Calculator</h1>
      <p className='oneCurrencyText'>1 {currencyOne} equals</p>
      <p className='rateText'>{formatCurrency(amountTwo/amountOne)}{currencyOne}</p>
      <p className='date'>{format(new Date(), "dd/MM/yyyy h:mm")} </p>
      <CurrencyInput amount={amountOne} currency={currencyOne} currencies={Object.keys(currencyRates)} onAmountChange={handleAmountOneChange} onCurrencyChange={handleCurrencyOneChange} />
      <CurrencyInput amount={amountTwo} currency={currencyTwo} currencies={Object.keys(currencyRates)} onAmountChange={handleAmountTwoChange} onCurrencyChange={handleCurrencyTwoChange} />
    </div>  
  );
}

export default App;

