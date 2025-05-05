import { Component } from '@angular/core';
import {QcmService, QcmSet} from '../../services/qcm.service';
import { HttpErrorResponse } from '@angular/common/http';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-qcm-generator',
  standalone: false,
  templateUrl: './qcm-generator.component.html',
  styleUrl: './qcm-generator.component.css'
})
export class QcmGeneratorComponent {
  selectedFile: File | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  generatedQcm: QcmSet | null = null;

  constructor(private qcmService: QcmService,) {}


  ngOnInit(): void {
  }
  /**
   * Handles file input change event
   * @param event The file input change event
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = null;
    }
  }

  /**
   * Validates the selected file before upload
   * we can also add a filter to check the file type and size and more
   * depends on our future needs
   */
  private validateFile(): boolean {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file.';
      return false;
    }
    // Add any additional file validation logic here
    // For example, check file type or size
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(this.selectedFile.type)) {
      this.errorMessage = 'Invalid file type. Please upload a PDF, Word document, or text file.';
      return false;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (this.selectedFile.size > maxSize) {
      this.errorMessage = 'File is too large. Maximum allowed size is 10MB.';
      return false;
    }

    return true;
  }
  /**
   * Uploads the file and generates QCM
   */
  generateQcm(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file first';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.generatedQcm = null;

    // Get the token from your authentication service
    const token = localStorage.getItem('token'); // Adjust this based on how you store your token

    if (!token) {
      this.errorMessage = 'Please log in first';
      this.isLoading = false;
      return;
    }

    // No need to send userDetails since it's in the token
    const userDetails = null;

    this.qcmService.generateQcm(this.selectedFile, userDetails)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: QcmSet) => {
          console.log('QCM generated successfully:', response);
          this.generatedQcm = response;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error generating QCM:', error);
          this.errorMessage = error.error?.message ||
            error.statusText ||
            'Failed to generate QCM. Please try again.';
        }
      });
  }
}
