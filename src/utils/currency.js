import { getLocalStorage } from '@/api/storage'

export const currency = {
  EUR: {
    symbol: '€',
    name: 'Euro',
    conversion: {
      CHF: 1.06,
      EUR: 1,
    }
  },
  CHF: {
    symbol: 'CHF',
    name: 'Swiss Franc',
    conversion: {
      CHF: 1,
      EUR: 0.95,
    }
  }
}

export const convertAmount = (from, to, amount) => {
  return Number((amount * currency[from].conversion[to]).toFixed(2))
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
