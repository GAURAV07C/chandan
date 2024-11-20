'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, Edit2, MessageCircle } from 'lucide-react'

// Mock data for hired users
const hiredUsers = [
  { id: 1, name: 'Alice', project: 'Travel Vlog Editing' },
  { id: 2, name: 'Bob', project: 'Wedding Video' },
  { id: 3, name: 'Charlie', project: 'Product Commercial' },
]

export default function DesignerDashboard({ designerName = 'Gaurav' }) {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Welcome, {designerName}!</h1>
        
        <Tabs defaultValue="profile" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="work">Your Work</TabsTrigger>
            <TabsTrigger value="hired">Hired Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card className="bg-white/10 backdrop-blur-lg border-none">
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
                      <Textarea
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
          </TabsContent>
          <TabsContent value="work">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
          </TabsContent>
          <TabsContent value="hired">
            <div className="space-y-4">
              {hiredUsers.map((user) => (
                <Card key={user.id} className="bg-white/10 backdrop-blur-lg border-none">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-300">{user.project}</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300">
            Save Profile
          </Button>
        </div>
      </motion.div>
    </div>
  )
}