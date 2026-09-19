// 《曼荼羅之研究》上冊，印刷頁 232–262（PDF 261–291）。
// 四方位圖與名表逐席轉錄：東 40、南 62、西 49、北 52，合 203。
// 保留每方原圖序號；same name != same occurrence。座標為圖式重排，非壁畫像素。
// 圖示未收錄的細相明置 null；source-checked 指名位及已記細相有書據，不等同造像終審。

const ROSTERS = {
  east: [
    '伊舍那天','喜面天','常醉天','器手天后','器手天','堅牢地神后','堅牢地神',
    '非想天','無所有處天','識無邊處天','空無邊處天','惹耶','日天','微惹耶',
    '帝釋天','守門天','守門天女','守門天','守門天女','持國天','大梵天',
    '昴宿','畢宿','觜宿','參宿','鬼宿','井宿','柳宿','牛密宮','白羊宮',
    '夫婦宮（男）','夫婦宮（女）','彗星','流星','日曜','日曜眷屬','婆藪仙后',
    '婆藪大仙','火天后','火天',
  ],
  south: [
    '阿詣羅仙','阿詣羅仙后','瞿曇仙','瞿曇仙后','毘紐女','自在女','夜摩女',
    '賢瓶宮','摩羯宮','雙魚宮','羅睺星','木曜','火曜','星宿','軫宿','亢宿',
    '張宿','翼宿','角宿','氐宿','藥叉持明女','藥叉持明','藥叉持明女',
    '增長天','增長天使者','難陀龍王','烏波難陀龍王','阿修羅','阿修羅',
    '焰摩天','黑暗天女','太山府君','鬼眾','奪一切人命',
    '毘舍遮','毘舍遮','毘舍遮','毘舍遮','毘舍遮','毘舍遮','毘舍遮','毘舍遮',
    '荼吉尼','荼吉尼','荼吉尼','死鬼',
    '持明成就仙眾','持明成就仙眾','持明成就仙眾','持明成就仙眾',
    '摩尼阿修羅','摩尼阿修羅眷屬','摩尼阿修羅眷屬','阿修羅','阿修羅眷屬',
    '阿修羅眷屬','迦樓羅','迦樓羅','鳩槃荼','鳩槃荼','羅剎童','羅剎童',
  ],
  west: [
    '涅哩底王（羅剎天）','羅剎女','羅剎女','大自在天','大自在天妃','梵天女',
    '帝釋女','鳩摩利','遮文荼','摩拿赦（女）','摩拿赦（男）','水曜','土曜',
    '月曜','秤宮','蠍蟲宮','弓宮','女宿','牛宿','斗宿','尾宿','箕宿','房宿',
    '心宿','水天眷屬','水天','難陀龍王','烏波難陀龍王','對面天','難破天',
    '廣目天','水天','水天妃','水天妃眷屬','那羅延天','那羅延天妃','辯才天',
    '鳩摩羅天','月天','月天妃','鼓天','歌天','歌天','樂天','風天妃眷屬',
    '風天妃','風天眷屬','風天眷屬','風天',
  ],
  north: [
    '風天眷屬','風天眷屬','光音天女','光音天','光音天女','大光音天女',
    '大光音天','大光音天女','兜率天女','兜率天','兜率天女','他化自在天女',
    '他化自在天','他化自在天女','持鬘天女','持鬘天','持鬘天女',
    '成就持明天女','成就持明仙','成就持明仙女','摩睺羅迦','摩睺羅迦',
    '摩睺羅迦','緊那羅','緊那羅','歌天','樂天','歌天','帝釋天妃','帝釋天',
    '俱肥羅','俱肥羅女','難陀龍王','烏波難陀龍王','毘沙門天','成就持明仙',
    '成就持明仙女','虛宿','危宿','室宿','奎宿','壁宿','胃宿','婁宿',
    '少女宮','蟹宮','獅子宮','金曜','戰鬼','毘那夜迦（歡喜天）','摩訶迦羅',
    '伊舍那天妃',
  ],
};

