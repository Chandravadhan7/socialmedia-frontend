import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage.css";

export default function LoginPage() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 

        let inputobj = { email: email, password: password }; 

        try {
            const response = await fetch('http://localhost:8080/user/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputobj),
            });

            if (!response.ok) {
                throw new Error("Login failed. Check your credentials.");
            }

            const loginResponse = await response.json();
            localStorage.setItem('sessionId', loginResponse.sessionId);
            localStorage.setItem('userId', loginResponse.userId);
            
            navigate('/');
        } catch (error) {
            console.error("Error during login:", error.message);
        }
    };

    return (
        <div className="cont">
            <div className="login-cont">
                <form onSubmit={handleLogin}>  
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email address" 
                        required
                    />
                    <input 
                        type="password"  
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        required
                    />
                    <button type="submit">Login</button>  {/* Add submit button */}
                </form>
            </div>
        </div>
    );
}
