"use client";
import React, { ChangeEventHandler } from 'react'
import { Input } from 'antd';

const { TextArea } = Input;

const TransformTextarea = ({isCreate,name, value, onChange}:{isCreate:boolean, name:string, value:string, onChange:ChangeEventHandler}) => {
  if (isCreate) {
    return <TextArea allowClear name={name} value={value} onChange={onChange}/>
  } else {
    return <TextArea allowClear name={name} defaultValue={value} onChange={onChange}/>
  }
}

export default TransformTextarea