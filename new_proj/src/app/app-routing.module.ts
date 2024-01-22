import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {company_details} from CompanyDetailsComponent
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';
import { OtherInformationComponent } from './other-information/other-information.component';
import { GenerateReportsComponent } from './generate-reports/generate-reports.component';
import { AdjustmentsComponent } from './adjustments/adjustments.component';
import { PopupComponent } from './popup/popup.component';

const routes: Routes = [
  { path: 'company_details', component: CompanyDetailsComponent },
  { path: 'ChartOfAccount', component: ChartOfAccountsComponent },
  { path: 'OtherInfo', component: OtherInformationComponent },
  { path: 'reports', component: GenerateReportsComponent },
  { path: 'adjustment', component: AdjustmentsComponent },
  { path: 'popup', component: PopupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
