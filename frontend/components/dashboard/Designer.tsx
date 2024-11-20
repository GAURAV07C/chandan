'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Plus, Edit2 } from 'lucide-react'

export default function Designer() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [works, setWorks] = useState<string[]>([])

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePic(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleWorkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setWorks(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Welcome to Your Designer Dashboard</h1>
        
        <Card className="bg-white/10 backdrop-blur-lg border-none mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  {profilePic ? (
                    <AvatarImage src={profilePic} alt="Profile" />
                  ) : (
                    <AvatarFallback>
                      <Upload className="h-12 w-12 text-gray-400" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <label htmlFor="profile-pic-upload" className="absolute bottom-0 right-0 bg-yellow-400 text-purple-900 rounded-full p-2 cursor-pointer">
                  <Edit2 className="h-4 w-4" />
                </label>
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicUpload}
                />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/20 border-none text-white placeholder-gray-400"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">About You</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-white/20 border-none text-white placeholder-gray-400"
                    placeholder="Tell us about your skills and experience"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4">Your Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {works.map((work, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="aspect-video bg-black/30 rounded-lg overflow-hidden relative group"
            >
              <img src={work} alt={`Work ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm">View Details</Button>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: works.length * 0.1 }}
            className="aspect-video bg-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
          >
            <label htmlFor="work-upload" className="cursor-pointer flex flex-col items-center">
              <Plus className="h-12 w-12 mb-2" />
              <span>Add Work</span>
            </label>
            <input
              id="work-upload"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleWorkUpload}
            />
          </motion.div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300">
            Save Profile
          </Button>
        </div>
      </motion.div>
    </div>
  )
}