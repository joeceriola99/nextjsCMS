import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, Controller, set } from 'react-hook-form';
import { Form, Input } from '../Forms';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Autocomplete from 'react-autocomplete';
import { db } from '../../../firebase';
import { InputGroup } from '@paljs/ui/Input';
import { Button } from '@paljs/ui/Button';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { List, ListItem } from '@paljs/ui/List';
import { CgCloseO } from 'react-icons/cg';
import { useRouter } from 'next/router';
const RowModule = ({ page, setError }) => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [importedModules, setImportedModules] = useState([]);
  const router = useRouter();
  const initialValues = {
    moduleName: '',
  };

  const validationSchema = Yup.object({
    moduleName: Yup.string().required('Module Name is required'),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    setValue,
    formState: { errors },
  } = methods;

  const handleSubmit = async (data) => {
    if (!page) {
      return setError('page', {
        type: 'manual',
        message: 'Select a page',
      });
    }

    let moduleData = modules.find((module) => module.name === data.moduleName);
    if (!moduleData) {
      return console.log('ERROR CANNOT FIND MODULE');
    }
    let collection = await db.collection('modules').doc(moduleData.id).collection('data').get();
    moduleData = { ...moduleData, collection: collection.docs.map((doc) => doc.data()) };
    console.log(moduleData, 'DATA', page);
    db.collection('page')
      .doc(page)
      .collection('data')
      .add({ ...moduleData, sort: importedModules.length });
  };

  useEffect(() => {
    const unsub = db
      .collection('modules')
      .where('name', '!=', '')
      .onSnapshot((snapshot) => {
        setModules(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }),
        );
      });

    return unsub;
  }, []);

  console.log('modules', modules, errors);

  useEffect(() => {
    if (page) {
      const unsub = db
        .collection('page')
        .doc(page)
        .collection('data')
        .onSnapshot((snapshot) => {
          setImportedModules(
            snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                _id: doc.data().id,
                id: doc.id,
              };
            }),
          );
        });

      return unsub;
    } else {
      setImportedModules([]);
    }
  }, [page]);

  useEffect(() => {
    if (importedModules.length) {
      importedModules.forEach((module) => {
        setModules((modules) =>
          modules.filter((m) => {
            return m.id !== module._id;
          }),
        );
      });
    }
  }, [importedModules]);

  return (
    <>
      <br />
      <Form provider={methods} onSubmit={handleSubmit}>
        <Row>
          <Col breakPoint={{ xs: 6 }}>
            <InputGroup fullWidth>
              <Controller
                name="moduleName"
                control={methods.control}
                render={() => (
                  <Autocomplete
                    getItemValue={(item) => item.label}
                    items={modules
                      .map((module) => {
                        return {
                          label: module.name,
                          id: module.id,
                        };
                      })
                      .filter(async (module) => {
                        const findExist = await importedModules.find((m) => m.id === module.id);
                        if (!findExist) {
                          return false;
                        } else {
                          return true;
                        }
                      })}
                    renderItem={(item, isHighlighted) => (
                      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>{item.label}</div>
                    )}
                    value={selectedModule}
                    onChange={(e) => {
                      setSelectedModule(e.target.value);
                    }}
                    onSelect={(val) => {
                      setSelectedModule(val);
                      setValue('moduleName', val);
                    }}
                  />
                )}
              />
            </InputGroup>
          </Col>
          <Col breakPoint={{ xs: 6 }}>
            <Button type="submit" fullWidth>
              Import
            </Button>
          </Col>
        </Row>
      </Form>
      <br />
      <Row>
        <Col breakPoint={{ xs: 8 }}>
          <p style={{ marginLeft: '3px' }}>Module Name</p>
        </Col>
        <Col breakPoint={{ xs: 4 }}>
          <p>Ordering</p>
        </Col>
        <List>
          {importedModules.map((module, i) => {
            return (
              <ListItem style={{ padding: '4px' }}>
                <Col breakPoint={{ xs: 7.7 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginRight: '5px' }}>{module.name}</p>
                    <div>
                      <CgCloseO
                        style={{ color: 'red', fontSize: 20, cursor: 'pointer' }}
                        onClick={() => {
                          db.collection('page').doc(router.query.id).collection('data').doc(module.id).delete();
                        }}
                      />
                    </div>
                  </div>
                </Col>
                <Col breakPoint={{ xs: 3.3 }}>
                  <InputGroup fullWidth>
                    <input
                      value={typeof module.sort === 'number' ? parseInt(module.sort) : ''}
                      type="number"
                      style={{ textAlign: 'center', paddingRight: 0 }}
                      onChange={(e) => {
                        db.collection('page')
                          .doc(page)
                          .collection('data')
                          .doc(module.id)
                          .update({ sort: parseInt(e.target.value) });
                      }}
                    />
                  </InputGroup>
                </Col>
              </ListItem>
            );
          })}
        </List>
      </Row>
    </>
  );
};

export default RowModule;
