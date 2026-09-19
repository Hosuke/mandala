// 《曼荼羅之研究》書式金剛九會。此為有頁碼可查的機助整理，非宗教核定本。
// 位置依各會編號圖等距整理；九宮外框沿用本站。上西、下東、左南、右北。
import { byId } from './deities.js';

const W = 3125, H = 3567, seats = [];
const ref = (volume, page, section, extra = {}) => ({ volume, page, pdfPage: volume === '上' ? page + 29 : page - 347, section, ...extra });
const figure = (kind = 'bodhisattva', extra = {}) => ({ kind, heads: 1, arms: 2, pose: 'seated', attributes: [], ...extra });
const symbol = attributes => ({ kind: 'symbol', heads: null, arms: null, pose: 'unknown', attributes });
const names = {
  jojin: '成身會', sammaya: '三昧耶會', misai: '微細會', kuyo: '供養會',
  shiin: '四印會', ichiin: '一印會', rishu: '理趣會', gozanze: '降三世會', 'gozanze-s': '降三世三昧耶會',
};
const panels = [
  { key: 'jojin', cx: 1565, cy: 1790, dx: 222, dy: 214, rx: 73, ry: 72, ring: [1187,1374,1945,2225], outer: [1125,1280,2000,2310], volume: '上', page: 343, positionPage: 342 },
  { key: 'sammaya', cx: 1573, cy: 2913, dx: 220, dy: 216, rx: 73, ry: 70, ring: [1195,2500,1942,3335], outer: [1110,2400,2010,3440], volume: '下', page: 371, positionPage: 370 },
  { key: 'misai', cx: 595, cy: 2930, dx: 220, dy: 215, rx: 73, ry: 72, ring: [215,2520,970,3350], outer: [125,2418,1030,3450], volume: '下', page: 393, positionPage: 392 },
  { key: 'kuyo', cx: 590, cy: 1800, dx: 219, dy: 215, rx: 73, ry: 73, ring: [210,1390,970,2230], outer: [125,1278,1030,2325], volume: '下', page: 424, positionPage: 423 },
  { key: 'gozanze', cx: 2537, cy: 1785, dx: 219, dy: 215, rx: 73, ry: 72, ring: [2163,1380,2915,2220], outer: [2085,1270,2992,2310], volume: '下', page: 498, positionPage: 497 },
  { key: 'gozanze-s', cx: 2546, cy: 2910, dx: 220, dy: 215, rx: 71, ry: 70, ring: [2160,2490,2930,3330], outer: [2090,2398,3000,3435], volume: '下', page: 514, positionPage: 513 },
];

function add(assembly, key, name, xy, size, observation, source, options = {}) {
  const canonicalId = options.canonicalId && byId[options.canonicalId] ? options.canonicalId : null;
  seats.push({
    seatId: `k:${assembly}:${key}`, realm: 'k', side: 'k', assembly, name,
    u: xy[0] / W, v: xy[1] / H, w: size[0] / W, h: size[1] / H,
    observation, source, form: observation.kind === 'symbol' ? 'samaya' : 'figure',
    identityStatus: 'text-attested', reviewStatus: 'source-checked', positionStatus: 'book-schematic',
    note: '依本書名表與座位圖整理；相對坐次據書，間距為本站示意排布，非原圖像素復原。',
    ...options, canonicalId,
  });
}

