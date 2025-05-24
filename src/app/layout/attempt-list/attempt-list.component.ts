import {Component, OnInit} from '@angular/core';
import {AttemptDto, AttemptQcmService} from '../../services/attempt-qcm.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-attempt-list',
  standalone: false,
  templateUrl: './attempt-list.component.html',
  styleUrl: './attempt-list.component.css'
})
export class AttemptListComponent implements OnInit {
  attempts : AttemptDto[] =  [];
  loading : boolean = false;
  error : string | null = null;


  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';


  constructor( private attemptService : AttemptQcmService) {}

  ngOnInit(): void {
    this.loading = true;
    this.attemptService.getUserAttempts().subscribe({
      next: data => {
        this.attempts = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Erreur lors du chargement des tentatives';
        this.loading = false;
      }
    });
  }
  get filteredAttempts(): AttemptDto[] {
    return this.attempts.filter(attempt =>
      attempt.qcmSetId.toString().includes(this.searchTerm.toLowerCase()) ||
      attempt.score.toString().includes(this.searchTerm.toLowerCase()) ||
      (attempt.startedAt && attempt.startedAt.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  get totalPages(): number {
    return Math.ceil(this.attempts.length / this.itemsPerPage);
  }

  get paginatedAttempts(): AttemptDto[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAttempts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
