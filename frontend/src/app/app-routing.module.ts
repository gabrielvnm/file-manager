import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FilesComponent } from './files/files.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'files', component: FilesComponent },
  { path: 'upload', component: UploadComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }