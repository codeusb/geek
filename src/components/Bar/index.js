//组件——封装echart图表组件
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function Bar({title,xData,yData,style}){
  const domRef = useRef()
  const chartInit = ()=>{
    const myChart = echarts.init(domRef.current);
    // 绘制图表
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: yData
        }
      ]
    });
  }
  //执行初始化函数
  useEffect(()=>{
    chartInit()
  },[])
  return(
    <div>
      {/* 准备挂载节点 */}
      <div ref={domRef} style={style}></div>
    </div>
  )
}

export default Bar