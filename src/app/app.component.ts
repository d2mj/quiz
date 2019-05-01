import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  questions;
  number = 0;
  userAns = [];
  showScore = false;
  ansArray = [];
  totalScore = 0;
  showSelectOption = true;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getQuestions().subscribe(ques => {
      console.log('ques: ', ques);
      this.questions = ques;
      this.ansArray = this.questions.map(q => q.answer);
    });
  }

  selectAns(qno, ans) {
    console.log('que no - ', qno, 'ans is - ', ans);
    this.userAns[qno] = ans;
    if (this.questions.length > this.number + 1) {
      // this.number = this.number + 1;
      if (this.ansArray[qno] === this.userAns[qno]) {
        ++this.totalScore;
      }
    } else {
      // show score
      this.showScore = true;
    }

  }

  showNextQuestion() {
    this.number = this.number + 1;
    this.showSelectOption = null;
    setTimeout(() => {
      this.showSelectOption = true;
    }, 100);
  }

}
