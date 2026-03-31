import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import {
  surfaceDefaultDay,
  colorSkyBlue,
  textSecondaryDay,
  textPrimaryDay,
  surfaceHighlightDay,
  statusSuccessSpotDay,
  borderSizeSm,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

export type Step = 'passengers' | 'extras' | 'payment' | 'confirmation';

const STEPS: { id: Step; label: string }[] = [
  { id: 'passengers', label: 'Passengers' },
  { id: 'extras', label: 'Seats & Extras' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' },
];

interface CheckoutStepperProps {
  currentStep: Step;
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div
      style={{
        backgroundColor: surfaceDefaultDay,
        borderBottom: `${borderSizeSm} solid ${surfaceHighlightDay}`,
        padding: '1rem 0',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <div
              key={step.id}
              style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isCompleted
                      ? statusSuccessSpotDay
                      : isActive
                      ? colorSkyBlue
                      : surfaceHighlightDay,
                    flexShrink: 0,
                    transition: 'background-color 0.2s',
                  }}
                >
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <BpkText
                      tagName="span"
                      textStyle={TEXT_STYLES.label2}
                      style={{ color: isUpcoming ? textSecondaryDay : 'white' }}
                    >
                      {index + 1}
                    </BpkText>
                  )}
                </div>
                <BpkText
                  tagName="span"
                  textStyle={TEXT_STYLES.caption}
                  style={{
                    color: isActive ? textPrimaryDay : textSecondaryDay,
                    fontWeight: isActive ? 700 : 400,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    textAlign: 'center',
                  }}
                >
                  {step.label}
                </BpkText>
              </div>

              {index < STEPS.length - 1 && (
                <div
                  style={{
                    height: '2px',
                    flex: 0.6,
                    backgroundColor: index < currentIndex ? statusSuccessSpotDay : surfaceHighlightDay,
                    marginBottom: '1.25rem',
                    transition: 'background-color 0.2s',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
