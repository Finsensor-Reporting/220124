import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule, FormsModule,Validators } from '@angular/forms';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { compService } from '../services/company-details.services';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})

export class CompanyDetailsComponent {
  unitname: string = '';
  unitcode: string = '';
  subsideariename: string = '';
  subsidearicode: string = '';
  textInput: string = '';
  dynamicForm!: FormGroup;
  auditorsForm!:FormGroup
  signatoryForm!:FormGroup
  subdynamicForm!:FormGroup
  mainForm!:FormGroup
  name_plate:boolean = false
  formindex:number = 0
  child:any=false
  inputData1:any
  inputData2:any
  companyForm: FormGroup;
  // item : any[]
  // subitems:any[] = ['Item 1'];
  items: any[]= [[]];
  fetchedData: any;
  myForm: FormGroup;
  // fetchedData: any;
  dynamicFields: string[] = ['inputData1', 'inputData2'];
  // form!:FormGroup
  // addMoreSubforms(form: FormGroup, numSubforms: number) {
  //   this.addSubforms(form, numSubforms);
  // }
  inputFields: { id: string, value: string }[] = [
    { id: 'inputField1', value: '' },
    { id: 'inputField2', value: '' },
    // Add more inputs as needed
  ];
  @ViewChildren('inputRef') inputRefs!: QueryList<ElementRef>;
  unitData: any;
  subsidearieCode: any;
  savebutton: any = []
  editbutton: any = []
  editbutton1: any = []
  savebutton1:any = []
  constructor(private fb: FormBuilder, private companyService: compService) {}
  // constructor(private modalService: NgbModal) {
  // }

  
  // public open(modal: any): void {
  //   this.modalService.open(modal);
  // }
  ngOnInit() {
    this.initForm();
    this.mainForm = this.fb.group({
      nestedForms: this.fb.array([])
    });
    this.addNestedForm();
    this.addNestedForm();
    // this.addauditorsFormControl()
    // const formControls: { [key: string]: any } = {};
    // this.dynamicFields.forEach((field) => {
    //   formControls[field] = ['', Validators.required];
    // });

    // this.myForm = this.fb.group(formControls);

    // this.myForm = this.fb.group(formControls);
    this.dynamicForm = this.fb.group({
      // Your initial form controls go here
      // ...
      dynamicControls: this.fb.array([]),
      nestedForms: this.fb.array([])
    });
    this.mainForm = this.fb.group({
      // Your initial form controls go here
      // ...
      nestedForms: this.fb.array([])
      // nestedForms: this.fb.array([])
    });
    this.subdynamicForm = this.fb.group({
      // Your initial form controls go here
      // ...
      subdynamicControls: this.fb.array([]),
    });
    this.auditorsForm = this.fb.group({
      // Your initial form controls go here
      // ...
      auditorControls: this.fb.array([]),
    });
    this.signatoryForm = this.fb.group({
      // Your initial form controls go here
      // ...
      signatoryControls: this.fb.array([]),
    });
    
    // const formControls = {};
    // this.dynamicFields.forEach((field) => {
      // formControls[field] = ['', Validators.required];
    // });
// 
    // this.myForm = this.fb.group(formControls);
  
  }
  initForm() {
    // Define the structure of your form using FormBuilder
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      companyIndustry: ['', Validators.required],
      companyCode: [''],
      registeredOffice: [''],
      // items: this.fb.array([]), // Initialize as an empty array
      // ... add other form controls as needed
    });
  }
  get itemsFormArray() {
    return this.companyForm.get('items') as FormArray;
  }
  get dynamicControls() {
    return this.dynamicForm.get('dynamicControls') as FormArray;
  }
  get auditorControls() {
    return this.auditorsForm.get('auditorControls') as FormArray;
  }
  get signatoryControls() {
    return this.signatoryForm.get('signatoryControls') as FormArray;
  }
  get subdynamicControls() {
    return this.subdynamicForm.get('subdynamicControls') as FormArray;
  }
  get nestedForms() {
    return this.mainForm.get('nestedForms') as FormArray;
  }
  get forms() {
    return this.mainForm.get('forms') as FormArray;
  }
  get form(){
    return this.form.get('subforms') as FormArray;
  }
  
  // getSubforms(form: FormGroup): FormArray {
  //   return this.form.get('subforms') as FormArray;
  // }
  addFormWithInitialSubforms() {
    this.addForm();
  }
  
  addMoreSubformsToForm(form: FormGroup, numSubforms: number) {
    this.addMoreSubforms(form, numSubforms);
  }
  addDynamicControl() {
    const newControl = this.fb.control('');
    this.dynamicControls.push(newControl);
    // this.formindex = this.formindex+1
    console.log("🚀 ~ file: company-details.component.ts:35 ~ CompanyDetailsComponent ~ addDynamicControl ~ dynamicControls:", )
    // this.name_plate = true
  }
  removeDynamicControl(index:number) {
    const newControl = this.fb.control('');
    console.log("🚀 ~ file: company-details.component.ts:43 ~ CompanyDetailsComponent ~ removeDynamicControl ~ formindex:", this.formindex)
    this.dynamicControls.removeAt(index);
    this.name_plate = true
  }
  addsubDynamicControl() {
    // const newControl = this.fb.control('');
    // this.subdynamicControls.push(newControl);
    this.child = true
    console.log("🚀 ~ file: company-details.component.ts:78 ~ CompanyDetailsComponent ~ addsubDynamicControl ~ child:", this.child)
    this.addDynamicControl()
    // this.child = false
    // console.log("🚀 ~ file: company-details.component.ts:35 ~ CompanyDetailsComponent ~ addDynamicControl ~ dynamicControls:" )
  }
  removesubDynamicControl(index:number) {
    const newControl = this.fb.control('');
    console.log("🚀 ~ file: company-details.component.ts:43 ~ CompanyDetailsComponent ~ removeDynamicControl ~ formindex:")
    this.subdynamicControls.removeAt(index);
  }
  addauditorsFormControl(){
    const newControl = this.fb.group({
      firmName:['', Validators.required],
      firm_regd_no: ['', Validators.required],
      partner_name: ['', Validators.required],
      subsidearieCode: ['', Validators.required],
      partners_membership_no: ['', Validators.required],
      designation_of_auditors: ['', Validators.required],
      place_of_auditor_signature: ['', Validators.required],
      dateOfSignature: ['', Validators.required],
    });
    this.auditorControls.push(newControl);
    this.savebutton.push(true)
    this.editbutton.push(false)
    console.log("🚀 ~ file: company-details.component.ts:58 ~ CompanyDetailsComponent ~ addauditorsFormControl ~ auditorControls:", this.auditorControls);
  }
  signatoryFormControls(){
    const newControl = this.fb.group({
      signatory_name:['', Validators.required],
      Signatory_designation:['', Validators.required],
      memberShip_no:['', Validators.required],
      subsidearie_code:['', Validators.required],
      plase_of_signature: ['', Validators.required],
      date_of_signature: ['', Validators.required],
    });
    this.signatoryControls.push(newControl);
    this.savebutton1.push(true)
    this.editbutton1.push(false)
    console.log("🚀 ~ file: company-details.component.ts:58 ~ CompanyDetailsComponent ~ addauditorsFormControl ~ auditorControls:", this.signatoryControls)
  }
  addNestedForm() {
    const nestedForm = this.fb.group({
      subsidearieName:['', Validators.required],
      subsidearieCode: ['', Validators.required],
      nestedNestedForms: this.fb.array([])
      // nestedNestedForms1: this.fb.array([]),
      // nestedNestedForms2: this.fb.array([])
    });
  
    // Initially, you might want to add a few nested nested forms
    // this.addNestedNestedForm(nestedForm);
    // this.addNestedNestedForm(nestedForm);
  
    this.nestedForms.push(nestedForm);
  }
  // removeauditorsFormControl(){

  addForm(numSubforms: number = 2) {
    const form = this.fb.group({
      // Your main form controls here
      mainName: [''],
      mainAge: [''],
      subforms: this.fb.array([]), // Subforms FormArray
    });
  
    this.addSubforms(form, numSubforms);
  
    this.forms.push(form);
  }
  
  addSubforms(form: FormGroup, numSubforms: number) {
    const subformsArray = form.get('subforms') as FormArray;
  
    for (let i = 0; i < numSubforms; i++) {
      const subform = this.fb.group({
        // Your subform controls here
        subName: [''],
        subAge: [''],
      });
  
      subformsArray.push(subform);
    }
  }
  
  addMoreSubforms(form: FormGroup, numSubforms: number) {
    this.addSubforms(form, numSubforms);
  }
  addItem() {
    const newItem = [];
    this.items.push(newItem);
  }
  addSubItem(index:number){
    // console.log(this.items.length);
    // console.log(this.items[0])
    const newdata = `Item ${this.items.length + 1}`;
    (this.items[index]).push(newdata)
    
  }
  removeSubItem(index1: number, index2:number) {
    this.items[index1].splice(index2, 1);
  }
  removeItem(index: number) {
    this.items.splice(index, 1);
  }
  // }
  // submitForm() {
  //   console.log(this.dynamicForm.value);
  // }
  // submitCompanyDetails(){
  //   const allValues = this.myForm.value;
  //   console.log('All Form Values:', allValues);
  //   // this.fetchedData = this.myForm.value;
    
  //   // console.log("🚀 ~ file: company-details.component.ts:200 ~ CompanyDetailsComponent ~ submitCompanyDetails ~ fetchedData:", this.fetchedData)
  // }
  @ViewChildren('textInput') textInputs: QueryList<ElementRef>;
  async fetchData() {
    // You can use this.textInput, this.checkboxInput, this.radioInput, this.selectInput here as needed
    const formData = this.companyForm.value;

    // Log the form data to the console (you can modify this part)
    console.log('Form Data:', formData);
    return formData
    // console.log('Checkbox Input Checked:', this.checkboxInput);
    // console.log('Radio Input Value:', this.radioInput);
    // console.log('Select Input Value:', this.selectInput);
  }
  addItem1() {
    // const newItem = [];
    // this.items.push(newItem);
    this.itemsFormArray.push(this.createItem());
  }

  removeItem1(index: number) {
    this.itemsFormArray.removeAt(index);
  }

  createItem(): FormGroup {
    return this.fb.group({
      subsidiaryName: [''],
      subsidiaryCode: [''],
      // ... add other form controls as needed
    });
  }
  
  removeNestedForm(index: number) {
    this.nestedForms.removeAt(index);
  }
  // onSubmit() {
  //   // Handle form submission
  //   console.log('Main Form Submitted:', this.mainForm.value);
  // }
  getNestedNestedForms(index: number) {
    return (this.nestedForms.at(index).get('nestedNestedForms') as FormArray);
  }
  addNestedNestedForm(parentForm: any) {
    const nestedNestedForms = parentForm.get('nestedNestedForms') as FormArray;
  
    const nestedNestedForm = this.fb.group({
      unitName:['', Validators.required],
      unitCode: ['', Validators.required],
      unitCurrency: ['', Validators.required]
    });
  
    nestedNestedForms.push(nestedNestedForm);
  }
  removeNestedNestedForm(parentIndex: number, childIndex: number) {
    const nestedNestedForms = this.getNestedNestedForms(parentIndex);
    nestedNestedForms.removeAt(childIndex);
  }

  async submitCompanyDetails() {
    let company_details = await this.fetchData()
    console.log("🚀 ~ file: company-details.component.ts:321 ~ CompanyDetailsComponent ~ onSubmit ~ company_details:", company_details)
    // Handle form submission
    console.log('Main Form Submitted:', this.mainForm.value);
    let subsidiaryDetails = this.mainForm.value
    let params = {
      company_details:company_details,
      subsidiary_details:subsidiaryDetails.nestedForms
    }
    sessionStorage.setItem("company_details",JSON.stringify(params))
    this.unitData = JSON.parse(sessionStorage.getItem("company_details"))
    this.subsidearieCode = [...new Set(
      this.unitData.subsidiary_details.flatMap(form => form.subsidearieCode)
      )
    ];
    console.log("🚀 ~ file: company-details.component.ts:357 ~ CompanyDetailsComponent ~ submitCompanyDetails ~ this.subsidearieCode:", this.subsidearieCode)
    this.unitData = [...new Set(
      this.unitData.subsidiary_details.flatMap(subsidiary => 
        subsidiary.nestedNestedForms.map(form => form.unitName)
      )
    )];
    this.companyService.submit_data(params)
      .subscribe(response => {
        if(response.status == "success"){
          sessionStorage.setItem("uuid",response.uuid)
          alert("successfully inserted company details")
          // window.location.reload()
        }else{
          alert("failed to insert data please try again.")
        }
      })

  }
  async submitauditorForm(index:number){
    this.savebutton[index] = false
    this.editbutton[index] = true
    // let company_details = await this.fetchData()
    // console.log("🚀 ~ file: company-details.component.ts:321 ~ CompanyDetailsComponent ~ onSubmit ~ company_details:", company_details)
    // Handle form submission
    // console.log('Main Form Submitted:', this.mainForm.value);
    let auditorDetails = this.auditorsForm.value
    this.disableForm(index,"au")
    console.log("🚀 ~ file: company-details.component.ts:359 ~ CompanyDetailsComponent ~ submitauditorForm ~ auditorDetails:", auditorDetails)
    let params = {
      uuid:sessionStorage.getItem("uuid"),
      auditor_details:auditorDetails
    }
    if(params.uuid != null || params.uuid != ""){
    this.companyService.submit_auditor_data(params)
      .subscribe(response => {
        if(response.status == "success"){
          // console.log("asdf",)
          alert("successfully inserted auditors details")
          // window.location.reload()
        }else{
          alert("failed to insert data please try again.")
        }
      })}else alert("please submit company details first")
  }

  async submitsignatoryForm(index:number){
    this.savebutton1[index] = false
    this.editbutton1[index] = true
    // let company_details = await this.fetchData()
    // console.log("🚀 ~ file: company-details.component.ts:321 ~ CompanyDetailsComponent ~ onSubmit ~ company_details:", company_details)
    // Handle form submission
    // console.log('Main Form Submitted:', this.mainForm.value);
    let auditorDetails = this.signatoryForm.value
    this.disableForm(index,'si')
    let params = {
      uuid:sessionStorage.getItem("uuid"),
      auditor_details:auditorDetails
    }
    
    this.companyService.submit_signatory_data(params)
      .subscribe(response => {
        if(response.status == "success"){
          alert("successfully inserted signatory details")
          // window.location.reload()
        }else{
          alert("failed to insert data please try again.")
        }
      })
  }
  disableForm(i:number,from:string) {
    // Object.keys(this.auditorsForm.controls).forEach(controlName => {
    //   this.auditorsForm.get(controlName).disable();
    // });
    let controls
    if(from == "au")
    controls = this.auditorsForm.controls;
  else
  controls= this.signatoryForm.controls
  
  // Loop through the controls and disable only for the specified index
  Object.keys(controls).forEach(controlName => {
    const control = controls[controlName];

    if (control instanceof FormGroup) {
      // If the control is a FormGroup, disable controls within it
      this.disableControlsAtIndex(control, i);
    } else {
      // Disable the control for the specified index
      if (Array.isArray(control.value) && control.value[i] !== undefined) {
        control.get(i.toString()).disable();
      }
    }
  });
  }
  private disableControlsAtIndex(formGroup: FormGroup, index: number) {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
  
      if (Array.isArray(control.value) && control.value[index] !== undefined) {
        control.get(index.toString()).disable();
      }
    });
  }
  enableForm(index: number, from:string) {
    let controls
    if(from == "au")
    controls = this.auditorsForm.controls;
  else
  controls= this.signatoryForm.controls
    
    // Loop through the controls and enable only for the specified index
    Object.keys(controls).forEach(controlName => {
      const control = controls[controlName];
  
      if (control instanceof FormGroup) {
        // If the control is a FormGroup, enable controls within it
        this.enableControlsAtIndex(control, index);
      } else {
        // Enable the control for the specified index
        if (Array.isArray(control.value) && control.value[index] !== undefined) {
          control.get(index.toString()).enable();
        }
      }
    });
  }
  
  // Helper function to enable controls within a FormGroup at a specific index
  private enableControlsAtIndex(formGroup: FormGroup, index: number) {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
  
      if (Array.isArray(control.value) && control.value[index] !== undefined) {
        control.get(index.toString()).enable();
      }
    });
  }
  disableForm1() {
    Object.keys(this.signatoryForm.controls).forEach(controlName => {
      this.signatoryForm.get(controlName).disable();
    });
  }
  async toggle(index:number){
    this.enableForm(index,'au')
    console.log("this.savebutton",this.savebutton);

    this.savebutton[index] = true
    this.editbutton[index] = false
  }
  async toggle1(index:number){
    this.enableForm(index,'si')
    this.savebutton1[index] = true
    this.editbutton1[index] = false
  }
  async detoggle(index:number){
    this.auditorControls.removeAt(index);
    this.savebutton.splice(index,1)
    this.editbutton.splice(index,1)
  }
  async detoggle1(index:number){
    this.signatoryControls.removeAt(index);
    this.savebutton1.splice(index,1)
    this.editbutton1.splice(index,1)
  }
}
