import { Injectable } from '@angular/core';
import { Config, EditConfigRequest } from '../models/config.model';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private network: NetworkService) { }

  getConfig(): Observable<Config> {
    return this.network.get('/api/config') as Observable<Config>;
  }

  editConfig(editConfigRequest: EditConfigRequest) {
    return this.network.post('/api/config/edit', editConfigRequest) as Observable<Config>;
  }

}
