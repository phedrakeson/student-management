import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';
import { StudentListComponent } from './student/student-list/student-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/register-student', pathMatch: 'full' },
  { path: 'register-student', component: AddStudentComponent }, 
  { path: 'view-students', component: StudentListComponent }, 
  { path: 'edit-student/:id', component: EditStudentComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
