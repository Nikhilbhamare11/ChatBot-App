import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoot } from './chat-boot';

describe('ChatBoot', () => {
  let component: ChatBoot;
  let fixture: ComponentFixture<ChatBoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBoot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
