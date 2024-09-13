import { Add, Delete } from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton,
  TextField
} from '@mui/material';
import React, { memo, useEffect, useState } from 'react';

interface FieldListProps {
  onChange: (fields: string[]) => void;
}

const FieldList: React.FC<FieldListProps> = ({ onChange }) => {
  const [rows, setRows] = useState<string[]>([""]);

  const handleAddRow = () => {
    setRows([...rows, ""]);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((_, index) => index !== id));
  };

  const handleFieldChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index] = value;
    setRows(newRows);
  };

  useEffect(() => {
    onChange(rows);
    console.log("fieldList", rows)
  }, [rows, onChange]);

  return (
    <Grid container direction="column" spacing="2">
      {rows.map((row, index) => (
        <Grid item key={index}>
          <TextField
            value={row}
            onChange={(e) => handleFieldChange(index, e.target.value)}
          />
          <IconButton onClick={() => handleDeleteRow(index)}>
            <Delete />
          </IconButton>
        </Grid>
      )
      )
      }
      <Grid item>
        <Button onClick={handleAddRow} startIcon={<Add />}>
          Add Row
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(FieldList);