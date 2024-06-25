import React, { useState } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import styles from './Task.module.css';
import editIcon from '../../assets/images/editing.svg';
import deleteIcon from '../../assets/images/delete.svg';
import { ModalEditTask } from '../ModalEditTask/ModalEditTask';
import { ModalDeleteTask } from '../ModalDeleteTask/ModalDeleteTask';
import { editTask } from '../../services/api';

const { Text } = Typography;

const taskPriorityMap = {
  ALTA: "Alta",
  MEDIA: "Média",
  BAIXA: "Baixa"
};

export const Task = ({ id, name, completed: initialCompleted, type, priority, status, dueDate }) => {
  const [completed, setCompleted] = useState(initialCompleted);
  const [isModalEditTaskOpen, setIsModalEditTaskOpen] = useState(false);
  const [isModalDeleteTaskOpen, setIsModalDeleteTaskOpen] = useState(false);

  const task = {
    id: id,
    name: name,
    completed: initialCompleted,
    type: type,
    priority: priority,
    status: status,
    dueDate: dueDate
  }

  console.log(task);

  const handleEditTask = () => {
    setIsModalEditTaskOpen(true);
  };

  const handleDeleteTask = () => {
    setIsModalDeleteTaskOpen(true);
  };

  const toggleCheckbox = () => {
    setCompleted(!completed);
    updateCompleted();
  };

  const updateCompleted = async () => {
    const updatedTask = { ...task, completed: !completed };
    try {
      const response = await editTask(id, updatedTask);
      console.log('Tarefa atualizada:', response);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  }

  const handleCloseEditTaskModal = () => {
    setIsModalEditTaskOpen(false);
  };

  const handleCloseDeleteTaskModal = () => {
    setIsModalDeleteTaskOpen(false);
  };

  return (
    <Card className={styles.taskContainer}>
      <Row>
        <Col span={2}>
          <label>
            <input
              type='checkbox'
              className={`${styles.checkbox} ${completed ? styles.checked : styles.unchecked}`}
              checked={completed}
              onChange={toggleCheckbox}
            />
          </label>
        </Col>
        <Col span={18}>
          <div className={styles.taskDetails}>
            <Text strong>{name}</Text>
            {dueDate ? <Text>Concluir até: {new Date(dueDate).toLocaleDateString()}</Text> : null}
            <Text>Prioridade: {taskPriorityMap[priority]}</Text>
          </div>
        </Col>
        <Col span={4} className={styles.taskActions}>
          <img src={editIcon} alt="Ícone de editar" onClick={handleEditTask} />
          {isModalEditTaskOpen && <ModalEditTask task={task} modalOpen={isModalEditTaskOpen} onClose={handleCloseEditTaskModal}/>}
          <img src={deleteIcon} alt="Ícone de excluir" onClick={handleDeleteTask} />
          {isModalDeleteTaskOpen && <ModalDeleteTask task={task} modalOpen={isModalDeleteTaskOpen} onClose={handleCloseDeleteTaskModal}/>}
        </Col>
      </Row>
    </Card>
  );
};
