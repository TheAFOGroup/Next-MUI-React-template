import { Add, Delete } from '@mui/icons-material';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { SpeakerDropDownOption } from './types';

interface DynamicSpeakerDropDownProps {
  dropDownOptions: SpeakerDropDownOption[];

  // return an array of events_speaker_id that is selected
  onChange: (fields: string[]) => void;
}

const DynamicSpeakerDropDown: React.FC<DynamicSpeakerDropDownProps> = ({ onChange, dropDownOptions }: DynamicSpeakerDropDownProps) => {
  const [rows, setRows] = useState<string[]>([""]);

  const handleAddRow = () => {
    setRows([...rows, ""]);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((_, index) => index !== id));
  };

  const handleFieldChange = useCallback((index: number, events_speaker_id: string) => {
    const newRows = [...rows];
    newRows[index] = events_speaker_id;
    setRows(newRows);
  }, [rows]);

  useEffect(() => {
    onChange(rows);
    console.log("fieldList", rows);
  }, [rows, onChange]);

  return (
    <Grid container direction="column" spacing={2}>
      {rows.map((row, index) => (
        <Grid item key={index}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={11}>
              <FormControl fullWidth>
                <InputLabel id={`dropdown-label-${index}`}>Select Speaker</InputLabel>
                <Select
                  labelId={`dropdown-label-${index}`}
                  value={row[index]}
                  onChange={(e) => handleFieldChange(index, e.target.value as string)}
                >
                  {dropDownOptions.map((option) => (
                    <MenuItem key={option.events_speaker_id} value={option.events_speaker_id}>
                      {option.events_speaker_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => handleDeleteRow(index)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <Button onClick={handleAddRow} startIcon={<Add />}>
          Add Row
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(DynamicSpeakerDropDown);