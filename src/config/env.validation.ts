const VALID_NODE_ENVIRONMENTS = new Set(['development', 'test', 'production']);

function readString(config: Record<string, unknown>, key: string, fallback?: string): string {
  const rawValue = config[key];

  if (typeof rawValue === 'string' && rawValue.trim().length > 0) {
    return rawValue.trim();
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new Error(`La variable de entorno ${key} es obligatoria`);
}

function readInteger(
  config: Record<string, unknown>,
  key: string,
  fallback: number,
  min: number,
  max: number,
): number {
  const rawValue = config[key];
  const value = rawValue === undefined || rawValue === '' ? fallback : Number(rawValue);

  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`La variable de entorno ${key} debe ser un entero entre ${min} y ${max}`);
  }

  return value;
}

function readBoolean(config: Record<string, unknown>, key: string, fallback: boolean): boolean {
  const rawValue = config[key];

  if (rawValue === undefined || rawValue === '') {
    return fallback;
  }

  if (typeof rawValue === 'boolean') {
    return rawValue;
  }

  if (typeof rawValue === 'string') {
    const normalized = rawValue.trim().toLowerCase();

    if (['true', '1', 'yes'].includes(normalized)) {
      return true;
    }

    if (['false', '0', 'no'].includes(normalized)) {
      return false;
    }
  }

  throw new Error(`La variable de entorno ${key} debe ser true o false`);
}

export function validateEnvironment(config: Record<string, unknown>): Record<string, unknown> {
  const nodeEnv = readString(config, 'NODE_ENV', 'development');

  if (!VALID_NODE_ENVIRONMENTS.has(nodeEnv)) {
    throw new Error('NODE_ENV debe ser development, test o production');
  }

  const dbPassword = typeof config.DB_PASSWORD === 'string' ? config.DB_PASSWORD : '';

  if (nodeEnv === 'production' && dbPassword.length === 0) {
    throw new Error('DB_PASSWORD no puede estar vacío en producción');
  }

  return {
    ...config,
    NODE_ENV: nodeEnv,
    PORT: readInteger(config, 'PORT', 3000, 1, 65535),
    DB_HOST: readString(config, 'DB_HOST', 'localhost'),
    DB_PORT: readInteger(config, 'DB_PORT', 3306, 1, 65535),
    DB_USERNAME: readString(config, 'DB_USERNAME'),
    DB_PASSWORD: dbPassword,
    DB_DATABASE: readString(config, 'DB_DATABASE'),
    DB_SYNCHRONIZE: readBoolean(config, 'DB_SYNCHRONIZE', nodeEnv !== 'production'),
    CORS_ORIGINS: typeof config.CORS_ORIGINS === 'string' ? config.CORS_ORIGINS.trim() : '',
  };
}
