import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import 'animate.css';
import { Question } from '../../core/models/question.model';
import { Option } from '../../core/models/option.model';
import { QuestionService } from '../../core/services/question.service';
import { FormsModule } from '@angular/forms';
import { Configuration } from '../../core/models/configuration.model';
import { ConfigurationService } from '../../core/services/configuration.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit {

  configuration: Configuration = {} as Configuration;
  questions: Question[] = [];
  questionNr: number = 0;
  maxProgress: number = 0;

  questionTitle: string = '';
  questionOptions: Option[] = [];
  selectedOptionId: number | undefined;
  rightAnswers = true;

  howManyQuestions: number = +(localStorage.getItem('questionsNumber') ?? 24);

  constructor(private router: Router, private questionService: QuestionService, private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.getConfiguration();
    this.getQuestionsFromConfiguration();
    this.randomSortQuestions();
    this.getQuestionsPool();
    this.saveQuestions();
    this.setTitleAndOptions();
    this.randomSortOptions();
  }

  getConfiguration() {
    this.configuration = this.configurationService.getConfiguration();
  }

  getQuestionsFromConfiguration() {
    this.configuration.default.forEach((obj, index) => {
      let options: Option[] = [];
      obj.options.forEach((optObj, index) => {
        options.push({
          id: index,
          text: optObj,
          right: index == 0
        });
      });
      this.questions.push({
        id: index,
        title: obj.title,
        options
      });
    });
  }

  shuffle = (array: Object[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  };

  randomSortQuestions() {
    this.questions = this.shuffle(this.questions) as Question[];
  }

  randomSortOptions() {
    this.questionOptions = this.shuffle(this.questionOptions) as Option[];
  }

  getQuestionsPool() {
    this.questions = this.questions.slice(0, this.howManyQuestions);
  }

  saveQuestions() {
    this.questionService.saveQuestions(this.questions);
  }

  setTitleAndOptions() {
    this.questionTitle = this.questions[this.questionNr].title.replaceAll("\n", "<br>");
    this.questionOptions = this.questions[this.questionNr].options;
    this.questionOptions.forEach((opt, index) => {
      opt.text = opt.text.replaceAll("\n", "<br>");
      this.questionOptions[index] = opt;
    });
  }

  selectOption(option: {id: number, text: string}) {
    if (this.selectedOptionId === option.id) {
      // deselect option
      this.selectedOptionId = undefined;
      this.questions[this.questionNr].chosenOptionId = undefined;
    } else {
      this.selectedOptionId = option.id;
      this.questions[this.questionNr].chosenOptionId = option.id;
    }
  }

  nextQuestion() {
    this.questionService.saveQuestion(this.questions[this.questionNr]);
    if (this.questionNr < this.questions.length-1) {
      this.questionNr++;
      this.maxProgress = Math.max(this.questionNr, this.maxProgress);
      this.resetQuestion();
      if (this.selectedOptionId === undefined && this.questionNr == this.maxProgress) {
        this.randomSortOptions();
      }
    } else {
      this.router.navigateByUrl(`/results`);
    }
  }

  previousQuestion() {
    if (this.questionNr > 0) {
      this.questionNr--;
      this.resetQuestion();
    } else {
      this.router.navigateByUrl(`/home`);
    }
  }

  resetQuestion() {
    this.setTitleAndOptions();
    this.selectedOptionId = this.questions[this.questionNr].chosenOptionId;
  }
  
}
