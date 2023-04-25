import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Table, TableColumnsType } from "antd"
import { ColumnsType } from "antd/es/table"
import { useRef, useState } from "react"
import Big from "big.js"


const App = () => {
  const tableRef = useRef<any>({});
  const [form] = Form.useForm()
  const [data, setData] = useState()

  const fnAdd = () => {
    tableRef.current.add({})
  }

  const fnOk = () => {
    const { npat, date, iratp = '15', br = '10' } = form.getFieldsValue();
    if (date) {
      Big.RM = 0
      Big.DP = 2
      const start = new Date(date[0]).getFullYear()
      const end = new Date(date[1]).getFullYear()
      // 得出开始年份与结束年份, 生成一个数组，该数组里面包含每一年的数据，如：[{date: 2021}, {date: 2022}]
      const num = end - start + 1
      let lastItem: any = {};
      const arr = Array.from({ length: num }, (v, i) => {
        const fcf = (new Big(npat).times(new Big(1).plus(new Big(iratp).div(new Big(100))).pow(i + 1))).toFixed(2)
        const item =  {
          iratp,
          date: start + i + ' 年',
          fcff: `${(new Big(npat).times(new Big(1).plus(new Big(iratp).div(new Big(100))).pow(i))).toFixed(2)} * ( 1 + ${iratp}% )`,
          fcf,
          br: br,
          dcff: `${fcf} / (( 1 + 10% ) ^ ${i + 1})`,
          dcfv: new Big(fcf).div((new Big(1).plus(new Big(br).div(new Big(100)))).pow(i + 1))
        }
        if (num === i + 1) {
          const fcf2 = new Big(fcf).times(1.05).times(new Big(1).plus(new Big(br).div(new Big(100)))).div(new Big(br).div(new Big(100)).minus(new Big(0.05))).toFixed(2)
          lastItem = {
            date: start + i + 1 + ' 年以后',
            iratp: 5,
            fcff: `${fcf} * ( 1 + 5% ) * ( 1 + ${br}% ) / ( 10% - 5% )`,
            fcf: fcf2,
            br: br,
            dcff: `${fcf2} / (( 1 + 10% ) ^ ${i + 2})`,
            dcfv: new Big(fcf2).div((new Big(1).plus(new Big(br).div(new Big(100)))).pow(i + 2))
          }
        }
        return item
      })
      arr.push(lastItem)

      arr.forEach(v => tableRef.current.add(v))
    }
  }

  return (
    <div>
      <Divider />
      <Form form={form}>
        <Row gutter={[12, 12]}>
          <Col span={6}>
            <Form.Item label="基础净利润" name="npat">
              <InputNumber addonAfter='￥' controls={false} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="年份" name="date">
              <DatePicker.RangePicker picker="year" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="净利润增长率" name="iratp">
              <InputNumber addonAfter='%' controls={false} precision={2} />
            </Form.Item>
          </Col>
          
          <Col span={6}>
            <Form.Item label="贴现率" name="br">
              <InputNumber addonAfter='%' controls={false} precision={2} />
            </Form.Item>
          </Col>

          {/* <Col span={6}>
            <Form.Item label="单位" name="unit">
              <Select>
                <Select.Option value={100000000}>亿</Select.Option>
                <Select.Option value={10000}>万</Select.Option>
              </Select>
            </Form.Item>
          </Col> */}

        </Row>

        <Button style={{ width: '100%' }} onClick={fnOk}>生成</Button>
        <Button style={{ width: '100%' }} onClick={fnAdd}>新增</Button>

        <Divider />

        <Form.List name='table'>
          {(field, { add, remove }) => {
            tableRef.current.add = add
            const columns: ColumnsType<any> = [
              {
                title: '年份', align: 'center', render: (_) => (
                  <Form.Item name={[_.name, 'date']} style={{ margin: '0' }}>
                    <Input disabled style={{ textAlign: 'center' }} />
                  </Form.Item>
                )
              },
              {
                title: '净利润增长率', align: 'center', render: (_) => (
                  <Form.Item name={[_.name, 'iratp']} style={{ margin: '0' }}>
                    <InputNumber addonAfter='%' controls={false} precision={2} />
                  </Form.Item>
                )
              },
              {
                // Free cash flow formula
                title: '自由现金流-公式', align: 'center', width: 400, render: (_) => (
                  <Form.Item name={[_.name, 'fcff']} style={{ margin: '0' }}>
                    <Input style={{ textAlign: 'center' }} disabled />
                  </Form.Item>
                )
              },
              {
                // Free cash flow
                title: '自由现金流', align: 'center', render: (_) => (
                  <Form.Item name={[_.name, 'fcf']} style={{ margin: '0' }}>
                    <Input disabled style={{ textAlign: 'center' }} />
                  </Form.Item>
                )
              },
              {
                title: '贴现率', align: 'center', render: (_) => (
                  <Form.Item name={[_.name, 'br']} style={{ margin: '0' }}>
                    <InputNumber addonAfter='%' controls={false} precision={2} />
                  </Form.Item>
                )
              },
              {
                // Discounted cash flow formula
                title: '现金流贴现-公式', align: 'center', width: 400, render: (_) => (
                  <Form.Item name={[_.name, 'dcff']} style={{ margin: '0' }}>
                    <Input style={{ textAlign: 'center' }} disabled/>
                  </Form.Item>
                )
              },
              {
                // Discounted cash flow value
                title: '现金流贴现值', align: 'center', render: (_) => (
                  <Form.Item name={[_.name, 'dcfv']} style={{ margin: '0' }}>
                    <Input style={{ textAlign: 'center' }} disabled />
                  </Form.Item>
                )
              },
              {
                title: '内在价值逐年增长率', align: 'center', render: (_) => (
                  <Form.Item name={[_.name, 'a']} style={{ margin: '0' }}>
                    <Input disabled style={{ textAlign: 'center' }} />
                  </Form.Item>
                )
              },
            ]

            return (
              <Table
                columns={columns}
                dataSource={field}
                scroll={{ x: 'max-content' }}
                pagination={false}
              />
            )
          }}
        </Form.List>
      </Form>
    </div>
  )
}

export default App