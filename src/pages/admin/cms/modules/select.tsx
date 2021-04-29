import React, { FC } from 'react';
import Layout from 'Layouts';
import { Card, CardBody } from '@paljs/ui/Card';
import { List, ListItem } from '@paljs/ui/List';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import Link from 'next/link';
import { Button as OldButton } from '@paljs/ui/Button';
import { EvaIcon } from '@paljs/ui/Icon';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { db } from '../../../../../firebase';
import moment from 'moment';
import { CgCloseO } from 'react-icons/cg';

const Button = styled(OldButton)`
  text-transform: none !important;
`;

const moduleList = [
  {
    name: 'Carousel',
    route: 'carousel',
  },
  {
    name: 'Gallery',
    route: 'gallery',
  },
  {
    name: 'Custom HTML',
    route: 'custom-html',
  },
];
const Select: FC = () => {
  const router = useRouter();
  const handleRouteChange = (type: any) => {
    initializeDb(type).then((route) => {
      router.push('/admin/cms/modules/' + type + '/' + route);
    });
  };

  const initializeDb = async (type: any) => {
    return db
      .collection('modules')
      .add({
        status: 'CREATING',
        type,
        name: '',
        items: [],
        createdAt: moment(new Date()).format('MMMM DD, YYYY h:mm a'),
      })
      .then((document) => {
        return document.id;
      });
  };
  return (
    <Layout title="Select module">
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card size="Small">
            <header>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h5>Select a Module Type</h5>
                <Button status="Control" onClick={() => router.push('/admin/cms/modules/')}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CgCloseO size="20" style={{ marginRight: '6px' }} /> Close
                  </div>
                </Button>
              </div>
            </header>
            <List>
              {moduleList.map((module: any) => {
                return (
                  <ListItem
                    onClick={() => handleRouteChange(module.route)}
                    style={{ cursor: 'pointer' }}
                    key={module.route}
                  >
                    {module.name}
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Select;
