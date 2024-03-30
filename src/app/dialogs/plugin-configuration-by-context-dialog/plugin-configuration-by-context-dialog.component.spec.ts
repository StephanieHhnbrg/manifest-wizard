import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PluginConfigurationByContextDialogComponent} from './plugin-configuration-by-context-dialog.component';

describe('PluginConfigurationByContextDialogComponent', () => {
    let component: PluginConfigurationByContextDialogComponent;
    let fixture: ComponentFixture<PluginConfigurationByContextDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PluginConfigurationByContextDialogComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PluginConfigurationByContextDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
