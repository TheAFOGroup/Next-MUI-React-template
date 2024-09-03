"use client"
import React, { useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Paper,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { DynamicField } from '@/components/utils/DynamicTable/types';

const types = ["text", "number", "email"];

interface DynamicTableProps {
  onSubmit: (fields: DynamicField[]) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ onSubmit }) => {
  const [rows, setRows] = useState([{ field_name: '', field_type: '' }]);

  const handleAddRow = () => {
    setRows([...rows, { field_name: '', field_type: '' }]);
  };

  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleFieldChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].field_name = value;
    setRows(newRows);
  };

  const handleTypeChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].field_type = value;
    setRows(newRows);
  };

  const handleSubmit = () => {
    const fieldsWithOrder: DynamicField[] = rows.map((field, index) => ({
      ...field,
      field_order: index + 1
    }));
    onSubmit(fieldsWithOrder);
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={row.field_name}
                    onChange={(e) => handleFieldChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={row.field_type}
                    onChange={(e) => handleTypeChange(index, e.target.value)}
                  >
                    {types.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteRow(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleAddRow} startIcon={<Add />}>
        Add Row
      </Button>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </Container>
  );
};

export default DynamicTable;