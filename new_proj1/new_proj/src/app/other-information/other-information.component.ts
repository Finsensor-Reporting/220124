import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { compService } from '../services/company-details.services';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-other-information',
  templateUrl: './other-information.component.html',
  styleUrls: ['./other-information.component.scss']
})
export class OtherInformationComponent {

  url:any
  isDragOver = false;
  selectedFile: any;
  pdfUrl: any;
  displayeddata:any
  base64data: any;
  displayData: any;
  dataForm: FormGroup;
  formControls: { label: string; control: FormControl }[] = [];
  visibleFormControls: { label: string; control: FormControl }[] = [];
  loadData: any;
  count: number;
  dateString:any;
  visibleFormControls1: { label: string; control: FormControl; }[];
  selectedDate:any
  areaList:any
  measureList:any
  constructor(private fb:FormBuilder,private sanitizer: DomSanitizer, private http: HttpClient, private companyService: compService){}

  ngOnInit(): void {
    // Initialize an empty form group
    this.dataForm = this.fb.group({});
    this.displayeddata = sessionStorage.getItem("fileData")
    this.dateString = sessionStorage.getItem('datestring')
    this.areaList = [
      { "name": "Property, Plant, and Equipment (PPE)", "selected": true },
      { "name": "Intangible Assets", "selected": true },
      { "name": "Construction Work in Progress (CWIP)", "selected": true },
      { "name": "Trade Receivables", "selected": true },
      { "name": "Inventories", "selected": true },
      { "name": "Cash and Cash Equivalent", "selected": true },
      { "name": "Share Capital", "selected": true },
      { "name": "Trade Payables", "selected": true }
    ]
    this.measureList = [
      { "name": "Details", "selected": true },
      { "name": "Yes/No", "selected": true },
      { "name": "Listing", "selected": true },
      { "name": "Number", "selected": true },
      { "name": "Foreign Currency", "selected": true },
      { "name": "Report", "selected": true },
      { "name": "Rs.", "selected": true },
      { "name": "Period", "selected": true },
      { "name": "Nature", "selected": true },
      { "name": "Schedule", "selected": true },
      { "name": "Tax Computation", "selected": true },
      { "name": "Tax Rate", "selected": true },
      { "name": "%", "selected": true },
      { "name": "Years", "selected": true },
      { "name": "Text", "selected": true },
      { "name": "Name", "selected": true },
      { "name": "Name and Amount", "selected": true }
    ]
  }
  // populateForm() {
  //   this.displayeddata.forEach((row, rowIndex) => {
  //     row.forEach((value, columnIndex) => {
  //       const label = `Field ${columnIndex + 1}`; // You can customize the label as needed
  //       const control = new FormControl(value);
  //       this.formControls.push({ label, control });
  //       this.dataForm.addControl(`field_${rowIndex}_${columnIndex}`, control);
  //     });
  //   });
  // }
  get selectedArea() {
    // console.log("optin",this.options);
    // this.filterdata()
    return this.areaList
      .filter(option => option.selected)
      .map(option => option.name)
      .join(', ');

  }
  get selectedMeasure() {
    // console.log("optin",this.options);
    // this.filterdata()
    return this.measureList
      .filter(option => option.selected)
      .map(option => option.name)
      .join(', ');

  }
  formData(): void {
    // Initialize an empty form group
    // this.dataForm = this.fb.group({});
    let date = this.dateString.split(" ")[2]
    // Dynamically create form controls for the first row
    // this.displayeddata = this.displayeddata.slice(0,100)
    this.loadData.forEach((row, rowIndex) => {
      const rowControls = row.map((value, columnIndex) => {
        const label = `Field ${columnIndex + 1}`;
        let control 
        if(columnIndex == 0) control = new FormControl(date)
        else control= new FormControl(value);
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
      control[5].control.disable();
      
      console.log("control",control[1].control.value);
      
    });
    let index = Number(sessionStorage.getItem("loadCount"))
    // Initially, display a subset of the form controls
    this.visibleFormControls = this.formControls.slice(index*100, (index*100) + 100); // Adjust as needed
    this.visibleFormControls1 = this.visibleFormControls
    // this.filterdata()
    console.log("🚀 ~ file: chart-of-accounts.component.ts:94 ~ ChartOfAccountsComponent ~ formData ~ visibleFormControls:", this.visibleFormControls.length)
    console.log("🚀 ~ file: chart-of-accounts.component.ts:94 ~ ChartOfAccountsComponent ~ formData ~ visibleFormControls:", this.visibleFormControls[0][2].control.value)
  }

  onScroll(index: number) {
    // Update the visible form controls as the user scrolls
    const startIndex = Math.max(0, index - 10); // Adjust as needed
    const endIndex = Math.min(this.formControls.length - 1, index + 30); // Adjust as needed
    // this.visibleFormControls = this.formControls.slice(startIndex, endIndex);
  }

  onCheckboxChange(unit: any) {
    // This function will be triggered when the checkbox state changes
    // console.log(`Checkbox state changed for `,this.selectedUnits);
    // this.filterdata()
    // You can perform additional logic here
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
    this.formData()
  }

  fetchfilterdata(){
    // this.showmore = true
    // let filterValues = this.selectedUnits
    // let filterValues1 = this.selectedGlcodes
    let uuid = sessionStorage.getItem("uuid")
    this.displayData = []
    this.displayeddata = []
    this.loadData = []

    // if(filterValues.length>0 || filterValues1.length>0){
    //   this.companyService.fetchFilterData({unit_filter:filterValues,glcodes_filter:filterValues1,uuid:uuid})
    //   .subscribe(response => {
    //     if(response.status == "success"){
    //       this.displayeddata = response.filteredData
    //       sessionStorage.setItem("loadCount","0")
    //       this.displayData = this.displayeddata.slice(0,100)
    //       this.loadData = this.displayData.map(obj => Object.values(obj));
    //       this.rearrangeData();
    //       this.formControls = []
    //       this.formData()
    //       // alert("successfully inserted company details")
    //       // window.location.reload()
    //     }else{
    //       alert("failed to insert data please try again.")
    //     }
    //   })
    // }else{
    //   // this.formData()
    //   // this.visibleFormControls1 = this.filterDataByControlValue(filterValues);
    // }
  }

  populateForm() {
    console.log(this.selectedDate)
    // Fetch values from the form
    let index = sessionStorage.getItem("loadCount")
    this.formControls.forEach((control) => {
      control[0].control.enable();
      control[1].control.enable();
      control[2].control.enable();
      control[3].control.enable();
      control[5].control.enable();
      // console.log("control",control[0].control.value);
      
    });
    const formValues = this.formControls;
    // this.displayeddata = ""
    // this.dataForm.value
    this.formControls.forEach((control) => {
      control[0].control.disable();
      control[1].control.disable();
      control[2].control.disable();
      control[3].control.disable();
      control[4].control.disable();
      control[5].control.disable();
      control[6].control.disable();
      // console.log("control",control[0].control);
      
    });
    const arrayOfObjects = formValues.map(innerArray => {
      return {
        // id: index,
        period:innerArray[0].control.value,
        unit_code:innerArray[1].control.value,
        area:innerArray[2].control.value,
        nature_of_information:innerArray[3].control.value,
        source_of_information:innerArray[4].control.value,
        measeurement:innerArray[5].control.value,
        value:innerArray[6].control.value,
        // name: innerArray[1],
        // age: innerArray[2]
      };
    });
//     const objectOfObjects: { [key: string]: any } = {};
// arrayOfObjects.forEach(obj => {
//   objectOfObjects[obj.unit_name] = obj;
// });
    this.companyService.submitOiFormdata({_id:sessionStorage.getItem("uuid"),OiData:arrayOfObjects})
      .subscribe(response => {
        if(response.status == "success"){
          alert("successfully inserted Other-information details")
          // window.location.reload()
        }else{
          alert("failed to insert data please try again.")
        }
      })
    // sessionStorage.removeItem("fileData")

    // You can now use formValues as needed, e.g., send it to a server, perform validation, etc.
  }

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
      this.onUpload()
      this.onFileDropped(files);
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.onUpload()
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.selectedFile));
    console.log("🚀 ~ file: user-info.component.ts:40 ~ UserInfoComponent ~ onFileSelected ~ pdfUrl:", this.pdfUrl)
  }
  else{
    this.pdfUrl = ''
  }
    console.log('formdata',this.selectedFile)
  }

  onFileDropped(files: FileList) {
    // Handle dropped files here
    console.log(files);
  }
  private fileUrl = '/assets/Measures_OI.xlsx';
  onUpload() {
    if (this.selectedFile) {
      console.log(this.selectedFile)
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      console.log('formdata',this.selectedFile)
      this.http
        .post('https://finsensor-reporting-backend.onrender.com/api/stringCompare', formData)
        .subscribe(
          (response) => {
            console.log('Upload successful:', response);
            if(response){
              this.visibleFormControls = []
              this.formControls = []
              this.displayData = response
              this.displayeddata = this.displayData.csvdata
              sessionStorage.setItem("fileData",this.displayeddata)
              sessionStorage.setItem("loadCount","0")
              this.loadData = this.displayeddata.slice(0,100)
              this.formData()
              // this.populateForm()
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
  downloadFile(event: Event) {
    // Create a link element
    this.downloadGeneratedFile()
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
    this.companyService.downloadFile(this.selectedArea,this.selectedMeasure,this.dateString,sessionStorage.getItem("uuid")).subscribe(async base64data => {
      console.log(base64data);
      
      // let data = {} 
      // data =blob
      this.base64data = base64data
      const decodedBlob = this.base64ToBlob(this.base64data.base64Data);
      saveAs(decodedBlob, 'sample_other-information_file.xlsx');


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
}
