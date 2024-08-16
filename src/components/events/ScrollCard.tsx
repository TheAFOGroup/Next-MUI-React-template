"use client";
import React, { useState, useEffect } from 'react';
import {
  ScrollMenu,
  VisibilityContext,
  type publicApiType,
} from 'react-horizontal-scrolling-menu';
import MediaCard from './MediaCard';
import { Speaker } from '@/app/api/getSpeakers/types';
import styled from 'styled-jss';
import { useIntersectionObserver } from 'usehooks-ts';

const OnScreenContext = React.createContext(true);

type publicApiType = typeof publicApiType;


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

export const ScrollCard = () => {
  const { isIntersecting: isVisible, ref } = useIntersectionObserver({
    threshold: 1,
  });
  return (
    <div>
      <div ref={ref}>
        <NoScrollbar>
          <OnScreenContext.Provider value={isVisible}>

            <ScrollMenu
              LeftArrow={LeftArrow}
              RightArrow={RightArrow}
              onWheel={onWheel}
            >
              {dummyMediaCards.map((speaker: Speaker) => (<MediaCard key={speaker.event_speaker_id} speaker={speaker} />))}
            </ScrollMenu>
          </OnScreenContext.Provider>
        </NoScrollbar>
      </div>

      <div style={{ height: '300vh', backgroundColor: 'aqua', opacity: 0.2 }}>
        filler
      </div>
    </div >
  );
};

const NoScrollbar = styled('div')({
  '& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar': {
    display: 'none',
  },
  '& .react-horizontal-scrolling-menu--scroll-container': {
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
  },
});


function LeftArrow() {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  //const isFirstItemVisible = visibility.useIsVisible('first', true);
  const isFirstItemVisible = true;

  const isOnScreen = React.useContext(OnScreenContext);
  const [disabled, setDisabled] = React.useState(isFirstItemVisible);
  React.useEffect(() => {
    if (isOnScreen) {
      setDisabled(isFirstItemVisible);
    }
  }, [isOnScreen, isFirstItemVisible]);

  return (
    <Arrow
      disabled={disabled}
      onClick={() => visibility.scrollPrev()}
      testId="left-arrow"
    >
      Left
    </Arrow>
  );
}

function RightArrow() {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  //const isLastItemVisible = visibility.useIsVisible('last', false);
  const isLastItemVisible = true;

  const isOnScreen = React.useContext(OnScreenContext);
  const [disabled, setDisabled] = React.useState(isLastItemVisible);
  React.useEffect(() => {
    if (isOnScreen) {
      setDisabled(isLastItemVisible);
    }
  }, [isOnScreen, isLastItemVisible]);

  return (
    <Arrow
      disabled={disabled}
      onClick={() => visibility.scrollNext()}
      testId="right-arrow"
    >
      Right
    </Arrow>
  );
}

function Arrow({
  children,
  disabled,
  onClick,
  className,
  testId,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
  className?: string;
  testId: string;
}) {
  return (
    <ArrowButton
      disabled={disabled}
      onClick={onClick}
      className={'arrow' + `-${className}`}
      data-testid={testId}
    >
      {children}
    </ArrowButton>
  );
}
const ArrowButton = styled('button')({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBottom: '2px',
  opacity: (props: any) => (props.disabled ? '0' : '1'),
  userSelect: 'none',
  borderRadius: '6px',
  borderWidth: '1px',
});

function onWheel(apiObj: publicApiType, ev: React.WheelEvent): void {
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