import React from 'react';
import Icon from '../../../components/AppIcon';
import TaskCard from './TaskCard';

const KanbanColumn = ({ 
  title, 
  status, 
  tasks, 
  onTaskStatusChange, 
  onTaskEdit, 
  onTaskViewDetails,
  onAddTask 
}) => {
  const getColumnIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'assigned': return 'UserCheck';
      case 'in-progress': return 'Wrench';
      case 'completed': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getColumnColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 border-gray-300';
      case 'assigned': return 'bg-blue-100 border-blue-300';
      case 'in-progress': return 'bg-yellow-100 border-yellow-300';
      case 'completed': return 'bg-green-100 border-green-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={`p-4 rounded-t-lg border-2 ${getColumnColor(status)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name={getColumnIcon(status)} size={18} className="text-foreground" />
            <h3 className="font-semibold text-foreground">{title}</h3>
            <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-foreground">
              {filteredTasks.length}
            </span>
          </div>
          {status === 'pending' && (
            <button
              onClick={onAddTask}
              className="p-1 rounded-md hover:bg-white/50 transition-colors"
            >
              <Icon name="Plus" size={16} className="text-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Column Content */}
      <div className="flex-1 bg-muted/30 border-l-2 border-r-2 border-b-2 border-gray-200 rounded-b-lg p-3 overflow-y-auto min-h-96">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Icon name="Package" size={32} className="mb-2 opacity-50" />
            <p className="text-sm">No tasks</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={onTaskStatusChange}
                onEdit={onTaskEdit}
                onViewDetails={onTaskViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;