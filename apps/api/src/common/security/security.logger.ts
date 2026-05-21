export function logSecurityEvent(
  event: string,
  metadata?: Record<string, unknown>,
) {
  console.log(
    JSON.stringify({
      type: 'SECURITY_EVENT',

      event,

      metadata,

      timestamp: new Date().toISOString(),
    }),
  );
}
