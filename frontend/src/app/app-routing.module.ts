import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArbolAstComponent } from './arbol-ast/arbol-ast.component';
import { EditorComponent } from './editor/editor.component';
import { ReporteErroresComponent } from './reporte-errores/reporte-errores.component';
import { TablaSimbolosComponent } from './tabla-simbolos/tabla-simbolos.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/editor',
    pathMatch:'full'
  },
  {
    path:'editor',
    component: EditorComponent
  },
  {
    path:'AST',
    component: ArbolAstComponent
  },
  {
    path:'errores',
    component: ReporteErroresComponent
  },
  {
    path:'simbolos',
    component: TablaSimbolosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
