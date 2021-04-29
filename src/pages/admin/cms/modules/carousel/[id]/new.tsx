import React, { FC } from 'react';
import Layout from 'Layouts';
import { Card, CardBody } from '@paljs/ui/Card';
import { Form, Input } from '../../../../../../components/Forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button as OldButton } from '@paljs/ui/Button';
import styled from 'styled-components';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { db, storage } from '../../../../../../../firebase';
import { useRouter } from 'next/router';

const Button = styled(OldButton)`
  text-transform: none !important;
`;
const NewCarousel: FC = () => {
  const router: any = useRouter();
  const initialValues = {
    heading: '',
    subHeading: '',
    image: '',
  };

  const validationSchema = Yup.object({
    heading: Yup.string().required('Heading is required'),
    subHeading: Yup.string().required('Sub Heading is required'),
    image: Yup.mixed(),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const { watch, setValue } = methods;

  const image = watch('image');

  const handleSubmit = async (data: any) => {
    let url = data.image;
    if (typeof data.image === 'object') {
      const storageRef = storage.ref(data?.image[0].name);
      storageRef.put(data.image[0]);
      const imageUrl = await storageRef.getDownloadURL();
      url = imageUrl;
    }
    db.collection('modules')
      .doc(router.query.id)
      .collection('data')
      .add({
        ...data,
        image: url,
      })
      .then(() => {
        router.back();
      });
    console.log(data);
  };

  return (
    <Layout title="New Slide">
      <Card>
        <header>
          <h5>New Slide</h5>
        </header>
        <CardBody>
          <Form provider={methods} onSubmit={handleSubmit}>
            <Row>
              <Col breakPoint={{ xs: 2 }}>
                <label>Heading</label>
              </Col>
              <Col breakPoint={{ xs: 10, md: 4 }}>
                <Input name="heading" placeholder="Heading" />
              </Col>
            </Row>
            <Row>
              <Col breakPoint={{ xs: 2 }}>
                <label>Sub Heading</label>
              </Col>
              <Col breakPoint={{ xs: 10, md: 4 }}>
                <Input name="subHeading" placeholder="Sub Heading" />
              </Col>
            </Row>

            <Row>
              <Col breakPoint={{ xs: 2 }}>
                <label>Image</label>
              </Col>
              <Col breakPoint={{ xs: 10, md: 4 }}>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  className="sc-hBEYos new__Button-sc-54z9gs-0 hLMWNY gSvWyI"
                />
                {image && (
                  <img
                    style={{ width: '150px' }}
                    src={typeof image === 'string' ? image : URL.createObjectURL(image[0])}
                  />
                )}
              </Col>
            </Row>
            <br />
            <Row>
              <Col breakPoint={{ xs: 2 }}></Col>
              <Col breakPoint={{ xs: 10 }}>
                <Button type="submit">Save</Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default NewCarousel;
