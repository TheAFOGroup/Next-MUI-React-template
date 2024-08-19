"use client";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import usePrevious from '@/components/events/Scrollcards/usePrevious';

import { Speaker } from '@/app/api/getSpeakers/types';

import MediaCard from './MediaCardScroll';

const OnScreenContext = React.createContext(true);
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;


function ScrollCard() {
  const [items, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    fetch('/api/getSpeakers')
      .then(response => response.json())
      .then((data) => setSpeakers(data as Speaker[]))
      .catch(error => console.error(error));
  }, []);


  const itemsPrev = usePrevious(items);
  const apiRef = React.useRef({} as scrollVisibilityApiType);
  React.useEffect(() => {
    if (items.length > itemsPrev?.length) {
      apiRef.current?.scrollToItem?.(
        apiRef.current?.getItemElementById(items.slice(-1)?.[0]?.event_speaker_id)
        // same as
        // document.querySelector(`[data-key='${items.slice(-1)?.[0]?.id}']`)
      );
    }
  }, [items, itemsPrev]);
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      onWheel={onWheel}
      apiref={apiRef}
    >
      {items.map((speaker: Speaker) => (<MediaCard key={speaker.event_speaker_id} speaker={speaker} />))}
    </ScrollMenu>
  );
};

export default ScrollCard;

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);
  //const isFirstItemVisible = visibility.useIsVisible('first', true);
  // const isFirstItemVisible = true;
  /*
    const isOnScreen = React.useContext(OnScreenContext);
    const [disabled, setDisabled] = React.useState(isFirstItemVisible);
  
    React.useEffect(() => {
      if (isOnScreen) {
        setDisabled(isFirstItemVisible);
      }
    }, [isOnScreen, isFirstItemVisible]);
    */
  return (
    <IconButton
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
    >
      <ArrowBackIosNewIcon />
    </IconButton>

  );
}

function RightArrow() {
  const { isFirstItemVisible, scrollNext } = React.useContext(VisibilityContext);
  // isLastItemVisible = visibility.scrollNext('last', false);
  //const isLastItemVisible = true;
  /*
    const isOnScreen = React.useContext(OnScreenContext);
    const [disabled, setDisabled] = React.useState(isLastItemVisible);
    React.useEffect(() => {
      if (isOnScreen) {
        setDisabled(isLastItemVisible);
      }
    }, [isOnScreen, isLastItemVisible]);
  */
  return (
    <IconButton
      disabled={isFirstItemVisible}
      onClick={() => scrollNext()}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  // NOTE: no good standart way to distinguish touchpad scrolling gestures
  // but can assume that gesture will affect X axis, mouse scroll only Y axis
  // of if deltaY too small probably is it touchpad
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else {
    apiObj.scrollPrev();
  }
}