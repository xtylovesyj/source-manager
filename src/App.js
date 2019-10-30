import React from 'react';
import './App.scss';
import { Upload, Icon, message } from 'antd';
import axios from 'axios';

function App() {
  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://sunshine.phar.umich.edu:8008/ppm',
    data: {
      topology_in: true,
      heteroatoms: false,
      user_email: '459828686@qq.com'
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(111111111111, info.file.response.links_link);
        axios.get(info.file.response.links_link).then(data => {
          console.log(data.data);
        });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  return (
    <div className='App'>
      <header className='header'>321</header>
      <Dragger {...props}>
        <p className='ant-upload-drag-icon'>
          <Icon type='inbox' />
        </p>
        <p className='ant-upload-text'>点击或拖拽文件到这个区域进行文件上传</p>
        <p className='ant-upload-hint'>支持多文件上传</p>
      </Dragger>
    </div>
  );
}

export default App;
