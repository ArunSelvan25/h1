import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantViewPage } from './tenant-view-page';

describe('TenantViewPage', () => {
  let component: TenantViewPage;
  let fixture: ComponentFixture<TenantViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantViewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
