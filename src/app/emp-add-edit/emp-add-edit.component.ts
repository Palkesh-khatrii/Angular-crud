import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataShareService } from '../data-share.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})


export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup

  education: string[] = [
    "matric",
    "Post Graduation",
    "Graduation",
    "Diploma",
    "Intermediate"
  ]

  constructor(
    private _fb: FormBuilder,
    // private dataService: DataShareService,
    private _empService :EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private  _coreSercive : CoreService,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      company: '',
      education: '',
      experience: '',
      package: ''
    })
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }

  onSubmit() {
    // this.dataService.myBehaviorSubject.next(this.empForm.value);
    // this._dialog.closeAll()

    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next:(val :any) =>{
            // alert('Employee detail updated!')
            this._coreSercive.openSnackBar('Employee detail updated!')
            this._dialogRef.close(true)
          },
          error:(err:any) =>{
            console.error
          }
        })
      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next:(val :any) =>{
            // alert('Employee added sucessfully!')
            this._coreSercive.openSnackBar('Employee added sucessfully!')
            this._dialogRef.close(true)
          },
          error:(err:any) =>{
            console.error
          }
        })
      }
    }
  }
}
