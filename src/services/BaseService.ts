import AsyncStorageLib from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface ICredentials {
  URL: string;
}

export class BaseService {
  protected _credentials?: ICredentials;
  protected _prerfix: string = '';

  public setCredentials(credentials: ICredentials): void {
    this._credentials = credentials;
  }

  protected getCurrentUrl(path: string): string {
    if (this.credentials) {
      return `${this.credentials.URL}${this.prefix}${path}`;
    }

    return `${this.prefix}${path}`;
  }

  protected get credentials() {
    return this._credentials;
  }

  protected async getHeaders() {
    const token = await AsyncStorageLib.getItem('access');

    if (token) {
      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    }

    return {
      headers: {},
    };
  }

  public set prefix(prefix: string | undefined) {
    this._prerfix = prefix || '';
  }

  public get prefix(): string | undefined {
    return this._prerfix;
  }

  public async get<T>(route: string) {
    const url: string = this.getCurrentUrl(route);

    const headers = await this.getHeaders();
    const result = await axios.get<T>(url, headers);
    return result;
  }

  public async post(route: string, data: any, customHeaders = {}) {
    const url: string = this.getCurrentUrl(route);
    const headers = await this.getHeaders();

    const result = await axios.post(url, data, {
      headers: { ...headers.headers, ...customHeaders },
    });

    return result;
  }

  public async put(route: string, data: any) {
    const url: string = this.getCurrentUrl(route);
    const headers = await this.getHeaders();
    const result = await axios.put(url, data, headers);

    return result;
  }

  public async patch(route: string, data: any) {
    const url: string = this.getCurrentUrl(route);
    const headers = await this.getHeaders();
    const result = await axios.patch(url, data, headers);

    return result;
  }

  public async remove(route: string) {
    const url: string = this.getCurrentUrl(route);
    const headers = await this.getHeaders();
    const result = await axios.delete(url, headers);

    return result;
  }
}
