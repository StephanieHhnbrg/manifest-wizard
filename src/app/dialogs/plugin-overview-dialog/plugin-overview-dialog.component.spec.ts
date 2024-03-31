import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PluginOverviewDialogComponent} from './plugin-overview-dialog.component';

describe('PluginOverviewDialogComponent', () => {
    let component: PluginOverviewDialogComponent;
    let fixture: ComponentFixture<PluginOverviewDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PluginOverviewDialogComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PluginOverviewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
