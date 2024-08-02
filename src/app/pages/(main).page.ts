import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from "../components/header.component";

@Component({
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
    template: `
        <div class="container mx-auto">
            <app-header></app-header>
            <router-outlet></router-outlet>
        </div>
    `,
  })
export default class MainComponent {
}
