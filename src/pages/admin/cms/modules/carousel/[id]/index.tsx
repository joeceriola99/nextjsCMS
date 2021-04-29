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
import { AnyARecord } from 'node:dns';

const Button = styled(OldButton)`
  text-transform: none !important;
`;
const CarouselPage: FC = () => {
  const router: any = useRouter();
  const [slides, setSlides] = useState<any>([]);

  console.log(router, 'ROUTER');
  const initialValues = {
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Title is required'),
  });

  const methods: any = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
  });

  const { reset } = methods;

  const handleSubmit = (data: any) => {
    console.log(data, 'DATA FORM');
    db.collection('modules')
      .doc(router.query.id)
      .update({ name: data.name })
      .then(() => {
        router.push('/admin/cms/modules');
      });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('modules')
      .doc(router.query.id)
      .collection('data')
      .onSnapshot((snapshot) => {
        console.log(
          snapshot.docs.map((doc) => doc.data()),
          'SNAPSHOT DATA',
        );
        setSlides(
          snapshot.docs.map((doc: any) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          }),
        );
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection('modules')
      .doc(router.query.id)
      .onSnapshot((snapshot: any) => {
        reset({ name: snapshot.data().name });
      });

    return unsubscribe;
  }, []);

  console.log(slides, 'SLIDE');
  return (
    <Layout title="New Carousel Module">
      <Form provider={methods} onSubmit={handleSubmit}>
        <Card>
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h5>Module Carousel</h5>
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
                    {/* <Row center={'xs'}> */}
                    {/* <Col breakPoint={{ xs: 2 }}> */}
                    {/* <label>Title</label> */}
                    {/* </Col> */}
                    {/* <Col breakPoint={{ xs: 10 }}> */}
                    <Input name="name" placeholder="Title" />
                    {/* </Col> */}
                    {/* </Row> */}
                    <List>
                      {slides.map((slide: any) => {
                        return (
                          <ListItem>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}
                            >
                              <div>{slide.heading}</div>

                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FiEdit style={{ marginRight: '6px' }} />
                                <GrSubtractCircle />
                              </div>
                            </div>
                          </ListItem>
                        );
                      })}
                    </List>
                  </CardBody>
                </Card>
              </Col>
              <Col breakPoint={{ xs: 12, sm: 8 }}>
                <Card size="Large" style={{ border: '2px solid rgb(237, 241, 247)', boxShadow: 'none' }}>
                  <CardBody>
                    <Carousel autoPlay infiniteLoop>
                      {slides.map((slide: any) => {
                        return <Item item={slide} />;
                      })}
                    </Carousel>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </Layout>
  );
};

export default CarouselPage;

const Item = ({ item }: any) => {
  return (
    <div style={{ position: 'relative', top: 0, left: 0 }}>
      <img
        src={item.image}
        alt={'Carousel Item'}
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '60vh',
          maxHeight: '100vh',
          objectFit: 'cover',
        }}
        draggable={false}
      />
      <div
        style={{
          position: 'absolute',
          padding: 5,
          top: '20%',
          left: '5%',
          display: 'flex',
          // alignContent: 'center',
          justifyItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ color: 'white', fontWeight: 800 }}>{item.heading}</h2>
        <h4 style={{ color: 'white' }}>{item.subHeading}</h4>
        <div>
          <Button status="Danger">Order Now</Button>
        </div>
      </div>
    </div>
  );
};
