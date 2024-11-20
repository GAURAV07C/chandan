"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "../common/SubmitButton";
import { redirect } from "next/navigation";

export default function Signin() {

  const submithanlder = () => {
    redirect("/dashboard")

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md bg-r text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Log in to VVE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="text-right font-bold">
                <Link href="/forgot-password">Forgot Password?</Link>
              </div>
             <div onClick={submithanlder}>

              <SubmitButton title='Log In'   />
             </div>
              <div className="text-right font-bold">
                You don&apos; have accout 
                <Link className="text-blue-400" href="/signup"> SignUp?</Link>
              </div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
