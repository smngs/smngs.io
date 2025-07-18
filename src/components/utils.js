export function formatToMonthYear(dateStr) {
  const date = new Date(dateStr);
  const parts = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).formatToParts(date);

  const month = parts.find(p => p.type === 'month')?.value;
  const year  = parts.find(p => p.type === 'year')?.value;

  return `${month}. ${year}`;
}

export function formatToMonthYearJP(dateStr) {
  const date = new Date(dateStr);
  const parts = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(date);

  const month = parts.find(p => p.type === 'month')?.value;
  const year  = parts.find(p => p.type === 'year')?.value;

  return `${year} 年 ${month} 月`;
}
