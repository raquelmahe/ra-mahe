import { useState } from 'react';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';
import BpkSectionHeader from '@skyscanner/backpack-web/bpk-component-section-header';
import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';
import {
  colorSkyBlue,
  surfaceHighlightDay,
  surfaceSubtleDay,
  statusSuccessSpotDay,
  textSecondaryDay,
  borderSizeSm,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

interface SeatsExtrasProps {
  onNext: () => void;
  onBack: () => void;
}

type SeatOption = 'none' | 'standard' | 'extra-legroom' | 'front';

interface Extra {
  id: string;
  label: string;
  description: string;
  price: string;
  icon: string;
}

const EXTRAS: Extra[] = [
  {
    id: 'cabin-bag',
    label: 'Cabin bag (10kg)',
    description: 'Fits in overhead locker',
    price: '£12.99',
    icon: '🧳',
  },
  {
    id: 'checked-bag',
    label: 'Checked bag (23kg)',
    description: 'Ideal for longer trips',
    price: '£29.99',
    icon: '📦',
  },
  {
    id: 'travel-insurance',
    label: 'Travel insurance',
    description: 'Cover for delays, cancellations & medical',
    price: '£15.00',
    icon: '🛡️',
  },
  {
    id: 'priority-boarding',
    label: 'Priority boarding',
    description: 'Board before other passengers',
    price: '£8.00',
    icon: '⚡',
  },
];

const SEAT_OPTIONS = [
  { id: 'none' as SeatOption, label: 'No preference', price: 'Free', description: 'Random seat assigned' },
  { id: 'standard' as SeatOption, label: 'Standard seat', price: '£5', description: 'Window or aisle' },
  { id: 'extra-legroom' as SeatOption, label: 'Extra legroom', price: '£18', description: 'Rows 1–4, extra space' },
  { id: 'front' as SeatOption, label: 'Front of plane', price: '£10', description: 'Rows 5–10, faster exit' },
];

function SeatCard({ option, selected, onSelect }: { option: (typeof SEAT_OPTIONS)[0]; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        borderRadius: '0.5rem',
        border: `${borderSizeSm} solid ${selected ? colorSkyBlue : surfaceHighlightDay}`,
        backgroundColor: selected ? surfaceSubtleDay : 'white',
        padding: '0.75rem',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s, background-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '1.125rem',
              height: '1.125rem',
              borderRadius: '50%',
              border: `2px solid ${selected ? colorSkyBlue : surfaceHighlightDay}`,
              backgroundColor: selected ? colorSkyBlue : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {selected && (
              <div
                style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', backgroundColor: 'white' }}
              />
            )}
          </div>
          <div>
            <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>{option.label}</BpkText>
            <BpkText tagName="p" textStyle={TEXT_STYLES.caption} color="text-secondary">{option.description}</BpkText>
          </div>
        </div>
        <BpkText tagName="span" textStyle={TEXT_STYLES.label2} color={selected ? 'text-hero' : 'text-primary'}>
          {option.price}
        </BpkText>
      </div>
    </button>
  );
}

function ExtraToggle({ extra, selected, onToggle }: { extra: Extra; selected: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        borderRadius: '0.5rem',
        border: `${borderSizeSm} solid ${selected ? statusSuccessSpotDay : surfaceHighlightDay}`,
        backgroundColor: selected ? 'rgb(240, 253, 252)' : 'white',
        padding: '0.75rem',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s, background-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{extra.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>{extra.label}</BpkText>
          <BpkText tagName="p" textStyle={TEXT_STYLES.caption} color="text-secondary">{extra.description}</BpkText>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', flexShrink: 0 }}>
          <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>{extra.price}</BpkText>
          {selected ? (
            <BpkBadge type={BADGE_TYPES.success}>Added</BpkBadge>
          ) : (
            <BpkBadge type={BADGE_TYPES.outline}>Add</BpkBadge>
          )}
        </div>
      </div>
    </button>
  );
}

export default function SeatsExtras({ onNext, onBack }: SeatsExtrasProps) {
  const [selectedSeat, setSelectedSeat] = useState<SeatOption>('none');
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const seatPrice = SEAT_OPTIONS.find((s) => s.id === selectedSeat)?.price ?? 'Free';
  const extrasTotal = EXTRAS.filter((e) => selectedExtras.has(e.id)).reduce((sum, e) => {
    return sum + parseFloat(e.price.replace('£', ''));
  }, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <BpkCard padded={false}>
        <div style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <BpkSectionHeader title="Choose your seat" description="Select a seat preference for your flight" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {SEAT_OPTIONS.map((option) => (
              <SeatCard
                key={option.id}
                option={option}
                selected={selectedSeat === option.id}
                onSelect={() => setSelectedSeat(option.id)}
              />
            ))}
          </div>
        </div>
      </BpkCard>

      <BpkCard padded={false}>
        <div style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <BpkSectionHeader title="Add extras" description="Make your journey more comfortable" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {EXTRAS.map((extra) => (
              <ExtraToggle
                key={extra.id}
                extra={extra}
                selected={selectedExtras.has(extra.id)}
                onToggle={() => toggleExtra(extra.id)}
              />
            ))}
          </div>
        </div>
      </BpkCard>

      {/* Price summary */}
      <BpkCard padded={false}>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault} color="text-secondary">Flight</BpkText>
              <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault}>£89.99</BpkText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault} color="text-secondary">Seat preference</BpkText>
              <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault}>{seatPrice}</BpkText>
            </div>
            {Array.from(selectedExtras).map((id) => {
              const extra = EXTRAS.find((e) => e.id === id);
              if (!extra) return null;
              return (
                <div key={id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault} color="text-secondary">{extra.label}</BpkText>
                  <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault}>{extra.price}</BpkText>
                </div>
              );
            })}
            <div
              style={{
                borderTop: `1px solid ${surfaceHighlightDay}`,
                paddingTop: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <BpkText tagName="span" textStyle={TEXT_STYLES.label1}>Total</BpkText>
              <BpkText tagName="span" textStyle={TEXT_STYLES.heading4} color="text-hero">
                £{(89.99 + extrasTotal + (selectedSeat !== 'none' ? parseFloat(SEAT_OPTIONS.find(s => s.id === selectedSeat)?.price.replace('£', '') ?? '0') : 0)).toFixed(2)}
              </BpkText>
            </div>
          </div>
        </div>
      </BpkCard>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <BpkButton type={BUTTON_TYPES.featured} onClick={onNext} fullWidth>
          Continue to payment
        </BpkButton>
        <BpkButton type={BUTTON_TYPES.secondary} onClick={onBack} fullWidth>
          Back
        </BpkButton>
      </div>
    </div>
  );
}
