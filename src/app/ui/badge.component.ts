import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  template: `<span class="badge">{{text}}</span>`,
  styles: ['.badge{background:#eef2ff;color:#3730a3;padding:0.2rem 0.4rem;border-radius:999px;font-size:0.75rem}'],
})
export class BadgeComponent { @Input() text = ''; }
