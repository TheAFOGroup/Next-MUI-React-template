import { Add, Delete } from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton
} from '@mui/material';
import dayjs from 'dayjs';
import React, { memo, useCallback, useEffect, useState } from 'react';

import EventAgendaForm from '@/components/buildEventAgenda/EventAgendaForm';
import { EventAgendaProps } from '@/components/buildEventAgenda/types';
interface DynamicAgendaListProps {
  onChange: (fields: EventAgendaProps[]) => void;
}

const DynamicAgendaList: React.FC<DynamicAgendaListProps> = ({ onChange }: DynamicAgendaListProps) => {
  const [rows, setRows] = useState<EventAgendaProps[]>([{
    title: '',
    description: '',
    start_time: dayjs(),
    end_time: dayjs()
  }]);

  const handleAddRow = () => {
    const initialEventAgendaProps: EventAgendaProps = {
      title: '',
      description: '',
      start_time: dayjs(),
      end_time: dayjs()
    };
    setRows([...rows, initialEventAgendaProps]);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((_, index) => index !== id));
  };

  const handleFieldChange = useCallback((index: number, value: EventAgendaProps) => {
    if (rows[index] != value) {
      const newRows = [...rows];
      newRows[index] = value;
      setRows(newRows);
    }
  }, [rows]);

  useEffect(() => {
    onChange(rows);
    console.log("fieldList", rows)
  }, [rows, onChange]);

  return (
    <Grid container direction="column" spacing="2">
      {rows.map((row, index) => (
        <Grid item key={index}>
          <Grid container direction="row" spacing="2">
            <Grid item xs={11}>
              <EventAgendaForm onChange={(data) => handleFieldChange(index, data)} />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => handleDeleteRow(index)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
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

export default memo(DynamicAgendaList);