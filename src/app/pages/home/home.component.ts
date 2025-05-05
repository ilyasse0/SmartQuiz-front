import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { QcmService } from '../../services/qcm.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent {
  selectedFile: File | null = null;
  isGenerating: boolean = false;
  generationProgress: number = 0;

  constructor(
    //private qcmService: QcmService,
    private router: Router
  ) {
  }

  onPdfUploaded(file: File): void {
    this.selectedFile = file;
    console.log('File selected:', file.name);
  }

  generateQCM(): void {
    if (!this.selectedFile) {
      return;
    }

    this.isGenerating = true;
  }
}




