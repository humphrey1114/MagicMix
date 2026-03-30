const app = document.getElementById("app");

const routes = new Set([
  "landing","login","register","dashboard-home","smart-video","ai-copy",
  "smart-edit","timeline-editor","asset-library","upload","distribution",
  "analytics","product-config","storyboard-match","voice-settings","billing","account-settings",
]);

/* ── SVG Icon Helper ── */
function icon(name, size = 20) {
  const s = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const icons = {
    home:`<svg ${s}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    video:`<svg ${s}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
    wand:`<svg ${s}><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8L19 13"/><path d="M15 9h0"/><path d="M17.8 6.2L19 5"/><path d="M11 6.2L9.7 5"/><path d="M11 11.8L9.7 13"/><line x1="2" y1="22" x2="22" y2="2"/></svg>`,
    edit:`<svg ${s}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    scissors:`<svg ${s}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
    folder:`<svg ${s}><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`,
    upload:`<svg ${s}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>`,
    send:`<svg ${s}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    chart:`<svg ${s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    settings:`<svg ${s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    creditCard:`<svg ${s}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    search:`<svg ${s}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    play:`<svg ${s}><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    pause:`<svg ${s}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
    check:`<svg ${s}><polyline points="20 6 9 17 4 12"/></svg>`,
    x:`<svg ${s}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    plus:`<svg ${s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    download:`<svg ${s}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    refresh:`<svg ${s}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>`,
    star:`<svg ${s}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    fire:`<svg ${s}><path d="M12 22c4.97 0 8-3.58 8-8 0-3.07-2.27-6.34-4-8-1.03 2.15-2.7 3-4 3-1.3 0-2.5-.67-3-2-1.73 1.66-5 4.93-5 7 0 4.42 3.03 8 8 8z"/></svg>`,
    clock:`<svg ${s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    link:`<svg ${s}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
    image:`<svg ${s}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    music:`<svg ${s}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    mic:`<svg ${s}><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    type:`<svg ${s}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
    sparkles:`<svg ${s}><path d="M12 3l1.91 5.83L20 12l-6.09 3.17L12 21l-1.91-5.83L4 12l6.09-3.17L12 3z"/></svg>`,
    shield:`<svg ${s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    eye:`<svg ${s}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    layers:`<svg ${s}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    grid:`<svg ${s}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
    list:`<svg ${s}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
    chevronRight:`<svg ${s}><polyline points="9 18 15 12 9 6"/></svg>`,
    chevronDown:`<svg ${s}><polyline points="6 9 12 15 18 9"/></svg>`,
    trash:`<svg ${s}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`,
    copy:`<svg ${s}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`,
    share:`<svg ${s}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    filter:`<svg ${s}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
    sort:`<svg ${s}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`,
    arrowLeft:`<svg ${s}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
    user:`<svg ${s}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    bell:`<svg ${s}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
    logout:`<svg ${s}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    mail:`<svg ${s}><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    lock:`<svg ${s}><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
    key:`<svg ${s}><circle cx="7.5" cy="15.5" r="3.5"/><path d="M11 15.5h10"/><path d="M18 12.5v6"/><path d="M15 14.5v2"/></svg>`,
    users:`<svg ${s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
    zap:`<svg ${s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    target:`<svg ${s}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    globe:`<svg ${s}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
    tag:`<svg ${s}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
    alertTriangle:`<svg ${s}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    info:`<svg ${s}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    heart:`<svg ${s}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    bookmark:`<svg ${s}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>`,
    externalLink:`<svg ${s}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    volume:`<svg ${s}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>`,
    volumeX:`<svg ${s}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
    package:`<svg ${s}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    trendingUp:`<svg ${s}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  };
  return icons[name] || `<svg ${s}><circle cx="12" cy="12" r="1"/></svg>`;
}

/* ── Sidebar Menu Config ── */
const sidebarIcon = { "首页":"home","商品配置":"package","智能成片":"video","AI文案":"wand","智能剪辑":"scissors","资产库":"folder","素材上传":"upload","矩阵分发":"send","数据看板":"chart","计费与套餐":"creditCard","账户设置":"settings" };

const dashboardGroups = [
  { title:"创作中心", items:[
    { label:"首页", route:"dashboard-home" },
    { label:"智能成片", route:"smart-video" },
    { label:"AI文案", route:"ai-copy" },
    { label:"智能剪辑", route:"smart-edit" },
  ]},
  { title:"素材管理", items:[
    { label:"资产库", route:"asset-library" },
    { label:"素材上传", route:"upload" },
  ]},
  { title:"分发 & 数据", items:[
    { label:"矩阵分发", route:"distribution" },
    { label:"数据看板", route:"analytics" },
  ]},
];

const dashboardBottomItems = [
  { label:"计费与套餐", route:"billing" },
  { label:"账户设置", route:"account-settings" },
];

/* ── Demo Data ── */
const inspirationCategories = ["推荐","电商带货","本地生活","知识科普","情感语录"];
const inspirationItems = [
  { title:"养生茶产品种草混剪", category:"电商带货", tag:"养生", views:"12.3k", hot:true, duration:"0:45" },
  { title:"美妆新品测评短视频", category:"推荐", tag:"美妆", views:"8.7k", hot:true, duration:"0:38" },
  { title:"餐饮门店同城引流", category:"本地生活", tag:"本地生活", views:"9.1k", hot:true, duration:"0:32" },
  { title:"养生茶功效科普口播", category:"知识科普", tag:"知识科普", views:"6.1k", hot:false, duration:"0:37" },
  { title:"高客单情感向种草脚本", category:"情感语录", tag:"情感语录", views:"5.4k", hot:false, duration:"0:28" },
  { title:"本地商家秒杀活动预告", category:"本地生活", tag:"本地生活", views:"4.9k", hot:false, duration:"0:33" },
];

const smartVideoIndustries = ["电商","本地生活","知识科普","大健康","工具","金融"];
const smartVideoStyles = ["种草","测评","促销","科普","情感"];
const smartVideoDurations = [15,30,45,60];

const generatedVideos = [
  { id:"v1", title:"养生茶种草版01", duration:"0:27", size:"30.96MB", tag:"AI脚本", quality:"推荐投放", originality:97 },
  { id:"v2", title:"养生茶测评版02", duration:"0:32", size:"34.12MB", tag:"AI脚本", quality:"推荐投放", originality:95 },
  { id:"v3", title:"养生茶促销版03", duration:"0:24", size:"28.44MB", tag:"AI脚本", quality:"需微调", originality:93 },
  { id:"v4", title:"养生茶口播版04", duration:"0:29", size:"31.80MB", tag:"AI脚本", quality:"推荐投放", originality:98 },
  { id:"v5", title:"养生茶情感版05", duration:"0:35", size:"36.20MB", tag:"AI脚本", quality:"推荐投放", originality:96 },
  { id:"v6", title:"养生茶对比版06", duration:"0:22", size:"26.10MB", tag:"AI脚本", quality:"需微调", originality:92 },
  { id:"v7", title:"养生茶场景版07", duration:"0:28", size:"30.50MB", tag:"AI脚本", quality:"重新生成", originality:88 },
  { id:"v8", title:"养生茶安利版08", duration:"0:31", size:"33.00MB", tag:"AI脚本", quality:"推荐投放", originality:99 },
  { id:"v9", title:"养生茶裂变版09", duration:"0:26", size:"29.10MB", tag:"AI脚本", quality:"推荐投放", originality:94 },
];

const aiScripts = [
  { name:"种草安利版", score:{ hook:92, marketing:88, visual:85 }, segments:[
    { time:"0-3s", type:"Hook", text:"姐妹们！这个养生茶我真的要安利一百遍！" },
    { time:"3-8s", type:"痛点", text:"每天加班熬夜，皮肤暗沉气色差？" },
    { time:"8-18s", type:"产品展示", text:"这款红枣枸杞茶，坚持喝一周，气色肉眼可见变好" },
    { time:"18-25s", type:"卖点", text:"0添加0糖，真材实料看得见" },
    { time:"25-28s", type:"CTA", text:"点击下方链接，限时买二送一！" },
  ]},
  { name:"测评对比版", score:{ hook:88, marketing:90, visual:92 }, segments:[
    { time:"0-3s", type:"Hook", text:"花了500块测评了10款养生茶，最值的竟然是它" },
    { time:"3-10s", type:"对比", text:"左边某大牌，右边今天推荐的，配料一目了然" },
    { time:"10-20s", type:"细节", text:"独立小包装，冲泡方便，热水一泡30秒" },
    { time:"20-25s", type:"口碑", text:"已经回购第3次，办公室姐妹都跟着买" },
    { time:"25-28s", type:"CTA", text:"链接放评论区了，自己看价格" },
  ]},
  { name:"痛点共鸣版", score:{ hook:95, marketing:82, visual:88 }, segments:[
    { time:"0-3s", type:"Hook", text:"你有没有觉得自己最近气色特别差？" },
    { time:"3-8s", type:"共鸣", text:"加班到凌晨，外卖奶茶不离手，镜子里的自己都不敢看" },
    { time:"8-15s", type:"转折", text:"直到闺蜜送了我这款养生茶，喝了两周变化太大了" },
    { time:"15-23s", type:"展示", text:"真材实料，红枣枸杞桂圆看得见，每天一杯方便又养颜" },
    { time:"23-28s", type:"CTA", text:"姐妹们冲！链接在下方，今天下单还送杯子" },
  ]},
];

const editorStoryboard = [
  { id:1, title:"Hook", time:"3s", copy:"姐妹们！这个养生茶真的被我找到了！", category:"hook" },
  { id:2, title:"痛点", time:"5s", copy:"熬夜脸黄、气色差，镜头直接放对比变化", category:"pain" },
  { id:3, title:"卖点", time:"10s", copy:"真材实料看得见，冲泡方便，颜色透亮", category:"feature" },
  { id:4, title:"口碑", time:"8s", copy:"评论区全是回购反馈，复购率超高", category:"social" },
  { id:5, title:"CTA", time:"3s", copy:"下方链接直接拍，今天价格更划算", category:"cta" },
];

const categoryColors = { hook:"#6366f1", pain:"#ef4444", feature:"#10b981", social:"#f59e0b", cta:"#ec4899" };

const timelineLibraries = {
  素材库:[{ title:"产品特写", duration:"0:12" },{ title:"冲泡过程", duration:"0:15" },{ title:"用户反馈", duration:"0:08" },{ title:"包装展示", duration:"0:10" }],
  脚本:[{ title:"种草脚本 A", duration:"0:28" },{ title:"测评脚本 B", duration:"0:32" },{ title:"口播脚本 C", duration:"0:25" },{ title:"情感脚本 D", duration:"0:30" }],
  音乐:[{ title:"轻快流行BGM", duration:"1:20" },{ title:"温柔古风BGM", duration:"1:45" },{ title:"电子节奏BGM", duration:"1:10" },{ title:"轻音乐BGM", duration:"2:00" }],
  文字:[{ title:"抖音美好体", duration:"样式" },{ title:"黑体加粗", duration:"样式" },{ title:"手写风格", duration:"样式" },{ title:"霓虹发光", duration:"样式" }],
  转场:[{ title:"淡入淡出", duration:"0.4s" },{ title:"左滑切换", duration:"0.6s" },{ title:"缩放过渡", duration:"0.5s" },{ title:"闪白转场", duration:"0.3s" }],
};

const assetVideos = [
  { title:"养生茶种草01", date:"2026/03/25", status:"已发布" },
  { title:"美妆测评02", date:"2026/03/24", status:"已导出" },
  { title:"餐饮引流03", date:"2026/03/23", status:"已导出" },
  { title:"科普口播04", date:"2026/03/22", status:"草稿" },
  { title:"情感种草05", date:"2026/03/21", status:"草稿" },
  { title:"门店活动06", date:"2026/03/20", status:"已发布" },
  { title:"新品开箱07", date:"2026/03/19", status:"已导出" },
  { title:"直播切片08", date:"2026/03/18", status:"草稿" },
];

const assetMaterials = [
  { title:"红枣特写镜头", category:"产品素材", meta:"MP4 · 12.4MB" },
  { title:"热水冲泡细节", category:"产品素材", meta:"MP4 · 10.1MB" },
  { title:"门店陈列镜头", category:"场景素材", meta:"MOV · 18.2MB" },
  { title:"用户反馈截图", category:"图文素材", meta:"PNG · 1.2MB" },
  { title:"包装静物图", category:"图文素材", meta:"JPG · 0.8MB" },
  { title:"品牌 Logo 动效", category:"品牌素材", meta:"MOV · 3.6MB" },
];

const favoriteAssets = [
  { title:"抖音种草模板", type:"脚本收藏" },
  { title:"产品卖点三连镜头", type:"素材收藏" },
  { title:"高转化开场文案", type:"脚本收藏" },
  { title:"直播切片包装模板", type:"模板收藏" },
];

const analyticsTrend = [14,16,13,18,22,19,24,28,25,29,31,35];
const analyticsQuality = [
  { label:"高质量", value:52 },
  { label:"可优化", value:31 },
  { label:"待复剪", value:17 },
];

const hookRanking = [
  { text:"姐妹们！这个养生茶我真的要安利一百遍！", rate:"78%", rank:1 },
  { text:"花了500块测评了10款养生茶", rate:"72%", rank:2 },
  { text:"你有没有觉得自己最近气色特别差？", rate:"69%", rank:3 },
  { text:"别再乱买养生茶了！看完这个再决定", rate:"65%", rank:4 },
];

const topPerformingVideos = [
  { title:"养生茶种草版01", plays:"3.2万", completion:"78%", conversion:"4.1%", first3s:"92%" },
  { title:"美妆测评对比版", plays:"2.8万", completion:"72%", conversion:"3.8%", first3s:"88%" },
  { title:"餐饮探店引流版", plays:"1.9万", completion:"65%", conversion:"5.2%", first3s:"85%" },
];

const storyboardMatchData = [
  { text:"姐妹们！这个养生茶真的被我找到了！", duration:"3s", clip:"产品特写_01.mp4", confidence:96, source:"原始素材", alts:["特写_02.mp4","AI生成_01.mp4"] },
  { text:"熬夜脸黄、气色差，镜头直接放对比变化", duration:"5s", clip:"对比素材_03.mp4", confidence:91, source:"素材库", alts:["用户反馈_01.mp4","AI生成_02.mp4"] },
  { text:"真材实料看得见，冲泡方便，颜色透亮", duration:"10s", clip:"冲泡过程_01.mp4", confidence:98, source:"原始素材", alts:["冲泡_02.mp4","产品展示_01.mp4"] },
  { text:"评论区全是回购反馈，复购率超高", duration:"8s", clip:"口碑截图_02.mp4", confidence:87, source:"AI生成", alts:["评论截图_01.mp4","口碑_03.mp4"] },
  { text:"下方链接直接拍，今天价格更划算", duration:"3s", clip:"CTA动效_01.mp4", confidence:94, source:"素材库", alts:["CTA_02.mp4","结尾_01.mp4"] },
];

const workflowSteps = [
  { label:"商品配置", desc:"配置商品与营销目标", route:"product-config", icon:"package" },
  { label:"灵感拆解", desc:"解析链接与爆款结构", route:"ai-copy", icon:"sparkles" },
  { label:"一键成片", desc:"批量生成差异化视频", route:"smart-video", icon:"video" },
  { label:"精剪优化", desc:"替换素材与转场配音", route:"smart-edit", icon:"scissors" },
  { label:"矩阵分发", desc:"一键发布多平台", route:"distribution", icon:"send" },
  { label:"数据复盘", desc:"根据表现迭代创意", route:"analytics", icon:"chart" },
];

const recentProjects = [
  { name:"养生茶春季推广", date:"今天 14:32", status:"生成完成", count:8 },
  { name:"美妆新品首发", date:"昨天 20:15", status:"待精剪", count:5 },
  { name:"本地餐饮探店", date:"3月24日", status:"已发布", count:12 },
];

const previewVideoLibrary = {
  portrait: [
    "/media/previews/studio-portrait-01.mp4",
    "/media/previews/studio-portrait-02.mp4",
    "/media/previews/studio-portrait-03.mp4",
    "/media/previews/studio-portrait-04.mp4",
    "/media/previews/studio-portrait-05.mp4",
    "/media/previews/studio-portrait-06.mp4",
    "/media/previews/studio-portrait-07.mp4",
    "/media/previews/studio-portrait-08.mp4",
  ],
  landscape: [
    "/media/previews/studio-landscape-01.mp4",
    "/media/previews/studio-landscape-02.mp4",
    "/media/previews/studio-portrait-02.mp4",
    "/media/previews/studio-portrait-04.mp4",
    "/media/previews/studio-portrait-06.mp4",
    "/media/previews/studio-portrait-08.mp4",
  ],
};

/* ── State ── */
const state = {
  route:"landing",
  toast:null,
  workspaceDialog:null,
  dashboard:{ activeMenu:"首页", activeCategory:"推荐", search:"", quickLink:"", quickStatus:"支持淘宝、抖音、拼多多等链接", activeFeature:"一键成片", previewIndex:null },
  authMode:"login",
  smartVideo:{ mode:"product", stage:"empty", productLink:"", description:"", industry:"电商", style:"种草", duration:30, count:5, voice:"", bgm:"", subtitle:"" },
  aiCopy:{ inputType:"keyword", prompt:"", style:"剧情植入", generated:false, isGenerating:false, activeScript:0, customStyles:[], isAddingCustomStyle:false, customStyleDraft:"" },
  smartEdit:{ activeClip:0, hookMaterial:0, transition:"淡入淡出", duration:3, voiceCopy:"姐妹们！这个养生茶我真的要安利一百遍！", rightCategory:"Hook", ratio:"16:9", timelineZoom:1 },
  timelineEditor:{ library:"素材库", zoom:35, recommendation:0 },
  assets:{ tab:"我的视频", search:"", sort:"最新优先", scriptCards:[{ name:"示例脚本", lines:["Hook","卖点","CTA"] },{ name:"新品开箱", lines:["开场","亮点","下单"] }] },
  upload:{ items:[
    { name:"素材_1.mp4", size:"23.4MB", status:"处理完成", tags:["电商","产品"] },
    { name:"素材_2.mp4", size:"18.7MB", status:"处理完成", tags:["美妆","种草"] },
    { name:"素材_3.mp4", size:"31.2MB", status:"处理完成", tags:["餐饮","探店"] },
    { name:"素材_4.mp4", size:"15.9MB", status:"处理完成", tags:["口播","科普"] },
  ]},
  distribution:{ accounts:[
    { platform:"抖音", status:"3 个账号", connected:true, icon:"video" },
    { platform:"快手", status:"2 个账号", connected:true, icon:"zap" },
    { platform:"小红书", status:"1 个账号", connected:true, icon:"bookmark" },
    { platform:"视频号", status:"未连接", connected:false, icon:"play" },
    { platform:"TikTok", status:"未连接", connected:false, icon:"globe" },
  ], queue:[
    { title:"春季养生茶短视频 01", platforms:"抖音 / 小红书", schedule:"今天 18:30", status:"待发布", originality:96 },
    { title:"新品测评短视频 02", platforms:"抖音 / 视频号", schedule:"今天 20:00", status:"待审核", originality:93 },
    { title:"门店活动预热视频", platforms:"抖音 / 快手", schedule:"明天 10:30", status:"待发布", originality:98 },
  ]},
  productConfig:{ name:"红枣枸杞养生茶", price:"59.9", sellingPoints:"0添加0糖\n真材实料看得见\n独立小包装方便携带", promotion:"买二送一，限时3天", audiences:["年轻女性","宝妈","上班族"], scenarios:"办公室下午茶、居家养生、送礼佳品", competitors:"同仁堂 养生茶, 艺福堂 花茶", aiSellingPoints:["天然无添加，健康养生首选","便携独立包装，随时随地享用","红枣枸杞桂圆三重滋补"], hookSuggestions:["姐妹们！喝了一周气色直接开挂","别再花冤枉钱了！这款养生茶才是真的好","每天一杯，从黄脸婆变成素颜女神"], riskWords:["最好的","第一","绝对有效"] },
  storyboardMatch:{ generating:false },
  voiceSettings:{ voice:"", speed:1.0, emotion:"", bgmGenre:"", bgmVolume:30, beatSync:null, subtitleFont:"", subtitleSize:"", subtitleColor:"#ffffff", subtitlePosition:"", highlightKeywords:null, activeVoiceSample:-1 },
  accountSettings:{ activeTab:"profile" },
};

/* ── API Client ── */
const api = {
  token: localStorage.getItem("magicmix_token") || "",
  user: JSON.parse(localStorage.getItem("magicmix_user") || "null"),

  setAuth(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem("magicmix_token", token);
    localStorage.setItem("magicmix_user", JSON.stringify(user));
  },

  clearAuth() {
    this.token = "";
    this.user = null;
    localStorage.removeItem("magicmix_token");
    localStorage.removeItem("magicmix_user");
  },

  isLoggedIn() {
    return !!this.token;
  },

  async request(path, options = {}) {
    const headers = { "Content-Type": "application/json" };
    if (this.token) headers["Authorization"] = "Bearer " + this.token;
    try {
      const res = await fetch("/api" + path, { ...options, headers });
      const data = await res.json();
      if (res.status === 401) { this.clearAuth(); }
      return { ok: res.ok, status: res.status, data };
    } catch (e) {
      return { ok: false, status: 0, data: { error: "网络错误" } };
    }
  },

  get(path) { return this.request(path); },
  post(path, body) { return this.request(path, { method: "POST", body: JSON.stringify(body) }); },
  put(path, body) { return this.request(path, { method: "PUT", body: JSON.stringify(body) }); },
  del(path) { return this.request(path, { method: "DELETE" }); },

  async login(email, password) {
    const r = await this.post("/auth/login", { email, password });
    if (r.ok) this.setAuth(r.data.token, r.data.user);
    return r;
  },

  async register(username, email, password) {
    const r = await this.post("/auth/register", { username, email, password });
    if (r.ok) this.setAuth(r.data.token, r.data.user);
    return r;
  },

  async logout() {
    await this.post("/auth/logout");
    this.clearAuth();
  },
};

/* ── Utilities ── */
function escapeHtml(v){ return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"); }
function classNames(...n){ return n.filter(Boolean).join(" "); }
function cloneData(data){ return JSON.parse(JSON.stringify(data)); }

function syncDashboardMenu(){
  const m = { "dashboard-home":"首页","product-config":"智能成片","smart-video":"智能成片","ai-copy":"AI文案","smart-edit":"智能剪辑","timeline-editor":"智能剪辑","asset-library":"资产库","upload":"素材上传","distribution":"矩阵分发","analytics":"数据看板","storyboard-match":"AI文案","voice-settings":"智能成片","billing":"计费与套餐","account-settings":"账户设置" };
  state.dashboard.activeMenu = m[state.route] || "首页";
}

const publicRoutes = new Set(["landing","login","register"]);

function navigate(route, options={}){
  if(!routes.has(route)) return;
  // Auth guard: redirect to login if accessing protected route without auth
  if(!publicRoutes.has(route) && !api.isLoggedIn()){
    state.route = "login";
    state.authMode = "login";
    syncDashboardMenu();
    if(location.hash.slice(1)!=="login") history.replaceState(null,"","#login");
    renderApp({ preserveScroll:false });
    showToast("请先登录。");
    return;
  }
  state.route = route;
  if(route==="login"||route==="register") state.authMode = route;
  if(route==="smart-video"&&options.stage) state.smartVideo.stage = options.stage;
  if(route==="ai-copy"&&typeof options.generated==="boolean") state.aiCopy.generated = options.generated;
  syncDashboardMenu();
  if(location.hash.slice(1)!==route) history.replaceState(null,"",`#${route}`);
  window.scrollTo({ top:0, behavior:"auto" });
  renderApp({ preserveScroll:false });
}

function initRoute(){
  const hash = location.hash.replace("#","");
  if(routes.has(hash)) state.route = hash; else state.route = "landing";
  // Auth guard on init
  if(!publicRoutes.has(state.route) && !api.isLoggedIn()){
    state.route = "login";
    state.authMode = "login";
    history.replaceState(null,"","#login");
  }
  if(state.route==="login"||state.route==="register") state.authMode = state.route;
  syncDashboardMenu();
}

function filteredInspirationItems(){
  return inspirationItems.filter(item => {
    const mc = state.dashboard.activeCategory==="推荐"||item.category===state.dashboard.activeCategory;
    const kw = state.dashboard.search.trim();
    const mk = !kw||item.title.includes(kw)||item.category.includes(kw)||item.tag.includes(kw);
    return mc&&mk;
  });
}

function filteredAssetItems(){
  const kw = state.assets.search.trim();
  const f = (list,key="title")=> list.filter(i=>!kw||i[key].includes(kw));
  if(state.assets.tab==="我的视频") return f(assetVideos);
  if(state.assets.tab==="素材库") return f(assetMaterials);
  if(state.assets.tab==="脚本库") return f(state.assets.scriptCards,"name");
  return f(favoriteAssets);
}

function routeTitle(route){
  const m = { landing:"官网首页",login:"登录",register:"注册","dashboard-home":"控制台首页","smart-video":"智能成片","ai-copy":"AI文案","smart-edit":"智能剪辑","timeline-editor":"时间线编辑","asset-library":"资产库",upload:"素材上传",distribution:"矩阵分发",analytics:"数据看板","product-config":"商品配置","storyboard-match":"分镜匹配","voice-settings":"配音设置","billing":"计费与套餐","account-settings":"账户设置" };
  return m[route]||"MagicMix";
}

function getBackRoute(route = state.route){
  const m = {
    "smart-video":"dashboard-home",
    "ai-copy":"dashboard-home",
    "smart-edit":"dashboard-home",
    "timeline-editor":"smart-edit",
    "asset-library":"dashboard-home",
    "upload":"asset-library",
    "distribution":"dashboard-home",
    "analytics":"dashboard-home",
    "product-config":"smart-video",
    "storyboard-match":"ai-copy",
    "voice-settings":"storyboard-match",
    "billing":"dashboard-home",
    "account-settings":"dashboard-home",
  };
  return m[route] || "dashboard-home";
}

function renderSubpageBackButton(route = getBackRoute()){
  return `<button class="subpage-back-btn" data-route="${route}" title="返回" aria-label="返回">${icon("arrowLeft",14)}</button>`;
}

function showToast(message,tone="neutral"){
  state.toast = { message,tone }; renderApp();
  if(showToast.timer) clearTimeout(showToast.timer);
  showToast.timer = setTimeout(()=>{ state.toast=null; renderApp(); },2400);
}

function startSmartVideoGeneration(){
  state.smartVideo.stage="processing"; renderApp();
  if(startSmartVideoGeneration.timer) clearTimeout(startSmartVideoGeneration.timer);
  startSmartVideoGeneration.timer = setTimeout(()=>{
    state.smartVideo.stage="results"; renderApp();
    showToast("已生成 9 条差异化视频，可继续进入精剪。","success");
  },1600);
}

function startAiCopyGeneration(){
  state.aiCopy.isGenerating=true; state.aiCopy.generated=false; renderApp();
  if(startAiCopyGeneration.timer) clearTimeout(startAiCopyGeneration.timer);
  startAiCopyGeneration.timer = setTimeout(()=>{
    state.aiCopy.isGenerating=false; state.aiCopy.generated=true; renderApp();
    showToast("脚本已生成，可直接成片或进入分镜匹配。","success");
  },1200);
}

/* ── Logo ── */
function logoMark(){
  return `<span class="mm-logo" style="background:linear-gradient(135deg,#a855f7,#ec4899);color:#fff;font-weight:800;border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;font-size:16px;letter-spacing:-1px;">M</span>`;
}

function brandButton(route,extraClass="",compact=false){
  return `<button class="${classNames("brand-button",compact&&"brand-button--compact",extraClass)}" data-route="${route}">${logoMark()}<span>MagicMix</span></button>`;
}

/* ── Shared render helpers ── */
function renderSelectorChips(items,active,dataName,extraClass=""){
  return items.map(item=>`<button class="${classNames("selector-chip",active===item&&"is-active",extraClass)}" data-${dataName}="${item}">${item}</button>`).join("");
}

function qualityBadge(q){
  const colors = { "推荐投放":"#10b981", "需微调":"#f59e0b", "重新生成":"#ef4444" };
  return `<span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;color:#fff;background:${colors[q]||'#666'}">${q}</span>`;
}

function getPreviewVideo(index = 0, format = "portrait"){
  const list = previewVideoLibrary[format] || previewVideoLibrary.portrait;
  return list[index % list.length];
}

function renderPreviewVideo(src, className = "media-preview-video", autoplay = false){
  return `<video class="${className}" src="${src}" ${autoplay ? "autoplay " : ""}loop muted playsinline preload="metadata"></video>`;
}

function renderSelectControl({ field, value = "", placeholder = "请选择", options = [], labels = {} }){
  const currentValue = value === null || value === undefined ? "" : String(value);
  const hasCustomValue = currentValue !== "" && !options.map(option => String(option)).includes(currentValue);
  return `
    <div class="workspace-select-wrap">
      <select class="workspace-select" data-field="${field}">
        <option value="" ${currentValue === "" ? "selected" : ""}>${placeholder}</option>
        ${hasCustomValue ? `<option value="${escapeHtml(currentValue)}" selected>${escapeHtml(labels[currentValue] || currentValue)}</option>` : ""}
        ${options.map(option => {
          const optionValue = String(option);
          return `<option value="${escapeHtml(optionValue)}" ${currentValue === optionValue ? "selected" : ""}>${escapeHtml(labels[optionValue] || optionValue)}</option>`;
        }).join("")}
      </select>
      <span class="workspace-select-icon">${icon("chevronDown",14)}</span>
    </div>`;
}

function renderImportableSelectField({ iconName = "", label, field, value = "", placeholder = "请选择", options = [], labels = {}, importTarget, accept = "", hint = "" }){
  return renderFieldBlock({
    iconName,
    label,
    control: `
      <div class="workspace-import-row">
        ${renderSelectControl({ field, value, placeholder, options, labels })}
        <button class="btn btn--ghost workspace-import-btn" type="button" data-trigger-import="${importTarget}">${icon("upload",14)} 导入</button>
        <input class="workspace-file-input" type="file" data-import-input="${importTarget}" accept="${accept}" hidden />
      </div>
    `,
    hint,
  });
}

const preservedScrollSelectors = [
  ".workspace-sidebar-panel",
  ".workspace-main-panel",
  ".workspace-page",
  ".settings-tabs",
  ".settings-panel",
  ".se-left",
  ".se-right",
  ".se-timeline-scroll",
];

function captureScrollPositions(){
  const positions = {};
  preservedScrollSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      positions[`${selector}:${index}`] = {
        top: el.scrollTop,
        left: el.scrollLeft,
      };
    });
  });
  return positions;
}

function restoreScrollPositions(positions = {}){
  requestAnimationFrame(() => {
    preservedScrollSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, index) => {
        const saved = positions[`${selector}:${index}`];
        if(!saved) return;
        el.scrollTop = saved.top;
        el.scrollLeft = saved.left;
      });
    });
  });
}

