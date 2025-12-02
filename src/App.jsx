import React, { useState } from "react"
import StudentList from "./components/StudentList.jsx"
import StudentForm from "./components/StudentForm.jsx"
import StudentDetails from "./components/StudentDetails.jsx"
import { getAllKids, makeKid, changeKid, killKid } from "./services/studentService.js"

export default function App() {
  const [all, setAll] = useState([])
  const [mode, setMode] = useState("list")
  const [pick, setPick] = useState(null)
  const [loading, setLoading] = useState(false)
  const [viewTab, setViewTab] = useState("list")

  async function loadNow() {
    try {
      setLoading(true)
      const d = await getAllKids()
      setAll(d)
    } catch (e) {
      alert("cant load")
    } finally {
      setLoading(false)
    }
  }

  function openAdd() {
    setPick(null)
    setMode("form")
  }

  function openEdit(x) {
    setPick(x)
    setMode("form")
  }

  function openDetail(x) {
    setPick(x)
    setMode("details")
  }

  function goBackList() {
    setMode("list")
  }

  async function saveThing(body) {
    try {
      if (pick && pick.id) {
        await changeKid(pick.id, body)
        alert("edited, now click load students")
      } else {
        await makeKid(body)
        alert("added, now click load students")
      }
      setMode("list")
    } catch (e) {
      alert("cant save")
    }
  }

  async function removeOne(x) {
    const ok = window.confirm("delete this student?")
    if (!ok) return
    try {
      await killKid(x.id)
      alert("deleted, now click load students")
    } catch (e) {
      alert("cant delete")
    }
  }

  let mid
  if (mode === "form") {
    mid = <StudentForm one={pick} onSave={saveThing} onBack={goBackList} />
  } else if (mode === "details") {
    mid = <StudentDetails one={pick} onBack={goBackList} />
  } else {
    mid = (
      <StudentList
        data={all}
        onLoad={loadNow}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={removeOne}
        onView={openDetail}
        loading={loading}
      />
    )
  }

  return (
    <div className="outerBox">
      <div className="tinyPage">
        <div className="topHead">
          <div>
            <h1>random student thing</h1>
            <div className="tinyNote">add, see, edit, delete student by button and form</div>
          </div>
          <div className="badTabs">
            <button
              className={viewTab === "list" ? "onTab" : ""}
              onClick={() => {
                setViewTab("list")
                setMode("list")
              }}
            >
              list
            </button>
            <button
              className={viewTab === "form" ? "onTab" : ""}
              onClick={() => {
                setViewTab("form")
                setMode("form")
              }}
            >
              form
            </button>
            <button
              className={viewTab === "details" ? "onTab" : ""}
              onClick={() => {
                setViewTab("details")
                setMode("details")
              }}
            >
              details
            </button>
          </div>
        </div>
        <div className={mode === "list" ? "dataArea" : "dataSolo"}>
          {mid}
          {mode === "list" && (
            <div className="rightSide">
              <div className="boxy">
                <h3>little info</h3>
                <ul className="rightList">
                  <li className="rightItem">
                    <span>how to load</span>
                    <span>press load students</span>
                  </li>
                  <li className="rightItem">
                    <span>after add / edit / delete</span>
                    <span>see alert then load again</span>
                  </li>
                  <li className="rightItem">
                    <span>where saved</span>
                    <span>json server db.json</span>
                  </li>
                </ul>
              </div>
              <div className="boxy">
                <h3>quick stats</h3>
                <ul className="rightList">
                  <li className="rightItem">
                    <span>total student</span>
                    <span>{all.length}</span>
                  </li>
                  <li className="rightItem">
                    <span>avg marks</span>
                    <span>
                      {all.length
                        ? Math.round(
                            all.reduce((a, b) => a + (Number(b.marks) || 0), 0) /
                              all.length
                          )
                        : "-"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


