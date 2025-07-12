import React, { useState, useEffect } from 'react';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterSidebar from './components/FilterSidebar';
import KanbanColumn from './components/KanbanColumn';
import TaskModal from './components/TaskModal';
import TechnicianSchedule from './components/TechnicianSchedule';

const MaintenanceTaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    priority: 'all',
    roomType: 'all',
    technician: 'all',
    category: 'all',
    dateRange: 'all',
    search: '',
    startDate: '',
    endDate: ''
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completionRate: 0,
    avgResolutionTime: 0,
    urgentTasks: 0
  });

  // Mock data for maintenance tasks
  useEffect(() => {
    const mockTasks = [
      {
        id: 'MT001',
        title: 'Leaky Faucet Repair',
        description: 'Guest reported water dripping from bathroom faucet. Needs immediate attention to prevent water damage.',
        roomNumber: '101',
        priority: 'urgent',
        category: 'plumbing',
        roomType: 'deluxe',
        status: 'pending',
        assignedTo: '',
        estimatedTime: 1.5,
        createdAt: '2025-07-12T06:00:00Z',
        updatedAt: '2025-07-12T06:00:00Z',
        dueDate: '2025-07-12T14:00:00Z',
        notes: 'Guest in room until 3 PM. Coordinate entry time.',
        photos: [
          'https://images.pexels.com/photos/6195122/pexels-photo-6195122.jpeg',
          'https://images.pexels.com/photos/6195123/pexels-photo-6195123.jpeg'
        ]
      },
      {
        id: 'MT002',
        title: 'AC Unit Maintenance',
        description: 'Scheduled maintenance for air conditioning unit. Filter replacement and system check required.',
        roomNumber: '205',
        priority: 'medium',
        category: 'hvac',
        roomType: 'suite',
        status: 'assigned',
        assignedTo: 'john-doe',
        estimatedTime: 2,
        createdAt: '2025-07-11T10:30:00Z',
        updatedAt: '2025-07-12T08:15:00Z',
        dueDate: '2025-07-13T10:00:00Z',
        notes: 'Regular maintenance schedule. Room will be vacant from 10 AM to 2 PM.',
        photos: []
      },
      {
        id: 'MT003',
        title: 'Light Fixture Replacement',
        description: 'Ceiling light in bathroom flickering. Bulb replacement attempted but issue persists.',
        roomNumber: '150',
        priority: 'high',
        category: 'electrical',
        roomType: 'standard',
        status: 'in-progress',
        assignedTo: 'mike-wilson',
        estimatedTime: 1,
        createdAt: '2025-07-11T14:20:00Z',
        updatedAt: '2025-07-12T09:00:00Z',
        dueDate: '2025-07-12T16:00:00Z',
        notes: 'Electrical issue suspected. May need rewiring.',
        photos: [
          'https://images.pexels.com/photos/6195124/pexels-photo-6195124.jpeg'
        ]
      },
      {
        id: 'MT004',
        title: 'Carpet Cleaning',
        description: 'Deep cleaning required for carpet stains in living area. Guest spilled red wine.',
        roomNumber: '301',
        priority: 'medium',
        category: 'cleaning',
        roomType: 'suite',
        status: 'completed',
        assignedTo: 'sarah-johnson',
        estimatedTime: 1.5,
        createdAt: '2025-07-10T16:45:00Z',
        updatedAt: '2025-07-11T11:30:00Z',
        dueDate: '2025-07-11T12:00:00Z',
        completedAt: '2025-07-11T11:30:00Z',
        notes: 'Professional carpet cleaning completed. Room ready for next guest.',
        photos: [
          'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg',
          'https://images.pexels.com/photos/6195126/pexels-photo-6195126.jpeg'
        ]
      },
      {
        id: 'MT005',
        title: 'Toilet Repair',
        description: 'Toilet not flushing properly. Water level appears low and handle is loose.',
        roomNumber: '180',
        priority: 'high',
        category: 'plumbing',
        roomType: 'deluxe',
        status: 'assigned',
        assignedTo: 'john-doe',
        estimatedTime: 1,
        createdAt: '2025-07-12T07:15:00Z',
        updatedAt: '2025-07-12T08:30:00Z',
        dueDate: '2025-07-12T15:00:00Z',
        notes: 'Guest checkout at 11 AM. Can access room after that.',
        photos: []
      },
      {
        id: 'MT006',
        title: 'Furniture Assembly',
        description: 'New bedside table delivered. Assembly required before guest check-in at 4 PM.',
        roomNumber: '220',
        priority: 'medium',
        category: 'furniture',
        roomType: 'premium',
        status: 'in-progress',
        assignedTo: 'sarah-johnson',
        estimatedTime: 2,
        createdAt: '2025-07-12T08:00:00Z',
        updatedAt: '2025-07-12T09:00:00Z',
        dueDate: '2025-07-12T15:00:00Z',
        notes: 'All parts and tools available in maintenance room.',
        photos: []
      },
      {
        id: 'MT007',
        title: 'Window Lock Repair',
        description: 'Window lock mechanism broken. Security concern reported by guest.',
        roomNumber: '115',
        priority: 'urgent',
        category: 'other',
        roomType: 'standard',
        status: 'pending',
        assignedTo: '',
        estimatedTime: 0.5,
        createdAt: '2025-07-12T08:45:00Z',
        updatedAt: '2025-07-12T08:45:00Z',
        dueDate: '2025-07-12T12:00:00Z',
        notes: 'Security priority. Guest concerned about room safety.',
        photos: [
          'https://images.pexels.com/photos/6195127/pexels-photo-6195127.jpeg'
        ]
      },
      {
        id: 'MT008',
        title: 'Shower Head Replacement',
        description: 'Low water pressure reported. Shower head appears clogged and needs replacement.',
        roomNumber: '275',
        priority: 'low',
        category: 'plumbing',
        roomType: 'deluxe',
        status: 'completed',
        assignedTo: 'john-doe',
        estimatedTime: 0.5,
        createdAt: '2025-07-10T09:30:00Z',
        updatedAt: '2025-07-10T14:15:00Z',
        dueDate: '2025-07-10T16:00:00Z',
        completedAt: '2025-07-10T14:15:00Z',
        notes: 'Replacement completed. Water pressure restored to normal.',
        photos: []
      }
    ];

    setTasks(mockTasks);

    // Calculate stats
    const totalTasks = mockTasks.length;
    const completedTasks = mockTasks.filter(task => task.status === 'completed').length;
    const urgentTasks = mockTasks.filter(task => task.priority === 'urgent').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const avgResolutionTime = 4.2; // Mock average

    setStats({
      totalTasks,
      completionRate,
      avgResolutionTime,
      urgentTasks
    });
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !task.description.toLowerCase().includes(filters.search.toLowerCase()) &&
        !task.roomNumber.includes(filters.search)) {
      return false;
    }
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.category !== 'all' && task.category !== filters.category) return false;
    if (filters.roomType !== 'all' && task.roomType !== filters.roomType) return false;
    if (filters.technician !== 'all') {
      if (filters.technician === 'unassigned' && task.assignedTo) return false;
      if (filters.technician !== 'unassigned' && task.assignedTo !== filters.technician) return false;
    }
    return true;
  });

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: newStatus, 
              updatedAt: new Date().toISOString(),
              ...(newStatus === 'completed' && { completedAt: new Date().toISOString() })
            }
          : task
      )
    );
  };

  const handleTaskEdit = (task) => {
    setSelectedTask(task);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleTaskViewDetails = (task) => {
    setSelectedTask(task);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleTaskSave = (taskData) => {
    if (modalMode === 'create') {
      const newTask = {
        ...taskData,
        id: `MT${String(tasks.length + 1).padStart(3, '0')}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    } else if (modalMode === 'edit') {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskData.id ? taskData : task
        )
      );
    }
  };

  const columns = [
    { title: 'Pending Requests', status: 'pending' },
    { title: 'Assigned Tasks', status: 'assigned' },
    { title: 'In Progress', status: 'in-progress' },
    { title: 'Completed', status: 'completed' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <div className="pt-16 flex h-screen">
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          stats={stats}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-card border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Maintenance Task Management</h1>
                <p className="text-muted-foreground mt-1">
                  Track and manage facility maintenance requests and assignments
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsScheduleOpen(true)}
                >
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Schedule
                </Button>
                <Button
                  variant="default"
                  onClick={handleAddTask}
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="ClipboardList" size={20} className="text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.totalTasks}</p>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.completionRate}%</p>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={20} className="text-warning" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.avgResolutionTime}h</p>
                    <p className="text-sm text-muted-foreground">Avg Resolution</p>
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.urgentTasks}</p>
                    <p className="text-sm text-muted-foreground">Urgent Tasks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="flex-1 p-6 overflow-hidden">
            <div className="grid grid-cols-4 gap-6 h-full">
              {columns.map(column => (
                <KanbanColumn
                  key={column.status}
                  title={column.title}
                  status={column.status}
                  tasks={filteredTasks}
                  onTaskStatusChange={handleTaskStatusChange}
                  onTaskEdit={handleTaskEdit}
                  onTaskViewDetails={handleTaskViewDetails}
                  onAddTask={column.status === 'pending' ? handleAddTask : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleTaskSave}
        mode={modalMode}
      />

      {/* Technician Schedule Modal */}
      <TechnicianSchedule
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </div>
  );
};

export default MaintenanceTaskManagement;