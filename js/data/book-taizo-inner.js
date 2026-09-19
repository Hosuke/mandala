// 吳信如主編《曼荼羅之研究》上冊，內十一院配置圖之逐席轉錄。
// 圖表編號為穩定席鍵；全圖座標採東上、南右、北左、西下。
// 坐標保留配置圖相鄰關係，院幅按全圖顯示縮放；並非掃描圖像素量測。
// null 表示本次所引段落、圖版未確定該細相，絕不預設二臂。
import { byId } from './deities.js';

const seats = [];
const pageRef = (page, section) => ({ volume: '上', page, pdfPage: page + 29, section });
const body = (page, attributes = [], extra = {}) => ({
  page, heads: 1, arms: 2, pose: 'seated', attributes, ...extra,
});
function court(key, title, page, names, locations, details = {}, canonical = {}) {
  if (names.length !== locations.length) throw new Error(`${key}: name/location mismatch`);
  names.forEach((name, index) => {
    const number = index + 1;
    const detail = details[number] || {};
    const { page: figurePage, note = '', ...traits } = detail;
    const [u, v, w = 0.034, h = 0.037] = locations[index];
    const canonicalId = canonical[number] || null;
    if (canonicalId && !byId[canonicalId]?.t) throw new Error(`${key}:${number}: canonical lacks t face`);
    const observation = { kind: 'bodhisattva', heads: null, arms: null, pose: null, attributes: [], ...traits };
    const missing = observation.kind !== 'symbol' && [observation.heads, observation.arms, observation.pose].some(x => x === null);
    seats.push({
      seatId: `t:${key}:${String(number).padStart(2, '0')}`,
      key: String(number), realm: 't', side: 't', court: key, name, canonicalId,
      u, v, w, h, observation,
      form: observation.kind === 'symbol' ? 'samaya' : 'figure',
      source: { ...pageRef(page, `${title}諸尊位圖`), figureNumber: number },
      ...(figurePage ? { iconographySource: pageRef(figurePage, `${title}尊容／說明`) } : {}),
      identityStatus: 'text-attested', reviewStatus: 'source-checked',
      evidence: 'wu-xinru-2011-upper',
      note: `依上冊第 ${page} 頁配置圖第 ${number} 號定名、定相對席次。${figurePage ? `尊容據第 ${figurePage} 頁。` : ''}${note}${missing ? '未由所引圖文確定之面、臂或姿態留空；名位已據圖表核對。' : ''}`,
    });
  });
}
const positions = (count) => Array(count);
function putRow(locations, ids, left, right, v, w = 0.028, h = 0.03) {
  ids.forEach((id, i) => { locations[id - 1] = [ids.length > 1 ? left + (right - left) * i / (ids.length - 1) : left, v, w, h]; });
}

court('chudai', '中台八葉院', 137,
  ['毗盧遮那如來', '寶幢如來', '開敷華王如來', '無量壽如來', '天鼓雷音如來', '普賢菩薩', '文殊師利菩薩', '觀自在菩薩', '彌勒菩薩'],
  [[.5,.515,.065,.065], [.5,.423,.057,.057], [.604,.515,.057,.057], [.5,.607,.057,.057], [.396,.515,.057,.057], [.575,.450,.052,.052], [.575,.580,.052,.052], [.425,.580,.052,.052], [.425,.450,.052,.052]],
  {
    1: body(138, [], { kind:'buddha', mudra:'法界定印', appearance:'寶冠瓔珞' }),
    2: body(139, [], { kind:'buddha', rightHand:'與願印', appearance:'半肩法衣' }),
    3: body(140, [], { kind:'buddha', rightHand:'施無畏印', appearance:'通肩法衣', note:'右手印名另據第134頁正文；圖中掌向下，保留原圖手勢差別。' }),
    4: body(141, [], { kind:'buddha', mudra:'定印', appearance:'通肩法衣' }),
    5: body(142, [], { kind:'buddha', rightHand:'觸地印', appearance:'半肩法衣' }),
    6: body(143, ['蓮上三鈷劍'], { leftHand:'持蓮上劍', rightHand:'三業妙善印' }),
    7: body(145, ['般若經','蓮上五股杵'], { rightHand:'持般若經', leftHand:'持蓮上五股杵' }),
    8: body(144, ['開敷蓮華'], { rightHand:'持開敷蓮華', leftHand:'施無畏印', note:'西北葉；第127頁辨明現圖觀音、彌勒與舊圖互換。' }),
    9: body(146, ['蓮上澡瓶'], { rightHand:'持蓮上澡瓶', leftHand:'施無畏印', note:'東北葉，依本書現圖。' }),
  }, { 1:'center',2:'east',3:'south',4:'west',5:'north',6:'fugen',7:'monju',8:'kannon',9:'miroku' });

