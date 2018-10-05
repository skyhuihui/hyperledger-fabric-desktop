import React from 'react';
import { Button, Input, Select, Radio} from 'antd';
import getFabricClientSingleton from '../../util/fabric'

const { TextArea } = Input;


export default class ChaincodeInvokeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      value: '',
      channel:'mychannel',                              // queryCar chaincode function - requires 1 argument, ex: args: ['CAR4'],
      chaincodeId: 'fabcar',        // queryAllCars chaincode function - requires no arguments , ex: args: [''],
      fcn: 'queryAllCars',
      args: '',
      type: 'invoke'
    };

    this.onClick = this.onClick.bind(this);
    this.chaincodeIdChange = this.chaincodeIdChange.bind(this);
    this.fcnChange = this.fcnChange.bind(this);
    this.argsChange = this.argsChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.channelChange = this.channelChange.bind(this);
    this.onClickCallback = this.onClickCallback.bind(this);
  }

  chaincodeIdChange(event){
    this.setState({chaincodeId: event.target.value})
  }

  fcnChange(event){
    this.setState({fcn: event.target.value})
  }

  argsChange(value){
    if(value != null)
      this.setState({args: value})
  }

  typeChange(event){
    this.setState({type: event.target.value})
  }

  channelChange(event){
    this.setState({channel: event.target.value})
  }

  onClickCallback(result) {
    this.setState({result: result})
  }

  onClick(e) {
    this.setState({result: ''})

    var fc = getFabricClientSingleton();
    fc.queryCc(this.onClickCallback, this.state.chaincodeId, this.state.fcn, this.state.args, this.state.channel)
  }

  render() {
    return (
      <div>

        <div style={{ margin: '24px 0' }}>
          通道名称：
          <Input  type="text" value={this.state.channel} style={{ width: '70%'  }} onChange={this.channelChange}/>
        </div>

        <div style={{ margin: '24px 0' }}>
          智能合约：
          <Input  type="text" value={this.state.chaincodeId} style={{ width: '70%'  }} onChange={this.chaincodeIdChange}/>
        </div>

        <div style={{ margin: '24px 0' }}>
          函数名称：
          <Input  type="text" value={this.state.fcn} style={{ width: '70%'  }} onChange={this.fcnChange}/>
        </div>

        <div style={{ margin: '24px 0' }}>
          &emsp;&emsp;参数：
          <Select mode="tags" style={{ width: '70%' }} placeholder="parameter" onChange={this.argsChange}>
            <Option value="null">null</Option>
          </Select>
        </div>

        <div style={{ margin: '24px 0' }}>
          &emsp;&emsp;方法：
          <Radio.Group value={this.state.type} buttonStyle="solid" onChange={this.typeChange}>
            <Radio.Button value="invoke">调用</Radio.Button>
            <Radio.Button value="query">查询</Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ margin: '24px 0' }}>
          <TextArea placeholder='result' value={this.state.result} autosize={{ minRows: 8, maxRows: 8 }} />
        </div>


        <div style={{ margin: '24px 0' }}>
          <Button type="primary" style={{ width: '100%' }} onClick={this.onClick}>发送</Button>
        </div>

      </div>
    );
  }
}