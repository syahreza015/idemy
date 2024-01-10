'use client';

import ClassCardComponent from '@/components/card/class';

const ClassListClient = ({ initialData }: { initialData: ClassType[] }) => {
  return initialData.map((data) => (
    <ClassCardComponent
      data={data}
      key={data.id}
    />
  ));
};

export default ClassListClient;
