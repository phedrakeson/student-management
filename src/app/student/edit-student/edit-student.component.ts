import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/crud.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  editForm: FormGroup;
  
  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){ }

  ngOnInit() {
    this.updateStudentData();
    const id = this.route.snapshot.paramMap.get('id');
    this.crudService.getStudent(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)
    })
  }

  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  get email() {
    return this.editForm.get('email');
  }

  get mobileNumber() {
    return this.editForm.get('mobileNumber');
  }  

  updateStudentData() {
    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  goBack() {
    this.location.back();
  }

  updateForm(){
    this.crudService.updateStudent(this.editForm.value);
    this.toastr.success(this.editForm.controls['firstName'].value + ' updated successfully');
    this.router.navigate(['view-students']);
  }
}
