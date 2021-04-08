import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/crud.service';
import { Student } from 'src/app/shared/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  page: number = 1;
  Student: Student[];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(
    public crudService: CrudService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataState();
    let student = this.crudService.getStudentsList();
    student.snapshotChanges().subscribe(data => {
      this.Student = [];
      data.forEach(item => {
        let aux = item.payload.toJSON();
        aux['$key'] = item.key;
        this.Student.push(aux as Student);
      });
    });

  }

  dataState() {
    this.crudService.getStudentsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    });
  }

  deleteStudent(student) {
    if(window.confirm('Are you sure you want to delete this student?')) {
      this.crudService.deleteStudent(student.$key);
      this.toastr.success(student.firstName + ' successfully deleted!');
    }
  }

}
