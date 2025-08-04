import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kyc-preview-component',
  imports: [],
  templateUrl: './kyc-preview-component.html',
  styleUrl: './kyc-preview-component.css'
})
export class KycPreviewComponent {
  @Input() imageUrls: string[] = [];
  imageLoadErrors: Set<number> = new Set();

  previewImage(url: string): void {
    if (!url) return;
    window.open(url, '_blank');
  }

  downloadImage(url: string, index: number): void {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = `aadhar-card-${index + 1}.jpg`;
    link.click();
  }

  handleError(index: number): void {
    this.imageLoadErrors.add(index);
  }
}
