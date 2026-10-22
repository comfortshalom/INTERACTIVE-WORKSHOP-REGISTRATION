import { useState } from 'react';

export default function App() {
  // Form input state fields
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    age: '',
    portfolio: '',
    workshop: ''
  });

  // Track field-specific error validation strings
  const [errors, setErrors] = useState({});
  
  // Registration list state
  const [items, setItems] = useState([]);

  // Controlled change handler function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    // Clear error message when user starts typing again
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  function submit(e) {
    e.preventDefault();
    
    // Step 3 Validation Block
    const newErrors = {};

    // 1. Prevent empty name
    if (!form.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    // 2. Validate email structure
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // 3. Validate phone number (optional but must be digits if filled)
    if (form.phone.trim() && !/^\+?[0-9\s-]{7,15}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number (minimum 7 digits).';
    }

    // 4. Validate preferred date selection
    if (!form.date) {
      newErrors.date = 'Please select a preferred workshop date.';
    }

    // 5. Validate age constraint boundaries
    if (!form.age) {
      newErrors.age = 'Age is required.';
    } else {
      const numericAge = Number(form.age);
      if (numericAge < 12 || numericAge > 100) {
        newErrors.age = 'Age must be between 12 and 100.';
      }
    }

    // 6. Validate portfolio URL pattern string
    if (form.portfolio.trim()) {
      try {
        new URL(form.portfolio);
      } catch (_) {
        newErrors.portfolio = 'Please enter a valid absolute URL (e.g., https://mywork.com).';
      }
    }

    // 7. Validate workshop selection dropdown
    if (!form.workshop) {
      newErrors.workshop = 'Please choose a workshop track.';
    }

    // If there are errors, save them to state and block submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Step 4: If valid, add entry and clear fields
    setItems([...items, { ...form, id: Date.now() }]);
    setForm({ name: '', email: '', phone: '', date: '', age: '', portfolio: '', workshop: '' });
    setErrors({});
  }

  return (
    <main style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>Workshop Registration</h1>
      
      <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Name Input */}
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Full Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span style={{ color: '#d32f2f', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>{errors.name}</span>}
        </label>

        {/* Email Input */}
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Email Address:
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span style={{ color: '#d32f2f', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>{errors.email}</span>}
        </label>

        {/* Phone Input */}
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Phone Number:
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. +256700000000" />
          {errors.phone && <span style={{ color: '#d32f2f', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>{errors.phone}</span>}
        </label>

        {/* Date Input */}
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Preferred Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          {errors.date && <span style={{ color: '#d32f2f', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>{errors.date}</span>}
        </label>

        {/* Age Input */}
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Age:
          <input type="number" name="age" value={form.age} onChange={handleChange} />
          {errors.age && <span style={{ color: '#d32f2f', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>{errors.age}</span>}
        </label>

        {/* Portfolio URL Input */}
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Portfolio URL:
          <input type="url" name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://example.com" />
          {errors.portfolio && <span style={{ color: '#d32f2f', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>{errors.portfolio}</span>}
        </label>

        {/* Workshop Selection */}
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Select Workshop:
          <select name="workshop" value={form.workshop} onChange={handleChange}>
            <option value="">-- Choose an option --</option>
            <option value="React Foundations">React Foundations</option>
            <option value="Backend with Node.js">Backend with Node.js</option>
            <option value="UI/UX Design Studio">UI/UX Design Studio</option>
          </select>
          {errors.workshop && <span style={{ color: '#d32f2f', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>{errors.workshop}</span>}
        </label>

        <button type="submit" style={{ padding: '12px', cursor: 'pointer', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          Register
        </button>
      </form>

      <h2 style={{ marginTop: '30px' }}>Registrations</h2>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No attendees registered yet.</p>
        ) : (
          items.map((i) => (
            <article className="card" key={i.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px', position: 'relative' }}>
              <strong style={{ fontSize: '16px' }}>{i.name}</strong> <span style={{ fontSize: '12px', background: '#e0e0e0', padding: '2px 6px', borderRadius: '3px', marginLeft: '5px' }}>Age: {i.age}</span>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#333' }}><strong>Workshop:</strong> {i.workshop}</p>
              <p style={{ margin: '2px 0', fontSize: '13px', color: '#666' }}>✉ {i.email} | 📞 {i.phone || 'N/A'}</p>
              {i.portfolio && <p style={{ margin: '2px 0', fontSize: '13px' }}>🔗 <a href={i.portfolio} target="_blank" rel="noreferrer" style={{ color: '#0066cc' }}>Portfolio Link</a></p>}
              <p style={{ margin: '2px 0', fontSize: '13px', color: '#666' }}>📅 Date: {i.date}</p>
              <button 
                onClick={() => setItems(items.filter((x) => x.id !== i.id))}
                style={{ marginTop: '10px', color: '#d32f2f', background: 'none', border: 'none', padding: '0', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Remove Attendee
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