function getAiScriptVariants(index){
  const variants = [
    [
      {
        name:"种草安利版",
        score:{ hook:92, marketing:88, visual:85 },
        segments:[
          { time:"0-3s", type:"Hook", text:"姐妹们，这个养生茶我真的要安利一百遍。" },
          { time:"3-8s", type:"痛点", text:"每天加班熬夜，脸色发黄、状态下滑，镜头先把这个情绪拉满。" },
          { time:"8-18s", type:"产品展示", text:"这款红枣枸杞养生茶直接给到真材实料的近景，冲泡也方便。" },
          { time:"18-25s", type:"卖点", text:"0添加、口感顺、独立小包装，通勤和办公室都能直接喝。" },
          { time:"25-28s", type:"CTA", text:"下方链接直接拍，今天下单还有买二送一。" },
        ],
      },
      {
        name:"场景体验版",
        score:{ hook:90, marketing:91, visual:87 },
        segments:[
          { time:"0-3s", type:"Hook", text:"早八通勤、下午犯困，这杯茶我现在包里一定会带。" },
          { time:"3-8s", type:"场景", text:"先给办公室、出差包、桌面场景切镜，直接建立代入感。" },
          { time:"8-18s", type:"产品展示", text:"独立条包撕开就能泡，热水一冲茶香起来，镜头顺势推进细节。" },
          { time:"18-25s", type:"卖点", text:"口感温和不腻，日常坚持喝也没有负担，适合长期复购。" },
          { time:"25-28s", type:"CTA", text:"想试试的直接点链接，先囤一盒最稳。" },
        ],
      },
      {
        name:"口碑回购版",
        score:{ hook:89, marketing:93, visual:84 },
        segments:[
          { time:"0-3s", type:"Hook", text:"评论区一直有人问我最近状态为什么变好了。" },
          { time:"3-8s", type:"口碑", text:"我把回购反馈和用户评论先铺出来，先做信任背书。" },
          { time:"8-18s", type:"产品展示", text:"再给到配料和茶汤的真实镜头，让内容从口碑回到产品本身。" },
          { time:"18-25s", type:"卖点", text:"配料干净、入口顺、日常喝起来轻负担，复购理由很清楚。" },
          { time:"25-28s", type:"CTA", text:"链接放下面，想跟着试的可以直接入。" },
        ],
      },
    ],
    [
      {
        name:"测评对比版",
        score:{ hook:88, marketing:90, visual:92 },
        segments:[
          { time:"0-3s", type:"Hook", text:"花了 500 块测评了 10 款养生茶，最值的竟然是它。" },
          { time:"3-10s", type:"对比", text:"左边放大牌，右边放今天这款，从包装和配料先做正面对比。" },
          { time:"10-20s", type:"细节", text:"镜头拉近独立条包、热水冲泡、茶汤颜色，让细节自己说话。" },
          { time:"20-25s", type:"口碑", text:"办公室已经有人跟着回购，说明它不只是价格能打。" },
          { time:"25-28s", type:"CTA", text:"评论区放链接，自己去看价格和活动。" },
        ],
      },
      {
        name:"价格体验版",
        score:{ hook:87, marketing:92, visual:90 },
        segments:[
          { time:"0-3s", type:"Hook", text:"别再盲买高价养生茶了，这款的性价比真的很夸张。" },
          { time:"3-10s", type:"对比", text:"先把单杯成本和整盒活动价打在画面上，节奏更直接。" },
          { time:"10-20s", type:"细节", text:"同样给到配料、冲泡速度、携带便利性，镜头以实用感为主。" },
          { time:"20-25s", type:"反馈", text:"同事试过之后都说味道顺，不像有些养生茶那么重。" },
          { time:"25-28s", type:"CTA", text:"想要平替路线的，直接看下方活动链接。" },
        ],
      },
      {
        name:"成分拆解版",
        score:{ hook:86, marketing:89, visual:94 },
        segments:[
          { time:"0-3s", type:"Hook", text:"测评型视频里，最能打动人的还是成分和真实体验。" },
          { time:"3-10s", type:"成分", text:"把红枣、枸杞、桂圆这些原料逐个拆开，建立专业感。" },
          { time:"10-20s", type:"体验", text:"边冲泡边讲味道、甜度和饮用场景，内容更像真实开箱测评。" },
          { time:"20-25s", type:"结论", text:"如果你在意配料和便携性，这款基本不会踩雷。" },
          { time:"25-28s", type:"CTA", text:"更多细节我放在链接页，自己去看更直观。" },
        ],
      },
    ],
    [
      {
        name:"痛点共鸣版",
        score:{ hook:95, marketing:82, visual:88 },
        segments:[
          { time:"0-3s", type:"Hook", text:"你有没有觉得自己最近脸色特别差、整个人都没精神。" },
          { time:"3-8s", type:"共鸣", text:"加班、熬夜、外卖奶茶不断，镜子里的状态真的会越来越明显。" },
          { time:"8-15s", type:"转折", text:"直到我把下午那杯奶茶换成了这款养生茶，状态开始稳下来。" },
          { time:"15-23s", type:"展示", text:"真材实料看得见，热水一冲就能喝，日常坚持不会有负担。" },
          { time:"23-28s", type:"CTA", text:"姐妹们想跟着试的，我把链接放下面了。" },
        ],
      },
      {
        name:"熬夜恢复版",
        score:{ hook:94, marketing:84, visual:87 },
        segments:[
          { time:"0-3s", type:"Hook", text:"如果你也经常熬夜，那这条视频你先别划走。" },
          { time:"3-8s", type:"共鸣", text:"一到下午就发黄、发干、没精神，这种状态真的太常见了。" },
          { time:"8-15s", type:"转折", text:"我后来把喝的东西换得更干净一点，体感就明显舒服了。" },
          { time:"15-23s", type:"展示", text:"这款养生茶冲泡快、味道顺，通勤和办公室都很适合。" },
          { time:"23-28s", type:"CTA", text:"想改善日常状态的，可以先从这类轻养生开始。" },
        ],
      },
      {
        name:"情绪共鸣版",
        score:{ hook:93, marketing:85, visual:89 },
        segments:[
          { time:"0-3s", type:"Hook", text:"成年人的崩溃，很多时候就是从身体状态掉下来开始的。" },
          { time:"3-8s", type:"共鸣", text:"镜头先给疲惫表情和办公场景，再接一杯热茶的情绪转折。" },
          { time:"8-15s", type:"转折", text:"不是立刻逆天改命，但把节奏慢下来之后，状态确实会不一样。" },
          { time:"15-23s", type:"展示", text:"原料清楚、口感温和，适合做情绪型内容里的生活解决方案。" },
          { time:"23-28s", type:"CTA", text:"如果你也想从小习惯开始调整，这款可以先试试。" },
        ],
      },
    ],
  ];
  return variants[index] || [cloneData(aiScripts[index])];
}

function rotateAiScriptVariant(index){
  const current = aiScripts[index];
  const variants = getAiScriptVariants(index);
  const currentVariant = Number.isInteger(current._variantIndex) ? current._variantIndex : 0;
  const nextVariant = (currentVariant + 1) % variants.length;
  aiScripts[index] = {
    ...cloneData(variants[nextVariant]),
    _variantIndex: nextVariant,
  };
  state.aiCopy.activeScript = index;
  renderApp();
  showToast(`已切换到 ${aiScripts[index].name}`,"success");
}

function openWorkspaceDialog(type, payload = {}){
  if(type==="ai-script-edit"){
    const script = aiScripts[payload.index];
    if(!script) return;
    state.workspaceDialog = {
      type,
      scriptIndex: payload.index,
      name: script.name,
      segments: cloneData(script.segments),
    };
  }else if(type==="storyboard-edit"){
    const index = payload.index ?? state.smartEdit.activeClip;
    const clip = editorStoryboard[index];
    if(!clip) return;
    state.workspaceDialog = {
      type,
      clipIndex: index,
      title: clip.title,
      time: clip.time.replace("s",""),
      copy: clip.copy,
      category: clip.category,
    };
  }else if(type==="distribution-edit"){
    const task = state.distribution.queue[payload.index];
    if(!task) return;
    state.workspaceDialog = {
      type,
      taskIndex: payload.index,
      title: task.title,
      platforms: task.platforms,
      schedule: task.schedule,
      status: task.status,
      originality: String(task.originality),
    };
  }
  renderApp();
}

function closeWorkspaceDialog(){
  state.workspaceDialog = null;
  renderApp();
}

function renderWorkspaceDialog(){
  const dialog = state.workspaceDialog;
  if(!dialog) return "";

  if(dialog.type==="ai-script-edit"){
    return `
      <div class="workspace-action-modal-backdrop" data-workspace-dialog-backdrop>
        <section class="workspace-action-modal" role="dialog" aria-modal="true" aria-label="编辑脚本">
          <button class="workspace-action-modal-close" data-action="close-workspace-dialog" aria-label="关闭">${icon("x",18)}</button>
          <div class="workspace-action-modal-head">
            <div>
              <span class="workspace-kicker">脚本工坊</span>
              <h3>编辑脚本方案</h3>
              <p>直接修改每段时间、类型和文案，保存后会同步到当前脚本卡片。</p>
            </div>
          </div>
          <div class="workspace-action-modal-body">
            <label class="workspace-modal-field">
              <span>方案标题</span>
              <input class="page-search-input" type="text" value="${escapeHtml(dialog.name)}" data-dialog-field="name" />
            </label>
            <div class="workspace-modal-script-list">
              ${dialog.segments.map((segment,index)=>`
                <article class="workspace-modal-script-card">
                  <div class="workspace-modal-script-head">
                    <strong>段落 ${String(index+1).padStart(2,"0")}</strong>
                    <div class="workspace-modal-script-meta">
                      <input class="page-search-input workspace-modal-mini-input" type="text" value="${escapeHtml(segment.time)}" data-dialog-segment-index="${index}" data-dialog-segment-prop="time" />
                      <input class="page-search-input workspace-modal-mini-input" type="text" value="${escapeHtml(segment.type)}" data-dialog-segment-index="${index}" data-dialog-segment-prop="type" />
                    </div>
                  </div>
                  <textarea class="workspace-modal-textarea" data-dialog-segment-index="${index}" data-dialog-segment-prop="text">${escapeHtml(segment.text)}</textarea>
                </article>`).join("")}
            </div>
          </div>
          <div class="workspace-action-modal-foot">
            <button class="btn btn--ghost" data-action="close-workspace-dialog">取消</button>
            <button class="btn btn--dark" data-action="save-ai-script">保存修改</button>
          </div>
        </section>
      </div>`;
  }

  if(dialog.type==="storyboard-edit"){
    return `
      <div class="workspace-action-modal-backdrop" data-workspace-dialog-backdrop>
        <section class="workspace-action-modal workspace-action-modal--compact" role="dialog" aria-modal="true" aria-label="编辑分镜">
          <button class="workspace-action-modal-close" data-action="close-workspace-dialog" aria-label="关闭">${icon("x",18)}</button>
          <div class="workspace-action-modal-head">
            <div>
              <span class="workspace-kicker">智能剪辑</span>
              <h3>编辑当前分镜</h3>
              <p>修改标题、时长、分类和口播文案，保存后会同步更新预览舞台和时间轴。</p>
            </div>
          </div>
          <div class="workspace-action-modal-body workspace-action-modal-grid">
            <label class="workspace-modal-field">
              <span>分镜标题</span>
              <input class="page-search-input" type="text" value="${escapeHtml(dialog.title)}" data-dialog-field="title" />
            </label>
            <label class="workspace-modal-field">
              <span>分镜时长（秒）</span>
              <input class="page-search-input" type="number" min="1" max="15" value="${escapeHtml(dialog.time)}" data-dialog-field="time" />
            </label>
            <label class="workspace-modal-field workspace-modal-field--full">
              <span>分镜分类</span>
              ${renderSelectControl({ field:"dialogCategory", value:dialog.category, options:["hook","pain","feature","social","cta"], labels:{ hook:"Hook", pain:"痛点", feature:"卖点", social:"口碑", cta:"CTA" } })}
            </label>
            <label class="workspace-modal-field workspace-modal-field--full">
              <span>口播文案</span>
              <textarea class="workspace-modal-textarea" data-dialog-field="copy">${escapeHtml(dialog.copy)}</textarea>
            </label>
          </div>
          <div class="workspace-action-modal-foot">
            <button class="btn btn--ghost" data-action="close-workspace-dialog">取消</button>
            <button class="btn btn--dark" data-action="save-storyboard-edit">保存修改</button>
          </div>
        </section>
      </div>`;
  }

  if(dialog.type==="distribution-edit"){
    return `
      <div class="workspace-action-modal-backdrop" data-workspace-dialog-backdrop>
        <section class="workspace-action-modal workspace-action-modal--compact" role="dialog" aria-modal="true" aria-label="编辑发布任务">
          <button class="workspace-action-modal-close" data-action="close-workspace-dialog" aria-label="关闭">${icon("x",18)}</button>
          <div class="workspace-action-modal-head">
            <div>
              <span class="workspace-kicker">矩阵分发</span>
              <h3>编辑发布任务</h3>
              <p>这里可以快速改标题、平台组合、排期和原创度评估。</p>
            </div>
          </div>
          <div class="workspace-action-modal-body workspace-action-modal-grid">
            <label class="workspace-modal-field workspace-modal-field--full">
              <span>任务标题</span>
              <input class="page-search-input" type="text" value="${escapeHtml(dialog.title)}" data-dialog-field="title" />
            </label>
            <label class="workspace-modal-field">
              <span>发布平台</span>
              <input class="page-search-input" type="text" value="${escapeHtml(dialog.platforms)}" data-dialog-field="platforms" />
            </label>
            <label class="workspace-modal-field">
              <span>发布时间</span>
              <input class="page-search-input" type="text" value="${escapeHtml(dialog.schedule)}" data-dialog-field="schedule" />
            </label>
            <label class="workspace-modal-field">
              <span>发布状态</span>
              ${renderSelectControl({ field:"dialogStatus", value:dialog.status, options:["待发布","待复核","待审核","已发布"] })}
            </label>
            <label class="workspace-modal-field">
              <span>原创度</span>
              <input class="page-search-input" type="number" min="70" max="100" value="${escapeHtml(dialog.originality)}" data-dialog-field="originality" />
            </label>
          </div>
          <div class="workspace-action-modal-foot">
            <button class="btn btn--ghost" data-action="close-workspace-dialog">取消</button>
            <button class="btn btn--dark" data-action="save-distribution-task">保存修改</button>
          </div>
        </section>
      </div>`;
  }

  return "";
}

