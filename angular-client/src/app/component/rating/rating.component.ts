import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RateService} from "../../service/rate.service";

@Component({
  selector: 'rating-template',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})

export class RatingComponent implements OnInit {

  @Input() currentRate;
  @Input() gameId;
  @Input() readonly: boolean;
  @Input() isOverallRate: boolean;
  @Output() rateChange = new EventEmitter<number>();
  successMessage = '';

  constructor(public rateService: RateService) {
  }

  ngOnInit() {
  }

  onRateChange(rating: number) {
    this.rateService.update(this.gameId, this.currentRate).subscribe(
      response => {
        if (response.status != 200) {
          this.successMessage = "An error Occured!";
        }
      }
    )
  }
}
