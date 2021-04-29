/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import Layout from 'Layouts';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import { Button as OldButton } from '@paljs/ui/Button';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useRouter } from 'next/router';

const Button = styled(OldButton)`
  text-transform: none !important;
`;
export default function TinyMCE() {
  const router = useRouter();
  const handleEditorChange = (content: any, _editor: any) => {
    console.log('Content was updated:', content);
  };

  return (
    <Layout title="Tiny MCE editor">
      <Card>
        <header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h6>New Page</h6>
            <Button status="Basic" onClick={() => router.push('/404')}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HiOutlinePlusCircle style={{ marginRight: '6px' }} size="20" />
                Save
              </div>
            </Button>
          </div>
        </header>
        <CardBody>
          <Editor
            initialValue="<p>Create Content</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
            }}
            onEditorChange={handleEditorChange}
          />
        </CardBody>
      </Card>
    </Layout>
  );
}