// 圓點中心，依本書 1600px 頁面讀取。各半圖分別仿射轉換到同一東上全幅。
// 行序與上述名表一一對應；沒有按 203 等距補點。
const DOTS = {
  east: [
    [129,405],[169,399],[201,416],[231,399],[262,414],[293,400],[324,416],
    [367,401],[404,401],[440,401],[477,401],[529,415],[570,405],[611,415],
    [662,404],[728,390],[759,390],[790,390],[821,390],
    [248,735],[290,735],[337,750],[337,714],[376,714],[376,751],[416,737],
    [414,700],[452,758],[491,750],[501,714],[547,714],[557,748],[599,714],
    [603,748],[645,735],[679,713],[718,748],[731,713],[769,748],[809,730],
  ],
  south: [
    [626,550],[667,563],[625,613],[666,602],[624,691],[643,665],[661,692],
    [624,742],[660,743],[623,794],[660,794],[623,841],[659,842],[622,889],
    [639,866],[658,890],[621,940],[658,941],[621,986],[658,986],[620,1066],
    [638,1039],[657,1066],[619,1100],[656,1117],[619,1199],[656,1199],
    [619,1248],[656,1248],
    [282,626],[241,624],[281,667],[240,666],[220,711],[255,711],[293,711],
    [221,767],[247,739],[271,767],[300,740],[235,810],[277,810],[219,844],
    [254,844],[290,845],[255,888],[234,930],[275,930],[233,964],[275,964],
    [252,1008],[216,1008],[289,1008],[252,1053],[215,1053],[289,1053],
    [231,1082],[273,1082],[230,1126],[273,1126],[231,1170],[273,1170],
  ],
  west: [
    [866,648],[830,625],[830,656],[794,651],[758,641],[721,663],[707,627],
    [685,663],[671,627],[649,663],[628,627],[612,663],[592,626],[575,663],
    [540,650],[522,627],[504,650],[480,627],[444,627],[460,663],[406,627],
    [408,663],[370,627],[372,663],[334,665],[318,640],
    [230,605],[188,605],[230,653],[188,653],
    [686,1094],[662,1072],[633,1095],[603,1106],[573,1086],[539,1107],
    [512,1087],[467,1087],[423,1087],[398,1108],[361,1097],[340,1120],
    [313,1087],[286,1109],[265,1079],[239,1101],[202,1109],[190,1074],
    [162,1096],
  ],
  north: [
    [693,1187],[656,1187],[713,1141],[674,1133],[633,1141],[713,1081],
    [674,1074],[633,1081],[713,1021],[674,1013],[633,1021],[713,959],
    [674,952],[633,959],[713,900],[674,893],[633,900],[713,839],[672,832],
    [632,839],[712,779],[672,772],[631,779],[689,721],[652,721],[694,670],
    [670,651],[646,670],[697,612],[670,585],
    [258,1101],[222,1101],[258,1053],[222,1053],
    [237,978],[254,935],[219,942],[254,874],[219,885],[254,813],[218,824],
    [272,765],[235,753],[199,765],[253,709],[217,709],[235,665],[253,605],
    [216,616],[234,561],[234,517],[234,473],
  ],
};

const round = x => Number(x.toFixed(6));
function position(direction, number, [x, y]) {
  let u, v;
  if (direction === 'east') {
    if (number <= 19) { u = .045 + (x - 129) * .45 / 692; v = .035 + (y - 390) * .045 / 26; }
    else { u = .525 + (x - 248) * .43 / 561; v = .03 + (y - 700) * .06 / 58; }
  } else if (direction === 'south') {
    if (number <= 29) { u = .91 + (x - 619) * .056 / 48; v = .115 + (y - 550) * .40 / 698; }
    else { u = .915 + (x - 215) * .06 / 85; v = .55 + (y - 624) * .34 / 546; }
  } else if (direction === 'west') {
    if (number <= 26) { u = .555 + (x - 318) * .4 / 548; v = .92 + (y - 625) * .05 / 40; }
    else if (number <= 30) { u = .485 + (x - 188) * .03 / 42; v = .925 + (y - 605) * .035 / 48; }
    else { u = .045 + (x - 162) * .42 / 524; v = .915 + (y - 1072) * .055 / 48; }
  } else {
    if (number <= 30) { u = .027 + (x - 631) * .065 / 82; v = .55 + (y - 585) * .34 / 602; }
    else if (number <= 34) { u = .043 + (x - 222) * .035 / 36; v = .485 + (y - 1053) * .03 / 48; }
    else { u = .03 + (x - 199) * .062 / 73; v = .115 + (y - 473) * .34 / 505; }
  }
  return { u: round(u), v: round(v), w: .022, h: .025 };
}