function getInspirationPreviewMeta(item, index){
  const publishWindows = ["今天 18:30", "今天 19:10", "明天 12:40", "明天 18:00", "周五 20:15", "周六 10:30"];
  const platforms = ["抖音 / 视频号", "小红书 / 抖音", "快手 / 抖音", "视频号 / 小红书", "抖音 / TikTok", "抖音 / 小红书 / 视频号"];
  const copies = [
    "开头 3 秒直接抛出结果感，镜头用近景切中景，字幕压短句，适合做第一波种草投放。",
    "主镜头突出商品质感和使用场景，中段插入卖点字幕，适合做测评向和引流向的混剪版本。",
    "整体节奏偏快，封面标题建议走口语化表达，发布时保留轻 CTA，更适合矩阵号去做差异化分发。",
  ];
  const tags = [
    ["#电商带货", "#种草短视频", "#爆款脚本"],
    ["#本地生活", "#门店引流", "#内容投放"],
    ["#知识科普", "#口播混剪", "#AI视频"],
    ["#情感语录", "#爆款拆解", "#短视频模板"],
  ];
  const coverStyles = ["商品近景 + 白底标题", "人物半身 + 卖点字幕", "场景特写 + 时间标签", "对比画面 + 大字钩子"];
  return {
    copy: copies[index % copies.length],
    publishAt: publishWindows[index % publishWindows.length],
    platform: platforms[index % platforms.length],
    cover: coverStyles[index % coverStyles.length],
    hook: `${item.tag}向开场 · ${item.duration}`,
    tags: tags[index % tags.length],
  };
}

/* ── Landing Page ── */
function renderLandingPage(){
  const featureIcons = ["video","wand","scissors","shield","send","chart"];
  return `
    <div class="public-shell public-shell--light">
      <header class="landing-header">
        ${brandButton("landing","",true)}
        <nav class="landing-nav">
          <button data-scroll="landing-features">产品功能</button>
          <button data-scroll="landing-metrics">数据表现</button>
          <button data-scroll="landing-pricing">定价方案</button>
          <button data-route="login">登录</button>
        </nav>
        <button class="btn btn--dark btn--small" data-route="register">免费开始使用</button>
      </header>
      <main class="landing-main">
        <section class="landing-hero">
          <div class="landing-pill">全新 AI 混剪引擎 · 已服务 2,000+ 商家</div>
          <h1>MagicMix</h1>
          <h2>让 AI 为你批量生产爆款短视频</h2>
          <p>一条商品链接，AI 自动写脚本、找素材、剪辑配音，分钟级产出多条差异化混剪视频，告别人工剪辑</p>
          <div class="landing-actions">
            <button class="btn btn--dark" data-route="register">免费体验</button>
            <button class="btn btn--ghost-dark" data-route="dashboard-home">观看演示</button>
          </div>
          <div class="landing-preview">
            <aside class="preview-sidebar"><span></span><span></span><span></span><span></span><span class="preview-divider"></span><span></span><span></span></aside>
            <div class="preview-main"><div class="preview-line preview-line--long"></div><div class="preview-line preview-line--medium"></div><div class="preview-cards"><div class="preview-card"></div><div class="preview-card"></div><div class="preview-card"></div></div><div class="preview-line preview-line--full"></div><div class="preview-line preview-line--short"></div></div>
          </div>
        </section>
        <section class="landing-section" id="landing-features">
          <div class="landing-copy"><span>核心能力</span><h3>从素材到发布，全链路 AI 自动化</h3><p>每个功能模块独立可用，自由组合，不强制走完整个流程</p></div>
          <div class="landing-feature-grid">
            ${[["智能成片","粘贴商品链接或输入卖点，AI 一键完成脚本撰写、素材匹配、剪辑配音、多条输出"],["AI 营销文案","大模型生成主卖点分镜脚本，内置违禁词过滤和平台广告审核预检，多风格一键切换"],["智能剪辑编辑器","分镜时间轴可视化编辑，AI 推荐 Top-5 候选素材一键替换，转场配音字幕微调"],["去重防搬运","底层注入频差、色调扰幅、变速、画中画等多维度差异化参数，平台核心抗复用"],["矩阵分发","一键发布至抖音/快手/小红书/视频号/TikTok，自动差异化标题封面标签"],["数据看板","实时追踪多平台播放量、完播率、转化率，驱动数据化内容运营决策"]].map(([t,d],i)=>`<article class="landing-feature-card"><div class="feature-square" style="display:flex;align-items:center;justify-content:center;color:#a855f7">${icon(featureIcons[i],28)}</div><h4>${t}</h4><p>${d}</p></article>`).join("")}
          </div>
        </section>
        <section class="landing-metrics" id="landing-metrics">
          ${[["60%+","混剪在初探投放中的占比"],["4h→3min","单条视频制作时间缩短"],["≤0.5元","单条视频成本压至"],["≤2次","平均人工微调次数"]].map(([v,l])=>`<article class="metric-item"><strong>${v}</strong><span>${l}</span></article>`).join("")}
        </section>
        <section class="landing-cta-section" id="landing-pricing"><h3>准备好开始了吗？</h3><p>注册即送 3 日免费体验额度，无需绑定信用卡</p><button class="btn btn--dark" data-route="register">立即注册</button></section>
      </main>
      <footer class="landing-footer"><div class="landing-footer-brand"><span class="landing-footer-mark"></span><span>MagicMix © 2026</span></div><div class="landing-footer-links"><span>隐私政策</span><span>服务条款</span><span>联系我们</span></div></footer>
    </div>`;
}

/* ── Auth Page ── */
function renderAuthPage(mode){
  const isLogin = mode==="login";
  return `
    <div class="auth-shell">
      <div class="auth-brand-wrap">${brandButton("landing","",true)}</div>
      <section class="auth-card">
        <h1>${isLogin?"欢迎回来":"创建账号"}</h1>
        <p>${isLogin?"登录你的账号，继续创作":"免费注册，立即体验 AI 智能混剪"}</p>
        <div class="auth-tabs">
          <button class="${classNames("auth-tab",isLogin&&"is-active")}" data-auth-mode="login">登录</button>
          <button class="${classNames("auth-tab",!isLogin&&"is-active")}" data-auth-mode="register">注册</button>
        </div>
        <div class="auth-form">
          ${isLogin?`
            <label><span>邮箱</span><input type="email" placeholder="请输入邮箱" value="demo@magicmix.com" /></label>
            <label><span>密码</span><input type="password" placeholder="请输入密码" value="demo123" /></label>
            <div class="auth-inline-link">忘记密码？</div>
          `:`
            <label><span>用户名</span><input type="text" placeholder="请输入用户名" /></label>
            <label><span>邮箱</span><input type="email" placeholder="请输入邮箱" /></label>
            <label><span>设置密码</span><input type="password" placeholder="6位以上" /></label>
            <div class="auth-agreement">注册即代表同意 服务协议 和 隐私政策</div>
          `}
          <button class="btn btn--light btn--wide" data-action="auth-submit">${isLogin?"登录":"注册"}</button>
        </div>
        <div class="auth-divider"><span>或</span></div>
        <div class="auth-socials"><span></span><span></span><span></span></div>
        <div class="auth-switch-line">${isLogin?"还没有账号？":"已有账号？"}<button data-auth-mode="${isLogin?"register":"login"}">${isLogin?"立即注册":"去登录"}</button></div>
      </section>
      <button class="auth-back-home" data-route="landing">返回首页</button>
    </div>`;
}

/* ── Dashboard Sidebar ── */
function renderDashboardSidebar(){
  return `
    <aside class="dashboard-sidebar">
      <div class="dashboard-brand">
        <div class="dashboard-brand-mark" style="display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#a855f7,#ec4899);border-radius:8px;width:36px;height:36px;color:#fff;font-weight:800;font-size:18px">M</div>
        <div><h1>MagicMix</h1><p>AI 智能混剪</p></div>
      </div>
      <div class="dashboard-groups">
        ${dashboardGroups.map(g=>`
          <section class="dashboard-group"><p>${g.title}</p>
            <div class="dashboard-menu">
              ${g.items.map(it=>`<button class="${classNames("dashboard-menu-item",state.dashboard.activeMenu===it.label&&"is-active")}" data-route="${it.route}"><span class="sidebar-icon">${icon(sidebarIcon[it.label]||"home",16)}</span>${it.label}</button>`).join("")}
            </div>
          </section>`).join("")}
      </div>
      <div class="dashboard-sidebar-bottom">
        <div class="dashboard-menu dashboard-menu--secondary">
          ${dashboardBottomItems.map(it=>`<button class="${classNames("dashboard-menu-item","dashboard-menu-item--subtle",state.dashboard.activeMenu===it.label&&"is-active")}" data-route="${it.route}"><span class="sidebar-icon">${icon(sidebarIcon[it.label]||"settings",16)}</span>${it.label}</button>`).join("")}
        </div>
      </div>
      <div class="dashboard-user">
        <span class="dashboard-avatar" style="display:flex;align-items:center;justify-content:center">${icon("user",16)}</span>
        <div><strong>${api.user?.username||"用户"}</strong><p>${api.user?.plan==="pro"?"专业版":"免费版"} · 1,280 点</p></div>
        <button style="margin-left:auto;background:none;color:#8b7da0;cursor:pointer" data-action="logout" title="退出登录">${icon("logout",16)}</button>
      </div>
    </aside>`;
}

