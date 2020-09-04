import {useState, ChangeEvent} from 'react';


export const useForm = (initialValues : any ) => {

  const [ values, setValues ] = useState(initialValues);

  return [values, (e: ChangeEvent<HTMLInputElement>)  => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }]
}