// 只有逐尊圖確見一面二臂坐姿時才用 f；沒有圖示的名表席，不套此預設。
const f = (page, attributes = [], extra = {}) => ({
  page, kind: 'deva', heads: 1, arms: 2, pose: 'seated', attributes, ...extra,
});
const shapes = {};
const set = (direction, number, shape) => { shapes[`${direction}:${number}`] = shape; };
const each = (direction, numbers, shape) => numbers.forEach(n => set(direction, n, { ...shape }));

set('east', 1, f(236, ['三叉戟','器皿','三目'], { rightHand:'三叉戟', leftHand:'器皿' }));
set('east', 2, f(236));
set('east', 3, f(236, ['器皿'], { leftHand:'器皿' }));
each('east', [4,5], f(236, ['器皿']));
set('east', 6, f(237));
set('east', 7, f(237, ['盛花器'], { leftHand:'盛花器' }));
set('east', 8, { page:237, kind:'symbol', heads:null, arms:null, pose:null, attributes:['樓閣','閣內天人'], form:'samaya', detail:'圖中以樓閣容一小天人，不把樓閣算另一尊。' });
set('east', 12, f(237, ['拂'], { leftHand:'拂', detail:'名表惹耶，圖題「日天后（惹耶）」。' }));
set('east', 13, f(237, ['兩蓮花'], { rightHand:'蓮花', leftHand:'蓮花', mount:'馬車' }));
set('east', 14, f(237, ['弓','箭'], { rightHand:'箭', leftHand:'弓' }));
set('east', 15, f(238, ['金剛鉾','甲冑'], { rightHand:'金剛鉾', detail:'p234特分東方帝釋持金剛鉾，與北方帝釋異相。' }));
set('east', 16, f(238, ['劍','蓮花'], { leftHand:'劍', rightHand:'蓮花' }));
set('east', 17, f(238, ['花盤'], { pose:'standing', detail:'圖為飛行屈腿天女；standing僅指未坐蓮座，見poseDetail。', poseDetail:'飛行屈腿' }));
set('east', 18, f(238, ['劍','甲冑'], { rightHand:'劍' }));
set('east', 19, f(238, [], { pose:'standing', mudra:'合掌', poseDetail:'飛行合掌' }));
set('east', 20, f(238, ['劍','甲冑'], { leftHand:'劍' }));
set('east', 21, f(239, ['蓮花','鉾','水瓶'], { heads:4, arms:4, mount:'蓮華座' }));
each('east', [22,23,24,25,26,27,28], f(239, ['星輪'], { detail:'p239逐名圖題七宿，皆一面二臂坐像；星輪所在手按各像有異，未合併固定左右。' }));
set('east', 29, { page:239, kind:'symbol', heads:null, arms:null, pose:null, attributes:['牛形'], form:'samaya', detail:'名表及圖題均作牛密宮；圖為伏牛，非持牛標幟之天人。' });
set('east', 30, { page:239, kind:'symbol', heads:null, arms:null, pose:null, attributes:['白羊形'], form:'samaya' });
set('east', 31, f(240, ['星輪'], { leftHand:'星輪' }));
set('east', 32, f(239));
set('east', 33, f(240, ['羽狀物'], { pose:'standing', poseDetail:'飛行屈腿' }));
set('east', 34, f(240, [], { pose:'standing', mudra:'舉手合掌', poseDetail:'飛行合掌' }));
set('east', 35, f(240, ['寶珠'], { rightHand:'寶珠', mount:'馬車', detail:'p235名表日曜；p240個別圖題作日天。按原序保留兩席日天/日曜。' }));
set('east', 39, f(240, ['火焰光背']));
set('east', 40, f(240, ['念珠','杖','火焰光背'], { rightHand:'念珠', leftHand:'杖' }));

