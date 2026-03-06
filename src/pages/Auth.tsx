import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmEmail, setConfirmEmail] = useState(false);
  const { signIn, signUp, user, profile, isBarber } = useAuth();
  const navigate = useNavigate();

  // Redirect once profile is loaded after login
  useEffect(() => {
    if (user && profile) {
      navigate(isBarber ? "/dashboard" : "/my-bookings", { replace: true });
    }
  }, [user, profile, isBarber, navigate]);

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", phone: "", email: "", password: "", confirmPassword: "" },
  });

  const handleLogin = async (values: LoginValues) => {
    setServerError(null);
    const { error } = await signIn(values.email, values.password);
    if (error) {
      setServerError(error);
    }
    // Navigation is handled by the useEffect once the profile loads
  };

  const handleRegister = async (values: RegisterValues) => {
    setServerError(null);
    const { error } = await signUp(
      values.email,
      values.password,
      values.fullName,
      values.phone || undefined
    );
    if (error) {
      setServerError(error);
    } else {
      setConfirmEmail(true);
    }
  };

  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setServerError(null);
    setConfirmEmail(false);
    loginForm.reset();
    registerForm.reset();
  };

  const inputClass = "bg-muted border-border rounded-none h-12 font-body";
  const labelClass = "font-body text-xs tracking-widest uppercase text-muted-foreground";

  if (confirmEmail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <h2 className="font-heading text-5xl text-foreground mb-4">
            Check Your Email<span className="text-primary">.</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8">
            We've sent a confirmation link to your email. Click it to activate your account, then come back to sign in.
          </p>
          <Button variant="hero" onClick={() => switchMode("login")} className="rounded-none">
            Back to Sign In <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border px-6 py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-10">
            <Link to="/">
              <span className="font-heading text-3xl tracking-[0.2em] text-foreground">
                GENTRY
              </span>
            </Link>
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mt-6 leading-none">
              {mode === "login" ? "Welcome\nBack" : "Join\nUs"}
              <span className="text-primary">.</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-3">
              {mode === "login"
                ? "Sign in to manage your appointments."
                : "Create an account to book and manage appointments."}
            </p>
          </div>

          {/* Error */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 border border-destructive/50 bg-destructive/10"
            >
              <p className="font-body text-sm text-destructive">{serverError}</p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label className={labelClass}>Email</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className={inputClass}
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-destructive text-xs font-body">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className={labelClass}>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className={inputClass}
                    {...loginForm.register("password")}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-destructive text-xs font-body">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full rounded-none"
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>Sign In <ArrowUpRight className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={registerForm.handleSubmit(handleRegister)}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label className={labelClass}>Full Name</Label>
                  <Input
                    placeholder="John Doe"
                    className={inputClass}
                    {...registerForm.register("fullName")}
                  />
                  {registerForm.formState.errors.fullName && (
                    <p className="text-destructive text-xs font-body">{registerForm.formState.errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className={labelClass}>Phone (optional)</Label>
                  <Input
                    placeholder="+1 (555) 000-0000"
                    className={inputClass}
                    {...registerForm.register("phone")}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={labelClass}>Email</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className={inputClass}
                    {...registerForm.register("email")}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-destructive text-xs font-body">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className={labelClass}>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className={inputClass}
                    {...registerForm.register("password")}
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-destructive text-xs font-body">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className={labelClass}>Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className={inputClass}
                    {...registerForm.register("confirmPassword")}
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-destructive text-xs font-body">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full rounded-none"
                  disabled={registerForm.formState.isSubmitting}
                >
                  {registerForm.formState.isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>Create Account <ArrowUpRight className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Toggle */}
          <div className="mt-8 text-center">
            <p className="font-body text-sm text-muted-foreground">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => switchMode(mode === "login" ? "register" : "login")}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
