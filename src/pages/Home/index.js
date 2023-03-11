import './index.scss'
//思路：看文档使用echart
//1.先跑最基础的demo  
  //react获取dom对象 -> useRef
  //在哪里获取dom节点 -> useEffect(dom渲染完成后执行)

import Bar from '@/components/Bar'  

function Home(){
  return(
    <div className="home">
      {/* 渲染Bar组件 */}
      <Bar 
        title='主流框架使用满意度' 
        xData={['react','vue','angular']}
        yData={[50,40,30]}
        style={{width:'400px',height:'400px'}}
        ></Bar>
      <Bar 
        title='前端语言流行度' 
        xData={['html','css','javascript']}
        yData={[30,40,50]}
        style={{width:'400px',height:'400px'}}
        ></Bar>
    </div>
  )
}

export default Home