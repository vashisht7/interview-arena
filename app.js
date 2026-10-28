const $ = s => document.querySelector(s);
const projects = {bofa:'Bank of America',notes:'NoteEchoes',rag:'RAG & retrieval',mflash:'MFlash',data:'Data engineering',experience:'Experience & introduction',fundamentals:'Models & evaluation',python:'Python & APIs',coding:'SQL & Python coding',systems:'System design',behavior:'Pressure & behavioral',mcp:'MCP',agents:'Agent orchestration',prompts:'Prompt engineering',enterprise:'Enterprise engineering',production:'Production AI'};
const rounds = {
  1:{name:'Your introduction & projects',subtitle:'Experience & project stories',description:'Start with the introduction and your main project. Read each sample answer, then its follow-up. Keep claims aligned with your actual experience.'},
  2:{name:'Understand the concepts',subtitle:'Technical depth',description:'Learn how models, retrieval, data pipelines, and APIs work through questions and explained answers.'},
  3:{name:'Read worked solutions',subtitle:'Coding & system design',description:'Study the explanation and reference code together. Focus on what each solution does, why it works, and its edge cases.'},
  4:{name:'Understand tough follow-ups',subtitle:'Difficult interview questions',description:'Read professional responses to difficult questions about decisions, ownership, failures, and tradeoffs.'},
  5:{name:'Friday focus',subtitle:'This role · essential answers',description:'Study the answers for this role: MCP, production AI, enterprise engineering, Python, and airline system design.'}
};
let state={drafts:{},scores:{},reports:{},sessions:[]};
try {const loaded=JSON.parse(localStorage.getItem('interviewArenaV1')||'{}');if(loaded&&typeof loaded==='object')state={...state,...loaded}}catch{}
for(const key of ['drafts','scores','reports'])if(!state[key]||typeof state[key]!=='object')state[key]={};
let current=0,filter='all',activeRound=1,view='arena';
function save(){try{localStorage.setItem('interviewArenaV1',JSON.stringify(state))}catch{toast('Browser storage unavailable. Download your notes to keep them.')}}
function toast(t){$('#toast').textContent=t;$('#toast').style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').style.display='none',4000)}
function setView(v){view=v;document.querySelectorAll('.view').forEach(x=>x.hidden=x.id!==v);document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x.dataset.view===v));if(v==='progress')renderProgress()}
function priority(i){return cards[i].title==='Tell me about yourself'?0:cards[i].title==='Explain your Bank of America work'?1:2}
function pool(){return cards.map((c,i)=>i).filter(i=>cards[i].round===activeRound&&(filter==='all'||cards[i].project===filter)).sort((a,b)=>priority(a)-priority(b))}
function renderFilters(){const available=[...new Set(cards.filter(c=>c.round===activeRound).map(c=>c.project))];$('#filters').replaceChildren();for(const id of ['all',...available]){const b=document.createElement('button');b.className='filter';b.textContent=id==='all'?'All topics':projects[id];b.setAttribute('aria-pressed',String(filter===id));b.classList.toggle('active',filter===id);b.onclick=()=>{filter=id;current=pool()[0];render()};$('#filters').append(b)}}
function render(){const c=cards[current];if(!c)return;
 $('#questionTitle').textContent=c.title;$('#questionText').textContent=c.title==='Tell me about yourself'?'How can you introduce your experience clearly?':c.q;$('#questionTag').textContent=projects[c.project].toUpperCase();$('#counter').textContent=`${pool().indexOf(current)+1} / ${pool().length}`;
 $('#answerLabel').textContent=c.label;$('#modelAnswer').textContent=c.answer;$('#memoryCue').textContent=c.cue;$('#followup').textContent=c.trap;$('#followupAnswer').textContent=c.reply;$('#evidenceNote').textContent=c.evidence;
 $('#plainExplanation').textContent=c.learn.plain;$('#simpleExample').textContent=c.learn.example;
 $('#learningSteps').replaceChildren();for(const step of c.learn.steps){const li=document.createElement('li');li.textContent=step;$('#learningSteps').append(li)}
 $('#termDefinitions').replaceChildren();for(const item of c.learn.terms){const dt=document.createElement('dt');dt.textContent=item.term;const dd=document.createElement('dd');dd.textContent=item.meaning;$('#termDefinitions').append(dt,dd)}
 $('#termCount').textContent='· '+c.learn.terms.length+' terms';$('.terms-panel').open=false;
 $('#answerBox').hidden=false;$('#solutionBlock').hidden=!c.code;$('#solutionCode').textContent=c.code||'';$('#speakLabel').textContent=c.code?'2 · PROFESSIONAL EXPLANATION OF THE SOLUTION':'2 · HOW TO ANSWER PROFESSIONALLY';
 $('#sourceLink').hidden=!c.source;if(c.source){$('#sourceLink').href=c.source.url;$('#sourceLink').textContent=c.source.title+' ↗'}
 document.querySelectorAll('[data-round]').forEach(b=>{const selected=Number(b.dataset.round)===activeRound;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected))});
 $('#chapterStat').textContent=rounds[activeRound].subtitle;$('#chapterNumber').textContent=String(activeRound).padStart(2,'0');$('#roundHeading').textContent=rounds[activeRound].name;$('#roundDescription').textContent=rounds[activeRound].description;
 const ids=pool(),pos=ids.indexOf(current);$('#prev').disabled=pos===0;$('#next').disabled=pos===ids.length-1;renderFilters();
}
function chooseRound(n){activeRound=n;filter='all';current=pool()[0];setView('arena');render()}
function chooseProject(id){activeRound=1;filter=id;current=pool()[0];setView('arena');render()}
for(const [n,r] of Object.entries(rounds)){
 const b=document.createElement('button');b.className='round-card';b.dataset.round=n;const num=document.createElement('span');num.className='round-number';num.textContent='0'+n;const title=document.createElement('strong');title.textContent=r.name;const desc=document.createElement('small');desc.textContent=r.subtitle;const count=document.createElement('span');count.className='round-count';count.textContent=cards.filter(c=>c.round===Number(n)).length+' lessons';b.append(num,title,desc,count);b.onclick=()=>chooseRound(Number(n));$('#rounds').append(b);
 const side=document.createElement('button');side.className='campaign-btn';side.dataset.round=n;const badge=document.createElement('b');badge.textContent='0'+n;side.append(badge,document.createTextNode(r.subtitle));side.onclick=()=>chooseRound(Number(n));$('#campaign').append(side);
}
function move(d){const ids=pool(),pos=ids.indexOf(current)+d;if(pos<0||pos>=ids.length)return;current=ids[pos];render();$('#questionTitle').scrollIntoView({block:'start'})}
$('#next').onclick=()=>move(1);$('#prev').onclick=()=>move(-1);$('#shuffle').onclick=()=>{const ids=pool().filter(i=>i!==current);if(ids.length)current=ids[Math.floor(Math.random()*ids.length)];render()};
async function copy(text){try{await navigator.clipboard.writeText(text);toast('Copied to clipboard.')}catch{download('interview-context.md',text);toast('Clipboard unavailable. Downloaded a Markdown copy.')}}
function download(name,text){const a=document.createElement('a');const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$('#copyAnswer').onclick=()=>copy(cards[current].answer);$('#copyCode').onclick=()=>copy(cards[current].code||'');
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));$('.brand').onclick=e=>{e.preventDefault();setView('arena')};
const prompts={notes:'Inspect NoteEchoes. Focus on the Qwen3/QLoRA pipeline, synthetic evaluation, multilingual behavior and local-first architecture.',rag:'Inspect Agentic RAG Codebase Assistant. Focus on LangGraph, retrieval, Pinecone, Claude and Ragas evidence.',mflash:'Inspect MFlash. Focus on the classifier, MPNet ranking, authorization, idempotency and crash-safe file operations.'};
Object.keys(prompts).forEach((id,i)=>{const div=document.createElement('article');div.className='project-item';const sym=document.createElement('span');sym.className='symbol';sym.textContent=['◉','⌘','ϟ'][i];const text=document.createElement('div');const h=document.createElement('h3');h.textContent=projects[id];const p=document.createElement('p');p.textContent=['Report received · local AI & evaluation','Résumé overview + recommended design','Report received · decisions & safe execution'][i];text.append(h,p);const b=document.createElement('button');b.className='ghost';b.textContent='Read answers →';b.onclick=()=>chooseProject(id);div.append(sym,text,b);$('#projectCards').append(div)});
$('#promptPreview').textContent=repoPrompt;$('#projectSelect').onchange=()=>$('#report').value=state.reports[$('#projectSelect').value]||'';$('#report').value=state.reports.notes||'';$('#report').oninput=e=>{state.reports[$('#projectSelect').value]=e.target.value;save()};
$('#copyReport').onclick=()=>{const p=$('#projectSelect').value;if(!state.reports[p]?.trim()){toast('Paste a project report or a few notes first.');return}copy(`Use this ${projects[p]} evidence report to tailor my Interview Arena answers. Keep recommendations separate from verified implementation.\n\n${state.reports[p]}`)};
$('#export').onclick=()=>{let t='# Interview Arena notes\n';for(const [id,n]of Object.entries(state.reports))t+=`\n## ${projects[id]}\n${n}\n`;for(const[id,n]of Object.entries(state.drafts))if(cards[id])t+=`\n## ${cards[id].title}\n${n}\n`;download('my-interview-notes.md',t)};
function renderProgress(){
 $('#progressList').replaceChildren();for(let r=1;r<=5;r++){const heading=document.createElement('h3');heading.textContent=`Round ${r} · ${rounds[r].subtitle}`;$('#progressList').append(heading);cards.forEach((c,i)=>{if(c.round!==r)return;const row=document.createElement('div');row.className='progress-row';const title=document.createElement('strong');title.textContent=c.title;const b=document.createElement('button');b.className='ghost';b.textContent='Read answer →';b.onclick=()=>{activeRound=c.round;filter='all';current=i;setView('arena');render();$('#questionTitle').scrollIntoView({block:'start'})};row.append(title,b);$('#progressList').append(row)})}
}
$('#introCount').textContent=`${cards.length} lessons explained from the basics. Examples first, professional answers next.`;
$('#xp').textContent=cards.length;$('#rank').textContent='Always visible';$('#doneStat').textContent=cards.length;
chooseRound(location.hash==='#friday'?5:1);
