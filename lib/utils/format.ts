export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export const formatPotency = (potency: { thca?: number; delta8?: number; cbd?: number }): string => {
  if (potency.thca) return `${potency.thca}% THCa`;
  if (potency.delta8) return `${potency.delta8}% Δ8`;
  if (potency.cbd) return `${potency.cbd}% CBD`;
  return 'N/A';
};

export const formatWeight = (weight: string): string => {
  return weight;
};

export const generateOrderId = (): string => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

export const validateZipCode = (zip: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zip);
};

export const getStateFromZip = (zip: string): string | null => {
  // This is a simplified mapping - in production you'd use a proper ZIP to state service
  const zipStates: { [key: string]: string } = {
    '90': 'CA', '91': 'CA', '92': 'CA', '93': 'CA', '94': 'CA', '95': 'CA', '96': 'CA',
    '10': 'NY', '11': 'NY', '12': 'NY', '13': 'NY', '14': 'NY',
    '77': 'TX', '78': 'TX', '79': 'TX',
    '33': 'FL', '34': 'FL', '32': 'FL',
    '60': 'IL', '61': 'IL', '62': 'IL',
    '80': 'CO', '81': 'CO',
    '97': 'OR', '98': 'WA', '99': 'WA',
    '83': 'ID', '84': 'UT',
    '05': 'VT', '02': 'RI',
    '96': 'HI', '72': 'AR',
    '66': 'KS', '67': 'KS',
    '70': 'LA', '71': 'LA',
    '73': 'OK', '74': 'OK'
  };

  const prefix = zip.substring(0, 2);
  return zipStates[prefix] || null;
};