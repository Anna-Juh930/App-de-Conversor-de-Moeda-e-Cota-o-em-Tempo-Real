export async function getExchangeRates() {
  try {
    const response = await fetch(
      'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL'
    );
    const data = await response.json();
    return {
      USD: parseFloat(data.USDBRL.high),
      EUR: parseFloat(data.EURBRL.high),
      GBP: parseFloat(data.GBPBRL.high),
      JPY: parseFloat(data.JPYBRL.high),
    };
  } catch (error) {
    console.error('Erro ao buscar cotações:', error);
    return { USD: 0, EUR: 0, GBP: 0, JPY: 0 };
  }
}
