import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VisualizationDashboardComponent} from './visualization-dashboard.component';

describe('VisualizationDashboardComponent', () => {
    let component: VisualizationDashboardComponent;
    let fixture: ComponentFixture<VisualizationDashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VisualizationDashboardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(VisualizationDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
