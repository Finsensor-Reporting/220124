import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { compService } from '../services/company-details.services';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { saveAs } from 'file-saver';
type ExcelDataRow = [
  string,
  number,
  string,
  number,
  string,
  number?,
  string?,
  string?
];

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.scss']
})
export class ChartOfAccountsComponent {
  signatoryForm!:FormGroup
  fetchedData:any
  inputData1: any;
  selectedFile: any;
  pdfUrl: any;
  displayData:any= [];
  displayeddata: any;
  Object: any;
  key:any
  dataForm: FormGroup;
  loadData: any;
  formControls: { label: string; control: FormControl }[] = [];
  visibleFormControls: { label: string; control: FormControl }[] = [];
  visibleFormControls1: { label: string; control: FormControl }[] = [];
  count:any;
  options:any=[]
  selectedValues: string[] = [];
  dataLength: number;
  save: any;
  edit: any;
  filenotChosen:boolean=true
  removeFile: boolean;
  options2: any;
  priceRange: number;
  min: number;
  max: number;
  selectedMin: number;
  selectedMax: number;
  showmore: boolean=false
  currentLocation : string=""
  selectedFile1: any;
  filenotChosen1: boolean=true;
  removeFile1: boolean;
  responseData: any;
  selectedDate: Date;
  selectedDate1: Date;
  fetchedDate: any;
  base64data: any;
  constructor(private fb:FormBuilder,private sanitizer: DomSanitizer, private http: HttpClient, private companyService: compService,private dialog: MatDialog){}

  ngOnInit(){
    sessionStorage.setItem("loadIndex","0")
    this.currentLocation = window.location.href
    this.signatoryForm = this.fb.group({
      // Your initial form controls go here
      // ...
      signatoryControls: this.fb.array([]),
    });
    this.dataForm = this.fb.group({});
    if(sessionStorage.getItem("chartOfAccountData")!=null && sessionStorage.getItem("uuid")!=null ){
      
      this.displayeddata = JSON.parse(sessionStorage.getItem("chartOfAccountData"))
      // this.loadData = this.displayeddata.slice(0,100)
      this.count = sessionStorage.getItem("loadCount")
      this.count = Number(this.count)*100
      this.loadData = this.displayeddata.slice(this.count,this.count+100)
      // this.loadData = this.loadData.map(obj => Object.values(obj));
    // console.log("🚀 ~ file: chart-of-accounts.component.ts:109 ~ ChartOfAccountsComponent ~ loadMore ~ loadData:", this.loadData)
    if(this.loadData.length>0){
      this.showmore = true
      this.formData()
    }
    else this.showmore = false
    }
  }

  get signatoryControls() {
    return this.signatoryForm.get('signatoryControls') as FormArray;
  }
  // rearrangedData: ExcelDataRow[] = [];

  // onPointerDown(event: MouseEvent, pointer: string): void {
  //   const slider = document.getElementById('rangeSlider') as HTMLElement;
  //   const pointerElement = document.getElementById(pointer) as HTMLElement;

  //   let isPointerActive = true;

  //   const onMouseMove = (moveEvent: MouseEvent) => {
  //     if (isPointerActive) {
  //       const sliderRect = slider.getBoundingClientRect();
  //       const position = (moveEvent.clientX - sliderRect.left) / sliderRect.width * 100;
  //       pointerElement.style.left = `${Math.min(100, Math.max(0, position))}%`;
        
  //       console.log("🚀 ~ file: chart-of-accounts.component.ts:83 ~ ChartOfAccountsComponent ~ onMouseMove ~ this.max:", this.max)
  //       console.log("🚀 ~ file: chart-of-accounts.component.ts:83 ~ ChartOfAccountsComponent ~ onMouseMove ~ this.min:", this.min)
  //       this.updateRange(this.min,this.max);
  //     }
  //   };

  //   const onMouseUp = () => {
  //     isPointerActive = false;
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // }

  // updateRange(min, max): void {

  //   const slider = document.getElementById('rangeSlider') as HTMLElement;
  //   const pointer1 = document.getElementById('pointer1') as HTMLElement;
  //   const pointer2 = document.getElementById('pointer2') as HTMLElement;
  
