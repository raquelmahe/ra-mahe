import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';
import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';
import {
  surfaceHighlightDay,
  statusSuccessSpotDay,
  colorSkyBlue,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

interface OrderConfirmationProps {
  onRestart: () => void;
}

const BOOKING_DETAILS = [
  { label: 'Booking reference', value: 'SKY-2X9KQ4' },
  { label: 'Passenger', value: 'Emma Johnson' },
  { label: 'Flight', value: 'VY7823 · LHR → BCN' },
  { label: 'Date', value: 'Thu 20 Mar 2026' },
  { label: 'Depart', value: '08:15 from Heathrow T2' },
  { label: 'Arrive', value: '11:30 at Barcelona El Prat' },
  { label: 'Seat', value: 'Standard — allocated at check-in' },
];

export default function OrderConfirmation({ onRestart }: OrderConfirmationProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Success hero */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '0.75rem',
          padding: '2rem 1rem',
        }}
      >
        <div
          style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            backgroundColor: statusSuccessSpotDay,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.25rem',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <BpkText tagName="h1" textStyle={TEXT_STYLES.heading2}>Booking confirmed!</BpkText>
        <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault} color="text-secondary">
          Your flight has been booked. A confirmation email has been sent to{' '}
          <strong>emma@example.com</strong>
        </BpkText>

        <BpkBadge type={BADGE_TYPES.success}>Booking ref: SKY-2X9KQ4</BpkBadge>
      </div>

      {/* Flight detail card */}
      <BpkCard padded={false}>
        <div style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <BpkText tagName="h3" textStyle={TEXT_STYLES.label1}>Booking details</BpkText>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {BOOKING_DETAILS.map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '0.625rem 0',
                  borderBottom: i < BOOKING_DETAILS.length - 1 ? `1px solid ${surfaceHighlightDay}` : 'none',
                  gap: '1rem',
                }}
              >
                <BpkText tagName="span" textStyle={TEXT_STYLES.caption} color="text-secondary">{item.label}</BpkText>
                <BpkText tagName="span" textStyle={TEXT_STYLES.label2} style={{ textAlign: 'right' }}>{item.value}</BpkText>
              </div>
            ))}
          </div>
        </div>
      </BpkCard>

      {/* Payment summary */}
      <BpkCard padded={false}>
        <div style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <BpkText tagName="h3" textStyle={TEXT_STYLES.label1}>Payment summary</BpkText>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault} color="text-secondary">Total charged</BpkText>
            <BpkText tagName="span" textStyle={TEXT_STYLES.heading4} color="text-hero">£112.49</BpkText>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke={statusSuccessSpotDay} strokeWidth="2"/>
              <path d="M2 10h20" stroke={statusSuccessSpotDay} strokeWidth="2"/>
            </svg>
            <BpkText tagName="span" textStyle={TEXT_STYLES.caption} color="text-secondary">
              Visa ending 3456
            </BpkText>
          </div>
        </div>
      </BpkCard>

      {/* What's next */}
      <BpkCard padded={false}>
        <div style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <BpkText tagName="h3" textStyle={TEXT_STYLES.label1}>What's next</BpkText>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { icon: '✉️', title: 'Check your email', desc: 'Confirmation sent to emma@example.com' },
              { icon: '📱', title: 'Online check-in opens', desc: '48 hours before departure — Thu 18 Mar' },
              { icon: '🛂', title: 'Arrive at the airport', desc: 'Be at Heathrow T2 by 06:15 (2 hours early)' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.25rem', lineHeight: 1, marginTop: '0.1rem' }}>{item.icon}</span>
                <div>
                  <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>{item.title}</BpkText>
                  <BpkText tagName="p" textStyle={TEXT_STYLES.caption} color="text-secondary">{item.desc}</BpkText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BpkCard>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <BpkButton type={BUTTON_TYPES.featured} fullWidth onClick={() => {}}>
          Download e-ticket (PDF)
        </BpkButton>
        <BpkButton type={BUTTON_TYPES.secondary} fullWidth onClick={onRestart}>
          Book another flight
        </BpkButton>
      </div>
    </div>
  );
}
