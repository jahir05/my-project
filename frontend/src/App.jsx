import React, { useEffect, useState } from 'react'


const emptyForm = { name: '', email: '', id: null }


export default function App() {
const [form, setForm] = useState(emptyForm)
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')


async function fetchUsers() {
setLoading(true)
try {
const res = await fetch('/api/users')
const data = await res.json()
setUsers(data)
} catch (e) {
console.error(e)
setError('Failed to load users')
} finally {
setLoading(false)
}
}


useEffect(() => { fetchUsers() }, [])


function onChange(e) {
setForm({ ...form, [e.target.name]: e.target.value })
}


async function onSubmit(e) {
e.preventDefault()
setError('')


const payload = { name: form.name.trim(), email: form.email.trim() }
if (!payload.name || !payload.email) { setError('Name and email are required'); return }


try {
const res = await fetch(form.id ? `/api/users/${form.id}` : '/api/users', {
method: form.id ? 'PUT' : 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
})
if (!res.ok) throw new Error(await res.text())
await fetchUsers()
setForm(emptyForm)
} catch (e) {
setError(e.message || 'Save failed')
}
}


function onEdit(u) { setForm({ id: u.id, name: u.name, email: u.email }) }


async function onDelete(id) {
if (!confirm('Delete this user?')) return
try {
const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
if (!res.ok) throw new Error(await res.text())
setUsers(users.filter(u => u.id !== id))
} catch (e) { setError(e.message || 'Delete failed') }
}


function onCancel() { setForm(emptyForm) }


return (
    <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'Inter, system-ui, Arial' }}>
      <h1>User Directory</h1>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: '1fr 1fr auto auto' }}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <button type="submit">{form.id ? 'Update' : 'Add'}</button>
        {form.id && <button type="button" onClick={onCancel}>Cancel</button>}
      </form>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <hr style={{ margin: '1rem 0' }} />

      {loading ? <p>Loading…</p> : (
        <table width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th align="left">ID</th>
              <th align="left">Name</th>
              <th align="left">Email</th>
              <th align="left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid #eee' }}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button onClick={() => onEdit(u)}>Edit</button>{' '}
                  <button onClick={() => onDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan="4">No users yet. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}