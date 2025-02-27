/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Column {
  title: string;
  dataIndex: string;
  render?: (value: any) => React.ReactNode;
}

interface TableComponentProps {
  data: any[];
  columns: Column[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data, columns }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border  !rounded-xl">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns.map((col, index) => (
            <th key={index} scope="col" className="tp">
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="tp">
                {col.render
                  ? col.render(row[col.dataIndex])
                  : row[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
