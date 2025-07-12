import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TechnicianSchedule = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTechnician, setSelectedTechnician] = useState('all');

  const technicians = [
    {
      id: 'john-doe',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      specialization: 'Plumbing & HVAC',
      status: 'available',
      currentTasks: 3,
      completedToday: 2
    },
    {
      id: 'mike-wilson',
      name: 'Mike Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      specialization: 'Electrical',
      status: 'busy',
      currentTasks: 5,
      completedToday: 1
    },
    {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      specialization: 'General Maintenance',
      status: 'available',
      currentTasks: 2,
      completedToday: 4
    },
    {
      id: 'david-brown',
      name: 'David Brown',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      specialization: 'Furniture & Cleaning',
      status: 'off-duty',
      currentTasks: 0,
      completedToday: 0
    }
  ];

  const scheduleData = [
    {
      time: '08:00',
      technicianId: 'john-doe',
      task: 'Room 101 - Leaky faucet repair',
      priority: 'high',
      duration: '1.5h'
    },
    {
      time: '09:30',
      technicianId: 'mike-wilson',
      task: 'Room 205 - Light fixture replacement',
      priority: 'medium',
      duration: '1h'
    },
    {
      time: '10:00',
      technicianId: 'sarah-johnson',
      task: 'Room 150 - AC maintenance',
      priority: 'low',
      duration: '2h'
    },
    {
      time: '11:00',
      technicianId: 'john-doe',
      task: 'Room 301 - Toilet repair',
      priority: 'urgent',
      duration: '1h'
    },
    {
      time: '13:00',
      technicianId: 'mike-wilson',
      task: 'Room 180 - Electrical outlet issue',
      priority: 'high',
      duration: '45m'
    },
    {
      time: '14:30',
      technicianId: 'sarah-johnson',
      task: 'Room 220 - Furniture assembly',
      priority: 'medium',
      duration: '2h'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'off-duty': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-red-500 bg-red-50';
      case 'high': return 'border-l-4 border-orange-500 bg-orange-50';
      case 'medium': return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-4 border-green-500 bg-green-50';
      default: return 'border-l-4 border-gray-300 bg-gray-50';
    }
  };

  const filteredSchedule = selectedTechnician === 'all' 
    ? scheduleData 
    : scheduleData.filter(item => item.technicianId === selectedTechnician);

  const getTechnicianName = (id) => {
    const tech = technicians.find(t => t.id === id);
    return tech ? tech.name : 'Unknown';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1050 p-4">
      <div className="bg-card rounded-lg shadow-prominent max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Technician Schedule</h2>
              <p className="text-sm text-muted-foreground">Manage technician assignments and availability</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Controls */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Technician</label>
                <select
                  value={selectedTechnician}
                  onChange={(e) => setSelectedTechnician(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Technicians</option>
                  {technicians.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <Button variant="default">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Schedule
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Technician Cards */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-foreground mb-4">Technicians</h3>
              <div className="space-y-3">
                {technicians.map(tech => (
                  <div
                    key={tech.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedTechnician === tech.id 
                        ? 'border-primary bg-primary/5' :'border-border bg-card hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedTechnician(tech.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={tech.avatar}
                          alt={tech.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">{tech.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tech.status)}`}>
                            {tech.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{tech.specialization}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>Active: {tech.currentTasks}</span>
                          <span>Completed: {tech.completedToday}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Timeline */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Schedule for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              
              {filteredSchedule.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Icon name="Calendar" size={48} className="mb-4 opacity-50" />
                  <p className="text-lg">No scheduled tasks</p>
                  <p className="text-sm">Select a different date or technician</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredSchedule.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${getPriorityColor(item.priority)} transition-all hover:shadow-subtle`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-foreground">{item.time}</p>
                            <p className="text-xs text-muted-foreground">{item.duration}</p>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{item.task}</h4>
                            <p className="text-sm text-muted-foreground">
                              Assigned to: {getTechnicianName(item.technicianId)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                            item.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            item.priority === 'medium'? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {item.priority}
                          </span>
                          <Button variant="ghost" size="icon">
                            <Icon name="MoreVertical" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianSchedule;