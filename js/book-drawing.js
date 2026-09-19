// 《曼荼羅之研究》的文字／圖表所據程序造像。
// 每筆由席位自身的面臂、坐立、印相、持物決定；不改 vendor 粉本核定名單。
// 無圖片、無外部資源；形相未記的部分不由同名尊或別會自動補入。
const TAU = Math.PI * 2;
const COLORS = { 白: '#e5dfcd', 黃: '#dabf73', 金: '#d9b568', 赤: '#d98877', 紅: '#d98877',
  青: '#8ba8c0', 黑: '#989dac', 綠: '#92b39a', 紫: '#b59ec3' };
const colorOf = value => Object.entries(COLORS).find(([word]) => String(value || '').includes(word))?.[1] || '#d8b982';
const words = value => Array.isArray(value) ? value.join('、') : String(value || '');
function path(c, pts, closed = false) { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); if (closed) c.closePath(); c.stroke(); }
function ellipse(c, x, y, rx, ry = rx) { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU); c.stroke(); }
function curve(c, x, y, a, b, u, v) { c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(a, b, u, v); c.stroke(); }
function lotus(c, y = .65, scale = 1) {
  c.save(); c.translate(0, y); c.scale(scale, scale);
  for (const x of [-.30, -.15, 0, .15, .30]) {
    c.beginPath(); c.moveTo(x - .13, .04); c.quadraticCurveTo(x - .16, -.10, x, -.16);
    c.quadraticCurveTo(x + .16, -.10, x + .13, .04); c.stroke();
  }
  curve(c, -.46, .05, 0, .22, .46, .05); path(c, [[-.38, .13], [.38, .13]]); c.restore();
}
function flame(c, radius = .65) {
  for (let i = 0; i < 15; i++) {
    const a = i / 15 * TAU;
    c.save(); c.rotate(a); c.beginPath(); c.moveTo(-.065, -radius);
    c.bezierCurveTo(-.17, -radius - .1, .09, -radius - .15, .035, -radius - .32);
    c.quadraticCurveTo(.20, -radius - .12, .065, -radius); c.stroke(); c.restore();
  }
}
function vajra(c, prongs = 5) {
  path(c, [[0, -.16], [0, .16]]); ellipse(c, 0, 0, .08, .14);
  for (const s of [-1, 1]) {
    path(c, [[-.1, s * .16], [.1, s * .16]]);
    path(c, [[0, s * .16], [0, s * .53]]);
    if (prongs > 1) for (const x of [-1, 1]) curve(c, x * .07, s * .17, x * .31, s * .43, 0, s * .53);
    if (prongs > 3) for (const x of [-1, 1]) curve(c, x * .10, s * .17, x * .46, s * .33, 0, s * .53);
  }
}

function fist(c, x = 0, y = 0, scale = 1) {
  c.save(); c.translate(x, y); c.scale(scale, scale);
  path(c, [[-.13,.13],[-.17,-.03],[-.12,-.17],[.09,-.17],[.17,-.03],[.12,.13]], true);
  for (const xx of [-.07, 0, .07]) path(c, [[xx,-.15],[xx,.015]]);
  curve(c, -.14,.025,-.01,.10,.12,-.02); c.restore();
}
function beadRing(c, teeth = false) {
  for (let i = 0; i < 14; i++) {
    const a = i * TAU / 14;
    c.save(); c.translate(Math.cos(a) * .30, Math.sin(a) * .39); c.rotate(a + Math.PI / 2);
    if (teeth) { path(c,[[-.065,-.07],[.065,-.07],[.055,.02],[.02,.13],[0,.055],[-.025,.13],[-.06,.02]],true); }
    else ellipse(c,0,0,.065);
    c.restore();
  }
}
function feather(c) {
  curve(c, -.16,.52,.10,-.01,.15,-.52);
  for(let i=0;i<7;i++){const yy=.33-i*.12;curve(c,-.12,yy,.28,yy-.07,.30,yy-.25);curve(c,-.12,yy,-.34,yy-.1,-.2,yy-.28);}
}
function fish(c) {
  ellipse(c, -.05, 0, .32, .19); path(c, [[.26,0],[.5,-.24],[.5,.24],[.26,0]]);
  ellipse(c,-.23,-.04,.025); curve(c,-.1,-.17,.02,0,-.1,.17);
}
function crownShape(c, snakes = false) {
  path(c,[[-.36,.17],[-.36,-.14],[-.2,.01],[0,-.31],[.2,.01],[.36,-.14],[.36,.17]],true);
  if(snakes)for(const x of[-.28,-.14,0,.14,.28]){
    curve(c,x,.04,x-.07,-.25,x,-.40);ellipse(c,x,-.43,.055,.08);
  }
}
function bird(c, peacock = false) {
  if(peacock)for(let i=0;i<9;i++){
    const a=-Math.PI+i*Math.PI/8,x=Math.cos(a)*.60,y=Math.sin(a)*.61;
    curve(c,.10,.12,x,y+.13,x,y);ellipse(c,x,y,.06,.085);
  }
  ellipse(c,0,.12,.43,.23);curve(c,-.32,.04,-.34,-.47,-.58,-.29);
  path(c,[[-.59,-.29],[-.80,-.21],[-.54,-.17]]);ellipse(c,-.53,-.27,.025);
  curve(c,-.10,.08,.26,-.14,.32,.24);path(c,[[.34,.12],[.67,-.08],[.49,.28]]);
  for(const x of[-.18,.18])path(c,[[x,.31],[x,.55],[x-.12,.57],[x+.1,.57]]);
}
// Animal shapes use their own frame, independently of the mount's placement below a figure.
function animal(c, name) {
  if(/鳥|鸟|鵝|鹅|孔雀|鶴|鹤|迦樓羅|迦楼罗/.test(name)){bird(c,/孔雀/.test(name));return;}
  ellipse(c,.05,.09,.48,.24);
  if(/象/.test(name)){
    ellipse(c,-.43,-.01,.23,.26);ellipse(c,-.26,-.01,.18,.25);
    curve(c,-.6,.01,-.81,.53,-.46,.42);curve(c,-.48,.15,-.63,.28,-.63,.10);
  } else if(/馬|马/.test(name)) {
    path(c,[[-.28,.01],[-.36,-.36],[-.57,-.44],[-.67,-.24],[-.81,-.1],[-.59,-.025],[-.39,.12]]);
    path(c,[[-.52,-.40],[-.58,-.63],[-.44,-.47]]);
    for(let i=0;i<5;i++)path(c,[[-.31,-.34+i*.07],[-.24,-.34+i*.07]]);
  } else {
    ellipse(c,-.43,-.025,.23,.21);ellipse(c,-.54,.055,.13,.085);
    if(/獅|狮/.test(name)){
      ellipse(c,-.43,-.025,.32,.31);
      for(let i=0;i<10;i++){const a=i*TAU/10;path(c,[[-.43+Math.cos(a)*.24,-.025+Math.sin(a)*.23],[-.43+Math.cos(a)*.32,-.025+Math.sin(a)*.31]]);}
    } else if(/羊/.test(name)){
      for(const x of[-.6,-.27]){ellipse(c,x,-.21,.15,.17);curve(c,x-.04,-.1,x+.13,-.30,x-.06,-.29);}
    } else if(/牛/.test(name)){
      curve(c,-.60,-.17,-.79,-.49,-.54,-.38);curve(c,-.29,-.17,-.08,-.46,-.31,-.39);
    }
  }
  ellipse(c,-.48,-.08,.024);
  const folded=/形/.test(name)&&/牛|羊/.test(name);
  for(const x of[-.24,.32])path(c,folded?[[x,.27],[x+.15,.34],[x-.13,.39]]:[[x,.27],[x,.54],[x-.12,.55]]);
  curve(c,.49,.06,.84,-.20,.73,.08);
  if(/獅|狮|牛|馬|马/.test(name))ellipse(c,.73,.08,.065,.10);
}
function tower(c, occupied = false) {
  for(const yy of[-.37,-.02,.33]){
    path(c,[[-.43,yy],[0,yy-.22],[.43,yy]],true);
    path(c,[[-.3,yy],[-.3,yy+.27],[.3,yy+.27],[.3,yy]]);
  }
  if(occupied){face(c,0,.36,.065,'deva',false);curve(c,-.05,.43,-.17,.54,.13,.53);}
}

// These describe the body, halo, or ornament; they must never be assigned to an extra hand.
const BODY_ATTRIBUTE = /三目|多臂|多面|羽翼|鳥首|鸟首|馬首|马首|象首|甲冑|鎧|铠|龍冠|龙冠|蛇冠|^冠$|骷髏飾|骷髅饰|光背|火焰|光焰|青黑身|飛行|飄帶|閣內天人/;
const isGesture = n => /印|拳|合掌|三摩地|與願|与愿|無畏|无畏|說法|说法|禪定|禅定|置膝|下垂|屈無名|舒餘|舒余/.test(n) && !/智印/.test(n);

/** A named attribute drawn in its own local frame. Unsupported names remain text, never a substituted vajra. */
export function drawBookAttribute(c, name, x = 0, y = 0, scale = 1) {
  const n = words(name).replace(/^持/, '').trim(); if (!n) return false;
  c.save(); c.translate(x, y); c.scale(scale, scale);
  let done = true;
  const borne = n.match(/(?:青)?蓮(?:華|花)?(?:上|承|載|载|托)(.+)/);
  if (borne) {
    // A lotus-borne sword, vase, jewel, etc. is one composite emblem, not either component alone.
    path(c,[[0,.56],[0,.15]]);lotus(c,.14,.76);
    done=drawBookAttribute(c,borne[1],0,-.29,.61);
  }
  else if (/蓮華索|莲华索/.test(n)) {path(c,[[0,.5],[0,.05]]);lotus(c,-.12,.65);drawBookAttribute(c,'索',.29,.08,.58);}
  else if (/^(雙|双|兩|两)/.test(n)) {
    const item=n.slice(1);
    if(/魚|鱼/.test(item)){c.save();c.translate(-.2,-.11);c.scale(.65,.65);fish(c);c.restore();c.save();c.translate(.2,.16);c.rotate(Math.PI);c.scale(.65,.65);fish(c);c.restore();}
    else if(/拳/.test(item)){fist(c,-.2,0,1.15);fist(c,.2,0,1.15);}
    else {done=drawBookAttribute(c,item,-.23,0,.70);done=drawBookAttribute(c,item,.23,0,.70)&&done;}
  }
  else if (/^橫|^横/.test(n)) {c.rotate(Math.PI/2);done=drawBookAttribute(c,n.slice(1));}
  else if (/三寶珠|三宝珠/.test(n)) {for(const [xx,yy] of [[-.23,.14],[.23,.14],[0,-.24]])drawBookAttribute(c,'寶珠',xx,yy,.48);}
  else if (/疊金剛|叠金刚/.test(n)) {drawBookAttribute(c,'金剛杵',-.19,0,.75);drawBookAttribute(c,'金剛杵',.19,0,.75);drawBookAttribute(c,'橫金剛杵',0,.03,.80);}
  else if (/三鈷劍|三股劍|三钴剑|三股剑/.test(n)) {drawBookAttribute(c,'劍',0,-.09,.77);c.save();c.translate(0,.32);c.scale(.31,.31);vajra(c,3);c.restore();}
  else if (/月輪杖|月轮杖|星輪杖|星轮杖/.test(n)) {path(c,[[0,.58],[0,-.2]]);drawBookAttribute(c,/月/.test(n)?'月輪':'星輪',0,-.35,.5);}
  else if (/人(?:頭|头|面).*(幢|杖)/.test(n)) {path(c,[[0,.6],[0,-.17]]);ellipse(c,0,-.28,.25,.27);face(c,0,-.27,.17,'deva',false);}
  else if (/羅睺首|罗睺首/.test(n)) {face(c,0,-.03,.34,'wrath',false);curve(c,-.3,.25,0,.55,.3,.25);}
  else if (/人頭|人头|人面標幟|人面标帜/.test(n)) {face(c,0,0,.30,'deva',false);}
  else if (/念珠/.test(n)) beadRing(c);
  else if (/齒鬘|齿鬘/.test(n)) beadRing(c,true);
  else if (/箜篌/.test(n)) {path(c,[[-.36,.48],[.31,.48],[.31,-.52],[-.36,.48]],true);for(let i=1;i<6;i++){const xx=-.36+i*.11;path(c,[[xx,.4],[xx,.48-(xx+.36)*1.49]]);}curve(c,-.36,.48,-.49,.35,-.30,.29);}
  else if (/蟹/.test(n)) {
    ellipse(c,0,.08,.27,.20);for(const s of[-1,1]){for(let i=0;i<4;i++)path(c,[[s*.24,i*.08-.02],[s*.45,i*.09-.09],[s*.56,i*.10-.02]]);path(c,[[s*.22,-.04],[s*.43,-.29],[s*.31,-.44]]);curve(c,s*.31,-.44,s*.60,-.56,s*.56,-.26);path(c,[[s*.31,-.44],[s*.39,-.26],[s*.56,-.26]]);path(c,[[s*.10,-.10],[s*.14,-.23]]);ellipse(c,s*.14,-.24,.035);}
  }
  else if (/摩羯/.test(n)) {
    ellipse(c,.01,.12,.32,.22);path(c,[[-.24,.03],[-.44,-.19],[-.68,-.16],[-.58,.0],[-.35,.13]]);
    curve(c,-.58,-.14,-.88,-.34,-.58,-.44);ellipse(c,-.39,-.07,.025);
    path(c,[[.28,.11],[.61,-.16],[.45,.17],[.65,.39],[.22,.27]]);
    for(const xx of[-.17,.12])path(c,[[xx,.28],[xx-.07,.44],[xx+.12,.42]]);
    for(let i=0;i<4;i++)curve(c,-.10+i*.08,-.05,-.07+i*.08,.10,-.10+i*.08,.23);
  }
  else if (/盛花器|花盤|花盘|鮮花|鲜花|花形持物|開敷華|开敷华/.test(n)) {
    for(const xx of[-.22,0,.22]){path(c,[[xx*.5,.16],[xx,-.22]]);c.save();c.translate(xx,0);lotus(c,-.25+Math.abs(xx)*.2,.28);c.restore();}
    if(/器|盤|盘/.test(n))drawBookAttribute(c,'器皿',0,.22,.75);
  }
  else if (/盛果器/.test(n)) {for(const [xx,yy]of[[-.18,-.02],[.18,-.02],[0,-.2]])ellipse(c,xx,yy,.14);drawBookAttribute(c,'器皿',0,.22,.88);}
  else if (/羽狀物|羽状物/.test(n)) feather(c);
  else if (/孔雀尾/.test(n)) {for(let i=0;i<7;i++){const a=-2.65+i*.35,xx=Math.cos(a)*.5,yy=Math.sin(a)*.5;path(c,[[0,.48],[xx,yy]]);ellipse(c,xx,yy,.09,.13);ellipse(c,xx,yy,.035,.055);}}
  else if (/拂/.test(n)) {path(c,[[.18,.53],[.05,-.11]]);for(let i=0;i<7;i++)curve(c,.05,-.11,-.4+i*.10,-.64,-.38+i*.11,.07);}
  else if (/蘿蔔|萝卜/.test(n)) {path(c,[[-.16,-.26],[.14,-.26],[0,.52]],true);for(const xx of[-.21,0,.21])curve(c,0,-.26,xx,-.57,xx,-.50);}
  else if (/筆|笔/.test(n)) {path(c,[[-.05,-.53],[.05,-.53],[.05,.26],[-.05,.26]],true);path(c,[[-.08,.26],[0,.55],[.08,.26]],true);}
  else if (/枝葉|枝叶|花枝|樹枝|树枝/.test(n)) {path(c,[[0,.52],[0,-.49]]);for(let i=0;i<5;i++){const s=i%2?-1:1,yy=.29-i*.15;curve(c,0,yy,s*.35,yy-.04,s*.28,yy-.23);curve(c,s*.28,yy-.23,s*.02,yy-.20,0,yy);}}
  else if (/管樂器|管乐器|笛/.test(n)) {path(c,[[-.49,-.075],[.49,-.075],[.49,.075],[-.49,.075]],true);for(let i=0;i<5;i++)ellipse(c,-.26+i*.13,0,.027);}
  else if (/銅鈸|铜钹|鈸|钹/.test(n)) {for(const s of[-1,1]){ellipse(c,s*.23,0,.18,.32);ellipse(c,s*.23,0,.07,.11);}}
  else if (/琵琶撥|琵琶拨/.test(n)) {path(c,[[0,-.42],[-.25,.25],[.24,.25]],true);}
  else if (/傘|伞|白蓋|白盖/.test(n)) {path(c,[[0,-.42],[0,.56]]);curve(c,-.49,-.05,0,-.75,.49,-.05);path(c,[[-.49,-.05],[.49,-.05]]);for(const xx of[-.4,-.2,0,.2,.4])path(c,[[xx,-.05],[xx,.09]]);}
  else if (/冠/.test(n)) crownShape(c,/龍|龙|蛇/.test(n));
  else if (/白毫/.test(n)) {ellipse(c,0,0,.18);curve(c,-.12,0,0,-.24,.1,0);}
  else if (/卍/.test(n)) {for(let i=0;i<4;i++){c.save();c.rotate(i*Math.PI/2);path(c,[[0,0],[0,-.32],[.29,-.32]]);c.restore();}}
  else if (/^方座$/.test(n)) {path(c,[[-.46,.17],[.46,.17],[.46,.37],[-.46,.37]],true);}
  else if (/^團$|^团$/.test(n)) {ellipse(c,0,0,.33);curve(c,-.25,.06,0,-.1,.25,.06);}
  else if (/羅網|罗网/.test(n)) {
    path(c,[[-.43,-.38],[.43,-.38],[.39,.37],[-.39,.37]],true);
    for(let i=0;i<5;i++){const xx=-.32+i*.16;path(c,[[xx,-.38],[xx-.07,.37]]);}
    for(const yy of[-.24,-.08,.08,.24])path(c,[[-.40,yy],[.40,yy]]);
  }
  else if (/五色雲|五色云/.test(n)) {
    const colors=['#e5dfcd','#dabf73','#d98877','#8ba8c0','#92b39a'];
    for(let i=0;i<5;i++){c.save();c.strokeStyle=colors[i];const yy=-.3+i*.14;curve(c,-.4,yy,-.4,yy-.2,-.13,yy-.15);curve(c,-.13,yy-.15,.01,yy-.37,.19,yy-.16);curve(c,.19,yy-.16,.5,yy-.19,.43,yy);path(c,[[-.4,yy],[.43,yy]]);c.restore();}
  }
  else if (/四井字/.test(n)) {
    for(const [xx,yy]of[[-.23,-.23],[.23,-.23],[-.23,.23],[.23,.23]]){
      for(const d of[-.06,.06]){path(c,[[xx+d,yy-.16],[xx+d,yy+.16]]);path(c,[[xx-.16,yy+d],[xx+.16,yy+d]]);}
    }
  }
  else if (/^皮$/.test(n)) {path(c,[[-.17,-.29],[-.42,-.52],[-.54,-.36],[-.29,-.14],[-.28,.15],[-.50,.39],[-.35,.52],[-.11,.26],[.11,.26],[.35,.52],[.50,.39],[.28,.15],[.29,-.14],[.54,-.36],[.42,-.52],[.17,-.29]],true);}
  else if (/^焰/.test(n) && n.length > 1) {c.save();c.globalAlpha*=.55;flame(c,.43);c.restore();done=drawBookAttribute(c,n.slice(1),0,0,.78);}
  else if (/^(?:金剛|金刚)$/.test(n)) {path(c,[[0,-.5],[-.12,-.25],[0,-.08],[.12,-.25],[0,-.5]],true);path(c,[[0,.5],[-.12,.25],[0,.08],[.12,.25],[0,.5]],true);path(c,[[0,-.08],[0,.08]]);}
  else if (/鉾|矛|金剛鋒|金刚锋/.test(n)) {path(c,[[0,.57],[0,-.21]]);path(c,[[0,-.61],[-.13,-.24],[.13,-.24]],true);}
  else if (/羯磨|十字杵/.test(n)) { vajra(c, 3); c.rotate(Math.PI / 2); vajra(c, 3); }
  else if (/杵|獨鈷|独鈷|獨股|独股|三鈷|五鈷|三股|五股/.test(n) && !/鈴|铃/.test(n)) vajra(c, /獨|独|一/.test(n) ? 1 : /三/.test(n) ? 3 : 5);
  else if (/蓮|莲/.test(n)) { path(c, [[0, .5], [0, .04]]); lotus(c, -.12, .78); }
  else if (/劍|剑|刀/.test(n)) { path(c, [[-.055, .15], [-.055, -.42], [0, -.61], [.055, -.42], [.055, .15]], true); path(c, [[-.2, .17], [.2, .17]]); path(c, [[0, .17], [0, .48]]); ellipse(c, 0, .5, .065); }
  else if (/索|繩|绳/.test(n)) { ellipse(c, -.07, -.12, .23, .32); curve(c, .08, .16, .36, .36, .12, .58); }
  else if (/鎖|锁|鏁/.test(n)) { for (let i = 0; i < 4; i++) ellipse(c, (i % 2) * .045, -.3 + i * .2, .105, .16); }
  else if (/鉤|钩/.test(n)) { path(c, [[-.025, .55], [-.025, -.15]]); curve(c, -.025, -.15, -.03, -.67, .3, -.4); curve(c, .3, -.4, .48, -.2, .18, -.17); }
  else if (/鈴|铃/.test(n)) { path(c, [[0, -.5], [0, -.2]]); ellipse(c, 0, -.5, .07); curve(c, 0, -.2, -.23, -.2, -.29, .32); curve(c, 0, -.2, .23, -.2, .29, .32); ellipse(c, 0, .32, .3, .09); path(c, [[0, .32], [0, .47]]); }
  else if (/塔|制底/.test(n)) { path(c, [[-.36, .45], [.36, .45], [.36, .30], [-.36, .30]], true); path(c, [[-.26, .29], [-.26, -.15], [.26, -.15], [.26, .29]]); path(c, [[-.39, -.15], [0, -.40], [.39, -.15]], true); for (const yy of [-.46, -.54, -.62]) path(c, [[-.08, yy], [.08, yy]]); path(c, [[0, -.65], [0, -.4]]); }
  else if (/瓶|壺|壶/.test(n)) { path(c, [[-.12, -.45], [.12, -.45]]); c.beginPath(); c.moveTo(-.1, -.45); c.bezierCurveTo(-.1, -.1, -.36, -.09, -.3, .29); c.quadraticCurveTo(0, .57, .3, .29); c.bezierCurveTo(.36, -.09, .1, -.1, .1, -.45); c.stroke(); }
  else if (/寶珠|宝珠|摩尼|珠|^寶$|^宝$/.test(n)) { path(c, [[-.25, .14], [-.19, -.16], [0, -.35], [.19, -.16], [.25, .14], [0, .29]], true); path(c, [[0, -.35], [-.07, .1], [0, .29], [.07, .1], [0, -.35]]); }
  else if (/月/.test(n)) {ellipse(c,0,0,.39);curve(c,.12,-.37,-.28,0,.12,.37);}
  else if (/星/.test(n)) {ellipse(c,0,0,.38);}
  else if (/輪|轮|日/.test(n)) { ellipse(c, 0, 0, .4); for (let i = 0; i < 8; i++) { const a = i * TAU / 8; path(c, [[0, 0], [Math.cos(a) * .4, Math.sin(a) * .4]]); } }
  else if (/三角|智印/.test(n)) { path(c, [[0, -.48], [-.42, .28], [.42, .28]], true); flame(c, .50); }
  else if (/弓/.test(n)) { curve(c, .1, -.5, -.49, 0, .1, .5); path(c, [[.1, -.5], [.1, .5]]); if (/箭/.test(n)) { path(c, [[-.2, .05], [.57, .05]]); path(c, [[.38, -.09], [.57, .05], [.38, .19]]); } }
  else if (/箭/.test(n)) { path(c, [[0, .55], [0, -.55]]); path(c, [[-.16, -.32], [0, -.55], [.16, -.32]]); path(c, [[-.14, .36], [0, .49], [.14, .36]]); }
  else if (/斧|鉞|钺/.test(n)) { path(c, [[0, .57], [0, -.51]]); path(c, [[0, -.36], [.36, -.53], [.4, -.03], [0, -.12]], true); }
  else if (/槊|叉|戟/.test(n)) { path(c, [[0, .55], [0, -.54]]); curve(c, -.25, -.5, -.28, -.04, 0, -.05); curve(c, .25, -.5, .28, -.04, 0, -.05); }
  else if (/棒|杖|槌|錘|锤/.test(n)) { path(c, [[0, .57], [0, -.3]]); ellipse(c, 0, -.35, .17, .24); }
  else if (/旗|幢|幡/.test(n)) { path(c, [[-.19, .58], [-.19, -.6]]); path(c, [[-.19, -.5], [.42, -.44], [.1, -.17], [.42, .04], [-.19, -.04]], true); }
  else if (/鏡|镜/.test(n)) { ellipse(c, 0, -.1, .3, .35); ellipse(c, 0, -.1, .24, .29); path(c, [[0, .25], [0, .55]]); }
  else if (/經|经|書|书|梵|篋|箧|簿/.test(n)) { path(c, [[-.39, -.26], [.39, -.26], [.39, .26], [-.39, .26]], true); for (const yy of [-.14, 0, .14]) path(c, [[-.3, yy], [.3, yy]]); }
  else if (/螺|商佉/.test(n)) { c.beginPath(); for (let i = 0; i <= 80; i++) { const a = i / 80 * TAU * 2, r = .035 + i / 80 * .3, xx = Math.cos(a) * r, yy = Math.sin(a) * r; i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); path(c, [[.32, 0], [.43, .32], [.14, .26]]); }
  else if (/鼓/.test(n)) { ellipse(c, 0, -.18, .34, .11); ellipse(c, 0, .18, .34, .11); path(c, [[-.34, -.18], [-.34, .18]]); path(c, [[.34, -.18], [.34, .18]]); path(c, [[-.45, -.47], [.16, -.11]]); }
  else if (/牙/.test(n)) { c.beginPath(); c.moveTo(-.20, -.4); c.quadraticCurveTo(.32, -.22, .17, .5); c.quadraticCurveTo(.04, -.08, -.20, -.12); c.closePath(); c.stroke(); }
  else if (/甲|鎧|铠/.test(n)) { path(c, [[-.2, -.4], [-.38, -.23], [-.2, -.1], [-.24, .39], [.24, .39], [.2, -.1], [.38, -.23], [.2, -.4]], true); for (let y = -.1; y <= .3; y += .13) path(c, [[-.2, y], [.2, y]]); }
  else if (/香|爐|炉/.test(n)) { ellipse(c, 0, .02, .3, .1); curve(c, -.3, .02, 0, .57, .3, .02); path(c, [[-.16, .27], [-.2, .42]]); path(c, [[.16, .27], [.2, .42]]); for (const xx of [-.14, .14]) curve(c, xx, -.12, xx - .16, -.32, xx, -.54); }
  else if (/燈|灯|火|焰/.test(n)) { curve(c, -.30, .12, 0, .48, .30, .12); path(c, [[0, .28], [0, .53]]); c.beginPath(); c.moveTo(0, .12); c.bezierCurveTo(-.3, -.09, .1, -.3, .02, -.53); c.bezierCurveTo(.4, -.07, .05, .18, 0, .12); c.stroke(); }
  else if (/鬘|花環|華環/.test(n)) { ellipse(c, 0, 0, .33, .43); for (let i = 0; i < 8; i++) ellipse(c, Math.cos(i * TAU / 8) * .33, Math.sin(i * TAU / 8) * .43, .07); }
  else if (/琴|琵琶/.test(n)) { ellipse(c, 0, .15, .25, .32); path(c, [[-.055, -.1], [-.055, -.55], [.055, -.55], [.055, -.1]]); for (const xx of [-.025, .025]) path(c, [[xx, -.5], [xx, .3]]); }
  else if (/盤|皿|鉢|钵|杯|容器/.test(n)) { ellipse(c, 0, 0, .38, .10); curve(c, -.38, 0, 0, .56, .38, 0); }
  else if (/舌/.test(n)) { c.beginPath(); c.moveTo(-.17, -.4); c.lineTo(-.18, .17); c.quadraticCurveTo(0, .55, .18, .17); c.lineTo(.17, -.4); c.closePath(); c.stroke(); path(c, [[0, -.32], [0, .22]]); }
  else if (/樓|楼|宮殿/.test(n)) tower(c,/天人/.test(n));
  else if (/蠍|蝎/.test(n)) { ellipse(c, 0, .05, .13, .27); for (const s of [-1, 1]) { for (let i = 0; i < 3; i++) path(c, [[s * .12, -.12 + i * .14], [s * .33, -.03 + i * .14], [s * .42, -.13 + i * .14]]); curve(c, s * .1, -.13, s * .48, -.36, s * .3, -.48); path(c, [[s * .3, -.48], [s * .22, -.33], [s * .42, -.40]]); } curve(c, 0, .31, .5, .6, .32, -.11); path(c, [[.32, -.11], [.21, -.02], [.36, .07]]); }
  else if (/魚|鱼/.test(n)) fish(c);
  else if (/(?:牛|羊|獅子?|狮子?|象|鳥|鸟)形/.test(n)) {c.scale(.9,.9);animal(c,n);}
  else if (/秤|天平/.test(n)) { path(c, [[0, .47], [0, -.46]]); path(c, [[-.43, -.30], [.43, -.30]]); for (const s of [-1, 1]) { path(c, [[s * .32, -.30], [s * .32 - .15, .07], [s * .32 + .15, .07], [s * .32, -.30]]); curve(c, s * .32 - .15, .07, s * .32, .22, s * .32 + .15, .07); } }
  else done = false;
  c.restore(); return done;
}

function face(c, x, y, r, kind, crown, attributes = '') {
  c.save(); c.translate(x, y);
  const elephant=/象首/.test(attributes),horse=/馬首|马首/.test(attributes),avian=/鳥首|鸟首/.test(attributes);
  ellipse(c, 0, 0, r, r * 1.19);
  path(c, [[-r * .63, -r * .1], [-r * .18, -r * .04]]); path(c, [[r * .18, -r * .04], [r * .63, -r * .1]]);
  if(elephant){
    ellipse(c,-r*1.12,0,r*.57,r*.81);ellipse(c,r*1.12,0,r*.57,r*.81);
    curve(c,-r*.22,r*.25,-r*.26,r*2.5,r*1.1,r*1.87);
    curve(c,r*.14,r*.28,r*.05,r*1.76,r*1.1,r*1.87);
    curve(c,-r*.44,r*.56,-r*.74,r*1.1,-r*.80,r*.49);
  } else if(horse){
    path(c,[[-r*.75,-r*.62],[-r*.88,-r*1.8],[-r*.38,-r*.8]]);
    path(c,[[r*.35,-r*.78],[r*.62,-r*1.76],[r*.80,-r*.55]]);
    curve(c,-r*.4,r*.09,-r*1.83,r*.2,-r*1.6,r*.94);
    curve(c,-r*1.6,r*.94,-r*.72,r*1.30,0,r*.63);ellipse(c,-r*1.26,r*.73,r*.08,r*.06);
  } else if(avian){
    path(c,[[-r*.34,r*.03],[-r*1.72,r*.44],[-r*.22,r*.60]],true);
    path(c,[[-r*1.72,r*.44],[-r*.46,r*.35]]);
    path(c,[[-r*.66,-r*.76],[-r*.5,-r*1.42],[-r*.08,-r*.98],[r*.31,-r*1.5],[r*.64,-r*.74]]);
  } else {
    path(c, [[0, -.02 * r], [-.10 * r, .34 * r], [.13 * r, .34 * r]]);
    curve(c, -r * .32, r * .66, 0, r * .79, r * .32, r * .66);
    ellipse(c, -r * 1.1, r * .16, r * .16, r * .42); ellipse(c, r * 1.1, r * .16, r * .16, r * .42);
  }
  if (kind === 'buddha' && !crown) { curve(c, -r, -r * .35, 0, -r * 1.95, r, -r * .35); ellipse(c, 0, -r * 1.15, r * .32, r * .24); }
  else if (crown && !elephant && !horse && !avian) {
    if(/龍冠|龙冠|蛇冠/.test(attributes)){c.save();c.translate(0,-r*1.16);c.scale(r*2.4,r*2.4);crownShape(c,true);c.restore();}
    else path(c, [[-r, -r * .76], [-r, -r * 1.55], [-r * .47, -r * 1.1], [0, -r * 1.85], [r * .47, -r * 1.1], [r, -r * 1.55], [r, -r * .76]]);
  }
  if (kind === 'wrath') { path(c, [[-r * .7, -r * .30], [-r * .18, -r * .10]]); path(c, [[r * .18, -r * .10], [r * .7, -r * .30]]); path(c, [[-r * .2, r * .67], [-r * .13, r * .91]]); }
  if (/三目/.test(attributes)) ellipse(c, 0, -r * .55, r * .10, r * .18);
  c.restore();
}
function palm(c, x, y, down = false) {
  ellipse(c, x, y, .027, .041);
  for (let i = 0; i < 4; i++) { const xx = x - .022 + i * .014; path(c, [[xx, y + (down ? .022 : -.022)], [xx, y + (down ? .09 : -.09) + Math.abs(i - 1.5) * .009]]); }
}
function hand(c, x, y, meaning) {
  const n = words(meaning);
  if (/無畏|无畏|說法|说法|與願|与愿|觸地|触地/.test(n)) palm(c, x, y, /願|愿|地/.test(n));
  else if (/拳/.test(n)) fist(c,x,y,.23);
  else ellipse(c, x, y, .033, .027);
}
function hands(c, ob) {
  const mudra = words(ob.mudra), right = words(ob.rightHand), left = words(ob.leftHand);
  const arms = ob.arms;
  if (!Number.isInteger(arms) || arms < 1) return;
  const attrs = (ob.attributes || []).filter(a => !BODY_ATTRIBUTE.test(words(a)));
  const armTo = (s, x, y) => { curve(c, s * .18, -.13, s * .38, .14, x, y); };
  let firstArm = 0;
  if (arms === 2 && ob.pose === 'reclining') {
    for(const s of[-1,1]){curve(c,s*.18,-.13,s*.27,.07,s*.23,.32);hand(c,s*.23,.32,'');}
    return;
  }
  if (arms === 2 && /雙拳|双拳/.test(mudra)) {
    const atEar=/耳/.test(mudra), atWaist=/腰/.test(mudra);
    const xx=(atEar||atWaist) ? .26 : .10, yy=atEar ? -.40 : atWaist ? .20 : -.01;
    for(const s of[-1,1]){armTo(s,s*xx,yy);fist(c,s*xx,yy,.27);}
    if(/腕屈|下垂/.test(mudra))for(const s of[-1,1])curve(c,s*xx,yy+.035,s*(xx+.045),yy+.14,s*(xx-.035),yy+.12);
    return;
  }
  if (arms === 2 && /承托|托輪|托轮/.test(mudra + right + left)) {
    for (const s of [-1, 1]) { path(c, [[s * .18, -.13], [s * .38, -.08], [s * .41, -.47]]); ellipse(c, s * .41, -.49, .08, .023); }
    path(c, [[-.59, -.53], [.59, -.53]]); return;
  }
  if (arms >= 2 && /合掌/.test(mudra + right + left)) {
    if(/舉頂|举顶|頂上|顶上/.test(mudra)){
      for(const s of[-1,1])path(c,[[s*.18,-.13],[s*.32,-.44],[s*.035,-.82]]);
      path(c,[[-.055,-.77],[-.03,-.91],[0,-.97],[.03,-.91],[.055,-.77]]);path(c,[[0,-.97],[0,-.77]]);
      if(arms===2)return;firstArm=2;
    } else {
    armTo(-1, -.025, -.02); armTo(1, .025, -.02);
    path(c, [[-.05, .04], [-.025, -.13], [0, -.19], [.025, -.13], [.05, .04]]);
    path(c, [[0, -.19], [0, .05]]); if (arms === 2) return; firstArm = 2;
    }
  }
  if (arms >= 2 && /交叉|交臂|胸前結印|胸前结印/.test(mudra)) {
    armTo(-1, .11, -.11); armTo(1, -.11, -.11);
    fist(c,-.11,-.14,.24);fist(c,.11,-.14,.24);
    if(/持/.test(mudra))attrs.slice(0,2).forEach((item,i)=>drawBookAttribute(c,item,i?-.16:.16,-.25,.28));
    if (arms === 2) return; firstArm = 2;
  }
  if (arms === 2 && /捧|持如來舌|持如来舌/.test(mudra)) {
    armTo(-1,-.16,.15);armTo(1,.16,.15);hand(c,-.16,.15,'');hand(c,.16,.15,'');
    const lotusBorne=/蓮|莲/.test(mudra)&&/承/.test(mudra);
    const items=lotusBorne?attrs.filter(a=>!/^蓮華$|^蓮花$|^莲华$|^莲花$/.test(words(a))):attrs;
    if(lotusBorne)lotus(c,.12,.68);
    if(items.length)items.forEach((item,i)=>drawBookAttribute(c,item,(i-(items.length-1)/2)*.23,lotusBorne?-.08:.01,.40));
    else if(/花|華|莲|蓮/.test(mudra))drawBookAttribute(c,'鮮花',0,.01,.43);
    return;
  }
  if(arms===2 && /奏樂|奏乐/.test(mudra) && attrs.length){
    armTo(-1,-.16,.09);armTo(1,.13,.2);
    drawBookAttribute(c,attrs[0],0,.045,.56);hand(c,-.16,.09,'');hand(c,.13,.2,'');return;
  }
  if (arms === 2 && /定印|禪定|禅定/.test(mudra)) {
    armTo(-1, -.075, .26); armTo(1, .075, .26);
    ellipse(c, 0, .27, .105, .028); ellipse(c, 0, .225, .08, .025); curve(c, -.035, .215, 0, .15, .035, .215); return;
  }
  if (arms === 2 && /智拳/.test(mudra)) {
    armTo(-1, -.016, -.16); armTo(1, .035, .02);
    ellipse(c, 0, -.14, .047, .042); ellipse(c, 0, .035, .05, .038); path(c, [[-.006, .001], [-.006, -.1]]); path(c, [[.015, .001], [.015, -.1]]); return;
  }
  // Right/left refer to the deity; its right is on the viewer's left.
  const rightItems=right.split(/[、，,]/).filter(Boolean),leftItems=left.split(/[、，,]/).filter(Boolean);
  for (let i = firstArm; i < arms; i++) {
    const s = i % 2 === 0 ? -1 : 1, rank = Math.floor(i / 2), n = Math.ceil(arms / 2);
    const meaning = (s===-1?rightItems:leftItems)[rank] || '';
    // An unordered attribute list does not establish which hand holds each object.
    const item = isGesture(meaning) ? '' : meaning;
    const low = /膝|願|愿|觸地|触地|下垂/.test(meaning);
    const angle = n > 1 ? -.95 + rank / Math.max(1, n - 1) * 1.85 : -.15;
    const x = s * (n > 1 ? .26 + .20 * Math.cos(angle) : .32);
    const y = n > 1 ? -.06 + .36 * Math.sin(angle) : low ? .32 : -.035;
    curve(c, s * .18, -.13 + rank * .008, s * .34, y + .13, x, y);
    hand(c, x, y, meaning);
    if (item) drawBookAttribute(c, item, x + s * .035, y - .15, .32);
  }
}
function mount(c, name) {
  if (!name) return false;
  if (/蓮|莲/.test(name)) { lotus(c, .65, 1.2); return true; }
  if (/須彌|须弥|山|岩|磐石/.test(name)) { path(c, [[-.6, .78], [-.39, .36], [-.20, .51], [0, .36], [.19, .47], [.37, .32], [.62, .78]], true); return true; }
  if(/草座|荷葉座|荷叶座/.test(name)){ellipse(c,0,.64,.56,.08);for(let i=0;i<9;i++)path(c,[[0,.60],[-.48+i*.12,.66]]);return true;}
  if(/踏大自在/.test(name)){
    for(const s of[-1,1]){face(c,s*.45,.67,.07,'deva',false);ellipse(c,s*.19,.70,.17,.06);path(c,[[s*.13,.69],[s*.02,.61],[s*.07,.75]]);}
    return true;
  }
  if (!/象|鳥|鸟|鵝|鹅|孔雀|鶴|鹤|迦樓羅|迦楼罗|牛|羊|馬|马|獅|狮|虎|車|车/.test(name)) return false;
  // Animal mounts are a distinct silhouette below the figure; their name remains in the sourced detail.
  c.save(); c.translate(0, .55); c.scale(.55, .55);
  if(/群/.test(name))for(const xx of[-.45,0,.45]){c.save();c.translate(xx,0);c.scale(.62,.8);animal(c,name);c.restore();}
  else animal(c,name);
  if (/車|车/.test(name)) { path(c, [[-.58, .6], [.58, .6]]); ellipse(c, -.28, .67, .14); ellipse(c, .28, .67, .14); }
  c.restore(); return true;
}
function textEmblem(c, name) {
  const text = String(name || '').replace(/菩薩|如來|明王/g, '');
  c.font = '.18px "Songti TC", serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  const chunks = text.match(/.{1,4}/gu) || [''];
  chunks.slice(0, 3).forEach((line, i) => c.fillText(line, 0, (i - (Math.min(chunks.length, 3) - 1) / 2) * .23));
}

