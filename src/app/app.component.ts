import { Component } from '@angular/core';
import { Appointment } from './appointment.type';
@Component({
  selector: 'my-app',
  template: `
    <pre>
    {{appointments|json}}
    </pre>
    <app-calendar [appointments]="appointments" 
      (requestNewAppointment)="onRequestNewAppointment($event)"
      (requestUpdateAppointment)="onRequestUpdateAppointment($event)"
      (appointmentUpdated)="onAppointmentUpdated($event)">
    </app-calendar>
    <app-appointment-detail 
      *ngIf="appointmentDetail" 
      [isNew]="isNew" 
      [appointment]="appointmentDetail" 
      (add)="onAdd($event)"
      (update)="onUpdate($event)"
      (close)="onCloseAppointmentDetail()">
    </app-appointment-detail>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isNew = null;
  appointmentDetail: Appointment;
  appointments: Appointment[] = [
    {
      id: new Date().getTime().toString(),
      title: 'event1',
      start: new Date()
    }
  ];

  onRequestNewAppointment(e: Appointment): void {
    this.isNew = true;
    this.appointmentDetail = e;
  }

  onRequestUpdateAppointment(e: Appointment): void {
    this.isNew = false;
    this.appointmentDetail = e;
  }

  onCloseAppointmentDetail(): void {
    this.appointmentDetail = null;
    this.isNew = null;
  }

  onAdd(appointment: Appointment): void {
    this.appointments = [...this.appointments, { id: new Date().getTime().toString(), ...appointment }];
    this.onCloseAppointmentDetail();
  }

  onUpdate(appointment: Appointment): void {
    this.appointments = this.appointments.map(
      a => a.id === appointment.id ? { ...a, ...appointment } : a
    );
    this.onCloseAppointmentDetail();
  }

  onAppointmentUpdated(appointment: Appointment): void {
    this.onUpdate(appointment);
  }
}
