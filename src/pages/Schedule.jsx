import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarIcon, Clock, Video, MessageCircle, Star, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '7:00 PM', '8:00 PM'
  ];

  const peers = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: '/placeholder.svg',
      rating: 4.9,
      expertise: ['Frontend', 'React', 'JavaScript'],
      company: 'Google',
      experience: '5+ years',
      location: 'San Francisco, CA',
      price: 'Free',
      available: true
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      avatar: '/placeholder.svg',
      rating: 4.8,
      expertise: ['Backend', 'Python', 'System Design'],
      company: 'Microsoft',
      experience: '7+ years',
      location: 'Seattle, WA',
      price: 'Free',
      available: true
    },
    {
      id: 3,
      name: 'Priya Patel',
      avatar: '/placeholder.svg',
      rating: 4.9,
      expertise: ['Data Science', 'Machine Learning', 'Python'],
      company: 'Meta',
      experience: '4+ years',
      location: 'New York, NY',
      price: 'Free',
      available: false
    },
    {
      id: 4,
      name: 'David Kim',
      avatar: '/placeholder.svg',
      rating: 4.7,
      expertise: ['Mobile', 'iOS', 'Swift'],
      company: 'Apple',
      experience: '6+ years',
      location: 'Cupertino, CA',
      price: 'Free',
      available: true
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      peer: 'Sarah Chen',
      date: 'Today, 3:00 PM',
      topic: 'Frontend Development',
      type: 'Mock Interview'
    },
    {
      id: 2,
      peer: 'Michael Rodriguez',
      date: 'Tomorrow, 10:00 AM',
      topic: 'System Design',
      type: 'Technical Discussion'
    }
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedPeer) {
      setIsBookingOpen(true);
    }
  };

  const confirmBooking = () => {
    // Handle booking confirmation logic here
    setIsBookingOpen(false);
    setSelectedTime('');
    setSelectedPeer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule Mock Interview</h1>
          <p className="text-gray-600">Connect with experienced professionals for practice interviews</p>
        </div>

        {/* Upcoming Interviews */}
        {upcomingInterviews.length > 0 && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-semibold">{interview.peer}</p>
                        <p className="text-sm text-gray-600">{interview.date} • {interview.topic}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm">
                        <Video className="w-4 h-4 mr-1" />
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
                
                {selectedDate && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Available Time Slots
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Peers Section */}
          <Card>
            <CardHeader>
              <CardTitle>Available Peers & Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {peers.map((peer) => (
                  <div
                    key={peer.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPeer?.id === peer.id
                        ? 'border-blue-500 bg-blue-50'
                        : peer.available
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-100 bg-gray-50 opacity-60'
                    } ${!peer.available && 'cursor-not-allowed'}`}
                    onClick={() => peer.available && setSelectedPeer(peer)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={peer.avatar} alt={peer.name} />
                        <AvatarFallback>{peer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{peer.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{peer.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <span className="font-medium">{peer.company}</span>
                          <span className="mx-2">•</span>
                          <span>{peer.experience}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {peer.location}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {peer.expertise.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-green-600">{peer.price}</span>
                          {!peer.available && (
                            <span className="text-xs text-red-500">Currently unavailable</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Button */}
        <div className="mt-8 flex justify-end">
          <Button
            size="lg"
            disabled={!selectedDate || !selectedTime || !selectedPeer}
            onClick={handleBooking}
          >
            Book Interview Session
          </Button>
        </div>

        {/* Booking Confirmation Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Interview Booking</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedPeer?.avatar} alt={selectedPeer?.name} />
                    <AvatarFallback>{selectedPeer?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{selectedPeer?.name}</h4>
                    <p className="text-sm text-gray-600">{selectedPeer?.company}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{selectedTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 justify-end">
                <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmBooking}>
                  Confirm Booking
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Schedule; 