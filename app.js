(() => {
  const $ = (id) => document.getElementById(id);
  const els = {
    modeCards: [...document.querySelectorAll(".mode-card")], grade: $("grade-select"), publisher: $("publisher-select"), unit: $("unit-select"),
    scienceFilters: $("science-filters"), unitField: $("unit-field"), lengthControl: $("length-control"), customField: $("custom-field"), customItems: $("custom-items"),
    length: $("length-range"), lengthOut: $("length-output"), speed: $("speed-select"), playMode: $("play-mode"), start: $("start-button"),
    welcome: $("welcome-state"), sequence: $("sequence-state"), answer: $("answer-state"), result: $("result-state"), title: $("play-title"), round: $("round-pill"),
    sequenceItems: $("sequence-items"), stageInstruction: $("stage-instruction"), stageTimer: $("stage-timer"), answerInstruction: $("answer-instruction"),
    slots: $("answer-slots"), bank: $("choice-bank"), undo: $("undo-button"), clear: $("clear-button"), submit: $("submit-button"),
    digitAnswerField: $("digit-answer-field"), digitAnswer: $("digit-answer"), answerHint: $("answer-hint"), pause: $("pause-button"), resultIcon: $("result-icon"), resultHeading: $("result-heading"),
    resultCopy: $("result-copy"), answerReveal: $("answer-reveal"), replay: $("replay-button"), next: $("next-button"), restart: $("restart-button"),
    source: $("source-label"), announcer: $("announcer"), sound: $("sound-toggle"), focus: $("focus-toggle"), fullscreen: $("fullscreen-toggle"), dialog: $("help-dialog"),
    help: $("teacher-help"), closeHelp: $("close-help"), doneHelp: $("done-help")
  };

  const state = { mode:"digits", phase:"idle", sequence:[], chosen:[], answerStack:[], usedIds:new Set(), round:0, roundsTotal:5, timer:0, paused:false, sound:false, audio:null, lastSet:null, pauseResolve:null };
  const digitLabels = ["０","１","２","３","４","５","６","７","８","９"];

  function announce(message) { els.announcer.textContent = ""; window.setTimeout(() => { els.announcer.textContent = message; }, 20); }
  function clearTimer() { if (state.timer) window.clearTimeout(state.timer); state.timer = 0; }
  function beep(frequency=610, duration=.09) {
    if (!state.sound) return;
    try { state.audio ||= new (window.AudioContext || window.webkitAudioContext)(); const oscillator=state.audio.createOscillator(); const gain=state.audio.createGain(); oscillator.frequency.value=frequency; oscillator.type="sine"; gain.gain.value=.045; oscillator.connect(gain); gain.connect(state.audio.destination); oscillator.start(); oscillator.stop(state.audio.currentTime+duration); } catch { /* Audio is optional. */ }
  }
  function sleep(ms) { return new Promise(resolve => { const id=window.setTimeout(()=>{state.timer=0;resolve();},ms); state.timer=id; }); }
  function updateLength() { els.lengthOut.value=`${els.length.value} 個`; els.lengthOut.textContent=`${els.length.value} 個`; document.querySelectorAll("[data-length]").forEach(button=>button.classList.toggle("is-active", Number(button.dataset.length)===Number(els.length.value))); }
  function currentSets() {
    const grade=els.grade.value, publisher=els.publisher.value, unit=els.unit.value;
    return window.SCIENCE_SETS.filter(set=>(grade==="all"||String(set.grade)===grade)&&(publisher==="all"||set.publisher===publisher)&&(unit==="all"||set.id===unit));
  }
  function syncLengthBounds() {
    const quick=document.querySelector(".quick-lengths");
    if(state.mode==="digits") { els.length.min="6"; els.length.max="12"; if(quick)quick.hidden=false; }
    else if(state.mode==="custom") { els.length.min="3"; els.length.max="12"; if(quick)quick.hidden=true; }
    else {
      const sets=currentSets(); const counts=sets.map(set=>set.items.length); const low=counts.length?Math.min(...counts):2; const high=counts.length?Math.max(...counts):2;
      els.length.min=String(low); els.length.max=String(high); if(quick)quick.hidden=true;
    }
    const value=Math.max(Number(els.length.min),Math.min(Number(els.length.max),Number(els.length.value)));
    els.length.value=String(value); const ends=els.length.parentElement.querySelectorAll(".range-ends span");
    if(ends.length){ends[0].textContent=`${els.length.min} 個`;ends[1].textContent=`${els.length.max} 個`;}
    updateLength();
  }
  function fillUnits() {
    const before=els.unit.value; const grade=els.grade.value, publisher=els.publisher.value;
    const sets=window.SCIENCE_SETS.filter(set=>(grade==="all"||String(set.grade)===grade)&&(publisher==="all"||set.publisher===publisher));
    els.unit.replaceChildren(new Option("所有主題","all"));
    const groups=new Map();
    sets.forEach(set=>{ if(!groups.has(set.topic)) groups.set(set.topic,[]); groups.get(set.topic).push(set); });
    groups.forEach((entries,topic)=>{ const group=document.createElement("optgroup"); group.label=topic; entries.forEach(set=>{const option=new Option(`${set.grade}年級・${set.term}・${set.publisher}｜${set.unit}`,set.id);group.append(option);});els.unit.append(group); });
    if([...els.unit.options].some(option=>option.value===before))els.unit.value=before;
    if(state.mode==="cards"||state.mode==="words")syncLengthBounds();
  }
  function setMode(mode) {
    if(state.phase!=="idle"&&state.phase!=="result") resetGame();
    state.mode=mode;
    els.modeCards.forEach(card=>{const selected=card.dataset.mode===mode;card.classList.toggle("is-selected",selected);card.setAttribute("aria-pressed",String(selected));});
    const science=mode==="cards"||mode==="words";
    els.scienceFilters.hidden=!science; els.unitField.hidden=!science; els.lengthControl.hidden=mode==="custom"; els.customField.hidden=mode!=="custom";
    syncLengthBounds();
    els.source.textContent=modeLabel(mode);
  }
  function modeLabel(mode=state.mode) { return ({digits:"今日任務：數字倒背",cards:"今日任務：自然圖卡倒序",words:"今日任務：自然詞語倒背",custom:"今日任務：教師自訂題組"})[mode]; }
  function renderIdle(message="準備開始了嗎？") {
    els.welcome.hidden=false; els.sequence.hidden=true; els.answer.hidden=true; els.result.hidden=true;
    els.title.textContent=message; els.round.textContent="準備區"; els.source.textContent=modeLabel(); state.phase="idle";
  }
  function resetGame() { clearTimer(); state.paused=false; state.chosen=[]; state.answerStack=[]; state.usedIds.clear(); state.round=0; els.digitAnswer.value=""; renderIdle(); }
  function digitSequence(length) { return Array.from({length},()=>String(Math.floor(Math.random()*10))); }
  function customSequence() {
    const words=els.customItems.value.split(/[，,、\n\r]+/).map(word=>word.trim()).filter(Boolean);
    if(words.length<3)return {error:"請至少輸入 3 個詞語，才能開始自訂題組。"};
    if(words.length>12)return {error:"自訂詞語最多 12 個，請刪掉一些再試試。"};
    const length=Math.min(words.length,Math.max(3,Number(els.length.value)));
    return {items:shuffle(words).slice(0,length).map((text,index)=>({text,icon:text[0],id:`custom-${index}-${Math.random()}`})),label:"教師自訂詞語"};
  }
  function shuffle(items) { const copy=[...items]; for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy; }
  function itemText(item) { return typeof item==="string"?item:item.text; }
  function selectSequence() {
    if(state.mode==="digits")return {items:digitSequence(Number(els.length.value)),label:"數字倒背"};
    if(state.mode==="custom")return customSequence();
    const sets=currentSets();
    if(!sets.length)return {error:"目前沒有符合條件的題組，請調整年級或版本。"};
    const count=Number(els.length.value); const eligible=sets.filter(item=>item.items.length>=count);
    if(!eligible.length)return {error:"這個篩選條件沒有足夠活動數的單元，請縮短序列或更換單元。"};
    const choices=eligible.length>1?eligible.filter(item=>item.id!==state.lastSet?.id):eligible;const set=choices[Math.floor(Math.random()*choices.length)]; state.lastSet=set;
    return {items:shuffle(set.items).slice(0,count).map(item=>({...item})),label:state.mode==="cards"?"自然圖卡倒序":"自然詞語倒背",source:`${set.grade}年級・${set.term}・${set.publisher}｜${set.unit}`};
  }
  function makeToken(item,index,mode=state.mode) {
    const token=document.createElement("span");token.className="sequence-token";token.dataset.index=index;
    if(mode==="cards") { token.classList.add("card-token"); const picture=document.createElement("img");picture.src=`assets/images/nature-cards/${item.art||"animal"}.webp`;picture.alt="";picture.setAttribute("aria-hidden","true");const label=document.createElement("span");label.className="card-caption";label.textContent=item.text;token.append(picture,label);token.setAttribute("aria-label",item.text); }
    else { token.textContent=mode==="digits"?digitLabels[Number(item)]:item.text; if(mode==="words"||mode==="custom")token.classList.add("word-token");token.setAttribute("aria-label",mode==="digits"?`數字 ${item}`:item.text); }
    return token;
  }
  async function waitUntilResumed() { while(state.paused) await new Promise(resolve=>{state.pauseResolve=resolve;}); }
  async function runSequence({replay=false}={}) {
    clearTimer(); state.paused=false; state.chosen=[];state.answerStack=[];state.usedIds.clear();els.digitAnswer.value="";
    if(!replay){
      const picked=selectSequence(); if(picked.error){renderIdle(picked.error);announce(picked.error);return;}
      state.sequence=picked.items; state.currentLabel=picked.label; state.currentSource=picked.source||"";
      if(state.mode==="digits")state.currentLength=state.sequence.length;
    }
    els.welcome.hidden=true;els.answer.hidden=true;els.result.hidden=true;els.sequence.hidden=false;
    els.title.textContent=replay?"再看一次，記住順序！":"請記住出現順序";els.round.textContent=`第 ${Math.max(1,state.round)} / ${state.roundsTotal} 題`;els.pause.hidden=state.mode==="digits";
    els.source.textContent=state.currentSource?`${state.currentLabel}｜${state.currentSource}`:modeLabel();
    els.stageInstruction.textContent="請記住出現順序";els.stageTimer.textContent="準備好了就開始看";
    els.sequenceItems.replaceChildren(...state.sequence.map((item,index)=>makeToken(item,index)));
    await sleep(800);
    for(let i=0;i<state.sequence.length;i++){
      await waitUntilResumed();
      const token=els.sequenceItems.children[i]; if(!token)return;
      token.classList.remove("is-hidden"); beep(500+i*40,.07);
      els.stageTimer.textContent=`第 ${i+1} 個，共 ${state.sequence.length} 個`;
      await sleep(Number(els.speed.value));
      token.classList.add("is-hidden");
      if(i<state.sequence.length-1)await sleep(Math.min(240,Number(els.speed.value)*.2));
    }
    await waitUntilResumed();
    els.sequence.hidden=true;showAnswer();
  }
  function showAnswer() {
    state.phase="answer";els.answer.hidden=false;els.title.textContent="換你倒著排列";els.round.textContent=`第 ${state.round} / ${state.roundsTotal} 題`;
    const digits=state.mode==="digits";els.digitAnswerField.hidden=!digits;els.slots.hidden=digits;els.bank.hidden=digits;els.answerInstruction.textContent=digits?"從最後一個數字開始，倒著輸入":"從最後出現的項目開始，依序點選";
    els.answerHint.textContent="";
    if(digits){els.digitAnswer.maxLength=state.sequence.length;els.digitAnswer.value="";els.digitAnswer.placeholder=`請輸入 ${state.sequence.length} 個數字`;window.setTimeout(()=>els.digitAnswer.focus(),30);}
    else { state.chosen=[];state.answerStack=[]; buildAnswerTiles(); }
    announce("序列已結束，請倒著回答。請記得由最後一個開始。");
  }
  function buildAnswerTiles() {
    const count=state.sequence.length;els.slots.replaceChildren();
    for(let i=0;i<count;i++){const slot=document.createElement("div");slot.className="answer-slot";slot.setAttribute("aria-label",`答案第 ${i+1} 格，${state.chosen[i]?itemText(state.chosen[i].item):"空白"}`);if(state.chosen[i]){slot.textContent=state.chosen[i].item.text;slot.classList.add("is-filled");}els.slots.append(slot);}
    els.bank.replaceChildren();
    const options=state.sequence.map((item,index)=>({item,sourceIndex:index,id:`${index}`}));
    shuffle(options).forEach(option=>{const button=document.createElement("button");button.type="button";button.className="choice-button";if(state.mode==="cards"){button.classList.add("card-choice");const picture=document.createElement("img");picture.src=`assets/images/nature-cards/${option.item.art||"animal"}.webp`;picture.alt="";picture.setAttribute("aria-hidden","true");const label=document.createElement("span");label.className="card-caption";label.textContent=option.item.text;button.append(picture,label);button.setAttribute("aria-label",option.item.text);}else{button.textContent=option.item.text;if(state.mode!=="digits")button.classList.add("word-choice");button.setAttribute("aria-label",option.item.text);}button.dataset.sourceIndex=option.sourceIndex;button.disabled=state.usedIds.has(option.id);button.addEventListener("click",()=>choose(option));els.bank.append(button);});
    els.submit.disabled=false;
  }
  function choose(option) { if(state.chosen.length>=state.sequence.length||state.usedIds.has(String(option.sourceIndex)))return;state.chosen.push(option);state.answerStack.push(option);state.usedIds.add(String(option.sourceIndex));buildAnswerTiles();beep(620,.05); }
  function undoChoice() { const last=state.answerStack.pop();if(!last)return;state.chosen=state.chosen.filter(item=>item.sourceIndex!==last.sourceIndex);state.usedIds.delete(String(last.sourceIndex));buildAnswerTiles(); }
  function clearChoices() { state.chosen=[];state.answerStack=[];state.usedIds.clear();buildAnswerTiles(); }
  function displayValue(item,mode=state.mode) { if(typeof item==="string")return mode==="digits"?digitLabels[Number(item)]:item;return mode==="cards"?`${item.icon||""} ${item.text}`.trim():item.text; }
  function submitAnswer() {
    if(state.mode==="digits") { const value=els.digitAnswer.value.replace(/\s/g,"");if(value.length!==state.sequence.length){els.answerHint.textContent=`請輸入完整的 ${state.sequence.length} 個數字再送出。`;announce(`還差數字，請輸入完整 ${state.sequence.length} 個數字。`);els.digitAnswer.focus();return;}els.answerHint.textContent="";finish(value.split("").reverse().join("")===state.sequence.join(""));return; }
    if(state.chosen.length!==state.sequence.length){els.answerHint.textContent="還有位置空著，排好每一格再送出。";announce("請把每個位置都排好，再送出答案。");return;}
    els.answerHint.textContent="";
    const expected=[...state.sequence].reverse();const correct=expected.every((item,index)=>item.text===state.chosen[index].item.text);finish(correct);
  }
  function finish(correct) {
    clearTimer();state.phase="result";state.correct=correct;state.paused=false;els.sequence.hidden=true;els.answer.hidden=true;els.result.hidden=false;
    els.title.textContent=correct?"完成這回合了！":"再試一次也沒關係";els.round.textContent=`第 ${state.round} / ${state.roundsTotal} 題`;
    els.resultIcon.textContent=correct?"✓":"↺";els.resultIcon.classList.toggle("is-try",!correct);els.resultHeading.textContent=correct?"順序記得很清楚！":"把最後看到的，先放到最前面";
    els.resultCopy.textContent=correct?(els.playMode.value==="challenge"?"漂亮完成！繼續下一回合，看看自己能專心到哪裡。":"做得好！你可以再試一題，或調整挑戰長度。"):"不急，重新看一次線索，試著從最後一個開始回想。";
    els.answerReveal.replaceChildren();
    if(!correct&&els.playMode.value==="practice") [...state.sequence].reverse().forEach(item=>{const chip=document.createElement("span");chip.textContent=displayValue(item);els.answerReveal.append(chip);});
    const done=correct&&state.round>=state.roundsTotal;els.next.textContent=done?"完成挑戰 ✓":"下一題　→";els.next.disabled=!correct;
    announce(correct?"答對了，做得好！":"再試一次也沒關係，記得從最後一個開始。");beep(correct?760:330,.13);
  }
  function startGame() { if(state.phase==="sequence"){togglePause();return;}state.round=1;state.roundsTotal=els.playMode.value==="challenge"?5:1;state.phase="sequence";runSequence(); }
  function togglePause() {
    if(state.phase!=="sequence")return;
    if(state.paused){state.paused=false;els.start.firstElementChild.textContent="暫停播放";els.pause.textContent="暫停播放";els.stageTimer.textContent="繼續看順序";if(state.pauseResolve){state.pauseResolve();state.pauseResolve=null;}return;}
    state.paused=true;clearTimer();els.start.firstElementChild.textContent="繼續播放";els.pause.textContent="繼續播放";els.stageInstruction.textContent="已暫停，準備好再繼續";els.stageTimer.textContent="按暫停鍵繼續";announce("序列已暫停。");
  }
  function nextRound() { if(els.playMode.value!=="challenge"||state.round>=state.roundsTotal){resetGame();return;}state.round++;state.phase="sequence";runSequence(); }
  function openHelp() { if(typeof els.dialog.showModal==="function")els.dialog.showModal();else els.dialog.setAttribute("open",""); }
  function closeHelp() { if(typeof els.dialog.close==="function")els.dialog.close();else els.dialog.removeAttribute("open"); }

  els.modeCards.forEach(card=>card.addEventListener("click",()=>setMode(card.dataset.mode)));
  [els.grade,els.publisher].forEach(select=>select.addEventListener("change",fillUnits));
  els.unit.addEventListener("change",()=>{if(state.mode==="cards"||state.mode==="words")syncLengthBounds();});
  els.length.addEventListener("input",updateLength);document.querySelectorAll("[data-length]").forEach(button=>button.addEventListener("click",()=>{els.length.value=button.dataset.length;updateLength();}));
  els.start.addEventListener("click",()=>{if(state.phase==="sequence")togglePause();else startGame();});els.pause.addEventListener("click",togglePause);
  els.submit.addEventListener("click",submitAnswer);els.digitAnswer.addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();submitAnswer();}});
  els.undo.addEventListener("click",undoChoice);els.clear.addEventListener("click",clearChoices);els.replay.addEventListener("click",()=>{state.phase="sequence";runSequence({replay:true});});els.next.addEventListener("click",nextRound);els.restart.addEventListener("click",resetGame);
  els.help.addEventListener("click",openHelp);els.closeHelp.addEventListener("click",closeHelp);els.doneHelp.addEventListener("click",closeHelp);els.dialog.addEventListener("click",event=>{if(event.target===els.dialog)closeHelp();});
  els.sound.addEventListener("click",()=>{state.sound=!state.sound;els.sound.setAttribute("aria-pressed",String(state.sound));els.sound.textContent=`音效：${state.sound?"開":"關"}`;if(state.sound)beep();});
  els.focus.addEventListener("click",()=>{const enabled=document.body.classList.toggle("projector");els.focus.setAttribute("aria-pressed",String(enabled));els.focus.textContent=enabled?"離開投影":"大字投影";});
  els.fullscreen.addEventListener("click",async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{announce("此瀏覽器無法進入全螢幕，請使用瀏覽器的全螢幕功能。");}});
  document.addEventListener("fullscreenchange",()=>{const active=Boolean(document.fullscreenElement);els.fullscreen.setAttribute("aria-pressed",String(active));els.fullscreen.textContent=active?"離開全螢幕":"全螢幕";announce(active?"已進入全螢幕。":"已離開全螢幕。");});
  els.playMode.addEventListener("change",()=>{state.roundsTotal=els.playMode.value==="challenge"?5:1;});
  window.addEventListener("beforeunload",clearTimer);
  fillUnits();updateLength();renderIdle();
})();

