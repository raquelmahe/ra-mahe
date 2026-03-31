import { useState } from 'react';
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkNavigationBar from '@skyscanner/backpack-web/bpk-component-navigation-bar';
import BpkCloseButton from '@skyscanner/backpack-web/bpk-component-close-button';
import {
  surfaceDefaultDay,
  surfaceLowContrastDay,
  corePrimaryDay,
  colorSkyBlue,
  borderSizeSm,
  surfaceHighlightDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import CheckoutStepper, { type Step } from './components/CheckoutStepper';
import PassengerDetails from './components/PassengerDetails';
import SeatsExtras from './components/SeatsExtras';
import PaymentDetails from './components/PaymentDetails';
import OrderConfirmation from './components/OrderConfirmation';

const STEP_TITLES: Record<Step, string> = {
  passengers: 'Passenger details',
  extras: 'Seats & extras',
  payment: 'Payment',
  confirmation: 'Booking confirmed',
};

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('passengers');

  const goTo = (s: Step) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BpkProvider>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: surfaceLowContrastDay,
          fontFamily:
            "'Skyscanner Relative', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Nav bar */}
        <div
          style={{
            backgroundColor: surfaceDefaultDay,
            borderBottom: `${borderSizeSm} solid ${surfaceHighlightDay}`,
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              padding: '0 1rem',
              height: '3.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Skyscanner logo mark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill={colorSkyBlue} />
                <path d="M20 8C13.37 8 8 13.37 8 20s5.37 12 12 12 12-5.37 12-12S26.63 8 20 8zm0 2c2.21 0 4.26.7 5.95 1.88L10.88 25.95A9.96 9.96 0 0110 20c0-5.52 4.48-10 10-10zm0 20c-2.21 0-4.26-.7-5.95-1.88l15.07-15.07A9.96 9.96 0 0130 20c0 5.52-4.48 10-10 10z" fill="white" />
              </svg>
              <BpkText tagName="span" textStyle={TEXT_STYLES.label1} style={{ color: corePrimaryDay }}>
                Skyscanner
              </BpkText>
            </div>

            <BpkText tagName="h1" textStyle={TEXT_STYLES.heading5} style={{ color: corePrimaryDay }}>
              {STEP_TITLES[step]}
            </BpkText>

            <div style={{ width: '28px' }} />
          </div>
        </div>

        {/* Stepper — hidden on confirmation */}
        {step !== 'confirmation' && <CheckoutStepper currentStep={step} />}

        {/* Content */}
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            padding: '1.5rem 1rem 3rem',
          }}
        >
          {step === 'passengers' && (
            <PassengerDetails onNext={() => goTo('extras')} />
          )}
          {step === 'extras' && (
            <SeatsExtras
              onNext={() => goTo('payment')}
              onBack={() => goTo('passengers')}
            />
          )}
          {step === 'payment' && (
            <PaymentDetails
              onNext={() => goTo('confirmation')}
              onBack={() => goTo('extras')}
            />
          )}
          {step === 'confirmation' && (
            <OrderConfirmation onRestart={() => goTo('passengers')} />
          )}
        </div>
      </div>
    </BpkProvider>
  );
}
