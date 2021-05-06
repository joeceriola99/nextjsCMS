import React, { useState, useEffect, Fragment } from 'react';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Button } from '@paljs/ui/Button';
import { Form, Input } from '../Forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { db } from '../../../firebase';
import { useRouter } from 'next/router';
import { InputGroup } from '@paljs/ui/Input';
import { CgCloseO } from 'react-icons/cg';
import { Tabs, Tab } from '@paljs/ui/Tabs';
import Layout from 'Layouts';
import { Checkbox } from '@paljs/ui/Checkbox';

export const FormManagerComponent = () => {
  const router = useRouter();
  const [formPreview, setFormPreview] = useState([]);
  const initialValues = {
    name: '',
    required: false,
    type: '',
    requiredType: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Element Name is required'),
    required: Yup.boolean(),
    type: Yup.string().required('Type is required'),
    requiredType: Yup.string(),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    setValue,
    reset,
    formState: { errors },
    watch,
  } = methods;

  const handleSubmit = (data) => {
    console.log(data, 'SUb');
    db.collection('modules')
      .doc(router.query.id)
      .collection('data')
      .add({ ...data, sort: formPreview.length + 1 })
      .then(() => {
        reset(initialValues);
      });
  };

  const check = watch('required');

  console.log(errors, ' ERRROS');

  useEffect(() => {
    const unsub = db
      .collection('modules')
      .doc(router.query.id)
      .collection('data')
      .orderBy('sort', 'asc')
      .onSnapshot((snapshot) => {
        setFormPreview(
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

  console.log(formPreview, 'PREV');
  return (
    <>
      <Tabs activeIndex={0} style={{ height: '100%' }}>
        <Tab
          title="Create Form"
          icon="icon ion-ios-home"
          badge={{ status: 'Warning', position: 'topStart' }}
          responsive
        >
          <br />
          <Row style={{ height: '100%' }}>
            <Col breakPoint={{ xs: 12, sm: 4 }}>
              <Form provider={methods} onSubmit={handleSubmit}>
                <Row>
                  <Col breakPoint={{ xs: 9 }}>
                    <Input name="name" placeholder="Enter Element Name" />
                  </Col>
                  <Col breakPoint={{ xs: 3 }}>
                    <Button fullWidth>ADD</Button>
                  </Col>
                  <br />
                  <Col>
                    <Checkbox
                      onChange={(e) => {
                        console.log(e, 'CHECKED');
                        setValue('required', e);
                      }}
                      checked={check}
                    >
                      Required
                    </Checkbox>
                  </Col>
                  <Col>
                    <br />
                    <Controller
                      name="type"
                      control={methods.control}
                      render={() => {
                        return (
                          <Select
                            placeholder="Select Type"
                            options={[
                              {
                                label: 'Text',
                                value: 'Text',
                              },
                              {
                                label: 'Dropdown',
                                value: 'Dropdown',
                              },
                              {
                                label: 'Checkbox',
                                value: 'Checkbox',
                              },
                              {
                                label: 'Button',
                                value: 'Button',
                              },
                            ]}
                            onChange={(e) => {
                              console.log(e);
                              setValue('type', e.value);
                            }}
                          />
                        );
                      }}
                    />
                    {errors.type && <p style={{ color: 'red' }}>{errors.type.message}</p>}
                  </Col>
                  <Col>
                    <br />
                    <Controller
                      name="type"
                      control={methods.control}
                      render={() => {
                        return (
                          <Select
                            placeholder="Required Type"
                            options={[
                              {
                                label: 'Email',
                                value: 'Email',
                              },
                              {
                                label: 'Number',
                                value: 'Number',
                              },
                              {
                                label: 'Date',
                                value: 'Date',
                              },
                            ]}
                            onChange={(e) => {
                              console.log(e);
                              setValue('requiredType', e.value);
                            }}
                          />
                        );
                      }}
                    />
                    {errors.requiredType && <p style={{ color: 'red' }}>{errors.requiredType.message}</p>}
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col
              breakPoint={{ xs: 12, sm: 8 }}
              style={{
                border: '1px solid #bebebe',
                maxHeight: '100%',
                minHeight: '50vh',
                overflow: 'auto',
                padding: '1rem',
                borderRadius: '5px',
              }}
            >
              <Row center={'xs'} style={{ alignItems: 'center' }}>
                {formPreview.map((form) => {
                  if (form.type === 'Text') {
                    return (
                      <Fragment key={form.id}>
                        <Col breakPoint={{ xs: 3 }}>
                          <div>
                            <p style={{ textAlign: 'center' }}>{form.name}</p>
                          </div>
                        </Col>
                        <Col breakPoint={{ xs: 7 }} style={{ margin: '1rem 0rem' }}>
                          <InputGroup fullWidth>
                            <input />
                          </InputGroup>
                        </Col>
                        <Col breakPoint={{ xs: 2 }}>
                          <CgCloseO
                            onClick={() => {
                              db.collection('modules').doc(router.query.id).collection('data').doc(form.id).delete();
                            }}
                            style={{ cursor: 'pointer', color: 'red' }}
                          />
                        </Col>
                      </Fragment>
                    );
                  }
                  if (form.type === 'Button') {
                    return (
                      <Fragment key={form.id}>
                        <Col breakPoint={{ xs: 3 }}></Col>
                        <Col breakPoint={{ xs: 7 }}>
                          <Button fullWidth status="Basic">
                            {form.name}
                          </Button>
                        </Col>
                        <Col breakPoint={{ xs: 2 }}>
                          <CgCloseO
                            onClick={() => {
                              db.collection('modules').doc(router.query.id).collection('data').doc(form.id).delete();
                            }}
                            style={{ cursor: 'pointer', color: 'red' }}
                          />
                        </Col>
                      </Fragment>
                    );
                  }
                })}
              </Row>
            </Col>
          </Row>
        </Tab>
        <Tab title="Settings" icon="icon ion-ios-home" badge={{ status: 'Danger', position: 'topStart' }} responsive>
          <form>
            <InputGroup fullWidth>
              <input type="text" placeholder="Subject" />
            </InputGroup>
            <br />
            <InputGroup fullWidth>
              <input type="text" placeholder="Heading" />
            </InputGroup>
            <br />

            <InputGroup fullWidth>
              <input type="email" placeholder="Email to" />
            </InputGroup>
            <br />

            {/* <Input fullWidth>
            <input type="text" placeholder="Confirm Password" />
          </Input> */}
            {/* <Checkbox checked onChange={onCheckbox}>
           Subscribe to Newsletter
            
          </Checkbox> */}
            <Button status="Success" type="button" shape="SemiRound" fullWidth>
              Submit
            </Button>
          </form>
          {/* <Socials /> */}
          {/* <p>
          Already have an account?{' '}
          <Link href="/auth/login">
            <a>Log In</a>
          </Link>
        </p> */}
          {/* </Auth> */}
          {/* </Layout> */}
        </Tab>
      </Tabs>
    </>
  );
};
