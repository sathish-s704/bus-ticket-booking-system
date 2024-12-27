export const tamilNaduCities = [
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Salem',
  'Tiruchirappalli',
  'Tirunelveli',
  'Tiruppur',
  'Vellore',
  'Erode',
  'Thoothukudi',
  'Dindigul',
  'Thanjavur',
  'Ranipet',
  'Sivakasi',
  'Karur',
  'Ooty',
  'Hosur',
  'Nagercoil',
  'Kanchipuram',
  'Kumbakonam'
] as const;

export type TamilNaduCity = typeof tamilNaduCities[number];