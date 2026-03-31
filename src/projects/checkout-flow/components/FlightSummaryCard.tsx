import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';
import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';
import {
  surfaceHighlightDay,
  textSecondaryDay,
  colorSkyBlue,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

export default function FlightSummaryCard() {
  return (
    <BpkCard padded={false}>
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <BpkText tagName="h3" textStyle={TEXT_STYLES.label1}>Your flight</BpkText>
          <BpkBadge type={BADGE_TYPES.success}>Best value</BpkBadge>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '0.25rem',
              backgroundColor: surfaceHighlightDay,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill={colorSkyBlue} />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <BpkText tagName="span" textStyle={TEXT_STYLES.heading4}>LHR</BpkText>
              <BpkText tagName="span" textStyle={TEXT_STYLES.caption} color="text-secondary">→</BpkText>
              <BpkText tagName="span" textStyle={TEXT_STYLES.heading4}>BCN</BpkText>
            </div>
            <BpkText tagName="p" textStyle={TEXT_STYLES.caption} color="text-secondary">
              Thu 20 Mar · 08:15 – 11:30 · 2h 15m
            </BpkText>
          </div>
          <div style={{ textAlign: 'right' }}>
            <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>Vueling · VY7823</BpkText>
            <BpkText tagName="p" textStyle={TEXT_STYLES.caption} color="text-secondary">Direct</BpkText>
          </div>
        </div>

        <div
          style={{
            borderTop: `1px solid ${surfaceHighlightDay}`,
            paddingTop: '0.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <BpkText tagName="span" textStyle={TEXT_STYLES.caption} color="text-secondary">
            1 adult · Economy · Hand baggage only
          </BpkText>
          <div style={{ textAlign: 'right' }}>
            <BpkText tagName="p" textStyle={TEXT_STYLES.heading4} color="text-hero">£89.99</BpkText>
          </div>
        </div>
      </div>
    </BpkCard>
  );
}
