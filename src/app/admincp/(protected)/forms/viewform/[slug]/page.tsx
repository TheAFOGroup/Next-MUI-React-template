import React from "react";

import DataTable from "@/components/utils/DataTable/DataTable";

import { GetFormResult } from "@/app/api/forms/getformresult/getformresult";
import { FormResult } from "@/app/api/forms/getformresult/types";

const ViewFormPage = async ({ params }: { params: { slug: string } }) => {
  const uuid = params.slug

  let formData: FormResult[] = [];
  let columns: string[] = [];
  let responses: any[] = [];

  formData = await GetFormResult(uuid);
  columns = ["response_id"];
  formData.forEach(item => {
    if (!columns.includes(item.field_name)) {
      columns.push(item.field_name);
    }
  });
  columns.push("created_at");
  console.log("column", columns)

  // Transform responses
  responses = formData.reduce((acc: any[], item) => {
    let responseObj = acc.find(obj => obj.response_id === item.response_id);
    if (!responseObj) {
      responseObj = { response_id: item.response_id, created_at: item.created_at };
      acc.push(responseObj);
    }
    if (responseObj) {
      responseObj[item.field_name] = item.response;
    }
    return acc;
  }, []);

  console.log("responses", responses)


  const options = {
    filterType: 'checkbox',
  };

  return (
    <DataTable
      title="title"
      data={responses}
      columns={columns}
      options={options}
    />
  );
};

export default ViewFormPage;

/**
 * 
 *  <h1>Employee List</h1>
      <MUIDataTable
        title=""
        data={data}
        columns={columns}
        options={options}
      />
 */