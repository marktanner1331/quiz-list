import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) {

  }

  get(category: string, subCategory:string, name: string): Observable<List> {
    return this.httpClient.get<object[]>(`./assets/lists/${category}/${subCategory}/${name}.json`)
      .pipe(map(x => new List(x)));
  }

  listCategories(): Observable<string[]> {
    return this.httpClient.get<Object>('./assets/lists/manifest.json')
      .pipe(map(x => Object.keys(x)));
  }

  listSubCategories(category: string): Observable<string[]> {
    return this.httpClient.get<Object>('./assets/lists/manifest.json')
      .pipe(map(x =>  Object.keys((x as any)[category])));
  }

  listListNames(category: string, subCategory:string): Observable<string[]> {
    return this.httpClient.get<Object>('./assets/lists/manifest.json')
      .pipe(map(x => (x as any)[category][subCategory]));
  }
}
