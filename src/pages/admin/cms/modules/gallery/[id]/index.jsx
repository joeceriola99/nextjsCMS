import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'Layouts';
import { Card, CardBody } from '@paljs/ui/Card';

import { Button as OldButton } from '@paljs/ui/Button';

import { InputGroup } from '@paljs/ui/Input';
import { EvaIcon } from '@paljs/ui/Icon';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Form, Input } from '../../../../../../components/Forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { GrAddCircle } from 'react-icons/gr';
import { db, storage } from '../../../../../../../firebase';
import { List, ListItem } from '@paljs/ui/List';
import { FiEdit } from 'react-icons/fi';
import { GrSubtractCircle } from 'react-icons/gr';
import { Carousel } from 'react-responsive-carousel';
import { IconContext } from 'react-icons';

const Button = styled(OldButton)`
  text-transform: none !important;
`;

const Gallery = () => {
  const router = useRouter();
  const [galleryImages, setGalleryImages] = useState([]);
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

  const handleSubmit = (data) => {
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
      .collection('data')
      .onSnapshot((snapshot) => {
        setGalleryImages(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          }),
        );
      });

    return unsub;
  }, []);

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
      <Card>
        <CardBody>
          <Form provider={methods} onSubmit={handleSubmit}>
            <>
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
                      <br />
                      <Input name="name" placeholder="Gallery Title" />
                      <List></List>
                      <br />

                      <InputGroup>
                        <input
                          type="file"
                          className="custom-file-input"
                          style={{ width: '100%' }}
                          onChange={(e) => {
                            console.log(e.target.files[0], 'TARGET FILES');
                            const storageRef = storage.ref('/carousels/' + e.target.files[0].name);
                            storageRef.put(e.target.files[0]).on(
                              'state_changed',
                              (snap) => {},
                              (err) => {
                                console.log(err, 'ERROR');
                              },
                              async () => {
                                let url = await storageRef.getDownloadURL();
                                db.collection('modules').doc(router.query.id).collection('data').add({
                                  image: url,
                                });
                              },
                            );
                          }}
                        />
                      </InputGroup>
                    </CardBody>
                  </Card>
                </Col>
                <Col breakPoint={{ xs: 12, sm: 8 }}>
                  <Card size="Large" style={{ border: '2px solid rgb(237, 241, 247)', boxShadow: 'none' }}>
                    <CardBody>
                      <Row>
                        {galleryImages.map((data, i) => {
                          return (
                            <Col breakPoint={{ xs: 12, sm: 4 }} key={i} style={{ position: 'relative' }}>
                              <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
                                <Button
                                  status="Danger"
                                  type="button"
                                  style={{ fontSize: '9px', padding: '3px 6px' }}
                                  onClick={() => {
                                    db.collection('modules')
                                      .doc(router.query.id)
                                      .collection('data')
                                      .doc(data.id)
                                      .delete();
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                              <img src={data?.image} style={{ maxWidth: '100%' }} />
                            </Col>
                          );
                        })}
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </>
          </Form>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Gallery;
