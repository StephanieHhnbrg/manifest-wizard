import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartConfigurationDialogComponent} from './chart-configuration-dialog.component';

describe('ChartConfigurationDialogComponent', () => {
    let component: ChartConfigurationDialogComponent;
    let fixture: ComponentFixture<ChartConfigurationDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChartConfigurationDialogComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ChartConfigurationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
