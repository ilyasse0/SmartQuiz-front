import {Component, OnInit, OnDestroy} from '@angular/core';
import {QcmSetDtoToAttempt} from '../../models/qcm';
import {QcmService} from '../../services/qcm.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription, interval} from 'rxjs';

@Component({
  selector: 'app-qcm-attempt',
  standalone: false,
  templateUrl: './qcm-attempt.component.html',
  styleUrl: './qcm-attempt.component.css'
})
export class QcmAttemptComponent implements OnInit, OnDestroy {
  qcmSet!: QcmSetDtoToAttempt;
  selectedOptions : {[questionId : number] : number} = {};

  remainingTime: Date = new Date(0, 0, 0, 0, 30, 0); // 30 minutes by default
  private timerSubscription: Subscription | null = null;
  timerWarning = false;
  timerDanger = false;

  constructor(
    private qcmService: QcmService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.qcmService.getQcmToAttempt(id).subscribe(data => {
      this.qcmSet = data;

      // // Optional: Set timer based on quiz duration if available in your model
      // if (this.qcmSet && this.qcmSet.duration) {
      //   this.remainingTime = new Date(0, 0, 0, 0, this.qcmSet.duration, 0);
      // }
    });
    //start tha time
    this.startTimer();
  }

  ngOnDestroy(): void {
    // Clean up the timer when the component is destroyed
    // if (this.timerSubscription) {
    //   this.timerSubscription.unsubscribe();
    // }
  }

  selectOption(questionId: number, optionId: number) {
    this.selectedOptions[questionId] = optionId;
  }

  submitQcm() {
    // Stop the timer when submitting
    // if (this.timerSubscription) {
    //   this.timerSubscription.unsubscribe();
    // }


    const answers = Object.entries(this.selectedOptions).map(([questionId, selectedOption]) => ({
      questionId: +questionId,
      selectedOption: selectedOption
    }));

    const attemptRequest = {
      qcmSetId: this.qcmSet.qcmSetId,
      answers: answers
    };

    this.qcmService.submitAttempt(attemptRequest).subscribe(
      {
        next: (response) => {
          alert("QCM Submitted! Your score :"+response.score);
        },
        error:(err)=>{
          console.error("oops somthing went wrong!", err);
          alert("error please check the log")
        }
      }
    );

  }

  // Timer methods
  startTimer(): void {
    // Create a timer that ticks every second
    this.timerSubscription = interval(1000).subscribe(() => {
      // Subtract 1 second from the remaining time
      const totalSeconds = this.remainingTime.getTime() / 1000 - 1;

      if (totalSeconds <= 0) {
        // Time's up - auto submit the quiz
        this.handleTimeUp();
        return;
      }

      // Convert seconds back to Date
      this.remainingTime = new Date(totalSeconds * 1000);

      // Set warning classes when time is running low
      const minutesLeft = Math.floor(totalSeconds / 60);
      if (minutesLeft <= 5) {
        this.timerDanger = minutesLeft <= 2;
        this.timerWarning = !this.timerDanger && minutesLeft <= 5;
      }
    });
  }

  handleTimeUp(): void {
    // if (this.timerSubscription) {
    //   this.timerSubscription.unsubscribe();
    // }

    // // Auto-submit the quiz
    // this.submitQcm();

    // Optionally show a time's up message
    //alert('Time\'s up! Your answers have been submitted.');
  }

  resetQuiz(): void {
    // Clear all selections
    this.selectedOptions = {};

    // Reset the timer
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

  //   // Reset to default or quiz-specific duration
  //   //if (this.qcmSet && this.qcmSet.duration) {
  //     this.remainingTime = new Date(0, 0, 0, 0, this.qcmSet.duration, 0);
  //   } else {
  //     this.remainingTime = new Date(0, 0, 0, 0, 30, 0); // 30 minutes default
  //   }
  //
  //   this.startTimer();
  }
}
