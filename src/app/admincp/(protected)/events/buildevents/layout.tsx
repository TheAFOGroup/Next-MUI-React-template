import React from 'react';
import { EventProvider } from '@/hooks/useEventContext/useEventContext';

export default async function BuildEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EventProvider>
      {children}
    </EventProvider>
  );
}

