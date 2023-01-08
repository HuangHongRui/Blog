import React from "react";

// 主题切换
export const switchMode = () => {
  const body = document.body;
  if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode');
      // 以下这行代码，window.setMode仅用于当通过本Demo切换时，通知Semi官网Header记录更新当前模式（只用于演示）。在您的代码里无需存在。
      // window.setMode('light');
  } else {
      body.setAttribute('theme-mode', 'dark');
      // window.setMode('dark');
  }
}

//判断元素可见
export const isVisible = (ele: any) => {
  let windowHeight = window.innerHeight//可视区域的高
  let position = ele?.getBoundingClientRect()
  // 当元素的top偏移量小于页面大小并且大于高度的负数
  //后面position.top>-position.height主要
  //是为了防止底边在可视区域的顶部,也就是超出可视区域
  //这里的判断是重点
  if(position.top<windowHeight && position.top>-position.height){
    return true
  }
  return false
}

// 获取Query
export const getQuery = () => {
  const query = location.search.slice(1);
  if (query === '') return {}
  const q: any = {}
  query.split('&').forEach((item) => {
    const [k, v] = item.split('=')
    q[k] = v
  })
  return q;
}