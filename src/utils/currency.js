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
  if(!exchangeRates || !amount) {
    return amount;
  }
  if(from === to) {
    amount ? Number(amount.toFixed(2)) : 0;
  }
  if (exchangeRates) {
    const rates = JSON.parse(exchangeRates);
    return Number((amount * rates[from][to]).toFixed(2))
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
