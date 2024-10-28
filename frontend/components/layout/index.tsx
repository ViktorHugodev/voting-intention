import Navbar from '@/components/navbar/NavbarAdmin';
import { routes } from '@/components/routes';
import { getActiveRoute } from '@/utils/navigation';

import { usePathname } from 'next/navigation';

import React from 'react';

interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
}

const DashboardLayout: React.FC<Props> = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className="dark:bg-background-900 flex h-full w-full bg-white">
      <div className="h-full w-full dark:bg-zinc-950">
        <main
          className={`mx-2.5 flex-none transition-all dark:bg-zinc-950 md:pr-2 `}
        >
          <div className="mx-auto min-h-screen p-2 !pt-[90px] md:p-2 md:!pt-[118px]">
            {props.children}
          </div>
          <Navbar brandText={getActiveRoute(routes, pathname)} />
          <div className="p-3"></div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
