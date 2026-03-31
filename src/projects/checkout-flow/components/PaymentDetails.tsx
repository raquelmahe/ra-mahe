import { useState } from 'react';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkInput, { INPUT_TYPES } from '@skyscanner/backpack-web/bpk-component-input';
import BpkFieldset from '@skyscanner/backpack-web/bpk-component-fieldset';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';
import BpkSectionHeader from '@skyscanner/backpack-web/bpk-component-section-header';
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';
import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';
import {
  surfaceHighlightDay,
  textSecondaryDay,
  statusSuccessSpotDay,
  borderSizeSm,
  colorSkyBlue,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

interface PaymentDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

type PaymentMethod = 'card' | 'paypal' | 'apple';

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length > 2) return digits.slice(0, 2) + ' / ' + digits.slice(2);
  return digits;
}

function PaymentMethodTab({ id, label, icon, selected, onSelect }: {
  id: PaymentMethod;
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        all: 'unset',
        cursor: 'pointer',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.625rem 0.5rem',
        borderRadius: '0.5rem',
        border: `${borderSizeSm} solid ${selected ? colorSkyBlue : surfaceHighlightDay}`,
        backgroundColor: selected ? 'rgb(227, 240, 255)' : 'white',
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{icon}</span>
      <BpkText tagName="span" textStyle={TEXT_STYLES.caption} style={{ color: selected ? colorSkyBlue : textSecondaryDay, fontWeight: selected ? 700 : 400 }}>
        {label}
      </BpkText>
    </button>
  );
}

export default function PaymentDetails({ onNext, onBack }: PaymentDetailsProps) {
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [touched, setTouched] = useState(false);

  const isCardValid =
    cardNumber.replace(/\s/g, '').length === 16 &&
    expiry.length >= 4 &&
    cvv.length >= 3 &&
    cardName.trim().length > 0;

  const handlePay = () => {
    setTouched(true);
    if (method !== 'card' || isCardValid) onNext();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Security badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'rgb(240, 253, 252)',
          borderRadius: '0.5rem',
          border: `${borderSizeSm} solid ${statusSuccessSpotDay}`,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill={statusSuccessSpotDay} />
          <path d="M10 17l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17 10l-7 7z" fill="white" />
        </svg>
        <BpkText tagName="span" textStyle={TEXT_STYLES.caption}>
          <strong>Secure payment</strong> — Your data is encrypted with 256-bit SSL
        </BpkText>
      </div>

      <BpkCard padded={false}>
        <div style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <BpkSectionHeader title="Payment method" />
          </div>

          {/* Payment tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <PaymentMethodTab id="card" label="Card" icon="💳" selected={method === 'card'} onSelect={() => setMethod('card')} />
            <PaymentMethodTab id="paypal" label="PayPal" icon="🅿️" selected={method === 'paypal'} onSelect={() => setMethod('paypal')} />
            <PaymentMethodTab id="apple" label="Apple Pay" icon="🍎" selected={method === 'apple'} onSelect={() => setMethod('apple')} />
          </div>

          {method === 'card' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <BpkFieldset
                label="Card number"
                required
                valid={!touched || cardNumber.replace(/\s/g, '').length === 16}
                validationMessage="Please enter a valid 16-digit card number"
              >
                <BpkInput
                  id="cardNumber"
                  name="cardNumber"
                  type={INPUT_TYPES.text}
                  value={cardNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  placeholder="1234 5678 9012 3456"
                  valid={!touched || cardNumber.replace(/\s/g, '').length === 16}
                />
              </BpkFieldset>

              <BpkFieldset label="Name on card" required valid={!touched || cardName.trim().length > 0} validationMessage="Name is required">
                <BpkInput
                  id="cardName"
                  name="cardName"
                  type={INPUT_TYPES.text}
                  value={cardName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value)}
                  placeholder="Emma Johnson"
                  valid={!touched || cardName.trim().length > 0}
                />
              </BpkFieldset>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <BpkFieldset
                  label="Expiry date"
                  required
                  valid={!touched || expiry.length >= 4}
                  validationMessage="Enter MM / YY"
                >
                  <BpkInput
                    id="expiry"
                    name="expiry"
                    type={INPUT_TYPES.text}
                    value={expiry}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setExpiry(formatExpiry(e.target.value))
                    }
                    placeholder="MM / YY"
                    valid={!touched || expiry.length >= 4}
                  />
                </BpkFieldset>

                <BpkFieldset
                  label="CVV / CVC"
                  required
                  valid={!touched || cvv.length >= 3}
                  validationMessage="3 or 4 digits"
                >
                  <BpkInput
                    id="cvv"
                    name="cvv"
                    type={INPUT_TYPES.text}
                    value={cvv}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))
                    }
                    placeholder="123"
                    valid={!touched || cvv.length >= 3}
                  />
                </BpkFieldset>
              </div>

              <BpkCheckbox
                name="saveCard"
                label="Save card for future bookings"
                checked={saveCard}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaveCard(e.target.checked)}
              />
            </div>
          )}

          {method === 'paypal' && (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                backgroundColor: surfaceHighlightDay,
                borderRadius: '0.5rem',
              }}
            >
              <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault} color="text-secondary">
                You'll be redirected to PayPal to complete your payment securely.
              </BpkText>
            </div>
          )}

          {method === 'apple' && (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                backgroundColor: surfaceHighlightDay,
                borderRadius: '0.5rem',
              }}
            >
              <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault} color="text-secondary">
                Touch ID or Face ID will be used to authorise your Apple Pay payment.
              </BpkText>
            </div>
          )}
        </div>
      </BpkCard>

      {/* Price breakdown */}
      <BpkCard padded={false}>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault} color="text-secondary">Subtotal</BpkText>
              <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault}>£97.99</BpkText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault} color="text-secondary">Taxes &amp; fees</BpkText>
              <BpkText tagName="span" textStyle={TEXT_STYLES.bodyDefault}>£14.50</BpkText>
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
              <div>
                <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>Total charged today</BpkText>
                <BpkText tagName="p" textStyle={TEXT_STYLES.caption} color="text-secondary">Including all taxes</BpkText>
              </div>
              <BpkText tagName="span" textStyle={TEXT_STYLES.heading3} color="text-hero">£112.49</BpkText>
            </div>
          </div>
        </div>
      </BpkCard>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <BpkButton type={BUTTON_TYPES.featured} onClick={handlePay} fullWidth>
          Pay £112.49
        </BpkButton>
        <BpkText tagName="p" textStyle={TEXT_STYLES.caption} color="text-secondary" style={{ textAlign: 'center' }}>
          By completing this payment you agree to our Terms &amp; Conditions and Privacy Policy
        </BpkText>
        <BpkButton type={BUTTON_TYPES.secondary} onClick={onBack} fullWidth>
          Back
        </BpkButton>
      </div>
    </div>
  );
}
