export const siteConfig = {
  name: 'IRONFORGE FITNESS',
  tagline: 'Build Your Strongest Self',
  description: 'Premium strength, conditioning, classes and personal training in Mathura, Uttar Pradesh.',
  phone: '+91 99999 99999',
  whatsapp: '919999999999',
  email: 'hello@ironforge.fit',
  address: '24 Fitness Avenue',
  city: 'Mathura',
  state: 'Uttar Pradesh',
  postalCode: '281001',
  country: 'IN',
  website: 'https://ironforge.fit',
  coordinates: { latitude: 27.4924, longitude: 77.6737 },
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=27.4924,77.6737',
  mapEmbedUrl: 'https://www.google.com/maps?q=27.4924,77.6737&z=15&output=embed',
  openingHours: [
    { days: 'Monday–Saturday', hours: '5:00 AM – 11:00 PM', opens: '05:00', closes: '23:00' },
    { days: 'Sunday', hours: '6:00 AM – 10:00 PM', opens: '06:00', closes: '22:00' },
  ],
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },
};

export const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`;
export const emailHref = `mailto:${siteConfig.email}`;

export const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hi, I'm interested in joining the gym. I'd like to know more about memberships and the free trial.")}`;
