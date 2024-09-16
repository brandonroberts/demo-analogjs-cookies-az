import { Component, computed, inject } from "@angular/core";
import { ProfileService } from "../services/profile.service";

@Component({
    selector: 'app-header',
    standalone: true,
    template: `
        <nav class="navbar bg-base-100">
            <div class="flex-1">
                <a class="btn btn-ghost text-xl" href="/">Analog oauth2 Static web App</a>
            </div>
            <div class="flex-none gap-2">
                <ul class="menu menu-horizontal px-1">
                    <li><a href="/about">About</a></li>
                </ul>
                @if (profileService.loggedIn()) {
                    @defer (when profile()) {
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabindex="0"
                            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                            <a class="justify-between">
                                Profile
                            </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><button (click)="logout()">Logout</button></li>
                        </ul>
                    </div>
                    }
                } @else {
                    <a class="btn" href="/api/auth/signin">
                        <span class=""></span> Login
                    </a>
                }
            </div>
        </nav>
    `
})
export default class HeaderComponent {
    profileService = inject(ProfileService);
    profile = computed(() => this.profileService.userProfile());
    async logout() {
        this.profileService.loggedIn.set(false);
        window.location.href = '/api/auth/signout';
    }
}