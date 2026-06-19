import * as Sentry from '@sentry/react-native';

class ReportService {
  private reporter = Sentry;

  public reportError(error: any) {
    if (
      error?.response?.status === 401 &&
      error?.response?.data.error === 'invalid_token'
    ) {
      return;
    }

    this.reporter.captureException(error);
  }

  public reportMsg(message: string) {
    this.reporter.captureMessage(message);
  }
}

export const reportService = new ReportService();
