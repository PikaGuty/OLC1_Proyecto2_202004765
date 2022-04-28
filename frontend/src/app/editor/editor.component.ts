import { Component, OnInit, Input } from '@angular/core';
import * as FileSaver from 'file-saver';
import { BackendService } from '../services/backend.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  ruta = ""
  contenido=""
  consola = ""
  aux:any={
    cod:''
  }

  constructor(private backend: BackendService) { 
    //this.Ejecutar()
  }

  ngOnInit(): void {
  }

  Ejecutar(){
    let texto=this.contenido;
    //console.log(this.contenido)
    this.aux.cod=texto
    let resultado:any
    let js:any
    this.backend.Analizar(this.aux).subscribe(
      res=>{
        //alert("BIEN")
        js = JSON.parse(JSON.stringify(res)) 
        this.consola= js.Respuesta
        alert("Bien")
        console.log("has",js.Respuesta)
      },
      err=>{
        alert("Ocurrió un error")
      }
    )
    
    /*this.backend.VerRegistros().subscribe(
      res=>{
        var data = JSON.stringify(res)
        var data2 = JSON.parse(data)
        var longitud=data2.length
        this.consola=this.consola+""+data
      },
      err=>{
        console.log("Error")
      }
    )*/
  }
  
  abrir(event:any) {
    const file = event.target.files[0];
   
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      if(fileReader.result!=null){
        this.contenido=fileReader.result.toString()
      }
      
    }
    fileReader.readAsText(file)   
  }

  nuevo(){
    this.contenido=""
  }

  guardar(){
    var name=prompt("Ingrese el nombre con el que desea guardar el archivo cst","");
    var file = new File([this.contenido], name+".cst", {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file);
    alert(this.contenido)
  }

}

