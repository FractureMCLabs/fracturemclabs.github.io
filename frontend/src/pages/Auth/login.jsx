import { useState, useEffect } from 'react';    
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader.jsx';
import { setCredentials } from '../../redux/features/auth/authSlice';

const Login = () => {
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const [login, {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"

    useEffect(() => {
    
            if (userInfo) {
            
                navigate(redirect);
            }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {

        e.preventDefault()

        try {
            const res = await login({email, password}).unwrap()
            console.log(res)
            dispatch(setCredentials({...res}))
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    return (
    <div className='bg-gray'>
        <section className="pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className='my-[2rem]'>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="mt-1 p-2 border rounded w-full"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="mt-1 p-2 border rounded w-full"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button disabled={isLoading} type="submit" className="bg-pink text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                    {isLoading && <Loader />}
                </form>
                <div className="mt-4 ">
                    <p className="text-black">
                        Want to join? {" "}
                        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="text-pink hover:underline">Register</Link>
                    </p>
                </div>
            </div>
            <img 
            src="https://img.lovepik.com/bg/20240113/Enhance-Your-Office-Environment-with-Modern-3D-Rendering-in-Interior_2762813_wh860.jpg!/fw/860"
            alt=""
            className="h-screen w-1/2 object-cover"
            />
        </section>
    </div>
  )
}

export default Login;