import { format } from 'date-fns';
import styles from './table.module.scss';
import React from 'react';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

const Table: React.FC<TableProps> = ({ value, columns }) => {
  const formattedValue = (value: any, type: string) => {
    if (type === 'date') {
      return format(new Date(value), 'dd/MM/yyyy');
    }
    return value;
  };
  return (
    <>
      {!value?.Data || value.Data.length === 0 ? (
        <>No data</>
      ) : (
        <div className="flex">
          <table className={`${styles.tables}`}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th className={`${styles.th}`} key={column.key}>
                    <div className={styles['th-content']}>
                      <span>{column.title}</span>
                      <button className={styles.sortButton}>
                        <FaSort />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.Data.map((row: any, index: number) => (
                <tr className={`${styles.tr}`} key={index}>
                  {columns.map((column) => (
                    <td className={`py-2 px-1`} key={column.key}>
                      {formattedValue(row[column.key], column.type)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export interface TableProps {
  value: any;
  columns: Column[];
  onSort?: (key: string, direction: string) => void;
  filters?: any;
}

export interface Column {
  key: string;
  title: string;
  type: string;
}

export default Table;
