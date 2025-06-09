import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentdata } from './student.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  showadd!: boolean;
  showupdate!: boolean;
  studentmodelobj: studentdata = new studentdata();
  formValue!: FormGroup;
  allstudentdata: any;
  StudentData: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required]
    })
    this.getdata()
  }
  add() {
    this.showadd = true;
    this.showupdate = false;
  }
  edit(data: any) {
    this.showadd = false;
    this.showupdate = true;
    this.studentmodelobj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['city'].setValue(data.city)
  }
  // close() {
  // this.studentmodelobj;
  // }
  update() {
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;
    this.api.updatestudent(this.studentmodelobj, this.studentmodelobj.id).subscribe(res => {
      this.formValue.reset();
      this.getdata();
      alert("record updated")
    },
      err => {
      alert("something went wrong")
      })
  }
  addstudent() {
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;

    this.api.poststudent(this.allstudentdata)
      .subscribe(res => {
        console.log(res);
        alert("Record added sucessfully");
        this.formValue.reset();
      },
        (err: any) => {
          alert("something went wrong");
        })
  }
  getdata() {
    this.api.getstudent()
      .subscribe(res => {
        this.allstudentdata = res;
        console.log(res);
      })

  }
  deletestudent(data: any) {
    this.api.deletestudent(data.id, data.number)
      .subscribe(res => {
        alert("Record deleted sucessfully");
        this.getdata();
      })
  }

}
