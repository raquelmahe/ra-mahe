import { useState } from 'react';
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkBarchart from '@skyscanner/backpack-web/bpk-component-barchart';
import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';
import {
  corePrimaryDay,
  coreAccentDay,
  surfaceDefaultDay,
  textSecondaryDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

type DataPoint = {
  key: string;
  dayLabel: string;
  dateNum: number;
  price: number;
  hasPrice: boolean;
};

// 10-day dataset: Mo 1–We 10, with Fr 5 as the initially-selected bar
const CHART_DATA: DataPoint[] = [
  { key: 'Mo1', dayLabel: 'Mo', dateNum: 1, price: 8, hasPrice: false },
  { key: 'Tu2', dayLabel: 'Tu', dateNum: 2, price: 8, hasPrice: false },
  { key: 'We3', dayLabel: 'We', dateNum: 3, price: 8, hasPrice: false },
  { key: 'Th4', dayLabel: 'Th', dateNum: 4, price: 65, hasPrice: true },
  { key: 'Fr5', dayLabel: 'Fr', dateNum: 5, price: 56, hasPrice: true },
  { key: 'Sa6', dayLabel: 'Sa', dateNum: 6, price: 72, hasPrice: true },
  { key: 'Su7', dayLabel: 'Su', dateNum: 7, price: 80, hasPrice: true },
  { key: 'Mo8', dayLabel: 'Mo', dateNum: 8, price: 68, hasPrice: true },
  { key: 'Tu9', dayLabel: 'Tu', dateNum: 9, price: 45, hasPrice: true },
  { key: 'We10', dayLabel: 'We', dateNum: 10, price: 38, hasPrice: true },
];

type FilterType = 'selected' | 'no-price' | 'price';

function BarChartSection({
  title,
  subtitle,
  selectedKey,
  onSelect,
}: {
  title: string;
  subtitle: string;
  selectedKey: string;
  onSelect: (key: string) => void;
}) {
  const selectedPoint = CHART_DATA.find((d) => d.key === selectedKey);
  const selectedIndex = selectedPoint ? CHART_DATA.indexOf(selectedPoint) : -1;
  // y-axis margin is now 4px; outer padding ~0.35 of one bar width on each side
  const yAxisMargin = 4;
  const chartContentWidth = 340 - yAxisMargin;
  const barWidth = chartContentWidth / CHART_DATA.length;
  const tooltipLeft = yAxisMargin + (selectedIndex + 0.5) * barWidth;

  return (
    <div>
      {/* Section header */}
      <div style={{ marginBottom: 4 }}>
        <BpkText textStyle={TEXT_STYLES.footnote} tagName="p" style={{ color: textSecondaryDay }}>
          {title}
        </BpkText>
        <BpkText textStyle={TEXT_STYLES.heading4} tagName="h2">
          {subtitle}
        </BpkText>
      </div>

      {/* Chart wrapper — CSS custom props override bar colours to dark navy */}
      <div
        style={{
          position: 'relative',
          ['--bpk-barchart-bar-background-color' as string]: corePrimaryDay,
          ['--bpk-barchart-bar-hover-background-color' as string]: coreAccentDay,
          ['--bpk-barchart-bar-selected-background-color' as string]: coreAccentDay,
          ['--bpk-barchart-bar-active-background-color' as string]: coreAccentDay,
        }}
      >
        <BpkBarchart
          initialWidth={340}
          initialHeight={160}
          data={CHART_DATA}
          xScaleDataKey="key"
          yScaleDataKey="price"
          disableDataTable={false}
          outlierPercentage={null}
          showGridlines
          leadingScrollIndicatorClassName={null}
          trailingScrollIndicatorClassName={null}
          onBarClick={(_e: unknown, { point }: { point: DataPoint }) => onSelect(point.key)}
          onBarHover={null}
          onBarFocus={null}
          getBarSelection={(point: DataPoint) => point.key === selectedKey}
          getBarLabel={(point: DataPoint) =>
            point.hasPrice
              ? `${point.dayLabel} ${point.dateNum} — £${point.price}`
              : `${point.dayLabel} ${point.dateNum} — No price`
          }
          xAxisTickValue={(val: string) => {
            const found = CHART_DATA.find((d) => d.key === val);
            return found ? found.dayLabel : val;
          }}
          yAxisTickValue={() => ''}
          yAxisMargin={4}
        />

        {/* Price tooltip above selected bar */}
        {selectedPoint?.hasPrice && (
          <div
            style={{
              position: 'absolute',
              top: 6,
              left: tooltipLeft,
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}
          >
            <BpkBadge type={BADGE_TYPES.success}>£{selectedPoint.price}</BpkBadge>
          </div>
        )}
      </div>

      {/* Date numbers row — aligned under x-axis ticks */}
      <div
        style={{
          display: 'flex',
          paddingLeft: 40,
          paddingRight: 4,
          marginTop: -8,
        }}
      >
        {CHART_DATA.map((d) => (
          <div key={d.key} style={{ flex: 1, textAlign: 'center' }}>
            <BpkText
              textStyle={TEXT_STYLES.footnote}
              tagName="span"
              style={{
                color: d.key === selectedKey ? coreAccentDay : textSecondaryDay,
                fontWeight: d.key === selectedKey ? 'bold' : 'normal',
              }}
            >
              {d.dateNum}
            </BpkText>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BarChartApp() {
  const [departureSelected, setDepartureSelected] = useState('Fr5');
  const [returnSelected, setReturnSelected] = useState('Fr5');
  const [activeFilter, setActiveFilter] = useState<FilterType>('selected');

  const filters: { label: string; type: FilterType; badgeType: typeof BADGE_TYPES[keyof typeof BADGE_TYPES] }[] = [
    { label: 'Selected', type: 'selected', badgeType: BADGE_TYPES.success },
    { label: 'No Price', type: 'no-price', badgeType: BADGE_TYPES.normal },
    { label: 'Price', type: 'price', badgeType: BADGE_TYPES.inverse },
  ];

  return (
    <BpkProvider>
      <div
        style={{
          backgroundColor: surfaceDefaultDay,
          minHeight: '100vh',
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          {/* Legend / filter badges */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              justifyContent: 'flex-end',
              marginBottom: 16,
            }}
          >
            {filters.map(({ label, type, badgeType }) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                aria-pressed={activeFilter === type}
              >
                <BpkBadge type={badgeType}>{label}</BpkBadge>
              </button>
            ))}
          </div>

          {/* Departure chart */}
          <BarChartSection
            title="Departure"
            subtitle="Month"
            selectedKey={departureSelected}
            onSelect={setDepartureSelected}
          />

          <div style={{ height: 32 }} />

          {/* Return chart */}
          <BarChartSection
            title="Return"
            subtitle="Month"
            selectedKey={returnSelected}
            onSelect={setReturnSelected}
          />
        </div>
      </div>
    </BpkProvider>
  );
}
