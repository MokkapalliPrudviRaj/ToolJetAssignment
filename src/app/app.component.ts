
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule], // ✅ Required for ngClass
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements AfterViewInit{
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

  @ViewChild('observeSection') observeSection!: ElementRef;

  allIcons: string[] = [
    'assets/images/9ec6bdfc1870ae942f24644f5115cfe5bf9cfa80-260x258.svg.svg',
    'assets/images/3b6417eaddee16db72e8f06f2afe997a148a76bf-259x258.svg.svg',
    'assets/images/0a7e7d9aa96c915a5f0bc1b3cc9a8a5b1fc45320-259x258.svg.svg',
    'assets/images/5ce22a8903d7eac246e6afaf0b3a47ecd8c10b7d-259x259.svg.svg'
  ];

  visibleIcons: string[] = [];
  observer!: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startAddingImages();
        }
      });
    }, { threshold: 0.5 });

    this.observer.observe(this.observeSection.nativeElement);
  }

  async startAddingImages() {
    this.visibleIcons = []; // Reset
    for (let i = 0; i < this.allIcons.length; i++) {
      await this.delay(500); // Delay between icons
      this.visibleIcons.push(this.allIcons[i]);
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
