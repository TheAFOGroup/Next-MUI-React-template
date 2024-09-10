"use client"
import React from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";


const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

interface TableProps {
  title: string
  data: any[];
  columns: any[];
  options: any;
}

const DataTable: React.FC<TableProps> = ({ title, data, columns, options }) => {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={title}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
};
export default DataTable;
