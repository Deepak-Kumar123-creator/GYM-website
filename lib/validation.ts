export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^[+()\d\s-]{8,20}$/;

export function validateContact(data: Record<string, string>) {
  const errors: Record<string, string> = {};
  if (!data.name?.trim()) errors.name = 'Name is required.';
  if (!emailPattern.test(data.email || '')) errors.email = 'Enter a valid email address.';
  if (!phonePattern.test(data.phone || '')) errors.phone = 'Enter a valid phone number.';
  if (!data.subject?.trim()) errors.subject = 'Subject is required.';
  if (!data.message?.trim()) errors.message = 'Message is required.';
  return errors;
}

export function validateLead(data: Record<string, string>, type: 'trial' | 'personal') {
  const errors: Record<string, string> = {};
  const required = ['name', 'phone', 'email', 'goal', 'date', 'time'];
  if (type === 'personal') required.push('experience', 'message');
  for (const key of required) {
    if (!data[key]?.trim()) errors[key] = 'This field is required.';
  }
  if (data.email && !emailPattern.test(data.email)) errors.email = 'Enter a valid email address.';
  if (data.phone && !phonePattern.test(data.phone)) errors.phone = 'Enter a valid phone number.';
  return errors;
}

export function validateClassBooking(data: Record<string, string>) {
  const errors: Record<string, string> = {};
  for (const key of ['name', 'phone', 'email', 'date']) {
    if (!data[key]?.trim()) errors[key] = 'This field is required.';
  }
  if (data.email && !emailPattern.test(data.email)) errors.email = 'Enter a valid email address.';
  if (data.phone && !phonePattern.test(data.phone)) errors.phone = 'Enter a valid phone number.';
  return errors;
}
