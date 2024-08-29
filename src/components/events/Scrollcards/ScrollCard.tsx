"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import usePrevious from '@/components/events/Scrollcards/usePrevious';
import { Loading } from '@/components/Loading';

import { Speaker } from '@/app/api/events/getSpeakers/types';

import MediaCard from './MediaCardScroll';

type ScrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

interface ScrollCardsProp {
  eventId: number
}

const ScrollCards: React.FC<ScrollCardsProp> = ({ eventId }) => {
  const [items, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPrev = usePrevious(items);
  const apiRef = React.useRef<ScrollVisibilityApiType | null>(null);


  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/events/getSpeakers', {
      params: {
        event_id: eventId
      },
      headers: {
        'API_SECRET': process.env.NEXT_PUBLIC_API_SECRET
      }
    })
      .then(response => {
        const data = response.data;
        setSpeakers(data as Speaker[]);
        setLoading(false);
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