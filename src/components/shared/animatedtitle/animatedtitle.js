import React, { useCallback, useState, useEffect } from 'react';
import Typed from 'react-typed';
import shuffle from 'lodash/fp/shuffle';
import { useMediaQuery } from 'react-responsive';

import breakpoints from 'constants/theme/breakpoints';

import * as Styled from './animatedtitle.css';

const TECH_TERMS = [
  // List created based on active Slack channels and commonly discussed topics -- can add more.
  // The carets are an additional delay in ms for short words.
  'AWS^100',
  'data science',
  'DevOps',
  'Docker',
  'Git^100',
  'interview prep',
  'infosec',
  'Javascript',
  'Linux',
  'open source',
  'PHP^100',
  'Python',
  'R^300',
  'Ruby',
  'UX^200',
  'Vim^100',
  'web dev',
];

// Empirically measured to cause word wrap.
const MOBILE_PHRASE_LENGTH_LIMIT = 10;

const AnimatedTitle = () => {
  const isSmall = useMediaQuery({
    query: `(max-width: ${breakpoints.sm})`,
  });
  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.md})`,
  });

  const [hasLooped, setHasLooped] = useState(false);
  const [techTerms, setTechTerms] = useState(
    isMobile
      ? // Filter out words that might wrap on mobile
        TECH_TERMS.filter(x => x.length < MOBILE_PHRASE_LENGTH_LIMIT)
      : TECH_TERMS
  );

  const shuffleTerms = useCallback(() => setTechTerms(shuffle(techTerms)), []);
  const handleComplete = useCallback(() => {
    setHasLooped(true);
    shuffleTerms();
  }, []);

  // Randomize terms so order is different every mount. Note that 'tech' is not in here -- we always want it to be first.
  useEffect(() => {
    shuffleTerms();
  }, []);

  // Shorter delay on mobile because we do not need to wait for the topnav to animate.
  const startDelay = isMobile ? 1250 : 2500;

  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setHasStarted(true), startDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Styled.Title active={hasStarted}>
      Where {isSmall && <br />}
      <Typed
        // This component leverages caching, so this forces a cache reset once we loop
        key={hasLooped ? 0 : 1}
        backspaceFirst={!hasLooped}
        startDelay={hasLooped ? 0 : startDelay}
        // Add 'tech' at the end for seamless looping, since we strip away the 'tech' in the DOM.
        strings={techTerms.concat('tech')}
        backDelay={1000}
        typeSpeed={50}
        backSpeed={35}
        // Fully delete the word -- smart backspace looks weird for short strings
        smartBackspace={false}
        onLastStringBackspaced={handleComplete}
        loop
      >
        {!hasLooped && <span>tech</span>}
      </Typed>
      <br />
      happens in New Haven
    </Styled.Title>
  );
};

export default AnimatedTitle;
