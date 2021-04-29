import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'Layouts';
import { Card, CardBody } from '@paljs/ui/Card';

import { Button as OldButton } from '@paljs/ui/Button';

import { EvaIcon } from '@paljs/ui/Icon';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Form, Input } from '../../../../../../components/Forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { GrAddCircle } from 'react-icons/gr';
import { db } from '../../../../../../../firebase';
import { List, ListItem } from '@paljs/ui/List';
import { FiEdit } from 'react-icons/fi';
import { GrSubtractCircle } from 'react-icons/gr';
import { Carousel } from 'react-responsive-carousel';

const Button = styled(OldButton)`
  text-transform: none !important;
`;
const Gallery = () => {
  const router: any = useRouter();
  const initialValues = {
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Gallery Title is required'),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const { reset } = methods;

  const handleSubmit = (data: any) => {
    console.log(data, 'DATA SUBMIT');
    db.collection('modules')
      .doc(router.query.id)
      .update({ name: data.name })
      .then(() => {
        router.push('/admin/cms/modules');
      });
  };

  useEffect(() => {
    if (router.query.id) {
      db.collection('modules')
        .doc(router.query.id)
        .onSnapshot((snapshot) => {
          reset({ name: snapshot?.data()?.name });
        });
    }
  }, [router.query.id]);
  return (
    <Layout title="Gallery">
      <Form provider={methods} onSubmit={handleSubmit}>
        <Card>
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h5>Module Gallery</h5>
              <Row>
                <Button status="Basic" onClick={() => router.back()}>
                  Close
                </Button>
                <Button style={{ margin: '0px 10px' }} status="Basic">
                  Save
                </Button>
              </Row>
            </div>
            <Row>
              <Col breakPoint={{ xs: 12, sm: 4 }}>
                <Card size="Large" style={{ border: '2px solid rgb(237, 241, 247)', boxShadow: 'none' }}>
                  <CardBody>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => router.push(router.asPath + '/new')}
                      >
                        <GrAddCircle style={{ marginRight: '6px' }} />
                        Add
                      </div>
                    </div>
                    <br />
                    <Input name="name" placeholder="Gallery Title" />
                    <List></List>
                  </CardBody>
                </Card>
              </Col>
              <Col breakPoint={{ xs: 12, sm: 8 }}>
                <Card size="Large" style={{ border: '2px solid rgb(237, 241, 247)', boxShadow: 'none' }}>
                  <CardBody></CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </Layout>
  );
};

export default Gallery;
