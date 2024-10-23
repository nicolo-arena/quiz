import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';
import { Paniere } from '../models/paniere.model';

@Injectable({
  providedIn: 'root'
})
export class PaniereService {

  constructor(private network: NetworkService) {}

  public getPanieri(): Observable<Paniere[]> {
    return this.network.get('/api/paniere') as Observable<Paniere[]>;
  }

}
