import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ObservationInputComponent} from './observation-input.component';

describe('ObservationInputComponent', () => {
    let component: ObservationInputComponent;
    let fixture: ComponentFixture<ObservationInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ObservationInputComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ObservationInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
