export function createResponse(statusCode: number, statusMessage: string) {
  return {
    statusCode,
    statusMessage,
  };
}