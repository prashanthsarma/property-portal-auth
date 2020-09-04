import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

export function SignIn() {
  const [values, setValues] = useForm({ email: '', password: '' });
  const dispatch = useDispatch();


  return (
    <div>
      <label>Email</label>
      <input
        data-testid="signin-email"
        name="email"
        type="email"
        required
        minLength={1}
        maxLength={25}
        value={values.email}
        onChange={setValues}>
      </input>
      <label>Password</label>
      <input
        data-testid="signin-password"
        name="password"
        type="password"
        required
        minLength={4}
        maxLength={20}
        value={values.password}
        onChange={setValues}>
      </input>
      <button onClick={}>Sign In</button>
    </div>
  );
}
