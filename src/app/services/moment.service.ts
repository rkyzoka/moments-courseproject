import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IResponse } from '../IResponse';
import { IMoment } from '../IMoment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseUrl = environment.baseApiUrl;
  private momentsUrl = `${this.baseUrl}api/moments`;

  constructor(private http: HttpClient) {}

  getMoments(): Observable<IResponse<IMoment[]>> {
    return this.http.get<IResponse<IMoment[]>>(this.momentsUrl);
  }

  getMoment(id: Number): Observable<IResponse<IMoment>> {
    const url = `${this.momentsUrl}/${id}`;
    return this.http.get<IResponse<IMoment>>(url);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.momentsUrl, formData);
  }

  deleteMoment(id: Number) {
    const url = `${this.momentsUrl}/${id}`;
    return this.http.delete(url);
  }
}
