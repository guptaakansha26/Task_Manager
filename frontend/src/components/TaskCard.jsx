import { useState } from 'react';

const TaskCard = ({ task, onUpdate }) => {
  const [updating, setUpdating] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'border-green-300 bg-green-50 text-green-800',
      medium: 'border-yellow-300 bg-yellow-50 text-yellow-800',
      high: 'border-red-300 bg-red-50 text-red-800'
    };
    return colors[priority] || '';
  };

  const updateTaskStatus = async (status) => {
    setUpdating(true);
    try {
      await api.put(`/tasks/${task.id}`, { status });
      onUpdate();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setUpdating(false);
    }
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed';

  return (
    <div className={`border rounded-xl p-6 hover:shadow-md transition-all ${getPriorityColor(task.priority)}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{task.title}</h3>
        {isOverdue && (
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
            Overdue
          </span>
        )}
      </div>

      {task.description && (
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{task.description}</p>
      )}

      <div className="space-y-2 mb-4">
        {task.assigned_name && (
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" />
            </svg>
            {task.assigned_name}
          </div>
        )}
        
        {task.due_date && (
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
            </svg>
            {new Date(task.due_date).toLocaleDateString()}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ').toUpperCase()}
        </span>
        
        <select
          value={task.status}
          onChange={(e) => updateTaskStatus(e.target.value)}
          disabled={updating}
          className="text-sm bg-white border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};