court('jimyo', '持明院', 151,
  ['般若菩薩','大威德明王','勝三世明王','降三世明王','不動明王'],
  [[.5,.692,.052,.058],[.433,.692,.052,.058],[.367,.692,.052,.058],[.567,.692,.052,.058],[.633,.692,.052,.058]],
  {
    1: body(152, ['般若經'], { arms:6, rightHand:'說法、三鈷印、與願', leftHand:'般若經、三鈷印、三摩地', appearance:'甲冑', note:'六臂各手說明另據第149頁；非忿怒形。' }),
    2: body(153, ['劍','三叉戟','寶棒','輪'], { kind:'wrath', heads:6, arms:6, mount:'磐石座', note:'圖見六面六臂及六足；未用常見乘牛式代換。' }),
    3: body(154, ['金剛杵','三叉戟','弓','箭','劍','索'], { kind:'wrath', heads:3, arms:8, mudra:'胸前交臂結印', note:'依本頁圖題「勝三世」及所繪三面八臂；第148頁腳注以勝三世稱二臂、降三世稱八臂，兩處不一致，保留圖題而不隱去異文。' }),
    4: body(155, ['三叉戟','三鈷'], { kind:'wrath', rightHand:'持三叉戟', leftHand:'持三鈷', mount:'磐石座', note:'依本頁「降三世金剛菩薩」圖之一面二臂；名相異文見第148頁腳注。' }),
    5: body(156, ['利劍','羂索'], { kind:'wrath', rightHand:'持利劍', leftHand:'持羂索', mount:'磐石座' }),
  }, { 1:'hannya',2:'daiitoku',4:'gozanze-t',5:'fudo' });

court('henchi', '遍知院', 165,
  ['一切如來智印（三角印）','佛眼佛母','大勇猛菩薩','七俱胝佛母（準胝）','大安樂不空真實菩薩','優樓頻螺迦葉','伽耶迦葉'],
  [[.5,.337,.048,.053],[.433,.337,.045,.052],[.567,.337,.045,.052],[.367,.337,.05,.052],[.633,.337,.05,.052],[.533,.299,.019,.025],[.467,.299,.019,.025]],
  {
    1: {page:166,kind:'symbol',heads:0,arms:0,pose:null,attributes:['三角智印','火焰','卍字','蓮座'],note:'本席為三昧耶標幟，不計作人形尊像。'},
    2: body(167, [], { mudra:'三摩地印', color:'赤衣', note:'衣色據第162頁文字，不由黑白圖猜色。' }),
    3: body(168, ['三鈷劍','如意寶珠'], { rightHand:'持三鈷劍',leftHand:'持如意寶珠' }),
    4: body(169, ['劍','蓮華','念珠','三叉戟','梵篋','寶瓶'], { arms:18, note:'十八臂明載第163頁；持物僅錄圖可確辨者，未冒充十八手完整逐手配置。' }),
    5: body(170, ['金剛杵','劍','蓮華','寶珠','弓','箭','輪','鈴'], { arms:20, note:'二十臂據第164頁，十六尊與四攝三昧耶總集；列物非逐手全錄。' }),
    6: body(166, [], { kind:'monk',mudra:'合掌',mount:'草座',note:'名依圖表；第164頁明說二迦葉身份屬作者所取之說。' }),
    7: body(166, [], { kind:'monk',mount:'草座',note:'名依圖表；與優樓頻螺迦葉分席，不補書中省去之那提迦葉。' }),
  }, {1:'henchi',2:'butsugen',4:'shichikutei'});

