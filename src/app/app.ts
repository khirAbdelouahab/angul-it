import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CaptchaComponent } from './captcha-component/captcha-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CaptchaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angul-it');
}
