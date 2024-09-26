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

import { EventAgendaTableType } from '@/components/events/EventAgendaTable/types';
interface EventAgendaTableProp {
  agenda: EventAgendaTableType[]
}

function Row(props: { row: EventAgendaTableType }) {
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
        <TableCell align="right">{row.events_agenda_start_time.format("HH:mm")}</TableCell>
        <TableCell align="right">{row.events_agenda_end_time.format("HH:mm")}</TableCell>
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

  console.log("agenda", agenda)
  if (agenda.length === 0) {
    return <></>
  }
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
          {agenda.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventAgendaTable;