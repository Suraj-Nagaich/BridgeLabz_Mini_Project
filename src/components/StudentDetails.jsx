import React from "react"

function gradeMood(g) {
  if (!g) return "bigGrade"
  if (g === "A" || g === "A+") return "bigGrade good"
  if (g === "B" || g === "C") return "bigGrade ok"
  return "bigGrade bad"
}

export default function StudentDetails(props) {
  const x = props.one
  if (!x) {
    return (
      <div className="boxy dataSolo">
        <div className="btnRow" style={{ marginBottom: 8 }}>
          <div className="miniLabel">details</div>
          <button className="ugBtn gray small" onClick={props.onBack}>
            back
          </button>
        </div>
        <div className="emptyText">no student picked</div>
      </div>
    )
  }

  return (
    <div className="boxy dataSolo">
      <div className="btnRow" style={{ marginBottom: 12 }}>
        <div className="tagRow">
          <span className="tinyTag dark">student details</span>
          <span className="tinyTag">id #{x.id}</span>
        </div>
        <button className="ugBtn gray small" onClick={props.onBack}>
          back
        </button>
      </div>
      <div className="twoCol" style={{ marginBottom: 14 }}>
        <div>
          <div className="miniLabel">name</div>
          <div className="miniVal">{x.name}</div>
        </div>
        <div>
          <div className="miniLabel">section</div>
          <div className="miniVal">{x.section}</div>
        </div>
      </div>
      <div className="twoCol" style={{ marginBottom: 14 }}>
        <div>
          <div className="miniLabel">marks</div>
          <div className="miniVal">{x.marks}</div>
          <div className="bubbleRow">
            <span className="bubbleItem">out of 100</span>
            {x.marks >= 75 ? (
              <span className="bubbleItem">nice work</span>
            ) : x.marks >= 40 ? (
              <span className="bubbleItem">ok ok</span>
            ) : (
              <span className="bubbleItem">needs push</span>
            )}
          </div>
        </div>
        <div>
          <div className="miniLabel">grade</div>
          <div className={gradeMood(x.grade)}>{x.grade}</div>
        </div>
      </div>
      <div className="tagRow">
        <span className="tinyTag muted">name: {x.name}</span>
        <span className="tinyTag muted">section: {x.section}</span>
        <span className="tinyTag muted">marks: {x.marks}</span>
        <span className="tinyTag muted">grade: {x.grade}</span>
      </div>
    </div>
  )
}


