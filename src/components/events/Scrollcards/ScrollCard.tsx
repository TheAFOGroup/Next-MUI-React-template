"use client";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import usePrevious from '@/components/events/Scrollcards/usePrevious';

import { Speaker } from '@/app/api/getSpeakers/types';

import MediaCard from './MediaCardScroll';

const OnScreenContext = React.createContext(true);
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;


const dummyMediaCards: Speaker[] = [
  {
    "event_speaker_id": 1,
    "event_id": 1,
    "name": "John Doe",
    "title": "Keynote Speaker",
    "bio": "John Doe is an expert in AI and Machine Learning with over 10 years of experience in the field.",
    "image_url": "https://example.com/images/john_doe.jpg",
    "type": 1,
    "enabled": true
  },
  {
    "event_speaker_id": 2,
    "event_id": 1,
    "name": "Jane Smith",
    "title": "Panelist",
    "bio": "Jane Smith specializes in Cybersecurity and has authored several papers on the subject.",
    "image_url": "https://example.com/images/jane_smith.jpg",
    "type": 2,
    "enabled": true
  },
  {
    "event_speaker_id": 3,
    "event_id": 1,
    "name": "Alice Johnson",
    "title": "Guest Speaker",
    "bio": "Alice Johnson is a renowned expert in Blockchain Technology and a frequent speaker at tech conferences.",
    "image_url": "https://example.com/images/alice_johnson.jpg",
    "type": 1,
    "enabled": true
  },
  {
    "event_speaker_id": 4,
    "event_id": 1,
    "name": "Bob Brown",
    "title": "Panelist",
    "bio": "Bob Brown is a specialist in Data Science and has worked on numerous high-profile projects.",
    "image_url": "https://example.com/images/bob_brown.jpg",
    "type": 2,
    "enabled": true
  },
  {
    "event_speaker_id": 5,
    "event_id": 1,
    "name": "Carol White",
    "title": "Keynote Speaker",
    "bio": "Carol White is an expert in Cloud Computing and has been a keynote speaker at several international conferences.",
    "image_url": "https://example.com/images/carol_white.jpg",
    "type": 1,
    "enabled": true
  },
  {
    "event_speaker_id": 6,
    "event_id": 1,
    "name": "Carol White",
    "title": "Keynote Speaker",
    "bio": "Carol White is an expert in Cloud Computing and has been a keynote speaker at several international conferences.",
    "image_url": "https://example.com/images/carol_white.jpg",
    "type": 1,
    "enabled": true
  },
  {
    "event_speaker_id": 7,
    "event_id": 1,
    "name": "Carol White",
    "title": "Keynote Speaker",
    "bio": "Carol White is an expert in Cloud Computing and has been a keynote speaker at several international conferences.",
    "image_url": "https://example.com/images/carol_white.jpg",
    "type": 1,
    "enabled": true
  },
  {
    "event_speaker_id": 8,
    "event_id": 1,
    "name": "Carol White",
    "title": "Keynote Speaker",
    "bio": "Carol White is an expert in Cloud Computing and has been a keynote speaker at several international conferences.",
    "image_url": "https://example.com/images/carol_white.jpg",
    "type": 1,
    "enabled": true
  },
  {
    "event_speaker_id": 9,
    "event_id": 1,
    "name": "Carol White",
    "title": "Keynote Speaker",
    "bio": "Carol White is an expert in Cloud Computing and has been a keynote speaker at several international conferences.",
    "image_url": "https://example.com/images/carol_white.jpg",
    "type": 1,
    "enabled": true
  },
  {
    "event_speaker_id": 10,
    "event_id": 1,
    "name": "Carol White",
    "title": "Keynote Speaker",
    "bio": "Carol White is an expert in Cloud Computing and has been a keynote speaker at several international conferences.",
    "image_url": "https://example.com/images/carol_white.jpg",
    "type": 1,
    "enabled": true
  },
]

function ScrollCard() {
  const [items, setItems] = React.useState(dummyMediaCards);

  const itemsPrev = usePrevious(items);
  const apiRef = React.useRef({} as scrollVisibilityApiType);
  React.useEffect(() => {
    if (items.length > itemsPrev?.length) {
      apiRef.current?.scrollToItem?.(
        apiRef.current?.getItemElementById(items.slice(-1)?.[0]?.id)
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
      {dummyMediaCards.map((speaker: Speaker) => (<MediaCard key={speaker.event_speaker_id} speaker={speaker} />))}
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