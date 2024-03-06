import "./style.css"

export default function Icon({ img, light = false }) {
  return (
    <div className={`Icon ${light && "Icon__light"}`}>
      {img && <img className="Icon--icon" src={img} alt="icon" />}

      <span className="Icon--border Icon--lt"></span>
      <span className="Icon--border Icon--lb"></span>
      <span className="Icon--border Icon--rt"></span>
      <span className="Icon--border Icon--rb"></span>
    </div>
  )
}
