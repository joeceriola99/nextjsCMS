import React, { useEffect } from 'react';
import Layout from 'Layouts';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import { Form, Input } from '../../../../../components/Forms';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormManagerComponent } from '../../../../../components/FormManager';
import { useRouter } from 'next/router';
import { db } from '../../../../../../firebase';
const FormsCreate = () => {
  const router = useRouter();
  const initialValues = {
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Enter Form Name'),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log(data, 'DATA SUB');
    db.collection('modules')
      .doc(router.query.id)
      .update({ name: data.name })
      .then(() => {
        router.push('/admin/cms/modules');
      });
  };

  useEffect(() => {
    const unsub = db
      .collection('modules')
      .doc(router.query.id)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data(), 'SNAPSHOT RESET');
          let data = snapshot.data();
          if (data.name) {
            reset({ name: data.name });
          }
        }
      });

    return unsub;
  }, []);
  return (
    <Layout title="Creating Form">
      <Card size="Giant">
        <header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h6>Form Editor</h6>
            <Button status="Basic" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </div>
        </header>
        <CardBody>
          <Form onSubmit={handleSubmit} provider={methods}>
            <Input name="name" placeholder="Enter Form Name" />
          </Form>
          <br />
          <FormManagerComponent />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default FormsCreate;
