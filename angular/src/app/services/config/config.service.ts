import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../data/config.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly config = environment.config;

  /**
   * Represents the _Config Service_ `constructor` method
   *
   * @param http HttpClient
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Represents the _Config Service_ `get` method
   */
  get(): Observable<Config> {
    return this.http.get<Config>(this.config);
  }
}
