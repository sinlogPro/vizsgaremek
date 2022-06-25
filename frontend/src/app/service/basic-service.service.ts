import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BasicService<T extends { _id?: string | number; [key: string]: any }
> {
  apiUrl: string = environment.apiUrl;
  // entityName: string = '';
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(
    private http: HttpClient,
    @Inject(String) private entityName: string,
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.entityName}`);
  }

  getOne(_id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.entityName}/${_id}`);
  }

  create(entity: T): Observable<T> {
    const newEntity = { ...entity, _id: null };
    return this.http.post<T>(`${this.apiUrl}${this.entityName}`, newEntity);
  }

  update(entity: T): Observable<T> {
    const id = entity._id;
    delete entity._id;
    return this.http.patch<T>(
      `${this.apiUrl}${this.entityName}/${id}`,
      entity
    );
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${this.entityName}/${entity._id}`);
  }

  search(queryString: string): Observable<T[]> {
    console.log(`${this.apiUrl}${this.entityName}/search?${queryString}`);
    return this.http.get<T[]>(`${this.apiUrl}${this.entityName}/search?${queryString}`);
  }

}