const kongoshu = positions(33);
[[2,8,15],[3,9,16],[4,10,17],[1,11,18],[5,12,19],[6,13,20],[7,14,21]].forEach((ids,r) => putRow(kongoshu,ids,.688,.806,.316+r*.066,.038,.045));
[[23,.718,.500],[26,.777,.500],[30,.830,.500],[24,.718,.566],[27,.777,.566],[31,.830,.566],[22,.663,.632],[25,.718,.632],[28,.777,.632],[32,.830,.632],[29,.777,.698],[33,.830,.698]].forEach(([id,u,v])=>{kongoshu[id-1]=[u,v,.019,.023];});
court('kongoshu','金剛手院',177,
  ['金剛薩埵','發生金剛部菩薩','金剛鉤女菩薩','金剛手持（忙莽雞）菩薩','持金剛鋒菩薩（金剛針）','金剛拳菩薩','忿怒月黶菩薩','虛空無垢持金剛菩薩','金剛牢持菩薩','忿怒持金剛菩薩','虛空無邊超越菩薩','金剛鎖菩薩','金剛持菩薩','持金剛利菩薩','金剛輪持菩薩','金剛說菩薩','懌悅持金剛菩薩','金剛牙菩薩','離戲論菩薩','持妙金剛菩薩','大輪金剛菩薩','金剛使者','金剛使者','金剛軍荼利','金剛鉤女','金剛使者','大力金剛','金剛童子','孫婆菩薩','金剛使者','金剛拳','金剛使者','金剛王菩薩'], kongoshu,
  {
    1: body(179,['金剛杵'],{rightHand:'持金剛杵',leftHand:'金剛拳'}),
    2: body(180,['獨鈷'],{mudra:'定印',note:'獨鈷義據第173頁，圖雙手置膝。'}),
    3: body(180,['金剛鉤'],{leftHand:'持金剛鉤',rightHand:'與願印'}),
    4: body(180,['金剛'],{leftHand:'持金剛',rightHand:'與願印'}),
    5: body(180,['金剛鋒'],{rightHand:'持金剛鋒',leftHand:'金剛拳'}),
    6: body(181,['十字杵'],{rightHand:'持十字杵',leftHand:'金剛拳'}),
    7: body(181,['三叉戟','獨鈷'],{kind:'wrath',arms:4,mudra:'第一雙忿怒拳胸前交叉',color:'綠色',note:'四臂持物據第174頁，綠色另見第187頁與馬頭尊對比。'}),
    10: {kind:'wrath'},
    12: body(181,['金剛鎖'],{note:'圖見右膝豎起；名稱「鎖」由配置圖舊字鏁正規化。'}),
    16: {page:176,note:'本書特辨「說」為正、「銳」為傳寫誤字。'},
    17: {page:176,note:'名表及第178頁尊名對勘作「懌悅持金剛」；不依低解析 OCR 誤作怛悅。'},
    18: body(181,['蓮上金剛牙'],{leftHand:'持蓮上金剛牙',rightHand:'胸前結印'}),
  }, {1:'kongosatta-t',3:'kongoko-nyo',4:'mamaki',5:'kongoshin',6:'k-ken'});

