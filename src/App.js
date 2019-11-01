import React from 'react';
import './App.scss';
import { Upload, Icon, message } from 'antd';
import axios from 'axios';
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

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
          setTimeout(() => {
            console.log('防守打法司法所打发大水');
            handle(data);
          }, 5000);
        });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name}文件上传失败.`);
      }
    }
  };
  function handle(data) {
    axios
      .get('/api/ppm-results/20191031_220434_3177_stats.html')
      .then(({ data }) => {
        const str = data.replace(/\s/g, '');
        const reg = new RegExp('<td>.*</td></tr>');
        const data2 = str
          .match(/class="rowlight".*class="rowdark"/g)[0]
          .match(reg)[0];
        const splitData = data2.split('</tr>');
        const splitData1 = splitData[splitData.length - 2].split('<td>');
        const result = splitData1[splitData1.length - 1]
          .replace('</td>', '')
          .split(',');
        console.log(result);
        var blob = new Blob([result.join(' ')], {
          type: 'text/csv,charset=UTF-8'
        });
        const downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = 'yaojun.xlsx';
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
        const matchResult = str.match(/href=.*\.pdb"download/)[0];
        const hrefString = matchResult.split('"')[1];
        const a = document.createElement('a');
        a.href = hrefString;
        a.click();
      });
  }
  return (
    <div className='App'>
      <header className='header'>
        <img src='/logo.png' alt='img' />
        <span>Swagger</span>
      </header>
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
