export class ResultEngineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResultEngineError";
  }
}

export class ValidationError extends ResultEngineError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
