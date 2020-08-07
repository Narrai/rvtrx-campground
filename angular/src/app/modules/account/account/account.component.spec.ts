import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountComponent } from './account.component';
import { AccountBookingComponent } from '../account-booking/account-booking.component';
import { AccountReviewComponent } from '../account-review/account-review.component';
import { AddressComponent } from '../address/address.component';
import { PaymentComponent } from '../payment/payment.component';
import { ProfileComponent } from '../profile/profile.component';
import { Account } from '../../../data/account.model';
import { AccountService } from '../../../services/account/account.service';

describe('AccountComponent', () => {
  const accountServiceStub = {
    get() {
      const account: Account = {
        id: '',
        address: {
          id: '',
          city: '',
          country: '',
          postalCode: '',
          stateProvince: '',
          street: '',
        },
        payments: [],
        profiles: [],
      };

      return of(account);
    },
  };

  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountComponent,
        AccountBookingComponent,
        AccountReviewComponent,
        AddressComponent,
        PaymentComponent,
        ProfileComponent,
      ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: AccountService, useValue: accountServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