set('south', 24, f(243, ['劍','甲冑'], { rightHand:'劍' }));
set('south', 25, f(243, ['劍'], { rightHand:'劍', detail:'增長天足側小使者，非另一增長天。' }));
set('south', 26, f(243, ['龍冠','劍'], { rightHand:'劍' }));
set('south', 27, f(243, ['龍冠','劍'], { rightHand:'劍' }));
each('south', [28,29], f(243, ['劍'], { rightHand:'劍' }));
set('south', 30, f(243, ['人頭幢'], { leftHand:'人頭幢', mount:'牛' }));
set('south', 31, f(243, ['人面圓幢'], { leftHand:'人面圓幢' }));
set('south', 32, f(244, ['人面幢','筆','簿'], { rightHand:'筆', leftHand:'人面幢' }));
set('south', 33, f(244, [], { kind:'wrath', poseDetail:'跪姿' }));
set('south', 34, f(244, ['人頭','花枝'], { rightHand:'人頭', leftHand:'花枝', kind:'wrath' }));
each('south', [35,36,37,38,39,40], f(244, [], { kind:'wrath', detail:'毘舍遮圖分鬼眾女二身、鬼眾四身；名表35–42共八身，餘二見p245。各個持物不可從群圖確定編號者不指派。' }));
each('south', [41,42], f(245, ['器皿'], { kind:'wrath', detail:'接p244毘舍遮群圖，p245另列二坐像。' }));
each('south', [43,44,45], f(245, [], { detail:'荼吉尼三身群圖；中尊持劍，側尊持器/肉形，書未逐像編號，故不強配左右個體。' }));
set('south', 46, f(245, [], { kind:'wrath', pose:'reclining', detail:'死鬼圖為仰臥屍身，故明記reclining，不誤畫坐像。' }));
set('south', 54, f(246, ['棍棒','甲冑'], { rightHand:'棍棒' }));
set('south', 55, f(246, ['器皿'], { rightHand:'器皿' }));
set('south', 56, f(246, ['矛'], { rightHand:'矛' }));
set('south', 57, f(246, ['羽翼','鳥首','管樂器'], { rightHand:'管樂器', leftHand:'管樂器' }));
set('south', 58, f(246, ['羽翼','鳥首','管樂器'], { detail:'名表同名迦樓羅，個別圖題迦樓羅女。' }));
set('south', 59, f(247, ['馬首','鼓'], { detail:'鳩槃荼男女二位；外位男，圖示馬首擊鼓。' }));
set('south', 60, f(247, ['馬首','銅鈸'], { detail:'名表同名鳩槃荼，圖題鳩槃荼女；雙手持鈸。' }));
set('south', 61, f(247, ['持物'], { detail:'圖題羅剎童；所持曲形物不強命名。' }));
set('south', 62, f(247, ['杖'], { rightHand:'杖', detail:'p242名表61、62均印羅剎童；p247明題62羅剎女，保留原表名且另錄圖題異文。', aliases:['羅剎女'] }));

