import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-tabla-simbolos',
  templateUrl: './tabla-simbolos.component.html',
  styleUrls: ['./tabla-simbolos.component.css']
})
export class TablaSimbolosComponent implements OnInit {
  simbolos:any
  constructor(private backend: BackendService) { 
    this.mostrar()
  }

  ngOnInit(): void {
  }

  mostrar(){
    this.backend.Simbolos().subscribe(
      res=>{
        var data = JSON.stringify(res)
        var data2 = JSON.parse(data)
        this.simbolos=data2.simbolos
        
      },
      err=>{
        console.log("Error")
      }
    )
  }
}
