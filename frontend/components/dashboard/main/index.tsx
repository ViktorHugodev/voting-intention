'use client';
import { useState, useEffect } from 'react';
import MainChart from '@/components/dashboard/main/cards/MainChart';

import DashboardLayout from '@/components/layout';

export default function Settings() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3333/voting-intention/evolution'
        );
        if (!response.ok) {
          throw new Error(`Erro ao buscar os dados: ${response.statusText}`);
        }
        const data = await response.json();

        const formattedData = data.map((item: any) => ({
          checked: '',
          date: item.date,
          municipality: item.municipality,
          state: item.state,
          candidate: item.candidate,
          percentage: item.percentage,
          menu: ''
        }));

        setTableData(formattedData);
      } catch (err: any) {
        console.error('Erro ao buscar os dados:', err.message);
        setError('Erro ao buscar os dados do servidor.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <div className="h-full w-full">
        <div className="mb-5 flex gap-5 flex-col xl:flex-row w-full">
          <MainChart />
        </div>
        {isLoading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="h-full w-full rounded-lg ">
            {/* <MainDashboardTable tableData={tableData} /> */}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