set('west', 1, f(250, ['劍','甲冑'], { rightHand:'劍' }));
set('west', 2, f(250, ['器皿']));
set('west', 3, f(250, ['劍'], { rightHand:'劍' }));
set('west', 4, f(250, ['三叉戟'], { leftHand:'三叉戟', mount:'牛' }));
set('west', 5, f(250, ['三叉戟','器皿'], { leftHand:'三叉戟', rightHand:'器皿', mount:'牛', aliases:['烏摩妃'] }));
set('west', 6, f(250, ['蓮花'], { leftHand:'蓮花' }));
set('west', 7, f(250, ['蓮花'], { rightHand:'蓮花' }));
set('west', 13, f(251, ['杖'], { pose:'standing', rightHand:'杖' }));
set('west', 14, f(251, ['月輪'], { rightHand:'月輪' }));
set('west', 15, f(251, ['秤'], { pose:'standing', rightHand:'秤' }));
set('west', 16, { page:251, kind:'symbol', heads:null, arms:null, pose:null, attributes:['蠍形'], form:'samaya' });
set('west', 17, f(251, ['弓','箭'], { pose:'standing', rightHand:'箭', leftHand:'弓' }));
set('west', 25, f(251, ['三叉戟'], { rightHand:'三叉戟', leftHand:'三叉戟', poseDetail:'跪姿' }));
set('west', 26, f(251, ['劍','星輪'], { rightHand:'劍', leftHand:'星輪', detail:'p249西方26與32皆作水天；p251此像持劍、輪，保留分席。' }));
set('west', 31, f(251, ['三叉戟','甲冑'], { rightHand:'三叉戟' }));
set('west', 32, f(252, ['索','龍冠'], { rightHand:'索' }));
set('west', 33, f(252, ['索','龍冠'], { rightHand:'索', aliases:['水天后'] }));
set('west', 34, f(252, ['索','龍冠','矛'], { rightHand:'矛', leftHand:'索' }));
set('west', 35, f(252, ['輪'], { rightHand:'輪', mount:'迦樓羅' }));
set('west', 36, f(252, ['盛果器'], { leftHand:'盛果器' }));
set('west', 37, f(252, ['琵琶'], { rightHand:'琵琶撥', leftHand:'琵琶' }));
set('west', 38, f(252, ['三叉戟'], { heads:6, rightHand:'三叉戟', mount:'孔雀' }));
set('west', 39, f(253, ['月輪杖'], { rightHand:'月輪杖', mount:'鵝群' }));
set('west', 41, f(253, ['鼓']));
set('west', 42, f(253, [], { mudra:'合掌', detail:'p253兩歌天圖，一合掌一吹管；此席按外內位置配合掌像。' }));
set('west', 43, f(253, ['管樂器']));
set('west', 44, f(253, ['橫笛']));
set('west', 49, f(253, ['幢','甲冑'], { rightHand:'幢' }));

each('north', [6,7,8], f(256, ['蓮花'], { color:'白肉色' }));
each('north', [9,10,11], f(256, ['蓮花'], { color:'白肉色' }));
each('north', [12,13,14], f(257, ['蓮花']));
set('north', 13, f(257, ['蓮花','拂'], { leftHand:'蓮花' }));
each('north', [15,16,17], f(257, ['蓮花'], { color:'白肉色' }));
set('north', 24, f(258, ['鼓'], { detail:'緊那羅二位，圖示奏鼓；保留每方名表序號。' }));
set('north', 25, f(258, ['鼓']));
set('north', 26, f(258, [], { pose:'standing', poseDetail:'舞姿', aliases:['明王女'], detail:'p255表26作歌天，p258三尊群圖另題舞者明王女。此依三席內外位置對應舞者，保留表名與圖題異文。' }));
set('north', 27, f(258, ['鼓']));
set('north', 28, f(258, ['笛']));
set('north', 29, f(259, ['蓮花'], { detail:'帝釋座旁一女眷屬；未與帝釋合成單席。' }));
set('north', 30, f(259, ['金剛杵','冠'], { rightHand:'金剛杵', mount:'須彌山', detail:'p234說北方帝釋冠冕、坐須彌山、手執金剛；p259圖與之相符。' }));
set('north', 31, f(259, ['棒'], { rightHand:'棒' }));
set('north', 32, f(259, ['劍'], { rightHand:'劍' }));
set('north', 33, f(259, ['龍冠','蓮花'], { leftHand:'蓮花' }));
set('north', 34, f(259, ['龍冠','劍'], { rightHand:'劍' }));
set('north', 35, f(260, ['寶塔','棒','甲冑'], { rightHand:'棒', leftHand:'寶塔' }));
set('north', 36, f(260, ['劍','火焰光背'], { rightHand:'劍' }));
set('north', 37, f(260, ['劍'], { rightHand:'劍', pose:'standing' }));
set('north', 50, f(261, ['象首','斧','蘿蔔'], { rightHand:'斧', leftHand:'蘿蔔' }));
set('north', 51, f(261, ['劍','三叉戟','皮','器皿','杖','三目','骷髏飾'], { kind:'wrath', heads:3, arms:6, detail:'圖示三面六臂；兩上手舉皮，中手持劍/戟，下手持器/杖。圖側另畫附屬小形，不在四方名表增算席位。' }));
set('north', 52, f(259, ['三叉戟','器皿'], { leftHand:'三叉戟', rightHand:'器皿' }));

