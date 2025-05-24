import { Component } from '@angular/core';
import { QcmService, QcmSet } from '../../services/qcm.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-qcm-generator',
  standalone: false,
  templateUrl: './qcm-generator.component.html',
  styleUrl: './qcm-generator.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class QcmGeneratorComponent {
  qcmTopic = '';
  qcmTitle = '';
  selectedFile: File | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  generatedQcm: QcmSet | null = null;
  isHovering = false;

  constructor(private qcmService: QcmService) {}

  ngOnInit(): void {
    // Initialize component
  }

  /**
   * Handles file input change event
   * @param event The file input change event
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateFileType(file)) {
        this.selectedFile = file;
        this.errorMessage = null;
      }
    }
  }

  /**
   * Handles file drop event for drag and drop functionality
   * @param event The drop event
   */
  handleFileDrop(event: DragEvent): void {
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (this.validateFileType(file)) {
        this.selectedFile = file;
        this.errorMessage = null;
      }
    }
  }

  /**
   * Validates file type
   * @param file The file to validate
   * @returns boolean indicating if file type is valid
   */
  validateFileType(file: File): boolean {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Invalid file type. Please upload a PDF, Word document, or text file.';
      return false;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      this.errorMessage = 'File is too large. Maximum allowed size is 10MB.';
      return false;
    }

    return true;
  }

  /**
   * Clears the selected file
   */
  clearSelectedFile(): void {
    this.selectedFile = null;
  }

  /**
   * Calculates average number of options per question
   */
  getAverageOptions(): string {
    if (!this.generatedQcm || !this.generatedQcm.questions || !this.generatedQcm.questions.length) return '0';

    const totalOptions = this.generatedQcm.questions.reduce((sum, q) => sum + q.options.length, 0);
    return (totalOptions / this.generatedQcm.questions.length).toFixed(1);
  }

  /**
   * Returns difficulty level based on number of questions and complexity
   */
  getDifficultyLevel(): string {
    if (!this.generatedQcm || !this.generatedQcm.questions || !this.generatedQcm.questions.length) return 'N/A';

    const questionCount = this.generatedQcm.questions.length;
    if (questionCount <= 5) return 'Easy';
    if (questionCount <= 10) return 'Medium';
    return 'Hard';
  }

  /**
   * Generate and download QCM as PDF with console debugging
   */

  /**
   * Uploads the file and generates QCM
   */
  generateQcm(): void {
    if (!this.selectedFile || !this.qcmTopic.trim() || !this.qcmTitle.trim()) {
      this.errorMessage = 'Please fill in all fields and select a file';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.generatedQcm = null;

    // Get the token from your authentication service
    const token = localStorage.getItem('token');

    if (!token) {
      this.errorMessage = 'Authentication required. Please log in first.';
      this.isLoading = false;
      return;
    }

    // No need to send userDetails since it's in the token
    const userDetails = null;

    this.qcmService.generateQcm(this.selectedFile, userDetails, this.qcmTopic, this.qcmTitle)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: QcmSet) => {
          console.log('QCM generated successfully:', response);
          this.generatedQcm = response;

          // Scroll to results after a brief delay
          setTimeout(() => {
            const resultSection = document.querySelector('.result-section');
            resultSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 500);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error generating QCM:', error);
          this.errorMessage = error.error?.message ||
            error.statusText ||
            'Failed to generate quiz. Please try again.';
        }
      });
  }

}