// 編號、尊名、既有索引、身色、持物、右手、左手、印相、文字頁、圖版頁。
// 色相取上冊《秘藏記》／現圖欄；未把慶喜藏釋的獸座、多面多臂移來。
const coreRows = [
  [1,'毗盧遮那如來','center','肉色',[],null,null,'智拳印',310,344],
  [2,'金剛波羅蜜菩薩','p-kon','黑青',['蓮華','梵篋'],'阿閦印','蓮上梵篋',null,311,344],
  [3,'寶波羅蜜菩薩','p-ho','白黃',['蓮華','寶珠','金輪'],'四角金輪','蓮上寶',null,311,344],
  [4,'法波羅蜜菩薩','p-hou','肉色',['蓮華','梵篋'],null,null,'定印承蓮上篋',311,344],
  [5,'羯磨波羅蜜菩薩','p-katsu','青色',['蓮華','梵篋','羯磨杵'],'羯磨杵','蓮上梵篋',null,312,344],
  [6,'阿閦如來','east','金色',[],'觸地','拳置膝','觸地印',310,345],
  [7,'金剛薩埵','fugen','肉色',['五股杵','鈴'],'五股杵','鈴',null,312,345],
  [8,'金剛王菩薩','k-o','肉色',[],null,null,'兩手交叉拳',312,345],
  [9,'金剛愛菩薩','k-ai','肉色',['箭'],null,null,'兩手持箭',312,345],
  [10,'金剛喜菩薩','k-ki','肉色',[],null,null,'雙拳胸前',312,345],
  [11,'寶生如來','south','金色',[],'與願','拳置膝','與願印',310,346],
  [12,'金剛寶菩薩','kokuzo','肉色',['寶珠'],'承寶','與願',null,313,346],
  [13,'金剛光菩薩','k-ko','肉色',['日輪'],'日輪','拳',null,313,346],
  [14,'金剛幢菩薩','k-do','肉色',['幡幢'],null,null,'雙手持幢',313,346],
  [15,'金剛笑菩薩','k-sho',null,[],null,null,'雙拳揚耳側',313,346],
  [16,'無量壽如來','west','金色',[],null,null,'定印',311,347],
  [17,'金剛法菩薩','kannon','肉色',['蓮華'],null,null,'持蓮華',313,347],
  [18,'金剛利菩薩','monju','金色',['利劍','蓮華','梵篋'],'利劍','蓮上篋',null,313,347],
  [19,'金剛因菩薩','miroku','肉色',['法輪'],'輪','拳',null,314,347],
  [20,'金剛語菩薩','k-go','肉色',['如來舌'],null,null,'持如來舌',314,347],
  [21,'不空成就如來','north','金色',[],'施無畏','拳置膝','施無畏印',311,348],
  [22,'金剛業菩薩','k-gyo','肉色',[],null,null,'合掌舉頂',314,348],
  [23,'金剛護菩薩','k-gou','青色',[],null,null,'雙手舒食指結護印',314,348],
  [24,'金剛牙菩薩','k-ge','白色',[],null,null,'雙拳當臆',314,348],
  [25,'金剛拳菩薩','k-ken','青色',[],null,null,'雙拳當心腕屈下垂',314,348],
  [26,'金剛嬉菩薩','g-ki','黑色',[],null,null,'雙拳腰側',314,349],
  [27,'金剛鬘菩薩','g-man','白黃',['華鬘'],null,null,'持鬘',315,349],
  [28,'金剛歌菩薩','g-ka','白肉',['箜篌'],null,null,'奏樂',315,349],
  [29,'金剛舞菩薩','g-bu','青色',[],null,null,'舞印',315,349],
  [30,'金剛燒香菩薩','g-ko','黑色',['香爐'],null,null,'捧香爐',315,350],
  [31,'金剛華菩薩','g-ke','淺黃',['鮮花'],null,null,'捧花',315,350],
  [32,'金剛燈菩薩','g-to','白色',['燈'],null,null,'捧燈',315,350],
  [33,'金剛塗香菩薩','g-zu','青色',['塗香器'],null,null,'捧塗香器',315,350],
  [34,'金剛鉤菩薩','s-ko','黑色',['鉤'],'鉤','拳',null,315,351],
  [35,'金剛索菩薩','s-saku','白黃',['索'],'索','拳',null,316,351],
  [36,'金剛鎖菩薩','s-sa','肉色',['鎖'],'鎖','拳',null,316,351],
  [37,'金剛鈴菩薩','s-rei','青色',['鈴'],null,null,'持鈴',316,351],
];
const core = coreRows.map(([number,name,id,color,attributes,rightHand,leftHand,mudra,page,figurePage]) => ({
  number,name,id,page,figurePage,
  observation: figure([6,11,16,21].includes(number) ? 'buddha' : 'bodhisattva', {color,attributes,rightHand,leftHand,mudra}),
}));
const coreById = Object.fromEntries(core.map(d => [d.id,d]));

