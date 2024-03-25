import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputDataDialogComponent} from './input-data-dialog.component';

describe('InputDataDialogComponent', () => {
    let component: InputDataDialogComponent;
    let fixture: ComponentFixture<InputDataDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputDataDialogComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(InputDataDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
