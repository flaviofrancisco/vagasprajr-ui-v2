import { format } from 'date-fns';
import styles from './table.module.scss';
import React from 'react';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

const Table: React.FC<TableProps> = ({ value, columns, filters, onSort, onContextMenu }) => {
  const [sort, setSort] = React.useState<Sort>(Sort.IDLE);
  const formattedValue = (value: any, type: string) => {
    if (type === 'date') {
      return format(new Date(value), 'dd/MM/yyyy');
    }
    return value;
  };

  const getSortIcon = (key: string) => {
    if (filters?.sort === key) {
      if (filters?.is_ascending) {
        return <FaSortUp />;
      } else {
        return <FaSortDown />;
      }
    }
    return <FaSort />;
  };

  const cutText = (text: string, maxLength?: number) => {
    if (!maxLength) {
      return text;
    }
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  };

  return (
    <>
      {!value?.Data || value.Data.length === 0 ? (
        <>No data</>
      ) : (
        <div className="flex w-full justify-center">
          <table className={`table-fixed m-4 w-full ${styles.tables}`}>
            <thead>
              <tr>
                {columns.map((column: Column, index: number) => (
                  <th className={`w-${column.columnSize} px-4 py-2 ${styles.th}`} key={column.key}>
                    <div className={styles['th-content']}>
                      <span>{column.title}</span>
                      <button
                        onClick={() => {
                          if (onSort) {
                            if (sort === Sort.IDLE || sort === Sort.DESC) {
                              setSort(Sort.ASC);
                              onSort(column.key, Sort.ASC);
                            } else {
                              setSort(Sort.DESC);
                              onSort(column.key, Sort.DESC);
                            }
                          }
                        }}
                        className={styles.sortButton}
                      >
                        {getSortIcon(column.key)}
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.Data.map((row: any, index: number) => (
                <tr
                  className={`${styles.tr}`}
                  key={index}
                  onContextMenu={(e) => {
                    if (onContextMenu) {
                      onContextMenu(e, row);
                    }
                  }}
                >
                  {columns.map((column) => (
                    <td className={`px-4 py-2 w-${column.columnSize} ${column.type === 'date' ? 'text-right' : ''}`} key={column.key}>
                      {cutText(formattedValue(row[column.key], column.type), column.maxLength)}
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

export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
  IDLE = 'idle',
}
export interface TableProps {
  value: any;
  columns: Column[];
  onSort?: (key: string, direction: Sort) => void;
  filters?: any;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: any) => void;
}

export interface Column {
  key: string;
  title: string;
  type: string;
  columnSize: string;
  maxLength?: number;
}

export default Table;