// 三昧耶之實物；與人物的持物分開，例：金剛愛持箭而標幟為二杵。
const samaya = {
  center:['制底','橫金剛杵'], 'p-kon':['五股杵'], 'p-ho':['寶珠','方座'], 'p-hou':['蓮華','梵篋'], 'p-katsu':['羯磨杵','方座'],
  east:['疊金剛','橫五股杵'], fugen:['五股杵'], 'k-o':['雙鉤'], 'k-ai':['雙金剛杵'], 'k-ki':['雙拳'],
  south:['焰寶'], kokuzo:['三寶珠'], 'k-ko':['日輪'], 'k-do':['寶幢'], 'k-sho':['齒鬘','金剛杵'],
  west:['蓮華'], kannon:['蓮華','金剛杵'], monju:['焰劍'], miroku:['金剛輻輪'], 'k-go':['如來舌'],
  north:['十二股羯磨杵'], 'k-gyo':['羯磨杵'], 'k-gou':['甲冑'], 'k-ge':['雙牙'], 'k-ken':['雙拳'],
  'g-ki':['五股杵'], 'g-man':['華鬘'], 'g-ka':['箜篌'], 'g-bu':['羯磨杵'],
  'g-ko':['香爐'], 'g-ke':['鮮花'], 'g-to':['燈'], 'g-zu':['塗香器'],
  's-ko':['鉤'], 's-saku':['索'], 's-sa':['鎖'], 's-rei':['鈴'],
};
const samayaFigurePage = n => n <= 25 ? 372 + Math.floor((n-1)/5) : n <= 29 ? 377 : n <= 33 ? 378 : 379;
const assemblyPhotoPage = {sammaya:369,misai:391,kuyo:422,gozanze:495,'gozanze-s':512};
const colorPlate = {volume:'上',page:null,pdfPage:11,section:'卷首彩版・現圖成身會（無印刷頁碼）'};
const sages = [
  ['慈氏菩薩',['軍持瓶']], ['不空見菩薩',['十字杵']], ['滅惡趣菩薩',['梵篋']], ['除憂暗菩薩',['無憂樹枝']],
  ['香象菩薩',['容器']], ['大精進菩薩',['獨股戟']], ['虛空藏菩薩',['寶珠']], ['智幢菩薩',['寶幢']],
  ['無量光菩薩',['火焰']], ['賢護菩薩',['賢瓶']], ['光網菩薩',['羅網']], ['月光菩薩',['半月']],
  ['無盡意菩薩',['梵篋']], ['辯積菩薩',['五色雲']], ['金剛藏菩薩',['獨股杵','四井字']], ['普賢菩薩',['劍']],
];
// 名稱從本書現圖名表；異稱另記，避免將同名「水天」兩種職位合併。
const devas = [
  ['那羅延天','赤肉',['輪'],'輪','拳',327],
  ['俱摩羅天','白肉',['鈴'],'鈴','拳',328,'童子三髻'],
  ['金剛推天',null,['白蓋'],null,null,330,'象頭',['傘蓋毗那夜迦']],
  ['梵天','肉色',['開敷華'],null,null,328],
  ['帝釋天','肉色',['獨股杵'],null,null,328],
  ['日天','肉色',['日輪'],null,null,329],
  ['月天','肉色',['半月'],'半月','拳',329],
  ['金剛食天',null,['華鬘'],null,null,330,'象頭',['華鬘毗那夜迦']],
  ['彗星天','赤肉',['棒'],null,null,329,null,['羅剎（秘藏記對照名）']],
  ['熒惑天','肉色',['寶幢'],null,null,329,null,['英惑天（書內名表用字）']],
  ['羅剎天',null,['棒'],null,null,331,null,['太白（秘藏記對照名）']],
  ['風天','赤肉',['杖幡'],null,null,331],
  ['金剛衣天',null,['弓','箭'],null,null,330,'象頭',['抱弓箭毗那夜迦']],
  ['火天','赤肉',['仙杖','三角形'],'三角形','仙杖',332],
  ['毗沙門天','黃色',['塔','棒'],'棒','塔',332],
  ['金剛面天','赤黑',['鉤'],null,null,332,'豬面人身'],
  ['焰摩天','肉色',['人頭形'],null,null,333],
  ['調伏天','白肉',['刀'],null,null,331,'象頭',['抱刀毗那夜迦']],
  ['毗那夜迦天',null,['蘿蔔','團'],'團','蘿蔔',333,'象頭',['歡喜天']],
  ['水天','青色',['索'],'索','拳',333],
];

const corners = ([l,t,r,b]) => [[l,b],[l,t],[r,t],[r,b]]; // 東南、西南、西北、東北
const edgePoint = ([l,t,r,b], edge, f) => [[r-(r-l)*f,b],[l,b-(b-t)*f],[l+(r-l)*f,t],[r,t+(b-t)*f]][edge];
function corePosition(p,n) {
  if(n <= 25) {
    const group=Math.floor((n-1)/5), i=(n-1)%5;
    const centers=[[0,0],[0,1],[-1,0],[0,-1],[1,0]];
    const offsets=[[[0,0],[0,1],[-1,0],[0,-1],[1,0]],[[0,0],[0,-1],[1,0],[-1,0],[0,1]],[[0,0],[1,0],[0,1],[0,-1],[-1,0]],[[0,0],[0,1],[-1,0],[1,0],[0,-1]],[[0,0],[-1,0],[0,-1],[0,1],[1,0]]];
    return [p.cx+centers[group][0]*p.dx+offsets[group][i][0]*p.rx,p.cy+centers[group][1]*p.dy+offsets[group][i][1]*p.ry];
  }
  if(n<=29) return corners([p.cx-198,p.cy-184,p.cx+198,p.cy+184])[n-26];
  if(n<=33) return corners(p.ring)[n-30];
  return edgePoint(p.ring,n-34,.5);
}
function panelSource(p, extra={}) { return ref(p.volume,p.page,`${names[p.key]}諸尊名`, {positionPage:p.positionPage,positionVolume:p.volume,...extra}); }