const renge = positions(37);
[[15,8,2],[16,9,3],[17,10,4],[18,11,1],[19,12,5],[20,13,6],[21,14,7]].forEach((ids,r)=>putRow(renge,ids,.194,.312,.316+r*.066,.038,.045));
[[27,.206,.361],[28,.219,.339],[29,.234,.361],[34,.169,.500],[30,.224,.500],[23,.283,.500],[35,.169,.566],[31,.224,.566],[24,.283,.566],[36,.169,.632],[32,.224,.632],[25,.283,.632],[22,.309,.632],[37,.169,.698],[33,.224,.698],[26,.283,.698]].forEach(([id,u,v])=>{renge[id-1]=[u,v,.018,.023];});
court('renge','蓮華部院（觀音院）',190,
  ['聖觀自在菩薩','蓮華部發生菩薩','大勢至菩薩','毘俱胝菩薩','多羅菩薩','大明白身菩薩','馬頭明王菩薩','大隨求菩薩','窣堵波大吉祥菩薩','耶輸陀羅菩薩','如意輪觀音','大吉祥大明菩薩','大吉祥明菩薩','寂留明菩薩','披葉衣觀音','白身觀自在菩薩','豐財菩薩','不空羂索觀音','水吉祥菩薩','大吉祥變菩薩','白處尊菩薩','多羅使者','奉教使者','蓮華軍荼利','鬘供養','蓮華部使者','蓮華部使者','蓮華部使者','蓮華部使者','蓮華部使者','寶供養','燒香菩薩','蓮華部使者','蓮華部使者','蓮華部使者','塗香菩薩','蓮華部使者'], renge,
  {
    1: body(191,['蓮華'],{leftHand:'持蓮',rightHand:'開敷蓮華勢'}),
    2: body(193,['開敷蓮華'],{leftHand:'持開敷蓮華',rightHand:'屈無名指、舒餘四指'}),
    3: body(193,['半開蓮華'],{leftHand:'持半開蓮華',rightHand:'胸前結印',note:'第185頁明辨東寺本右手不持山王院本之三叉戟。'}),
    4: body(192,['念珠','開敷蓮華','甘露瓶'],{arms:4,rightHand:'念珠、與願',leftHand:'蓮華、甘露瓶',note:'依第184頁及圖為慈眼菩薩形，非以名稱臆作忿怒形。'}),
    5: body(192,[],{mudra:'合掌',note:'第186頁明記東寺本作合掌，未套用異本持青蓮式。'}),
    6: body(192,['開敷蓮華'],{leftHand:'持開敷蓮華',rightHand:'與願印',color:'白色'}),
    7: body(187,[],{kind:'wrath',heads:3,arms:2,mudra:'大馬口印',color:'赤色',note:'三面二臂及印相明载本頁；第192頁附圖為正面圖，不據側面省略改成一面。'}),
    10: body(193,['枝葉'],{leftHand:'持枝葉',note:'圖見一膝豎起；未把枝葉強定植物品種。'}),
    15: {page:189,note:'正文作披葉衣，配置名表作被葉衣；本名取正文、席次仍依圖表。'},
    16: {page:189,note:'配置名表作白身觀自在；正文列舉作白衣觀自在，保存名差，不與第6大明白身合併。'},
    21: body(193,['蓮華'],{leftHand:'持蓮華',rightHand:'與願印'}),
    25: {attributes:['鬘']},31:{attributes:['寶']},32:{attributes:['香爐']},36:{attributes:['塗香']},
  }, {1:'sho-kannon',3:'seishi',4:'bikuchi',5:'tara',7:'bato',16:'byakue'});

const shaka = positions(39);
shaka[0]=[.5,.222,.052,.06];
shaka[1]=[.535,.207,.021,.031];shaka[2]=[.465,.207,.021,.031];
shaka[3]=[.465,.247,.021,.027];shaka[4]=[.535,.247,.021,.027];
putRow(shaka,[22,21,20,19,18,17,16,15,14],.180,.430,.199,.025,.031);
putRow(shaka,[31,32,33,34,35,36,37,38,39],.570,.820,.199,.025,.031);
putRow(shaka,[13,12,11,10,9,8,7,6],.186,.430,.247,.027,.032);
putRow(shaka,[23,24,25,26,27,28,29,30],.570,.814,.247,.027,.032);
court('shaka','釋迦院',196,
  ['釋迦牟尼佛','觀自在菩薩','虛空藏菩薩','無能勝妃','無能勝明王','一切如來寶','如來毫相菩薩','大轉輪佛頂','高佛頂','無量音聲佛頂','如來悲菩薩','如來愍菩薩','如來慈菩薩','如來爍乞底','旃檀香辟支佛','多摩羅香辟支佛','目犍連','須菩提','迦葉波','舍利弗','如來喜菩薩','如來捨菩薩','白傘蓋佛頂','勝佛頂','最勝佛頂','光聚佛頂','摧碎佛頂','如來舌菩薩','如來語菩薩','如來笑菩薩','如來牙菩薩','輪輻辟支佛','寶輻辟支佛','拘絺羅','阿難','摩訶迦旃延','優波離','智拘絺羅菩薩','供養雲海菩薩'], shaka,
  {
    1: body(197,[],{kind:'buddha',mudra:'說法印',appearance:'半肩法衣'}),
    2: body(197,['白拂'],{pose:'standing',rightHand:'持白拂'}),
    3: body(197,['白拂','蓮華'],{pose:'standing',rightHand:'持白拂',leftHand:'持蓮華'}),
    4: body(197,['三叉戟'],{kind:'wrath',arms:4,pose:'standing',note:'尊名及位置依第196頁；第197頁附圖與配置圖左右相反，未用附圖移席。'}),
    5: body(197,[],{kind:'wrath',pose:'standing',note:'配置圖居中央佛之右下；附圖左右反向，分別保留其名位與形。'}),
    6: body(198,['蓮上寶珠'],{leftHand:'持蓮上寶珠',rightHand:'胸前結印'}),
    7: body(198,['蓮上白毫'],{leftHand:'持蓮上白毫',rightHand:'三摩地印'}),
    9: {page:195,note:'第196頁圖列此席為高佛頂；第195頁正文次序列光聚。依具體配置圖錄名，未把正文持物移植至異名席。'},
    16: body(198,[],{kind:'monk',appearance:'法衣'}),
    17: body(198,[],{kind:'monk',appearance:'法衣'}),
    18: body(199,[],{kind:'monk',appearance:'法衣'}),
    19: body(199,[],{kind:'monk',appearance:'法衣'}),
    20: body(199,[],{kind:'monk',mudra:'合掌',appearance:'法衣'}),
    21: body(199,['蓮華']),
    23: {page:195,attributes:['白傘蓋']},
    24: {page:195,attributes:['劍']},
    25: {page:195,attributes:['金輪']},
    26: {page:195,note:'配置圖稱光聚佛頂；正文五佛頂之第四稱高佛頂。依配置圖定名，持物不強移。'},
    27: {page:195,attributes:['蓮上鉤']},
    34: body(200,[],{kind:'monk',appearance:'法衣',mount:'荷葉座'}),
    35: body(200,[],{kind:'monk',mudra:'合掌',appearance:'法衣',mount:'荷葉座'}),
    36: body(200,[],{kind:'monk',appearance:'法衣',mount:'荷葉座'}),
    37: body(200,[],{kind:'monk',appearance:'法衣',mount:'荷葉座'}),
  }, {1:'shaka',2:'kannon',3:'kokuzo',5:'munosho',7:'gozo'});

