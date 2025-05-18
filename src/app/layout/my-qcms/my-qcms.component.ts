import {Component, OnInit} from '@angular/core';
import {QcmDto, QcmService} from '../../services/qcm.service';

@Component({
  selector: 'app-my-qcms',
  standalone: false,
  templateUrl: './my-qcms.component.html',
  styleUrl: './my-qcms.component.css'
})
export class MyQcmsComponent implements OnInit{
  qcms: QcmDto[] = [];
  loading = true;
  error: string | null = null;

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
}