// 卷首彩版補察：只填原生 1469×2445 掃描實可辨的特徵。
// 單面／坐相可見不等於能看清雙臂；因此 plate 預設 arms:null，不套二臂共相。
const plate = (extra = {}) => ({
  pdfPage:5, plate:'胎藏曼荼羅（現圖）', kind:'deva', heads:1,
  arms:null, pose:'seated', attributes:[], evidenceType:'plate-observation',
  detail:'卷首全幅按已核方位與相鄰群組辨席；可見單面坐相，原生小像不足以確定細持物。',
  ...extra,
});
const glyph = (attributes, extra = {}) => plate({
  kind:'symbol', heads:null, arms:null, pose:null, form:'samaya', attributes,
  detail:'卷首全幅可見非人身標幟；其名稱與席號仍據正文名位表。', ...extra,
});
each('east', [9,10,11], glyph(['樓閣'], {
  detail:'卷首PDF5東側連列四樓閣；按p235序8–11，對應非想、無所有、識無邊、空無邊四席。閣內微小天人不能逐一數臂。',
}));
set('east', 36, plate({ heads:1, pose:'standing', poseDetail:'飛行',
  detail:'日曜近旁斜飛小天人，與後方婆藪兩坐像可分；肢端太小，臂數與持物未定。' }));
each('east', [37,38], plate());
each('south', [1,2,3,4,5,6,7], plate());
set('south', 8, glyph(['寶瓶']));
set('south', 9, glyph(['摩羯形']));
set('south', 10, glyph(['雙魚']));
set('south', 11, glyph(['羅睺首'], { heads:1,
  detail:'星曜群前圓形一首，沒有可見軀幹；按p242第11羅睺星辨席，不添一般天人身。' }));
each('south', [12,13], plate());
each('south', [14,15,16,17,18,19,20], plate({ arms:2, attributes:['星輪'],
  detail:'卷首七宿組可見單面、二臂坐相及輪形；PDF9東寺局部亦清楚見該七宿群。輪的左右手與細紋不強判。',
  additionalIconographySources:[{volume:'上',pdfPage:9,plate:'東寺胎藏曼荼羅（部分）'}],
}));
each('south', [21,22], plate());
set('south', 23, plate({ pose:'standing',
  detail:'增長天上方藥叉三身組外側天女足部下垂，為立姿，與中/內二坐身有別；PDF9局部可複核。',
  additionalIconographySources:[{volume:'上',pdfPage:9,plate:'東寺胎藏曼荼羅（部分）'}],
}));
each('south', [47,48,49,50], plate());
each('south', [51,52,53], plate());
// 卷首PDF9放大局部所含的逐席手臂可見；不把它外推到畫面以外。
each('south', [12,13,21,22,47,48,49,50], plate({
  pdfPage:9, plate:'東寺胎藏曼荼羅（部分）', arms:2,
  detail:'卷首PDF9最外院局部按相鄰星宿/門/死鬼定位，可辨一面二臂坐姿；细持物仍不命名。',
}));
set('south', 23, plate({ pdfPage:9, plate:'東寺胎藏曼荼羅（部分）', arms:2,
  pose:'standing', detail:'卷首PDF9藥叉三身組之外側天女，可見一面二臂、雙足下垂之立姿。' }));
each('west', [8,9,10,11,12], plate());
each('west', [18,19,20,21,22,23,24], plate({ arms:2, attributes:['星輪'],
  detail:'卷首西方七宿群可見單面二臂坐相與輪形；持輪左右及輪上細紋不辨。' }));
each('west', [27,28,29,30], plate({
  detail:'卷首西門內四身可分，皆單面坐相；南/北門龍王持物有異，不把其劍蓮套用到西門。' }));
each('west', [40,45,46,47,48], plate());
each('north', [1,2,3,4,5], plate());
each('north', [18,19,20], plate());
each('north', [21,22,23], plate({ attributes:['蛇冠'],
  detail:'卷首北方三身摩睺羅迦組可見一面坐相，頭後蛇形起伏；細臂及蛇數不可確數。' }));
