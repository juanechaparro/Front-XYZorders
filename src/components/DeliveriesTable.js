import React from 'react'
import 'antd/dist/antd.css'
import axios from 'axios';
import { Table, Space, Row, Col } from 'antd';
const getFullDate = (date) => {
    const dateAndTime = date.split('T');
  
    return dateAndTime[0].split('-').reverse().join('-');
  };
const DeliveriesTable = ({data,fetch}) => {
    const columns = [
  
  
        {
          title: 'Marca',
          dataIndex: 'brand',
          key: 'id',
        },
        
        {
          title: 'Fecha de entrega',
          dataIndex: 'date',
          key: 'id',
          render: ((date) =>  getFullDate(date)),
         
        },
       {
        title: 'Cantidad',
          dataIndex: 'quantity',
          key: 'id',
       
       },
       {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            {/* <li  key={record.id} onClick={e => Router.push('/registers/[id]', `/registers/${record._id}`)}>
            <a >Edit</a>
            </li> */}
           
            <a style={{color: "red"}} onClick={async(e) =>  await axios.get(`http://localhost:3000/api/deliveries/delete/${record.id}`).then(fetch())}>Eliminar⛔ </a>
           
           
          </Space>
        ),
      },
        
      ];
    return (
        <div>
         <Row>
         <Col xs={1} sm={1} md={2} lg={2}>
          {" "}
        </Col>
        <Col xs={12} sm={14} md={20} lg={20}>
        <Table  rowkey = "id" columns={columns} dataSource={data} />
        </Col>
        <Col xs={1} sm={2} md={2} lg={2}>
          {" "}
        </Col>
      </Row>
    </div>
    )
}

export default DeliveriesTable
