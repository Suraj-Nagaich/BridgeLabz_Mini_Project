import React from "react"

function getChip(grade) {
  if (!grade) return "chip"
  if (grade === "A" || grade === "A+" || grade === "B") return "chip good"
  if (grade === "C") return "chip ok"
  return "chip bad"
}

export default function StudentList(props) {
  const stuff = props.data || []

  return (
    <div className="boxy dataSolo">
      <div className="btnRow" style={{ marginBottom: 8 }}>
        <div className="btnChunk">
          <button className="ugBtn blue small" onClick={props.onLoad} disabled={props.loading}>
            {props.loading ? "loading..." : "load students"}
          </button>
          <button className="ugBtn green small" onClick={props.onAdd}>
            add student
          </button>
        </div>
        <div className="tinyNote">
          click load students after edit or delete
        </div>
      </div>
      {stuff.length === 0 ? (
        <div className="emptyText">no students here yet</div>
      ) : (
        <table className="listTable">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>section</th>
              <th>marks</th>
              <th>grade</th>
              <th>do</th>
            </tr>
          </thead>
          <tbody>
            {stuff.map((x) => (
              <tr key={x.id}>
                <td>
                  <span className="idDot">{x.id}</span>
                </td>
                <td>{x.name}</td>
                <td>{x.section}</td>
                <td>{x.marks}</td>
                <td>
                  <span className={getChip(x.grade)}>{x.grade}</span>
                </td>
                <td>
                  <div className="btnChunk">
                    <button
                      className="ugBtn gray small"
                      onClick={() => props.onView(x)}
                    >
                      view
                    </button>
                    <button
                      className="ugBtn yellow small"
                      onClick={() => props.onEdit(x)}
                    >
                      edit
                    </button>
                    <button
                      className="ugBtn red small"
                      onClick={() => props.onDelete(x)}
                    >
                      delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}


