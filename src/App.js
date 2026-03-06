import { useState, useEffect } from "react";

const BRANDS = {
  Toyota:["Vios","Camry","Fortuner","Yaris","Corolla Cross"],
  Honda:["City","Civic","HR-V","CR-V","Jazz","Accord"],
  BMW:["3 Series","5 Series","X3","X5","1 Series"],
  Proton:["Saga","X50","X70","Persona","Iriz"],
  Perodua:["Myvi","Axia","Bezza","Ativa","Alza"],
  Mazda:["Mazda3","CX-5","CX-30","Mazda6"],
  Mercedes:["C-Class","E-Class","GLC","A-Class"],
  Hyundai:["Tucson","Santa Fe","Elantra","Kona"],
};
const CAR_DATA = {
  Toyota:{Vios:{p:89000,u:58000,t:"Sedan"},Camry:{p:199000,u:130000,t:"Sedan"},Fortuner:{p:220000,u:145000,t:"SUV"},Yaris:{p:78000,u:50000,t:"Hatchback"},"Corolla Cross":{p:128000,u:85000,t:"SUV"}},
  Honda:{City:{p:86000,u:56000,t:"Sedan"},Civic:{p:130000,u:85000,t:"Sedan"},"HR-V":{p:115000,u:75000,t:"SUV"},"CR-V":{p:168000,u:110000,t:"SUV"},Jazz:{p:90000,u:58000,t:"Hatchback"},Accord:{p:198000,u:128000,t:"Sedan"}},
  BMW:{"3 Series":{p:289000,u:165000,t:"Sedan"},"5 Series":{p:388000,u:220000,t:"Sedan"},X3:{p:320000,u:185000,t:"SUV"},X5:{p:540000,u:310000,t:"SUV"},"1 Series":{p:218000,u:130000,t:"Hatchback"}},
  Proton:{Saga:{p:42000,u:26000,t:"Sedan"},X50:{p:79000,u:52000,t:"SUV"},X70:{p:108000,u:72000,t:"SUV"},Persona:{p:50000,u:32000,t:"Sedan"},Iriz:{p:51000,u:33000,t:"Hatchback"}},
  Perodua:{Myvi:{p:52000,u:34000,t:"Hatchback"},Axia:{p:38000,u:24000,t:"Hatchback"},Bezza:{p:45000,u:29000,t:"Sedan"},Ativa:{p:68000,u:46000,t:"SUV"},Alza:{p:65000,u:42000,t:"MPV"}},
  Mazda:{Mazda3:{p:140000,u:88000,t:"Sedan"},"CX-5":{p:165000,u:105000,t:"SUV"},"CX-30":{p:142000,u:90000,t:"SUV"},Mazda6:{p:192000,u:120000,t:"Sedan"}},
  Mercedes:{"C-Class":{p:310000,u:180000,t:"Sedan"},"E-Class":{p:430000,u:250000,t:"Sedan"},GLC:{p:380000,u:220000,t:"SUV"},"A-Class":{p:228000,u:140000,t:"Hatchback"}},
  Hyundai:{Tucson:{p:155000,u:100000,t:"SUV"},"Santa Fe":{p:190000,u:125000,t:"SUV"},Elantra:{p:120000,u:78000,t:"Sedan"},Kona:{p:128000,u:82000,t:"SUV"}},
};
const CAR_IMAGES = {
  "Toyota Vios":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/2019_Toyota_Vios_1.5G_%28facelift%2C_red%29%2C_front_8.21.19.jpg/320px-2019_Toyota_Vios_1.5G_%28facelift%2C_red%29%2C_front_8.21.19.jpg",
  "Toyota Camry":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/2021_Toyota_Camry_%28AXVH71R%29_Ascent_Sport_hybrid_sedan_%282021-10-06%29_01.jpg/320px-2021_Toyota_Camry_%28AXVH71R%29_Ascent_Sport_hybrid_sedan_%282021-10-06%29_01.jpg",
  "Toyota Fortuner":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Toyota_Fortuner_2020.jpg/320px-Toyota_Fortuner_2020.jpg",
  "Honda City":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/2020_Honda_City_RS_e%3AHEV_%28GN2%29%2C_front_8.15.21.jpg/320px-2020_Honda_City_RS_e%3AHEV_%28GN2%29%2C_front_8.15.21.jpg",
  "Honda Civic":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/2022_Honda_Civic_Sport_FE%2C_front_9.5.22.jpg/320px-2022_Honda_Civic_Sport_FE%2C_front_9.5.22.jpg",
  "Honda HR-V":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/2022_Honda_HR-V_e%3AHEV_RS_%28RV5%29%2C_front_8.15.22.jpg/320px-2022_Honda_HR-V_e%3AHEV_RS_%28RV5%29%2C_front_8.15.22.jpg",
  "Honda CR-V":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/2023_Honda_CR-V_e%3APHEV_Advance_%28RS6%29%2C_front_12.22.22.jpg/320px-2023_Honda_CR-V_e%3APHEV_Advance_%28RS6%29%2C_front_12.22.22.jpg",
  "BMW 3 Series":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/2021_BMW_330i_M_Sport_%28G20%2C_facelift%2C_black%29%2C_front_8.15.21.jpg/320px-2021_BMW_330i_M_Sport_%28G20%2C_facelift%2C_black%29%2C_front_8.15.21.jpg",
  "BMW X3":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/2022_BMW_X3_xDrive30i_%28G01%2C_facelift%29%2C_front_8.15.22.jpg/320px-2022_BMW_X3_xDrive30i_%28G01%2C_facelift%29%2C_front_8.15.22.jpg",
  "Perodua Myvi":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/2018_Perodua_Myvi_1.5_AV_%28D74A%29%2C_front_11.8.18.jpg/320px-2018_Perodua_Myvi_1.5_AV_%28D74A%29%2C_front_11.8.18.jpg",
  "Perodua Axia":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/2023_Perodua_Axia_1.0_AV_%28E%29%2C_front_21.5.23.jpg/320px-2023_Perodua_Axia_1.0_AV_%28E%29%2C_front_21.5.23.jpg",
  "Proton X50":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/2020_Proton_X50_1.5_TGDi_Premium_%28C6A%29%2C_front_25.10.20.jpg/320px-2020_Proton_X50_1.5_TGDi_Premium_%28C6A%29%2C_front_25.10.20.jpg",
  "Mazda CX-5":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2021_Mazda_CX-5_2.0_G_Comfort%2B_%28KF%2C_facelift%29%2C_front_22.7.21.jpg/320px-2021_Mazda_CX-5_2.0_G_Comfort%2B_%28KF%2C_facelift%29%2C_front_22.7.21.jpg",
  "Mercedes C-Class":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/2022_Mercedes-Benz_C200_AMG_Line_%28W206%29%2C_front_30.9.22.jpg/320px-2022_Mercedes-Benz_C200_AMG_Line_%28W206%29%2C_front_30.9.22.jpg",
};

