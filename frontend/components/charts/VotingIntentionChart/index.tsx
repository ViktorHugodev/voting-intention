import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const VotingIntentionChart: React.FC = () => {
  const [chartData, setChartData] = useState<{
    options: ApexOptions;
    series: ApexAxisChartSeries;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3333/voting-intention/evolution'
        );

        if (!response.ok) {
          throw new Error(
            `Erro ao buscar os dados LN 27: ${response.statusText}`
          );
        }
        const data = await response.json();

        const processedData = processData(data);
        setChartData(processedData);
      } catch (err) {
        setError('Erro ao buscar os dados do servidor.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processData = (data: any[]) => {
    const dates = data.map((item) => item.date);
    const candidates = Object.keys(data[0]).filter((key) => key !== 'date');

    const series = candidates.map((candidate) => ({
      name: candidate,
      data: data.map((item) => item[candidate])
    }));

    const options: ApexOptions = {
      chart: {
        type: 'line',
        toolbar: {
          show: true
        }
      },
      xaxis: {
        categories: dates,
        title: {
          text: 'Data'
        }
      },
      yaxis: {
        title: {
          text: 'Intenção de Voto'
        }
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Evolução das Intenções de Voto',
        align: 'center'
      },
      legend: {
        position: 'top'
      },
      tooltip: {
        x: {
          format: 'dd/MM/yyyy'
        }
      }
    };

    return { options, series };
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!chartData) {
    return <p>Sem dados para exibir.</p>;
  }

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default VotingIntentionChart;
