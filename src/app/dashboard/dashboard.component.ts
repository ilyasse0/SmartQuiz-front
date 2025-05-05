import { Component } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedFile: File | null = null;
  responseMessage: string = '';
  questions: any[] = []; // Variable to store the questions
  textExtracted: string = ''; // New variable to store extracted text


  constructor(private fileUploadService: FileUploadService) {}




  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      console.log("Uploading file:", file);
      this.fileUploadService.uploadFile(file).subscribe(
        (response: any) => {
          console.log("Response received:", response);
          this.textExtracted = response;
        },
        (error) => {
          console.error('Error uploading file', error);
        }
      );
    } else {
      console.error("No file selected");
    }
  }
}
