import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOfAccountsComponent } from './chart-of-accounts.component';

describe('ChartOfAccountsComponent', () => {
  let component: ChartOfAccountsComponent;
  let fixture: ComponentFixture<ChartOfAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartOfAccountsComponent]
    });
    fixture = TestBed.createComponent(ChartOfAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
