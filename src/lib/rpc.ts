import { hc } from 'hono/client';

import { type AppType } from '@/app/api/[[...route]]/route';
import { APP_URL } from '@/config';

export const client = hc<AppType>(APP_URL);
