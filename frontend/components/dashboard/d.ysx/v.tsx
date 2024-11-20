'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, User } from 'lucide-react'

// Mock data for hired designers
const hiredDesigners = [
  { id: 1, name: 'John Doe', specialty: 'Video Editing', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Jane Smith', specialty: 'Motion Graphics', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Mike Johnson', specialty: 'Color Grading', avatar: '/placeholder.svg?height=40&width=40' },
]

export default function UserDashboard1({ userName = 'Alex' }) {
  const [activeChat, setActiveChat] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Welcome, {userName}!</h1>
        
        <Tabs defaultValue="hired" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger value="hired">Hired Designers</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="hired">
            <div className="space-y-4">
              {hiredDesigners.map((designer) => (
                <Card key={designer.id} className="bg-white/10 backdrop-blur-lg border-none">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={designer.avatar} alt={designer.name} />
                        <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{designer.name}</h3>
                        <p className="text-sm text-gray-300">{designer.specialty}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => setActiveChat(designer.id)}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="chat">
            {activeChat ? (
              <Card className="bg-white/10 backdrop-blur-lg border-none">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Chat with {hiredDesigners.find(d => d.id === activeChat)?.name}</h3>
                  <div className="h-64 bg-white/20 rounded-lg mb-4 p-4 overflow-y-auto">
                    {/* Chat messages would go here */}
                    <p className="text-gray-300">No messages yet. Start chatting!</p>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-white/20 rounded-lg p-2 text-white placeholder-gray-400"
                    />
                    <Button>Send</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <p className="text-center text-gray-300">Select a designer to start chatting.</p>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}