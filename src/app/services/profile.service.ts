import { isPlatformBrowser } from "@angular/common";
import { effect, inject, Injectable, PLATFORM_ID, signal } from "@angular/core";

export interface Profile {
    displayName: string;
    email: string; 
    picture: string
  };

  
@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    loggedIn = signal(false);
    userProfile = signal<Profile | null>(null);
    platformId = inject(PLATFORM_ID);
    
    constructor() {
        if (isPlatformBrowser(this.platformId) && document.cookie.includes('isAuthenticated=true')) {
            this.loggedIn.set(true);
        }
        effect(() => {
            if (this.loggedIn()) {
                this.getProfile();
            }
        });
    }

    async getProfile() {
        const profile = await fetch('/api/auth/profile');
        this.userProfile.set(await profile.json());
    }
}