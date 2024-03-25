import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeStampPickerComponent} from './time-stamp-picker.component';

describe('TimeStampPickerComponent', () => {
    let component: TimeStampPickerComponent;
    let fixture: ComponentFixture<TimeStampPickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TimeStampPickerComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TimeStampPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
