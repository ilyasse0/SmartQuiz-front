import {Component, OnInit ,  AfterViewInit} from '@angular/core';
import {QcmDto, QcmService} from '../../services/qcm.service';

@Component({
  selector: 'app-qcm-public',
  standalone: false,
  templateUrl: './qcm-public.component.html',
  styleUrl: './qcm-public.component.css'
})
export class QcmPublicComponent implements OnInit, AfterViewInit {

  qcms: QcmDto[] = [];
  filteredQcms: QcmDto[] = [];
  searchTerm = '';
  topicSearchTerm = '';
  popularTopics: string[] = []; // This will be populated from API data
  loading = false;
  error: string | null = null;

  constructor(private qcmService: QcmService) {
  }

  ngOnInit(): void {
    this.loadQcms();
    this.extractPopularTopics();


    // After loading QCMs, extract unique topics for filtering
    this.extractPopularTopics();
  }

  ngAfterViewInit(): void {
    this.animateCards();
  }

  loadQcms(): void {
    this.loading = true;
    this.qcmService.getPublicQcms().subscribe({
      next: (data) => {
        this.qcms = data;
        this.applySearchFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des QCM publics';
        this.loading = false;
      }
    });
  }

  applySearchFilters(): void {
    const keyword = this.searchTerm.toLowerCase();
    const topic = this.topicSearchTerm.toLowerCase();

    this.filteredQcms = this.qcms.filter(qcm => {
      const matchKeyword = keyword ? qcm.title.toLowerCase().includes(keyword) : true;
      const matchTopic = topic ? qcm.topic.toLowerCase().includes(topic) : true;
      return matchKeyword && matchTopic;
    });

    this.animateCards();
  }


  onSearchChange(): void {
    this.topicSearchTerm = '';
    this.applySearchFilters();
  }

  onTopicSearchChange(): void {
    this.searchTerm = '';
    this.applySearchFilters();
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.topicSearchTerm = '';
    this.filteredQcms = this.qcms;
  }




  // Extract unique topics from loaded QCMs
  extractPopularTopics(): void {
    // Wait for qcms to load then extract unique topics
    this.qcmService.getPublicQcms().subscribe({
      next: (qcms) => {
        // Extract unique topics and take the top 10 most common
        const topicCounts = qcms.reduce((acc, qcm) => {
          const topic = qcm.topic.trim();
          acc[topic] = (acc[topic] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        this.popularTopics = Object.entries(topicCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(entry => entry[0]);
      },
      error: (err) => {
        console.error('Failed to load popular topics', err);
      }
    });
  }

  // Search specifically by topic
  searchByTopic(): void {
    if (!this.topicSearchTerm) {
      this.loadQcms();
      return;
    }

    this.searchTerm = ''; // Clear the general search term
    this.loading = true;
    this.error = null;

    this.qcmService.getPublicQcms(this.topicSearchTerm).subscribe({
      next: (qcms) => {
        // Filter only by exact topic match
        this.filteredQcms = qcms.filter(qcm =>
          qcm.topic.toLowerCase().includes(this.topicSearchTerm.toLowerCase())
        );
        this.loading = false;
        this.animateCards();
      },
      error: (err) => {
        this.error = 'Failed to load quizzes. Please try again later.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Select a topic from the popular topics list
  selectTopic(topic: string): void {
    this.topicSearchTerm = topic;
    this.searchByTopic();

    // Switch to the topic tab
    const topicTab = document.querySelector('#search-by-topic-tab') as HTMLElement;
    if (topicTab) {
      topicTab.click();
    }
  }



  animateCards(): void {
    const cards = document.querySelectorAll('.col-md-6');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.setProperty('--animation-order', index.toString());
    });
  }



}