/* ── Dashboard Home ── */
function renderDashboardHome(){
  const items = filteredInspirationItems();
  const featureData = [
    { tag:"功能核心", title:"一键成片", desc:"商品链接/文字/素材批量出片", route:"smart-video", ic:"video" },
    { tag:"脚本能力", title:"脚本工坊", desc:"AI 分镜脚本·违禁词过滤·多风格", route:"ai-copy", ic:"wand" },
    { tag:"局部优选", title:"精细调整", desc:"时间线编辑·AI 素材替换·转场配音", route:"smart-edit", ic:"scissors" },
    { tag:"即将上线", title:"矩阵分发", desc:"多平台差异化标题封面·定时发布", route:"distribution", ic:"send" },
  ];
  return `
    <div class="dashboard-shell">${renderDashboardSidebar()}
      <main class="dashboard-main">
        <header class="dashboard-topbar"><h2>${icon("home",18)} 首页</h2><div style="display:flex;gap:12px;align-items:center"><span class="topbar-icon-btn" data-action="notifications">${icon("bell",18)}</span><span class="topbar-icon-btn">${icon("settings",18)}</span></div></header>
        <div class="dashboard-content">
          <section class="dashboard-hero">
            <div><span>快速开始</span><h3>粘贴商品链接，30秒出片</h3><p>AI 自动完成脚本、素材匹配、剪辑配音，批量产出差异化视频</p></div>
            <div class="dashboard-hero-input">
              <div class="dashboard-input-wrap"><input data-field="dashboardQuickLink" type="text" placeholder="支持淘宝、抖音、拼多多等链接" value="${escapeHtml(state.dashboard.quickLink)}" /><button data-action="dashboard-parse">${icon("zap",16)} 开启智能解析</button></div>
              <small style="color:rgba(255,255,255,0.8)">${state.dashboard.quickStatus}</small>
            </div>
          </section>

          <section class="dashboard-stats">
            ${[["今日已生成",`${state._stats?.totalVideos||12} 条`,"video"],["素材库",`${state._stats?.totalAssets||86} 个`,"folder"],["剩余点数","1,280","star"],["本周发布",`${state._stats?.totalDistributions||34} 条`,"send"]].map(([l,v,ic])=>`<article class="dashboard-stat-card"><span style="display:flex;align-items:center;gap:4px">${icon(ic,14)} ${l}</span><strong>${v}</strong></article>`).join("")}
          </section>

          <section class="dashboard-feature-grid">
            ${featureData.map(f=>`<article class="${classNames("dashboard-feature-card",state.dashboard.activeFeature===f.title&&"is-active")}" data-feature-title="${f.title}"><div class="feature-square" style="display:flex;align-items:center;justify-content:center;color:#a855f7">${icon(f.ic,28)}</div><span>${f.tag}</span><h3>${f.title}</h3><p>${f.desc}</p><button data-route="${f.route}">进入</button></article>`).join("")}
          </section>

          <section class="workspace-block" style="margin-bottom:24px">
            <h3 style="margin-bottom:12px">${icon("clock",16)} 最近项目</h3>
            <div style="display:grid;gap:8px">
              ${recentProjects.map(p=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:#ffffff;border:1px solid rgba(168,85,247,0.08);border-radius:8px"><div style="display:flex;align-items:center;gap:12px"><span style="color:#a855f7">${icon("folder",16)}</span><div><strong style="font-size:14px">${p.name}</strong><span style="font-size:12px;opacity:0.6;color:#8b7da0;margin-left:8px">${p.count} 条视频</span></div></div><div style="display:flex;align-items:center;gap:12px"><span style="font-size:12px;opacity:0.6;color:#8b7da0">${p.date}</span><span style="font-size:11px;padding:2px 8px;border-radius:4px;background:rgba(168,85,247,0.1);color:#a855f7">${p.status}</span></div></div>`).join("")}
            </div>
          </section>

          <section class="dashboard-inspiration">
            <div class="dashboard-section-head">
              <div><h3>${icon("sparkles",16)} 灵感广场</h3><p>浏览爆款案例，一键获取同款脚本</p></div>
              <label class="dashboard-search"><span>${icon("search",14)}</span><input data-field="dashboardSearch" type="text" placeholder="搜索..." value="${escapeHtml(state.dashboard.search)}" /></label>
            </div>
            <div class="dashboard-chip-row">
              ${inspirationCategories.map(c=>`<button class="${classNames("dashboard-chip",state.dashboard.activeCategory===c&&"is-active")}" data-dashboard-category="${c}">${c}</button>`).join("")}
            </div>
            <div class="dashboard-card-grid">
              ${items.map((it,i)=>{ const dataIndex = inspirationItems.indexOf(it); return `<article class="dashboard-video-card" data-inspiration-preview="${dataIndex}"><div class="dashboard-video-thumb">${renderPreviewVideo(getPreviewVideo(i,"landscape"),"media-preview-video",true)}<span class="dashboard-video-tag">${it.tag}</span><span class="dashboard-play">${icon("play",20)}</span><span class="dashboard-video-duration">${it.duration}</span></div><div class="dashboard-video-meta"><h4>${it.title}</h4><p>${icon("eye",12)} ${it.views} ${it.hot?icon("fire",12)+" 热门":""}</p></div></article>`; }).join("")}
            </div>
          </section>
        </div>
      </main>
    </div>`;
}

function renderInspirationPreviewModal(){
  const previewIndex = state.dashboard.previewIndex;
  if(previewIndex===null || previewIndex===undefined) return "";
  const item = inspirationItems[previewIndex];
  if(!item) return "";
  const meta = getInspirationPreviewMeta(item, previewIndex);
  return `
    <div class="inspiration-modal-backdrop" data-inspiration-backdrop>
      <section class="inspiration-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(item.title)}">
        <button class="inspiration-modal-close" data-action="close-inspiration-preview" aria-label="关闭">${icon("x",18)}</button>
        <div class="inspiration-modal-media">
          <div class="inspiration-modal-player">
            <video class="media-preview-video" src="${getPreviewVideo(previewIndex,"landscape")}" autoplay muted loop playsinline preload="metadata" controls></video>
            <div class="inspiration-modal-player-bar">
              <span>${icon("play",14)} 灵感样片播放中</span>
              <span>${item.duration}</span>
            </div>
          </div>
        </div>
        <div class="inspiration-modal-content">
          <span class="workspace-kicker">灵感广场样片</span>
          <h3>${item.title}</h3>
          <p>${meta.copy}</p>
          <div class="inspiration-modal-tags">
            <span>${item.tag}</span>
            <span>${item.category}</span>
            <span>${meta.hook}</span>
            ${meta.tags.map(tag=>`<span>${tag}</span>`).join("")}
          </div>
          <div class="inspiration-modal-meta-grid">
            <article><small>发布时间</small><strong>${meta.publishAt}</strong></article>
            <article><small>发布平台</small><strong>${meta.platform}</strong></article>
            <article><small>封面策略</small><strong>${meta.cover}</strong></article>
            <article><small>发布状态</small><strong>${item.hot?"热门投放中":"待排期发布"}</strong></article>
          </div>
          <div class="inspiration-modal-note">
            <strong>${icon("sparkles",14)} 对应发布元素</strong>
            <ul>
              <li>标题建议：围绕“${item.tag}”和结果感开头，压缩到 14 字以内。</li>
              <li>字幕节奏：前 3 秒保留结论句，中段上卖点，尾段补 CTA。</li>
              <li>投放建议：优先发布到 ${meta.platform}，保留差异化标题和封面。</li>
            </ul>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </section>
    </div>`;
}

function renderBillingPage(){
  const plans = [
    { name:"免费版", price:"¥0", credits:"3 个/月", res:"720p", current:false },
    { name:"专业版", price:"¥139", credits:"50 个/月", res:"1080p", current:true },
    { name:"创作者版", price:"¥359", credits:"200 个/月", res:"1080p", current:false },
    { name:"企业版", price:"¥719", credits:"不限量", res:"1080p", current:false },
  ];
  const bills = [
    { date:"2026年3月5日", desc:"专业版 - 包月扣费", amount:"¥139.00", status:"已支付" },
    { date:"2026年2月5日", desc:"专业版 - 包月扣费", amount:"¥139.00", status:"已支付" },
    { date:"2026年1月5日", desc:"专业版 - 包月扣费", amount:"¥139.00", status:"已支付" },
  ];
  return `
    <div class="dashboard-shell">${renderDashboardSidebar()}
      <main class="dashboard-main">
        <header class="dashboard-topbar">
          <div class="dashboard-topbar-title">
            ${renderSubpageBackButton("dashboard-home")}
            <h2>${icon("creditCard",18)} 计费与套餐</h2>
          </div>
          <div style="display:flex;gap:12px;align-items:center"><button class="btn btn--ghost">管理订阅</button><button class="btn btn--dark">升级套餐</button></div>
        </header>
        <div class="dashboard-content">
          <section class="workspace-block billing-current-card">
            <div class="billing-current-copy">
              <span class="workspace-kicker">您的当前套餐</span>
              <h3>专业版 (Pro Plan)</h3>
              <p>已消耗 38 额度 / 50 额度，将于 2026 年 4 月 5 日续费，当前费用 ¥139.00 / 月。</p>
              <div class="billing-progress"><i style="width:76%"></i></div>
            </div>
            <button class="btn btn--ghost">管理订阅</button>
          </section>

          <section class="billing-plan-grid">
            ${plans.map(plan=>`<article class="${classNames("workspace-block","billing-plan-card",plan.current&&"is-current")}">
              ${plan.current?`<span class="distribution-badge distribution-badge--success">当前正在使用</span>`:""}
              <h3>${plan.name}</h3>
              <div class="billing-price">${plan.price}<small>${plan.price==="¥0"?"":"/月"}</small></div>
              <p>视频额度：${plan.credits}</p>
              <div class="billing-plan-meta">导出规格：${plan.res}</div>
              <button class="${classNames("btn","btn--wide",plan.current?"btn--ghost":"btn--dark")}" ${plan.current?"disabled":""}>${plan.current?"已选套餐":"升级至此套餐"}</button>
            </article>`).join("")}
          </section>

          <section class="workspace-block">
            <div class="workspace-block-head">
              <div>
                <h2>${icon("clock",16)} 历史账单记录</h2>
                <p>查看最近的扣费记录和套餐续费情况。</p>
              </div>
            </div>
            <div class="billing-history-list">
              ${bills.map(item=>`<div class="billing-history-row">
                <span>${item.date}</span>
                <strong>${item.desc}</strong>
                <span>${item.amount}</span>
                <span class="distribution-badge distribution-badge--success">${item.status}</span>
              </div>`).join("")}
            </div>
          </section>
        </div>
      </main>
    </div>`;
}

function renderAccountSettingsPage(){
  const tabs = [
    { id:"profile", label:"个人信息", icon:"user" },
    { id:"password", label:"修改密码", icon:"lock" },
    { id:"notifications", label:"通知偏好", icon:"bell" },
    { id:"api", label:"API 密钥", icon:"key" },
    { id:"workspace", label:"工作空间配置", icon:"settings" },
    { id:"team", label:"团队成员", icon:"users" },
  ];
  const activeTab = state.accountSettings.activeTab;
  const panelMap = {
    profile: `
      <section class="workspace-block settings-panel-card">
        <h3>个人信息设置</h3>
        <div class="workspace-form-grid">
          ${renderFieldBlock({ iconName:"user", label:"用户名", control:`<input class="page-search-input" value="${escapeHtml(api.user?.username||"用户名")}" />`, hint:"用于侧栏展示和团队协作识别。" })}
          ${renderFieldBlock({ iconName:"mail", label:"邮箱", control:`<input class="page-search-input" value="${escapeHtml(api.user?.email||"demo@magicmix.ai")}" />`, hint:"用于登录、账单通知与安全验证。" })}
        </div>
        ${renderFieldBlock({ iconName:"tag", label:"团队身份", control:`<input class="page-search-input" value="运营负责人" />`, hint:"帮助区分当前工作空间中的角色。" })}
      </section>`,
    password: `
      <section class="workspace-block settings-panel-card">
        <h3>修改密码</h3>
        ${renderFieldBlock({ iconName:"lock", label:"当前密码", control:`<input class="page-search-input" type="password" placeholder="输入当前密码" />` })}
        ${renderFieldBlock({ iconName:"lock", label:"新密码", control:`<input class="page-search-input" type="password" placeholder="设置新密码" />`, hint:"建议至少 8 位，包含数字与大小写字母。" })}
        ${renderFieldBlock({ iconName:"check", label:"确认新密码", control:`<input class="page-search-input" type="password" placeholder="再次输入新密码" />` })}
      </section>`,
    notifications: `
      <section class="workspace-block settings-panel-card">
        <h3>通知偏好</h3>
        <div class="settings-option-list">
          ${["渲染完成通知","发布失败提醒","账单扣费提醒","高表现模板复盘提醒"].map(item=>`<label class="settings-switch-row"><span>${item}</span><input type="checkbox" checked /></label>`).join("")}
        </div>
      </section>`,
    api: `
      <section class="workspace-block settings-panel-card">
        <h3>API 密钥</h3>
        <div class="settings-api-card">
          <strong>mm_live_sk_2026_xxxxxx</strong>
          <p>用于调用批量生成、分发和数据回传接口。请妥善保管，不要在前端代码中暴露。</p>
          <div style="display:flex;gap:10px"><button class="btn btn--ghost">复制密钥</button><button class="btn btn--dark">重新生成</button></div>
        </div>
      </section>`,
    workspace: `
      <section class="workspace-block settings-panel-card">
        <h3>工作空间配置</h3>
        ${renderFieldBlock({ iconName:"settings", label:"默认品牌名", control:`<input class="page-search-input" value="MagicMix Studio" />` })}
        ${renderFieldBlock({ iconName:"image", label:"默认封面风格", control:`<input class="page-search-input" value="品牌渐变 + 商品主图" />` })}
        ${renderFieldBlock({ iconName:"type", label:"字幕默认方案", control:`<input class="page-search-input" value="抖音美好体 / 底部居中" />` })}
      </section>`,
    team: `
      <section class="workspace-block settings-panel-card">
        <h3>团队成员</h3>
        <div class="settings-team-list">
          ${[
            ["陈晓","管理员","已启用"],
            ["运营A","编辑","已启用"],
            ["设计B","查看者","待邀请"],
          ].map(item=>`<div class="settings-team-row"><div><strong>${item[0]}</strong><small>${item[1]}</small></div><span class="distribution-badge ${item[2]==="已启用"?"distribution-badge--success":"distribution-badge--warning"}">${item[2]}</span></div>`).join("")}
        </div>
      </section>`,
  };
  return `
    <div class="dashboard-shell">${renderDashboardSidebar()}
      <main class="dashboard-main">
        <header class="dashboard-topbar">
          <div class="dashboard-topbar-title">
            ${renderSubpageBackButton("dashboard-home")}
            <h2>${icon("settings",18)} 账户设置</h2>
          </div>
          <div style="display:flex;gap:12px;align-items:center"><button class="btn btn--ghost">重置</button><button class="btn btn--dark">保存修改</button></div>
        </header>
        <div class="dashboard-content">
          <section class="settings-shell">
            <aside class="settings-tabs">
              ${tabs.map(tab=>`<button class="${classNames("settings-tab",activeTab===tab.id&&"is-active")}" data-settings-tab="${tab.id}">${icon(tab.icon,16)} ${tab.label}</button>`).join("")}
            </aside>
            <div class="settings-panel">${panelMap[activeTab] || panelMap.profile}</div>
          </section>
        </div>
      </main>
    </div>`;
}

/* ── Workspace Header ── */
function getWorkspaceHeaderMeta(route = state.route){
  const aiInputLabel = state.aiCopy.inputType==="keyword"
    ? "关键词输入"
    : state.aiCopy.inputType==="link"
      ? "链接输入"
      : "改写已有";

  switch(route){
    case "smart-video":
      return {
        title:"智能成片",
        subtitle:"输入商品、卖点或素材后，AI 自动完成脚本、镜头和配音编排。",
        tags:[state.smartVideo.industry, state.smartVideo.style, `${state.smartVideo.duration}s`],
      };
    case "ai-copy":
      return {
        title:"AI文案",
        subtitle:"统一生成营销脚本、镜头拆解与平台合规预检，保证后续成片链路顺滑。",
        tags:[aiInputLabel, state.aiCopy.style],
      };
    case "asset-library":
      return {
        title:"资产库",
        subtitle:"统一管理视频、素材、脚本与收藏，保持创作资产可检索、可复用。",
        tags:[state.assets.tab, `${filteredAssetItems().length} 项`],
      };
    case "upload":
      return {
        title:"素材上传",
        subtitle:"支持批量导入视频与图片，上传后自动打标、归类并进入素材库。",
        tags:["批量上传", "AI 自动打标"],
      };
    case "distribution":
      return {
        title:"矩阵分发",
        subtitle:"统一配置标题、封面和平台策略，把同一批视频安全、高效地推向多平台。",
        tags:["多平台一键发布", "AI 差异化策略"],
      };
    case "analytics":
      return {
        title:"数据看板",
        subtitle:"从生产效率到投放效果，统一查看近 30 天视频表现与可复用创作策略。",
        tags:["30 天趋势", "平台对比", "复刻建议"],
      };
    case "product-config":
      return {
        title:"商品配置",
        subtitle:"先把商品、卖点与人群描述清楚，后续脚本、成片和分发都会更稳定。",
        tags:["卖点提炼", "人群定向", "策略生成"],
      };
    case "voice-settings":
      return {
        title:"配音设置",
        subtitle:"统一调节音色、节奏、音乐和字幕样式，让成片保持同一套专业表达。",
        tags:[state.voiceSettings.voice || "未选择", state.voiceSettings.emotion, state.voiceSettings.bgmGenre],
      };
    case "smart-edit":
      return {
        title:"智能剪辑",
        subtitle:"围绕分镜、素材、旁白和转场做轻量精修，实时查看成片效果。",
        tags:[`分镜 ${state.smartEdit.activeClip+1}/${editorStoryboard.length}`, `${state.smartEdit.duration}s`, state.smartEdit.transition],
      };
    case "timeline-editor":
      return {
        title:"时间线编辑",
        subtitle:"在时间轴中细调素材、字幕、音乐和节奏，完成最终导出前的收口。",
        tags:[state.timelineEditor.library, `${editorStoryboard.length} 段片段`],
      };
    case "storyboard-match":
      return {
        title:"分镜匹配",
        subtitle:"将脚本句子与素材候选快速对齐，提升批量成片的稳定性和效率。",
        tags:["候选素材", "匹配置信度", "去重策略"],
      };
    default:
      return {
        title:routeTitle(route),
        subtitle:"",
        tags:[],
      };
  }
}

function renderWorkspaceHeader(options=""){
  const normalized = typeof options==="string" ? { actions:options } : (options || {});
  const meta = { section:"MagicMix Studio", ...getWorkspaceHeaderMeta(state.route), ...normalized };
  const extraActions = meta.actions ? `<div class="workspace-topbar-extra">${meta.actions}</div>` : "";
  const backButton = normalized.showBack===false ? "" : renderSubpageBackButton(normalized.backRoute || getBackRoute(state.route));

  return `
    <header class="workspace-topbar">
      <div class="workspace-topbar-main">
        ${backButton}
        ${brandButton("dashboard-home","workspace-brand",true)}
        <div class="workspace-breadcrumb">
          <div class="workspace-breadcrumb-path">
            <span>${meta.section}</span>
            <i>${icon("chevronRight",14)}</i>
            <strong>${meta.title}</strong>
          </div>
          ${meta.subtitle ? `<p>${meta.subtitle}</p>` : ""}
        </div>
      </div>
      <div class="workspace-topbar-actions">
        <div class="workspace-header-metrics"><span>${icon("edit",12)} 草稿 12</span><span>${icon("clock",12)} 处理中 3</span><span>${icon("user",12)} 团队协作</span></div>
        ${extraActions}
      </div>
    </header>`;
}

function renderWorkspaceTitleBlock({ iconName, title, subtitle, eyebrow = "MagicMix Studio", meta = [] }){
  return `
    <div class="workspace-title workspace-title--hero">
      <span class="workspace-kicker">${eyebrow}</span>
      <h1>${icon(iconName,20)} ${title}</h1>
      <p>${subtitle}</p>
      ${meta.length ? `<div class="workspace-title-meta">${meta.map(item=>`<span>${item}</span>`).join("")}</div>` : ""}
    </div>`;
}

function renderPageHeader({ iconName, title, subtitle, eyebrow = "MagicMix Studio", meta = [], actions = "" }){
  return `
    <section class="page-head page-head--hero">
      <div class="page-head-copy">
        <span class="workspace-kicker">${eyebrow}</span>
        <h1>${icon(iconName,20)} ${title}</h1>
        <p>${subtitle}</p>
        ${meta.length ? `<div class="workspace-title-meta">${meta.map(item=>`<span>${item}</span>`).join("")}</div>` : ""}
      </div>
      ${actions}
    </section>`;
}

function renderFieldBlock({ iconName = "", label, control, hint = "" }){
  return `
    <label class="workspace-field">
      <span class="workspace-field-label">${iconName ? `${icon(iconName,12)} ` : ""}${label}</span>
      ${control}
      ${hint ? `<small class="workspace-field-hint">${hint}</small>` : ""}
    </label>`;
}

/* ── Smart Video Page ── */
function renderSmartVideoPage(){
  const smartVoiceOptions = ["智能推荐", "甜美女声", "磁性男声", "少年音", "御姐音", "温柔女声"];
  const smartBgmOptions = ["智能推荐", "流行", "轻音乐", "电子", "古风", "嘻哈"];
  const smartSubtitleOptions = ["抖音美好体", "黑体加粗", "楷体", "手写风格", "霓虹发光"];
  const isCustomDuration = !smartVideoDurations.includes(state.smartVideo.duration);
  const inputArea = state.smartVideo.mode==="product"
    ?`<div class="workspace-input-box"><input data-field="smartProductLink" type="text" placeholder="粘贴商品链接 / 商品ID" value="${escapeHtml(state.smartVideo.productLink)}" /></div><p class="workspace-hint">支持抖音、淘宝、京东、拼多多商品链接</p>`
    :state.smartVideo.mode==="text"
    ?`<div class="workspace-textarea-box"><textarea data-field="smartDescription" placeholder="描述你的商品卖点、目标人群和视频风格...">${escapeHtml(state.smartVideo.description)}</textarea></div>`
    :`<button class="upload-placeholder-card" data-action="upload-demo"><span class="upload-placeholder-icon">${icon("upload",28)}</span><strong>拖拽或点击上传</strong><p>≤20 个文件 单个≤500MB</p></button>`;

  const mainPanel = state.smartVideo.stage==="results"
    ?`<div class="results-panel">
        <div class="results-panel-head">
          <div><h2>${icon("check",20)} 生成结果</h2><p>已成功生成 ${generatedVideos.length} 条视频</p></div>
          <div class="results-head-actions">
            <button class="btn btn--ghost" data-action="smart-regenerate">${icon("refresh",14)} 再次生成</button>
            <button class="btn btn--ghost" data-action="smart-fission">${icon("zap",14)} 一键裂变 10 条</button>
            <button class="btn btn--light" data-action="smart-batch-download">${icon("download",14)} 批量下载</button>
          </div>
        </div>
        <div class="results-notice">${icon("shield",14)} 已通过素材初审，降低使用风险。具体请以最终投放平台规则为准</div>
        <div class="results-grid">
          ${generatedVideos.map((v,i)=>`<article class="result-card">
            <span class="result-tag">${v.tag}</span>
            <div class="result-thumb">${renderPreviewVideo(getPreviewVideo(i),"media-preview-video",i<3)}<span class="dashboard-play">${icon("play",20)}</span></div>
            <div style="padding:8px 12px;display:flex;justify-content:space-between;align-items:center">
              <div class="result-info">${v.duration} · ${v.size}</div>
              ${qualityBadge(v.quality)}
            </div>
            <div style="padding:0 12px 4px;font-size:11px;opacity:0.6">原创度: ${v.originality}%</div>
            <div class="result-actions"><button data-route="smart-edit">${icon("edit",12)} 编辑</button><button data-action="download-single">${icon("download",12)} 下载</button></div>
          </article>`).join("")}
        </div>
        <div style="display:flex;gap:8px;margin-top:16px;justify-content:center">
          <button class="btn btn--ghost" data-action="smart-batch-export">${icon("share",14)} 批量导出</button>
          <button class="results-clear" data-action="smart-reset">${icon("trash",14)} 一键清空</button>
        </div>
      </div>`
    :state.smartVideo.stage==="processing"
    ?`<div class="processing-panel"><div class="processing-ring"></div><h2>正在生成中</h2><p>AI 正在解析链接、拆解脚本、匹配素材和配音，请稍候。</p>
        <div class="processing-steps">${["读取商品与卖点","生成分镜脚本","匹配素材与配音","输出差异化版本"].map((s,i)=>`<div class="processing-step ${i<3?"is-done":"is-current"}"><span>0${i+1}</span><strong>${s}</strong></div>`).join("")}</div></div>`
    :`<div class="empty-stage"><div class="empty-stage-icon">${icon("video",48)}</div><h2>开始你的第一条视频</h2><p>在左侧选择输入方式、配置参数<br/>点击「立即生成」即可</p>
        <div class="empty-stage-steps">${[["01","输入商品","链接/文字/素材"],["02","AI 处理","脚本+素材+配音"],["03","预览导出","多条差异化视频"]].map(([s,t,d])=>`<article class="empty-step-card"><strong>${s}</strong><h4>${t}</h4><p>${d}</p></article>`).join("")}</div></div>`;

  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader()}
      <main class="workspace-two-column">
        <aside class="workspace-sidebar-panel">
          <section class="workspace-section"><h3>输入方式</h3>
            <div class="segmented-control">
              <button class="${classNames("segment-button",state.smartVideo.mode==="product"&&"is-active")}" data-smart-mode="product">${icon("link",14)} 商品链接</button>
              <button class="${classNames("segment-button",state.smartVideo.mode==="text"&&"is-active")}" data-smart-mode="text">${icon("type",14)} 文字描述</button>
              <button class="${classNames("segment-button",state.smartVideo.mode==="upload"&&"is-active")}" data-smart-mode="upload">${icon("upload",14)} 上传素材</button>
            </div>
            ${inputArea}
          </section>
          <section class="workspace-section"><h3>行业场景</h3><div class="selector-row">${renderSelectorChips(smartVideoIndustries,state.smartVideo.industry,"smart-industry")}</div></section>
          <section class="workspace-section"><h3>视频风格</h3><div class="selector-row">${renderSelectorChips(smartVideoStyles,state.smartVideo.style,"smart-style")}</div></section>
          <section class="workspace-section">
            <h3>目标时长</h3>
            <div class="selector-row">${smartVideoDurations.map(d=>`<button class="${classNames("selector-chip",state.smartVideo.duration===d&&"is-active")}" data-smart-duration="${d}">${d}s</button>`).join("")}</div>
            <div class="workspace-duration-custom">
              <span class="${classNames("workspace-duration-label",isCustomDuration&&"is-active")}">自定义</span>
              <input class="page-search-input workspace-duration-input" data-field="smartVideoCustomDuration" type="number" min="5" max="180" step="1" placeholder="输入秒数" value="${isCustomDuration ? state.smartVideo.duration : ""}" />
              <small>支持 5-180 秒</small>
            </div>
          </section>
          <section class="workspace-section"><div class="workspace-range-head"><h3>批量生成数量</h3><strong>${state.smartVideo.count} 条</strong></div><input class="range-input" data-field="smartVideoCount" type="range" min="1" max="10" value="${state.smartVideo.count}" /></section>
          <section class="workspace-section workspace-stack-cards">
            ${renderImportableSelectField({
              iconName:"mic",
              label:"配音音色",
              field:"smartVideoVoice",
              value:state.smartVideo.voice,
              placeholder:"请选择配音音色",
              options:smartVoiceOptions,
              importTarget:"smart-video-voice",
              accept:".mp3,.wav,.m4a,.aac,.ogg,.flac",
            })}
            ${renderImportableSelectField({
              iconName:"music",
              label:"背景音乐",
              field:"smartVideoBgm",
              value:state.smartVideo.bgm,
              placeholder:"请选择背景音乐",
              options:smartBgmOptions,
              importTarget:"smart-video-bgm",
              accept:".mp3,.wav,.m4a,.aac,.ogg,.flac",
            })}
            ${renderImportableSelectField({
              iconName:"type",
              label:"字幕样式",
              field:"smartVideoSubtitle",
              value:state.smartVideo.subtitle,
              placeholder:"请选择字幕样式",
              options:smartSubtitleOptions,
              importTarget:"smart-video-subtitle",
              accept:".ass,.srt,.vtt,.json,.ttf,.otf,.css,.txt",
            })}
          </section>
          <button class="btn btn--light btn--wide" data-action="smart-generate">${icon("zap",14)} 立即生成</button>
          <button class="btn btn--ghost btn--wide" data-route="product-config" style="margin-top:8px">${icon("package",14)} 先配置商品</button>
          <p class="workspace-cost-note">预计消耗 10 点 · 约 3 分钟</p>
        </aside>
        <section class="workspace-main-panel">
          <div class="workspace-summary-bar"><div><span>本次配置</span><strong>智能成片参数</strong></div><div class="workspace-summary-tags"><span>${state.smartVideo.industry}</span><span>${state.smartVideo.style}</span><span>${state.smartVideo.duration}s</span><span>${state.smartVideo.count} 条</span></div></div>
          ${mainPanel}
        </section>
      </main>
    </div>`;
}

