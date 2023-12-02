import React from 'react';


const CurrencyInput = ({amount, currency, currencies, onCurrencyChange, onAmountChange}) => {
  return (
    <div className='wrapper'>
      <input value={amount} onChange={(e=> onAmountChange(e.target.value))}/>
      <select value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
        {currencies.map((currency) => (
        <option value={currency} key={currency}>{currency}</option>
   ))}
</select>
    </div>
  )
}

export default CurrencyInput;
