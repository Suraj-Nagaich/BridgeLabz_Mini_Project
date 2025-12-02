const baseUrl = "http://localhost:3001/students"

async function badCheck(r) {
  if (!r.ok) {
    throw new Error("nope")
  }
  return r.json()
}

export async function getAllKids() {
  const r = await fetch(baseUrl)
  return badCheck(r)
}

export async function getOneKid(id) {
  const r = await fetch(baseUrl + "/" + id)
  return badCheck(r)
}

export async function makeKid(body) {
  const r = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  return badCheck(r)
}

export async function changeKid(id, body) {
  const r = await fetch(baseUrl + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  return badCheck(r)
}

export async function killKid(id) {
  const r = await fetch(baseUrl + "/" + id, {
    method: "DELETE"
  })
  if (!r.ok) {
    throw new Error("nope")
  }
  return true
}