const monju = positions(25);
monju[0]=[.5,.126,.044,.049];
monju[1]=[.466,.106,.020,.025];monju[2]=[.534,.106,.020,.025];
monju[3]=[.466,.149,.020,.025];monju[4]=[.534,.149,.020,.025];
putRow(monju,[10,9,8,7,6],.278,.425,.125,.025,.032);
putRow(monju,[16,17,18,19,20],.575,.722,.125,.025,.032);
[[11,.218,.125],[12,.249,.103],[13,.249,.149],[14,.185,.103],[15,.185,.149],[21,.782,.125],[22,.751,.103],[23,.751,.149],[24,.815,.103],[25,.815,.149]].forEach(([id,u,v])=>{monju[id-1]=[u,v,.022,.027];});
court('monju','文殊院',204,
  ['文殊菩薩','觀自在菩薩','普賢菩薩','不可越守護','相向守護','光網菩薩','寶冠菩薩','無垢光菩薩','月光菩薩','妙音菩薩','瞳母嚕','阿耳多','阿波羅耳多','肥者耶','者惹耶','髻設尼童子','優婆髻設尼童子','質怛羅童子','地慧童子','召請童子','不思議慧童子','文殊奉教者','文殊奉教者','文殊奉教者','文殊奉教者'],monju,
  {
    1: body(203,['青蓮上金剛杵'],{leftHand:'持青蓮上金剛杵',rightHand:'與願印',appearance:'五髻童子',note:'五髻、持物亦見第201頁。'}),
    2: body(203,['蓮華']),
    3: body(203,['蓮上三鈷'],{leftHand:'持蓮上三鈷',rightHand:'三業妙善印'}),
    4: body(203,['劍'],{rightHand:'持劍',leftHand:'金剛拳'}),
    5: body(203,['劍'],{leftHand:'持劍',rightHand:'胸前结印'}),
    6: body(205,['索','青蓮'],{rightHand:'持索',leftHand:'持青蓮'}),
    7: body(205,['寶珠','寶冠'],{rightHand:'持寶珠',leftHand:'持蓮上寶冠'}),
    8: body(205,['寶鉢','蓮華'],{rightHand:'持寶鉢',leftHand:'持蓮華'}),
    9: body(205,['青蓮','蓮華'],{note:'圖見雙手各持蓮莖；未由黑白图推測蓮色之外身色。'}),
    11:{page:203,kind:'deva',attributes:['青蓮'],note:'正文統述五尊持青蓮及獨股杵或金剛針，未細分每尊，故不逐手指定。'},
    12:{page:203,kind:'deva',attributes:['青蓮']},13:{page:203,kind:'deva',attributes:['青蓮']},
    14:{page:203,kind:'deva',attributes:['青蓮']},15:{page:203,kind:'deva',attributes:['青蓮']},
    16:{page:202,attributes:['青蓮','獨股杵'],appearance:'女性童子'},
    17:{page:202,attributes:['青蓮','獨股杵'],appearance:'女性童子'},
    18:{page:202,attributes:['青蓮','獨股杵'],appearance:'女性童子'},
    19:{page:202,attributes:['青蓮','獨股杵'],appearance:'女性童子'},
    20:{page:202,attributes:['青蓮','獨股杵'],appearance:'女性童子'},
    21:{page:202,attributes:['青蓮','獨股杵'],appearance:'女性使者'},
    22:{page:202,attributes:['青蓮','獨股杵'],appearance:'女性使者'},
    23:{page:202,attributes:['青蓮','獨股杵'],appearance:'女性使者'},
    24:{page:202,attributes:['青蓮','獨股杵'],appearance:'女性使者'},
    25:{page:202,attributes:['青蓮','獨股杵'],appearance:'女性使者'},
  }, {1:'gokei-monju',2:'kannon',3:'fugen',6:'komo',8:'mukuko'});

