import { Component, SimpleChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Appointment } from '../appointment.type';
@Component({
  selector: 'app-appointment-detail',
  template: `
    <h2 *ngIf="!isNew">Edit event: '{{appointment?.title}}'</h2>
    <h2 *ngIf="isNew">Create new event</h2>
    <form [formGroup]="form">
      <div class="form-group">
        <label>Title:
          <input type="text" formControlName="title"/>
        </label>
      </div>
       <div class="form-group">
        <label>Start date:
          <input type="text" formControlName="start"/>
        </label>
      </div>
       <div class="form-group">
        <label>End date:
          <input type="text" formControlName="end"/>
        </label>
      </div>
      <div class="form-group">
        <label>All day:
          <input type="checkbox" formControlName="allDay"/>
        </label>
      </div>
      <button type="submit" *ngIf="isNew" (click)="onAdd()">Add</button>
      <button type="submit" *ngIf="!isNew" (click)="onUpdate()">Update</button>
      <button type="button" (click)="close.emit()">Cancel</button>
    </form>
  `,
  styleUrls: ['./appointment-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentDetailComponent implements OnChanges {
  @Input() appointment: Appointment;
  @Input() isNew: boolean;
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter<Appointment>();
  @Output() update = new EventEmitter<Appointment>();
  form = this.formBuilder.group({
    title: [null, Validators.required],
    allDay: [null],
    start: [],
    end: []
  })
  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.appointment && simpleChanges.appointment.currentValue) {
      this.form.patchValue({ ...this.appointment });
    }
  }

  onAdd(): void {
    const { end, start, title, allDay } = this.form.value;
    this.add.emit({ end: end && new Date(end), start: start && new Date(start), title, allDay });
  }

  onUpdate(): void {
    const { end, start, title, allDay, id } = this.form.value;
    this.update.emit({ id: this.appointment.id, end: end && new Date(end), start: start && new Date(start), title, allDay });
  }
}