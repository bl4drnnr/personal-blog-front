import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'component-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() placeholder: string = 'Search projects...';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }
}
