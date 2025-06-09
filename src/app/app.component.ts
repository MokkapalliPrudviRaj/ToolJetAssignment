
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';

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

}
