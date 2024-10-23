import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';
import { CompleteTestRequest, Test } from '../models/test.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private network: NetworkService) {}

  createTest(): Observable<Test> {
    return this.network.post('/api/test/createtest', {}) as Observable<Test>;
  }

  completeTest(completeTestRequest: CompleteTestRequest): Observable<Test> {
    return this.network.post('/api/test/completetest', completeTestRequest) as Observable<Test>;
  }

  getTests(): Observable<Test[]> {
    return this.network.get('/api/test') as Observable<Test[]>;
  }

}
