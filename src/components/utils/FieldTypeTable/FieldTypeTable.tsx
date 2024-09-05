"use client"
import { Add, Delete } from '@mui/icons-material';
import {
  Button,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { memo, useEffect, useState } from 'react';

import { DynamicField } from '@/components/utils/FieldTypeTable/types';

interface FieldTypeTableProps {
  dropdownTypes: string[];
  onChange: (fields: DynamicField[]) => void;
}

/**
 * FieldTypeTable component for rendering a table with dynamic rows with textfield and a drop down menu.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<string>} props.dropdownTypes - The dropdown types for field types.
 * @param {Function} props.onChange - The callback function triggered when the table rows change.
 * @returns {JSX.Element} The rendered FieldTypeTable component.
 */
const FieldTypeTable: React.FC<FieldTypeTableProps> = ({ dropdownTypes, onChange }) => {
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

  useEffect(() => {
    const fieldsWithOrder: DynamicField[] = rows.map((field, index) => ({
      ...field,
      field_order: index + 1
    }));
    onChange(fieldsWithOrder);
  }, [rows, onChange]);

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
                    {dropdownTypes.map((type) => (
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
    </Container>
  );
};

export default memo(FieldTypeTable);