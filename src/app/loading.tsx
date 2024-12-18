'use client';

import { Loader } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
