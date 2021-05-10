import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import Select from 'react-select';
import { Form, Input } from '../../../../components/Forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import RowModule from '../../../../components/PageManager/RowModule';
import { db } from '../../../../../firebase';
import { Carousel } from 'react-responsive-carousel';
import parse from 'html-react-parser';
import moment from 'moment';
import { useRouter } from 'next/router';

const pageOptions = [
  { value: 'Home', label: 'Home' },
  { value: 'About', label: 'About' },
];
const NewPageManager = () => {
  const [pageView, setPageView] = useState([]);
  const [selectValue, setSelectValue] = useState({});
  const router = useRouter();
  console.log(router);
  const initialValues = {
    page: '',
  };

  const validationSchema = Yup.object({
    page: Yup.string().required('Page value is required'),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = methods;

  const page = watch('page');
  const onSubmit = (data) => {
    console.log(data);
    db.collection('page')
      .doc(data.page)
      .set({
        status: 'ACTIVE',
        lastEdited: moment().format('MMMM DD, YYYY'),
      })
      .then(() => {
        router.back();
      });
  };

  useEffect(() => {
    if (page) {
      const unsub = db
        .collection('page')
        .doc(page)
        .collection('data')
        .orderBy('sort', 'asc')
        .onSnapshot((snapshot) => {
          setPageView(
            snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            }),
          );
        });

      return unsub;
    }
  }, [page]);

  useEffect(() => {
    if (router.query?.id) {
      setValue('page', router.query.id);
      const toValue = pageOptions.find((a) => a.value === router.query.id);
      if (toValue);
      setSelectValue(toValue);
    }
  }, [router.query?.id]);

  return (
    <Layout title="New Page Manager">
      <Card size="Large">
        <header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h6>Page Editor</h6>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button status="Basic" onClick={() => router.back()}>
                Close
              </Button>
              <div style={{ margin: '0rem 6px' }} />
              <Button status="Basic" onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            </div>
          </div>
        </header>
        <CardBody>
          <Row style={{ height: '100%' }}>
            <Col breakPoint={{ sm: 4 }}>
              <Controller
                control={methods.control}
                name="page"
                render={() => (
                  <Select
                    options={pageOptions}
                    value={selectValue}
                    onChange={(e) => {
                      setValue('page', e.value);
                      setSelectValue(e);
                    }}
                    placeholder="Select Page"
                  />
                )}
              />
              {errors.page && <p style={{ color: 'red' }}>{errors.page.message}</p>}

              <RowModule page={page} setError={setError} />
            </Col>
            <Col
              breakPoint={{ sm: 8 }}
              style={{ border: '1px solid #bebebe', maxHeight: '100%', overflow: 'auto', borderRadius: '5px' }}
            >
              {pageView.map((page) => {
                return page.type === 'carousel' ? (
                  <Carousel>
                    {page.collection.map((item, i) => {
                      return <Item item={item} key={i} />;
                    })}
                  </Carousel>
                ) : page.type === 'gallery' ? (
                  <Row>
                    {page.collection.map((data) => {
                      return (
                        <Col breakPoint={{ xs: 12, sm: 6 }}>
                          <img src={data.image} key={data.image} style={{ maxWidth: '100%' }} />
                        </Col>
                      );
                    })}
                  </Row>
                ) : page.type === 'custom-html' ? (
                  parse(page.data)
                ) : null;
              })}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default NewPageManager;

const Item = ({ item }) => {
  return (
    <div style={{ position: 'relative', top: 0, left: 0, width: '100%' }}>
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
