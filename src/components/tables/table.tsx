import { format } from 'date-fns';
import styles from './table.module.scss';
import React from 'react';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

const Table: React.FC<TableProps> = ({ value, columns, filters, onSort, onContextMenu, onContextMenuFilter, onChekboxChange }) => {
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

  const getColumnComponent = (row: any, column: Column) => {
    switch (column.type) {
      case 'checkbox':
        return (
          <td className={`px-4 py-2 w-[${column.columnSize}]`} key={column.key}>
            <input
              type="checkbox"
              checked={row[column.key]}
              onChange={(e) => {
                onChekboxChange && onChekboxChange(e, row, column);
              }}
            />
          </td>
        );
      case 'url':
        return (
          <td className={`px-4 py-2 w-[${column.columnSize}]`} key={column.key}>
            {row[column.key] && (
              <a href={row[column.key]} target="_blank" rel="noreferrer">
                {row[column.key] ? 'link' : ''}
              </a>
            )}
          </td>
        );
      default:
        return (
          <td className={`px-4 py-2 w-[${column.columnSize}] ${column.type === 'date' ? 'text-right' : ''}`} key={column.key}>
            {cutText(formattedValue(row[column.key], column.type), column.maxLength)}
          </td>
        );
    }
  };

  return (
    <div className="flex flex-grow mx-auto w-full h-auto justify-center rounded-t-2xl">
      <table className={`table-auto mr-4 ml-4 w-full rounded-t-2xl overflow-hidden`}>
        <thead>
          <tr>
            {columns.map((column: Column, index: number) => (
              <th
                onContextMenu={(e) => {
                  if (onContextMenuFilter) {
                    onContextMenuFilter(e, column);
                  }
                }}
                className={`w-[${column.columnSize}] px-4 py-2 ${styles.th}`}
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
          {value?.Data && value.Data.length > 0 ? (
            <>
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
                  {columns.map((column) => getColumnComponent(row, column))}
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                Nenhum dado encontrado
              </td>
            </tr>
          )}
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
  onChekboxChange?: (e: React.ChangeEvent<HTMLInputElement>, row: any, column: Column) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: any) => void;
  onContextMenuFilter?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, column: Column) => void;
}

export interface Column {
  key: string;
  title: string;
  type: string;
  columnSize: string;
  maxLength?: number;
  is_filter_enabled?: boolean;
  is_sort_enabled?: boolean;
}

export type ContextMenuFilterState = {
  clientX: number;
  clientY: number;
  visible: boolean;
  column: Column | null;
};

export default Table;