court('jokaisho','除蓋障院',211,
  ['悲愍慧菩薩（救意慧）','破惡趣菩薩','施無畏菩薩','賢護菩薩','不思議慧菩薩','悲愍菩薩（悲念）','慈發生菩薩','除一切熱惱菩薩','除蓋障菩薩'],
  Array.from({length:9},(_,i)=>[.868,.226+i*.068,.037,.046]),
  {
    1:body(212,[],{rightHand:'發起印',leftHand:'覆護印',note:'第209頁正文稱悲愍（救意慧），配置圖與圖版稱悲愍慧；依後二者，與第6席分列。'}),
    2:body(212,[],{rightHand:'與願印',leftHand:'發起印'}),
    3:body(212,[],{rightHand:'施無畏印',leftHand:'金剛拳'}),
    4:body(212,['獨鈷','寶瓶'],{rightHand:'持獨鈷',leftHand:'持寶瓶'}),
    5:body(213,['蓮上寶珠'],{rightHand:'劍印',leftHand:'持蓮上寶珠'}),
    6:body(213,['未敷蓮'],{leftHand:'持未敷蓮',note:'第209頁正文稱悲愍慧（悲念），配置圖與圖版稱悲愍；依後二者。'}),
    7:body(213,['合蓮'],{leftHand:'持合蓮',rightHand:'持華印',note:'第213頁圖題作悲發生，第211頁配置表及第209頁正文作慈發生（慈起），取後者。'}),
    8:body(213,['梵篋'],{leftHand:'持梵篋',rightHand:'與願印'}),
    9:body(210,['蓮上寶'],{leftHand:'持蓮上寶',rightHand:'向內施無畏印'}),
  },{6:'himin',9:'jokaisho'});

court('jizo','地藏院',216,
  ['除一切憂冥菩薩','不空見菩薩','寶印手菩薩（寶掌）','寶處菩薩（寶光）','地藏菩薩','寶手菩薩','持地菩薩','堅固深心菩薩','日光菩薩'],
  Array.from({length:9},(_,i)=>[.132,.226+i*.068,.037,.046]),
  {
    1:body(218,['枝葉'],{leftHand:'持枝葉'}),
    2:body(218,['蓮上人面標幟'],{leftHand:'持蓮上人面標幟',note:'圖見蓮上面相，未把標幟面像計入本尊面數。'}),
    3:body(218,['寶幢','圓輪'],{leftHand:'持蓮上寶幢',rightHand:'持圓輪'}),
    4:body(218,['蓮上三鈷'],{leftHand:'持蓮上三鈷',rightHand:'與願印'}),
    5:body(217,['蓮上寶幢','月輪'],{leftHand:'持蓮上寶幢',rightHand:'持月輪',note:'亦據第214頁；為寶冠菩薩形，未套用後世錫杖僧相。'}),
    6:body(219,['蓮上寶'],{leftHand:'持蓮上寶'}),
    7:body(219,['蓮上金剛'],{leftHand:'持蓮上金剛'}),
    8:body(219,['蓮華'],{rightHand:'持蓮華',leftHand:'置膝'}),
    9:body(219,['蓮上日輪'],{leftHand:'持蓮上日輪'}),
  },{4:'hosho-bo',5:'jizo'});

