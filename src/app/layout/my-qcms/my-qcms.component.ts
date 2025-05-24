import  {Component, OnInit} from '@angular/core';
import {QcmDto, QcmService} from '../../services/qcm.service';
import {RouterLink} from '@angular/router';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-my-qcms',
  templateUrl: './my-qcms.component.html',
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    DatePipe,
    FormsModule
  ],
  styleUrl: './my-qcms.component.css'
})
export class MyQcmsComponent implements OnInit{
  qcms: QcmDto[] = [];
  loading = true;
  error: string | null = null;

  // for pagination and search func
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private qcmService: QcmService,) {}

  ngOnInit(): void {
    this.loadQcms()
  }

  loadQcms(): void {
    this.qcmService.getUserQcms().subscribe({
      next: data => {
        this.qcms = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des QCM';
        this.loading = false;
      }
    });
  }


  togglePublic(qcm: QcmDto) {
    this.qcmService.toggleQcmPublic(qcm.id).subscribe({
      next: response => {
        qcm.isPublic = response.public;
      },
      error: () => alert('Erreur lors du changement de visibilité')
    });
  }

  deleteQcm(qcm: any): void {
    if (confirm(`Are you sure you want to delete "${qcm.title}"?`)) {
      // Call your service to delete the QCM here
      console.log('Deleted:', qcm);
    }
  }

  get filteredQcms() {
    return this.qcms.filter(qcm =>
      qcm.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      qcm.topic.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredQcms.length / this.itemsPerPage);
  }

  get paginatedQcms() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredQcms.slice(start, start + this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
