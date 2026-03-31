import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';
import { BpkFlex, BpkStack, BpkSpacing } from '@skyscanner/backpack-web/bpk-component-layout';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkPrice, { SIZES as PRICE_SIZES, ALIGNS as PRICE_ALIGNS } from '@skyscanner/backpack-web/bpk-component-price';
import BpkRating, { RATING_SIZES, RATING_SCALES } from '@skyscanner/backpack-web/bpk-component-rating';
import BpkStarRating from '@skyscanner/backpack-web/bpk-component-star-rating';
import TickCircleIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/tick-circle';
import ArrowRightIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/arrow-right';
import {
  surfaceDefaultDay,
  surfaceLowContrastDay,
  colorPanjin,
  textSuccessDay,
  corePrimaryDay,
  lineDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

// Figma image assets
const hotelImage = 'http://localhost:3845/assets/4f7db135cacc3391c2a56521c0864a5991da2187.png';
const loveHolidaysLogo = 'http://localhost:3845/assets/c3c1df2020880efc8384f4df42b81f64f2be2348.png';
const jet2Logo = 'http://localhost:3845/assets/756d7229488dfe412fbb56d5dce73790a974723b.png';

const AMENITIES = [
  'ATOL protection',
  'Checked baggage 23kg',
  'Flexible payments',
  'Transfers',
];

function ProviderLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '4px',
        objectFit: 'cover',
        flexShrink: 0,
        display: 'block',
      }}
    />
  );
}

function FlightLeg({
  logo,
  logoAlt,
  times,
  route,
}: {
  logo: string;
  logoAlt: string;
  times: string;
  route: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <ProviderLogo src={logo} alt={logoAlt} />
      <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
        {times}
      </BpkText>
      <BpkText textStyle={TEXT_STYLES.footnote} tagName="span" color="text-secondary">
        {route}
      </BpkText>
    </div>
  );
}

export default function HotelResultCard() {
  return (
    <BpkProvider>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: surfaceLowContrastDay,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          fontFamily:
            "'Skyscanner Relative', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <BpkCard padded={false} atomic={false}>

            {/* ── Main 3-column body ── */}
            <div style={{ display: 'flex', alignItems: 'stretch' }}>

              {/* Col 1 — Image (inset: left + top, per Figma "Image ←Left ↑Top") */}
              <div style={{ flexShrink: 0, width: '220px', minHeight: '264px', paddingLeft: '8px', paddingTop: '8px' }}>
                <img
                  src={hotelImage}
                  alt="Hotel Aiguaclara, Begur, Costa Brava"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                  }}
                />
              </div>

              {/* Col 2 — Hotel details */}
              <div
                style={{
                  flex: 1,
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
                  Hotel Aiguaclara
                </BpkText>

                {/* Stars + location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BpkStarRating
                    rating={4}
                    maxRating={5}
                    ratingLabel={(r: number, max: number) => `${r} out of ${max} stars`}
                    large={false}
                    extraLarge={false}
                    className={null}
                    rounding={Math.floor}
                  />
                  <BpkText textStyle={TEXT_STYLES.footnote} tagName="span" color="text-secondary">
                    4 star hotel · Begur, Costa Brava
                  </BpkText>
                </div>

                {/* Guest rating */}
                <BpkRating
                  value={4.5}
                  ariaLabel="4.5 out of 5 — Excellent"
                  title="Excellent"
                  subtitle="13,433 reviews"
                  ratingScale={RATING_SCALES.zeroToFive}
                  size={RATING_SIZES.base}
                />

                {/* Amenities */}
                <BpkStack
                  direction="column"
                  align="start"
                  gap={BpkSpacing.SM}
                >
                  {AMENITIES.map((item) => (
                    <div
                      key={item}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <TickCircleIconSm style={{ color: textSuccessDay, flexShrink: 0 }} />
                      <BpkText textStyle={TEXT_STYLES.footnote} tagName="span">
                        {item}
                      </BpkText>
                    </div>
                  ))}
                </BpkStack>

                {/* Flight legs */}
                <BpkStack direction="column" align="start" gap={BpkSpacing.SM}>
                  <FlightLeg
                    logo={jet2Logo}
                    logoAlt="Jet2"
                    times="15:25 – 20:50"
                    route="STN – BCN, Direct"
                  />
                  <FlightLeg
                    logo={jet2Logo}
                    logoAlt="Jet2"
                    times="19:50 – 22:45"
                    route="BCN – LHR, Direct"
                  />
                </BpkStack>
              </div>

              {/* Col 3 — Price + CTA */}
              <div
                style={{
                  width: '200px',
                  flexShrink: 0,
                  borderLeft: `1px solid ${lineDay}`,
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.5rem',
                  }}
                >
                  {/* Previous price + discount */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <BpkText
                      textStyle={TEXT_STYLES.footnote}
                      tagName="span"
                      style={{ color: colorPanjin, textDecoration: 'line-through' }}
                    >
                      £819
                    </BpkText>
                    <BpkText
                      textStyle={TEXT_STYLES.footnote}
                      tagName="span"
                      style={{ color: colorPanjin }}
                    >
                      · £90 off
                    </BpkText>
                  </div>

                  {/* Main price */}
                  <BpkPrice
                    price="£729"
                    trailingText="per person"
                    size={PRICE_SIZES.large}
                    align={PRICE_ALIGNS.right}
                    className={null}
                    leadingClassName={null}
                  />

                  <BpkText textStyle={TEXT_STYLES.footnote} tagName="p" color="text-secondary">
                    £1,458 total
                  </BpkText>

                  {/* Provider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ProviderLogo src={loveHolidaysLogo} alt="Love Holidays" />
                    <BpkText textStyle={TEXT_STYLES.footnote} tagName="span">
                      Love Holidays
                    </BpkText>
                  </div>
                </div>

                <BpkButton type={BUTTON_TYPES.featured}>Go to site</BpkButton>
              </div>
            </div>

            {/* ── Bottom deals banner ── */}
            <div
              style={{
                backgroundColor: surfaceLowContrastDay,
                borderRadius: '0 0 12px 12px',
                padding: '0.5rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Deal 1 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ProviderLogo src={jet2Logo} alt="Jet2" />
                  <BpkText textStyle={TEXT_STYLES.caption} tagName="span" color="text-secondary">
                    Cheapest · Breakfast included · £587/pp
                  </BpkText>
                </div>
                {/* Deal 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ProviderLogo src={loveHolidaysLogo} alt="Love Holidays" />
                  <BpkText textStyle={TEXT_STYLES.caption} tagName="span" color="text-secondary">
                    Half board · £684/pp
                  </BpkText>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <BpkText
                  textStyle={TEXT_STYLES.label1}
                  tagName="span"
                  style={{ color: corePrimaryDay }}
                >
                  8 deals from £587
                </BpkText>
                <ArrowRightIconSm style={{ color: corePrimaryDay }} />
              </div>
            </div>

          </BpkCard>
        </div>
      </div>
    </BpkProvider>
  );
}
