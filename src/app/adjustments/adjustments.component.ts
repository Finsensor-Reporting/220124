import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule, FormsModule,Validators } from '@angular/forms';
import { compService } from '../services/company-details.services';

@Component({
  selector: 'app-adjustments',
  templateUrl: './adjustments.component.html',
  styleUrls: ['./adjustments.component.scss']
})
export class AdjustmentsComponent {
  signatoryForm!:FormGroup
  dateString:any
  unitData: any;
  uniqueGlcodes: any;
  constructor(private fb: FormBuilder, private companyService: compService) {}
  ngOnInit(){
    this.signatoryForm = this.fb.group({
      // Your initial form controls go here
      // ...
      adjustmentControls: this.fb.array([]),
    });
    this.dateString = sessionStorage.getItem("datestring")
    this.unitData = JSON.parse(sessionStorage.getItem("company_details"))
    this.unitData = [...new Set(
      this.unitData.subsidiary_details.flatMap(subsidiary => 
        subsidiary.nestedNestedForms.map(form => form.unitName)
      )
    )];
    console.log("🚀 ~ file: adjustments.component.ts:29 ~ AdjustmentsComponent ~ ngOnInit ~ this.unitData:", this.unitData)
    this.uniqueGlcodes = JSON.parse(sessionStorage.getItem("uniqueGlCodes"))
  }
  get adjustmentControls() {
    return this.signatoryForm.get('adjustmentControls') as FormArray;
  }
  signatoryFormControls(){
    const newControl = this.fb.group({
      period: [this.dateString.split(' ')[2], Validators.required],
      unit_code:['', Validators.required],
      adjustmentType: ['', Validators.required],
      gl_code: ['', Validators.required],
      gl_description: ['', Validators.required],
      coc_name: ['', Validators.required],
      adjusted_amt: ['', Validators.required],
      narration: ['', Validators.required],
    });
    this.adjustmentControls.push(newControl);
    console.log("🚀 ~ file: company-details.component.ts:58 ~ CompanyDetailsComponent ~ addauditorsFormControl ~ auditorControls:", this.adjustmentControls)
  }
  async submitsignatoryForm(){

    let auditorDetails = this.signatoryForm.value
    let params = {
      auditor_details:auditorDetails,
      uuid:sessionStorage.getItem("uuid")
    }
    
    this.companyService.submit_signatory_data(params)
      .subscribe(response => {
        if(response.status == "success"){
          alert("successfully inserted adjustment details")
          // window.location.reload()
        }else{
          alert("failed to insert data please try again.")
        }
      })
  }
  updateGlDescription(event: any,i:any): void {
    const selectedGlCode = event.target.value;
    const selectedGlDescription = this.uniqueGlcodes.find(code => code['Gl Code'] === parseFloat(selectedGlCode))?.['Gl Description'];

    // Update the corresponding GL description in the form
    this.signatoryForm.controls['adjustmentControls']['controls'][i].controls['gl_description'].setValue(selectedGlDescription);
  }
}
