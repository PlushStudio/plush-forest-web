import treesArea1 from "../../../assets/images/fill-29.svg"
import treesArea2 from "../../../assets/images/fill-34.svg"
import treesArea3 from "../../../assets/images/fill-39.svg"
import treesArea4 from "../../../assets/images/fill-74.svg"
import treesArea5 from "../../../assets/images/fill-79.svg"
import treesArea6 from "../../../assets/images/fill-84.svg"
import treesArea7 from "../../../assets/images/fill-89.svg"
import treesArea8 from "../../../assets/images/fill-94.svg"
import treesArea9 from "../../../assets/images/fill-99.svg"
import tree08 from "../../../assets/images/tree-08@3x.png"
import s from "../../../assets/styles/data-display/TreesArea.module.css"

export const TreesArea = () => {
    return (
        <div className={s.treesArea}>
          <img alt="tree-area" src={treesArea1} className={`${s.treesAreaImg} ${s.treesArea1}`}/>
          <img alt="tree-area" src={tree08} className={s.tree08}/>
          <img alt="tree-area" src={treesArea2} className={`${s.treesAreaImg} ${s.treesArea2}`}/>
          <img alt="tree-area" src={treesArea3} className={`${s.treesAreaImg} ${s.treesArea3}`}/>
          <img alt="tree-area" src={treesArea4} className={`${s.treesAreaImg} ${s.treesArea4}`}/>
          <img alt="tree-area" src={treesArea5} className={`${s.treesAreaImg} ${s.treesArea5}`}/>
          <img alt="tree-area" src={treesArea6} className={`${s.treesAreaImg} ${s.treesArea6}`}/>
          <img alt="tree-area" src={treesArea7} className={`${s.treesAreaImg} ${s.treesArea7}`}/>
          <img alt="tree-area" src={treesArea8} className={`${s.treesAreaImg} ${s.treesArea8}`}/>
          <img alt="tree-area" src={treesArea9} className={`${s.treesAreaImg} ${s.treesArea9}`}/>
        </div>
    )
}