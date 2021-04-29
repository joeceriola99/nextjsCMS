import React, { FC, useEffect, useState } from 'react';
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
interface CarouselProps {
  edit?: boolean;
}
const NewCarousel: FC<CarouselProps> = ({ edit = false }) => {
  const router: any = useRouter();
  const [editImageLink, setEditImageLink] = useState('');
  const initialValues = {
    heading: '',
    subHeading: '',
    redirectUrl: '',
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

  const { watch, setValue, reset } = methods;

  const image = watch('image');

  const handleSubmit = async (data: any) => {
    let url = data.image;
    if (typeof data.image === 'object' && data.image[0]) {
      const storageRef = storage.ref('/carousels/' + data.image[0].name);
      storageRef.put(data.image[0]).on(
        'state_changed',
        (snap) => {},
        (err) => {},
        async () => {
          url = await storageRef.getDownloadURL();
          if (edit && router.query.cid) {
            db.collection('modules')
              .doc(router.query.id)
              .collection('data')
              .doc(router.query.cid)
              .update({ ...data, image: url });
          } else {
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
          }
        },
      );
    } else {
      db.collection('modules')
        .doc(router.query.id)
        .collection('data')
        .doc(router.query.cid)
        .update({
          heading: data.heading,
          subHeading: data.subHeading,
          redirectUrl: data.redirectUrl,
        })
        .then(() => {
          router.back();
        });
    }

    console.log(data);
  };

  useEffect(() => {
    if (edit && router.query.cid) {
      const unsub = db
        .collection('modules')
        .doc(router.query.id)
        .collection('data')
        .doc(router.query.cid)
        .onSnapshot((snapshot) => {
          if (snapshot?.data()?.image) {
            setEditImageLink(snapshot?.data()?.image);
          }
          reset({
            heading: snapshot.data()?.heading,
            subHeading: snapshot.data()?.subHeading,
            // image: snapshot.data()?.image,
            redirectUrl: snapshot.data()?.redirectUrl,
          });
        });

      return unsub;
    }
  }, [edit, router.query.cid]);

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
                {(image || editImageLink) && (
                  <img
                    style={{ width: '150px' }}
                    src={
                      typeof image === 'string' ? image : editImageLink ? editImageLink : URL.createObjectURL(image[0])
                    }
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
