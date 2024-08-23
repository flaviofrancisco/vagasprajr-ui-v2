import { format } from 'date-fns';
import styles from './table.module.scss';
import React from 'react';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

const Table: React.FC<TableProps> = ({ value, columns, filters, onSort, onContextMenu, onContextMenuFilter }) => {
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
    <div className="flex flex-grow mx-auto w-full h-auto justify-center rounded-t-2xl">
      <table className={`table-fixed mr-4 ml-4 w-full rounded-t-2xl overflow-hidden`}>
        <thead>
          <tr>
            {columns.map((column: Column, index: number) => (
              <th
                onContextMenu={(e) => {
                  if (onContextMenuFilter) {
                    onContextMenuFilter(e, column);
                  }
                }}
                className={`w-${column.columnSize} px-4 py-2 ${styles.th}`}
                key={column.key}
              >
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
              className={`${styles.tr} h-12 overflow-hidden`}
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
  onContextMenuFilter?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, column: Column) => void;
}

export interface Column {
  key: string;
  title: string;
  type: string;
  columnSize: string;
  maxLength?: number;
}

export default Table;