const getImg = (b,m) => CAR_IMAGES[`${b} ${m}`]||null;
const RM = n => "RM "+Number(n).toLocaleString();
const PAGES = ["dashboard","compare","breakdown","ai"];
const FEATURED = [["Toyota","Vios"],["Honda","City"],["Perodua","Myvi"],["BMW","3 Series"],["Mazda","CX-5"],["Honda","HR-V"]];

function calcCar(price,isNew){
  const loan=price*(isNew?.9:.85),rate=isNew?.035:.042,months=(isNew?7:5)*12,mr=rate/12;
  const monthly=Math.round((loan*mr*Math.pow(1+mr,months))/(Math.pow(1+mr,months)-1));
  const interest=Math.round(monthly*months-loan),ins=Math.round(price*(isNew?.04:.05)*5);
  const maint=isNew?40000:70000,dep=Math.round(price*(isNew?.45:.30)),repair=isNew?0:Math.round(price*.12);
  return{price,monthly,interest,ins,maint,dep,repair,total:Math.round(interest+ins+6000+maint+36000+dep+repair)};
}

function Tip({text,children}){
  const[on,setOn]=useState(false);
  return(
    <span style={{position:"relative",display:"inline-flex",alignItems:"center",gap:4}}
      onMouseEnter={()=>setOn(true)} onMouseLeave={()=>setOn(false)}>
      {children}
      <span style={{width:15,height:15,borderRadius:"50%",background:"#e8f5f0",border:"1px solid #c3e6d8",color:"#059669",fontSize:9,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",cursor:"help",flexShrink:0}}>i</span>
      {on&&<div style={{position:"absolute",bottom:"calc(100% + 6px)",left:0,background:"#1e293b",color:"#cbd5e1",fontSize:12.5,padding:"9px 13px",borderRadius:8,width:230,zIndex:300,lineHeight:1.6,boxShadow:"0 8px 24px rgba(0,0,0,.18)",pointerEvents:"none"}}>
        {text}
        <div style={{position:"absolute",bottom:-4,left:12,width:8,height:8,background:"#1e293b",transform:"rotate(45deg)"}}/>
      </div>}
    </span>
  );
}

export default function DriveWise(){
  const[page,setPage]=useState("dashboard");
  const[brand,setBrand]=useState("");
  const[model,setModel]=useState("");
  const[year,setYear]=useState("2024");
  const[choice,setChoice]=useState(null);
  const[aiData,setAiData]=useState(null);
  const[aiLoading,setAiLoad]=useState(false);
  const[vis,setVis]=useState(true);
  const[showMore,setShowMore]=useState(false);

  const info=brand&&model?CAR_DATA[brand]?.[model]:null;
  const newC=info?calcCar(info.p,true):null;
  const usedC=info?calcCar(info.u,false):null;
  const diff=newC&&usedC?newC.price-usedC.price:0;
  const inv5=diff>0?Math.round(diff*Math.pow(1.08,5)):0;
  const pageIdx=PAGES.indexOf(page);

  function go(p){setVis(false);setTimeout(()=>{setPage(p);setVis(true);},160);}
  useEffect(()=>{setAiData(null);setAiLoad(false);},[choice]);
  useEffect(()=>{if(page==="ai"&&choice&&!aiData&&!aiLoading)fetchAI();},[page,choice,aiData]);

  async function fetchAI(){
    if(!choice||!newC||!usedC)return;
    setAiLoad(true);setAiData(null);
    const isNew=choice==="new";
    const guide=isNew
      ?`USER BOUGHT NEW — spent ${RM(diff)} MORE. Build CONSERVATIVE portfolio: ASB/ASM large%, Emergency Fund, KLCI ETF small, Fixed Deposit. Minimal crypto.`
      :`USER BOUGHT USED — SAVED ${RM(diff)}. Build GROWTH portfolio: S&P500 large%, Malaysian blue-chips, Bitcoin/ETH moderate%, KLCI ETF. More risk is appropriate.`;
    const prompt=`Malaysian personal finance advisor. User chose ${isNew?"NEW":"USED"} ${brand} ${model} ${year}.
Price: ${RM(isNew?newC.price:usedC.price)}. 5yr cost: ${RM(isNew?newC.total:usedC.total)}. Gap: ${RM(diff)}. Invested@8%×5yrs=${RM(inv5)}.
${guide}
Reply ONLY valid JSON, alloc integers must sum to exactly 100:
{"verdict":"max 12 words","score":${isNew?6:8},"pros":["max 8 words","max 8 words","max 8 words"],"cons":["max 8 words","max 8 words"],"tip":"max 20 words","investments":[{"name":"asset name","type":"ETF|Stocks|Crypto|Unit Trust|Cash|FD","risk":"Low|Medium|High|None","alloc":NUMBER,"reason":"max 8 words"},{"name":"","type":"","risk":"","alloc":NUMBER,"reason":""},{"name":"","type":"","risk":"","alloc":NUMBER,"reason":""},{"name":"","type":"","risk":"","alloc":NUMBER,"reason":""},{"name":"","type":"","risk":"","alloc":NUMBER,"reason":""}]}`;
    try{
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`  // paste your key here
  },
  body: JSON.stringify({
    model: "llama-3.3-70b-versatile",  // or "mixtral-8x7b-32768"
    max_tokens: 900,
    messages: [{ role: "user", content: prompt }]
  })
});
const data = await res.json();
const raw = data.choices?.[0]?.message?.content?.replace(/```json|```/g, "").trim();

      setAiData(JSON.parse(raw));
    }catch{setAiData({verdict:"Could not load insights.",score:0,pros:[],cons:[],tip:"Please retry.",investments:[]});}
    setAiLoad(false);
  }

  const RISK_COLOR={Low:"#059669",Medium:"#d97706",High:"#dc2626",None:"#94a3b8"};
  const RISK_BG={Low:"#ecfdf5",Medium:"#fffbeb",High:"#fef2f2",None:"#f8fafc"};
  const BAR_PALETTE=["#059669","#0284c7","#d97706","#7c3aed","#94a3b8"];

  const navItems=[
    {id:"dashboard",icon:"⊙",label:"Dashboard"},
    {id:"compare",icon:"⇄",label:"Compare",locked:!info},
    {id:"breakdown",icon:"≡",label:"Breakdown",locked:!info},
    {id:"ai",icon:"✦",label:"AI Insights",locked:!choice},
  ];

  return(
    <div style={{display:"flex",minHeight:"100vh",background:"#f0f4f8",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,color:"#0f172a"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
        select option{background:#fff;color:#0f172a}

        /* SIDEBAR */
        .nb{display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;color:#64748b;border:none;background:none;width:100%;text-align:left;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
        .nb:hover:not(:disabled){background:#f1f5f9;color:#0f172a}
        .nb.on{background:#fff;color:#059669;font-weight:600;box-shadow:0 1px 4px rgba(0,0,0,.08)}
        .nb:disabled{opacity:.3;cursor:not-allowed}
        .ni{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;background:#f1f5f9;flex-shrink:0;transition:all .15s}
        .nb.on .ni{background:#ecfdf5;color:#059669}

        /* INPUTS */
        .sel{background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:10px 14px;font-size:15px;color:#0f172a;width:100%;outline:none;font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;appearance:none;transition:all .15s;font-weight:500}
        .sel:focus{border-color:#059669;box-shadow:0 0 0 3px rgba(5,150,105,.1)}
        .sel:disabled{background:#f8fafc;color:#94a3b8}
        .sw{position:relative}.sw::after{content:"▾";position:absolute;right:13px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:11px;pointer-events:none}

        /* BUTTONS */
        .btn-p{background:#059669;color:#fff;border:none;border-radius:10px;padding:10px 22px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap}
        .btn-p:hover{background:#047857;box-shadow:0 4px 12px rgba(5,150,105,.3)}
        .btn-p:disabled{background:#e2e8f0;color:#94a3b8;cursor:not-allowed;box-shadow:none}
        .btn-g{background:#fff;color:#475569;border:1.5px solid #e2e8f0;border-radius:10px;padding:9px 20px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .15s}
        .btn-g:hover{border-color:#cbd5e1;color:#0f172a;background:#f8fafc}
        .btn-a{background:#f59e0b;color:#fff;border:none;border-radius:10px;padding:10px 22px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .15s}
        .btn-a:hover{background:#d97706}

        /* CARDS */
        .card{background:#fff;border-radius:14px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 4px 12px rgba(0,0,0,.04)}
        .card-sm{background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.05)}

        /* TABLE ROWS */
        .tr{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #f1f5f9}
        .tr:last-child{border-bottom:none}
        .tl{color:#64748b;font-size:14px;font-weight:400}
        .tv{font-weight:600;font-size:14px;color:#0f172a}

        /* BADGE */
        .badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:600}

        /* CHOICE TILE */
        .tile{background:#fff;border:2px solid #e2e8f0;border-radius:12px;padding:18px;cursor:pointer;transition:all .2s;flex:1}
        .tile:hover{border-color:#94a3b8;box-shadow:0 4px 12px rgba(0,0,0,.08)}
        .tile.tn{border-color:#059669;background:linear-gradient(135deg,#f0fdf4,#ecfdf5);box-shadow:0 4px 16px rgba(5,150,105,.12)}
        .tile.tu{border-color:#f59e0b;background:linear-gradient(135deg,#fffbeb,#fef3c7);box-shadow:0 4px 16px rgba(245,158,11,.12)}

        /* COMPARE CARDS */
        .cc{background:#fff;border-radius:14px;padding:22px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 4px 12px rgba(0,0,0,.04);transition:box-shadow .2s}
        .cc:hover{box-shadow:0 4px 20px rgba(0,0,0,.1)}
        .sl{animation:slL .3s ease both}.sr{animation:slR .3s ease both}
        @keyframes slL{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
        @keyframes slR{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:none}}

        /* FEATURED */
        .fc{background:#fff;border-radius:12px;padding:16px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.05);transition:all .18s;border:1.5px solid transparent}
        .fc:hover{border-color:#059669;box-shadow:0 4px 16px rgba(5,150,105,.1);transform:translateY(-2px)}

        /* AI */
        .ai{opacity:0;animation:aiu .4s ease forwards}
        @keyframes aiu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

        /* SHIMMER */
        .sh{background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);background-size:200% 100%;animation:sh 1.4s infinite;border-radius:8px}
        @keyframes sh{0%{background-position:200% 0}100%{background-position:-200% 0}}

        /* INVEST ROW */
        .ir{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid #f1f5f9;transition:background .1s}
        .ir:last-child{border-bottom:none}

        /* STAT CARD */
        .statc{background:#fff;border-radius:12px;padding:16px 18px;box-shadow:0 1px 3px rgba(0,0,0,.05)}

        /* PAGE */
        .pg{transition:opacity .16s,transform .16s}

        /* STEP DOT */
        .step-done{background:#059669;border:2px solid #059669}
        .step-cur{background:#fff;border:2px solid #059669}
        .step-todo{background:#fff;border:2px solid #e2e8f0}
      `}</style>

      {/* ════ SIDEBAR ════ */}
      <div style={{width:230,background:"#fff",borderRight:"1px solid #e2e8f0",padding:"20px 12px",display:"flex",flexDirection:"column",gap:2,position:"sticky",top:0,height:"100vh",flexShrink:0,boxShadow:"1px 0 0 #f1f5f9"}}>

        {/* Logo */}
        <div style={{padding:"4px 8px 20px",marginBottom:4}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#059669,#34d399)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:"0 2px 8px rgba(5,150,105,.3)"}}>🚗</div>
            <div>
              <div style={{fontSize:16,fontWeight:800,color:"#0f172a",letterSpacing:"-.03em"}}>DriveWise</div>
              <div style={{fontSize:11,color:"#94a3b8",fontWeight:500,marginTop:1}}>AI · Malaysia 🇲🇾</div>
            </div>
          </div>
        </div>

        <div style={{fontSize:11,fontWeight:600,color:"#94a3b8",letterSpacing:".06em",textTransform:"uppercase",padding:"0 6px",marginBottom:4}}>Menu</div>
        {navItems.map(n=>(
          <button key={n.id} className={`nb ${page===n.id?"on":""}`} disabled={n.locked} onClick={()=>go(n.id)}>
            <span className="ni">{n.icon}</span>{n.label}
          </button>
        ))}

        <div style={{height:1,background:"#f1f5f9",margin:"14px 0"}}/>

        {/* Steps */}
        <div style={{padding:"0 6px"}}>
          <div style={{fontSize:11,fontWeight:600,color:"#94a3b8",letterSpacing:".06em",textTransform:"uppercase",marginBottom:12}}>Your Progress</div>
          {["Select Car","Compare","Breakdown","Decision"].map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center",gap:10,marginBottom:i<3?10:0}}>
              <div className={`${pageIdx>i?"step-done":pageIdx===i?"step-cur":"step-todo"}`}
                style={{width:20,height:20,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .3s"}}>
                {pageIdx>i&&<span style={{fontSize:10,color:"#fff",fontWeight:700}}>✓</span>}
                {pageIdx===i&&<div style={{width:8,height:8,borderRadius:"50%",background:"#059669"}}/>}
              </div>
              <span style={{fontSize:13.5,fontWeight:pageIdx>=i?500:400,color:pageIdx>=i?"#334155":"#cbd5e1"}}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{flex:1}}/>

        {info&&(
          <div style={{background:"linear-gradient(135deg,#ecfdf5,#f0fdf4)",border:"1px solid #a7f3d0",borderRadius:12,padding:"14px"}}>
            <div style={{fontSize:11,fontWeight:600,color:"#059669",letterSpacing:".04em",textTransform:"uppercase",marginBottom:8}}>Selected Car</div>
            <div style={{fontSize:15,fontWeight:700,color:"#0f172a",letterSpacing:"-.02em"}}>{brand} {model}</div>
            <div style={{fontSize:12,color:"#64748b",marginTop:2}}>{year} · {info.t}</div>
            <div style={{height:1,background:"#a7f3d0",margin:"10px 0"}}/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:10,color:"#64748b",fontWeight:600,marginBottom:2}}>NEW</div>
                <div style={{fontSize:14,fontWeight:700,color:"#059669"}}>{RM(info.p)}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:10,color:"#64748b",fontWeight:600,marginBottom:2}}>USED</div>
                <div style={{fontSize:14,fontWeight:700,color:"#d97706"}}>{RM(info.u)}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ════ MAIN ════ */}
      <div style={{flex:1,overflowY:"auto"}}>

        {/* Header */}
        <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",padding:"0 28px",height:58,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:50,boxShadow:"0 1px 0 #f1f5f9"}}>
          <div>
            <div style={{fontSize:17,fontWeight:700,color:"#0f172a",letterSpacing:"-.03em"}}>
              {{dashboard:"Dashboard",compare:"New vs Used Comparison",breakdown:"5-Year Breakdown",ai:"AI Financial Insights"}[page]}
            </div>
            <div style={{fontSize:12.5,color:"#94a3b8",marginTop:1}}>
              {{dashboard:"Smart car finance for Malaysians",compare:`${brand} ${model} · ${year}`,breakdown:"Full cost analysis over 5 years",ai:`Personalised for ${brand} ${model} · ${choice}`}[page]}
            </div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {pageIdx>0&&<button className="btn-g" onClick={()=>go(PAGES[pageIdx-1])}>← Back</button>}
            {page==="dashboard"&&<button className="btn-p" disabled={!info} onClick={()=>go("compare")}>Compare →</button>}
            {page==="compare"&&<button className="btn-p" onClick={()=>go("breakdown")}>Breakdown →</button>}
            {page==="breakdown"&&<button className="btn-p" disabled={!choice} onClick={()=>{setAiData(null);go("ai");}}>AI Insights →</button>}
            {page==="ai"&&!aiLoading&&<button className="btn-g" onClick={()=>{setAiData(null);fetchAI();}}>↺ Retry</button>}
          </div>
        </div>

        {/* Content */}
        <div className="pg" style={{padding:"22px 28px",opacity:vis?1:0,transform:vis?"none":"translateY(5px)"}}>

          {/* ══════ DASHBOARD ══════ */}
          {page==="dashboard"&&(
            <div>
              {/* Search */}
              <div className="card" style={{padding:"20px 22px",marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:600,color:"#94a3b8",letterSpacing:".04em",textTransform:"uppercase",marginBottom:14}}>Find Your Car</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 130px 110px",gap:12,alignItems:"flex-end"}}>
                  {[
                    {lbl:"Brand",el:<div className="sw"><select className="sel" value={brand} onChange={e=>{setBrand(e.target.value);setModel("");}}>
                      <option value="">Choose brand...</option>{Object.keys(BRANDS).map(b=><option key={b}>{b}</option>)}</select></div>},
                    {lbl:"Model",el:<div className="sw"><select className="sel" value={model} onChange={e=>setModel(e.target.value)} disabled={!brand} style={{opacity:brand?1:.5}}>
                      <option value="">Choose model...</option>{brand&&BRANDS[brand].map(m=><option key={m}>{m}</option>)}</select></div>},
                    {lbl:"Year",el:<div className="sw"><select className="sel" value={year} onChange={e=>setYear(e.target.value)}>
                      {[2025,2024,2023,2022,2021,2020].map(y=><option key={y}>{y}</option>)}</select></div>},
                    {lbl:"\u00a0",el:<button className="btn-p" style={{width:"100%",padding:"10px 0"}} disabled={!info} onClick={()=>go("compare")}>Search</button>},
                  ].map(({lbl,el})=>(
                    <div key={lbl}>
                      <div style={{fontSize:12.5,color:"#475569",fontWeight:500,marginBottom:6}}>{lbl}</div>{el}
                    </div>
                  ))}
                </div>
              </div>

              {info?(
                <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:14}}>
                  {/* Car identity */}
                  <div className="card" style={{padding:"20px 20px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                      <span className="badge" style={{background:"#ecfdf5",color:"#059669"}}>{info.t}</span>
                      <span style={{fontSize:12,color:"#94a3b8"}}>{year}</span>
                    </div>
                    <div style={{fontSize:22,fontWeight:800,color:"#0f172a",letterSpacing:"-.03em",lineHeight:1.1,marginBottom:14}}>{brand} {model}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                      <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:"12px"}}>
                        <div style={{fontSize:11,color:"#059669",fontWeight:600,marginBottom:4}}>NEW PRICE</div>
                        <div style={{fontSize:17,fontWeight:700,color:"#059669",letterSpacing:"-.02em"}}>{RM(info.p)}</div>
                      </div>
                      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"12px"}}>
                        <div style={{fontSize:11,color:"#d97706",fontWeight:600,marginBottom:4}}>USED FROM</div>
                        <div style={{fontSize:17,fontWeight:700,color:"#d97706",letterSpacing:"-.02em"}}>{RM(info.u)}</div>
                      </div>
                    </div>
                    {getImg(brand,model)&&<div style={{background:"#f8fafc",borderRadius:10,overflow:"hidden"}}>
                      <img src={getImg(brand,model)} alt="" onError={e=>e.target.style.display="none"} style={{width:"100%",height:108,objectFit:"contain",display:"block"}}/>
                    </div>}
                  </div>

                  {/* Stats 2×2 */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",gap:12}}>
                    {[
                      {lbl:"Savings buying used",val:RM(info.p-info.u),sub:"vs showroom",icon:"💰",bg:"#f0fdf4",bdr:"#bbf7d0",vc:"#059669"},
                      {lbl:"Invested @ 8% · 5 years",val:RM(Math.round((info.p-info.u)*Math.pow(1.08,5))),sub:"compound growth",icon:"📈",bg:"#eff6ff",bdr:"#bfdbfe",vc:"#2563eb"},
                      {lbl:"Monthly gap",val:RM(calcCar(info.p,true).monthly-calcCar(info.u,false).monthly),sub:"new vs used / month",icon:"📅",bg:"#fffbeb",bdr:"#fde68a",vc:"#d97706"},
                      {lbl:"5-year cost gap",val:RM(calcCar(info.p,true).total-calcCar(info.u,false).total),sub:"full ownership diff",icon:"📊",bg:"#faf5ff",bdr:"#e9d5ff",vc:"#7c3aed"},
                    ].map(s=>(
                      <div key={s.lbl} className="statc" style={{background:s.bg,border:`1px solid ${s.bdr}`}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                          <span style={{fontSize:18}}>{s.icon}</span>
                          <span style={{fontSize:13,color:"#64748b",fontWeight:500}}>{s.lbl}</span>
                        </div>
                        <div style={{fontSize:22,fontWeight:700,color:s.vc,letterSpacing:"-.03em",lineHeight:1}}>{s.val}</div>
                        <div style={{fontSize:12,color:"#94a3b8",marginTop:5}}>{s.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ):(
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:"#94a3b8",letterSpacing:".04em",textTransform:"uppercase",marginBottom:14}}>Popular in Malaysia</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                    {FEATURED.map(([b,m])=>{
                      const d=CAR_DATA[b]?.[m];const i=getImg(b,m);
                      return d?(
                        <div key={b+m} className="fc" onClick={()=>{setBrand(b);setModel(m);}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                            <div>
                              <div style={{fontSize:15,fontWeight:700,color:"#0f172a",letterSpacing:"-.02em"}}>{b} {m}</div>
                              <div style={{fontSize:12.5,color:"#94a3b8",marginTop:2}}>{d.t}</div>
                            </div>
                            <span className="badge" style={{background:"#f1f5f9",color:"#64748b",fontSize:10.5}}>{d.t}</span>
                          </div>
                          <div style={{fontSize:18,fontWeight:700,color:"#059669",letterSpacing:"-.02em",marginBottom:2}}>{RM(d.p)}</div>
                          <div style={{fontSize:12.5,color:"#94a3b8",marginBottom:i?12:0}}>Used from {RM(d.u)}</div>
                          {i&&<div style={{background:"#f8fafc",borderRadius:8,overflow:"hidden"}}>
                            <img src={i} alt={m} onError={e=>e.target.style.display="none"} style={{width:"100%",height:80,objectFit:"contain",display:"block"}}/>
                          </div>}
                        </div>
                      ):null;
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════ COMPARE ══════ */}
          {page==="compare"&&newC&&usedC&&(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                {[
                  {lbl:"New Car",c:newC,anim:"sl",ac:"#059669",pBg:"#f0fdf4",pBdr:"#bbf7d0",tag:"Brand New",tagBg:"#ecfdf5",tagC:"#059669",rate:"3.5%",tenure:"7 years",warranty:"5yr / 100,000 km",yr:year},
                  {lbl:"Used Car",c:usedC,anim:"sr",ac:"#d97706",pBg:"#fffbeb",pBdr:"#fde68a",tag:"Pre-owned",tagBg:"#fffbeb",tagC:"#d97706",rate:"4.2%",tenure:"5 years",warranty:"As-is condition",yr:`Est. ${parseInt(year)-2}–${parseInt(year)-1}`},
                ].map(v=>(
                  <div key={v.lbl} className={`cc ${v.anim}`}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                      <div>
                        <div style={{fontSize:12,color:"#94a3b8",fontWeight:500,marginBottom:3}}>{v.lbl}</div>
                        <div style={{fontSize:20,fontWeight:700,color:"#0f172a",letterSpacing:"-.03em"}}>{brand} {model}</div>
                        <div style={{fontSize:13,color:"#94a3b8",marginTop:3}}>{v.yr}</div>
                      </div>
                      <span className="badge" style={{background:v.tagBg,color:v.tagC}}>{v.tag}</span>
                    </div>

                    <div style={{background:v.pBg,border:`1px solid ${v.pBdr}`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
                      <div style={{fontSize:11.5,color:"#64748b",fontWeight:500,marginBottom:4}}>Purchase Price</div>
                      <div style={{fontSize:28,fontWeight:800,color:v.ac,letterSpacing:"-.03em",lineHeight:1}}>{RM(v.c.price)}</div>
                      <div style={{fontSize:13.5,color:"#64748b",marginTop:6}}>
                        <Tip text="Estimated monthly loan repayment at standard bank rate.">Monthly est.</Tip>
                        <span style={{color:"#0f172a",fontWeight:600}}> — {RM(v.c.monthly)}</span>
                      </div>
                    </div>

                    {getImg(brand,model)&&<div style={{background:"#f8fafc",borderRadius:10,overflow:"hidden",marginBottom:14}}>
                      <img src={getImg(brand,model)} alt="" onError={e=>e.target.style.display="none"} style={{width:"100%",height:128,objectFit:"contain",display:"block"}}/>
                    </div>}

                    {[
                      ["Interest Rate",v.rate+" p.a.","Annual interest charged on your car loan.",null],
                      ["Loan Tenure",v.tenure,null,null],
                      ["Warranty",v.warranty,null,null],
                      ["5yr Depreciation","−"+RM(v.c.dep),"Value your car loses over 5 years.","#dc2626"],
                    ].map(([k,val,tip,vc])=>(
                      <div className="tr" key={k}>
                        <span className="tl">{tip?<Tip text={tip}>{k}</Tip>:k}</span>
                        <span className="tv" style={{color:vc||"#0f172a"}}>{val}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{textAlign:"center",marginBottom:12}}>
                <button className="btn-g" onClick={()=>setShowMore(!showMore)} style={{fontSize:13.5}}>
                  {showMore?"Hide":"🔍 More Used Options"}
                </button>
              </div>

              {showMore&&(
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
                  {[
                    {yr:parseInt(year)-1,km:"30,000 km",price:Math.round(usedC.price*1.08),cond:"Excellent"},
                    {yr:parseInt(year)-2,km:"57,000 km",price:usedC.price,cond:"Good"},
                    {yr:parseInt(year)-3,km:"82,000 km",price:Math.round(usedC.price*.85),cond:"Fair"},
                  ].map((o,i)=>(
                    <div key={i} className="card-sm" style={{padding:"14px 16px",borderLeft:"3px solid #0284c7"}}>
                      <div style={{fontSize:14,fontWeight:600,color:"#0f172a",marginBottom:3}}>{brand} {model} {o.yr}</div>
                      <div style={{fontSize:13,color:"#64748b",marginBottom:8}}>{o.km} · <span className="badge" style={{background:"#eff6ff",color:"#2563eb",padding:"2px 8px",fontSize:11}}>{o.cond}</span></div>
                      <div style={{fontSize:18,fontWeight:700,color:"#d97706"}}>{RM(o.price)}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{background:"linear-gradient(135deg,#064e3b,#065f46)",borderRadius:14,padding:"18px 24px",display:"flex",justifyContent:"space-around",alignItems:"center",flexWrap:"wrap",gap:16,boxShadow:"0 4px 16px rgba(5,150,105,.2)"}}>
                {[["Price Difference",RM(diff),"#fff"],["Invested @ 8% · 5yrs",RM(inv5),"#6ee7b7"],["Monthly Saving",RM(newC.monthly-usedC.monthly),"#fde68a"]].map(([l,v,c])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:500,letterSpacing:".04em",textTransform:"uppercase",marginBottom:5}}>{l}</div>
                    <div style={{fontSize:22,fontWeight:700,color:c,letterSpacing:"-.02em"}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════ BREAKDOWN ══════ */}
          {page==="breakdown"&&newC&&usedC&&(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                {[
                  {lbl:"New Car",c:newC,ac:"#059669",bg:"#f0fdf4",bdr:"#bbf7d0",totalC:"#059669",rows:[["Loan Interest",newC.interest,"Annual interest on the loan."],["Insurance (5yr)",newC.ins,null],["Road Tax (5yr)",6000,null],["Maintenance",newC.maint,null],["Fuel (5yr)",36000,null],["Depreciation",newC.dep,"Value lost over 5 years."]]},
                  {lbl:"Used Car",c:usedC,ac:"#d97706",bg:"#fffbeb",bdr:"#fde68a",totalC:"#d97706",rows:[["Loan Interest",usedC.interest,"Annual interest on the loan."],["Insurance (5yr)",usedC.ins,null],["Road Tax (5yr)",6000,null],["Maintenance",usedC.maint,null],["Fuel (5yr)",36000,null],["Repair Risk",usedC.repair,"Estimated unexpected repair costs."],["Depreciation",usedC.dep,"Value lost over 5 years."]]},
                ].map(v=>(
                  <div key={v.lbl} className="card" style={{padding:"20px 22px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                      <div style={{width:4,height:20,borderRadius:2,background:v.ac}}/>
                      <div style={{fontSize:15,fontWeight:700,color:"#0f172a"}}>{v.lbl} — 5 Year Total</div>
                    </div>
                    {v.rows.map(([k,val,tip])=>(
                      <div className="tr" key={k}>
                        <span className="tl">{tip?<Tip text={tip}>{k}</Tip>:k}</span>
                        <span className="tv">{RM(val)}</span>
                      </div>
                    ))}
                    <div style={{marginTop:14,paddingTop:12,borderTop:`2px solid ${v.bdr}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:14,fontWeight:500,color:"#64748b"}}>Grand Total</span>
                      <div style={{fontSize:26,fontWeight:800,color:v.totalC,letterSpacing:"-.03em"}}>{RM(v.c.total)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1.7fr",gap:14}}>
                <div className="card" style={{padding:"20px 22px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#94a3b8",letterSpacing:".04em",textTransform:"uppercase",marginBottom:10}}>Opportunity Cost</div>
                  <div style={{fontSize:14,color:"#475569",lineHeight:1.6,marginBottom:12}}>
                    Invest the <span style={{color:"#059669",fontWeight:600}}>{RM(diff)}</span> gap at 8% p.a. for 5 years:
                  </div>
                  <div style={{fontSize:32,fontWeight:800,color:"#059669",letterSpacing:"-.03em"}}>{RM(inv5)}</div>
                  <div style={{fontSize:12.5,color:"#94a3b8",marginTop:5}}>potential portfolio value</div>
                </div>

                <div className="card" style={{padding:"20px 22px"}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#94a3b8",letterSpacing:".04em",textTransform:"uppercase",marginBottom:10}}>Make Your Decision</div>
                  <div style={{fontSize:14,color:"#64748b",marginBottom:14}}>Select to unlock AI-powered financial advice</div>
                  <div style={{display:"flex",gap:12}}>
                    {[
                      {id:"new",label:"New Car",price:newC.price,total:newC.total,ac:"#059669",cls:"tn",icon:"🚗"},
                      {id:"used",label:"Used Car",price:usedC.price,total:usedC.total,ac:"#d97706",cls:"tu",icon:"🚙"},
                    ].map(t=>(
                      <div key={t.id} className={`tile ${choice===t.id?t.cls:""}`}
                        onClick={()=>{setChoice(t.id);setAiData(null);}}>
                        <div style={{fontSize:26,marginBottom:8}}>{t.icon}</div>
                        <div style={{fontSize:14,fontWeight:600,color:"#0f172a",marginBottom:6}}>{t.label}</div>
                        <div style={{fontSize:20,fontWeight:800,color:t.ac,letterSpacing:"-.03em",marginBottom:4}}>{RM(t.price)}</div>
                        <div style={{fontSize:12.5,color:"#94a3b8"}}>5yr: {RM(t.total)}</div>
                        {choice===t.id&&<div style={{marginTop:10,fontSize:12,fontWeight:600,color:t.ac}}>✓ Selected</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════ AI INSIGHTS ══════ */}
          {page==="ai"&&(
            <div>
              {aiLoading&&(
                <div className="card" style={{padding:"28px 28px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:"#059669",animation:"pulse .8s infinite"}}/>
                    <span style={{color:"#64748b",fontSize:14}}>Groq is analysing your financial decision…</span>
                  </div>
                  {[68,50,80,44,62].map((w,i)=>(
                    <div key={i} className="sh" style={{height:12,width:`${w}%`,marginBottom:10}}/>
                  ))}
                </div>
              )}

              {!aiLoading&&aiData&&(
                <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:14}}>

                  {/* LEFT */}
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>

                    {/* Car summary */}
                    <div className="ai card" style={{padding:"18px 20px",animationDelay:".03s"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                        <div>
                          <div style={{fontSize:18,fontWeight:800,color:"#0f172a",letterSpacing:"-.03em"}}>{brand} {model}</div>
                          <div style={{fontSize:13,color:"#94a3b8",marginTop:2}}>{year} · {info?.t}</div>
                        </div>
                        <span className="badge" style={{background:choice==="new"?"#ecfdf5":"#fffbeb",color:choice==="new"?"#059669":"#d97706"}}>{choice==="new"?"New":"Used"}</span>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                        <div style={{background:"#f8fafc",borderRadius:8,padding:"10px 12px"}}>
                          <div style={{fontSize:11,color:"#94a3b8",fontWeight:500,marginBottom:3}}>Price Paid</div>
                          <div style={{fontSize:15,fontWeight:700,color:choice==="new"?"#059669":"#d97706"}}>{RM(choice==="new"?newC.price:usedC.price)}</div>
                        </div>
                        <div style={{background:"#fef2f2",borderRadius:8,padding:"10px 12px"}}>
                          <div style={{fontSize:11,color:"#94a3b8",fontWeight:500,marginBottom:3}}>5yr Total</div>
                          <div style={{fontSize:15,fontWeight:700,color:"#dc2626"}}>{RM(choice==="new"?newC.total:usedC.total)}</div>
                        </div>
                      </div>
                      {getImg(brand,model)&&<div style={{background:"#f8fafc",borderRadius:8,overflow:"hidden"}}>
                        <img src={getImg(brand,model)} alt="" onError={e=>e.target.style.display="none"} style={{width:"100%",height:108,objectFit:"contain",display:"block"}}/>
                      </div>}
                    </div>

                    {/* Score */}
                    <div className="ai card" style={{padding:"16px 18px",animationDelay:".07s"}}>
                      <div style={{fontSize:11.5,fontWeight:600,color:"#94a3b8",letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>Wisdom Score</div>
                      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
                        <div style={{position:"relative",width:60,height:60,borderRadius:"50%",flexShrink:0,
                          background:`conic-gradient(#059669 ${aiData.score*10}%,#f1f5f9 0)`,
                          display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(5,150,105,.15)"}}>
                          <div style={{position:"absolute",width:44,height:44,borderRadius:"50%",background:"#fff"}}/>
                          <span style={{position:"relative",fontSize:18,fontWeight:800,color:"#059669"}}>{aiData.score}</span>
                        </div>
                        <div>
                          <div style={{fontSize:22,fontWeight:800,color:"#0f172a",letterSpacing:"-.03em"}}>{aiData.score}<span style={{fontSize:13,color:"#cbd5e1"}}>/10</span></div>
                          <div style={{fontSize:12.5,color:"#64748b",marginTop:1}}>{aiData.score>=8?"Excellent choice":aiData.score>=6?"Solid decision":"Could improve"}</div>
                        </div>
                      </div>
                      <div style={{display:"flex",gap:3}}>
                        {Array.from({length:10}).map((_,i)=>(
                          <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<aiData.score?"#059669":"#f1f5f9",transition:"background .3s"}}/>
                        ))}
                      </div>
                    </div>

                    {/* Verdict */}
                    <div className="ai card" style={{padding:"14px 18px",borderLeft:"3px solid #059669",animationDelay:".1s"}}>
                      <div style={{fontSize:11.5,fontWeight:600,color:"#94a3b8",letterSpacing:".04em",textTransform:"uppercase",marginBottom:6}}>Verdict</div>
                      <div style={{fontSize:14.5,color:"#334155",lineHeight:1.65,fontStyle:"italic"}}>"{aiData.verdict}"</div>
                    </div>

                    {/* Tip */}
                    <div className="ai" style={{background:"linear-gradient(135deg,#064e3b,#065f46)",borderRadius:12,padding:"16px 18px",animationDelay:".13s",boxShadow:"0 4px 12px rgba(5,150,105,.15)"}}>
                      <div style={{fontSize:11.5,fontWeight:600,color:"rgba(255,255,255,.45)",letterSpacing:".04em",textTransform:"uppercase",marginBottom:6}}>💡 Money Tip</div>
                      <div style={{fontSize:14,color:"#d1fae5",lineHeight:1.65,fontWeight:500}}>{aiData.tip}</div>
                    </div>

                    <button className="ai btn-p" style={{width:"100%",animationDelay:".5s",background:"#f1f5f9",color:"#475569",fontWeight:600}}
                      onClick={()=>{setPage("dashboard");setBrand("");setModel("");setChoice(null);setAiData(null);}}>
                      + Start New Search
                    </button>
                  </div>

                  {/* RIGHT */}
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>

                    {/* Pros / Cons */}
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      {[
                        {title:"Advantages",items:aiData.pros,ac:"#059669",bg:"#ecfdf5",bdr:"#a7f3d0"},
                        {title:"Risks & Drawbacks",items:aiData.cons,ac:"#dc2626",bg:"#fef2f2",bdr:"#fecaca"},
                      ].map(({title,items,ac,bg,bdr})=>(
                        <div key={title} className="ai card" style={{padding:"16px 18px",animationDelay:".08s"}}>
                          <div style={{fontSize:12,fontWeight:600,color:ac,letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>{title}</div>
                          {items.map((p,i)=>(
                            <div key={i} style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:i<items.length-1?10:0}}>
                              <div style={{width:18,height:18,borderRadius:"50%",background:bg,border:`1.5px solid ${bdr}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                                <span style={{fontSize:9,color:ac,fontWeight:700}}>{ac.includes("059")?"✓":"!"}</span>
                              </div>
                              <span style={{fontSize:14,color:"#334155",lineHeight:1.45}}>{p}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Portfolio */}
                    {aiData.investments?.length>0&&(
                      <div className="ai card" style={{animationDelay:".18s"}}>
                        <div style={{padding:"16px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                          <div>
                            <div style={{fontSize:12,fontWeight:600,color:"#94a3b8",letterSpacing:".04em",textTransform:"uppercase",marginBottom:3}}>
                              {choice==="used"?"Growth Portfolio · Savings Available":"Conservative Portfolio · Capital Preserved"}
                            </div>
                            <div style={{fontSize:16,fontWeight:700,color:"#0f172a",letterSpacing:"-.02em"}}>Recommended Allocation</div>
                          </div>
                          <div style={{textAlign:"right"}}>
                            <div style={{fontSize:11,color:"#94a3b8",fontWeight:500,marginBottom:2}}>New − Used Gap</div>
                            <div style={{fontSize:16,fontWeight:700,color:choice==="used"?"#059669":"#d97706"}}>{RM(diff)}</div>
                          </div>
                        </div>

                        {/* Stacked bar */}
                        <div style={{display:"flex",height:6,overflow:"hidden",margin:"0 0 4px"}}>
                          {aiData.investments.map((v,i)=>(
                            <div key={i} title={`${v.name}: ${v.alloc}%`}
                              style={{width:`${v.alloc}%`,background:BAR_PALETTE[i%5],transition:"width 1.2s ease"}}/>
                          ))}
                        </div>

                        <div style={{padding:"4px 0"}}>
                          {aiData.investments.map((inv,i)=>(
                            <div key={i} className="ir" style={{padding:"12px 20px"}}>
                              <div style={{width:34,height:34,borderRadius:9,background:["#ecfdf5","#eff6ff","#fffbeb","#faf5ff","#f8fafc"][i%5],border:`1px solid ${["#a7f3d0","#bfdbfe","#fde68a","#e9d5ff","#e2e8f0"][i%5]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                                {["📊","🌐","₿","🏦","💵"][i]}
                              </div>
                              <div style={{flex:1,minWidth:0}}>
                                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                                    <span style={{fontWeight:600,fontSize:14,color:"#0f172a"}}>{inv.name}</span>
                                    <span className="badge" style={{background:"#f1f5f9",color:"#64748b",fontSize:10.5,padding:"2px 7px"}}>{inv.type}</span>
                                  </div>
                                  <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                                    <span className="badge" style={{background:RISK_BG[inv.risk]||"#f8fafc",color:RISK_COLOR[inv.risk]||"#64748b",fontSize:10.5}}>{inv.risk}</span>
                                    <span style={{fontSize:17,fontWeight:800,color:BAR_PALETTE[i%5],minWidth:38,textAlign:"right",letterSpacing:"-.02em"}}>{inv.alloc}%</span>
                                  </div>
                                </div>
                                <div style={{height:4,background:"#f1f5f9",borderRadius:2,marginBottom:5}}>
                                  <div style={{height:"100%",width:`${inv.alloc}%`,background:BAR_PALETTE[i%5],borderRadius:2,transition:"width 1.2s ease"}}/>
                                </div>
                                <div style={{fontSize:12.5,color:"#94a3b8"}}>{inv.reason}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{padding:"12px 20px",background:"#f8fafc",borderTop:"1px solid #f1f5f9",borderRadius:"0 0 14px 14px"}}>
                          <div style={{fontSize:12.5,color:"#94a3b8",lineHeight:1.55}}>
                            ⚠ Educational purposes only. Consult a licensed financial advisor before investing.
                          </div>
                        </div>
                      </div>
                    )}

                    {choice==="used"&&(
                      <div className="ai card" style={{padding:"16px 20px",borderLeft:"3px solid #059669",animationDelay:".32s"}}>
                        <div style={{fontSize:12,fontWeight:600,color:"#059669",letterSpacing:".04em",textTransform:"uppercase",marginBottom:10}}>Your Savings Summary</div>
                        {[["Saved vs New",RM(diff),"#059669"],["Invested @ 8% for 5 yrs",RM(inv5),"#2563eb"]].map(([l,v,c])=>(
                          <div className="tr" key={l}>
                            <span className="tl">{l}</span>
                            <span style={{fontSize:15,fontWeight:700,color:c}}>{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
