export interface IDomainException {
  statusCode: number;
  message: string[];
  error: string;
}

export class DomainError extends Error {
  constructor(
    public readonly message = 'Domain Error',
    private readonly status = 406,
  ) {
    super(message);
    Object.setPrototypeOf(this, DomainError.prototype);
  }

  getStatus() {
    return this.status;
  }

  getResponse(): IDomainException {
    return {
      statusCode: this.status,
      message: [this.message],
      error: 'Domain Error',
    };
  }
}
