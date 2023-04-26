import { useState, ReactNode } from 'react';
import { getHabitValidity } from 'lib/utils/validator';
import { HabitContext, HabitHandleContext } from './HabitContext';
import { useModalHandleContext } from './ModalContext';
import type { Habit } from 'interface/main';

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const { closeModal } = useModalHandleContext();
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleCreateHabit = (newHabitContent: Omit<Habit, 'id'>) => {
    const validatorReport = getHabitValidity(newHabitContent);
    if (validatorReport) {
      alert(validatorReport);
      return;
    }

    const newHabit: Habit = {
      id: habits.length < 1 ? 0 : habits[habits.length - 1].id + 1,
      ...newHabitContent,
    };
    setHabits([...structuredClone(habits), newHabit]);
    closeModal();
  };

  const handleUpdateHabit = (updatingHabitContent: Habit) => {
    const validatorReport = getHabitValidity(updatingHabitContent);
    if (validatorReport) {
      alert(validatorReport);
      return;
    }
    const updatedHabits = habits.map((habit) => {
      if (habit.id !== updatingHabitContent.id) return habit;
      else return updatingHabitContent;
    });
    setHabits(updatedHabits);
    closeModal();
  };

  const handleDeleteHabit = (habitId: Habit['id']) => {
    setHabits(habits.filter((habit) => habit.id !== habitId));
    closeModal();
  };

  //  TODO: useReducer
  const habitHandlers = {
    createHabit: handleCreateHabit,
    updateHabit: handleUpdateHabit,
    deleteHabit: handleDeleteHabit,
  };

  return (
    <HabitContext.Provider value={habits}>
      <HabitHandleContext.Provider value={habitHandlers}>
        {children}
      </HabitHandleContext.Provider>
    </HabitContext.Provider>
  );
};
