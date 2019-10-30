import React from 'react';
import './App.scss';
import { Upload, Icon, message } from 'antd';

function App() {
  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  return (
    <div className='App'>
      <header className='header'>Swagger</header>
      <div className='dragger-container'>
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <Icon type='inbox' />
          </p>
          <p className='ant-upload-text'>
            点击或拖拽文件到这个区域进行文件上传
          </p>
          <p className='ant-upload-hint'>支持多文件上传</p>
        </Dragger>
      </div>
    </div>
  );
}

export default App;
