import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import { useRouter } from 'next/router';
import { db } from '../../../../firebase';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
const PageManager = () => {
  const router = useRouter();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const unsub = db.collection('page').onSnapshot((snapshot) => {
      setPages(
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
  return (
    <Layout title="Page manager">
      <Card size="Large">
        <header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h6>Page Manager</h6>
            <Button status="Basic" onClick={() => router.push('/admin/page-manager/new')}>
              New
            </Button>
          </div>
        </header>
        <CardBody>
          <table style={{ width: '100%' }}>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
            {pages.map((page) => {
              return (
                <tr key={page.id}>
                  <td>
                    <p>{page.id}</p>
                  </td>

                  <td>
                    <p>{page?.status === 'ACTIVE' ? 'Published' : 'Inactive'}</p>
                  </td>
                  <td>{page.lastEdited}</td>
                  <td>
                    <Row>
                      <Col breakPoint={{ xs: 6 }}>
                        <Button
                          fullWidth
                          status="Success"
                          onClick={() => router.push({ pathname: '/admin/page-manager/new', query: { id: page.id } })}
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col breakPoint={{ xs: 6 }}>
                        <Button
                          fullWidth
                          type="button"
                          status="Danger"
                          onClick={() => {
                            db.collection('page').doc(page.id).delete();
                          }}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              );
            })}
          </table>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default PageManager;
