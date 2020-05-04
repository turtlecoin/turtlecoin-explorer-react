export function prettyPrint(amount: string | number, decimals: number = 2) {
  let prettyValue = formatLikeCurrency(atomicToHuman(Number(amount), decimals));
  return prettyValue;
}

export function formatLikeCurrency(x: string | number): string {
  const parts = typeof x === 'string' ? x.split('.') : x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function atomicToHuman(x: number, decimals: number): string {
  return (x / 100).toFixed(decimals);
}
