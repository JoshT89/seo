import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt = "UPSHIFT — Good business. Meet better visibility.";
export const size = { width:1200, height:630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{display:"flex",width:"100%",height:"100%",background:"#f5f4ef",padding:"65px 75px",fontFamily:"sans-serif",color:"#272925",position:"relative",flexDirection:"column",justifyContent:"space-between"}}><div style={{display:"flex",fontSize:43,fontWeight:700,letterSpacing:-2}}>upshift<span style={{color:"#f15b35"}}>.</span></div><div style={{display:"flex",fontSize:85,lineHeight:1.03,fontWeight:600,letterSpacing:-5,flexDirection:"column"}}><span>Good business.</span><span>Meet better</span><span style={{color:"#f15b35"}}>visibility.</span></div><div style={{display:"flex",fontSize:17,letterSpacing:2}}>UK SEO & WEBSITE DESIGN · PACKAGES FROM £495/MONTH</div><div style={{display:"flex",position:"absolute",right:65,top:125,width:340,height:340,borderRadius:"50%",background:"#f15b35",color:"#f5f4ef",fontSize:280,alignItems:"center",justifyContent:"center"}}>↗</div></div>,size);
}
