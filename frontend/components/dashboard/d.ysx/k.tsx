'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {  User, Send, Briefcase } from 'lucide-react'

// Mock data for designers
const designers = [
  { id: 1, name: 'John Doe', specialty: 'Video Editing', avatar: '/placeholder.svg?height=40&width=40', status: 'hired' },
  { id: 2, name: 'Jane Smith', specialty: 'Motion Graphics', avatar: '/placeholder.svg?height=40&width=40', status: 'applied' },
  { id: 3, name: 'Mike Johnson', specialty: 'Color Grading', avatar: '/placeholder.svg?height=40&width=40', status: 'hired' },
  { id: 4, name: 'Emily Brown', specialty: '3D Animation', avatar: '/placeholder.svg?height=40&width=40', status: 'available' },
]

type Message = {
  id: number;
  sender: 'user' | 'designer';
  text: string;
  timestamp: Date;
}

export default function UserDashboard({ userName = 'Alex' }) {
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [messages, setMessages] = useState<Record<number, Message[]>>({})
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = (designerId: number) => {
    if (newMessage.trim() === '') return

    const newMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages(prev => ({
      ...prev,
      [designerId]: [...(prev[designerId] || []), newMsg],
    }))

    setNewMessage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Welcome, {userName}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-lg border-none col-span-1">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Designers</h2>
              <ScrollArea className="h-[calc(100vh-200px)]">
                {designers.map((designer) => (
                  <div
                    key={designer.id}
                    className={`flex items-center justify-between p-2 rounded-lg mb-2 cursor-pointer transition-colors ${
                      activeChat === designer.id ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                    onClick={() => setActiveChat(designer.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={designer.avatar} alt={designer.name} />
                        <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{designer.name}</h3>
                        <p className="text-sm text-gray-300">{designer.specialty}</p>
                      </div>
                    </div>
                    {designer.status !== 'available' && (
                      <Briefcase className={`h-5 w-5 ${designer.status === 'hired' ? 'text-green-400' : 'text-yellow-400'}`} />
                    )}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-none col-span-1 md:col-span-2">
            <CardContent className="p-4 flex flex-col h-[calc(100vh-200px)]">
              {activeChat ? (
                <>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src={designers.find(d => d.id === activeChat)?.avatar} alt={designers.find(d => d.id === activeChat)?.name} />
                      <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{designers.find(d => d.id === activeChat)?.name}</h3>
                  </div>
                  <ScrollArea className="flex-grow mb-4">
                    {messages[activeChat]?.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                      >
                        <div
                          className={`inline-block p-2 rounded-lg ${
                            message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-600'
                          }`}
                        >
                          {message.text}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage(activeChat)}
                      className="flex-grow bg-white/20 text-white placeholder-gray-400"
                    />
                    <Button onClick={() => sendMessage(activeChat)}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select a designer to start chatting
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}