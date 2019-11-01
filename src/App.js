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
    accept: '.pdb',
    data: {
      topology_in: true,
      heteroatoms: false,
      user_email: '459828686@qq.com'
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        axios.get(info.file.response.links_link).then(data => {
          axios
            .get('/api/ppm-results/20191030_215317_2968_stats.html')
            .then(({ data }) => {
              const str = data.replace(/\s/, '');
              const reg = new RegExp('<td>.*</td></tr>');
              console.log(
                str.match(/class="rowlight".*class="rowdark"/g)[0].match(reg)
              );
              const matchResult = str.match(/href=.*\.pdb"download/)[0];
              const hrefString = matchResult.split('"')[1];
              const a = document.createElement('a');
              a.href = hrefString;
              a.click();
            });
        });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name}文件上传失败.`);
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