  //   const sliderWidth = slider.offsetWidth;
  //   const pointer1Position = (pointer1.offsetLeft + pointer1.offsetWidth / 2) / sliderWidth;
  //   const pointer2Position = (pointer2.offsetLeft + pointer2.offsetWidth / 2) / sliderWidth;
  
  //   // Use the calculated positions if available, otherwise use selectedMin and selectedMax
    
  //   const minValue = this.isPointerPositionAvailable(pointer1Position) ? min : min;
  //   const maxValue = this.isPointerPositionAvailable(pointer2Position) ? max : max;
  
  //   console.log('Selected Range: ', maxValue-minValue,);
  //   // You can perform further actions with the selected range here
  // }
  
  
  // isPointerPositionAvailable(position: number): boolean {
  //   // Check if the position is a valid number and not NaN or undefined
  //   return !isNaN(position) && position !== undefined;
  // }
  

  rearrangeData() {
    this.loadData = this.loadData.map(row => {
      return [
        row[0],      // id
        row[2],      // entity
        row[3],      // glCode
        row[4],      // glDescription
        row[7],       // cocName
        row[1],      // year
        row[5],      // amount
        row[6]       // cocCode
      ];
    });
  }

  // options = [
  //   { value: "option1", text: "Option 1", selected: false },
  //   { value: "option2", text: "Option 2", selected: false },
  //   { value: "option3", text: "Option 3", selected: false }
  // ];

  

  // this.formData = this.visibleFormControls
  get selectedUnits() {
    // console.log("optin",this.options);
    // this.filterdata()
    return this.options
      .filter(option => option.selected)
      .map(option => option.unitName)
      // .join(', ');

  }

  get selectedGlcodes() {
    // console.log("optin",this.options);
    // this.filterdata()
    return this.options2
      .filter(options2 => options2.selected)
      .map(options2 => options2["Gl Code"])
      // .join(', ');

  }

  fetchfilterdata(){
    this.showmore = true
    let filterValues = this.selectedUnits
    let filterValues1 = this.selectedGlcodes
    let uuid = sessionStorage.getItem("uuid")
    this.displayData = []
    this.displayeddata = []
    this.loadData = []

    if(filterValues.length>0 || filterValues1.length>0){
      this.companyService.fetchFilterData({unit_filter:filterValues,glcodes_filter:filterValues1,uuid:uuid})
      .subscribe(response => {
        if(response.status == "success"){
          this.displayeddata = response.filteredData
          sessionStorage.setItem("loadCount","0")
          this.displayData = this.displayeddata.slice(0,100)
          this.loadData = this.displayData.map(obj => Object.values(obj));
          this.rearrangeData();
          this.formControls = []
          this.formData()
          // alert("successfully inserted company details")
          // window.location.reload()
        }else{
          alert("failed to insert data please try again.")
        }
      })
    }else{
      // this.formData()
      // this.visibleFormControls1 = this.filterDataByControlValue(filterValues);
    }
  }

