
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule], // ✅ Required for ngClass
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tooljetassignment';
  
  @ViewChild('carouselTrack', { static: true }) track!: ElementRef;

  scrollAmount = 0;
  itemWidth = 320; // Adjust based on your actual card+gap width

  scrollForward(): void {
    this.scrollAmount += this.itemWidth;
    this.track.nativeElement.scrollTo({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollBackward(): void {
    this.scrollAmount -= this.itemWidth;
    if (this.scrollAmount < 0) {
      this.scrollAmount = 0;
    }
    this.track.nativeElement.scrollTo({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }

  activeDropdown: string | null = null;

  toggleDropdown(menu: string): void {
    if (this.activeDropdown === menu) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = menu;
    }
  }

  // Close dropdown on outside click
  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement): void {
    const insideDropdown = targetElement.closest('.dropdown');
    if (!insideDropdown) {
      this.activeDropdown = null;
    }
  }
}
