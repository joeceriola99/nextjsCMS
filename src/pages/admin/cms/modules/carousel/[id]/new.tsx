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
      const storageRef = storage.ref('/carousels');
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
      <Row>
        <Col breakPoint={{ xs: 12, sm: 6 }}>
          <Card>
            <header>
              <h6> Slide Editor</h6>
            </header>

            <CardBody>
              <Form provider={methods} onSubmit={handleSubmit}>
                <Input name="heading" placeholder="Heading" />

                <Input name="subHeading" placeholder="Sub Heading" />

                <Input name="url" placeholder="Redirect URL" />

                <Input type="file" name="image" id="image" className="custom-file-input" />
                {image && (
                  <img
                    style={{ width: '150px' }}
                    src={typeof image === 'string' ? image : URL.createObjectURL(image[0])}
                  />
                )}

                <br />
                <Row>
                  <Col breakPoint={{ xs: 6 }}>
                    <Button fullWidth status="Basic" type="submit">
                      CANCEL
                    </Button>
                  </Col>
                  <Col breakPoint={{ xs: 6 }}>
                    <Button fullWidth status="Success" type="submit">
                      SAVE
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default NewCarousel;
