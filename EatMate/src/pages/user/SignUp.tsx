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
const REGISTERED_USERS: string[] = [
  "admin@example.com",
  "user@example.com"
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
          className="bg-transparent border-0 w-full outline-none placeholder-red-200/60 text-white pr-10"
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
const SignUp: React.FC<AuthProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignUp = (): void => {
    // Validation
    if (!email || !password || !confirmPassword) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("กรุณากรอกอีเมลให้ถูกต้อง");
      return;
    }

    // Check if email already exists
    if (REGISTERED_USERS.includes(email)) {
      alert("อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      alert("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน กรุณาลองใหม่");
      return;
    }

    // Success
    alert(`สมัครสมาชิกสำเร็จ!\nEmail: ${email}\n\nกรุณาเข้าสู่ระบบ`);
    onNavigate('signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-red-950 p-4">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl shadow-red-900/50 border border-red-500/30">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
          Sign Up
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
          placeholder="Enter your password (min 6 characters)"
          value={password}
          onChange={setPassword}
        />

        {/* Confirm Password Input */}
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        {/* Sign Up Button */}
        <Button onClick={handleSignUp}>Sign Up</Button>

        {/* Divider */}
        <div className="flex items-center justify-center py-6 gap-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
          <span className="text-sm text-red-200/80 font-medium">Or</span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
        </div>

        {/* Back to Sign In */}
        <div className="text-center">
          <span
            className="text-red-300 font-semibold cursor-pointer hover:underline text-sm inline-flex items-center gap-1"
            onClick={() => onNavigate('signin')}
          >
            ← Back to Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;