/** Draw at the origin. Returned metadata describes the actual rendering, not ritual approval. */
export function drawBookSeat(ctx, seat, radius) {
  if (!Number.isFinite(radius) || radius <= 0) return { kind: 'none', missing: [] };
  const ob = { color:seat.color, rightHand:seat.rightHand, leftHand:seat.leftHand,
    mudra:seat.mudra, mount:seat.mount, poseDetail:seat.poseDetail, ...(seat.observation || {}) }, missing = [];
  if(/飛行|飞行|飛天|飞天/.test(words(ob.poseDetail)+words(ob.appearance))) ob.pose='flying';
  else if(/舞姿|舞形/.test(words(ob.poseDetail))) ob.pose='dancing';
  ctx.save();
  try {
    ctx.scale(radius, radius); ctx.lineWidth = .016; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = colorOf(ob.color); ctx.fillStyle = ctx.strokeStyle;
    if (ob.kind === 'symbol' || seat.form === 'samaya') {
      const attrs = ob.attributes || [];
      let drawn = false;
      // Architectural occupants and the all-knowing triangle belong inside their parent emblem.
      if(attrs.some(a=>/樓|楼/.test(words(a)))){
        tower(ctx,attrs.some(a=>/閣內天人|阁内天人/.test(words(a))));return {kind:'symbol',missing};
      }
      if(attrs.some(a=>/三角智印/.test(words(a)))){
        path(ctx,[[0,-.43],[-.44,.31],[.44,.31]],true);
        if(attrs.some(a=>/卍/.test(words(a))))drawBookAttribute(ctx,'卍字',0,.045,.40);
        if(attrs.some(a=>/蓮座|莲座/.test(words(a))))lotus(ctx,.54,1.05);
        if(attrs.some(a=>/火焰|光焰/.test(words(a))))flame(ctx,.55);
        return {kind:'symbol',missing};
      }
      const items = attrs.filter(a => !/^火焰$|^光焰$|^蓮座$|^莲座$|^方座$/.test(words(a)));
      if (attrs.some(a => /^火焰$|^光焰$/.test(words(a)))) {flame(ctx,.52);drawn=true;}
      if(attrs.some(a=>/^蓮座$|^莲座$/.test(words(a))))lotus(ctx,.61,1.05);
      if(attrs.some(a=>/^方座$/.test(words(a))))drawBookAttribute(ctx,'方座',0,.38,.95);
      for (const [i, item] of items.entries()) {
        const x = items.length > 1 ? (i - (items.length - 1) / 2) * .40 : 0;
        drawn = drawBookAttribute(ctx, item, x, 0, items.length > 1 ? .66 : 1.05) || drawn;
      }
      if (!drawn) drawn = drawBookAttribute(ctx, seat.name, 0, 0, 1.05);
      if (!drawn) { textEmblem(ctx, seat.name); missing.push('emblem-shape'); }
      return { kind: drawn ? 'symbol' : 'name', missing };
    }
    const visibleHeads = Number.isInteger(ob.visibleHeads) ? ob.visibleHeads : ob.heads;
    if (!Number.isInteger(visibleHeads)) {
      textEmblem(ctx, seat.name);
      return { kind: 'name', missing: ['heads'] };
    }
    if (!Number.isInteger(ob.arms)) missing.push('arms');
    if (!['seated', 'standing', 'reclining', 'flying', 'dancing', 'half-body'].includes(ob.pose)) missing.push('pose');
    if (ob.enclosure === 'vajra' || seat.assembly === 'misai') {
      ctx.save(); ctx.globalAlpha *= .55; ctx.scale(1.25, 1.55); vajra(ctx, 1); ctx.restore(); ctx.scale(.70, .70);
    }
    if (/火焰|光焰/.test(words(ob.attributes)) && ob.pose!=='reclining') { ctx.save(); ctx.globalAlpha *= .6; flame(ctx, .63); ctx.restore(); }
    const hasMount=ob.mount && mount(ctx, ob.mount);
    if (hasMount) { ctx.translate(0, -.13); ctx.scale(.85, .85); }
    if (ob.pose === 'reclining') { ctx.rotate(-Math.PI / 2); ctx.scale(.82, .82); }
    if (ob.pose === 'flying') { ctx.rotate(-.25); ctx.scale(.86, .86); }
    if(ob.pose!=='reclining'){ctx.save(); ctx.globalAlpha *= .42; ellipse(ctx, 0, -.40, .32, .37); ctx.restore();}
    const headRows = seat.canonicalId==='bonten'&&visibleHeads===4 ? [3,1]
      : /鳩摩羅|鸠摩罗/.test(seat.name||'')&&visibleHeads===6 ? [3,3] : null;
    const rows = headRows?.length || Math.ceil(visibleHeads / 5), hr = Math.min(.14, .25 / Math.max(1, rows));
    let remaining = visibleHeads;
    for (let row = 0; row < rows; row++) {
      const count = headRows?.[row] || Math.min(5, remaining);
      for (let i = 0; i < count; i++) face(ctx, (i - (count - 1) / 2) * hr * 2.1, -.39 - row * hr * 2.6, hr, ob.kind,
        ob.pose!=='reclining' && (/寶冠|宝冠/.test(ob.appearance || '') || !['buddha','monk','wrath'].includes(ob.kind)), words(ob.attributes));
      remaining -= count;
    }
    // Robe and body are drawn separately from the source-controlled arm count.
    path(ctx, [[-.06, -.22], [-.06, -.16], [-.19, -.13], [-.20, .05], [-.14, .28]]);
    path(ctx, [[.06, -.22], [.06, -.16], [.19, -.13], [.20, .05], [.14, .28]]);
    if (['buddha', 'monk'].includes(ob.kind)) { curve(ctx, -.19, -.12, -.02, .23, .15, .29); curve(ctx, -.18, -.06, -.05, .27, .11, .31); }
    else if(ob.pose!=='reclining') { curve(ctx, -.12, -.13, 0, .10, .12, -.13); ellipse(ctx, 0, .04, .027, .035); path(ctx, [[-.15, .18], [.15, .18]]); }
    if(/甲冑|鎧|铠/.test(words(ob.attributes)+words(ob.appearance)))for(let i=0;i<4;i++)path(ctx,[[-.16,-.07+i*.07],[.16,-.07+i*.07]]);
    if(/骷髏飾|骷髅饰/.test(words(ob.attributes)))for(const xx of[-.09,0,.09]){ellipse(ctx,xx,.07,.035,.041);ellipse(ctx,xx-.01,.06,.007);ellipse(ctx,xx+.01,.06,.007);}
    hands(ctx, ob);
    if (/羽翼/.test(words(ob.attributes))) for (const s of [-1, 1]) {
      curve(ctx, s * .15, -.11, s * .62, -.52, s * .68, .30);
      for (let i = 0; i < 4; i++) curve(ctx, s * .2, -.04 + i * .06, s * .5, -.13 + i * .08, s * .65, .15 + i * .06);
    }
    if (ob.pose === 'seated') {
      ctx.beginPath(); ctx.moveTo(-.14, .24); ctx.quadraticCurveTo(-.50, .34, -.47, .46); ctx.quadraticCurveTo(-.10, .58, .47, .46); ctx.quadraticCurveTo(.50, .34, .14, .24); ctx.stroke();
      curve(ctx, -.4, .43, 0, .3, .36, .48); curve(ctx, -.30, .48, .08, .50, .20, .38);
      if(!hasMount){if(['deva','wrath'].includes(ob.kind))ellipse(ctx,0,.56,.53,.09);else lotus(ctx,.59,1.07);}
    } else if (ob.pose === 'half-body') {
      curve(ctx, -.14, .28, 0, .42, .14, .28);
    } else if (ob.pose === 'reclining') {
      path(ctx,[[-.14,.25],[-.09,.52],[-.07,.76],[-.17,.80]]);
      path(ctx,[[.14,.25],[.10,.52],[.08,.76],[.18,.80]]);
    } else if (ob.pose === 'flying') {
      path(ctx,[[-.14,.25],[-.27,.42],[-.06,.54],[.03,.59]]);
      path(ctx,[[.14,.25],[.35,.36],[.24,.59],[.33,.60]]);
      for(const s of[-1,1]){curve(ctx,s*.18,-.15,s*.66,-.42,s*.68,.17);curve(ctx,s*.68,.17,s*.57,.52,s*.85,.64);}
    } else if (ob.pose === 'dancing') {
      path(ctx,[[-.14,.25],[-.32,.36],[-.12,.43],[-.02,.49]]);
      path(ctx,[[.14,.25],[.18,.49],[.10,.67],[.26,.69]]);
      lotus(ctx,.75,1.02);
    } else if (!missing.includes('pose')) {
      const wrath = ob.kind === 'wrath', spread = wrath ? .30 : .12;
      path(ctx, [[-.14, .25], [-spread, .44], [-spread - .04, .66], [-spread - .17, .68]]);
      path(ctx, [[.14, .25], [spread, .44], [spread + .04, .66], [spread + .17, .68]]);
      if (!wrath) { curve(ctx, -.15, .24, -.12, .54, .14, .56); curve(ctx, .15, .24, .09, .48, -.12, .56); }
      if (ob.pose === 'standing' && !hasMount) lotus(ctx, .74, 1.07);
    }
    if (ob.offering) lotus(ctx, .15, .74);
    // When the source lists attributes without assigning hands, keep them as clearly separated marginal emblems.
    if (!ob.rightHand && !ob.leftHand && !/捧|奏樂|奏乐|持如來舌|持如来舌|持本標幟|持本标帜/.test(words(ob.mudra)) && (ob.attributes || []).length) {
      const items = ob.attributes.filter(a => !BODY_ATTRIBUTE.test(words(a))).slice(0, 6);
      items.forEach((a, i) => drawBookAttribute(ctx, a, (i % 2 ? 1 : -1) * .68, -.21 + Math.floor(i / 2) * .29, .26));
    }
    return { kind: missing.length ? 'partial' : 'figure', missing };
  } finally { ctx.restore(); }
}
