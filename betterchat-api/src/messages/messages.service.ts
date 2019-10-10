import { User } from './../entity/user.entity';
import { Message } from './../entity/message.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async getMessages(
    user1: User,
    user2: User,
    order: 'ASC' | 'DESC' | 1 | -1 = 'ASC',
  ): Promise<Message[]> {
    try {
      const messages = await this.messageRepository.find({
        where: [
          { sentFrom: user1, sentTo: user2 },
          { sentFrom: user2, sentTo: user1 },
        ],
        order: { created: order },
      });
      return messages;
    } catch (err) {
      console.error(err);
    }
  }

  async createMessage(sentFrom: User, sentTo: User, text: string) {
    try {
      const message: Message = { sentFrom, sentTo, text };
      await this.messageRepository.insert(message);
    } catch (err) {
      console.error(err);
    }
  }
  async updateMessage(messageId: string, text: string) {
    try {
      await this.messageRepository.update(messageId, { text, wasEdited: true });
    } catch (err) {
      console.error(err);
    }
  }
  async deleteMessage(messageId: string) {
    try {
      await this.messageRepository.delete(messageId);
    } catch (err) {
      console.error(err);
    }
  }
  async getMessageById(messageId: string) {
    try {
      const message = this.messageRepository.findOne(messageId);
      return message;
    } catch (err) {
      console.error(err);
    }
  }
}
