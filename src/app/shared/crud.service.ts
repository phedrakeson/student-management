import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private studentsRef: AngularFireList<any>;
  private studentRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {  }
  
  public addStudent(student: Student) {
    this.studentsRef.push({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    });
  }

  public getStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    return this.studentRef;
  }

  public getStudentsList() {
    this.studentsRef = this.db.list('students-list');
    return this.studentsRef;
  }

  public updateStudent(student: Student) {
    this.studentRef.update({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    });
  }

  public deleteStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    this.studentRef.remove();
  }

}