  filterdata(){
    const filterValues = this.selectedUnits
    if(this.selectedUnits.length==0){
      this.visibleFormControls1 = this.visibleFormControls
    }else{
      this.formData()
      this.visibleFormControls1 = this.filterDataByControlValue(filterValues);
    }
  }
  filterDataByControlValue(valueToFilter: any[]): any[] {
    return this.visibleFormControls.filter(control => valueToFilter.includes(control[1].control.value));

  }
  signatoryFormControls(){
    const newControl = this.fb.control('');
    this.signatoryControls.push(newControl);
    console.log("🚀 ~ file: company-details.component.ts:58 ~ CompanyDetailsComponent ~ addauditorsFormControl ~ auditorControls:", this.signatoryControls)
  }
  formData(): void {
    // Initialize an empty form group
    // this.dataForm = this.fb.group({});

    // Dynamically create form controls for the first row
    // this.displayeddata = this.displayeddata.slice(0,100)
    this.loadData.forEach((row, rowIndex) => {
      const rowControls = row.map((value, columnIndex) => {
        const label = `Field ${columnIndex + 1}`;
        let control 
        if(columnIndex == 4 &&  typeof(value) == 'number')control = new FormControl('')
        else control = new FormControl(value);
        this.dataForm.addControl(`field_${rowIndex}_${columnIndex}`,control);
        return { label, control };
      });
      this.formControls.push(rowControls);
    });
    console.log(this.formControls);
    this.formControls.forEach((control) => {
      control[0].control.disable();
      control[1].control.disable();
      control[2].control.disable();
      control[3].control.disable();
      // control[5].control.disable();
      
      console.log("control",control[1].control.value);
      
    });
    let index = Number(sessionStorage.getItem("loadCount"))
    // Initially, display a subset of the form controls
    this.visibleFormControls = this.formControls.slice(index*100, (index*100) + 100); // Adjust as needed
    this.visibleFormControls1 = this.visibleFormControls
    // this.filterdata()
    console.log("🚀 ~ file: chart-of-accounts.component.ts:94 ~ ChartOfAccountsComponent ~ formData ~ visibleFormControls:", this.visibleFormControls.length)
    // console.log("🚀 ~ file: chart-of-accounts.component.ts:94 ~ ChartOfAccountsComponent ~ formData ~ visibleFormControls:", this.visibleFormControls[0][5].control.value)
  }

  onCheckboxChange(unit: any) {
    // This function will be triggered when the checkbox state changes
    // console.log(`Checkbox state changed for `,this.selectedUnits);
    // this.filterdata()
    // You can perform additional logic here
  }

  onScroll(index: number) {
    // Update the visible form controls as the user scrolls
    const startIndex = Math.max(0, index - 10); // Adjust as needed
    const endIndex = Math.min(this.formControls.length - 1, index + 30); // Adjust as needed
    // console.log("🚀 ~ file: chart-of-accounts.component.ts:103 ~ ChartOfAccountsComponent ~ onScroll ~ visibleFormControls:", this.visibleFormControls.length,index)
    // this.visibleFormControls = this.formControls.slice(startIndex, endIndex);
  }

  loadMore(){
    // const loadCount = 
    // console.log("this.loadData",this.loadData)
    this.count = Number(sessionStorage.getItem("loadCount"))
    this.count = this.count+1
    sessionStorage.setItem("loadCount",this.count.toString())
    this.count = Number(this.count)*100
    this.loadData = this.displayeddata.slice(this.count,this.count+100)
    // console.log("🚀 ~ file: chart-of-accounts.component.ts:109 ~ ChartOfAccountsComponent ~ loadMore ~ loadData:", this.loadData)
    if(this.loadData.length>0)
    this.formData()
    else this.showmore = false
  }

