'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Play } from 'lucide-react'

type Designer = {
  id: string
  name: string
  photo: string
  description: string
  videos: string[]
}

const designers: Designer[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    photo: '/placeholder.svg?height=100&width=100',
    description: 'Experienced video editor specializing in dynamic travel vlogs and engaging lifestyle content. With over 5 years in the industry, I bring a unique blend of creativity and technical expertise to every project.',
    videos: ['/placeholder.svg?height=200&width=350', '/placeholder.svg?height=200&width=350', '/placeholder.svg?height=200&width=350']
  },
  {
    id: '2',
    name: 'Bob Smith',
    photo: '/placeholder.svg?height=100&width=100',
    description: 'Award-winning motion graphics designer with a passion for creating stunning visual effects. My work has been featured in commercials for major brands and independent films.',
    videos: ['/placeholder.svg?height=200&width=350', '/placeholder.svg?height=200&width=350', '/placeholder.svg?height=200&width=350']
  },
  {
    id: '3',
    name: 'Charlie Davis',
    photo: '/placeholder.svg?height=100&width=100',
    description: 'Versatile video editor and colorist with expertise in both narrative and documentary filmmaking. I specialize in bringing out the best in your footage and crafting compelling stories.',
    videos: ['/placeholder.svg?height=200&width=350', '/placeholder.svg?height=200&width=350', '/placeholder.svg?height=200&width=350']
  }
]

export default function DesignerPage() {
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Video Designers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {designers.map((designer) => (
          <motion.div
            key={designer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-none overflow-hidden">
              <CardContent className="p-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full p-0 h-auto hover:bg-transparent"
                      onClick={() => setSelectedDesigner(designer)}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={designer.photo} alt={designer.name} />
                          <AvatarFallback>{designer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <h2 className="text-xl font-semibold">{designer.name}</h2>
                          <p className="text-sm text-gray-300">Click to view profile</p>
                        </div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <AnimatePresence>
                    {selectedDesigner && (
                      <Dialog open={selectedDesigner.id === designer.id} onOpenChange={() => setSelectedDesigner(null)}>
                        <DialogContent className="bg-gradient-to-b from-purple-700 to-indigo-900 text-white border-none max-w-4xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">{selectedDesigner.name}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 space-y-4">
                            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                              <Avatar className="h-24 w-24">
                                <AvatarImage src={selectedDesigner.photo} alt={selectedDesigner.name} />
                                <AvatarFallback>{selectedDesigner.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-lg">{selectedDesigner.description}</p>
                                <Button className="mt-4 bg-yellow-400 text-purple-900 hover:bg-yellow-300">
                                  Hire {selectedDesigner.name}
                                </Button>
                              </div>
                            </div>
                            <h3 className="text-xl font-semibold mt-6 mb-4">Demo Videos</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {selectedDesigner.videos.map((video, index) => (
                                <div 
                                  key={index} 
                                  className="aspect-video bg-black/30 rounded-lg overflow-hidden relative cursor-pointer group"
                                  onClick={() => setSelectedVideo(video)}
                                >
                                  <img src={video} alt={`Demo video ${index + 1}`} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-12 h-12 text-white" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </AnimatePresence>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative w-full max-w-4xl aspect-video">
              <img src={selectedVideo} alt="Full screen video" className="w-full h-full object-contain" />
              <Button
                variant="ghost"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}