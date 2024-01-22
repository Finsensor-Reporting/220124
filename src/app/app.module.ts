import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule}   from '@angular/forms';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';
import { compService } from './services/company-details.services';
import { OtherInformationComponent } from './other-information/other-information.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GenerateReportsComponent } from './generate-reports/generate-reports.component';
import { AdjustmentsComponent } from './adjustments/adjustments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    CompanyDetailsComponent,
    ChartOfAccountsComponent,
    OtherInformationComponent,
    GenerateReportsComponent,
    AdjustmentsComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [compService],
  bootstrap: [AppComponent]
})
export class AppModule { }
