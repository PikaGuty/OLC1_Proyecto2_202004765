import { Component, OnInit, Input } from '@angular/core';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  ruta = ""
  contenido:any
  consola = ""

  constructor() { }

  ngOnInit(): void {
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
  
    alert(this.contenido)
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

