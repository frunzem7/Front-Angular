import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {MainPageDTO} from "../dtos/MainPageDTO";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  private port = "8443";
  private url = `http://localhost:${this.port}/api/service/customer`;

  constructor(
    private http: HttpClient
  ) {
  }

  save(mainPage: MainPageDTO): Observable<MainPageDTO> {
    return this.http.post<MainPageDTO>(`${this.url}/`, mainPage);
  }

  getById(id: number): Observable<MainPageDTO> {
    return this.http.get<MainPageDTO>(`${this.url}/${id}`);
  }
}
