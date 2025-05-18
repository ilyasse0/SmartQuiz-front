import {Component, OnInit} from '@angular/core';
import {AttemptDto, AttemptQcmService} from '../../services/attempt-qcm.service';

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

  constructor( private attemptService : AttemptQcmService) {}

  ngOnInit(): void {
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
}
