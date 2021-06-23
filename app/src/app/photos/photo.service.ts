import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../photos/photo';
import { HttpClient } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) {}

  async upload(fb: FormData) {
    return await this.http.post('http://localhost:3000/api/photo/upload', fb).toPromise().then((data:any) => {
      return data;
    });
  }

  async delete(id: string){
    return await this.http.delete('http://localhost:3000/api/photo/delete/'+ id).toPromise().then((data:any) => {});
  }

  async getByUser(userId: string) {
    return await this.http.get('http://localhost:3000/api/photo/user/' + userId).toPromise().then((data:any) => {
    return data;
    })
  }
}

export default PhotoService;
