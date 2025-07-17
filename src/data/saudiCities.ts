export interface SaudiCity {
  id: string;
  name: string;
  nameAr: string;
  region: string;
  regionAr: string;
  subCities?: string[];
  subCitiesAr?: string[];
  isMainCity: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  vision2030Priority?: boolean;
  economicSectors: string[];
}

export const saudiCities: SaudiCity[] = [
  {
    id: 'all',
    name: 'All Cities',
    nameAr: 'جميع المدن',
    region: 'All Regions',
    regionAr: 'جميع المناطق',
    isMainCity: false,
    economicSectors: []
  },
  {
    id: 'riyadh',
    name: 'Riyadh',
    nameAr: 'الرياض',
    region: 'Riyadh Province',
    regionAr: 'منطقة الرياض',
    isMainCity: true,
    coordinates: { lat: 24.7136, lng: 46.6753 },
    vision2030Priority: true,
    economicSectors: ['government', 'finance', 'technology', 'business']
  },
  {
    id: 'jeddah',
    name: 'Jeddah',
    nameAr: 'جدة',
    region: 'Makkah Province',
    regionAr: 'منطقة مكة المكرمة',
    isMainCity: true,
    coordinates: { lat: 21.4858, lng: 39.1925 },
    vision2030Priority: true,
    economicSectors: ['business', 'trade', 'tourism', 'logistics']
  },
  {
    id: 'eastern-region',
    name: 'Eastern Region',
    nameAr: 'المنطقة الشرقية',
    region: 'Eastern Province',
    regionAr: 'المنطقة الشرقية',
    subCities: ['Dammam', 'Khobar', 'Al-Ahsa', 'Dhahran', 'Jubail'],
    subCitiesAr: ['الدمام', 'الخبر', 'الأحساء', 'الظهران', 'الجبيل'],
    isMainCity: true,
    coordinates: { lat: 26.4207, lng: 50.0888 },
    vision2030Priority: true,
    economicSectors: ['energy', 'petrochemicals', 'manufacturing', 'technology']
  },
  {
    id: 'medina-region',
    name: 'Medina Region',
    nameAr: 'منطقة المدينة المنورة',
    region: 'Medina Province',
    regionAr: 'منطقة المدينة المنورة',
    subCities: ['Yanbu', 'AlUla'],
    subCitiesAr: ['ينبع', 'العلا'],
    isMainCity: true,
    coordinates: { lat: 24.4686, lng: 39.6142 },
    vision2030Priority: true,
    economicSectors: ['tourism', 'logistics', 'industry', 'culture']
  },
  {
    id: 'mecca',
    name: 'Mecca',
    nameAr: 'مكة المكرمة',
    region: 'Makkah Province',
    regionAr: 'منطقة مكة المكرمة',
    isMainCity: true,
    coordinates: { lat: 21.3891, lng: 39.8579 },
    vision2030Priority: true,
    economicSectors: ['tourism', 'hospitality', 'religious services']
  },
  {
    id: 'taif',
    name: 'Taif',
    nameAr: 'الطائف',
    region: 'Makkah Province',
    regionAr: 'منطقة مكة المكرمة',
    isMainCity: true,
    coordinates: { lat: 21.2703, lng: 40.4178 },
    economicSectors: ['agriculture', 'tourism', 'manufacturing']
  },
  {
    id: 'abha',
    name: 'Abha',
    nameAr: 'أبها',
    region: 'Asir Province',
    regionAr: 'منطقة عسير',
    isMainCity: true,
    coordinates: { lat: 18.2164, lng: 42.5053 },
    vision2030Priority: true,
    economicSectors: ['tourism', 'agriculture', 'education']
  },
  {
    id: 'tabuk',
    name: 'Tabuk',
    nameAr: 'تبوك',
    region: 'Tabuk Province',
    regionAr: 'منطقة تبوك',
    isMainCity: true,
    coordinates: { lat: 28.3838, lng: 36.5550 },
    vision2030Priority: true,
    economicSectors: ['agriculture', 'mining', 'renewable energy']
  },
  {
    id: 'hail',
    name: 'Hail',
    nameAr: 'حائل',
    region: 'Hail Province',
    regionAr: 'منطقة حائل',
    isMainCity: true,
    coordinates: { lat: 27.5114, lng: 41.6961 },
    economicSectors: ['agriculture', 'mining', 'industry']
  },
  {
    id: 'jazan',
    name: 'Jazan',
    nameAr: 'جازان',
    region: 'Jazan Province',
    regionAr: 'منطقة جازان',
    isMainCity: true,
    coordinates: { lat: 16.8892, lng: 42.5511 },
    economicSectors: ['agriculture', 'industry', 'logistics']
  },
  {
    id: 'najran',
    name: 'Najran',
    nameAr: 'نجران',
    region: 'Najran Province',
    regionAr: 'منطقة نجران',
    isMainCity: true,
    coordinates: { lat: 17.4925, lng: 44.1277 },
    economicSectors: ['agriculture', 'mining', 'border trade']
  },
  {
    id: 'baha',
    name: 'Al Baha',
    nameAr: 'الباحة',
    region: 'Al Baha Province',
    regionAr: 'منطقة الباحة',
    isMainCity: true,
    coordinates: { lat: 20.0129, lng: 41.4687 },
    economicSectors: ['agriculture', 'tourism', 'forestry']
  },
  {
    id: 'qassim',
    name: 'Al Qassim',
    nameAr: 'القصيم',
    region: 'Qassim Province',
    regionAr: 'منطقة القصيم',
    isMainCity: true,
    coordinates: { lat: 26.3269, lng: 43.9750 },
    economicSectors: ['agriculture', 'education', 'commerce']
  },
  {
    id: 'northern-borders',
    name: 'Northern Borders',
    nameAr: 'الحدود الشمالية',
    region: 'Northern Borders Province',
    regionAr: 'منطقة الحدود الشمالية',
    isMainCity: true,
    coordinates: { lat: 30.9758, lng: 41.0214 },
    economicSectors: ['border trade', 'agriculture', 'livestock']
  },
  {
    id: 'jouf',
    name: 'Al Jouf',
    nameAr: 'الجوف',
    region: 'Al Jouf Province',
    regionAr: 'منطقة الجوف',
    isMainCity: true,
    coordinates: { lat: 29.7859, lng: 40.2099 },
    economicSectors: ['agriculture', 'renewable energy', 'mining']
  }
];

export const getCityById = (id: string): SaudiCity | undefined => {
  return saudiCities.find(city => city.id === id);
};

export const getCitiesByRegion = (region: string): SaudiCity[] => {
  return saudiCities.filter(city => city.region === region);
};

export const getVision2030Cities = (): SaudiCity[] => {
  return saudiCities.filter(city => city.vision2030Priority);
};

export const getCitiesBySector = (sector: string): SaudiCity[] => {
  return saudiCities.filter(city => city.economicSectors.includes(sector));
};