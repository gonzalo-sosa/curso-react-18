const basicFetch = <T>(
  endpoint: string,
  // eslint-disable-next-line no-undef
  init?: RequestInit,
  errorMessage = '',
) =>
  fetch(endpoint, init).then((res) => {
    if (!res.ok) throw new Error(errorMessage);

    return res.json() as T;
  });

class HttpService<T> {
  constructor(public endpoint: string) {}

  getAll = () => {
    const controller = new AbortController();

    const response = basicFetch<T>(
      this.endpoint,
      {
        method: 'GET',
        signal: controller.signal,
      },
      `Failed to fetch ${this.endpoint}`,
    );

    return { response, cancel: () => controller.abort() };
  };

  create = <T extends { id: string | number }>(entity: T) => {
    return basicFetch<T>(
      this.endpoint,
      {
        method: 'POST',
        body: JSON.stringify(entity),
      },
      `Failed to create ${entity.id}`,
    );
  };

  delete = (id: string | number) => {
    return basicFetch(
      this.endpoint + `/${id}`,
      {
        method: 'DELETE',
      },
      `Failed to delete ${id}`,
    );
  };

  update = <T extends { id: string | number }>(entity: T) => {
    return basicFetch(
      this.endpoint + `/${entity.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(entity),
      },
      `Failed to update ${entity.id}`,
    );
  };
}

export const create = <T>(endpoint: string) => new HttpService<T>(endpoint);
