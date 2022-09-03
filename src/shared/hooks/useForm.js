import { useState } from 'react'

// how to use -->   const [form, setForm, errors, setErrors, resetForm] = useSimpleForm({name:"",password:""})

const useSimpleForm = (initialState) => {
    const [state, setState] = useState(initialState)
    const [errors, setErrors] = useState({})
    return [state, newState => setState({...state, ...newState }), errors, setErrors, () => setState(initialState)]
}

export default useSimpleForm