  populateForm() {
    // this.selectedDate = new Date(this.selectedDate)
    // this.selectedDate1 = new Date(this.selectedDate1)
    // console.log("🚀 ~ file: chart-of-accounts.component.ts:314 ~ ChartOfAccountsComponent ~ populateForm ~ selectedDate1:", this.selectedDate1)
//     let value = JSON.stringify(this.selectedDate)
//     let value1 = JSON.stringify(this.selectedDate1)
// // Split the string value by '-' to extract the day, month, and year
// let [day, month, year] = value.split('-');
// let [day1, month1, year1] = value1.split('-');

// Create a new Date instance
let formattedDate = new Date(this.selectedDate);
let formattedDate1 = new Date(this.selectedDate1);

// Set the date of the 'formattedDate' instance to the specified day, month, and year
// formattedDate.setFullYear(parseInt(year), parseInt(month) - 1, parseInt(day));

// Extract the day, month, and year values from the 'formattedDate' instance
let dd = String(formattedDate.getDate()).padStart(2, '0');
let mm = String(formattedDate.getMonth() + 1).padStart(2, '0'); // January is 0!
let yyyy = formattedDate.getFullYear();
let dd1 = String(formattedDate1.getDate()).padStart(2, '0');
let mm1 = String(formattedDate1.getMonth() + 1).padStart(2, '0'); // January is 0!
let yyyy1 = formattedDate1.getFullYear();

// Format the date as a string with the "dd-mm-yyyy" format
let transformdate = dd + '-' + mm + '-' + yyyy;
let transformdate1 = dd1 + '-' + mm1 + '-' + yyyy1;


  sessionStorage.setItem("datestring",transformdate+' - '+transformdate1)
    console.log("date",this.selectedDate+' - '+this.selectedDate1)
    // Fetch values from the form
    let index = sessionStorage.getItem("loadCount")
    this.formControls.forEach((control) => {
      control[0].control.enable();
      control[1].control.enable();
      control[2].control.enable();
      control[3].control.enable();
      // control[5].control.enable();
      console.log("control",control[0].control.value);
      
    });
    const formValues = this.formControls;
    // this.displayeddata = ""
    // this.dataForm.value
    this.formControls.forEach((control) => {
      control[0].control.disable();
      control[1].control.disable();
      control[2].control.disable();
      control[3].control.disable();
      // control[4].control.disable();
      // control[5].control.disable();
      // control[6].control.disable();
      // console.log("control",control[0].control);
      
    });
    const arrayOfObjects = formValues.map(innerArray => {
      return {
        // id: index,
        unit_name:innerArray[1].control.value,
        GL_Code:innerArray[2].control.value,
        GL_Description:innerArray[3].control.value,
        coc_name:innerArray[4].control.value,
        // name: innerArray[1],
        // age: innerArray[2]
      };
    });
    const objectOfObjects: { [key: string]: any } = {};
arrayOfObjects.forEach(obj => {
  objectOfObjects[obj.unit_name] = obj;
});
let uuid = sessionStorage.getItem("uuid")
    this.companyService.submitFormdata({data:arrayOfObjects,uuid:uuid})
      .subscribe(response => {
        if(response.status == "success"){
          alert("successfully inserted company details")
          // window.location.reload()
        }else{
          alert("failed to insert data please try again.")
        }
      })
    // sessionStorage.removeItem("fileData")

    // You can now use formValues as needed, e.g., send it to a server, perform validation, etc.
  }

