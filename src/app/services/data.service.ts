import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource: BehaviorSubject<any> = new BehaviorSubject<any>(
    'initial value'
  );
  data: Observable<any> = this.dataSource.asObservable();

  sendData(data: any) {
    this.dataSource.next(data);
  }
}
