import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportToExcel = ({ apiData1, fileName1 }) => {
  //{ apiData1, fileName1,apiData2,fileName2,apiData3,fileName3 }
   //console.log('excelled data',apiData1);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData1, fileName1) => {
    const ws1 = XLSX.utils.json_to_sheet(apiData1);
    const wb = { Sheets: { Diebold_Status: ws1}, SheetNames: [fileName1] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName1 + fileExtension);
  };

  return (
    <button onClick={(e) => exportToCSV(apiData1, fileName1)}  
    style={{padding:'5px', border:'none',backgroundColor:'#AACB73', borderRadius:'5px'}}>Export as Excel</button>
  );
};