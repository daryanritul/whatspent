 case ADD_EXPENSES:
      const updatedExpenses = [...selectedList.expenses, payload];
      const updatedLists = state.lists.map(list =>
        list.uid === state.selectedList
          ? { ...list, expenses: updatedExpenses }
          : list
      );

      return {
        ...state,
        lists: updatedLists,
      };