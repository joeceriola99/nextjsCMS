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
import { GrSubtractCircle } from 'react-icons/gr';

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
  } = methods;

  const handleSubmit = (data) => {
    console.log(data, 'SUb');
    db.collection('modules')
      .doc(router.query.id)
      .collection('data')
      .add({ ...data, sort: formPreview.length + 1 });
  };

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
                <input
                  type="checkbox"
                  name="required"
                  id="required"
                  value={true}
                  onChange={(e) => setValue('required', e.target.checked)}
                />
                <label for="required">Required</label>
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
          style={{ border: '1px solid gray', maxHeight: '100%', minHeight: '100%', overflow: 'auto', padding: '1rem' }}
        >
          <Row center={'xs'} style={{ alignItems: 'center' }}>
            {formPreview.map((form) => {
              if (form.type === 'Text') {
                return (
                  <Fragment key={form.id}>
                    <Col breakPoint={{ xs: 4 }}>
                      <div>
                        <p>{form.name}</p>
                      </div>
                    </Col>
                    <Col breakPoint={{ xs: 7 }} style={{ margin: '1rem 0rem' }}>
                      <InputGroup fullWidth>
                        <input />
                      </InputGroup>
                    </Col>
                    <Col breakPoint={{ xs: 1 }}>
                      <GrSubtractCircle
                        onClick={() => {
                          db.collection('modules').doc(router.query.id).collection('data').doc(form.id).delete();
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </Col>
                  </Fragment>
                );
              }
              if (form.type === 'Button') {
                return (
                  <Col key={form.id}>
                    <Button fullWidth status="Basic">
                      Submit
                    </Button>
                  </Col>
                );
              }
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};