/* ── AI Copy Page ── */
function renderAiCopyPage(){
  const baseScriptStyles = ["剧情植入","测评对比","痛点共鸣","口播推荐","种草安利","场景植入","情感向","知识科普"];
  const scriptStyles = [...baseScriptStyles, ...state.aiCopy.customStyles];
  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader()}
      <main class="workspace-two-column">
        <aside class="workspace-sidebar-panel">
          <section class="workspace-section"><h3>输入类型</h3>
            <div class="segmented-control">
              <button class="${classNames("segment-button",state.aiCopy.inputType==="keyword"&&"is-active")}" data-ai-input="keyword">关键词/卖点</button>
              <button class="${classNames("segment-button",state.aiCopy.inputType==="link"&&"is-active")}" data-ai-input="link">商品链接</button>
              <button class="${classNames("segment-button",state.aiCopy.inputType==="rewrite"&&"is-active")}" data-ai-input="rewrite">改写已有</button>
            </div>
            <div class="workspace-textarea-box"><textarea data-field="aiCopyPrompt" placeholder="输入商品名称、核心卖点、目标人群...">${escapeHtml(state.aiCopy.prompt)}</textarea></div>
          </section>
          <section class="workspace-section">
            <div class="workspace-section-head">
              <h3>脚本风格</h3>
              <button class="workspace-inline-btn" data-action="toggle-custom-ai-style">${icon("plus",12)} 自定义</button>
            </div>
            <div class="selector-row selector-row--wrap">${renderSelectorChips(scriptStyles,state.aiCopy.style,"ai-style")}</div>
            ${state.aiCopy.isAddingCustomStyle ? `
              <div class="workspace-inline-input-row">
                <input class="page-search-input workspace-inline-input" data-field="aiCopyCustomStyleDraft" type="text" placeholder="输入自定义脚本风格，例如：直播拆解 / 反差反转" value="${escapeHtml(state.aiCopy.customStyleDraft)}" />
                <button class="btn btn--dark workspace-inline-action" data-action="save-custom-ai-style">保存</button>
                <button class="btn btn--ghost workspace-inline-action" data-action="cancel-custom-ai-style">取消</button>
              </div>` : ""}
          </section>
          <button class="btn btn--light btn--wide" data-action="ai-generate">${icon("sparkles",14)} 生成脚本</button>
        </aside>
        <section class="workspace-main-panel">
          ${state.aiCopy.generated?`
            <div class="script-results">
              ${aiScripts.map((script,idx)=>`
                <article class="${classNames("script-panel",state.aiCopy.activeScript===idx&&"is-active")}">
                  <div class="script-panel-head">
                    <h2>${script.name}</h2>
                    <div class="script-panel-actions">
                      <button data-action="edit-ai-script" data-script-index="${idx}">${icon("edit",12)} 编辑</button>
                      <button data-action="rotate-ai-script" data-script-index="${idx}">${icon("refresh",12)} 换一批</button>
                      <button class="btn btn--ghost" data-action="go-storyboard-match">${icon("layers",12)} 分镜匹配</button>
                      <button class="btn btn--light" data-route="smart-video" data-stage="results">${icon("video",12)} 一键成片</button>
                    </div>
                  </div>
                  <div style="display:flex;gap:12px;margin-bottom:12px;flex-wrap:wrap">
                    <span style="font-size:11px;padding:4px 10px;border-radius:4px;background:rgba(168,85,247,0.1);color:#a855f7">${icon("zap",10)} 钩子强度 ${script.score.hook}</span>
                    <span style="font-size:11px;padding:4px 10px;border-radius:4px;background:rgba(245,158,11,0.15);color:#fbbf24">${icon("target",10)} 营销感 ${script.score.marketing}</span>
                    <span style="font-size:11px;padding:4px 10px;border-radius:4px;background:rgba(16,185,129,0.15);color:#34d399">${icon("eye",10)} 可视化 ${script.score.visual}</span>
                  </div>
                  <div class="script-table">
                    ${script.segments.map(seg=>`<div class="script-row"><span>${seg.time}</span><strong>${seg.type}</strong><p>${seg.text}</p></div>`).join("")}
                  </div>
                </article>`).join("")}
            </div>`
          :state.aiCopy.isGenerating?`
            <div class="processing-panel processing-panel--copy"><div class="processing-ring"></div><h2>脚本生成中</h2><p>正在执行卖点提炼、平台适配、违禁词过滤与分镜拆解。</p>
              <div class="processing-steps">${["提炼卖点","拆分镜头","校验合规","输出脚本"].map((s,i)=>`<div class="processing-step ${i<2?"is-done":i===2?"is-current":""}"><span>0${i+1}</span><strong>${s}</strong></div>`).join("")}</div></div>`
          :`<div class="empty-stage empty-stage--copy"><div class="empty-stage-icon">${icon("wand",48)}</div><h2>生成你的第一条脚本</h2><p>在左侧输入商品信息并选择风格，点击生成即可</p></div>`}
        </section>
      </main>
    </div>`;
}

/* ── Smart Edit Page ── */
function renderSmartEditPage(){
  const storyboardClips = editorStoryboard.map((clip, index) => (
    index === state.smartEdit.activeClip
      ? {
          ...clip,
          copy: state.smartEdit.voiceCopy || clip.copy,
          time: `${Math.min(15, Math.max(1, Number(state.smartEdit.duration) || Number.parseInt(clip.time, 10) || 3))}s`,
        }
      : clip
  ));
  const ac = storyboardClips[state.smartEdit.activeClip];
  const rightCats = ["Hook","卖点","CTA","口碑","自定义"];
  const rc = state.smartEdit.rightCategory;
  const candidateLabels = { Hook:["开场特写","悬念提问","痛点切入","趣味反转"], 卖点:["成分展示","功效对比","使用场景","数据背书"], CTA:["限时优惠","链接引导","评论互动","关注引导"], 口碑:["用户评价","回购反馈","KOL推荐","销量展示"], 自定义:["自定义 1","自定义 2","自定义 3","自定义 4"] };
  const labels = candidateLabels[rc]||candidateLabels["Hook"];
  const selectedLabel = labels[state.smartEdit.hookMaterial] || labels[0];
  const gradients = [
    "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",
    "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
    "linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)"
  ];
  const clipGradients = [
    "linear-gradient(135deg,#a855f7 0%,#6366f1 100%)",
    "linear-gradient(135deg,#ec4899 0%,#f43f5e 100%)",
    "linear-gradient(135deg,#10b981 0%,#06b6d4 100%)",
    "linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)",
    "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)"
  ];
  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader(`<button class="btn btn--ghost">${icon("eye",14)} 预览</button><button class="btn btn--dark">${icon("download",14)} 导出</button>`)}
      <main class="se-layout">
        <aside class="se-left">
          <div class="se-list-head"><span>分镜列表 · 上下查看分镜顺序与节奏</span><button data-action="edit-storyboard">${icon("edit",12)} 编辑</button></div>
          <div class="se-story-scroll">
            ${editorStoryboard.map((clip,i)=>`<article class="${classNames("se-card",state.smartEdit.activeClip===i&&"is-active")}" data-clip-index="${i}">
              <div class="se-card-thumb">
                ${renderPreviewVideo(getPreviewVideo(i),"media-preview-video",state.smartEdit.activeClip===i)}
                <span class="se-card-play">${icon("play",14)}</span>
                <span class="se-card-time">${clip.time}</span>
              </div>
              <div class="se-card-main">
                <div class="se-card-topline">
                  <div class="se-card-badge" style="background:${categoryColors[clip.category]||'#666'}">${clip.title}</div>
                  <span class="se-card-index">分镜 ${String(i+1).padStart(2,"0")}</span>
                </div>
                <p class="se-card-copy">${clip.copy}</p>
              </div>
            </article>`).join("")}
          </div>
          <div class="se-left-actions">
            <button class="btn btn--light btn--wide se-left-btn" data-action="storyboard-add">${icon("plus",12)} 增加分镜</button>
            <button class="btn btn--wide-outline se-left-btn se-left-btn--danger" data-action="storyboard-remove">${icon("trash",12)} 删除分镜</button>
          </div>
        </aside>

        <section class="se-center">
          <div class="se-preview-box">
            <div class="se-preview-head">
              <div>
                <span class="workspace-kicker">实时预览</span>
                <h2>${ac.title} 分镜预览</h2>
                <p>左侧按分镜顺序逐段查看，右侧调整素材、文案和转场，中间提供更大的实时预览舞台。</p>
              </div>
              <div class="se-preview-badges">
                <span>${icon("layers",12)} 分镜 ${state.smartEdit.activeClip+1}/${editorStoryboard.length}</span>
                <span>${icon("sparkles",12)} ${selectedLabel}</span>
                <span>${icon("clock",12)} ${state.smartEdit.duration}s</span>
              </div>
            </div>
            <div class="se-stage-canvas">
              <div class="se-phone">
                <div class="se-phone-notch"></div>
                <div class="se-phone-screen">
                  ${renderPreviewVideo(getPreviewVideo(state.smartEdit.activeClip),"media-preview-video",true)}
                  <div class="se-phone-overlay">
                    <span class="se-phone-play-btn">${icon("play",28)}</span>
                  </div>
                  <div class="se-phone-subtitle">${ac.copy}</div>
                </div>
                <div class="se-phone-bar">
                  <span>${ac.title}</span>
                  <span>分镜 ${state.smartEdit.activeClip+1}/${editorStoryboard.length}</span>
                </div>
              </div>
            </div>
            <div class="se-preview-metrics">
              ${[
                ["当前镜头",ac.title,"video"],
                ["推荐素材",selectedLabel,"sparkles"],
                ["转场策略",state.smartEdit.transition,"layers"],
              ].map(([label,value,ic])=>`<article class="se-metric-card"><span>${icon(ic,14)} ${label}</span><strong>${value}</strong></article>`).join("")}
            </div>
          </div>
        </section>

        <aside class="se-right">
          <div class="se-right-tabs">
            ${rightCats.map(c=>`<button class="${classNames("se-tab",rc===c&&"is-active")}" data-right-cat="${c}">${c}</button>`).join("")}
          </div>
          <section class="se-right-scroll">
            <div class="se-right-intro">
              <span class="workspace-kicker">AI 助手</span>
              <h3>${rc} 调优面板</h3>
              <p>当前片段的素材候选、旁白文案和节奏参数统一在这里完成。</p>
            </div>
            <div class="se-section">
              <h4>${icon("sparkles",12)} ${rc} 素材候选</h4>
              <div class="se-hook-grid">
                ${labels.map((label,i)=>`<button class="${classNames("se-hook-card",state.smartEdit.hookMaterial===i&&"is-active")}" data-hook-index="${i}">
                  <div class="se-hook-thumb">
                    ${renderPreviewVideo(getPreviewVideo(i+2),"media-preview-video",state.smartEdit.hookMaterial===i)}
                    <span class="se-hook-play">${icon("play",12)}</span>
                    ${i===0?`<span class="se-hook-ai">AI推荐</span>`:""}
                  </div>
                  <span class="se-hook-label">${label}</span>
                </button>`).join("")}
              </div>
            </div>
            <div class="se-section">
              <h4>${icon("mic",12)} 旁白文案</h4>
              <textarea class="se-copy-box" data-field="smartEditVoiceCopy">${escapeHtml(state.smartEdit.voiceCopy)}</textarea>
            </div>
            <div class="se-section">
              <div class="se-range-head"><h4>片段时长</h4><strong>${state.smartEdit.duration}s</strong></div>
              <input class="range-input" data-field="smartEditDuration" type="range" min="1" max="8" value="${state.smartEdit.duration}" />
            </div>
            <div class="se-section">
              <h4>转场效果</h4>
              <div class="se-trans-row">${["淡入淡出","左滑","缩放","闪白","无"].map(it=>`<button class="${classNames("se-trans-chip",state.smartEdit.transition===it&&"is-active")}" data-transition="${it}">${it}</button>`).join("")}</div>
            </div>
          </section>
        </aside>
      </main>

      <section class="se-timeline">
        <div class="se-player-bar">
          <div class="se-player-left">
            <button class="se-ctrl-btn">${icon("pause",14)}</button>
            <button class="se-ctrl-btn se-ctrl-play">${icon("play",16)}</button>
            <button class="se-ctrl-btn">${icon("chevronRight",14)}</button>
          </div>
          <div class="se-player-time">00:00 / 00:29</div>
          <div class="se-player-right">
            <button class="se-action-btn">${icon("refresh",12)} 撤销</button>
            <button class="se-action-btn">重做</button>
            <button class="se-action-btn se-action-save">${icon("check",12)} 保存</button>
            <button class="btn btn--dark se-action-primary" data-route="timeline-editor">${icon("edit",12)} 编辑视频</button>
          </div>
        </div>
        <div class="se-tracks">
          <div class="se-track-row">
            <div class="se-track-label">${icon("video",12)} 视频</div>
            <div class="se-track-blocks">
              ${editorStoryboard.map((clip,i)=>`<div class="se-track-block" style="flex:${parseInt(clip.time)};background:${clipGradients[i%clipGradients.length]}" data-clip-index="${i}">
                <span class="se-block-title">${clip.title}</span>
                <span class="se-block-time">${clip.time}</span>
              </div>`).join("")}
            </div>
          </div>
          <div class="se-track-row">
            <div class="se-track-label">${icon("mic",12)} 文案</div>
            <div class="se-track-blocks">
              ${editorStoryboard.map((clip,i)=>`<div class="se-track-block se-track-block--text" style="flex:${parseInt(clip.time)}" data-clip-index="${i}">
                <span class="se-block-copy">${clip.copy.slice(0,12)}${clip.copy.length>12?"...":""}</span>
                <span class="se-block-time">${clip.time}</span>
              </div>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
      </section>
    </div>`;
}

/* ── Timeline Editor Page ── */
function renderSmartEditPage(){
  const storyboardClips = editorStoryboard.map((clip, index) => (
    index === state.smartEdit.activeClip
      ? {
          ...clip,
          copy: state.smartEdit.voiceCopy || clip.copy,
          time: `${Math.min(15, Math.max(1, Number(state.smartEdit.duration) || Number.parseInt(clip.time, 10) || 3))}s`,
        }
      : clip
  ));
  const ac = storyboardClips[state.smartEdit.activeClip];
  const rightCats = ["Hook","卖点","CTA","口碑","自定义"];
  const ratioOptions = ["16:9","9:16","1:1","4:5"];
  const rc = state.smartEdit.rightCategory;
  const rightCatNames = { Hook:"钩子", 卖点:"卖点", CTA:"转化", 口碑:"口碑", 自定义:"自定义" };
  const candidateLabels = {
    Hook:["开场特写","悬念提问","痛点切入","趣味反转"],
    卖点:["成分展示","功效对比","使用场景","数据背书"],
    CTA:["限时优惠","链接引导","评论互动","关注引导"],
    口碑:["用户评价","回购反馈","KOL推荐","销量展示"],
    自定义:["自定义 1","自定义 2","自定义 3","自定义 4"],
  };
  const labels = candidateLabels[rc] || candidateLabels.Hook;
  const selectedLabel = labels[state.smartEdit.hookMaterial] || labels[0];
  const clipGradients = [
    "linear-gradient(135deg,#c9c2d7 0%,#a99fb9 100%)",
    "linear-gradient(135deg,#c9c2d7 0%,#a99fb9 100%)",
    "linear-gradient(135deg,#c9c2d7 0%,#a99fb9 100%)",
    "linear-gradient(135deg,#c9c2d7 0%,#a99fb9 100%)",
    "linear-gradient(135deg,#c9c2d7 0%,#a99fb9 100%)",
  ];
  const pixelsPerSecond = Math.round(52 * state.smartEdit.timelineZoom);
  const timelineSegments = [];
  let running = 0;
  storyboardClips.forEach((clip, index) => {
    const duration = Math.max(1, Number.parseInt(clip.time, 10) || 0);
    timelineSegments.push({
      ...clip,
      duration,
      index,
      start: running,
      end: running + duration,
      width: duration * pixelsPerSecond,
      gradient: clipGradients[index % clipGradients.length],
    });
    running += duration;
  });
  const totalDuration = Math.max(1, running);
  const timelineWidth = Math.max(totalDuration * pixelsPerSecond, 960);
  const activeStart = timelineSegments[state.smartEdit.activeClip]?.start || 0;
  const majorTickEvery = state.smartEdit.timelineZoom >= 1.6 ? 1 : state.smartEdit.timelineZoom >= 1.15 ? 2 : state.smartEdit.timelineZoom >= 0.85 ? 5 : 10;
  const tickMarks = Array.from({ length: totalDuration + 1 }, (_, second) => ({
    second,
    left: second * pixelsPerSecond,
    major: second === 0 || second === totalDuration || second % majorTickEvery === 0,
  }));
  const zoomPercent = Math.round(state.smartEdit.timelineZoom * 100);
  const formatTime = seconds => {
    const safe = Math.max(0, Math.round(seconds));
    return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2,"0")}`;
  };
  const headerMeta = getWorkspaceHeaderMeta("smart-edit");

  return `
    <div class="workspace-shell workspace-shell--editor">
      <header class="se-topbar">
        <div class="se-topbar-left">
          ${renderSubpageBackButton(getBackRoute("smart-edit"))}
          ${brandButton("dashboard-home","workspace-brand",true)}
          <div class="workspace-breadcrumb">
            <div class="workspace-breadcrumb-path">
              <span>MagicMix Studio</span>
              <i>${icon("chevronRight",14)}</i>
              <strong>${headerMeta.title}</strong>
            </div>
            <p>${headerMeta.subtitle}</p>
          </div>
        </div>
        <div class="se-topbar-actions">
          <div class="se-ratio-switch" aria-label="视频比例切换">
            ${ratioOptions.map(ratio=>`<button class="${classNames("se-ratio-btn",state.smartEdit.ratio===ratio&&"is-active")}" data-smart-edit-ratio="${ratio}">${ratio}</button>`).join("")}
          </div>
          <button class="btn btn--ghost btn--small" data-action="smart-edit-preview">${icon("eye",14)} 预览</button>
          <button class="btn btn--dark btn--small" data-action="smart-edit-export">${icon("download",14)} 导出</button>
        </div>
      </header>

      <main class="se-layout">
        <aside class="se-left">
          <div class="se-list-head">
            <strong>分镜列表 · ${editorStoryboard.length} 个片段</strong>
            <button data-action="edit-storyboard">${icon("edit",12)} 编辑</button>
          </div>
          <div class="se-story-scroll">
            <div class="se-story-grid">
              ${storyboardClips.map((clip,i)=>`<article class="${classNames("se-card",state.smartEdit.activeClip===i&&"is-active")}" data-clip-index="${i}">
                <div class="se-card-topline">
                  <span class="se-card-index">分镜 ${i+1}</span>
                  <span class="se-card-tag">${clip.title}</span>
                </div>
                <div class="se-card-thumb">
                  ${renderPreviewVideo(getPreviewVideo(i),"media-preview-video",state.smartEdit.activeClip===i)}
                  <span class="se-card-play">${icon("play",14)}</span>
                </div>
                <p class="se-card-copy">${clip.copy}</p>
                <span class="se-card-time">${clip.time}</span>
              </article>`).join("")}
            </div>
          </div>
          <div class="se-left-actions">
            <button class="btn btn--light btn--wide se-left-btn" data-action="storyboard-add">${icon("plus",12)} 增加分镜</button>
            <button class="btn btn--wide-outline se-left-btn se-left-btn--danger" data-action="storyboard-remove">${icon("trash",12)} 删除分镜</button>
          </div>
        </aside>

        <section class="se-center">
          <div class="se-preview-box">
            <div class="se-stage-canvas">
              <div class="se-phone" data-preview-ratio="${state.smartEdit.ratio}">
                <div class="se-stage-ratio">${state.smartEdit.ratio}</div>
                <div class="se-phone-screen" style="aspect-ratio:${state.smartEdit.ratio.replace(':',' / ')};">
                  ${renderPreviewVideo(getPreviewVideo(state.smartEdit.activeClip),"media-preview-video",true)}
                  <div class="se-phone-overlay">
                    <span class="se-phone-play-btn">${icon("play",30)}</span>
                  </div>
                  <div class="se-phone-subtitle">${ac.copy}</div>
                </div>
                <div class="se-phone-bar">
                  <span>${ac.title}</span>
                  <span>${selectedLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside class="se-right">
          <div class="se-right-head">
            <h2>${rc}·${rightCatNames[rc] || rc}</h2>
            <div class="se-right-tabs">
              ${rightCats.map(c=>`<button class="${classNames("se-tab",rc===c&&"is-active")}" data-right-cat="${c}">${c}</button>`).join("")}
            </div>
          </div>
          <section class="se-right-scroll">
            <div class="se-section">
              <h4>AI 推荐替换素材</h4>
              <div class="se-hook-grid">
                ${labels.map((label,i)=>`<button class="${classNames("se-hook-card",state.smartEdit.hookMaterial===i&&"is-active")}" data-hook-index="${i}">
                  <div class="se-hook-thumb">
                    ${renderPreviewVideo(getPreviewVideo(i+2),"media-preview-video",state.smartEdit.hookMaterial===i)}
                    <span class="se-hook-play">${icon("play",12)}</span>
                  </div>
                  <span class="se-hook-label">${label}</span>
                </button>`).join("")}
              </div>
            </div>
            <div class="se-section">
              <h4>旁白文案</h4>
              <textarea class="se-copy-box" data-field="smartEditVoiceCopy">${escapeHtml(state.smartEdit.voiceCopy)}</textarea>
            </div>
            <div class="se-section">
              <div class="se-range-head"><h4>片段时长</h4><strong>${state.smartEdit.duration}s</strong></div>
              <input class="range-input" data-field="smartEditDuration" type="range" min="1" max="15" value="${state.smartEdit.duration}" />
            </div>
            <div class="se-section">
              <h4>转场效果</h4>
              <div class="se-trans-row">${["淡入淡出","左滑","缩放","闪白","无"].map(it=>`<button class="${classNames("se-trans-chip",state.smartEdit.transition===it&&"is-active")}" data-transition="${it}">${it}</button>`).join("")}</div>
            </div>
          </section>
        </aside>
      </main>

      <section class="se-timeline">
        <div class="se-player-bar">
          <div class="se-player-left">
            <button class="se-ctrl-btn">${icon("pause",14)}</button>
            <button class="se-ctrl-btn se-ctrl-play">${icon("play",16)}</button>
            <button class="se-ctrl-btn">${icon("chevronRight",14)}</button>
          </div>
          <div class="se-player-time">${formatTime(activeStart)} / ${formatTime(totalDuration)}</div>
          <div class="se-player-right">
            <div class="se-zoom-controls" aria-label="Timeline zoom">
              <button class="se-zoom-btn" data-action="smart-edit-zoom-out">-</button>
              <input class="se-zoom-range" data-field="smartEditTimelineZoom" type="range" min="60" max="200" step="10" value="${zoomPercent}" />
              <button class="se-zoom-btn" data-action="smart-edit-zoom-in">+</button>
              <button class="se-zoom-value" data-action="smart-edit-zoom-reset">${zoomPercent}%</button>
            </div>
            <button class="se-action-btn" data-action="smart-edit-undo">${icon("refresh",12)} 撤销</button>
            <button class="se-action-btn" data-action="smart-edit-redo">重做</button>
            <button class="se-action-btn se-action-save" data-action="smart-edit-save">${icon("check",12)} 保存</button>
            <button class="btn btn--dark se-action-primary" data-route="timeline-editor">${icon("edit",12)} 编辑视频</button>
          </div>
        </div>
        <div class="se-timeline-body">
          <div class="se-timeline-side">
            <div class="se-timeline-side-spacer">Timeline</div>
            <div class="se-track-label">${icon("video",12)} Video</div>
            <div class="se-track-label">${icon("mic",12)} Copy</div>
            <div class="se-track-label">${icon("video",12)} 瑙嗛</div>
            <div class="se-track-label">${icon("mic",12)} 鏂囨</div>
          </div>
          <div class="se-timeline-scroll">
            <div class="se-timeline-scroll-inner" style="width:${timelineWidth}px">
              <div class="se-timeline-ruler">
                ${tickMarks.map(tick=>`<span class="${classNames("se-timeline-tick",tick.major&&"is-major")}" style="left:${tick.left}px">
                  <i></i>
                  ${tick.major ? `<strong>${formatTime(tick.second)}</strong>` : ""}
                </span>`).join("")}
                <span class="se-playhead" style="left:${activeStart * pixelsPerSecond}px"></span>
              </div>
          <div class="se-track-row">
            <div class="se-track-label">${icon("video",12)} 视频</div>
            <div class="se-track-blocks">
              ${timelineSegments.map(clip=>`<button class="${classNames("se-track-block",state.smartEdit.activeClip===clip.index&&"is-active")}" style="width:${clip.width}px;background:${clip.gradient}" data-clip-index="${clip.index}">
                <span class="se-block-title">${clip.title}</span>
                <span class="se-block-time">${clip.time}</span>
              </button>`).join("")}
            </div>
          </div>
          <div class="se-track-row">
            <div class="se-track-label">${icon("mic",12)} 文案</div>
            <div class="se-track-blocks">
              ${timelineSegments.map(clip=>`<button class="${classNames("se-track-block","se-track-block--text",state.smartEdit.activeClip===clip.index&&"is-active")}" style="width:${clip.width}px" data-clip-index="${clip.index}">
                <span class="se-block-copy">${clip.copy.slice(0,18)}${clip.copy.length>18?"...":""}</span>
                <span class="se-block-time">${clip.time}</span>
              </button>`).join("")}
            </div>
          </div>
        </div>
      </section>
    </div>`;
}

