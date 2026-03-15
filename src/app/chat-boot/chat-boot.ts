import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

@Component({
  selector: 'app-chat-boot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-boot.html',
  styleUrl: './chat-boot.css',
})

export class ChatBoot {
  // Using Signals for modern state management
  private getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning! ☀️';
    if (hour < 17) return 'Good Afternoon! ☕';
    return 'Good Evening! 🌙';
  }
  userInput = signal('');
  showSuggestions = signal(true);
  showExtraSuggestions = signal(false);

  messages = signal<Message[]>([
    {
      text: `${this.getGreeting()} How may I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  private responses: Record<string, string> = {
    "delivery issues": "Our standard delivery takes 3-5 business days. You can track your order in the 'My Orders' section.",
    "payment issues": "We accept Visa, Mastercard, and PayPal. If your payment failed, please check your bank balance.",
    "return policy": "You can return any item within 30 days of purchase.",
    "more...": "Product Details",
    "default": "I'm not sure about that. Would you like to speak to a human agent?"
  };

  toggleMore() {
    this.showExtraSuggestions.set(!this.showExtraSuggestions());
  }

  sendMessage(text?: string) {
    const messageText = text || this.userInput();
    if (!messageText.trim()) return;

    this.messages.update(prev => [...prev, {
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }]);
    this.userInput.set('');
    this.showSuggestions.set(false);
    this.showExtraSuggestions.set(false);

    setTimeout(() => {
      const reply = this.responses[messageText.toLowerCase()] || this.responses['default'];
      this.messages.update(prev => [...prev,
      {
        text: reply,
        sender: 'bot',
        timestamp: new Date()
      }]);

      this.showSuggestions.set(true);
      // Auto-scroll logic inside the timeout to ensure message is rendered
    }, 1000);
    setTimeout(() => this.scrollToBottom(), 1200);
  }
  private scrollToBottom() {
    const chatBox = document.querySelector('.chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
}