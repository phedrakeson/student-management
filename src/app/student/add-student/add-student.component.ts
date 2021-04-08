import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/crud.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  public studentForm: FormGroup;

  constructor(
    public crudService: CrudService,
    public formBuilder: FormBuilder,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.crudService.getStudentsList();
    this.studenForm()
  }

  studenForm() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  get firstName() {
    return this.studentForm.get('firstName');
  }

  get lastName() {
    return this.studentForm.get('lastName');
  }

  get email() {
    return this.studentForm.get('email');
  }

  get mobileNumber() {
    return this.studentForm.get('mobileNumber');
  }

  resetForm() {
    this.studentForm.reset();
  }

  submitStudentData() {
    this.crudService.addStudent(this.studentForm.value);
    this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
    this.resetForm();
  }

}
