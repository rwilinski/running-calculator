import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { displayPace } from '../utils/display.util';
import { SpeedPicker } from '../shared/speed-picker.component';
import { Summary } from './../shared/summary.component';
import { SummaryItem } from './../shared/summary-item.component';

export const SpeedToPaceConverter = () => {
  const [speed, setSpeed] = useState(10);

  const [pace, setPace] = useState<number>();

  useEffect(() => {
    setPace(speed ? (1 / speed) * 3600 : 0);
  }, [speed]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Speed to Pace Converter
      </Typography>

      <Typography variant="body1" paragraph={true}>
        Enter a speed to find the corresponding pace.
      </Typography>

      <SpeedPicker value={speed} onChange={setSpeed} />

      <Summary>
        <SummaryItem label="Pace">{displayPace(pace)}</SummaryItem>
      </Summary>
    </>
  );
};
