"use client"
import { Add, Delete } from '@mui/icons-material';
import {
  Alert,
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
  TextField
} from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { isEqual } from 'lodash';

import FieldList from '@/components/utils/FieldList/FieldList';
import { DropDownType, DynamicField } from '@/components/utils/FieldTypeTable/types';
interface FieldTypeTableProps {
  dropdownTypes: DropDownType[];
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
  const [rows, setRows] = useState([{ field_name: 'email', field_type: 'email', field_info: [""] }]);

  const handleAddRow = () => {
    setRows([...rows, { field_name: '', field_type: '', field_info: [""] }]);
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

  const handleChildTable = useCallback((index: number, updatedFields) => {
    // BUG: This keep triggering
    if (rows[index].field_info != updatedFields) {
      const newRows = [...rows];
      newRows[index].field_info = updatedFields;
      setRows(newRows);
    }
    console.log("handleChildTable", rows)
  }, [rows]);

  const getChildTable = (fieldType: string, index: number) => {
    const type = dropdownTypes.find(dt => dt.dropdown_type === fieldType);
    if (type?.child_table.enabled) {
      return (
        <>
          <Alert severity="info">{type.child_table.hints}</Alert>
          <FieldList onChange={(updatedFields) => handleChildTable(index, updatedFields)} />
        </>
      );
    }
  };

  useEffect(() => {
    const fieldsWithOrder: DynamicField[] = rows.map((field, index) => ({
      ...field,
      field_order: index + 1
    }));
    onChange(fieldsWithOrder);
    console.log("UseEffect", fieldsWithOrder)
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
                    {dropdownTypes.map((obj) => (
                      <MenuItem key={obj.dropdown_type} value={obj.dropdown_type}>
                        {obj.dropdown_type}
                      </MenuItem>
                    ))}
                  </Select>
                  {getChildTable(row.field_type, index)}
                </TableCell>
                <TableCell>
                  {index != 0 ?
                    <IconButton onClick={() => handleDeleteRow(index)}>
                      <Delete />
                    </IconButton> : <></>
                  }
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