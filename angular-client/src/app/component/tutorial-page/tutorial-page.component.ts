import {Component, Input, OnInit} from '@angular/core';
import {Tutorial} from "../../model/tutorial.model";
import {TutorialService} from "../../service/tutorial.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tutorial-page',
  templateUrl: './tutorial-page.component.html',
  styleUrls: ['./tutorial-page.component.css']
})
export class TutorialPageComponent implements OnInit {

  @Input() tutorial: Tutorial = new Tutorial();

  constructor(private route: ActivatedRoute, private tutorialService: TutorialService) {
  }

  ngOnInit() {
    this.getTutorial();
  }

  getTutorial(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tutorialService.getTutorial(id).subscribe(
      tutorial => {
        this.tutorial = tutorial;
        console.log(tutorial);
      }
    );
  }

  downloadPdf() {
    const linkSource = this.tutorial.pdfFile;
    const downloadLink = document.createElement("a");
    const fileName = this.tutorial.title;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
