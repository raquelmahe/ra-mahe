import { useState, useEffect } from 'react';
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkButtonLink from '@skyscanner/backpack-web/bpk-component-link';
import AiIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/ai';
import ThumbsUpIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/thumbs-up';
import ThumbsDownIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/thumbs-down';
import {
  surfaceLowContrastDay,
  textSecondaryDay,
  textPrimaryDay,
  surfaceDefaultDay,
  lineDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

type AiBlurbState = 'Default' | 'Thinking' | 'Error';

// ── AI Tag ─────────────────────────────────────────────────────────────────
function AiTag() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <AiIconSm style={{ color: textSecondaryDay, width: '12px', height: '12px', flexShrink: 0 }} />
      <BpkText textStyle={TEXT_STYLES.caption} tagName="span" color="text-secondary">
        Summarized by AI
      </BpkText>
    </div>
  );
}

// ── Helpfulness row ─────────────────────────────────────────────────────────
function HelpRow() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <BpkText textStyle={TEXT_STYLES.caption} tagName="span" color="text-secondary">
        Thanks for your feedback!
      </BpkText>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <BpkText textStyle={TEXT_STYLES.caption} tagName="span" color="text-secondary">
        Was this helpful?
      </BpkText>
      <ThumbsUpIconSm
        style={{ color: textPrimaryDay, width: '16px', height: '16px', cursor: 'pointer' }}
        onClick={() => setSubmitted(true)}
      />
      <ThumbsDownIconSm
        style={{ color: textPrimaryDay, width: '16px', height: '16px', cursor: 'pointer' }}
        onClick={() => setSubmitted(true)}
      />
    </div>
  );
}

// ── Default state ───────────────────────────────────────────────────────────
function AiBlurbDefault() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <AiTag />
      <BpkText textStyle={TEXT_STYLES.caption} tagName="p">
        <strong>The first EasyTerra deal</strong> offers the lowest price and better insurance
        coverage. The second EasyTerra deal has a higher price but offers a more spacious car type.
      </BpkText>
      <HelpRow />
    </div>
  );
}

// ── Thinking state ──────────────────────────────────────────────────────────
function AiBlurbThinking() {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d % 3) + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <AiTag />
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <BpkText textStyle={TEXT_STYLES.caption} tagName="span" color="text-secondary">
          Comparing your shortlist
        </BpkText>
        <BpkText textStyle={TEXT_STYLES.caption} tagName="span" color="text-secondary">
          {''.padEnd(dots, '.')}
        </BpkText>
      </div>
    </div>
  );
}

// ── Error state ─────────────────────────────────────────────────────────────
function AiBlurbError() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <AiTag />
      <BpkText textStyle={TEXT_STYLES.caption} tagName="p">
        You&apos;ve reached the refresh limit. Please come back later.{' '}
        <BpkButtonLink onClick={() => {}}> Retry</BpkButtonLink>
      </BpkText>
    </div>
  );
}

// ── Root component ──────────────────────────────────────────────────────────
export default function AiBlurb() {
  const [state, setState] = useState<AiBlurbState>('Default');

  return (
    <BpkProvider>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: surfaceLowContrastDay,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          gap: '2rem',
          fontFamily: "'Skyscanner Relative', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* State switcher */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['Default', 'Thinking', 'Error'] as AiBlurbState[]).map((s) => (
            <BpkButton
              key={s}
              type={state === s ? BUTTON_TYPES.primary : BUTTON_TYPES.secondary}
              onClick={() => setState(s)}
            >
              {s}
            </BpkButton>
          ))}
        </div>

        {/* AI Blurb card */}
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            backgroundColor: surfaceDefaultDay,
            border: `1px solid ${lineDay}`,
            borderRadius: '8px',
            padding: '12px 16px',
            color: textPrimaryDay,
          }}
        >
          {state === 'Default' && <AiBlurbDefault />}
          {state === 'Thinking' && <AiBlurbThinking />}
          {state === 'Error' && <AiBlurbError />}
        </div>
      </div>
    </BpkProvider>
  );
}