function renderTimelineEditorPage(){
  const cl = timelineLibraries[state.timelineEditor.library];
  const toolIcons = { "素材库":"folder","脚本":"wand","音乐":"music","文字":"type","转场":"layers" };
  const mediaGradients = [
    "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",
    "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
    "linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)"
  ];
  const clipGradients = [
    "linear-gradient(135deg,#a855f7 0%,#6366f1 100%)",
    "linear-gradient(135deg,#ec4899 0%,#f43f5e 100%)",
    "linear-gradient(135deg,#10b981 0%,#06b6d4 100%)",
    "linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)",
    "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)"
  ];
  const recGradients = [
    "linear-gradient(135deg,#fbc2eb 0%,#a6c1ee 100%)",
    "linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)",
    "linear-gradient(135deg,#fad0c4 0%,#ffd1ff 100%)",
    "linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)",
    "linear-gradient(135deg,#cfd9df 0%,#e2ebf0 100%)"
  ];
  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader(`<button class="btn btn--ghost" data-route="smart-edit">${icon("chevronRight",14)} 返回剪辑</button><button class="btn btn--dark">${icon("check",14)} 保存</button>`)}
      <main class="te-layout">
        <aside class="te-sidebar">
          <div class="te-tool-tabs">
            ${["素材库","脚本","音乐","文字","转场"].map(it=>`<button class="${classNames("te-tool-btn",state.timelineEditor.library===it&&"is-active")}" data-tool-library="${it}">${icon(toolIcons[it],14)}<span>${it}</span></button>`).join("")}
          </div>
          <div class="te-media-list">
            ${cl.map((it,i)=>`<article class="te-media-item" data-action="insert-media">
              <div class="te-media-thumb">
                ${renderPreviewVideo(getPreviewVideo(i+1),"media-preview-video",false)}
                <span class="te-media-play">${icon("play",14)}</span>
              </div>
              <div class="te-media-info">
                <strong>${it.title}</strong>
                <span>${it.duration}</span>
              </div>
            </article>`).join("")}
          </div>
        </aside>

        <section class="te-center">
          <div class="te-preview-wrap">
            <div class="te-phone">
              <div class="te-phone-notch"></div>
              <div class="te-phone-screen">
                ${renderPreviewVideo(getPreviewVideo(state.timelineEditor.recommendation),"media-preview-video",true)}
                <div class="te-phone-overlay">
                  <span class="te-phone-play">${icon("play",28)}</span>
                </div>
              </div>
              <div class="te-phone-controls">
                <button class="se-ctrl-btn">${icon("pause",14)}</button>
                <button class="se-ctrl-btn se-ctrl-play">${icon("play",16)}</button>
                <button class="se-ctrl-btn">${icon("chevronRight",14)}</button>
              </div>
            </div>
          </div>
        </section>

        <aside class="te-right">
          <div class="te-right-header"><h3>${icon("star",14)} Top-5 备选素材</h3></div>
          <div class="te-rec-scroll">
            ${Array.from({length:5},(_,i)=>`<button class="${classNames("te-rec-card",state.timelineEditor.recommendation===i&&"is-active")}" data-recommend-index="${i}">
              <div class="te-rec-thumb">
                ${renderPreviewVideo(getPreviewVideo(i+3),"media-preview-video",state.timelineEditor.recommendation===i)}
                <span class="te-rec-play">${icon("play",12)}</span>
              </div>
              <div class="te-rec-info">
                <strong>替代素材 ${i+1}</strong>
                <span style="color:${(95-i*4)>=90?'#10b981':'#f59e0b'}">匹配度 ${95-i*4}%</span>
                <p>语义标签匹配 · 色彩优化</p>
              </div>
            </button>`).join("")}
          </div>
          <div class="te-right-actions">
            <button class="btn btn--light" style="flex:1;min-height:36px;font-size:12px">${icon("mic",14)} 更换配音</button>
            <button class="btn btn--light" style="flex:1;min-height:36px;font-size:12px">${icon("music",14)} 更换BGM</button>
          </div>
        </aside>
      </main>

      <section class="te-toolbar-bar">
        <div class="te-bar-left">
          <button class="se-action-btn">${icon("scissors",12)} 剪辑</button>
          <button class="se-action-btn danger-text">${icon("trash",12)} 删除</button>
          <button class="se-action-btn">${icon("grid",12)} 比例</button>
          <button class="se-action-btn">${icon("copy",12)} 复制</button>
        </div>
        <div class="te-bar-right">
          <span style="font-size:12px;color:#8b7da0">缩放</span>
          <input class="range-input" style="width:140px" data-field="timelineZoom" type="range" min="1" max="100" value="${state.timelineEditor.zoom}" />
        </div>
      </section>

      <section class="te-tracks">
        <div class="te-track-header">${icon("layers",14)} 时间线轨道</div>
        <div class="se-track-row">
          <div class="se-track-label">${icon("video",12)} 视频</div>
          <div class="se-track-blocks">
            ${editorStoryboard.map((clip,i)=>`<div class="se-track-block" style="flex:${parseInt(clip.time)};background:${clipGradients[i%clipGradients.length]}">
              <span class="se-block-title">${clip.title}</span>
              <span class="se-block-time">${clip.time}</span>
            </div>`).join("")}
          </div>
        </div>
        <div class="se-track-row">
          <div class="se-track-label">${icon("mic",12)} 文案</div>
          <div class="se-track-blocks">
            ${editorStoryboard.map((clip,i)=>`<div class="se-track-block se-track-block--text" style="flex:${parseInt(clip.time)}">
              <span class="se-block-copy">${clip.copy.slice(0,10)}...</span>
              <span class="se-block-time">${clip.time}</span>
            </div>`).join("")}
          </div>
        </div>
        <div class="se-track-row">
          <div class="se-track-label">${icon("music",12)} BGM</div>
          <div class="se-track-blocks">
            <div class="se-track-block se-track-block--bgm" style="flex:1">
              <span class="se-block-title">轻快流行BGM</span>
              <span class="se-block-time">全曲</span>
            </div>
          </div>
        </div>
      </section>
    </div>`;
}

/* ── Asset Library Page ── */
function renderAssetLibraryPage(){
  const items = filteredAssetItems();
  let body = "";
  if(state.assets.tab==="我的视频"){
    body=`<div class="asset-video-grid">${items.map((it,i)=>`<article class="asset-video-card" data-route="smart-edit"><div class="asset-video-thumb">${renderPreviewVideo(getPreviewVideo(i),"media-preview-video",i<2)}<span class="dashboard-play">${icon("play",18)}</span><span class="asset-video-meta-right">0:28</span></div><div class="asset-video-content"><h3>${it.title}</h3><div class="asset-video-foot"><span>${it.date}</span><strong>${it.status}</strong></div></div></article>`).join("")}</div>`;
  } else if(state.assets.tab==="素材库"){
    body=`<div class="asset-material-grid">${items.map(it=>`<article class="material-card"><div class="material-thumb">${icon("image",24)}</div><h3>${it.title}</h3><p>${it.category}</p><small>${it.meta}</small></article>`).join("")}</div>`;
  } else if(state.assets.tab==="脚本库"){
    body=`<div class="script-library-board">${items.map(it=>`<article class="script-library-card" data-route="ai-copy" data-generated="true"><div class="script-library-thumb">${icon("wand",24)}</div><div class="script-library-footer">${it.name}</div></article>`).join("")}<button class="script-library-add" data-action="asset-create"><span>${icon("plus",20)}</span></button></div>`;
  } else {
    body=`<div class="favorite-grid">${items.map(it=>`<article class="favorite-card"><div class="favorite-badge">${icon("bookmark",12)} ${it.type}</div><h3>${it.title}</h3></article>`).join("")}</div>`;
  }
  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader({
        actions:`<div class="page-head-actions"><input class="page-search-input" data-field="assetSearch" type="text" placeholder="搜索资产..." value="${escapeHtml(state.assets.search)}" /><button class="btn btn--light" data-action="asset-create">${icon("plus",14)} 新建</button><button class="btn btn--light" data-action="asset-sort">${icon("sort",14)} ${state.assets.sort}</button></div>`,
      })}
      <main class="workspace-page">
        <div class="page-tab-row">${["我的视频","素材库","脚本库","收藏"].map(t=>`<button class="${classNames("page-tab",state.assets.tab===t&&"is-active")}" data-asset-tab="${t}">${t}</button>`).join("")}</div>
        <section class="asset-stage">${body}</section>
      </main>
    </div>`;
}

/* ── Upload Page ── */
function renderUploadPage(){
  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader()}
      <main class="workspace-page">
        <section class="upload-stage">
          <button class="upload-dropzone" data-action="upload-demo"><span class="upload-placeholder-icon">${icon("upload",32)}</span><h3>拖拽文件到此处或点击上传</h3><p>支持 MP4 / MOV / JPG / PNG · 单文件≤500MB · 最多20个文件</p><small>上传后 AI 自动进行处理入库</small></button>
          <div class="upload-list-panel"><h2>已上传 · ${state.upload.items.length} 个文件</h2>
            <div class="upload-list">${state.upload.items.map(it=>`<article class="upload-item"><div class="upload-item-left"><span class="upload-file-icon">${icon("video",16)}</span><div><h3>${it.name}</h3><p>${it.size} · ${it.status}</p></div></div><div class="upload-item-right"><div class="upload-tags">${it.tags.map(t=>`<span>${t}</span>`).join("")}</div><strong style="color:#10b981">${icon("check",16)}</strong></div></article>`).join("")}</div>
          </div>
        </section>
      </main>
    </div>`;
}

/* ── Distribution Page ── */
function renderDistributionPage(){
  const platformIcons = { "抖音":"video","快手":"zap","小红书":"bookmark","视频号":"play","TikTok":"globe" };
  const connectedAccounts = state.distribution.accounts.filter(a=>a.connected);
  const avgOriginality = Math.round(state.distribution.queue.reduce((sum,item)=>sum+item.originality,0) / Math.max(state.distribution.queue.length,1));
  const publishMetrics = [
    { label:"待发布视频", value:`${state.distribution.queue.length} 条`, sub:`其中 ${state.distribution.queue.filter(item=>item.originality>=95).length} 条可直接发布`, icon:"send" },
    { label:"平均原创度", value:`${avgOriginality}%`, sub:"低于 88% 的版本建议继续微调", icon:"star" },
    { label:"推荐发布时间", value:"18:00-21:00", sub:"今晚是近 7 日高峰时段", icon:"clock" },
    { label:"矩阵覆盖账号", value:`${connectedAccounts.reduce((sum,item)=>sum+parseInt(item.status||"0",10)||sum,0) || connectedAccounts.length} 个`, sub:`当前启用 ${connectedAccounts.length} 个平台`, icon:"globe" },
  ];
  const suggestedAccounts = [
    "抖音-养生主号 01",
    "小红书-种草矩阵 02",
    "快手-转化号 01",
    "视频号-门店团购号",
  ];
  const publishRows = state.distribution.queue.map((item,index)=>({
    name:item.title,
    score:`${94-index}%`,
    originality:`原创度 ${item.originality}%`,
    account:suggestedAccounts[index%suggestedAccounts.length],
    time:item.schedule,
    status:item.originality >= 95 ? "可发布" : "需复核",
  }));
  const channelSuggestions = [
    { name:"抖音主矩阵", tag:"优先发布", desc:"保留高质量场景种草版，优先投放 18:30-20:30，高原创版本优先挂车。" },
    { name:"小红书种草号", tag:"标题改写", desc:"弱化促销词，强调体验感和场景感，封面保留商品近景和生活化字幕。" },
    { name:"快手转化号", tag:"强 CTA", desc:"前 3 秒保留价格权益，标题和字幕更直接，适合承接活动促销版本。" },
  ];
  const publishParams = [
    { label:"标题策略", value:"强促销 / 场景种草 / 信任背书" },
    { label:"话题池", value:"#养生茶 #办公室养生 #气色提升" },
    { label:"封面差异化", value:"每个账号至少准备 2 套封面" },
    { label:"风险提醒", value:"避免完全一致标题、字幕和结尾 CTA" },
  ];
  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader({
        actions:`<button class="btn btn--ghost" data-route="smart-video">${icon("chevronRight",14)} 回到成片</button><button class="btn btn--dark">${icon("send",14)} 批量发布</button>`,
      })}
      <main class="workspace-page distribution-page">
        <section class="distribution-metric-grid">
          ${publishMetrics.map(card=>`<article class="analytics-stat-card distribution-metric-card"><span>${icon(card.icon,14)} ${card.label}</span><strong>${card.value}</strong><small>${card.sub}</small></article>`).join("")}
        </section>

        <section class="distribution-main-grid">
          <section class="workspace-block distribution-queue-panel">
            <div class="workspace-block-head">
              <div>
                <h2>${icon("clock",16)} 待发布版本</h2>
                <p>优先把高原创、高评分的视频推进发布队列，再根据账号差异化调整标题与封面。</p>
              </div>
              <div class="workspace-block-actions">
                <button class="btn btn--ghost" data-action="distribution-add-task">${icon("plus",12)} 新增任务</button>
                <span class="distribution-badge distribution-badge--success">${icon("check",12)} 投前检查已完成</span>
              </div>
            </div>
            <div class="distribution-version-list">
              ${publishRows.map((row,index)=>`<article class="distribution-version-row">
                <div>
                  <strong>${row.name}</strong>
                  <small>综合评分 ${row.score}</small>
                </div>
                <span>${row.originality}</span>
                <span>${row.account}</span>
                <span>${row.time}</span>
                <span class="${classNames("distribution-badge",row.status==="可发布"?"distribution-badge--success":"distribution-badge--warning")}">${row.status}</span>
                <button class="btn btn--ghost" data-action="edit-distribution-task" data-task-index="${index}">编辑</button>
              </article>`).join("")}
            </div>
          </section>

          <section class="workspace-block distribution-channel-panel">
            <div class="workspace-block-head">
              <div>
                <h2>${icon("globe",16)} 账号矩阵与发布建议</h2>
                <p>按平台分配不同版本与发布时间，降低同质化风险并提升矩阵整体通过率。</p>
              </div>
            </div>
            <div class="distribution-channel-list">
              ${channelSuggestions.map(item=>`<article class="distribution-channel-card">
                <div class="distribution-channel-head">
                  <strong>${item.name}</strong>
                  <span class="distribution-badge">${item.tag}</span>
                </div>
                <p>${item.desc}</p>
              </article>`).join("")}
            </div>
            <div class="distribution-note">
              <strong>${icon("sparkles",14)} 差异化发布策略</strong>
              <p>主账号保留高质量场景种草版，裂变账号改标题、改封面、改前 3 秒钩子，避免同质化重复发布。</p>
            </div>
            <div class="distribution-account-list">
              ${state.distribution.accounts.map((a,i)=>`<button class="distribution-account-item" data-account-index="${i}">
                <div>
                  <strong>${icon(platformIcons[a.platform]||"globe",14)} ${a.platform}</strong>
                  <small>${a.connected?"已连接":"待授权"} · ${a.status}</small>
                </div>
                <span class="${classNames("distribution-badge",a.connected?"distribution-badge--success":"distribution-badge--warning")}">${a.connected?"健康":"待接入"}</span>
              </button>`).join("")}
            </div>
          </section>
        </section>

        <section class="workspace-block distribution-param-block">
          <div class="workspace-block-head">
            <div>
              <h2>${icon("settings",16)} 发布参数</h2>
              <p>把标题、话题、封面和风控原则压缩成一套统一规则，方便矩阵账号快速复制执行。</p>
            </div>
          </div>
          <div class="distribution-param-grid">
            ${publishParams.map(item=>`<article class="distribution-param-card"><span>${item.label}</span><strong>${item.value}</strong></article>`).join("")}
          </div>
        </section>
      </main>
    </div>`;
}

/* ── Analytics Page ── */
function renderAnalyticsPage(){
  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader()}
      <main class="workspace-page">
        <section class="analytics-stat-grid">
          ${[["本月生成视频","342","+28%","video"],["已发布","186","+15%","send"],["总播放量","12.8万","+42%","eye"],["平均完播率","68%","-3%","clock"],["前3秒完播率","85%","+5%","zap"]].map(([l,v,d,ic])=>`<article class="analytics-stat-card"><span>${icon(ic,14)} ${l}</span><strong>${v}</strong><small>${d}</small></article>`).join("")}
        </section>

        <section class="analytics-panel analytics-panel--trend"><h2>${icon("trendingUp",16)} 近30天生成趋势</h2><div class="trend-chart">${analyticsTrend.map(v=>`<span style="height:${v*6}px"></span>`).join("")}</div></section>

        <section class="workspace-block" style="margin-bottom:16px">
          <h2>${icon("star",16)} 爆款视频 TOP 3</h2>
          <div style="margin-top:12px">
            ${topPerformingVideos.map((v,i)=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:#ffffff;border:1px solid rgba(168,85,247,0.08);border-radius:8px;margin-bottom:8px">
              <div style="display:flex;align-items:center;gap:12px"><span style="color:${i===0?'#f59e0b':i===1?'#94a3b8':'#b87333'};font-weight:700;font-size:16px">#${i+1}</span><strong>${v.title}</strong></div>
              <div style="display:flex;align-items:center;gap:16px;font-size:12px">
                <span>${icon("eye",12)} ${v.plays}</span><span>${icon("clock",12)} 完播 ${v.completion}</span><span>${icon("zap",12)} 前3秒 ${v.first3s}</span><span>${icon("target",12)} 转化 ${v.conversion}</span>
                <button class="btn btn--ghost" data-action="replicate-video" style="font-size:11px;padding:4px 10px">${icon("copy",12)} 一键复刻</button>
              </div>
            </div>`).join("")}
          </div>
        </section>

        <section class="workspace-block" style="margin-bottom:16px">
          <h2>${icon("sparkles",16)} Hook 效果排行</h2>
          <div style="margin-top:12px">
            ${hookRanking.map(h=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:#ffffff;border:1px solid rgba(168,85,247,0.08);border-radius:8px;margin-bottom:6px">
              <div style="display:flex;align-items:center;gap:10px"><span style="color:#a855f7;font-weight:700">#${h.rank}</span><span style="font-size:13px">${h.text}</span></div>
              <span style="font-size:12px;color:#10b981">${icon("zap",12)} 前3秒完播 ${h.rate}</span>
            </div>`).join("")}
          </div>
        </section>

        <div class="analytics-bottom-grid">
          <section class="analytics-panel"><h2>${icon("globe",16)} 平台投放效果对比</h2>
            <div class="analytics-table">
              <div class="analytics-table-row analytics-table-row--head"><span>平台</span><span>发布数</span><span>播放量</span><span>互动率</span><span>转化率</span></div>
              ${[["抖音","78","6.2万","7.8%","3.1%"],["小红书","42","2.9万","9.4%","4.2%"],["快手","35","2.1万","6.5%","2.8%"],["视频号","31","1.5万","4.1%","1.9%"]].map(r=>`<div class="analytics-table-row">${r.map(c=>`<span>${c}</span>`).join("")}</div>`).join("")}
            </div>
          </section>
          <section class="analytics-panel"><h2>${icon("chart",16)} 视频质量分布</h2>
            <div class="quality-bars">${analyticsQuality.map(it=>`<div class="quality-row"><span>${it.label}</span><div class="quality-bar"><i style="width:${it.value}%"></i></div><strong>${it.value}%</strong></div>`).join("")}</div>
          </section>
        </div>
      </main>
    </div>`;
}

/* ── Product Config Page (NEW) ── */
function renderProductConfigPage(){
  const audienceOptions = ["年轻女性","宝妈","学生","上班族","中老年"];
  const pc = state.productConfig;
  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader()}
      <main class="workspace-two-column">
        <aside class="workspace-sidebar-panel workspace-sidebar-panel--form">
          <div class="workspace-form-grid">
            ${renderFieldBlock({
              iconName:"tag",
              label:"商品名称",
              control:`<input class="page-search-input" data-field="productName" value="${escapeHtml(pc.name)}" placeholder="输入商品名称" />`,
              hint:"用于脚本命名、封面标题和核心卖点归纳。",
            })}
            ${renderFieldBlock({
              iconName:"star",
              label:"价格",
              control:`<input class="page-search-input" data-field="productPrice" value="${escapeHtml(pc.price)}" placeholder="¥0.00" />`,
              hint:"用于构建价格锚点和促销表达。",
            })}
          </div>

          ${renderFieldBlock({
            iconName:"zap",
            label:"核心卖点",
            control:`<div class="workspace-textarea-box"><textarea data-field="productSellingPoints" placeholder="每行一个卖点...">${escapeHtml(pc.sellingPoints)}</textarea></div>`,
            hint:"建议拆成成分、功效、使用场景和差异化四类。",
          })}
          ${renderFieldBlock({
            iconName:"fire",
            label:"促销信息",
            control:`<input class="page-search-input" data-field="productPromotion" value="${escapeHtml(pc.promotion)}" placeholder="如：买二送一、限时折扣" />`,
            hint:"用于生成 CTA 和限时转化话术。",
          })}
          <div class="workspace-field">
            <span class="workspace-field-label">${icon("user",12)} 目标人群</span>
            <div class="selector-row selector-row--wrap">${audienceOptions.map(a=>`<button class="${classNames("selector-chip","selector-chip--compact",pc.audiences.includes(a)&&"is-active")}" data-audience="${a}">${a}</button>`).join("")}</div>
            <small class="workspace-field-hint">可多选，AI 会结合人群调整语气、钩子和场景表达。</small>
          </div>
          ${renderFieldBlock({
            iconName:"globe",
            label:"使用场景",
            control:`<input class="page-search-input" data-field="productScenarios" value="${escapeHtml(pc.scenarios)}" placeholder="描述产品使用场景" />`,
            hint:"例如办公室、居家、送礼、直播间展示。",
          })}
          ${renderFieldBlock({
            iconName:"search",
            label:"竞品关键词",
            control:`<input class="page-search-input" data-field="productCompetitors" value="${escapeHtml(pc.competitors)}" placeholder="竞品名称，逗号分隔" />`,
            hint:"输入竞品或替代品关键词，便于生成对比型文案。",
          })}
        </aside>

        <section class="workspace-main-panel workspace-main-panel--insight">
          <section class="workspace-block">
            <div class="workspace-block-head">
              <div>
                <span class="workspace-kicker">AI 洞察</span>
                <h2>${icon("sparkles",16)} 商品分析结果</h2>
                <p>卖点提炼、营销钩子和风险词集中展示，可直接编辑后进入脚本工坊。</p>
              </div>
              <button class="btn btn--ghost" data-action="refresh-ai-analysis">${icon("refresh",12)} 换一批</button>
            </div>

            <div class="workspace-insight-section">
              <h3>${icon("zap",12)} AI 提炼卖点</h3>
              <div class="workspace-insight-list workspace-insight-list--violet">
                ${pc.aiSellingPoints.map((p,i)=>`<div class="workspace-insight-item" contenteditable="true" data-editable="aiSellingPoint-${i}">${icon("check",12)} ${p}</div>`).join("")}
              </div>
            </div>

            <div class="workspace-insight-section">
              <h3>${icon("fire",12)} 营销钩子建议</h3>
              <div class="workspace-insight-list workspace-insight-list--amber">
                ${pc.hookSuggestions.map((h,i)=>`<div class="workspace-insight-item" contenteditable="true" data-editable="hookSuggestion-${i}">${icon("sparkles",12)} ${h}</div>`).join("")}
              </div>
            </div>

            <div class="workspace-insight-section">
              <h3>${icon("alertTriangle",12)} 风险词过滤</h3>
              <div class="workspace-insight-list workspace-insight-list--danger">
                ${pc.riskWords.map(w=>`<div class="workspace-insight-item workspace-insight-item--risk">${icon("x",12)} <span class="workspace-risk-text">${w}</span><span class="workspace-risk-tip">建议避免使用</span></div>`).join("")}
              </div>
            </div>

            <button class="btn btn--light btn--wide" data-action="go-ai-copy">${icon("chevronRight",14)} 下一步：生成脚本</button>
          </section>
        </section>
      </main>
    </div>`;
}

