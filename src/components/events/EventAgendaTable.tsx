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
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { EventAgenda } from '@/app/api/events/getEventsAgenda/types';

import { Loading } from '@/components/Loading';

interface EventAgendaTableProp {
  eventId: string
}

function Row(props: { row }) {
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
          {row.title}
        </TableCell>
        <TableCell align="right">{row.start_time}</TableCell>
        <TableCell align="right">{row.end_time}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const EventAgendaTable: React.FC<EventAgendaTableProp> = ({ eventId }) => {
  const [agenda, setAgenda] = useState<EventAgenda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_HOST + '/api/events/getEventsAgenda', {
      params: {
        event_id: eventId
      },
      headers: {
        'Api-Secret': process.env.NEXT_PUBLIC_API_SECRET
      }
    })
      .then(response => {
        const data = response.data;
        setAgenda(data as EventAgenda[]);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);


  if (loading) {
    return (
      <Loading />
    )
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
          {agenda.map((row) => (
            <Row key={row.event_agenda_id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventAgendaTable;