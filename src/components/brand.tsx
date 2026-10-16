export function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand${light ? " brand-light" : ""}`} href="/" aria-label="UPSHIFT home"><svg viewBox="0 0 28 30" aria-hidden="true"><path d="M1 27V17h6v10zm9 0V10h6v17zm9 0V3h6v24z" fill="currentColor"/><path d="m18 4 7-3v8" fill="none" stroke="currentColor" strokeWidth="2.5"/></svg><span>upshift<span className="brand-dot">.</span></span></a>;
}

export function GrowthGraphic() {
  return <div className="growth-scene" aria-label="Illustration of a search result becoming business growth">
    <div className="scene-coordinate">THE ONLY WAY IS UP ↗</div>
    <div className="orange-orbit"><svg viewBox="0 0 400 400" aria-hidden="true"><defs><path id="orbit-text" d="M200,200 m-166,0 a166,166 0 1,1 332,0 a166,166 0 1,1 -332,0"/></defs><text><textPath href="#orbit-text" startOffset="3%">MORE VISIBILITY. MORE POSSIBILITY. MORE VISIBILITY. MORE POSSIBILITY.</textPath></text><path d="M119 276 259 136H143V92h191v191h-44V166L150 307z" fill="#f5f4ef"/></svg></div>
    <div className="search-float"><div className="search-float-top"><span className="search-monogram">G</span><span>best business near me</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg></div><div className="search-result"><div className="result-icon">↗</div><div><b>Your business, right here.</b><span>Exactly what they’re looking for.</span></div><span className="result-tag">THAT’S YOU</span></div></div>
    <div className="growth-float"><div className="growth-float-heading"><span>Room to grow</span><span className="mini-arrow">↗</span></div><div className="growth-chart"><span style={{height:"22%"}}/><span style={{height:"33%"}}/><span style={{height:"30%"}}/><span style={{height:"44%"}}/><span style={{height:"55%"}}/><span style={{height:"50%"}}/><span style={{height:"71%"}}/><span style={{height:"86%"}}/><span style={{height:"100%"}}/></div><div className="chart-caption"><span>GET FOUND</span><span>GET CHOSEN</span></div></div>
    <div className="scene-note"><span className="note-asterisk">✳</span><span>A little more visible.<br/>A lot more possible.</span></div>
    <span className="illustration-label">A picture of the opportunity. Not a results guarantee.</span>
  </div>;
}
