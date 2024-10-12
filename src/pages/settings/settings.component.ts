import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'animate.css';
import { ConfigurationService } from '../../core/services/configuration.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: `./settings.component.html`,
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  
  modalSuccess: boolean = true;
  modalText: string = '';
  showModal: boolean = false;
  questionsNumber: number = +(localStorage.getItem('questionsNumber') ?? 24);
  rightQuestionsNumber: number = +(localStorage.getItem('rightQuestionsNumber') ?? 18);
  alg: string = localStorage.getItem('algorithm') ?? 'random';
  subject: string = localStorage.getItem('subject') ?? '';

  constructor(private configurationService: ConfigurationService, private cd: ChangeDetectorRef) {}

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];
    const fileReader = new FileReader();

    if (file) {
      fileReader.onload = () => {
        const text = (fileReader.result as string).replaceAll("ˈ", "'").replaceAll("`", "'").replaceAll(/1\)/g, "1.").replaceAll(/2\)/g, "2.").replaceAll(/3\)/g, "3.").replaceAll(/4\)/g, "4.").replaceAll(/5\)/g, "5.").replaceAll(/6\)/g, "6.").replaceAll(/7\)/g, "7.");
        try {
          const configuration = {
            default: JSON.parse(text)
          };
          this.configurationService.saveConfiguration(configuration);
          this.modalSuccess = true;
          this.modalText = "Domande caricate correttamente";
        } catch (error) {
          this.modalSuccess = false;
          this.modalText = "Errore nel caricamento del file, controlla il messaggio:<br>" + error;
        } finally {
          this.showModal = true;
          this.cd.detectChanges();
        }
      }
      fileReader.readAsText(file);
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  selectQuestionsNumber(event: Event) {
    localStorage.setItem('questionsNumber', (event.target as any).value);
  }

  selectRightQuestionsNumber(event: Event) {
    localStorage.setItem('rightQuestionsNumber', (event.target as any).value);
  }

  selectAlgorithm(alg: string) {
    localStorage.setItem('algorithm', alg);
  }

  selectSubject(event: Event) {
    localStorage.setItem('subject', (event.target as any).value);
  }
}
