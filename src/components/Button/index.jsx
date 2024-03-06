import "./style.css"

export default function Button({ icon, label, light = false, onClick = () => {} }) {
  return (
    <div className={`btn ${light && "btn__light"}`} onClick={onClick}>
      {label && <span className="btn--label">{label}</span>}
      {icon && <img className="btn--icon" src={icon} alt="icon" />}

      <span className="btn--border btn--lt"></span>
      <span className="btn--border btn--lb"></span>
      <span className="btn--border btn--rt"></span>
      <span className="btn--border btn--rb"></span>
    </div>
  )
}
