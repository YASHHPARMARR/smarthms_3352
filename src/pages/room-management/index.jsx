import React, { useState, useEffect } from 'react';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import RoomStatsCards from './components/RoomStatsCards';
import RoomToolbar from './components/RoomToolbar';
import RoomFilters from './components/RoomFilters';
import RoomCard from './components/RoomCard';
import RoomListView from './components/RoomListView';
import AddRoomModal from './components/AddRoomModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    floor: '',
    status: '',
    housekeeping: '',
    availableToday: false,
    needsCleaning: false,
    maintenanceDue: false,
    vipGuests: false
  });

  // Mock room data
  useEffect(() => {
    const mockRooms = [
      {
        id: 1,
        number: '101',
        type: 'Deluxe AC',
        floor: 1,
        price: 120,
        status: 'Available',
        housekeepingStatus: 'Clean',
        lastCleaned: '2025-07-11T10:00:00Z',
        guest: null,
        checkIn: null,
        checkOut: null,
        maintenance: null
      },
      {
        id: 2,
        number: '102',
        type: 'Suite AC',
        floor: 1,
        price: 200,
        status: 'Occupied',
        housekeepingStatus: 'Dirty',
        lastCleaned: '2025-07-10T14:00:00Z',
        guest: {
          name: 'John Smith',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        checkIn: '2025-07-11T15:00:00Z',
        checkOut: '2025-07-13T11:00:00Z',
        maintenance: null
      },
      {
        id: 3,
        number: '201',
        type: 'Deluxe Non-AC',
        floor: 2,
        price: 80,
        status: 'Under Maintenance',
        housekeepingStatus: 'In Progress',
        lastCleaned: '2025-07-09T09:00:00Z',
        guest: null,
        checkIn: null,
        checkOut: null,
        maintenance: {
          issue: 'Air conditioning repair',
          assignedTo: 'Mike Johnson',
          priority: 'High'
        }
      },
      {
        id: 4,
        number: '202',
        type: 'Suite Non-AC',
        floor: 2,
        price: 150,
        status: 'Cleaning',
        housekeepingStatus: 'In Progress',
        lastCleaned: '2025-07-12T08:00:00Z',
        guest: null,
        checkIn: null,
        checkOut: null,
        maintenance: null
      },
      {
        id: 5,
        number: '301',
        type: 'Deluxe AC',
        floor: 3,
        price: 120,
        status: 'Occupied',
        housekeepingStatus: 'Clean',
        lastCleaned: '2025-07-11T16:00:00Z',
        guest: {
          name: 'Sarah Wilson',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        checkIn: '2025-07-10T14:00:00Z',
        checkOut: '2025-07-14T12:00:00Z',
        maintenance: null
      },
      {
        id: 6,
        number: '302',
        type: 'Suite AC',
        floor: 3,
        price: 200,
        status: 'Available',
        housekeepingStatus: 'Clean',
        lastCleaned: '2025-07-12T07:00:00Z',
        guest: null,
        checkIn: null,
        checkOut: null,
        maintenance: null
      }
    ];

    setRooms(mockRooms);
    setFilteredRooms(mockRooms);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = rooms.filter(room => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (room.guest && room.guest.name.toLowerCase().includes(searchTerm.toLowerCase()));

      // Type filter
      const matchesType = filters.type === '' || room.type === filters.type;

      // Floor filter
      const matchesFloor = filters.floor === '' || room.floor.toString() === filters.floor;

      // Status filter
      const matchesStatus = filters.status === '' || room.status === filters.status;

      // Housekeeping filter
      const matchesHousekeeping = filters.housekeeping === '' || room.housekeepingStatus === filters.housekeeping;

      // Quick filters
      const matchesAvailableToday = !filters.availableToday || room.status === 'Available';
      const matchesNeedsCleaning = !filters.needsCleaning || room.housekeepingStatus === 'Dirty';
      const matchesMaintenanceDue = !filters.maintenanceDue || room.status === 'Under Maintenance';
      const matchesVipGuests = !filters.vipGuests || (room.guest && room.type.includes('Suite'));

      return matchesSearch && matchesType && matchesFloor && matchesStatus && 
             matchesHousekeeping && matchesAvailableToday && matchesNeedsCleaning && 
             matchesMaintenanceDue && matchesVipGuests;
    });

    setFilteredRooms(filtered);
  }, [rooms, searchTerm, filters]);

  // Calculate stats
  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'Available').length,
    occupied: rooms.filter(r => r.status === 'Occupied').length,
    maintenance: rooms.filter(r => r.status === 'Under Maintenance').length,
    cleaning: rooms.filter(r => r.status === 'Cleaning').length,
    occupancyRate: rooms.length > 0 ? Math.round((rooms.filter(r => r.status === 'Occupied').length / rooms.length) * 100) : 0
  };

  const handleStatusChange = (roomId, newStatus) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId
          ? { 
              ...room, 
              status: newStatus,
              guest: newStatus === 'Available' ? null : room.guest,
              checkIn: newStatus === 'Available' ? null : room.checkIn,
              checkOut: newStatus === 'Available' ? null : room.checkOut
            }
          : room
      )
    );
  };

  const handleEditRoom = (room) => {
    console.log('Edit room:', room);
    // Implementation for edit room modal
  };

  const handleMaintenanceRequest = (room) => {
    console.log('Maintenance request for room:', room);
    // Implementation for maintenance request modal
  };

  const handleHousekeepingAssignment = (room) => {
    console.log('Housekeeping assignment for room:', room);
    // Implementation for housekeeping assignment modal
  };

  const handleAddRoom = (newRoom) => {
    setRooms(prevRooms => [...prevRooms, newRoom]);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for rooms:', selectedRooms);
    // Implementation for bulk actions
  };

  const handleRefresh = () => {
    // Simulate data refresh
    console.log('Refreshing room data...');
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      floor: '',
      status: '',
      housekeeping: '',
      availableToday: false,
      needsCleaning: false,
      maintenanceDue: false,
      vipGuests: false
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <div className="pt-16">
        <div className="flex">
          {/* Sidebar - Filters */}
          <div className="hidden lg:block w-80 border-r border-border bg-card">
            <div className="p-6">
              <RoomFilters
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={clearFilters}
                onBulkAction={handleBulkAction}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Room Management</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage room inventory, status, and assignments
                  </p>
                </div>
                
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden">
                  <Button variant="outline">
                    <Icon name="Filter" size={16} className="mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <RoomStatsCards stats={stats} />

            {/* Toolbar */}
            <RoomToolbar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onAddRoom={() => setIsAddModalOpen(true)}
              selectedRooms={selectedRooms}
              totalRooms={filteredRooms.length}
              onRefresh={handleRefresh}
            />

            {/* Room Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRooms.map(room => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onStatusChange={handleStatusChange}
                    onEdit={handleEditRoom}
                    onMaintenance={handleMaintenanceRequest}
                    onHousekeeping={handleHousekeepingAssignment}
                  />
                ))}
              </div>
            ) : (
              <RoomListView
                rooms={filteredRooms}
                selectedRooms={selectedRooms}
                onRoomSelect={setSelectedRooms}
                onStatusChange={handleStatusChange}
                onEdit={handleEditRoom}
                onMaintenance={handleMaintenanceRequest}
                onHousekeeping={handleHousekeepingAssignment}
              />
            )}

            {/* Empty State */}
            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Bed" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No rooms found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || Object.values(filters).some(f => f !== '' && f !== false)
                    ? 'Try adjusting your search or filters' :'Get started by adding your first room'
                  }
                </p>
                {!searchTerm && !Object.values(filters).some(f => f !== '' && f !== false) && (
                  <Button onClick={() => setIsAddModalOpen(true)}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add First Room
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Room Modal */}
      <AddRoomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddRoom}
      />
    </div>
  );
};

export default RoomManagement;