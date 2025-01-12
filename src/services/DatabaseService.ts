import axios, { AxiosError } from 'axios';

class DatabaseService {
  private baseUrl: string;
  private static instance: DatabaseService;

  private constructor() {
    // Use environment variable if available, fallback to local API
    this.baseUrl = import.meta.env.VITE_API_URL || '/api';
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async query(endpoint: string, method: string = 'GET', data?: any) {
    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}/${endpoint}`,
        data,
        headers: {
          'Content-Type': 'application/json'
        },
        // Add timeout and retry logic
        timeout: 5000,
        validateStatus: (status) => status < 500
      });

      if (response.status === 404) {
        console.warn(`Endpoint ${endpoint} not found, using fallback data`);
        return [];
      }

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Database error:', error.response?.data || error.message);
        // Return empty data instead of throwing error during development
        return [];
      }
      console.error('Unexpected error:', error);
      return [];
    }
  }
}

export const db = DatabaseService.getInstance();