// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    N_ratio: 23,
    P_ratio: 8,
    K_ratio: 17,
    weight: 1000,

    CH4N2O_N_net: 46,
    NH4CL_N_net: 23,
    NH4H2PO4_N_net: 11,
    NH4H2PO4_P_net: 44,
    KCL_K_net: 60,

    CH4N2O_res: '',
    NH4CL_res: '',
    NH4H2PO4_res: '',
    KCL_res: '',

    finallyRatio: '',
    finallyTotal: '',

    showResult: false
  },

  valueChange(e) {
    const key = e.currentTarget.dataset.key
    const value = e.detail.value
    this.setData({
      [key]: value
    })
  },

  calc() {
    const {
      N_ratio, P_ratio, K_ratio, weight, CH4N2O_N_net, NH4CL_N_net, NH4H2PO4_N_net, NH4H2PO4_P_net, KCL_K_net
    } = this.data

    const unit = 100

    const C = Math.round(weight / unit * 100) / 100

    const CH4N2O_N_net_d = CH4N2O_N_net / 100
    const NH4CL_N_net_d = NH4CL_N_net / 100
    const NH4H2PO4_N_net_d = NH4H2PO4_N_net / 100
    const NH4H2PO4_P_net_d = NH4H2PO4_P_net / 100
    const KCL_K_net_d = KCL_K_net / 100

    const KCL_w = Math.ceil(K_ratio / KCL_K_net_d * 10) / 10
    const NH4H2PO4_w = Math.ceil(P_ratio / NH4H2PO4_P_net_d * 10) / 10

    const left_w = unit - KCL_w - NH4H2PO4_w
    const N_left = N_ratio - (NH4H2PO4_w * NH4H2PO4_N_net_d)

    const NH4CL_w = Math.floor((N_left - CH4N2O_N_net_d * left_w) / (NH4CL_N_net_d - CH4N2O_N_net_d) * 10) / 10
    const CH4N2O_w = ((left_w - NH4CL_w) * 100).toFixed(0) / 100

    const N_actual = (CH4N2O_w * CH4N2O_N_net_d + NH4CL_w * NH4CL_N_net_d + NH4H2PO4_w * NH4H2PO4_N_net_d).toFixed(2) * 1
    const P_actual = (NH4H2PO4_w * NH4H2PO4_P_net_d).toFixed(2) * 1
    const K_actual = (KCL_w * KCL_K_net_d).toFixed(2) * 1

    this.setData({
      CH4N2O_res: CH4N2O_w * C,
      NH4CL_res: NH4CL_w * C,
      NH4H2PO4_res: NH4H2PO4_w * C,
      KCL_res: KCL_w * C,
      finallyRatio: `(N)${N_actual} : (P)${P_actual} : (K)${K_actual}`,
      finallyTotal: (N_actual + P_actual + K_actual).toFixed(2) * 1,
      showResult: true
    })
  },

  onShareAppMessage() {
    return {
      title: '化肥计算器',
      path: '/pages/index/index',
      imageUrl: '../images/share.jpg'
    }
  },

  onShareTimeline() {
    return {
      title: '化肥计算器',
      path: '/pages/index/index',
      imageUrl: '../images/share.jpg'
    }
  },

  onLoad() {

  },
})
