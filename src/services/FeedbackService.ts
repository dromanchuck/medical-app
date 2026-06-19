import { BaseService } from './BaseService';

class FeedbackService extends BaseService {
  public async sendFeedback(message: string, theme?: string) {
    const body = { text: message, theme };

    return this.post('', body);
  }
}

export const feedbackService = new FeedbackService();
