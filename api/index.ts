import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import type { Request, Response } from 'express';

let cachedApp: Awaited<ReturnType<typeof NestFactory.create>> | null = null;

async function getApp() {
  if (cachedApp) return cachedApp;
  cachedApp = await NestFactory.create(AppModule);
  cachedApp.enableCors();
  await cachedApp.init();
  return cachedApp;
}

export default async function handler(req: Request, res: Response) {
  try {
    const app = await getApp();
    const expressHandler = app.getHttpAdapter().getInstance();
    expressHandler(req, res);
  } catch (err) {
    console.error('Function invocation failed:', err);
    res.status(500).json({
      error: 'FUNCTION_INVOCATION_FAILED',
      message: err instanceof Error ? err.message : 'Unknown error',
    });
  }
}
