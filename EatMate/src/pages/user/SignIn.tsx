import { useState } from "react";

// ========== TYPES ==========
interface AuthProps {
  onNavigate: (page: 'signin' | 'signup') => void;
}

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}

// ========== MOCK DATA ==========
const MOCK_USERS = [
  { email: "admin@example.com", password: "admin123" },
  { email: "user@example.com", password: "user123" }
];

// ========== REUSABLE COMPONENTS ==========

// Input Component
const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, value, onChange, id }) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-red-200 text-sm mb-2">
        {label}
      </label>
      <div className="flex items-center bg-white/20 p-3 rounded-xl shadow-inner shadow-black/25 border border-white/10 focus-within:border-red-400 transition-colors">
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-0 w-full outline-none placeholder-red-200/60 text-white"
        />
      </div>
    </div>
  );
};

// Password Input Component
const PasswordInput: React.FC<PasswordInputProps> = ({ label, placeholder, value, onChange, id }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-red-200 text-sm mb-2">
        {label}
      </label>
      <div className="flex items-center bg-white/20 p-3 rounded-xl shadow-inner shadow-black/25 border border-white/10 focus-within:border-red-400 transition-colors relative">
        <input
          id={id}
          name={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-0 w-full outline-none placeholder-red-200/60 text-white "
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-red-300 hover:text-red-200 transition-colors text-sm font-semibold"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

// Button Component
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 bg-red-600 hover:bg-red-500 rounded-xl font-semibold text-white shadow-lg shadow-red-900/50 transition-all hover:shadow-red-800/50 active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
};

// ========== MAIN COMPONENT ==========
const SignIn: React.FC<AuthProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = (): void => {
    if (!email || !password) {
      alert("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    // Mock Authentication
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert(`เข้าสู่ระบบสำเร็จ!\nEmail: ${email}`);
      // Navigate to dashboard or home page
    } else {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-red-950 p-4">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl shadow-red-900/50 border border-red-500/30">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
          Sign In
        </h1>
        
        {/* Email Input */}
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={setEmail}
        />

        {/* Password Input */}
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
        />

        {/* Sign In Button */}
        <Button onClick={handleSignIn}>Sign In</Button>

        {/* Divider */}
        <div className="flex items-center justify-center py-6 gap-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
          <span className="text-sm text-red-200/80 font-medium">Or</span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-red-200/80">
          Don't have an account?{" "}
          <span
            className="text-white font-semibold cursor-pointer hover:underline transition-colors"
            onClick={() => onNavigate('signup')}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;