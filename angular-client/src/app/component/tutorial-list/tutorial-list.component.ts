import {Component, OnInit} from '@angular/core';
import {Tutorial} from "../../model/tutorial.model";
import {Router} from "@angular/router";
import {TableService} from "../../service/table.service";
import {TutorialService} from "../../service/tutorial.service";

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {

  dataSource: Tutorial[];

  constructor(private router: Router, private tutorialService: TutorialService, public tableService: TableService) {
  }

  ngOnInit() {
    this.tutorialService.getAllTutorials().subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }
}
