"use client";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import usePrevious from '@/components/events/Scrollcards/usePrevious';

import { Speaker } from '@/app/api/events/getSpeakers/types';

import MediaCard from './MediaCardScroll';

type ScrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function ScrollCard() {
  const [items, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    fetch('/api/getSpeakers')
      .then(response => response.json())
      .then((data) => setSpeakers(data as Speaker[]))
      .catch(error => console.error(error));
  }, []);

  const itemsPrev = usePrevious(items);
  const apiRef = React.useRef<ScrollVisibilityApiType | null>(null);

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

export default ScrollCard;

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

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else {
    apiObj.scrollPrev();
  }
}