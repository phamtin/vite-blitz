import type { AppError } from "./api";

export const handleApiError = async (response: AppError) => {
  switch (response.status) {
    case 400:
      return `Bad Request: ${response.message}`;

    case 401:
      return `Unauthorized: ${response.message}`;
    case 403:
      return `Forbidden: ${response.message}`;
    case 404:
      return `Not Found: ${response.message}`;
    case 429:
      return `Too Many Requests: ${response.message}`;
    case 500:
      return `Internal Server Error: ${response.message}`;
    case 502:
      return `Bad Gateway: ${response.message}`;
    case 503:
      return `Service Unavailable: ${response.message}`;
    default:
      return `Unknown Error: ${response.message}`;
  }
};