/* ── Storyboard Match Page (NEW) ── */
function renderStoryboardMatchPage(){
  const sourceColors = { "原始素材":"#10b981", "AI生成":"#6366f1", "素材库":"#f59e0b" };
  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader()}
      <main style="display:grid;grid-template-columns:1fr 1.2fr 0.8fr;gap:1px;background:rgba(168,85,247,0.04);flex:1;overflow:auto">
        <div style="background:#ffffff;padding:20px;overflow-y:auto">
          <h2 style="font-size:15px;margin-bottom:16px">${icon("wand",16)} 脚本句子</h2>
          ${storyboardMatchData.map((s,i)=>`<div style="padding:12px;background:#ffffff;border:1px solid rgba(168,85,247,0.08);border-radius:8px;margin-bottom:8px;cursor:pointer" data-storyboard-sentence="${i}">
            <div style="font-size:12px;opacity:0.6;color:#8b7da0;margin-bottom:4px">分镜 ${i+1} · ${s.duration}</div>
            <p style="font-size:13px;margin:0;line-height:1.5">${s.text}</p>
          </div>`).join("")}
        </div>

        <div style="background:#ffffff;padding:20px;overflow-y:auto">
          <h2 style="font-size:15px;margin-bottom:16px">${icon("video",16)} 匹配素材</h2>
          ${storyboardMatchData.map((s,i)=>`<div style="padding:12px;background:#ffffff;border:1px solid rgba(168,85,247,0.08);border-radius:8px;margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <strong style="font-size:13px">${s.clip}</strong>
              <span style="font-size:11px;padding:2px 8px;border-radius:4px;background:${sourceColors[s.source]||'#666'}22;color:${sourceColors[s.source]||'#999'}">${s.source}</span>
            </div>
            <div style="height:80px;background:rgba(168,85,247,0.04);border-radius:6px;display:flex;align-items:center;justify-content:center;margin-bottom:8px">${icon("play",24)}</div>
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:12px;opacity:0.6">时长 ${s.duration}</span>
              <div style="display:flex;align-items:center;gap:4px"><span style="font-size:12px;color:${s.confidence>=95?'#10b981':'#f59e0b'}">${icon("check",12)} 匹配度 ${s.confidence}%</span></div>
            </div>
          </div>`).join("")}
        </div>

        <div style="background:#ffffff;padding:20px;overflow-y:auto">
          <h2 style="font-size:15px;margin-bottom:16px">${icon("refresh",16)} 备选素材</h2>
          ${storyboardMatchData.map((s,i)=>`<div style="margin-bottom:16px">
            <div style="font-size:11px;opacity:0.6;color:#8b7da0;margin-bottom:6px">分镜 ${i+1} 备选</div>
            ${s.alts.map(a=>`<div style="padding:8px 12px;background:#ffffff;border:1px solid rgba(168,85,247,0.08);border-radius:6px;margin-bottom:4px;font-size:12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer" data-action="swap-clip"><span>${icon("video",12)} ${a}</span><span style="opacity:0.4">${icon("refresh",12)}</span></div>`).join("")}
          </div>`).join("")}

          <div style="border-top:1px solid rgba(168,85,247,0.08);padding-top:16px;margin-top:16px">
            <h3 style="font-size:13px;margin-bottom:8px">${icon("shield",14)} 去重策略</h3>
            <div style="font-size:12px;opacity:0.6;line-height:1.6">
              ${["频差注入 ±3%","色调随机偏移","变速 0.95x-1.05x","画中画随机布局","片头片尾差异化"].map(s=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">${icon("check",12)} ${s}</div>`).join("")}
            </div>
          </div>
        </div>
      </main>
      <div style="padding:16px 24px;display:flex;justify-content:space-between;align-items:center;background:#ffffff;border-top:1px solid rgba(168,85,247,0.08)">
        <button class="btn btn--ghost" data-route="ai-copy" data-generated="true">${icon("chevronRight",14)} 返回脚本</button>
        <div style="display:flex;gap:8px">
          <button class="btn btn--ghost" data-action="go-voice-settings">${icon("mic",14)} 配音设置</button>
          <button class="btn btn--light" data-action="start-batch-generate">${icon("zap",14)} 开始批量生成</button>
        </div>
      </div>
    </div>`;
}

/* ── Voice Settings Page (NEW) ── */
function renderVoiceSettingsPage(){
  const vs = state.voiceSettings;
  const voiceSamples = ["甜美女声","磁性男声","少年音","御姐音","温柔女声"];
  const emotions = ["热情","温柔","专业","幽默"];
  const bgmGenres = ["流行","古风","电子","轻音乐","嘻哈"];
  const fonts = ["抖音美好体","黑体加粗","楷体","手写风格","霓虹发光"];
  const positions = ["top","center","bottom"];
  const positionLabels = { top:"顶部", center:"居中", bottom:"底部" };
  const subtitleSizeLabels = { small:"小", medium:"中", large:"大" };
  const previewSubtitlePosition = positions.includes(vs.subtitlePosition) ? vs.subtitlePosition : "bottom";
  const voiceSummary = vs.voice || "未选择音色";
  const emotionSummary = vs.emotion || "未选择情绪";
  const bgmSummary = vs.bgmGenre || "未选择 BGM";

  return `
    <div class="workspace-shell workspace-shell--dark">
      ${renderWorkspaceHeader()}
      <main class="workspace-two-column">
        <aside class="workspace-sidebar-panel" style="flex:1.5;overflow-y:auto">
          <section class="workspace-section">
            <h3>${icon("mic",14)} 语音克隆</h3>
            ${renderImportableSelectField({
              iconName:"user",
              label:"配音音色",
              field:"voiceSampleSelect",
              value:vs.activeVoiceSample >= 0 ? String(vs.activeVoiceSample) : (vs.voice || ""),
              placeholder:"请选择配音音色",
              options:voiceSamples.map((_, index) => String(index)),
              labels:Object.fromEntries(voiceSamples.map((item, index) => [String(index), item])),
              importTarget:"voice-settings-voice",
              accept:".mp3,.wav,.m4a,.aac,.ogg,.flac",
              hint:"先选择音色，再继续调整语速和情绪。",
            })}
          </section>

          <section class="workspace-section">
            <h3>${icon("settings",14)} TTS 设置</h3>
            <div style="margin-top:8px">
              <div class="workspace-range-head"><span style="font-size:12px">语速</span><strong>${vs.speed.toFixed(1)}x</strong></div>
              <input class="range-input" data-field="voiceSpeed" type="range" min="0.5" max="2.0" step="0.1" value="${vs.speed}" />
            </div>
            <div style="margin-top:12px">
              ${renderFieldBlock({
                iconName:"sparkles",
                label:"情绪",
                control:renderSelectControl({ field:"voiceEmotionSelect", value:vs.emotion, placeholder:"请选择情绪风格", options:emotions }),
              })}
            </div>
          </section>

          <section class="workspace-section">
            <h3>${icon("music",14)} BGM 设置</h3>
            ${renderImportableSelectField({
              iconName:"music",
              label:"背景音乐",
              field:"bgmGenreSelect",
              value:vs.bgmGenre,
              placeholder:"请选择背景音乐",
              options:bgmGenres,
              importTarget:"voice-settings-bgm",
              accept:".mp3,.wav,.m4a,.aac,.ogg,.flac",
            })}
            <div style="margin-top:12px;display:flex;align-items:center;gap:12px">
              <span style="font-size:12px;white-space:nowrap">${icon("volume",14)} 音量</span>
              <input class="range-input" data-field="bgmVolume" type="range" min="0" max="100" value="${vs.bgmVolume}" style="flex:1" />
              <strong style="font-size:12px">${vs.bgmVolume}%</strong>
            </div>
            <div style="margin-top:10px">
              ${renderFieldBlock({
                iconName:"zap",
                label:"自动卡点",
                control:renderSelectControl({
                  field:"beatSyncSelect",
                  value:vs.beatSync === null ? "" : String(vs.beatSync),
                  placeholder:"请选择是否开启",
                  options:["true","false"],
                  labels:{ true:"开启", false:"关闭" },
                }),
              })}
            </div>
          </section>

          <section class="workspace-section">
            <h3>${icon("type",14)} 字幕设置</h3>
            ${renderImportableSelectField({
              iconName:"type",
              label:"字幕样式",
              field:"subtitleFontSelect",
              value:vs.subtitleFont,
              placeholder:"请选择字幕样式",
              options:fonts,
              importTarget:"voice-settings-subtitle",
              accept:".ass,.srt,.vtt,.json,.ttf,.otf,.css,.txt",
            })}
            <div style="margin-top:12px;display:flex;gap:12px">
              <div style="flex:1">
                ${renderFieldBlock({
                  label:"大小",
                  control:renderSelectControl({
                    field:"subtitleSizeSelect",
                    value:vs.subtitleSize,
                    placeholder:"请选择字幕大小",
                    options:["small","medium","large"],
                    labels:subtitleSizeLabels,
                  }),
                })}
              </div>
              <div><span style="font-size:12px;opacity:0.6">颜色</span><div style="margin-top:4px"><input type="color" value="${vs.subtitleColor}" data-field="subtitleColor" style="width:40px;height:30px;border:none;background:none;cursor:pointer" /></div></div>
            </div>
            <div style="margin-top:12px">
              ${renderFieldBlock({
                label:"位置",
                control:renderSelectControl({
                  field:"subtitlePositionSelect",
                  value:vs.subtitlePosition,
                  placeholder:"请选择字幕位置",
                  options:positions,
                  labels:positionLabels,
                }),
              })}
            </div>
            <div style="margin-top:10px">
              ${renderFieldBlock({
                iconName:"sparkles",
                label:"关键词高亮",
                control:renderSelectControl({
                  field:"highlightKeywordsSelect",
                  value:vs.highlightKeywords === null ? "" : String(vs.highlightKeywords),
                  placeholder:"请选择是否开启",
                  options:["true","false"],
                  labels:{ true:"开启", false:"关闭" },
                }),
              })}
            </div>
          </section>
        </aside>

        <section class="workspace-main-panel" style="display:flex;align-items:center;justify-content:center;flex:1">
          <div style="text-align:center">
            <div class="voice-preview-device">
              <div class="voice-preview-notch"></div>
              <div class="voice-preview-screen">
                ${renderPreviewVideo(getPreviewVideo(vs.activeVoiceSample>=0?vs.activeVoiceSample:0),"media-preview-video",true)}
              </div>
              <div class="voice-preview-subtitle" style="${previewSubtitlePosition==='top'?'top:40px':previewSubtitlePosition==='center'?'top:50%;transform:translateY(-50%)':'bottom:40px'};color:${vs.subtitleColor}">
                ${vs.highlightKeywords===true?'<span style="color:#f59e0b">养生茶</span>真的被我找到了！':'养生茶真的被我找到了！'}
              </div>
            </div>
            <p style="font-size:12px;opacity:0.6;color:#8b7da0;margin-top:12px">${voiceSummary} · ${emotionSummary} · ${bgmSummary}</p>
          </div>
        </section>
      </main>
      <div style="padding:16px 24px;display:flex;justify-content:space-between;align-items:center;background:#ffffff;border-top:1px solid rgba(168,85,247,0.08)">
        <button class="btn btn--ghost" data-action="go-storyboard-match">${icon("chevronRight",14)} 返回分镜</button>
        <button class="btn btn--light" data-action="start-generation-from-voice">${icon("zap",14)} 开始生成视频</button>
      </div>
    </div>`;
}

/* ── Route Renderer ── */
function renderRoute(){
  switch(state.route){
    case "landing": return renderLandingPage();
    case "login": return renderAuthPage("login");
    case "register": return renderAuthPage("register");
    case "dashboard-home": return renderDashboardHome();
    case "smart-video": return renderSmartVideoPage();
    case "ai-copy": return renderAiCopyPage();
    case "smart-edit": return renderSmartEditPage();
    case "timeline-editor": return renderTimelineEditorPage();
    case "asset-library": return renderAssetLibraryPage();
    case "upload": return renderUploadPage();
    case "distribution": return renderDistributionPage();
    case "analytics": return renderAnalyticsPage();
    case "product-config": return renderProductConfigPage();
    case "storyboard-match": return renderStoryboardMatchPage();
    case "voice-settings": return renderVoiceSettingsPage();
    case "billing": return renderBillingPage();
    case "account-settings": return renderAccountSettingsPage();
    default: return renderLandingPage();
  }
}

function renderApp({ preserveScroll = true } = {}){
  const scrollPositions = preserveScroll ? captureScrollPositions() : null;
  app.innerHTML = `${renderRoute()}${state.route==="dashboard-home" ? renderInspirationPreviewModal() : ""}${renderWorkspaceDialog()}${state.toast?`<div class="app-toast app-toast--${state.toast.tone}"><span>${state.toast.message}</span></div>`:""}`;
  if(scrollPositions) restoreScrollPositions(scrollPositions);
  // Lazy-load stats from API when on dashboard
  if(state.route==="dashboard-home" && api.isLoggedIn() && !state._statsLoaded){
    state._statsLoaded = true;
    api.get("/stats").then(r => {
      if(r.ok){ state._stats = r.data.stats; renderApp(); }
    });
  }
}

/* ── Event Delegation ── */
document.addEventListener("click", e => {
  if(e.target.matches("[data-workspace-dialog-backdrop]")){
    closeWorkspaceDialog();
    return;
  }

  const closeWorkspaceDialogBtn = e.target.closest("[data-action='close-workspace-dialog']");
  if(closeWorkspaceDialogBtn){
    closeWorkspaceDialog();
    return;
  }

  if(e.target.matches("[data-inspiration-backdrop]")){
    state.dashboard.previewIndex = null;
    renderApp();
    return;
  }

  const closeInspirationPreview = e.target.closest("[data-action='close-inspiration-preview']");
  if(closeInspirationPreview){
    state.dashboard.previewIndex = null;
    renderApp();
    return;
  }

  const inspirationPreview = e.target.closest("[data-inspiration-preview]");
  if(inspirationPreview){
    state.dashboard.previewIndex = Number(inspirationPreview.dataset.inspirationPreview);
    renderApp();
    return;
  }

  const importTrigger = e.target.closest("[data-trigger-import]");
  if(importTrigger){
    const input = document.querySelector(`[data-import-input="${importTrigger.dataset.triggerImport}"]`);
    if(input){
      input.value = "";
      input.click();
    }
    return;
  }

  const routeTrigger = e.target.closest("[data-route]");
  if(routeTrigger){
    const route = routeTrigger.dataset.route;
    const stage = routeTrigger.dataset.stage;
    const generated = routeTrigger.dataset.generated;
    if(route==="smart-video"&&stage) navigate(route,{stage});
    else if(route==="ai-copy"&&generated) navigate(route,{generated:generated==="true"});
    else navigate(route);
    return;
  }

  const scrollTrigger = e.target.closest("[data-scroll]");
  if(scrollTrigger){ const t=document.getElementById(scrollTrigger.dataset.scroll); if(t) t.scrollIntoView({behavior:"smooth",block:"start"}); return; }

  const authMode = e.target.closest("[data-auth-mode]");
  if(authMode){ navigate(authMode.dataset.authMode); return; }

  const dashCat = e.target.closest("[data-dashboard-category]");
  if(dashCat){ state.dashboard.activeCategory=dashCat.dataset.dashboardCategory; renderApp(); return; }

  const dashFeat = e.target.closest("[data-feature-title]");
  if(dashFeat){ state.dashboard.activeFeature=dashFeat.dataset.featureTitle; renderApp(); return; }

  const dashParse = e.target.closest("[data-action='dashboard-parse']");
  if(dashParse){
    const link=state.dashboard.quickLink.trim();
    state.dashboard.quickStatus = link?`已识别链接：${link.slice(0,32)}${link.length>32?"...":""}`:"请先输入商品链接后再开始解析";
    state.smartVideo.mode="product"; state.smartVideo.productLink=link; state.smartVideo.stage=link?"processing":"empty";
    navigate("smart-video",{stage:state.smartVideo.stage});
    if(link) startSmartVideoGeneration();
    return;
  }

  const smartMode = e.target.closest("[data-smart-mode]");
  if(smartMode){ state.smartVideo.mode=smartMode.dataset.smartMode; renderApp(); return; }

  const smartInd = e.target.closest("[data-smart-industry]");
  if(smartInd){ state.smartVideo.industry=smartInd.dataset.smartIndustry; renderApp(); return; }

  const smartSt = e.target.closest("[data-smart-style]");
  if(smartSt){ state.smartVideo.style=smartSt.dataset.smartStyle; renderApp(); return; }

  const smartDur = e.target.closest("[data-smart-duration]");
  if(smartDur){ state.smartVideo.duration=Number(smartDur.dataset.smartDuration); renderApp(); return; }

  const smartGen = e.target.closest("[data-action='smart-generate']");
  if(smartGen){ state.smartVideo.stage="processing"; navigate("smart-video",{stage:"processing"}); startSmartVideoGeneration(); return; }

  const smartReset = e.target.closest("[data-action='smart-reset']");
  if(smartReset){ state.smartVideo.stage="empty"; renderApp(); showToast("已清空当前生成结果。"); return; }

  const smartRegen = e.target.closest("[data-action='smart-regenerate']");
  if(smartRegen){ state.smartVideo.stage="processing"; renderApp(); startSmartVideoGeneration(); return; }

  const smartFission = e.target.closest("[data-action='smart-fission']");
  if(smartFission){ showToast("正在裂变生成 10 条差异化视频...","success"); return; }

  const batchExport = e.target.closest("[data-action='smart-batch-export']");
  if(batchExport){ showToast("已加入批量导出队列。","success"); return; }

  const batchDl = e.target.closest("[data-action='smart-batch-download']");
  if(batchDl){ showToast("已开始批量下载。","success"); return; }

  const dlSingle = e.target.closest("[data-action='download-single']");
  if(dlSingle){ showToast("视频下载中...","success"); return; }

  const aiInput = e.target.closest("[data-ai-input]");
  if(aiInput){ state.aiCopy.inputType=aiInput.dataset.aiInput; renderApp(); return; }

  const aiStyle = e.target.closest("[data-ai-style]");
  if(aiStyle){ state.aiCopy.style=aiStyle.dataset.aiStyle; renderApp(); return; }

  const toggleCustomAiStyle = e.target.closest("[data-action='toggle-custom-ai-style']");
  if(toggleCustomAiStyle){
    state.aiCopy.isAddingCustomStyle = true;
    renderApp();
    return;
  }

  const cancelCustomAiStyle = e.target.closest("[data-action='cancel-custom-ai-style']");
  if(cancelCustomAiStyle){
    state.aiCopy.isAddingCustomStyle = false;
    state.aiCopy.customStyleDraft = "";
    renderApp();
    return;
  }

  const saveCustomAiStyle = e.target.closest("[data-action='save-custom-ai-style']");
  if(saveCustomAiStyle){
    const draft = state.aiCopy.customStyleDraft.trim();
    if(!draft){
      showToast("请先输入自定义脚本风格");
      return;
    }
    if(!state.aiCopy.customStyles.includes(draft)){
      state.aiCopy.customStyles = [...state.aiCopy.customStyles, draft];
    }
    state.aiCopy.style = draft;
    state.aiCopy.isAddingCustomStyle = false;
    state.aiCopy.customStyleDraft = "";
    renderApp();
    showToast(`已添加脚本风格：${draft}`,"success");
    return;
  }

  const aiGen = e.target.closest("[data-action='ai-generate']");
  if(aiGen){ startAiCopyGeneration(); return; }

  const editAiScript = e.target.closest("[data-action='edit-ai-script']");
  if(editAiScript){
    const index = Number(editAiScript.dataset.scriptIndex);
    state.aiCopy.activeScript = index;
    openWorkspaceDialog("ai-script-edit",{ index });
    return;
  }

  const rotateAiScript = e.target.closest("[data-action='rotate-ai-script']");
  if(rotateAiScript){
    rotateAiScriptVariant(Number(rotateAiScript.dataset.scriptIndex));
    return;
  }

  const saveAiScript = e.target.closest("[data-action='save-ai-script']");
  if(saveAiScript && state.workspaceDialog?.type==="ai-script-edit"){
    const { scriptIndex, name, segments } = state.workspaceDialog;
    aiScripts[scriptIndex] = {
      ...aiScripts[scriptIndex],
      name: (name || "").trim() || `脚本方案 ${scriptIndex + 1}`,
      segments: segments.map((segment, index) => ({
        time: (segment.time || `${index + 1}-${index + 2}s`).trim(),
        type: (segment.type || `段落 ${index + 1}`).trim(),
        text: (segment.text || "").trim() || "请补充这一段脚本文案。",
      })),
    };
    closeWorkspaceDialog();
    showToast("脚本内容已更新。","success");
    return;
  }

  const scriptSel = e.target.closest("[data-script-select]");
  if(scriptSel){ state.aiCopy.activeScript=Number(scriptSel.dataset.scriptSelect); renderApp(); return; }

  const scriptRot = e.target.closest("[data-script-rotate]");
  if(scriptRot){ state.aiCopy.activeScript=Number(scriptRot.dataset.scriptRotate); showToast("已切换脚本风格。"); renderApp(); return; }

  const goStoryboard = e.target.closest("[data-action='go-storyboard-match']");
  if(goStoryboard){ navigate("storyboard-match"); return; }

  const goVoice = e.target.closest("[data-action='go-voice-settings']");
  if(goVoice){ navigate("voice-settings"); return; }

  const settingsTab = e.target.closest("[data-settings-tab]");
  if(settingsTab){
    state.accountSettings.activeTab = settingsTab.dataset.settingsTab;
    renderApp();
    return;
  }

  const refreshAi = e.target.closest("[data-action='refresh-ai-analysis']");
  if(refreshAi){
    const altSelling = [["有机认证，品质有保障","每袋独立包装，出差必备","多种口味可选，满足不同需求"],["入口回甘，茶香浓郁","精选产地原料，源头直采","老少皆宜，送礼体面"]];
    const altHooks = [["一杯茶的钱，换来好气色","同事都问我最近皮肤怎么变好了","养生不用花大钱，这款茶就够了"],["喝了一个月，整个人都不一样了","为什么明星都爱喝养生茶？","早知道这么好喝，早就入手了"]];
    const idx = Math.floor(Math.random()*altSelling.length);
    state.productConfig.aiSellingPoints = altSelling[idx];
    state.productConfig.hookSuggestions = altHooks[idx];
    renderApp(); showToast("已刷新 AI 分析结果","success"); return;
  }

  const goAiCopy = e.target.closest("[data-action='go-ai-copy']");
  if(goAiCopy){ navigate("ai-copy"); return; }

  const startBatch = e.target.closest("[data-action='start-batch-generate']");
  if(startBatch){ navigate("smart-video",{stage:"processing"}); startSmartVideoGeneration(); return; }

  const startFromVoice = e.target.closest("[data-action='start-generation-from-voice']");
  if(startFromVoice){ navigate("smart-video",{stage:"processing"}); startSmartVideoGeneration(); return; }

  const clipSel = e.target.closest("[data-clip-index]");
  if(clipSel){ const i=Number(clipSel.dataset.clipIndex); state.smartEdit.activeClip=i; state.smartEdit.voiceCopy=editorStoryboard[i].copy; state.smartEdit.duration=Number(editorStoryboard[i].time.replace("s","")); renderApp(); return; }

  const editStoryboard = e.target.closest("[data-action='edit-storyboard']");
  if(editStoryboard){
    openWorkspaceDialog("storyboard-edit",{ index: state.smartEdit.activeClip });
    return;
  }

  const saveStoryboardEdit = e.target.closest("[data-action='save-storyboard-edit']");
  if(saveStoryboardEdit && state.workspaceDialog?.type==="storyboard-edit"){
    const { clipIndex, title, time, copy, category } = state.workspaceDialog;
    const nextDuration = Math.min(15, Math.max(1, Number(time) || state.smartEdit.duration || 3));
    editorStoryboard[clipIndex] = {
      ...editorStoryboard[clipIndex],
      title: (title || "").trim() || `分镜 ${clipIndex + 1}`,
      time: `${nextDuration}s`,
      copy: (copy || "").trim() || "请补充分镜文案。",
      category: category || editorStoryboard[clipIndex].category,
    };
    state.smartEdit.activeClip = clipIndex;
    state.smartEdit.voiceCopy = editorStoryboard[clipIndex].copy;
    state.smartEdit.duration = nextDuration;
    closeWorkspaceDialog();
    showToast("分镜内容已更新。","success");
    return;
  }

  const smartEditPreview = e.target.closest("[data-action='smart-edit-preview']");
  if(smartEditPreview){ showToast("正在打开实时预览。","success"); return; }

  const smartEditExport = e.target.closest("[data-action='smart-edit-export']");
  if(smartEditExport){ showToast("已加入导出队列。","success"); return; }

  const smartEditSave = e.target.closest("[data-action='smart-edit-save']");
  if(smartEditSave){ showToast("智能剪辑内容已保存。","success"); return; }

  const smartEditUndo = e.target.closest("[data-action='smart-edit-undo']");
  if(smartEditUndo){ showToast("已撤销上一步操作。"); return; }

  const smartEditRedo = e.target.closest("[data-action='smart-edit-redo']");
  if(smartEditRedo){ showToast("已恢复最近一次变更。"); return; }

  const addStoryboard = e.target.closest("[data-action='storyboard-add']");
  if(addStoryboard){
    const insertIndex = Math.min(state.smartEdit.activeClip + 1, editorStoryboard.length);
    const newClip = {
      id: Date.now(),
      title:"新分镜",
      time:"4s",
      copy:"补充这一段的镜头说明、口播文案或转场意图。",
      category:"feature",
    };
    editorStoryboard.splice(insertIndex, 0, newClip);
    state.smartEdit.activeClip = insertIndex;
    state.smartEdit.voiceCopy = newClip.copy;
    state.smartEdit.duration = 4;
    renderApp();
    showToast("已新增一个分镜。","success");
    return;
  }

  const removeStoryboard = e.target.closest("[data-action='storyboard-remove']");
  if(removeStoryboard){
    if(editorStoryboard.length===1){
      showToast("至少保留一个分镜。");
      return;
    }
    editorStoryboard.splice(state.smartEdit.activeClip, 1);
    state.smartEdit.activeClip = Math.max(0, Math.min(state.smartEdit.activeClip, editorStoryboard.length - 1));
    state.smartEdit.voiceCopy = editorStoryboard[state.smartEdit.activeClip].copy;
    state.smartEdit.duration = Number(editorStoryboard[state.smartEdit.activeClip].time.replace("s",""));
    renderApp();
    showToast("当前分镜已删除。","success");
    return;
  }

  const rightCat = e.target.closest("[data-right-cat]");
  if(rightCat){ state.smartEdit.rightCategory=rightCat.dataset.rightCat; state.smartEdit.hookMaterial=0; renderApp(); return; }

  const smartEditRatio = e.target.closest("[data-smart-edit-ratio]");
  if(smartEditRatio){
    state.smartEdit.ratio = smartEditRatio.dataset.smartEditRatio;
    renderApp();
    return;
  }

  const smartEditZoomOut = e.target.closest("[data-action='smart-edit-zoom-out']");
  if(smartEditZoomOut){
    state.smartEdit.timelineZoom = Math.max(0.6, Number((state.smartEdit.timelineZoom - 0.2).toFixed(2)));
    renderApp();
    return;
  }

  const smartEditZoomIn = e.target.closest("[data-action='smart-edit-zoom-in']");
  if(smartEditZoomIn){
    state.smartEdit.timelineZoom = Math.min(2, Number((state.smartEdit.timelineZoom + 0.2).toFixed(2)));
    renderApp();
    return;
  }

  const smartEditZoomReset = e.target.closest("[data-action='smart-edit-zoom-reset']");
  if(smartEditZoomReset){
    state.smartEdit.timelineZoom = 1;
    renderApp();
    return;
  }

  const hookSel = e.target.closest("[data-hook-index]");
  if(hookSel){ state.smartEdit.hookMaterial=Number(hookSel.dataset.hookIndex); renderApp(); return; }

  const transSel = e.target.closest("[data-transition]");
  if(transSel){ state.smartEdit.transition=transSel.dataset.transition; renderApp(); return; }

  const tlTool = e.target.closest("[data-tool-library]");
  if(tlTool){ state.timelineEditor.library=tlTool.dataset.toolLibrary; renderApp(); return; }

  const recIdx = e.target.closest("[data-recommend-index]");
  if(recIdx){ state.timelineEditor.recommendation=Number(recIdx.dataset.recommendIndex); renderApp(); return; }

  const assetTab = e.target.closest("[data-asset-tab]");
  if(assetTab){ state.assets.tab=assetTab.dataset.assetTab; renderApp(); return; }

  const assetCreate = e.target.closest("[data-action='asset-create']");
  if(assetCreate){
    if(state.assets.tab==="脚本库"){ state.assets.scriptCards=[...state.assets.scriptCards,{name:`新建脚本 ${state.assets.scriptCards.length+1}`,lines:["Hook","卖点","CTA"]}]; renderApp(); return; }
    if(state.assets.tab==="我的视频"){ navigate("smart-video"); return; }
    if(state.assets.tab==="素材库"){ navigate("upload"); return; }
  }

  const assetSort = e.target.closest("[data-action='asset-sort']");
  if(assetSort){ state.assets.sort=state.assets.sort==="最新优先"?"最近编辑":"最新优先"; renderApp(); showToast(`已切换为${state.assets.sort}`); return; }

  const uploadDemo = e.target.closest("[data-action='upload-demo']");
  if(uploadDemo){
    state.upload.items=[...state.upload.items,{name:`素材_${state.upload.items.length+1}.mp4`,size:"19.8MB",status:"处理完成",tags:["电商","产品"]}];
    if(state.route!=="upload"){ navigate("upload"); showToast("素材已添加到上传队列。","success"); return; }
    renderApp(); showToast("素材已添加到上传队列。","success"); return;
  }

  const accManage = e.target.closest("[data-account-index]");
  if(accManage){ const i=Number(accManage.dataset.accountIndex); const a=state.distribution.accounts[i]; a.connected=true; a.status=a.status==="未连接"?"1 个账号":a.status; renderApp(); showToast(`${a.platform} 已完成账号授权。`,"success"); return; }

  const addTask = e.target.closest("[data-action='distribution-add-task']");
  if(addTask){ state.distribution.queue=[{title:`新发布任务 ${state.distribution.queue.length+1}`,platforms:"抖音 / 小红书",schedule:"后天 11:00",status:"待发布",originality:95},...state.distribution.queue]; renderApp(); showToast("已添加新的发布任务。","success"); return; }

  const editDistributionTask = e.target.closest("[data-action='edit-distribution-task']");
  if(editDistributionTask){
    openWorkspaceDialog("distribution-edit",{ index:Number(editDistributionTask.dataset.taskIndex) });
    return;
  }

  const saveDistributionTask = e.target.closest("[data-action='save-distribution-task']");
  if(saveDistributionTask && state.workspaceDialog?.type==="distribution-edit"){
    const { taskIndex, title, platforms, schedule, status, originality } = state.workspaceDialog;
    state.distribution.queue[taskIndex] = {
      ...state.distribution.queue[taskIndex],
      title: (title || "").trim() || `发布任务 ${taskIndex + 1}`,
      platforms: (platforms || "").trim() || "抖音 / 小红书",
      schedule: (schedule || "").trim() || "今天 18:30",
      status: status || state.distribution.queue[taskIndex].status,
      originality: Math.min(100, Math.max(70, Number(originality) || state.distribution.queue[taskIndex].originality)),
    };
    closeWorkspaceDialog();
    showToast("发布任务已更新。","success");
    return;
  }

  const authSubmit = e.target.closest("[data-action='auth-submit']");
  if(authSubmit){
    const form = document.querySelector(".auth-form");
    const inputs = form ? form.querySelectorAll("input") : [];
    const isLogin = state.authMode === "login";
    if(isLogin){
      const email = inputs[0]?.value || "";
      const password = inputs[1]?.value || "";
      if(!email||!password){ showToast("请填写邮箱和密码。"); return; }
      authSubmit.textContent = "登录中...";
      api.login(email, password).then(r => {
        if(r.ok){ navigate("dashboard-home"); showToast("登录成功，欢迎回来！","success"); }
        else { showToast(r.data.error || "登录失败"); renderApp(); }
      });
    } else {
      const username = inputs[0]?.value || "";
      const email = inputs[1]?.value || "";
      const password = inputs[2]?.value || "";
      if(!username||!email||!password){ showToast("请填写所有字段。"); return; }
      authSubmit.textContent = "注册中...";
      api.register(username, email, password).then(r => {
        if(r.ok){ navigate("dashboard-home"); showToast("注册成功！","success"); }
        else { showToast(r.data.error || "注册失败"); renderApp(); }
      });
    }
    return;
  }

  const logoutBtn = e.target.closest("[data-action='logout']");
  if(logoutBtn){ api.logout().then(()=>{ navigate("login"); showToast("已退出登录。"); }); return; }

  const notifications = e.target.closest("[data-action='notifications']");
  if(notifications){ showToast("暂无新通知。"); return; }

  const replicate = e.target.closest("[data-action='replicate-video']");
  if(replicate){ showToast("已开始复刻该视频的创作策略。","success"); return; }

  const swapClip = e.target.closest("[data-action='swap-clip']");
  if(swapClip){ showToast("素材已替换。","success"); return; }

  /* Product Config - Audience chips */
  const audience = e.target.closest("[data-audience]");
  if(audience){
    const a=audience.dataset.audience;
    const arr=state.productConfig.audiences;
    if(arr.includes(a)) state.productConfig.audiences=arr.filter(x=>x!==a);
    else state.productConfig.audiences=[...arr,a];
    renderApp(); return;
  }

  /* Voice Settings */
  const voiceSample = e.target.closest("[data-voice-sample]");
  if(voiceSample){ state.voiceSettings.activeVoiceSample=Number(voiceSample.dataset.voiceSample); renderApp(); return; }

  const voiceEmotion = e.target.closest("[data-voice-emotion]");
  if(voiceEmotion){ state.voiceSettings.emotion=voiceEmotion.dataset.voiceEmotion; renderApp(); return; }

  const bgmGenre = e.target.closest("[data-bgm-genre]");
  if(bgmGenre){ state.voiceSettings.bgmGenre=bgmGenre.dataset.bgmGenre; renderApp(); return; }

  const toggleBeat = e.target.closest("[data-action='toggle-beatsync']");
  if(toggleBeat){ state.voiceSettings.beatSync=!state.voiceSettings.beatSync; renderApp(); return; }

  const subtitleFont = e.target.closest("[data-subtitle-font]");
  if(subtitleFont){ state.voiceSettings.subtitleFont=subtitleFont.dataset.subtitleFont; renderApp(); return; }

  const subtitleSize = e.target.closest("[data-subtitle-size]");
  if(subtitleSize){ state.voiceSettings.subtitleSize=subtitleSize.dataset.subtitleSize; renderApp(); return; }

  const subtitlePos = e.target.closest("[data-subtitle-position]");
  if(subtitlePos){ state.voiceSettings.subtitlePosition=subtitlePos.dataset.subtitlePosition; renderApp(); return; }

  const toggleHL = e.target.closest("[data-action='toggle-highlight']");
  if(toggleHL){ state.voiceSettings.highlightKeywords=!state.voiceSettings.highlightKeywords; renderApp(); return; }
});

/* ── Input handling ── */
document.addEventListener("input", e => {
  const dialogField = e.target.dataset.dialogField;
  if(dialogField && state.workspaceDialog){
    state.workspaceDialog[dialogField] = e.target.value;
    return;
  }

  const dialogSegmentIndex = e.target.dataset.dialogSegmentIndex;
  const dialogSegmentProp = e.target.dataset.dialogSegmentProp;
  if(dialogSegmentIndex !== undefined && dialogSegmentProp && state.workspaceDialog?.segments){
    state.workspaceDialog.segments[Number(dialogSegmentIndex)][dialogSegmentProp] = e.target.value;
    return;
  }

  const field = e.target.dataset.field;
  if(!field) return;
  const v = e.target.value;
  switch(field){
    case "dashboardQuickLink": state.dashboard.quickLink=v; break;
    case "dashboardSearch": state.dashboard.search=v; renderApp(); break;
    case "smartProductLink": state.smartVideo.productLink=v; break;
    case "smartDescription": state.smartVideo.description=v; break;
    case "smartVideoCount": state.smartVideo.count=Number(v); renderApp(); break;
    case "smartVideoCustomDuration":
      if(v==="") break;
      state.smartVideo.duration = Math.min(180, Math.max(5, Number(v) || state.smartVideo.duration));
      renderApp();
      break;
    case "aiCopyPrompt": state.aiCopy.prompt=v; break;
    case "smartEditVoiceCopy":
      state.smartEdit.voiceCopy = v;
      if(editorStoryboard[state.smartEdit.activeClip]){
        editorStoryboard[state.smartEdit.activeClip].copy = v;
      }
      break;
    case "aiCopyCustomStyleDraft": state.aiCopy.customStyleDraft=v; break;
    case "smartEditDuration":
      state.smartEdit.duration = Math.min(15, Math.max(1, Number(v) || state.smartEdit.duration));
      if(editorStoryboard[state.smartEdit.activeClip]){
        editorStoryboard[state.smartEdit.activeClip].time = `${state.smartEdit.duration}s`;
      }
      renderApp();
      break;
    case "smartEditTimelineZoom":
      state.smartEdit.timelineZoom = Math.min(2, Math.max(0.6, (Number(v) || 100) / 100));
      renderApp();
      break;
    case "timelineZoom": state.timelineEditor.zoom=Number(v); break;
    case "assetSearch": state.assets.search=v; renderApp(); break;
    case "productName": state.productConfig.name=v; break;
    case "productPrice": state.productConfig.price=v; break;
    case "productSellingPoints": state.productConfig.sellingPoints=v; break;
    case "productPromotion": state.productConfig.promotion=v; break;
    case "productScenarios": state.productConfig.scenarios=v; break;
    case "productCompetitors": state.productConfig.competitors=v; break;
    case "voiceSpeed": state.voiceSettings.speed=Number(v); renderApp(); break;
    case "bgmVolume": state.voiceSettings.bgmVolume=Number(v); renderApp(); break;
    case "subtitleColor": state.voiceSettings.subtitleColor=v; renderApp(); break;
  }
});

document.addEventListener("change", e => {
  const importInput = e.target.dataset.importInput;
  if(importInput){
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    switch(importInput){
      case "smart-video-voice":
        state.smartVideo.voice = file.name;
        break;
      case "smart-video-bgm":
        state.smartVideo.bgm = file.name;
        break;
      case "smart-video-subtitle":
        state.smartVideo.subtitle = file.name;
        break;
      case "voice-settings-voice":
        state.voiceSettings.activeVoiceSample = -1;
        state.voiceSettings.voice = file.name;
        break;
      case "voice-settings-bgm":
        state.voiceSettings.bgmGenre = file.name;
        break;
      case "voice-settings-subtitle":
        state.voiceSettings.subtitleFont = file.name;
        break;
    }
    renderApp();
    showToast(`已导入 ${file.name}`,"success");
    return;
  }

  const dialogField = e.target.dataset.dialogField;
  if(dialogField && state.workspaceDialog){
    state.workspaceDialog[dialogField] = e.target.value;
    renderApp();
    return;
  }

  const field = e.target.dataset.field;
  if(!field) return;
  const v = e.target.value;
  switch(field){
    case "smartVideoVoice":
      state.smartVideo.voice = v;
      renderApp();
      break;
    case "smartVideoBgm":
      state.smartVideo.bgm = v;
      renderApp();
      break;
    case "smartVideoSubtitle":
      state.smartVideo.subtitle = v;
      renderApp();
      break;
    case "voiceSampleSelect":
      state.voiceSettings.activeVoiceSample = v === "" ? -1 : Number(v);
      state.voiceSettings.voice = v === "" ? "" : ["甜美女声","磁性男声","少年音","御姐音","温柔女声"][Number(v)];
      renderApp();
      break;
    case "voiceEmotionSelect":
      state.voiceSettings.emotion = v;
      renderApp();
      break;
    case "bgmGenreSelect":
      state.voiceSettings.bgmGenre = v;
      renderApp();
      break;
    case "beatSyncSelect":
      state.voiceSettings.beatSync = v === "" ? null : v === "true";
      renderApp();
      break;
    case "subtitleFontSelect":
      state.voiceSettings.subtitleFont = v;
      renderApp();
      break;
    case "subtitleSizeSelect":
      state.voiceSettings.subtitleSize = v;
      renderApp();
      break;
    case "subtitlePositionSelect":
      state.voiceSettings.subtitlePosition = v;
      renderApp();
      break;
    case "highlightKeywordsSelect":
      state.voiceSettings.highlightKeywords = v === "" ? null : v === "true";
      renderApp();
      break;
    case "dialogCategory":
      if(state.workspaceDialog){
        state.workspaceDialog.category = v;
        renderApp();
      }
      break;
    case "dialogStatus":
      if(state.workspaceDialog){
        state.workspaceDialog.status = v;
        renderApp();
      }
      break;
  }
});

document.addEventListener("keydown", e => {
  if(e.key==="Escape" && state.workspaceDialog){
    closeWorkspaceDialog();
    return;
  }
  if(e.key==="Escape" && state.dashboard.previewIndex!==null){
    state.dashboard.previewIndex = null;
    renderApp();
  }
});

window.addEventListener("hashchange", () => { initRoute(); renderApp({ preserveScroll:false }); });

initRoute();
renderApp({ preserveScroll:false });
