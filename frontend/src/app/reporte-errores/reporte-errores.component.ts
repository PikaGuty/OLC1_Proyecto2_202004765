import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service'

@Component({
  selector: 'app-reporte-errores',
  templateUrl: './reporte-errores.component.html',
  styleUrls: ['./reporte-errores.component.css']
})
export class ReporteErroresComponent implements OnInit {
  errores:any
  constructor(private backend: BackendService) {
    this.mostrar()
   }

  ngOnInit(): void {
  }

  mostrar(){
    this.backend.TErrores().subscribe(
      res=>{
        var data = JSON.stringify(res)
        var data2 = JSON.parse(data)
        this.errores=data2.errores
      },
      err=>{
        console.log("Error")
      }
    )
  }

}
