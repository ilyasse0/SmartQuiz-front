import {Component, OnInit} from '@angular/core';
import {QcmDto, QcmService} from '../../services/qcm.service';

@Component({
  selector: 'app-qcm-public',
  standalone: false,
  templateUrl: './qcm-public.component.html',
  styleUrl: './qcm-public.component.css'
})
export class QcmPublicComponent implements  OnInit{

  qcms: QcmDto[] = [];
  filteredQcms: QcmDto[] = [];
  searchTerm = '';
  loading = false;
  error: string | null = null;


  constructor(private qcmService : QcmService) {
  }
  ngOnInit(): void {
    this.loadQcms();

  }

  loadQcms(keyword: string = ''): void {
    this.loading = true;
    this.qcmService.getPublicQcms(keyword).subscribe({
      next: (data) => {
        this.qcms = data;
        this.filteredQcms = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des QCM publics';
        this.loading = false;
      }
    });
  }

}
