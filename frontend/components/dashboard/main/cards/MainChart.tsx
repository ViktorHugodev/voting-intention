'use client';

import VotingIntentionChart from '@/components/charts/VotingIntentionChart';

import { Card } from '@/components/ui/card';

import { HiChartBar } from 'react-icons/hi2';

function OverallRevenue() {
  return (
    <Card className={'border-zinc-200 p-6 dark:border-zinc-800 w-full'}>
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 text-4xl dark:border-zinc-800 dark:text-white">
          <HiChartBar className="h-5 w-5" />
        </div>
      </div>

      <div className="flex h-[350px] w-full flex-row sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          <VotingIntentionChart />
        </div>
      </div>
    </Card>
  );
}

export default OverallRevenue;
