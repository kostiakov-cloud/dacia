import React from 'react';
import { TestDriveForm } from './TestDriveForm';
import { testDriveIntro } from '../../data/testDrive';
import { reveal } from '../../reveal';

/** /test-drive: title band (title + subtitle) and the request form. */
export function TestDrivePage({ intro = testDriveIntro }) {
  return (
    <>
      <section aria-labelledby="test-drive-title" className="border-b border-alpha-d-3 bg-surface-03">
        <div {...reveal('fade')} className="mx-auto max-w-[1280px] px-4 py-10 text-center md:px-8 md:py-14">
          <h1 id="test-drive-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
            {intro.title}
          </h1>
          <p className="mx-auto mt-3 max-w-[760px] text-small font-medium text-ink-13 md:text-root">{intro.subtitle}</p>
        </div>
      </section>
      <TestDriveForm />
    </>
  );
}
