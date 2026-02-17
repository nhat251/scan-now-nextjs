import { consola } from "consola";

type Options = {
  prefix: string;
  message: string | Record<string, unknown>;
  data?: unknown;
};

class Log {
  static info({ prefix, message, data }: Options): void {
    const logger = consola.withTag(prefix);
    if (data !== undefined) {
      logger.info(message, data);
      return;
    }
    logger.info(message);
  }

  static warn({ prefix, message, data }: Options): void {
    const logger = consola.withTag(prefix);
    if (data !== undefined) {
      logger.warn(message, data);
      return;
    }
    logger.warn(message);
  }

  static error({ prefix, message, data }: Options): void {
    const logger = consola.withTag(prefix);
    if (data !== undefined) {
      logger.error(message, data);
      return;
    }
    logger.error(message);
  }

  static debug({ prefix, message, data }: Options): void {
    const logger = consola.withTag(prefix);
    if (data !== undefined) {
      logger.debug(message, data);
      return;
    }
    logger.debug(message);
  }
}

export { Log };
