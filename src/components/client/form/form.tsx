'use client';

import { useFormStore } from '@/lib/utils/store';
import { useCallback, useMemo } from 'react';
import NewClassForm from './newClass';
import EnrollClassForm from './enrollClass';
import EditClassForm from './editClass';

const FormComponent = () => {
  const { openForm, setOpenForm, formVariant, setFormVariant } = useFormStore();
  const closeForm = useCallback(() => {
    setOpenForm(false);
    setFormVariant(undefined);
  }, []);
  const Component = useMemo(() => {
    if (formVariant === 'ENROLL_CLASS') {
      return <EnrollClassForm closeForm={closeForm} />;
    }
    if (formVariant === 'NEW_CLASS') {
      return <NewClassForm closeForm={closeForm} />;
    }
    if (formVariant === 'CLASS_EDIT') {
      return <EditClassForm closeForm={closeForm}/>;
    }
    return null;
  }, [formVariant]);
  return openForm && Component;
};

export default FormComponent;