const kokuzo=positions(28);
kokuzo[0]=[.5,.795,.051,.056];
putRow(kokuzo,[6,5,4,3,2],.285,.450,.770,.030,.033);
putRow(kokuzo,[7,8,9,10,11],.550,.715,.770,.030,.033);
putRow(kokuzo,[15,14,13,12],.285,.450,.823,.031,.036);
putRow(kokuzo,[21,22,23,24,25],.550,.736,.823,.031,.036);
[[16,.215,.835,.049,.056],[17,.247,.867,.018,.026],[18,.182,.867,.018,.026],[19,.247,.805,.017,.021],[20,.182,.805,.017,.021],[26,.794,.835,.049,.056],[27,.770,.805,.017,.021],[28,.822,.805,.017,.021]].forEach(([id,...loc])=>{kokuzo[id-1]=loc;});
court('kokuzo','虛空藏院',224,
  ['虛空藏菩薩','檀波羅蜜菩薩','戒波羅蜜菩薩','忍辱波羅蜜菩薩','精進波羅蜜菩薩','禪波羅蜜菩薩','般若（慧）波羅蜜菩薩','方便波羅蜜菩薩','願波羅蜜菩薩','力波羅蜜菩薩','智波羅蜜菩薩','共發意轉輪菩薩','生念處菩薩','忿怒鉤觀音','不空鉤觀音','千手觀音','婆藪大仙','功德天','飛天','飛天','無垢逝菩薩','蘇婆呼菩薩','金剛針菩薩','蘇悉地羯羅菩薩','曼荼羅菩薩','一百八臂金剛藏王菩薩','飛天使者','飛天使者'],kokuzo,
  {
    1:body(225,['劍','蓮上寶珠'],{rightHand:'持劍',leftHand:'持蓮上寶珠'}),
    2:body(228,['寶珠'],{rightHand:'持寶珠'}),
    3:body(228,['蓮華'],{mudra:'雙手捧蓮華'}),
    12:body(226,['蓮上金輪','寶珠'],{rightHand:'持蓮上金輪',leftHand:'持寶珠'}),
    13:body(226,['商佉'],{rightHand:'持商佉'}),
    14:body(226,['鉤','索','蓮華'],{kind:'wrath',heads:3,arms:6,note:'三面六臂據圖；持物只錄可確辨類別，不補六手逐手次序。'}),
    16:body(222,[],{heads:27,arms:40,mudra:'胸前合掌',note:'正文明确二十七面四十臂；第227頁圖另展小手光背，四十為主臂數，不據尊名填1000個主臂。'}),
    17:body(227,['杖'],{kind:'deva',pose:'standing',appearance:'老仙形'}),
    18:body(227,[],{kind:'deva',pose:'standing',mudra:'合掌'}),
    19:{page:227,kind:'deva',heads:1,arms:2,pose:'flying',attributes:[],appearance:'飛行供養仙'},
    20:{page:227,kind:'deva',heads:1,arms:2,pose:'flying',attributes:[],appearance:'飛行供養仙'},
    21:body(226,['蓮華索'],{leftHand:'持蓮華索',rightHand:'與願印'}),
    22:body(228,['青蓮'],{leftHand:'持青蓮',rightHand:'與願印'}),
    23:body(228,['蓮上金剛'],{leftHand:'持蓮上金剛',rightHand:'與願印'}),
    25:{page:221,note:'正文釋作大輪，配置表名曼荼羅菩薩，仍按配置表立席。'},
    26:{page:221,kind:'bodhisattva',heads:16,arms:108,pose:null,attributes:[],note:'第221–222頁明記十六面一百八臂；所引頁未足定坐立及逐手持物。'},
    27:{page:224,kind:'deva',attributes:[],appearance:'飛天使者'},
    28:{page:224,kind:'deva',attributes:[],appearance:'飛天使者'},
  },{1:'kokuzo',16:'senju'});

