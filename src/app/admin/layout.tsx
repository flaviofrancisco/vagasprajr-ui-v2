'use client';
import '@fortawesome/fontawesome-svg-core/styles.css';
import LeftMenuComponent from '@/components/layout-components/left-menu';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="grid w-full flex-grow">
      <LeftMenuComponent>
        <div className="flex flex-grow">{children}</div>
      </LeftMenuComponent>
    </div>
  );
};

export default AdminLayout;
