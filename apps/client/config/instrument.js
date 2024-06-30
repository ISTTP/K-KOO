import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://7e8f4d5f24897257ea4f3720b9f0e90b@o4507490971615232.ingest.us.sentry.io/4507491008905216", //이벤트 전송 위한 식별 키
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});

