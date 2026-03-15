import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBoot } from "./chat-boot/chat-boot";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatBoot],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MyChatApp');
}
