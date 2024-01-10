'use client';

import cn from '@/lib/utils/cn';
import { useClassMemberStore } from '@/lib/utils/store';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import StudentList from './student';
import { useMemo } from 'react';
import TeacherList from './teacher';

const ClassMemberList = () => {
  const { listVariant, openList, setListVariant, setOpenList } =
    useClassMemberStore();
  const closeList = () => {
    setOpenList(false);
    setListVariant(undefined);
  };
  const Component = useMemo(() => {
    if (listVariant === 'STUDENT') {
      return <StudentList />;
    } else {
      return <TeacherList />;
    }
  }, [listVariant]);
  const condition = openList && listVariant;
  return (
    condition &&
    createPortal(
      <FocusLock>
        <main
          onClick={closeList}
          className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/40">
          <aside
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex flex-col items-stretch justify-start gap-2 py-2 px-4 bg-white border-l border-stone-300">
            <div className="flex items-stretch justify-start gap-2 pb-4 border-b-2 border-stone-300">
              <button
                onClick={() => {
                  setListVariant('STUDENT');
                }}
                className={cn(
                  'rounded-md grid place-items-center py-2 px-4 font-medium text-sm capitalize bg-stone-50 border border-stone-300',
                  listVariant === 'STUDENT' &&
                    'bg-green-700 opacity-95 hover:opacity-100 text-white'
                )}>
                students
              </button>
              <button
                onClick={() => {
                  setListVariant('TEACHER');
                }}
                className={cn(
                  'rounded-md grid place-items-center py-2 px-4 font-medium text-sm capitalize bg-stone-50 border border-stone-300',
                  listVariant === 'TEACHER' &&
                    'bg-green-700 opacity-95 hover:opacity-100 text-white'
                )}>
                teachers
              </button>
            </div>
            <div>
              <div className="p-2 flex flex-col justify-start items-stretch gap-2 overflow-scroll">
                {Component}
              </div>
            </div>
          </aside>
        </main>
      </FocusLock>,
      document.body
    )
  );
};

export default ClassMemberList;
