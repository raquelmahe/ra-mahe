import { useState, useMemo } from 'react';
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkBarchart from '@skyscanner/backpack-web/bpk-component-barchart';
import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import ArrowLeftIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/arrow-left';
import ArrowRightIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/arrow-right';
import CalendarIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/calendar';
import {
  corePrimaryDay,
  coreAccentDay,
  surfaceLowContrastDay,
  textSecondaryDay,
  lineDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

// ── Types ────────────────────────────────────────────────────────────────────

type Day = {
  key: string;
  label: string;
  date: number;
  price: number | null;
};

// ── Constants ────────────────────────────────────────────────────────────────

const FULL_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// Prototype always shows dates 23–29 (last full week feel) regardless of month
const START_DATE = 23;
const START_MONTH_INDEX = 2; // March
const START_YEAR = 2026;
const MAX_MONTH_OFFSET = 11; // up to 12 months ahead

const CHART_WIDTH = 360;
const CHART_HEIGHT = 140;
const Y_AXIS_MARGIN = 4;

// ── Data generation ──────────────────────────────────────────────────────────

// Deterministic price per (month, day) so navigating back gives the same values.
// Uses two independent primes to spread values across £75–£255.
function deterministicPrice(monthOffset: number, dayIndex: number): number {
  const a = ((monthOffset + 3) * 13 + dayIndex * 7) % 97;
  const b = ((monthOffset + 5) * 17 + dayIndex * 11) % 83;
  return 75 + a + b;
}

function generateDays(monthOffset: number): Day[] {
  return DAY_LABELS.map((label, i) => {
    // Make a couple of days per month unavailable to keep the demo realistic
    const unavailable = (i + monthOffset) % 7 === 0;
    return {
      key: `d${i + 1}`,
      label,
      date: START_DATE + i,
      price: unavailable ? null : deterministicPrice(monthOffset, i),
    };
  });
}

function monthLabel(offset: number): string {
  const monthIndex = (START_MONTH_INDEX + offset) % 12;
  const year = START_YEAR + Math.floor((START_MONTH_INDEX + offset) / 12);
  return `${FULL_MONTH_NAMES[monthIndex]} ${year}`;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function PriceChartCard() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string>('d3');

  const days = useMemo(() => generateDays(monthOffset), [monthOffset]);
  const chartData = useMemo(() => days.map((d) => ({ ...d, chartPrice: d.price ?? 0 })), [days]);

  const selectedDay = days.find((d) => d.key === selectedKey);
  const selectedIndex = days.findIndex((d) => d.key === selectedKey);
  const barWidth = (CHART_WIDTH - Y_AXIS_MARGIN) / days.length;
  const tooltipLeft = Y_AXIS_MARGIN + (selectedIndex + 0.5) * barWidth;

  const cheapestPrice = Math.min(...days.filter((d) => d.price !== null).map((d) => d.price!));

  const currentMonth = monthLabel(monthOffset);
  const canGoPrev = monthOffset > 0;
  const canGoNext = monthOffset < MAX_MONTH_OFFSET;

  function handlePrevMonth() {
    if (!canGoPrev) return;
    const newOffset = monthOffset - 1;
    const newDays = generateDays(newOffset);
    setMonthOffset(newOffset);
    // Keep selected key if day has a price, otherwise pick first available
    const stillValid = newDays.find((d) => d.key === selectedKey && d.price !== null);
    if (!stillValid) {
      setSelectedKey(newDays.find((d) => d.price !== null)?.key ?? newDays[0].key);
    }
  }

  function handleNextMonth() {
    if (!canGoNext) return;
    const newOffset = monthOffset + 1;
    const newDays = generateDays(newOffset);
    setMonthOffset(newOffset);
    const stillValid = newDays.find((d) => d.key === selectedKey && d.price !== null);
    if (!stillValid) {
      setSelectedKey(newDays.find((d) => d.price !== null)?.key ?? newDays[0].key);
    }
  }

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
        }}
      >
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <BpkCard padded={false} atomic={false}>

            {/* ── Header ── */}
            <div style={{ padding: '1rem 1rem 0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <BpkText textStyle={TEXT_STYLES.label1} tagName="p" style={{ color: textSecondaryDay }}>
                    London Gatwick → Barcelona
                  </BpkText>
                  <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
                    Cheapest days to fly
                  </BpkText>
                </div>
                <BpkBadge type={BADGE_TYPES.success}>from £{cheapestPrice}</BpkBadge>
              </div>

              {/* ── Month navigation ── */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '0.75rem',
                }}
              >
                <BpkButton
                  type={BUTTON_TYPES.secondary}
                  iconOnly
                  disabled={!canGoPrev}
                  onClick={handlePrevMonth}
                >
                  <ArrowLeftIconSm />
                  <span className="bpk-visually-hidden">Previous month</span>
                </BpkButton>

                <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
                  {currentMonth}
                </BpkText>

                <BpkButton
                  type={BUTTON_TYPES.secondary}
                  iconOnly
                  disabled={!canGoNext}
                  onClick={handleNextMonth}
                >
                  <ArrowRightIconSm />
                  <span className="bpk-visually-hidden">Next month</span>
                </BpkButton>
              </div>
            </div>

            {/* ── Chart ── */}
            <div
              style={{
                position: 'relative',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                ['--bpk-barchart-bar-background-color' as string]: corePrimaryDay,
                ['--bpk-barchart-bar-hover-background-color' as string]: coreAccentDay,
                ['--bpk-barchart-bar-selected-background-color' as string]: coreAccentDay,
                ['--bpk-barchart-bar-active-background-color' as string]: coreAccentDay,
              }}
            >
              <BpkBarchart
                initialWidth={CHART_WIDTH}
                initialHeight={CHART_HEIGHT}
                data={chartData}
                xScaleDataKey="key"
                yScaleDataKey="chartPrice"
                xAxisLabel="Day"
                yAxisLabel="Price (£)"
                yAxisMargin={Y_AXIS_MARGIN}
                showGridlines
                disableDataTable={false}
                outlierPercentage={null}
                leadingScrollIndicatorClassName={null}
                trailingScrollIndicatorClassName={null}
                onBarClick={(_e: unknown, { point }: { point: Day }) => {
                  if (point.price !== null) setSelectedKey(point.key);
                }}
                onBarHover={null}
                onBarFocus={null}
                getBarSelection={(point: Day) => point.key === selectedKey}
                getBarLabel={(point: Day) =>
                  point.price !== null
                    ? `${point.label} ${point.date} — £${point.price}`
                    : `${point.label} ${point.date} — Not available`
                }
                xAxisTickValue={(key: string) => {
                  const d = days.find((d) => d.key === key);
                  return d ? d.label : key;
                }}
                yAxisTickValue={() => ''}
              />

              {/* Price tooltip above selected bar */}
              {selectedDay?.price != null && (
                <div
                  style={{
                    position: 'absolute',
                    top: 6,
                    left: tooltipLeft,
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                  }}
                >
                  <BpkBadge type={BADGE_TYPES.success}>£{selectedDay.price}</BpkBadge>
                </div>
              )}
            </div>

            {/* ── Date number row ── */}
            <div
              style={{
                display: 'flex',
                paddingLeft: 44,
                paddingRight: 12,
                marginTop: -6,
              }}
            >
              {days.map((d) => (
                <div key={d.key} style={{ flex: 1, textAlign: 'center' }}>
                  <BpkText
                    textStyle={TEXT_STYLES.footnote}
                    tagName="span"
                    style={{
                      color: d.key === selectedKey ? coreAccentDay : textSecondaryDay,
                      fontWeight: d.key === selectedKey ? 'bold' : 'normal',
                    }}
                  >
                    {d.date}
                  </BpkText>
                </div>
              ))}
            </div>

            {/* ── Divider ── */}
            <div style={{ borderTop: `1px solid ${lineDay}`, margin: '0.75rem 0 0' }} />

            {/* ── Footer ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
              }}
            >
              <div>
                {selectedDay && (
                  <>
                    <BpkText textStyle={TEXT_STYLES.footnote} tagName="p" style={{ color: textSecondaryDay }}>
                      {selectedDay.label} {selectedDay.date} {currentMonth}
                    </BpkText>
                    {selectedDay.price != null ? (
                      <BpkText textStyle={TEXT_STYLES.heading4} tagName="p">
                        £{selectedDay.price} per person
                      </BpkText>
                    ) : (
                      <BpkText textStyle={TEXT_STYLES.label1} tagName="p" style={{ color: textSecondaryDay }}>
                        Not available
                      </BpkText>
                    )}
                  </>
                )}
              </div>
              <BpkButton type={BUTTON_TYPES.featured} iconOnly>
                <CalendarIconSm />
                <span className="bpk-visually-hidden">Select date</span>
              </BpkButton>
            </div>

          </BpkCard>
        </div>
      </div>
    </BpkProvider>
  );
}
