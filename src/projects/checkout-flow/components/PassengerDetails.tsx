import { useState } from 'react';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkInput, { INPUT_TYPES } from '@skyscanner/backpack-web/bpk-component-input';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';
import BpkSelect from '@skyscanner/backpack-web/bpk-component-select';
import BpkFieldset from '@skyscanner/backpack-web/bpk-component-fieldset';
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';
import BpkSectionHeader from '@skyscanner/backpack-web/bpk-component-section-header';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';
import FlightSummaryCard from './FlightSummaryCard';

interface PassengerDetailsProps {
  onNext: () => void;
}

export default function PassengerDetails({ onNext }: PassengerDetailsProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [title, setTitle] = useState('');
  const [nationality, setNationality] = useState('');
  const [saveDetails, setSaveDetails] = useState(false);
  const [touched, setTouched] = useState(false);

  const isValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.includes('@') &&
    title.length > 0;

  const handleContinue = () => {
    setTouched(true);
    if (isValid) onNext();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FlightSummaryCard />

      <BpkCard padded={false}>
        <div style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <BpkSectionHeader title="Passenger 1 — Adult" />
          </div>

          {/* Title */}
          <div style={{ marginBottom: '1rem' }}>
            <BpkFieldset label="Title" required>
              <BpkSelect
                id="title"
                name="title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTitle(e.target.value)}
                valid={!touched || title.length > 0}
              >
                <option value="" disabled>Select title</option>
                <option value="mr">Mr</option>
                <option value="ms">Ms</option>
                <option value="mrs">Mrs</option>
                <option value="dr">Dr</option>
              </BpkSelect>
            </BpkFieldset>
          </div>

          {/* Name row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <BpkFieldset
              label="First name"
              required
              valid={!touched || firstName.trim().length > 0}
              validationMessage="First name is required"
            >
              <BpkInput
                id="firstName"
                name="firstName"
                type={INPUT_TYPES.text}
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                placeholder="e.g. Emma"
                valid={!touched || firstName.trim().length > 0}
              />
            </BpkFieldset>

            <BpkFieldset
              label="Last name"
              required
              valid={!touched || lastName.trim().length > 0}
              validationMessage="Last name is required"
            >
              <BpkInput
                id="lastName"
                name="lastName"
                type={INPUT_TYPES.text}
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                placeholder="e.g. Johnson"
                valid={!touched || lastName.trim().length > 0}
              />
            </BpkFieldset>
          </div>

          {/* Date of birth */}
          <div style={{ marginBottom: '1rem' }}>
            <BpkFieldset label="Date of birth">
              <BpkInput
                id="dob"
                name="dob"
                type={'date' as (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES]}
                value={dob}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)}
              />
            </BpkFieldset>
          </div>

          {/* Nationality */}
          <div style={{ marginBottom: '1rem' }}>
            <BpkFieldset label="Nationality">
              <BpkSelect
                id="nationality"
                name="nationality"
                value={nationality}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNationality(e.target.value)}
              >
                <option value="">Select nationality</option>
                <option value="gb">British</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
                <option value="fr">French</option>
                <option value="us">American</option>
                <option value="other">Other</option>
              </BpkSelect>
            </BpkFieldset>
          </div>
        </div>
      </BpkCard>

      <BpkCard padded={false}>
        <div style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <BpkSectionHeader title="Contact details" />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1rem' }}>
            <BpkFieldset
              label="Email address"
              required
              description="We'll send your booking confirmation here"
              valid={!touched || email.includes('@')}
              validationMessage="Please enter a valid email address"
            >
              <BpkInput
                id="email"
                name="email"
                type={INPUT_TYPES.email}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="emma@example.com"
                valid={!touched || email.includes('@')}
              />
            </BpkFieldset>
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '1.25rem' }}>
            <BpkFieldset label="Phone number" description="Optional, in case we need to contact you">
              <BpkInput
                id="phone"
                name="phone"
                type={INPUT_TYPES.tel}
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                placeholder="+44 7700 900000"
              />
            </BpkFieldset>
          </div>

          <BpkCheckbox
            name="saveDetails"
            label="Save these details for future bookings"
            checked={saveDetails}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaveDetails(e.target.checked)}
          />
        </div>
      </BpkCard>

      <BpkButton type={BUTTON_TYPES.featured} onClick={handleContinue} fullWidth>
        Continue to seats &amp; extras
      </BpkButton>
    </div>
  );
}
