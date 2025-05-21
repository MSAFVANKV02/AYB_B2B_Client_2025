const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen',
  ];
  
  const b = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety',
  ];
  
  const inWords = (num: number): string => {
    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? ' ' + a[num % 10] : '');
    if (num < 1000) return a[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + inWords(num % 100) : '');
    if (num < 100000) return inWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + inWords(num % 1000) : '');
    if (num < 10000000) return inWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + inWords(num % 100000) : '');
    return inWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + inWords(num % 10000000) : '');
  };
  
  export const useNumToWord = () => {
    const convert = (num: number | string): string => {
      const parsed = typeof num === 'number' ? num : parseFloat(num);
      if (isNaN(parsed)) return 'Invalid number';
  
      const [rupeesStr, paiseStr] = parsed.toFixed(2).split('.');
      const rupees = parseInt(rupeesStr, 10);
      const paise = parseInt(paiseStr, 10);
  
      let result = '';
      if (rupees > 0) result += inWords(rupees) + ' Rupees';
      if (paise > 0) result += (result ? ' and ' : '') + inWords(paise) + ' Paise';
      return result ? result + ' Only' : 'Zero Rupees Only';
    };
  
    return { convert };
  };
  