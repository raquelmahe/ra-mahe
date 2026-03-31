import { useState } from 'react';
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import PictureIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/picture';
import {
  borderRadiusMd,
  borderRadiusSm,
  surfaceLowContrastDay,
  surfaceDefaultDay,
  lineDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

// ── Placeholder travel images (picsum.photos — stable by ID) ─────────────────
const imgLeft   = 'https://picsum.photos/seed/sky1/800/900';
const imgImage2 = 'https://picsum.photos/seed/sky2/600/600';
const imgImage3 = 'https://picsum.photos/seed/sky3/300/280';
const imgImage4 = 'https://picsum.photos/seed/sky4/300/280';
const imgImage5 = 'https://picsum.photos/seed/sky5/400/430';
const imgImage6 = 'https://picsum.photos/seed/sky6/400/430';

// ── Types ────────────────────────────────────────────────────────────────────
type GalleryVariant = 'Six' | 'Three' | 'One';

// ── Shared constants ─────────────────────────────────────────────────────────
const GAP = 4;
const GALLERY_HEIGHT = 432;
// Right column is ~19.5% of 1047px in Figma; expressed as a flex basis here
const RIGHT_COL_BASIS = '19.5%';

// ── Shared image style ────────────────────────────────────────────────────────
const imgStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  pointerEvents: 'none',
};

// ── "View photos" button overlay ──────────────────────────────────────────────
function ViewPhotosButton() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 12,
        right: 12,
        zIndex: 1,
      }}
    >
      <BpkButton type={BUTTON_TYPES.primaryOnDark}>
        <PictureIconSm style={{ marginRight: 6, verticalAlign: 'middle' }} />
        View photos
      </BpkButton>
    </div>
  );
}

// ── Six-image variant ─────────────────────────────────────────────────────────
function SixImageGrid() {
  return (
    <div
      style={{
        position: 'relative',
        height: GALLERY_HEIGHT,
        borderRadius: borderRadiusMd,
        overflow: 'hidden',
      }}
    >
      {/* Image grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          gap: GAP,
        }}
      >
        {/* Left — full height */}
        <div style={{ flex: '1 0 0', position: 'relative' }}>
          <img alt="Gallery image 1" src={imgLeft} style={imgStyle} />
        </div>

        {/* Right group */}
        <div style={{ flex: '1 0 0', display: 'flex', gap: GAP }}>

          {/* Centre column */}
          <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: GAP }}>
            <div style={{ height: 288, position: 'relative', flexShrink: 0 }}>
              <img alt="Gallery image 2" src={imgImage2} style={imgStyle} />
            </div>
            {/* Bottom two images */}
            <div style={{ flex: '1 0 0', display: 'flex', gap: GAP }}>
              <div style={{ flex: '1 0 0', position: 'relative' }}>
                <img alt="Gallery image 3" src={imgImage3} style={imgStyle} />
              </div>
              <div style={{ flex: '1 0 0', position: 'relative' }}>
                <img alt="Gallery image 4" src={imgImage4} style={imgStyle} />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div
            style={{
              flex: `0 0 ${RIGHT_COL_BASIS}`,
              display: 'flex',
              flexDirection: 'column',
              gap: GAP,
            }}
          >
            <div
              style={{
                flex: '1 0 0',
                position: 'relative',
                borderRadius: `0 ${borderRadiusSm} 0 0`,
                overflow: 'hidden',
              }}
            >
              <img alt="Gallery image 5" src={imgImage5} style={imgStyle} />
            </div>
            <div
              style={{
                flex: '1 0 0',
                position: 'relative',
                borderRadius: `0 0 ${borderRadiusSm} 0`,
                overflow: 'hidden',
              }}
            >
              <img alt="Gallery image 6" src={imgImage6} style={imgStyle} />
            </div>
          </div>
        </div>
      </div>

      <ViewPhotosButton />
    </div>
  );
}

// ── Three-image variant ───────────────────────────────────────────────────────
function ThreeImageGrid() {
  return (
    <div
      style={{
        position: 'relative',
        height: GALLERY_HEIGHT,
        borderRadius: borderRadiusMd,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          gap: GAP,
        }}
      >
        {/* Left */}
        <div style={{ flex: '1 0 0', position: 'relative' }}>
          <img alt="Gallery image 1" src={imgLeft} style={imgStyle} />
        </div>

        {/* Right column — two stacked */}
        <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: GAP }}>
          <div style={{ flex: '1 0 0', position: 'relative' }}>
            <img alt="Gallery image 2" src={imgImage2} style={imgStyle} />
          </div>
          <div style={{ flex: '1 0 0', position: 'relative' }}>
            <img alt="Gallery image 3" src={imgImage5} style={imgStyle} />
          </div>
        </div>
      </div>

      <ViewPhotosButton />
    </div>
  );
}

// ── One-image variant ─────────────────────────────────────────────────────────
function OneImageGrid() {
  return (
    <div
      style={{
        position: 'relative',
        height: GALLERY_HEIGHT,
        borderRadius: borderRadiusMd,
        overflow: 'hidden',
      }}
    >
      <img alt="Gallery image" src={imgLeft} style={imgStyle} />
      <ViewPhotosButton />
    </div>
  );
}

// ── Variant tab bar ───────────────────────────────────────────────────────────
const VARIANTS: GalleryVariant[] = ['Six', 'Three', 'One'];

function VariantTabs({
  active,
  onChange,
}: {
  active: GalleryVariant;
  onChange: (v: GalleryVariant) => void;
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        border: `1px solid ${lineDay}`,
        borderRadius: borderRadiusSm,
        overflow: 'hidden',
        marginBottom: '1.5rem',
        backgroundColor: surfaceDefaultDay,
      }}
    >
      {VARIANTS.map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          style={{
            padding: '0.5rem 1.25rem',
            border: 'none',
            borderRight: v !== 'One' ? `1px solid ${lineDay}` : 'none',
            background: active === v ? '#e0e4e9' : surfaceDefaultDay,
            cursor: 'pointer',
            fontWeight: active === v ? 'bold' : 'normal',
          }}
          aria-pressed={active === v}
        >
          <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
            {v} {v === 'One' ? 'image' : 'images'}
          </BpkText>
        </button>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ImageGalleryPreview() {
  const [variant, setVariant] = useState<GalleryVariant>('Six');

  return (
    <BpkProvider>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: surfaceLowContrastDay,
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          {/* Page header */}
          <div style={{ marginBottom: '1rem' }}>
            <BpkText textStyle={TEXT_STYLES.heading2} tagName="h1">
              Image Gallery Preview
            </BpkText>
            <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p" color="text-secondary">
              Desktop gallery grid — select a variant below
            </BpkText>
          </div>

          <VariantTabs active={variant} onChange={setVariant} />

          {/* Gallery */}
          {variant === 'Six' && <SixImageGrid />}
          {variant === 'Three' && <ThreeImageGrid />}
          {variant === 'One' && <OneImageGrid />}
        </div>
      </div>
    </BpkProvider>
  );
}
