import { AxiosError, isAxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import testClient from './httpStub';

describe('axios independence method test', () => {
  let http: typeof testClient;
  let mock: MockAdapter;

  const body = { data: 'test' } as const;
  const errorBody = { message: 'server-error' };

  const getError = async <TError>(
    method: keyof typeof http.test,
    url: string
  ): Promise<AxiosError<TError> | undefined> => {
    try {
      switch (method) {
        case 'get': {
          await http.test.get<null>(url);
          break;
        }
        case 'post': {
          await http.test.post<null>(url);
          break;
        }
        case 'put': {
          await http.test.put<null>(url);
          break;
        }
      }

      return undefined;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return error;
      }

      return undefined;
    }
  };

  beforeAll(() => {
    http = testClient;
    mock = new MockAdapter(http.test.getTestInstance());
  });

  afterAll(() => {
    mock.reset();
  });

  it('method get success test', async () => {
    mock.onGet('/test').reply((config) => {
      return [200, body, config.headers];
    });

    const response = await http.test.get<typeof body>('/test');

    expect(response).toMatchObject(body);
  });

  it('method get error test', async () => {
    mock.onGet('/test-error').reply(() => {
      return [500, errorBody];
    });

    const error = await getError<AxiosError<typeof errorBody>>('get', '/test-error');

    expect(error!.response!.data).toMatchObject(errorBody);
  });

  it('method post test', async () => {
    mock.onPost('/test', body).reply(({ data }) => {
      return [200, data];
    });

    const response = await http.test.post<null, typeof body>('/test', body);

    expect(response).toMatchObject(body);
  });

  it('method post error test', async () => {
    mock.onPost('/test-error').reply(() => {
      return [500, errorBody];
    });

    const error = await getError<AxiosError<typeof errorBody>>('post', '/test-error');

    expect(error!.response!.data).toMatchObject(errorBody);
  });

  it('method put test', async () => {
    mock.onPut('/test', body).reply(({ data }) => {
      return [200, data];
    });

    const response = await http.test.put<null, typeof body>('/test', body);

    expect(response).toMatchObject(body);
  });

  it('method put error test', async () => {
    mock.onPut('/test-error').reply(() => {
      return [500, errorBody];
    });

    const error = await getError<AxiosError<typeof errorBody>>('put', '/test-error');

    expect(error!.response!.data).toMatchObject(errorBody);
  });
});
