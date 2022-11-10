import React from 'react'
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

const ExcelExport = ({excelData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async () => {
        if(fileName === 'Tejdharart_orders'){

            const ws = XLSX.utils.json_to_sheet(excelData, {header: ["date","title", "colorVariant", "sizeVariant", "variantPrice", "custom", "quantity","name", "phone", "address", "status"], cellDates: true, dateNF:'dd/mm/yyyy'});
            const wb = {Sheets : {'data':ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType:'xlsx', type:'array'});
        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);
        }
        else{
            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = {Sheets : {'data':ws}, SheetNames: ['data']};
            const excelBuffer = XLSX.write(wb, {bookType:'xlsx', type:'array'});
            const data = new Blob([excelBuffer], {type: fileType});
    
            FileSaver.saveAs(data, fileName + fileExtension);
        }
        
    }
  return (
    <div>
        <div className='bg-green-600 cursor-pointer shadow-md text-white font-semibold w-fit my-3 px-3 py-1 rounded-md' onClick={(e) => exportToExcel(fileName)}>
            Download Excel 
        </div>
    </div>
  )
}

export default ExcelExport