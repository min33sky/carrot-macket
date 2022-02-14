namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DATABASE_URL: string;
    TWILIO_SID: string;
    TWILIO_TOKEN: string;
    TWILIO_MESSAGING_SERVICE_SID: string;
    MY_PHONE_NUMBER: string;
    SENDGRID_API_KEY: string;
  }
}
