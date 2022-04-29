import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }
  
  URL:string = 'http://127.0.0.1:4000';

  //VerRegistros(){
    //return this.http.get(`${this.URL}/ver`)
  //}

  Analizar(cuerpo:any){
    //console.log(cuerpo)
    return this.http.post(`${this.URL}/analizar`, cuerpo)
  }

  Ast(){
    //console.log(cuerpo)
    return this.http.get(`${this.URL}/ast`)
  }

  Simbolos(){
    //console.log(cuerpo)
    return this.http.get(`${this.URL}/tsim`)
  }

  TErrores(){
    //console.log(cuerpo)
    return this.http.get(`${this.URL}/err`)
  }
  
}
