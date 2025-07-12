import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TaskCard = ({ task, onStatusChange, onEdit, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-red-500 bg-red-50';
      case 'high': return 'border-l-4 border-orange-500 bg-orange-50';
      case 'medium': return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-4 border-green-500 bg-green-50';
      default: return 'border-l-4 border-gray-300 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return 'AlertTriangle';
      case 'high': return 'ArrowUp';
      case 'medium': return 'Minus';
      case 'low': return 'ArrowDown';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-subtle p-4 mb-3 cursor-pointer transition-all duration-200 hover:shadow-moderate ${getPriorityColor(task.priority)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getPriorityIcon(task.priority)} 
            size={16} 
            className={`${task.priority === 'urgent' ? 'text-red-500' : 
                       task.priority === 'high' ? 'text-orange-500' : 
                       task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} 
          />
          <span className="font-semibold text-foreground">Room {task.roomNumber}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="h-8 w-8"
          >
            <Icon name="Edit" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="h-8 w-8"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} />
          </Button>
        </div>
      </div>

      {/* Issue Description */}
      <h4 className="font-medium text-foreground mb-2 line-clamp-2">{task.title}</h4>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>

      {/* Technician & Time */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="User" size={12} className="text-primary" />
          </div>
          <span className="text-sm text-foreground">{task.assignedTo || 'Unassigned'}</span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>{task.estimatedTime}h</span>
        </div>
      </div>

      {/* Photos */}
      {task.photos && task.photos.length > 0 && (
        <div className="flex space-x-2 mb-3">
          {task.photos.slice(0, 3).map((photo, index) => (
            <div key={index} className="w-12 h-12 rounded-md overflow-hidden bg-muted">
              <Image
                src={photo}
                alt={`Task photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {task.photos.length > 3 && (
            <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">+{task.photos.length - 3}</span>
            </div>
          )}
        </div>
      )}

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border pt-3 mt-3 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Created:</span>
              <p className="font-medium">{formatDate(task.createdAt)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Due:</span>
              <p className="font-medium">{formatDate(task.dueDate)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Category:</span>
              <p className="font-medium">{task.category}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Room Type:</span>
              <p className="font-medium">{task.roomType}</p>
            </div>
          </div>

          {task.notes && (
            <div>
              <span className="text-sm text-muted-foreground">Notes:</span>
              <p className="text-sm text-foreground mt-1">{task.notes}</p>
            </div>
          )}

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(task);
              }}
              className="flex-1"
            >
              <Icon name="Eye" size={14} className="mr-1" />
              View Details
            </Button>
            {task.status !== 'completed' && (
              <Button
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  const nextStatus = task.status === 'pending' ? 'assigned' : 
                                   task.status === 'assigned' ? 'in-progress' : 'completed';
                  onStatusChange(task.id, nextStatus);
                }}
                className="flex-1"
              >
                <Icon name="ArrowRight" size={14} className="mr-1" />
                {task.status === 'pending' ? 'Assign' : 
                 task.status === 'assigned' ? 'Start' : 'Complete'}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
        <span>ID: #{task.id}</span>
        <span>Updated {formatDate(task.updatedAt)}</span>
      </div>
    </div>
  );
};

export default TaskCard;