for(const p of panels) {
  const isSamaya = ['sammaya','gozanze-s'].includes(p.key);
  for(const d of core) {
    let observation = {...d.observation,attributes:[...d.observation.attributes]};
    let note = `尊名與席次據${p.volume}冊${p.page}/${p.positionPage}頁；身色、持物取上冊${d.page}頁現圖／秘藏記欄，坐姿面臂據上冊${d.figurePage}頁圖。`;
    let iconography = ref('上',d.page,'成身會現圖尊容對照', {figurePage:d.figurePage,figureVolume:'上'});
    if(isSamaya) {
      const attributes = [...samaya[d.id]];
      if(p.key==='gozanze-s') {
        if(d.id==='center') attributes.splice(0,attributes.length,'制底','橫三股杵');
        if(['east','south','west','north'].includes(d.id)) {
          if(d.id==='east') attributes.splice(0,attributes.length,'疊金剛','橫三股杵');
          else attributes.push('橫三股杵');
        }
        if(d.id==='fugen') attributes.splice(0,attributes.length,'羯磨杵');
        if(d.id==='p-ho') attributes.splice(0,attributes.length,'法輪');
        if(d.id==='p-hou') attributes.splice(0,attributes.length,'蓮華','金剛杵');
        if(d.id==='p-katsu') attributes.splice(0,attributes.length,'羯磨杵');
      }
      observation=symbol(attributes);
      observation.formVariant=p.key==='gozanze-s'?'降三世三昧耶形':'三昧耶形';
      iconography=ref('下',p.key==='sammaya'?364:509,`${names[p.key]}現圖印相`,{figurePage:samayaFigurePage(d.number)+(p.key==='sammaya'?0:143),figureVolume:'下'});
      note=`此席畫三昧耶器形，非人物；標幟按本會圖與正文核讀。降三世三昧耶會的橫三股杵及薩埵羯磨形不借作成身會人物。`;
    } else if(p.key==='misai') {
      observation.enclosure='vajra';
      iconography=ref('下',387,'微細會現圖尊容',{figurePage:samayaFigurePage(d.number)+22,figureVolume:'下'});
      note+=' 下冊387頁明言現圖各尊作成身之形而居金剛杵內；未採《五部心觀》改為胸前標幟的另一式。';
    } else if(p.key==='kuyo') {
      iconography=ref('下',418,'供養會現圖尊容',{figurePage:d.number<=25?425+Math.floor((d.number-1)/5):d.number<=29?430:d.number<=33?431:432,figureVolume:'下'});
      if([1,6,11,16,21].includes(d.number)) {
        observation.kind='buddha';
        observation.color=null;
        note='本會五佛依下冊425–429頁實圖：佛身、各自本印；大日無寶冠而結智拳，不能套菩薩形大日或一律捧蓮。';
      } else {
        observation={...figure(),attributes:['蓮華',...samaya[d.id]],mudra:'雙手捧蓮承本標幟',offering:true,color:null,formVariant:d.number>=2&&d.number<=5?'女形':'男形'};
        note='下冊417頁區分現圖與《五部心觀》：現圖四波羅蜜以外為男尊；418頁及425–432頁圖示菩薩雙手捧蓮承本標幟，故印相不借成身。';
      }
    } else if(p.key==='gozanze') {
      iconography=ref('下',d.number<=5?489:491,'降三世會現圖尊容',{figurePage:d.number<=25?499+Math.floor((d.number-1)/5):d.number<=29?504:d.number>=34?505:null,figureVolume:'下'});
      if(d.id==='fugen') {
        observation={kind:'wrath',heads:null,visibleHeads:3,arms:8,pose:'standing',attributes:[],mudra:'胸前交叉忿怒拳',color:null,mount:'踏大自在天與烏摩',formVariant:'降三世忿怒薩埵'};
        note='下冊491頁明言現圖仅阿閦前之薩埵現降三世相；500頁圖可見三面八臂，雙足踏二天。正面圖不證總面數，故heads留空、visibleHeads=3；持物細小未強定。';
      } else if(d.number>=6&&d.number<=25) {
        observation={...figure(d.observation.kind),attributes:[],mudra:'交叉忿怒拳',formVariant:'交叉忿怒拳'};
        note='下冊491–492頁及500–503頁：四佛及其餘親近尊為一面二臂坐姿，雙手交叉忿怒拳；圖旁小標幟作伴置，不誤作持在掌中的成身持物。';
      } else if(d.number>=30) {
        observation={...figure(),attributes:[...samaya[d.id]],mudra:'交叉忿怒拳持本標幟',formVariant:'忿怒供養'};
        note='下冊492頁明記外四供養、四攝及賢劫尊結忿怒拳持各自三昧耶形；四攝之坐姿一面二臂另見505頁。';
      } else note='下冊489頁中央大日及四波羅蜜與成身同；492頁、504頁內四供養印亦與成身同。此相同有本會文字依據。';
    }
    add(p.key,`n${String(d.number).padStart(2,'0')}`,d.name,corePosition(p,d.number),[62,73],observation,panelSource(p,{iconographyPage:iconography.page,iconographyVolume:iconography.volume,figurePage:iconography.figurePage,figureVolume:iconography.figureVolume,references:[iconography]}),{canonicalId:d.id,bookNumber:d.number,note});
  }
  // 四大神在37尊外另編38–41；名字相同也不併入外金剛二十天。
  const supports=[['地天','東北',1,1],['水天','西南',-1,-1],['火天','東南',-1,1],['風天','西北',1,-1]];
  supports.forEach(([name,direction,x,y],i)=>{
    const asRing=p.key!=='jojin';
    const observation=asRing?symbol(['圓輪','蓮瓣']):{kind:'deva',heads:1,arms:2,pose:'half-body',attributes:[],mudra:'承托',formVariant:'承托半身'};
    add(p.key,`n${38+i}`,name,[p.cx+x*264,p.cy+y*310],[92,98],observation,panelSource(p,{iconographyPage:asRing?assemblyPhotoPage[p.key]:352,iconographyVolume:asRing?'下':'上',references:[ref('上',284,'四大神方位'),asRing?ref('下',assemblyPhotoPage[p.key],`${names[p.key]}現圖四隅圓輪`):ref('上',352,'四大神半身圖')]}),{bookNumber:38+i,group:'supporting-devas',direction,note:asRing?`本會四隅依下冊${assemblyPhotoPage[p.key]}頁現圖為蓮瓣圓輪；尊名依本會38–41名表，非把成身四大神的人身移植到此會。`:'上冊284頁定四隅方位，352頁專圖為一面二臂承托半身；坐立未記，不加坐佛下身。'});
  });
  if(p.key!=='jojin') sages.forEach(([name,attributes],i)=>{
    let observation=isSamaya?symbol([...attributes]):figure('bodhisattva',{heads:null,visibleHeads:1,arms:null,pose:'seated',attributes:[...attributes]});
    if(p.key==='gozanze') observation.mudra='忿怒拳持本標幟';
    const source=panelSource(p,{iconographyPage:i<8?365:366,iconographyVolume:'下',figurePage:assemblyPhotoPage[p.key],figureVolume:'下',references:[ref('下',i<8?365:366,'賢劫十六尊現圖標幟與座位'),ref('下',assemblyPhotoPage[p.key],`${names[p.key]}現圖周帶人物／器形`)]});
    add(p.key,`n${42+i}`,name,edgePoint(p.ring,Math.floor(i/4),[.165,.335,.665,.835][i%4]),[60,72],observation,source,{bookNumber:42+i,group:'bhadrakalpa-sixteen',note:`本會名表第${42+i}；持物取下冊${i<8?365:366}頁「現圖」欄，不取《十六尊軌》異式。${isSamaya?'本會現圖為器形。':`下冊${assemblyPhotoPage[p.key]}頁本會周帶可讀單個可見頭、坐姿；總面臂未足逐数，記visibleHeads而不臆填總數。`}${i===9?'書位圖重印50之第二席依名表校為51賢護。':''}`});
  });
  devas.forEach(([name,color,attributes,rightHand,leftHand,page,formVariant,alternativeNames],i)=>{
    const number=(p.key==='jojin'?42:58)+i;
    const observation=isSamaya?symbol([...attributes]):{kind:'deva',heads:p.key==='jojin'?1:null,visibleHeads:1,arms:p.key==='jojin'?2:null,pose:'seated',attributes:[...attributes],color,rightHand,leftHand,mudra:null,mount:'荷葉座',formVariant:formVariant??null};
    const photo=p.key==='jojin'?colorPlate:ref('下',assemblyPhotoPage[p.key],`${names[p.key]}現圖外周`);
    add(p.key,`n${number}`,name,edgePoint(p.outer,Math.floor(i/5),[.1,.3,.5,.7,.9][i%5]),[56,69],observation,panelSource(p,{iconographyPage:page,iconographyVolume:'上',observationSource:photo,references:[ref('上',page,'外金剛二十天現圖／秘藏記形像對照'),ref('上',334,'現圖二十天荷葉座'),photo]}),{bookNumber:number,group:'outer-twenty-devas',alternativeNames:alternativeNames??[],note:`本會外金剛部第${number}席；名位依本會編號圖，標幟據上冊${page}頁。現圖取荷葉座，不混用同頁慶喜藏釋的獸座、多面多臂。${p.key==='jojin'?'一面二臂坐輪廓逐邊覆核卷首成身會彩版（上PDF11，無印碼）。':isSamaya?'本會取器形。':`下冊${assemblyPhotoPage[p.key]}頁本會外周可讀單個可見頭、坐輪廓；未把成身彩版的總臂數移來。`}${i===2?'書內印作金剛推天；不逕用通行摧字改書。':''}`});
  });
  if(p.key==='jojin') {
    let ordinal=0;
    // 每方250＝兩段×25列×5行；避開正門及隅供養。序號只是本站圖內序。
    for(let edge=0;edge<4;edge++) for(let half=0;half<2;half++) for(let row=0;row<5;row++) for(let col=0;col<25;col++) {
      ordinal++;
      const f=(half===0?.08:.56)+(col+.5)*.36/25;
      const [x,y]=edgePoint(p.ring,edge,f), inward=18+(row+.5)*9;
      const delta=[[0,-inward],[inward,0],[0,inward],[-inward,0]][edge];
      add('jojin',`bhadra-${String(ordinal).padStart(4,'0')}`,`賢劫千佛・第${ordinal}席`,[x+delta[0],y+delta[1]],[7,9],figure('buddha',{mudra:'合掌',formVariant:'千佛共同合掌相'}),ref('上',317,'現圖賢劫千佛合掌',{positionPage:342,positionVolume:'上'}),{group:'bhadrakalpa-thousand',ordinalNumber:ordinal,nameType:'diagram-ordinal',positionStatus:'regular-schematic',note:'書記賢劫千佛、東寺高雄本皆合掌；此為依數展開的規整示意席，號碼僅供圖內檢索，不是經典佛名、原圖逐像識別或照片坐標。'});
    }
  }
  if(p.key==='gozanze') {
    const consorts=[['陪羅嚩','東南','金剛藥叉'],['吉祥天','西南','軍荼利'],['辯才天','西北','大威德'],['僑履','東北','不動']];
    consorts.forEach(([name,direction,other],i)=>add('gozanze',`consort-${i+1}`,`${name}明妃`,corners(p.outer)[i],[66,78],{kind:'deva',heads:null,arms:null,pose:'unknown',attributes:[],formVariant:'明妃'},ref('下',494,'降三世會四隅尊校辨',{positionPage:494,positionVolume:'下',references:[ref('下',498,'諸尊名表第78–81之異說')]}),{bookNumber:78+i,direction,alternativeNames:[`${other}明王（名表第${78+i}；其方位未定）`],alternativeIdentityGroup:'four-kings',alternativeNamePositionStatus:'unassigned',positionStatus:'textual-sector',note:`正文494頁判${direction}為${name}明妃，並說四大明王說未得當；498頁名表卻列${other}。採正文主張，不加算兩說；名表四明王只按表次附記供比較，並非證明此明王在本隅。此四席的方隅據正文，497編號圖未畫78–81，故位置不是該圖精確點。` }));
  }
}

