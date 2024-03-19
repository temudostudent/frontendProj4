import React, { useState , useEffect } from 'react'
import EnhancedTable from '../Components/CommonElements/Table'
import AuthService from '../Components/Service/AuthService'
import { userStore } from '../Stores/UserStore'
import { useCategoryStore } from '../Stores/CategoryStore'
import { FaArrowLeft } from "react-icons/fa";

const Categories = () => {

    const token = userStore((state) => state.token);
    const { categories, updateCategories } = useCategoryStore();
    const [selected , setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleCategorySelectionChange = (selectedCategoryIds) => {
        setSelected(selectedCategoryIds);
      };

    const headCells = [
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Title',
      },
      {
        id: 'number_tasks',
        numeric: true,
        disablePadding: false,
        label: '# Tasks',
      }
    ];

    useEffect(() => {
        
        fetchCategories();

    }, [token, categories]);

    const fetchCategories = async () => {
      try {
          const allCategories = await AuthService.getAllCategories(token);
          
          // Check if allCategories is not undefined before mapping over it
          if (allCategories !== undefined) {
              const categoriesWithTasks = await Promise.all(
                  allCategories.map(async (category) => {
                      const tasks = await AuthService.getTasksByCategories(token, category.name);
                      return { ...category, number_tasks: tasks.length };
                  })
              );
              
              updateCategories(categoriesWithTasks);
          } else {
              console.error('Error: Categories data is undefined');
          }
          
          setLoading(false);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };


    const handleNewCategorySubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await AuthService.newCategory(token, { name: newCategoryName });
            
            if (response.status === 201) {
                // Limpar o campo de entrada
                setNewCategoryName('');
                // Atualizar a lista de categorias
                const updatedCategories = await AuthService.getAllCategories(token);
                updateCategories(updatedCategories);
                setIsFormVisible(false);
            }
        } catch (error) {
            console.error('Error creating new category:', error);
        }
    };

    const handleDeleteSelectedCategories = async () => {

      let response;

        try {
          await Promise.all(
            selected.map(async (categoryId) => {
              console.log(categoryId);
              response = await AuthService.deleteCategory(token, categoryId);
            })
          );
      
          if(response){
            await fetchCategories();
          }
          

          } catch (error) {
          console.error('Error deleting categories:', error);
          }
    };

    const handleEditCategorySubmit = async (event) => {

      event.preventDefault();

      try {
   
        const categoryToEdit = categories.find(category => selected.includes(category.id));
    
        if (categoryToEdit) {
   
          const response = await AuthService.editCategory(token, categoryToEdit.name, newCategoryName);
    
          if (response.status === 200) {
            
            setNewCategoryName('');
        
            setIsFormVisible(false);
          }
        }
      } catch (error) {
        console.error('Error editing category:', error);
      }
    };

    const handleFormToNotVisible = () => {
      setIsFormVisible(false);
    }

    const handleChangeAddCategory  = () => {
      setIsFormVisible(true);
      setIsSelected(false);
      setSelected([]);
    };

    const handleChangeEditForm = () => {
      
          setIsFormVisible(true);
          setIsSelected(true);
      
    };


    return (
        <div className='categories'>
          { isFormVisible && (
          
            <div className='container-addCategoriesForm'>
          
              <span onClick={handleFormToNotVisible}> <FaArrowLeft /> </span>
              {isSelected && (
                <form className={`editCateg-form ${isSelected ? 'active' : ''}`} onSubmit={handleEditCategorySubmit}>
                  <input
                      type="text"
                      placeholder="New category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <button type="submit">Save Changes</button>
              </form>
              )}
              {!isSelected && (
                <form className={`addCateg-form ${!isSelected ? 'active' : ''}`} onSubmit={handleNewCategorySubmit}>
                  <input
                      type="text"
                      placeholder="New category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <button type="submit">Add Category</button>
              </form>)}
            </div>)}
          
            <div className='categories-table-container'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="categories-table">
                        <EnhancedTable 
                            dataType="Categories"
                            headCells={headCells}
                            data={categories}
                            onDeleteSelected={handleDeleteSelectedCategories}
                            onSelectionChange={handleCategorySelectionChange}
                            onAddChange={handleChangeAddCategory}
                            onEditSelect={handleChangeEditForm}
                            />
                    </ div>
                )}
            </div>
        </div>
    );
};

export default Categories;