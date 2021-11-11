import { Chip, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { displayDistance } from './../utils/display.util';
import { Label } from './label.component';

const DISTANCES = [
  {
    name: displayDistance(1000),
    value: 1000,
  },
  {
    name: displayDistance(2000),
    value: 2000,
  },
  {
    name: displayDistance(5000),
    value: 5000,
  },
  {
    name: displayDistance(10000),
    value: 10000,
  },
  {
    name: 'Halfmarathon',
    value: 21097,
  },
  {
    name: 'Marathon',
    value: 42195,
  },
];

type DistancePickerProps = {
  value: number;
  onChange: (distance: number) => void;
};

export const DistancePicker: React.FC<DistancePickerProps> = ({
  value,
  onChange,
}) => {
  const [distance, setDistance] = useState(String(value));

  useEffect(() => {
    onChange(Number(distance));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance]);

  return (
    <>
      <Label>Distance (meters)</Label>

      <TextField
        type="number"
        label="Distance"
        sx={{ mb: 2 }}
        value={distance}
        onChange={({ target: { value } }) => {
          setDistance(value);
        }}
        inputProps={{ min: 0 }}
      />

      <Stack direction="row" spacing={1} justifyContent="center">
        {DISTANCES.map((item) => (
          <Chip
            key={item.value}
            color="primary"
            variant="outlined"
            label={item.name}
            onClick={() => setDistance(String(item.value))}
          />
        ))}
      </Stack>
    </>
  );
};