// 四印會：五人身、八三昧耶形；外角杵與門蓮為莊嚴標幟，另表、不算13尊。
const shiinPositions={center:[585,660],fugen:[585,941],kokuzo:[326,654],kannon:[585,404],'k-gyo':[857,651],'p-kon':[371,901],'p-ho':[368,451],'p-hou':[790,451],'p-katsu':[790,901],'g-ki':[268,1075],'g-man':[260,304],'g-ka':[941,302],'g-bu':[943,1070]};
const shiinIds=['center','p-kon','p-ho','p-hou','p-katsu','fugen','kokuzo','kannon','k-gyo','g-ki','g-man','g-ka','g-bu'];
shiinIds.forEach((id,i)=>{
  const d=coreById[id];
  const isFigure=i===0||(i>=5&&i<=8);
  let observation=isFigure?{...d.observation,attributes:[...d.observation.attributes]}:symbol([...samaya[id]]);
  if(id==='k-gyo') observation=figure('bodhisattva',{attributes:['羯磨杵'],rightHand:'羯磨杵',leftHand:'拳',formVariant:'四印會業菩薩'});
  if(id==='p-ho') observation=symbol(['焰寶']);
  if(id==='p-katsu') observation=symbol(['羯磨杵']);
  add('shiin',`n${i+1}`,d.name,shiinPositions[id],isFigure?[175,205]:[108,125],observation,ref('下',451,'四印會座位圖與十三尊名',{positionPage:451,positionVolume:'下',figurePage:i===0?452:i<=4?455:i<=6?453:i<=8?454:456,figureVolume:'下'}),{canonicalId:id,bookNumber:i+1,note:'下冊446–447、451–456頁：中央及四方五尊為人物，四波羅蜜及內四供養為器形。四方菩薩依本會圖；業菩薩持羯磨杵，非成身會合掌舉頂。'});
});
add('ichiin','n1','毗盧遮那如來',[1558,682],[505,555],figure('bodhisattva',{mudra:'智拳印',formVariant:'寶冠菩薩形'}),ref('下',464,'一印會現圖尊容',{figurePage:465,figureVolume:'下'}),{canonicalId:'center',bookNumber:1,note:'下冊464頁現圖一印會結智拳；一尊，不把周邊蓮葉莊嚴另計尊位。'});

