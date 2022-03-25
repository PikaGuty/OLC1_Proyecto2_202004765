import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraComponent } from './barra/barra.component';
import { EditorComponent } from './editor/editor.component';
import { ReporteErroresComponent } from './reporte-errores/reporte-errores.component';
import { ArbolAstComponent } from './arbol-ast/arbol-ast.component';
import { TablaSimbolosComponent } from './tabla-simbolos/tabla-simbolos.component';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { FootComponent } from './foot/foot.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraComponent,
    EditorComponent,
    ReporteErroresComponent,
    ArbolAstComponent,
    TablaSimbolosComponent,
    FootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MonacoEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
