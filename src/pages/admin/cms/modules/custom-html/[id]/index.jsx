import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import Layout from 'Layouts';
import styled from 'styled-components';
import { Button as OldButton } from '@paljs/ui/Button';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { Form, Input } from '../../../../../../components/Forms';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { db } from '../../../../../../../firebase';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';

const Button = styled(OldButton)`
  text-transform: none !important;
`;
export default function TinyMCE() {
  const router = useRouter();
  const [data, setData] = useState('');
  const handleEditorChange = (content, _editor) => {
    console.log('Content was updated:', content);
  };
  // const editorConfiguration = {
  //   toolbar: ['bold', 'italic'],
  // };

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
    reset,
  } = methods;

  const handleChange = useCallback(
    (event) => {
      setData(event.getData());
      setValue('data', event.getData().replaceAll('oembed url', 'iframe src'));
    },
    [setData],
  );

  const handleSubmit = (data) => {
    console.log(data);
    db.collection('modules')
      .doc(router.query.id)
      .update({ name: data.name, data: data.data })
      .then(() => {
        router.push('/admin/cms/modules');
      });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('modules')
      .doc(router.query.id)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();

        reset({ name: data?.name || '', data: data.data || '' });
        setData(data?.data || '');
      });

    return unsubscribe;
  }, []);

  return (
    <Layout title="Tiny MCE editor">
      <Form provider={methods} onSubmit={handleSubmit}>
        <Card>
          <header>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h6>New Custom HTML</h6>
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
            <CKEditor
              // editor={ClassicEditor}
              data={data}
              // config={{
              //   plugins: [Paragraph, Bold, Italic, Essentials],
              //   toolbar: ['bold', 'italic'],
              // }}
              editor={ClassicEditor}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                console.log(editor.getData(), 'CHANGE IN EDITOR', event);
                handleChange(editor);
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
              // config={{
              //   toolbar: ['bold', 'italic', 'htmlSource'],
              //   // plugins: [HtmlEmbed],
              // }}
              // config={{
              //   toolbar: ['htmlSource'],
              // }}
            />
            {errors.data && <p style={{ color: 'red' }}>{errors.data.message}</p>}
          </CardBody>
        </Card>
      </Form>
    </Layout>
  );
}
