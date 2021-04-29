import React from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import Layout from 'Layouts';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import { Button as OldButton } from '@paljs/ui/Button';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { Form, Input } from '../../../../../../components/Forms';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
const Button = styled(OldButton)`
  text-transform: none !important;
`;
export default function TinyMCE() {
  const router = useRouter();
  const handleEditorChange = (content: any, _editor: any) => {
    console.log('Content was updated:', content);
  };

  const initialValues = {
    name: '',
    data: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Title is required'),
    data: Yup.string().required('Enter Content'),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    setValue,
    formState: { errors },
  } = methods;

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Layout title="Tiny MCE editor">
      <Form provider={methods} onSubmit={handleSubmit}>
        <Card>
          <header>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h6>New Page</h6>
              <Button status="Basic">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <HiOutlinePlusCircle style={{ marginRight: '6px' }} size="20" />
                  Save
                </div>
              </Button>
            </div>
          </header>

          <CardBody>
            <Input name="name" placeholder="Title" />
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
              onChange={(e: any) => {
                setValue('data', e.target.value);
                console.log(e.target, 'DATAAAA');
              }}
            />
            {errors.data && <p style={{ color: 'red' }}>{errors.data.message}</p>}
          </CardBody>
        </Card>
      </Form>
    </Layout>
  );
}
