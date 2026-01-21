'use client';

import styles from './TaskReminderCard.module.css';
import { Task } from '@/types/task';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, updateTaskStatus } from '@/lib/api/taskApi';
import { useTaskModalStore } from '@/lib/store/taskModalStore';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { AddTaskModal } from '@/components/AddTaskModal/AddTaskModal';

export default function TaskReminderCard() {
  const { isOpen, openModal, closeModal } = useTaskModalStore();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    enabled: !!user,
    refetchOnMount: 'always',
  });

  const tasks = data?.tasks || [];

  const toggleStatusMutation = useMutation({
    mutationFn: (task: Task) => updateTaskStatus(task._id, !task.isDone),
    onMutate: async (task: Task) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousData = queryClient.getQueryData<{ tasks: Task[] }>([
        'tasks',
      ]);

      if (previousData) {
        queryClient.setQueryData(['tasks'], {
          tasks: previousData.tasks.map((t) =>
            t._id === task._id ? { ...t, isDone: !t.isDone } : t
          ),
        });
      }

      return { previousData };
    },
    onError: (err, task, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['tasks'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleAddTaskClick = () => {
    if (!user) {
      router.push('/auth/register');
      return;
    }
    openModal();
  };

  return (
    <div className={styles.task_section}>
      <div className={styles.task_header}>
        <h2>Важливі завдання</h2>
        <button className={styles.addButton} onClick={handleAddTaskClick}>
          ＋
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className={styles.task_emptyState}>
          <p className={styles.task_emptyTitle}>Наразі немає жодних завдань</p>
          <p className={styles.task_emptySubtitle}>
            Створіть мерщій нове завдання!
          </p>
          <button
            className={styles.task_createButton}
            onClick={handleAddTaskClick}
          >
            Створити завдання
          </button>
        </div>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((t) => (
            <li
              key={t._id}
              className={`${styles.taskItem} ${t.isDone ? styles.done : ''}`}
            >
              <span className={styles.taskDate}>
                {new Date(t.date).toLocaleDateString('uk-UA', {
                  day: '2-digit',
                  month: '2-digit',
                })}
              </span>

              <div className={styles.taskContent}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={t.isDone}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleStatusMutation.mutate(t);
                    }}
                  />
                </label>

                <span className={styles.taskName}>{t.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && <AddTaskModal isOpen={isOpen} onClose={closeModal} />}
    </div>
  );
}
