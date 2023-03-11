//子模块——文章频道数据以及逻辑（对应article和publish页面）
import { makeAutoObservable } from "mobx"
import { http} from '@/utils'

class ChannelStore{
  channelList = []

  constructor(){
    makeAutoObservable(this)
  }
  //仿写article的对频道数据的处理
  loadChannelList = async ()=>{
    const res = await http.get('/channels')
    this.channelList = res.data.channels
  }

}

export default ChannelStore


// import{ makeAutoObservable } from "mobx"
// import {http} from '@/utils'
// class ChannelStore{
//   channelList = []
//   constructor(){
//     makeAutoObservable(this)
//   }
//   //article publish 
//   loadChannelList = async ()=>{
//     const res = await http.get('/channels')
//     //console.log('11',res.data.channels,typeof res.data.channels);
//     this.channelList = res.data.channels
//   }
// }

// export default ChannelStore