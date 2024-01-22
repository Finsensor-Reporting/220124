import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  displayeddata : any =[]
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(){
    this.displayeddata = JSON.parse(sessionStorage.getItem("chartOfAccountData"))
    console.log("🚀 ~ file: popup.component.ts:18 ~ PopupComponent ~ ngOnInit ~ displayeddata:", this.displayeddata)
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
