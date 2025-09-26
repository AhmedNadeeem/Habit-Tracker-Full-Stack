import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e)=> {
        e.prevent.default;
        console.log(`Username: ${username}, email: ${email}, password: ${password}`)
    }
  return (
    <div className='bg-gray-900 p-4 py-6 rounded-lg mt-1'>

        <form onSubmit={handleSubmit}>

            <div className='mt-3 mb-3'>
                <Label className="mb-1.5 text-white" htmlFor="email">Email:</Label>
                <Input type="email" id='email' value={email} onChange={(e)=> setEmail(e.target.value)} name="email" />
            </div>

            <div>
                <Label className="mb-1.5 text-white" htmlFor="password">Password:</Label>
                <Input type="password" id='password' value={password} onChange={(e)=> setPassword(e.target.value)} name="password" />
            </div>

            <Button className="mt-4">Register</Button>
        </form>
    </div>
  )
}

export default Register