'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SubmitButton } from '../common/SubmitButton'
import Link from 'next/link'
import { redirect } from 'next/navigation'
// import { redirect } from 'next/dist/server/api-utils'

export default function Signup() {
  const [accountType, setAccountType] = useState('creator')
  const submithandler = () => {
    redirect('/login')
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-transparent text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center ">Sign Up for V V E</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password"  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <RadioGroup value={accountType} onValueChange={setAccountType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="creator" id="creator" />
                    <Label htmlFor="creator">Creator</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="designer" id="designer" />
                    <Label htmlFor="designer">Editor</Label>
                  </div>
                </RadioGroup>
              </div>
             <div onClick={submithandler}>

              <SubmitButton title='Sign Up' />
             </div>
              <div className="text-right font-bold">
              You have already account
                <Link className='text-blue-800' href="/login"> Sign in?</Link>
              </div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}