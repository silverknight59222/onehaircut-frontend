import { getLocalStorage } from '@/api/storage'

export const currency = {
  EUR: {
    symbol: '€',
    name: 'Euro',
  },
  CHF: {
    symbol: 'CHF',
    name: 'Swiss Franc',
  },
  USD: {
    symbol: '$',
    name: 'US Dollar',
  },
  CAD: {
    symbol: 'C$',
    name: 'Canadian Dollar',
  },
}

export const convertAmount = (from, to, amount) => {
  const exchangeRates = getLocalStorage("exchangeRates");
  if(!exchangeRates || !amount || !Number(amount)) {
    return amount;
  }
  if(from === to) {
    amount ? Number(Number(amount).toFixed(2)) : 0;
  }
  if (exchangeRates) {
    const rates = JSON.parse(exchangeRates);
    return Number((Number(amount) * rates['currency_constants'][from][to]).toFixed(2))
  }
  return amount
}

export const getUserCurrency = () => {
  // return 'CHF'
  let user = getLocalStorage("user");
  const userData = user ? JSON.parse(user) : null;
  return userData && userData.currency ? userData.currency : "EUR";
}

export const getCurrencySymbol = () => {
  return currency[getUserCurrency()].symbol;
}

export const getCurrencyByCountryCode = (code) => {
  switch(code) {
    case "CH":
      return "CHF";
    case "US":
      return "USD";
    case "CA":
      return "CAD";
    default:
      return "EUR";
  }
}
