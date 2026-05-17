import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() variant: 'default' | 'ghost' | 'outline' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