court('soshitsuji','蘇悉地院',229,
  ['不空供養寶菩薩','孔雀王母','一髻羅剎','十一面觀音','不空金剛菩薩','金剛軍荼利','金剛將菩薩','金剛明王菩薩'],
  [[.459,.898],[.405,.898],[.351,.898],[.297,.898],[.541,.898],[.595,.898],[.649,.898],[.703,.898]],
  {
    1:body(230,['劍','三叉戟','蓮華','索'],{arms:4,note:'四臂及持物依本頁附圖；不用尊名推作一般供養雙手。'}),
    2:body(230,['孔雀尾','蓮華'],{rightHand:'持孔雀尾',leftHand:'持蓮華'}),
    3:body(230,['三叉戟','索'],{kind:'wrath',arms:6,note:'依本頁六臂忿怒像；未以他本一髻尊形代換。'}),
    4:body(230,['蓮華','瓶'],{heads:11,arms:4,rightHand:'施無畏、與願',leftHand:'蓮華、瓶'}),
    5:body(231,[],{mudra:'胸前結印',note:'依書圖為寶冠寂靜菩薩形。'}),
    6:body(231,[],{mudra:'胸前結印',note:'此院圖為一面二臂寶冠寂靜形，不套用他部軍荼利忿怒像。'}),
    7:body(231,[],{mudra:'胸前結印'}),
    8:body(231,[],{mudra:'胸前結印',note:'雖名明王，圖為一面二臂寶冠寂靜形，故不僅因名稱畫作忿怒。'}),
  },{4:'juichimen',6:'gundari'});

// 卷首圖沒有印刷頁碼，故另存 PDF 頁和原題，不冒充正文印刷頁。
// 只填逐圖可見的字段；細小眷屬未因鄰尊二臂而類推。
function plate(courtKey, numbers, pdfPage, traits, comment = '') {
  for (const number of numbers) {
    const seat = seats.find(s => s.court === courtKey && s.key === String(number));
    if (!seat) throw new Error(`plate seat missing: ${courtKey}:${number}`);
    Object.assign(seat.observation, traits);
    seat.visualSources = [...(seat.visualSources || []), {
      volume:'上', page:null, pdfPage,
      plate:pdfPage === 9 ? '東寺胎藏曼荼羅（部分）' : '胎藏曼荼羅（現圖）',
      section:`${courtKey} · 配置圖第${number}號對應位置`,
    }];
    seat.note += `另核卷首 PDF 第 ${pdfPage} 頁圖版之對應席。${comment}`;
    const obs = seat.observation;
    if ([obs.heads, obs.arms, obs.pose].every(x => x !== null)) {
      seat.note = seat.note.replace('未由所引圖文確定之面、臂或姿態留空；名位已據圖表核對。', '');
    }
  }
}
plate('kongoshu',[8,9,10,11,13,14,15,16,17,19,20,21],9,{heads:1,arms:2,pose:'seated'});
plate('kongoshu',[10],9,{kind:'bodhisattva'},'雖名忿怒持金剛，圖示寂靜寶冠相。');
plate('kongoshu',[22,30,32,33],9,{visibleHeads:1,pose:'seated'},'小眷屬可辨一個可見頭部及坐相；visibleHeads只記圖中所見，不斷定總面數，總面及臂數仍留空。');

// 蓮華部三列七行主尊。多臂形可見而各手未能分清者僅填坐相。
plate('renge',[9,12,13,14,15,16,19,20],5,{heads:1,arms:2,pose:'seated'});
plate('renge',[8,11,17,18],5,{heads:1,pose:'seated'},'彩版可见多臂輪廓，細手重疊，臂數仍留空，不按通行像式推填。');

// 釋迦院兩行主尊；圈位已由第196頁圖辨別，卷首補其可見坐相。
plate('shaka',[8,9,10,11,12,13,14,15,22,23,24,25,26,27,28,29,30,31,32,33,38,39],5,{heads:1,pose:'seated'});
plate('shaka',[8,9,10,11,12,13,15,22,23,24,25,26,27,28,29,30,32,33],5,{arms:2});
plate('shaka',[15,32,33],5,{kind:'monk',appearance:'法衣'},'辟支佛圖作出家相。');

plate('monju',[10,16,17,18,19,20,21],5,{heads:1,arms:2,pose:'seated'});
plate('monju',[11,12,13,14,15,22,23,24,25],5,{heads:1,pose:'seated'},'角隅小尊可辨頭部與坐相，手臂細節未足確定。');

plate('kokuzo',[4,5,6,7,8,9,10,11,15,24,25],5,{heads:1,arms:2,pose:'seated'});
plate('kokuzo',[26],5,{pose:'seated',color:'黑色'},'卷首清楚可見結跏坐姿；面臂數仍以第221–222頁明文為據。');
plate('kokuzo',[27,28],5,{heads:1,pose:'flying'},'兩端飛天姿態可辨；細臂不由低像素圖強數。');

export const BOOK_TAIZO_INNER = Object.freeze(seats);
