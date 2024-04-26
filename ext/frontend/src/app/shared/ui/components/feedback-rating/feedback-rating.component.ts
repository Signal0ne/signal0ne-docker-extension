import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-feedback-rating',
  templateUrl: './feedback-rating.component.html',
  styleUrls: ['./feedback-rating.component.scss'],
})
export class FeedbackRatingComponent {

  public selectedIndex: number;

  @Output()
  public hideModal: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public sendFeedback: EventEmitter<number> = new EventEmitter<number>();

  public selectIndex(value: number): void {
    this.selectedIndex = value;
  }
}
