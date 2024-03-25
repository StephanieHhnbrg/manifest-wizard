import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManifestCreatorComponent} from './manifest-creator.component';

describe('ManifestCreatorComponent', () => {
    let component: ManifestCreatorComponent;
    let fixture: ComponentFixture<ManifestCreatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ManifestCreatorComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ManifestCreatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