each('north', [38,39,40,41,42,43,44], plate({ arms:2, attributes:['星輪'],
  detail:'卷首北方七宿群可見單面二臂坐相與轮形；輪的左右手與細紋未定。' }));
set('north', 45, plate({ arms:2 }));
set('north', 46, glyph(['蟹形']));
set('north', 47, glyph(['獅子形']));
set('north', 48, plate());
set('north', 49, plate({ kind:'wrath', pose:'standing',
  detail:'金曜外側細瘦一面鬼形，有下垂足部，作立姿；小像臂端與持物不清。' }));

const CANONICAL = {
  'east:1':'ishana', 'east:7':'jiten', 'east:13':'nitten', 'east:15':'taishaku',
  'east:21':'bonten', 'east:35':'nitten', 'east:40':'katen', 'south:30':'emma',
  'west:1':'rasetsu', 'west:26':'suiten', 'west:32':'suiten', 'west:39':'gatten',
  'west:49':'futen', 'north:30':'taishaku', 'north:35':'bishamon',
};
const PAGE = { east:235, south:242, west:249, north:255 };
const MAP_PAGE = { east:235, south:241, west:248, north:254 };
const DIRECTION = { east:'東', south:'南', west:'西', north:'北' };

export const BOOK_TAIZO_OUTER = Object.entries(ROSTERS).flatMap(([direction, names]) =>
  names.map((name, i) => {
    const number = i + 1;
    const key = `${direction}:${number}`;
    const shape = shapes[key];
    const sameNameTotal = names.filter(n => n === name).length;
    const ordinal = names.slice(0, i + 1).filter(n => n === name).length;
    const namedNote = sameNameTotal > 1
      ? `本方同名${sameNameTotal}席之第${ordinal}席；序號僅辨席，不另造個別經名。` : '';
    const formNote = shape
      ? `${shape.page ? `形相據上冊p${shape.page}圖` : `形相機助觀察據上冊卷首PDF${shape.pdfPage}「${shape.plate}」`}；${shape.detail || ''}`
      : '本段名位圖/名表有明載，未見可逐席對應之個別尊容圖；面臂、坐立及持物不臆填。';
    return {
      seatId:`t:gekongobu:book-${direction}-${String(number).padStart(2,'0')}`,
      realm:'t', side:'t', court:'gekongobu', name,
      canonicalId:CANONICAL[key] || null,
      ...position(direction, number, DOTS[direction][i]),
      observation:{ kind:shape?.kind || 'deva', heads:shape?.heads ?? null,
        arms:shape?.arms ?? null, pose:shape?.pose ?? null,
        attributes:shape?.attributes ? [...shape.attributes] : [] },
      form:shape?.form || 'figure',
      color:shape?.color || null, rightHand:shape?.rightHand || null,
      leftHand:shape?.leftHand || null, mudra:shape?.mudra || null,
      mount:shape?.mount || null, poseDetail:shape?.poseDetail || null,
      aliases:shape?.aliases || [],
      source:{ volume:'上', page:PAGE[direction], pdfPage:PAGE[direction]+29,
        section:`現圖胎藏曼荼羅之最外院・${DIRECTION[direction]}方諸尊名位` },
      layoutSource:{ volume:'上', page:MAP_PAGE[direction], pdfPage:MAP_PAGE[direction]+29,
        number, direction:DIRECTION[direction] },
      iconographySource:shape ? (shape.page
        ? { volume:'上', page:shape.page, pdfPage:shape.page+29 }
        : { volume:'上', pdfPage:shape.pdfPage, plate:shape.plate }) : null,
      iconographyEvidence:shape?.evidenceType || 'printed-figure',
      additionalIconographySources:shape?.additionalIconographySources || [],
      identityStatus:'text-attested', reviewStatus:'source-checked',
      note:`上冊p${MAP_PAGE[direction]}${DIRECTION[direction]}方位圖第${number}，名表p${PAGE[direction]}。${namedNote}${formNote}`,
    };
  })
);

export const BOOK_TAIZO_OUTER_COUNTS = Object.freeze({ east:40, south:62, west:49, north:52, total:203 });
