import {Component, OnInit} from '@angular/core';
import {QcmService, ReviewDto, ReviewedQuestion} from '../../services/qcm.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-qcm-review',
  standalone: false,
  templateUrl: './qcm-review.component.html',
  styleUrl: './qcm-review.component.css'
})


export class QcmReviewComponent implements OnInit {
  reviewData!: ReviewDto;


  constructor(
    private route: ActivatedRoute,
    private qcmService: QcmService
  ) {}

  ngOnInit(): void {
    const attemptId = Number(this.route.snapshot.paramMap.get('attemptId'));
    this.qcmService.getReviewAttempt(attemptId).subscribe(data => {
      this.reviewData = data;
    });
  }

  isSelected(optionLabel: string, question: ReviewedQuestion): boolean {
    return question.selectedOption === optionLabel;
  }

  isCorrect(optionLabel: string, question: ReviewedQuestion): boolean {
    return question.correctOption === optionLabel;
  }

}
