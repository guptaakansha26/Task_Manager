import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import TaskCard from './TaskCard';
import TaskForm from './Tasks';
import MemberList from './MemberList';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { token } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      
      const [projectRes, tasksRes] = await Promise.all([
        api.get(`/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        api.get(`/tasks/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setProject(projectRes.data);
      setTasks(tasksRes.data);

      
      const membersRes = await api.get(`/projects/${projectId}/members`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers(membersRes.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mx-auto px-6 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      {}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{project?.name}</h1>
          <p className="text-blue-100 mb-4">{project?.description}</p>
          <div className="flex gap-4 text-sm">
            <span>Admin: {project?.admin_name}</span>
            <span>• {tasks.length} tasks</span>
          </div>
        </div>
      </div>

      {}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'members'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Members
            </button>
          </nav>
        </div>

        {activeTab === 'tasks' && (
          <>
            <TaskForm projectId={projectId} onTaskCreated={fetchProjectData} />
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map(task => (
                  <TaskCard key={task.id} task={task} onUpdate={fetchProjectData} />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'members' && (
          <MemberList members={members} projectId={projectId} />
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;