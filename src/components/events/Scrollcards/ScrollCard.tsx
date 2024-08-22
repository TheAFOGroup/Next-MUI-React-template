"use client";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { redirect } from 'next/navigation'

import usePrevious from '@/components/events/Scrollcards/usePrevious';

import { Speaker } from '@/app/api/events/getSpeakers/types';

import MediaCard from './MediaCardScroll';
import { Loading } from '@/components/Loading';


type ScrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

interface ScrollCardsProp {
  eventId: string
}

const ScrollCards: React.FC<ScrollCardsProp> = ({ eventId }) => {
  const [items, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPrev = usePrevious(items);
  const apiRef = React.useRef<ScrollVisibilityApiType | null>(null);


  useEffect(() => {
    fetch('/api/events/getSpeakers?event_id=' + eventId)
      .then(response => response.json())
      .then((data) => {
        setSpeakers(data as Speaker[])
        setLoading(false)
        if ((data as Speaker[]).length === 0) {
          redirect('/404');
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (items.length > (itemsPrev?.length || 0) && apiRef.current) {
      const lastItemId = items.slice(-1)?.[0]?.event_speaker_id;
      if (lastItemId) {
        const lastItemElement = (apiRef.current as any).getItemElementById?.(lastItemId);
        if (lastItemElement) {
          (apiRef.current as any).scrollToItem(lastItemElement);
        }
      }
    }
  }, [items, itemsPrev]);


  if (loading) {
    return (
      <Loading />
    )
  }


  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      onWheel={onWheel}
      apiRef={apiRef}
    >
      {items.map((speaker) => (
        <MediaCard key={speaker.event_speaker_id} speaker={speaker} />
      ))}
    </ScrollMenu>
  );
}

export default ScrollCards;

function LeftArrow() {
  /*const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

  return (
    <IconButton
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );*/
}

function RightArrow() {
  /*const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <IconButton
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );*/
}

function onWheel(apiObj: ScrollVisibilityApiType, ev: React.WheelEvent): void {
  const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isTouchpad) {
    ev.stopPropagation();
    return;
  }
  /*
    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else {
      apiObj.scrollPrev();
    }
      */
}