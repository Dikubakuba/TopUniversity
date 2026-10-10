import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListageAvisComponent } from './listage-avis.component';

describe('ListageAvisComponent', () => {
  let component: ListageAvisComponent;
  let fixture: ComponentFixture<ListageAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListageAvisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListageAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
