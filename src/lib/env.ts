export function getEmailJsConfig() {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();

  return {
    serviceId,
    templateId,
    publicKey,
    isConfigured: Boolean(serviceId && templateId && publicKey),
  };
}
