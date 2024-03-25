import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TerminalInstructionDialog} from './terminal-instruction-dialog.component';

describe('ChangeMailDialogComponent', () => {
    let component: TerminalInstructionDialog;
    let fixture: ComponentFixture<TerminalInstructionDialog>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TerminalInstructionDialog]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TerminalInstructionDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
