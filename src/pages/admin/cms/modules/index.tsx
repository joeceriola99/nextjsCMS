import React, { FC, useState, useEffect } from 'react';
import Layout from 'Layouts';
import { db } from '../../../../../firebase';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button as OldButton } from '@paljs/ui/Button';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import { EvaIcon } from '@paljs/ui/Icon';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import moment from 'moment';
import { HiOutlinePlusCircle } from 'react-icons/hi';

const Button = styled(OldButton)`
  text-transform: none !important;
`;
const Modules: FC = ({}) => {
  const [modules, setModules] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = db
      .collection('modules')
      .where('name', '!=', '')
      .onSnapshot((snapshot: any) => {
        setModules(
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
  return (
    <Layout title="Modules">
      <Card>
        <header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h5>Module Manager</h5>
            <Button status="Basic" onClick={() => router.push('/admin/cms/modules/select')}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HiOutlinePlusCircle style={{ marginRight: '6px' }} size="20" />
                New
              </div>
            </Button>
          </div>
        </header>
        <CardBody>
          <table style={{ width: '100%' }}>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
            <tbody>
              {modules.map((module: any) => {
                return (
                  <tr>
                    <td>{module.name}</td>
                    <td>
                      <p className="capitalize">{module.type}</p>
                    </td>
                    <td>{module.createdAt}</td>
                    <td>
                      <Row>
                        <Col breakPoint={{ xs: 6 }}>
                          <Button
                            fullWidth
                            status="Success"
                            onClick={() => router.push(`/admin/cms/modules/${module.type}/${module.id}`)}
                          >
                            Edit
                          </Button>
                        </Col>
                        <Col breakPoint={{ xs: 6 }}>
                          <Button fullWidth type="button" status="Danger">
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Modules;
