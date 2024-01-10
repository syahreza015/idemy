'use client';

import PersonCardComponent from '@/components/card/person';
import PersonSkeleton from '@/components/skeleton/person';
import { EnvProvider } from '@/components/wrapper/env';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';

const TeacherList = () => {
  const [isLoading, setisLoading] = useState(false);
  const [isFetched, setisFetched] = useState(false);
  const [isError, setisError] = useState(false);
  const params: { id: string } = useParams();
  const classId: string | null | undefined = params.id;
  const [data, setData] = useState<
    | Array<{
        user_id: string;
        class_id: string;
        enrollment_date: Date;
        user: UserType;
      }>
    | undefined
  >(undefined);
  const env = useContext(EnvProvider);
  const fetchData = async () => {
    setisFetched(false)
    setisLoading(true);
    const response = await fetch(
      `${env?.BASE_URL}/api/class/${classId}/teacher`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${env?.ACCESS_TOKEN}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      setisError(true);
      return setisLoading(false);
    }
    const data: Array<{
      user_id: string;
      class_id: string;
      enrollment_date: Date;
      user: UserType;
    }> = result.data.teaching_teachers;
    setData(data);
    setisFetched(true)
    setisLoading(false);
  };
  const Component = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 5 }, (_, index) => index + 1).map((item) => (
        <PersonSkeleton key={item} />
      ));
    }
    if (isError) {
      return isFetched ? (
        <div className="grid place-items-center">
          <span className="text-sm text-red-600 font-semibold capitalize">
            failed to fetch data !
          </span>
        </div>
      ) : null;
    }
    if (!data) {
      return isFetched ? (
        <div className="grid place-items-center">
          <span className="text-sm text-red-600 font-semibold capitalize">
            something went wrong !
          </span>
        </div>
      ) : null;
    }
    if (data.length === 0) {
      return isFetched ? (
        <div className="grid place-items-center">
          <span className="text-sm text-opacity-75 font-semibold capitalize">
            no data to show !
          </span>
        </div>
      ) : null;
    }
    return data.map((data) => {
      return (
        <PersonCardComponent
          key={data.user.id}
          data={data.user}
        />
      );
    });
  }, [isLoading, isError, data]);
  useEffect(() => {
    classId && fetchData();
  }, [classId]);
  return Component;
};

export default TeacherList;
