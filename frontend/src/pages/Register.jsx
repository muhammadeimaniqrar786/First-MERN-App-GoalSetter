import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { register, reset } from '../features/auth/authSlice'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    })

    const { name, email, password, passwordConfirmation } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSucces, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSucces || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSucces, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== passwordConfirmation) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name, email, password
            }

            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return <>
        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>

                <div className='form-group'>
                    <input type='text' id='name' value={name} name='name' className='form-control' placeholder='Enter your name' onChange={onChange} />
                </div>

                <div className='form-group'>
                    <input type='email' id='email' value={email} name='email' className='form-control' placeholder='Enter your email' onChange={onChange} />
                </div>

                <div className='form-group'>
                    <input type='password' id='password' value={password} name='password' className='form-control' placeholder='Enter password' onChange={onChange} />
                </div>

                <div className='form-group'>
                    <input type='password' id='passwordConfirmation' value={passwordConfirmation} className='form-control' name='passwordConfirmation' placeholder='confirm password' onChange={onChange} />
                </div>

                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>Submit</button>
                </div>

            </form>
        </section>
    </>
}

export default Register