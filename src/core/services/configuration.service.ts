import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  getConfiguration(): Configuration {
    return JSON.parse(localStorage.getItem('configuration') ?? '{}');
  }

  saveConfiguration(configuration: Configuration) {
    localStorage.setItem('configuration', JSON.stringify(configuration));
  }

}
