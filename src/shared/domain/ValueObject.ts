import { DomainError } from '../core/DomainError';

interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  protected constructor(values: T) {
    if (values === undefined) {
      throw new DomainError('ValueObject: values cannot be undefined.');
    }

    this.ensureValidFormat(values);

    this.props = {
      ...values,
    };
  }

  protected abstract ensureValidFormat(value: T): void;
}
