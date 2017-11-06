import api from '../../api/api.js'
import util from '../../utils/util.js'

Page({
  data: {
    vols: [],
    idlist: [],
    current: 0
  },
  onLoad: function () {
    api.getVolIdList({
      success: (res) => {
        if (res.data.res === 0) {
          let idList = res.data.data
          let idlist = [idList[0]]
          console.log(idlist)
          this.getVols(idlist)
        }
      }
    })
  },
  getVols: function (idlist) {
    let vols = this.data.vols
    console.log(vols)

    if (idlist.length > 0) {
      api.getVolById({
        query: {  
          id: idlist.shift()
        },
        success: (res) => {
          if (res.data.res === 0) {
            let vol = res.data.data
            vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
            vols.push(vol)
          }
          this.getVols(idlist)          
        }
      })
    } else {
      this.setData({ vols })
    }
  },
  handleChange: function (e) {
    let current = e.detail.current
    let volsLength = this.data.vols.length

    if (current === volsLength) {
      this.setData({
        current: volsLength
      })
      wx.navigateTo({
        url: '../history/history?page=index',
        success: () => {
          this.setData({
            current: volsLength - 1
          })
        }
      })
    }
  }
})
