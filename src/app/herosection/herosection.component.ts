import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-herosection',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './herosection.component.html',
  styleUrl: './herosection.component.css'
})
export class HerosectionComponent implements OnInit, OnDestroy {
  placeholders: string[] = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    'Lorem ipsum dolor sit amet, consectetur',
    'Lorem ipsum dolor sit amet, consectetur sed do eiusmod tempor incididunt ut labore',
    'Lorem ipsum dolor sit amet, consectetur sed do eiusmod tempor'
  ];
  currentPlaceholder: string = '';
  userInput: string = '';
  private intervalId: any;
  private index = 0;

  ngOnInit(): void {
    this.rotatePlaceholder();
    this.intervalId = setInterval(this.rotatePlaceholder.bind(this), 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  rotatePlaceholder() {
    this.currentPlaceholder = this.placeholders[this.index];
    this.index = (this.index + 1) % this.placeholders.length;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab' && this.userInput.trim() === '') {
      event.preventDefault(); // Prevent tabbing out of input
      this.userInput = this.currentPlaceholder;
    }
  }

  fillPlaceholder() {
    if (!this.userInput.trim()) {
      this.userInput = this.currentPlaceholder;
    }
  }

  submitInput() {
  if (this.userInput.trim()) {
    console.log('Submitted:', this.userInput);
    this.userInput = '';
  }
}

@ViewChild('mirror') mirror!: ElementRef;
@ViewChild('textArea') textArea!: ElementRef;

tabStyle = {
  position: 'absolute',
  top: '16px',
  left: '0px' // Will be updated
};

updateTabPosition() {
  setTimeout(() => {
    const mirrorEl = this.mirror.nativeElement;
    const textAreaEl = this.textArea.nativeElement;

    const mirrorRect = mirrorEl.getBoundingClientRect();
    const textAreaRect = textAreaEl.getBoundingClientRect();

    const paddingLeft = parseInt(getComputedStyle(textAreaEl).paddingLeft || '0');

    // Calculate relative left position
    const offsetLeft = mirrorRect.width + paddingLeft;

    this.tabStyle = {
      ...this.tabStyle,
      left: `${Math.min(offsetLeft + 10, textAreaEl.clientWidth - 60)}px` // limit overflow
    };
  });
}
}