  isDragOver = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    this.selectedFile = event.dataTransfer?.files[0]
    if (files) {
      this.onUpload("")
      this.onFileDropped(files);
    }
  }
  removetheFile(){
    this.selectedFile = ''
    this.filenotChosen = true
    this.removeFile = false
    this.visibleFormControls1 = []
  }
  removetheFile1(){
    this.selectedFile1 = ''
    this.filenotChosen1 = true
    this.removeFile1 = false
    this.visibleFormControls1 = []
  }
  onFileSelected(event: any) {
    this.filenotChosen = false
    this.removeFile = true
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      // this.removetheFile1()
      this.onUpload("update")
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.selectedFile));
    console.log("🚀 ~ file: user-info.component.ts:40 ~ UserInfoComponent ~ onFileSelected ~ pdfUrl:", this.pdfUrl)
  }
  else{
    this.pdfUrl = ''
  }
    console.log('formdata',this.selectedFile)
  }
  onFileSelected1(event: any) {
    this.filenotChosen1 = false
    this.removeFile1 = true
    this.selectedFile1 = event.target.files[0];
    if (this.selectedFile1) {
      this.removetheFile()
      this.onUpload("")
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.selectedFile1));
    console.log("🚀 ~ file: user-info.component.ts:40 ~ UserInfoComponent ~ onFileSelected ~ pdfUrl:", this.pdfUrl)
  }
  else{
    this.pdfUrl = ''
  }
    console.log('formdata',this.selectedFile1)
  }
  onFileDropped(files: FileList) {
    // Handle dropped files here
    console.log(files);
  }
  private fileUrl = '/assets/Trial Balance Sample.xlsx';

  toggleSave(index:number){
    this.save[index]==false
    this.edit[index]==true
    this.formControls.forEach((control) => {
      // control[0].control.disable();
      // control[1].control.disable();
      // control[2].control.disable();
      // control[3].control.disable();
      control[4].control.disable();
      // control[5].control.disable();
      // control[6].control.disable();
      // console.log("control",control[0].control);
      
    });
  }



  downloadFile(event: Event) {
    // Create a link element
    const link = document.createElement('a');

    // Set the href attribute to the file URL
    link.href = this.fileUrl;

    // Add the download attribute with the desired file name
    link.download = 'Trial Balance Sample.xlsx';

    // Simulate a click on the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up: remove the link element from the DOM
    document.body.removeChild(link);
  }
  downloadcocMasterFile() {
    // Create a link element
    const link = document.createElement('a');

    // Set the href attribute to the file URL
    link.href = "/assets/CoC_Master.xlsx";

    // Add the download attribute with the desired file name
    link.download = 'CoC_Master.xlsx';

    // Simulate a click on the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up: remove the link element from the DOM
    document.body.removeChild(link);
  }
  downloadCocFile(event: Event) {
    // Create a link element
    this.downloadGeneratedFile()
    this.downloadcocMasterFile()
    // const link = document.createElement('a');

    // Set the href attribute to the file URL
    // link.href = this.fileUrl;

    // Add the download attribute with the desired file name
    // link.download = 'sampleCSVfile.xlsx';

    // Simulate a click on the link to trigger the download
    // document.body.appendChild(link);
    // link.click();

    // Clean up: remove the link element from the DOM
    // document.body.removeChild(link);
  }
  downloadGeneratedFile(): void {
    this.companyService.downloadCocFile({file:"coc",uuid:sessionStorage.getItem("uuid")}).subscribe(async base64data => {
      console.log(base64data);
      
      // let data = {} 
      // data =blob
      this.base64data = base64data
      const decodedBlob = this.base64ToBlob(this.base64data.base64Data);
      saveAs(decodedBlob, 'Coc File.xlsx');


    // Fetch the actual content from the server
    // const blobContent = await this.http.get(blobUrl, { responseType: 'arraybuffer' }).toPromise();
    // console.log("🚀 ~ file: other-information.component.ts:128 ~ OtherInformationComponent ~ this.companyService.downloadFile ~ blobContent:", blobContent)

      // Create a Blob from the fetched content
      // const blob = new Blob([blobUrl], { type: 'application/octet-stream' });

      // Create a link element
      // const link = document.createElement('a');

      // Set the download attribute with the desired filename
      // link.download = 'downloadedFile.xlsx';

      // Set the Blob data directly as the href attribute
      // link.href = URL.createObjectURL(blob);

      // Append the link to the document
      // document.body.appendChild(link);

      // Trigger a click event on the link
      // link.click();

      // Remove the link from the document
      // document.body.removeChild(link);
    });
  }
  
  base64ToBlob(base64Data: string): Blob {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: 'application/octet-stream' });
  }
  onUpload(params:any) {
    let file = this.selectedFile?this.selectedFile:this.selectedFile1
    if (file) {
      // this.selectedFile = this.selectedFile1
      console.log("thefile",file)
      // console.log("thefile1",this.selectedFile1)
      let uuid = sessionStorage.getItem("uuid")
      const formData = new FormData();
      formData.append('file', file);
      formData.append('uuid',uuid)
      if(params == "update") formData.append('update_data',"true")
      formData.append('generateFile',"true")
      console.log('formdata',formData)
      this.http
        .post('http://localhost:6019/api/stringCompare', formData)
        .subscribe(
          (response) => {
            console.log('Upload successful:', response);
            // status = response.status
            this.responseData = response
            // responseData = response
            if(this.responseData.status == "success" ){
              this.showmore = true
              this.displayData = response
              this.displayeddata = this.displayData.csvdata
              console.log("🚀 ~ file: chart-of-accounts.component.ts:448 ~ ChartOfAccountsComponent ~ onUpload ~ displayeddata:", this.displayeddata)
              this.dataLength = this.displayData.csvdata/100
              sessionStorage.setItem("chartOfAccountData",JSON.stringify(this.displayeddata))
              sessionStorage.setItem("datalength",this.dataLength.toString())
              // sessionStorage.setItem("uuid",this.displayData.uniqueId)
              this.loadData = this.displayeddata.slice(0,100)
              // this.loadData = this.displayeddata
              sessionStorage.setItem("uniqueGlCodes",JSON.stringify(this.displayData.uniqueGlcode))
              const unitDetails = this.displayData.unit_details.map(item => ({ ...item, selected: true }));
              console.log("🚀 ~ file: chart-of-accounts.component.ts:454 ~ ChartOfAccountsComponent ~ onUpload ~ unitDetails:", unitDetails)
              const glCodes = this.displayData.uniqueGlcode.map(item => ({ ...item, selected: true }));
              this.options = unitDetails
              this.options2 = glCodes
              this.min = Math.min(...this.options2.map(item => item['Gl Code']));
              this.max = Math.max(...this.options2.map(item => item['Gl Code']));
              // this.selectedMin = (typeof (this.min)== 'number') ? this.min :0
              // console.log("🚀 ~ file: chart-of-accounts.component.ts:453 ~ ChartOfAccountsComponent ~ onUpload ~  this.selectedMin:",  this.selectedMin)
              // this.selectedMax = (typeof (this.max)== 'number') ? this.max :1000
              
              // console.log("🚀 ~ file: chart-of-accounts.component.ts:455 ~ ChartOfAccountsComponent ~ onUpload ~  this.selectedMax:",  this.selectedMax)
              
              // this.loadData = this.displayeddata.slice(this.selectedMin, this.selectedMax);
              // this.updateRange(this.selectedMin,this.selectedMax)
        
              sessionStorage.setItem("loadCount","0")
              this.formControls = []
              if(this.displayData.alert == true){
                alert("The additional unit name which were not present company details have been cleared")
              }
              this.formData()
              this.fetchfilterdata()
              // this.displayeddata = this.di
            //   this.sign_data = response
            //   if(this.sign_data.url2){
            //     this.url = this.sign_data.url2
            //     this.access_token = this.sign_data.access_token
            //     localStorage.setItem("url2",this.url)
            //     localStorage.setItem("access_token",this.access_token)
            //     localStorage.setItem("document_id",this.sign_data.document_id)
            //   }
            //   window.location.href = this.sign_data.url
            // }else{
            //   console.log('error',this.sign_data)
            }else if(this.responseData.formResponse.status == "success"){
              this.fetchfilterdata()
            }else{
              if(this.responseData.message) alert(this.responseData.message)
              else alert("data insertion failed")
            }
            // Handle the response from the server
          },
          (error) => {
            console.error('Upload error:', error);
            // Handle error
          }
        );
    }
  }
  // onRangeChange() {
  //   // Handle any specific actions when the range values are updated
  //   // For example, you can update the displayed data based on the new range values
  //   this.loadData = this.displayeddata.slice(this.selectedMin, this.selectedMax);
  // }
  openPopup(): void {
    // const data = this.popupDataService.getData(); // Fetch data from the service
    let uuid = sessionStorage.getItem("uuid")
    this.companyService.fetchFilterData({unit_filter:[],glcodes_filter:[],uuid:uuid})
      .subscribe(response => {
        // if(response.status == "success"){
          this.displayeddata = response.filteredData
          console.log("🚀 ~ file: chart-of-accounts.component.ts:510 ~ ChartOfAccountsComponent ~ openPopup ~ displayeddata:", this.displayeddata)
          sessionStorage.setItem("chartOfAccountData",JSON.stringify(this.displayeddata))
          // this.displayData = this.displayeddata.slice(0,100)
          // this.loadData = this.displayData.map(obj => Object.values(obj));
          // this.rearrangeData();
          // this.formControls = []
          // this.formData()
          // alert("successfully inserted company details")
          // window.location.reload()
        // }else{
        //   alert("failed to insert data please try again.")
        // }
        const data = this.displayeddata
        const dialogRef = this.dialog.open(PopupComponent, {
          width: '100%',
          height: '100%',
          data: { title: 'Popup Title', data: data }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      })
  }
  fetchDate() {
    // Replace this with your actual data fetching logic
    // For example, you can make an HTTP request using Angular's HttpClient
    // Here, we're simulating fetching data from an API
    // this.http.get(`your-api-endpoint/${this.selectedDate}`).subscribe(
    //   (data) => {
    //     this.fetchedDate = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
    console.log(this.selectedDate);
    
  }
  
}
