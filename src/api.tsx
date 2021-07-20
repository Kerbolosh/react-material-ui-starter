import { createContext, useContext } from "react";

export class RequestError extends Error {
  response: Response;

  constructor(response: Response) {
    super(`Request failed with ${response.status} ${response.statusText}`);
    this.response = response;
  }
}

export type TAPI = {
  fetch: (
    endpoint: string,
    options: Parameters<typeof globalThis.fetch>[1]
  ) => ReturnType<typeof globalThis.fetch>;
};

export function createAPI(accessToken: string | null): TAPI {
  return {
    fetch: async (endpoint, options) => {
      const response = await globalThis.fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}`,
        {
          ...options,
          headers: {
            ...options?.headers,
            ...(accessToken
              ? {
                  Authorization: `Bearer ${accessToken}`,
                }
              : {}),
          },
        }
      );

      if (response.status >= 300) {
        throw new RequestError(response);
      }

      return response;
    },
  };
}

const apiContext = createContext<TAPI | null>(null);

export const APIProvider = apiContext.Provider;

export function useAPI(): TAPI {
  const api = useContext(apiContext);

  if (!api) {
    throw new Error("Expected api from provider");
  }

  return api;
}
