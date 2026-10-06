import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

interface FormState {
  username: string;
  password: string;
  passwordConfirm: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  passwordConfirm?: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    username: '',
    password: '',
    passwordConfirm: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for the specific field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Client-side validation mirroring typical Spring Validator behavior
    const newErrors: FormErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.passwordConfirm) newErrors.passwordConfirm = 'Password confirmation is required';
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // In a real application, this would POST to the backend endpoint
    // e.g., fetch('/registration', { method: 'POST', body: new FormData(...) })
    // For this migration, we simulate the successful redirect behavior
    console.log('Registration submitted:', formData);
    // window.location.href = '/welcome';
  };

  return (
    <div className="modern-container">
      <header className="modern-header">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">App Name</Link>
        </nav>
      </header>

      <main className="modern-main">
        <div className="modern-card">
          <h2 className="form-signin-heading">Create your account</h2>
          
          <form onSubmit={handleSubmit} className="form-signin" noValidate>
            <div className={`form-group ${errors.username ? 'has-error' : ''}`}>
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                autoFocus
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? "username-error" : undefined}
              />
              {errors.username && (
                <div id="username-error" className="alert-box alert-error" role="alert">
                  {errors.username}
                </div>
              )}
            </div>

            <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <div id="password-error" className="alert-box alert-error" role="alert">
                  {errors.password}
                </div>
              )}
            </div>

            <div className={`form-group ${errors.passwordConfirm ? 'has-error' : ''}`}>
              <label htmlFor="passwordConfirm" className="form-label">Confirm your password</label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                aria-invalid={!!errors.passwordConfirm}
                aria-describedby={errors.passwordConfirm ? "passwordConfirm-error" : undefined}
              />
              {errors.passwordConfirm && (
                <div id="passwordConfirm-error" className="alert-box alert-error" role="alert">
                  {errors.passwordConfirm}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block">Register</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Registration;