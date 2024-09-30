// context/EventContext.tsx
"use client"
import dayjs, { Dayjs } from 'dayjs';
import React, { createContext, ReactNode, useContext, useState } from 'react';

import { EventAgendaProps } from '@/components/buildEventAgenda/types';

import { GetSpeakersRespond } from '@/app/api/speaker/getspeakers/types';


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
  eventSpeakers: GetSpeakersRespond[];
  setEventSpeakers: (speakers: GetSpeakersRespond[]) => void;
  selectedFormUUID: string | undefined;
  setSelectedFormUUID: (form: string) => void;
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
  const [eventSpeakers, setEventSpeakers] = useState<GetSpeakersRespond[]>([]);
  const [selectedFormUUID, setSelectedFormUUID] = useState<string>("");
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
      selectedFormUUID, setSelectedFormUUID,
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