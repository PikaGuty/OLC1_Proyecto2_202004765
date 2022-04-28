import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-arbol-ast',
  templateUrl: './arbol-ast.component.html',
  styleUrls: ['./arbol-ast.component.css']
})
export class ArbolAstComponent implements OnInit {
  mostrar=false;

  constructor(private backend: BackendService) { 
    this.mostrar=false;
    this.hacerArbol()
  }

  ngOnInit(): void {
  }

  hacerArbol(){
    this.backend.Ast().subscribe(
      res=>{
        var data = JSON.stringify(res)
        var data2 = JSON.parse(data)
        console.log(data)
        this.mostrar=true
      },
      err=>{
        this.mostrar=false
        console.log("Error")
      }
    )}
}
