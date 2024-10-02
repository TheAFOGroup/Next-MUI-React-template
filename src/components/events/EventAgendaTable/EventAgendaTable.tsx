"use client"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { EventAgendaTableType } from '@/components/events/EventAgendaTable/types';
interface EventAgendaTableProp {
  agenda: EventAgendaTableType[]
}

interface serialisedAgendaType {
  events_agenda_title: string; // Agenda title, required varchar
  events_agenda_description?: string; // Agenda description, optional text
  events_agenda_start_time: Dayjs; // Start time of the agenda, stored as a string in the format 'HH:MM:SS'
  events_agenda_end_time: Dayjs; // End time of the agenda, stored as a string in the format 'HH:MM:SS'
}

function Row(props: { row: serialisedAgendaType }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.events_agenda_title}
        </TableCell>
        <TableCell align="right">{row.events_agenda_start_time ? row.events_agenda_start_time.format("HH:mm") : ""}</TableCell>
        <TableCell align="right">{row.events_agenda_end_time ? row.events_agenda_end_time.format("HH:mm") : ""}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.events_agenda_description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const EventAgendaTable: React.FC<EventAgendaTableProp> = ({ agenda }) => {

  if (agenda.length === 0) {
    return <></>
  }


  const serialisedAgenda: serialisedAgendaType[] = agenda ? agenda.map(agenda => {
    let startTime;
    let endTime;
    if (typeof agenda.events_agenda_start_time === 'string') {
      startTime = agenda.events_agenda_start_time = dayjs(agenda.events_agenda_start_time);
    } else {
      startTime = agenda.events_agenda_start_time
    }
    if (typeof agenda.events_agenda_end_time === 'string') {
      endTime = agenda.events_agenda_end_time = dayjs(agenda.events_agenda_end_time);
    } else {
      endTime = agenda.events_agenda_end_time
    }
    return ({
      ...agenda,
      events_agenda_start_time: startTime, // Convert back to Dayjs
      events_agenda_end_time: endTime // Convert back to Dayjs
    })
  }) : [];


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Agenda Title</TableCell>
            <TableCell align="right">Start time</TableCell>
            <TableCell align="right">End time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serialisedAgenda.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventAgendaTable;