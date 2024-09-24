// context/EventContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { EventAgendaProps } from '@/components/buildEventAgenda/types';

interface EventContextProps {
  eventName: string;
  setEventName: (name: string) => void;
  eventDescription: string;
  setEventDescription: (description: string) => void;
  eventDate: Dayjs | null;
  setEventDate: (date: Dayjs | null) => void;
  eventTime: Dayjs | null;
  setEventTime: (time: Dayjs | null) => void;
  eventLocation: string;
  setEventLocation: (location: string) => void;
  eventAgenda: EventAgendaProps[];
  setEventAgenda: (agenda: EventAgendaProps[]) => void;
  eventSpeakers: string[];
  setEventSpeakers: (speakers: string[]) => void;
  selectedForm: number | undefined;
  setSelectedForm: (form: number | undefined) => void;
  htmlContent: string;
  setHtmlContent: (content: string) => void;
  template: string;
  setTemplate: (template: string) => void; // Update the type of setTemplate
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState<Dayjs | null>(null);
  const [eventTime, setEventTime] = useState<Dayjs | null>(null);
  const [eventLocation, setEventLocation] = useState('');
  const [eventAgenda, setEventAgenda] = useState<EventAgendaProps[]>([]);
  const [eventSpeakers, setEventSpeakers] = useState<string[]>([]);
  const [selectedForm, setSelectedForm] = useState<number | undefined>(undefined);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [template, setTemplate] = useState<string>("");

  return (
    <EventContext.Provider value={{
      eventName, setEventName,
      eventDescription, setEventDescription,
      eventDate, setEventDate,
      eventTime, setEventTime,
      eventLocation, setEventLocation,
      eventAgenda, setEventAgenda,
      eventSpeakers, setEventSpeakers,
      selectedForm, setSelectedForm,
      htmlContent, setHtmlContent,
      template, setTemplate
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};