import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';
import { compService } from '../services/company-details.services';

@Component({
  selector: 'app-generate-reports',
  templateUrl: './generate-reports.component.html',
  styleUrls: ['./generate-reports.component.scss']
})
export class GenerateReportsComponent {
  report_name :string="sample"
  myForm: FormGroup;
  base64data: any;
  selectedDate: any
  selectedDate1: any
  status1: string;
  createdAt1: Date;
  dateString: string;
  date1: string;
  date: string;
  constructor(private fb: FormBuilder, private companyService: compService) { }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      inputValue: ['']  // Initial value is an empty string
    });
    this.dateString = sessionStorage.getItem("datestring")
    this.selectedDate1 = this.dateString.split(" ")[2]
      this.selectedDate = this.dateString.split(" ")[0]
      let [day, month, year] = this.selectedDate.split('-');

// Create a new Date object (month is 0-based, so subtract 1 from the month)
this.selectedDate = `${year}-${month}-${day}`;
[day, month, year] = this.selectedDate1.split('-');
this.selectedDate1 = `${year}-${month}-${day}`;

  }
  onSubmit(): void {
    const inputValue = this.myForm.get('inputValue').value;
    console.log('Input Value:', inputValue);
    this.report_name = inputValue
    // You can perform further actions with the input value here
  }
  importName: string;
  reportName: string;
  status: string;
  createdAt: string;

  // Function to handle download button click
  onDownloadClick(): void {
    // Add logic for downloading here
    let uuid = sessionStorage.getItem("uuid")
    this.companyService.downloadReport(this.report_name,uuid,this.dateString).subscribe(async base64data => {
      console.log(base64data);
      
      // let data = {} 
      // data =blob
      this.base64data = base64data
      const decodedBlob = this.base64ToBlob(this.base64data.base64Data);
      saveAs(decodedBlob, this.report_name+".xlsx");
      this.status1 = "success"
      this.createdAt1 = new Date()
    console.log('Download button clicked!');
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

