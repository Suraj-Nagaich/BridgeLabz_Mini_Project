import React, { useState } from "react"

export default function StudentForm(props) {
  const one = props.one || {}
  const [nm, setNm] = useState(one.name || "")
  const [sec, setSec] = useState(one.section || "")
  const [mk, setMk] = useState(one.marks == null ? "" : one.marks)
  const [gr, setGr] = useState(one.grade || "")
  const badMode = one && one.id

  function sendIt(e) {
    e.preventDefault()
    if (!nm || !sec || !mk || !gr) {
      alert("fill everything")
      return
    }
    const body = {
      name: nm,
      section: sec,
      marks: Number(mk),
      grade: gr
    }
    props.onSave(body)
  }

  return (
    <div className="boxy dataSolo">
      <div className="btnRow" style={{ marginBottom: 10 }}>
        <div className="tagRow">
          <span className="tinyTag dark">{badMode ? "edit student" : "add student"}</span>
          {one && one.id ? (
            <span className="tinyTag muted">id #{one.id}</span>
          ) : null}
        </div>
        <button className="ugBtn gray small" onClick={props.onBack}>
          back
        </button>
      </div>
      <form onSubmit={sendIt} className="formStack">
        <div className="twoCol">
          <div className="formRow">
            <label>name</label>
            <input
              value={nm}
              onChange={(e) => setNm(e.target.value)}
              placeholder="some name"
            />
          </div>
          <div className="formRow">
            <label>section</label>
            <input
              value={sec}
              onChange={(e) => setSec(e.target.value)}
              placeholder="like A or B"
            />
          </div>
        </div>
        <div className="twoCol">
          <div className="formRow">
            <label>marks</label>
            <input
              type="number"
              value={mk}
              onChange={(e) => setMk(e.target.value)}
              placeholder="0-100"
            />
          </div>
          <div className="formRow">
            <label>grade</label>
            <select value={gr} onChange={(e) => setGr(e.target.value)}>
              <option value="">pick grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>
        </div>
        <div className="btnRow">
          <div className="btnChunk">
            <button className="ugBtn green" type="submit">
              {badMode ? "save changes" : "save student"}
            </button>
            <button
              className="ugBtn gray"
              type="button"
              onClick={() => {
                setNm("")
                setSec("")
                setMk("")
                setGr("")
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
      <div className="tinyNote" style={{ marginTop: 8 }}>
        after saving, watch alert then go back and press load students
      </div>
    </div>
  )
}


