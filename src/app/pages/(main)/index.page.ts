import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Welcome to Analog - oauth2 demo</h1>
          <p class="py-6">
            This is a project demonstrating how to benefit of analog to execute some 
            code on server side and use static web apps to deploy the all thing.
          </p>
        </div>
      </div>
    </div>
  `
})
export default class HomeComponent {
}
