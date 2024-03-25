import {Component} from '@angular/core';

@Component({
    selector: 'app-start-screen',
    templateUrl: './start-screen.component.html',
    styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

    constructor() {
    }

    public scrollDown(): void {
        const element = document.getElementById('scroll-here');
        element!.scrollIntoView({block: 'start', behavior: 'smooth'});
    }
}
