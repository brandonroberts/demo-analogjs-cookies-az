import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <h1 class="text-4xl font-bold text-center">About page</h1>
    <p class="text-center">In a quiet village nestled between rolling hills, the sun rose gently over the horizon, casting a warm glow on the cobblestone streets. Birds chirped melodiously, welcoming the new day. The aroma of freshly baked bread wafted through the air, inviting early risers to the local bakery. Children laughed and played, their joy echoing through the narrow alleys. As the day unfolded, the village buzzed with life, each moment a testament to the simple beauty of everyday existence.</p>
  `
})
export default class AboutComponent {
}