// 理趣十七尊：來源專屬，中央薩埵與四親近絕不借成身同名者之手勢。
const rishuRows=[
  ['金剛薩埵','fugen',[2525,665],['五股杵','鈴'],'右手擲杵、左手持鈴',476],
  ['金剛嬉菩薩','g-ki',[2150,1086],[],'雙拳腰側',481],
  ['金剛鬘菩薩','g-man',[2150,257],['華鬘'],'捧鬘',481],
  ['金剛歌菩薩','g-ka',[2910,257],['箜篌'],'奏樂',481],
  ['金剛舞菩薩','g-bu',[2910,1086],[],'舞印',481],
  ['意生金剛女','r-yoku-nyo',[2310,909],['花形持物'],'捧持',479],
  ['計里吉羅金剛女','r-soku-nyo',[2310,418],['蓮華器'],'捧持',479],
  ['愛樂金剛女','r-ai-nyo',[2740,418],['燈形持物'],'捧持',480],
  ['意氣金剛女','r-man-nyo',[2740,909],['盤形持物'],'捧持',480],
  ['金剛鉤菩薩','s-ko',[2525,1086],['鉤'],'持鉤',482],
  ['金剛索菩薩','s-saku',[2150,665],['索'],'持索',482],
  ['金剛鎖菩薩','s-sa',[2525,257],['鎖'],'持鎖',482],
  ['金剛鈴菩薩','s-rei',[2910,665],['鈴'],'持鈴',482],
  ['欲金剛菩薩','r-yoku',[2525,907],['花箭'],'持花箭',477],
  ['觸金剛菩薩','r-soku',[2310,666],['五股杵'],'抱杵',477],
  ['愛金剛菩薩','r-ai',[2525,418],['摩竭魚幢'],'持摩竭魚幢',478],
  ['慢金剛菩薩','r-man',[2740,666],[],'雙拳腰側',478],
];
rishuRows.forEach(([name,id,xy,attributes,mudra,figurePage],i)=>add('rishu',`n${i+1}`,name,xy,i===0?[158,183]:[110,132],figure('bodhisattva',{attributes,mudra,formVariant:i>=5&&i<=8?'女形':'理趣會'}),ref('下',475,'理趣會十七尊座位與名表',{positionPage:475,positionVolume:'下',figurePage,figureVolume:'下',references:[ref('下',472,'理趣會現圖尊容'),ref('下',figurePage,'理趣會尊形圖')]}),{canonicalId:id,bookNumber:i+1,note:i>=5&&i<=8?'四女尊名字與位置據475頁；一面二臂坐像及持物外形據479–480頁。花形、燈形等保留可見外形稱呼，未把模糊細物強定為另一儀軌名。':'理趣會專圖一面二臂坐相；薩埵擲杵、欲持花箭、觸抱杵、愛持魚幢、慢雙拳腰，各依472–474及476–482頁。'}));

export const BOOK_KONGO_ORNAMENTS = [
  ...corners([210,245,970,1100]).map((xy,i)=>({assembly:'shiin',key:`outer-vajra-${i}`,u:xy[0]/W,v:xy[1]/H,attributes:['金剛杵'],source:ref('下',447,'四印會外角外供養標幟'),countAsSeat:false})),
  ...[[585,270],[240,660],[585,1100],[970,660]].map((xy,i)=>({assembly:'shiin',key:`gate-lotus-${i}`,u:xy[0]/W,v:xy[1]/H,attributes:['蓮華'],source:ref('下',447,'四印會四門四攝標幟'),countAsSeat:false})),
];
export const BOOK_KONGO_SEATS = seats;
export const BOOK_KONGO_COUNTS = Object.fromEntries(Object.keys(names).map(key=>[key,seats.filter(s=>s.assembly===key).length]));
